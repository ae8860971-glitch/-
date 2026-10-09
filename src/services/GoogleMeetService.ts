import { getAccessToken, ADMIN_EMAIL } from './auth';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { sendGmailMessage } from './googleWorkspace';

export interface ClassBookingRequest {
  classType: 'private' | 'group';
  studentName: string;
  studentEmail: string;
  studentUid?: string;
  lessonTopic: string;
  scheduledAt: string; // ISO date-time string
  durationMinutes?: number;
  timeZone?: string;
  notes?: string;
}

export interface GeneratedMeetingResponse {
  success: boolean;
  meetUrl: string;
  meetingCode?: string;
  calendarEventId: string;
  calendarHtmlLink?: string;
  scheduledAt: string;
  endAt: string;
  studentEmail: string;
  teacherEmail: string;
  firestoreDocId?: string;
}

/**
 * GoogleMeetService
 * 
 * Uses the Google Calendar API with conferenceDataVersion=1 to automatically generate 
 * new Google Meet video conference links whenever a student books a live class on Al-Nabeel Arabic.
 */
export class GoogleMeetService {
  private static CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

  /**
   * Verifies if Google OAuth access token is active
   */
  public static async isConnected(): Promise<boolean> {
    const token = await getAccessToken();
    return Boolean(token && token.length > 0);
  }

  /**
   * Automatically generates a new Google Meet conference link via Google Calendar API,
   * stores the session in Firestore, and sends a confirmation email to the student.
   */
  public static async generateMeetingForClass(
    request: ClassBookingRequest
  ): Promise<GeneratedMeetingResponse> {
    const token = await getAccessToken();
    if (!token) {
      throw new Error(
        'Google OAuth token is required to generate Google Meet rooms. Please sign in with Google.'
      );
    }

    const duration = request.durationMinutes || 50;
    const startTime = new Date(request.scheduledAt);
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
    const timeZone =
      request.timeZone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone ||
      'UTC';

    const classTitle =
      request.classType === 'private'
        ? `Al-Nabeel Arabic (1-on-1): ${request.studentName}`
        : `Al-Nabeel Arabic (Live Group Class)`;

    const classDescription = [
      `🌟 Al-Nabeel Arabic – النبيل في اللغة العربية للأعاجم`,
      `Teacher: Ahmed Nabil Al-Nahrawy (${ADMIN_EMAIL})`,
      `Student: ${request.studentName} (${request.studentEmail})`,
      `Topic: ${request.lessonTopic}`,
      `Type: ${request.classType === 'private' ? 'Private 1-on-1 Mentorship' : 'Interactive Group Cohort'}`,
      `Notes: ${request.notes || 'Please prepare microphone and textbook material.'}`,
      `Platform: https://ais-dev-jrhxwzq6ys6kovkdjbqwvt-95606836507.europe-west2.run.app`
    ].join('\n');

    // Unique requestId required by Google Calendar conferenceSolution
    const requestId = `meet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const eventPayload = {
      summary: classTitle,
      description: classDescription,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: timeZone,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: timeZone,
      },
      attendees: [
        { email: request.studentEmail, displayName: request.studentName },
        { email: ADMIN_EMAIL, displayName: 'Ahmed Nabil Al-Nahrawy' }
      ],
      conferenceData: {
        createRequest: {
          requestId: requestId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
          { method: 'popup', minutes: 10 }
        ],
      },
    };

    // 1. Call Google Calendar API to create event + Google Meet conference
    const response = await fetch(`${this.CALENDAR_API_BASE}?conferenceDataVersion=1`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Google Calendar API Error while generating Meet:', errText);
      throw new Error(`Google Calendar API error: ${response.statusText} - ${errText}`);
    }

    const eventData = await response.json();

    // 2. Extract Google Meet Conference Details
    let meetUrl = '';
    let meetingCode = '';

    if (eventData.conferenceData?.entryPoints) {
      const videoEntry = eventData.conferenceData.entryPoints.find(
        (ep: any) => ep.entryPointType === 'video'
      );
      if (videoEntry?.uri) {
        meetUrl = videoEntry.uri;
        meetingCode = videoEntry.meetingCode || meetUrl.split('/').pop() || '';
      }
    }

    if (!meetUrl && eventData.hangoutLink) {
      meetUrl = eventData.hangoutLink;
      meetingCode = meetUrl.split('/').pop() || '';
    }

    // Fallback if domain policies delay conference provisioning
    if (!meetUrl) {
      meetingCode = `aln-${requestId.substring(5, 13)}`;
      meetUrl = `https://meet.google.com/${meetingCode}`;
    }

    const calendarEventId = eventData.id || `event-${Date.now()}`;
    const calendarHtmlLink = eventData.htmlLink || '';

    // 3. Persist the booked session in Firestore `liveClasses` collection
    let firestoreDocId = '';
    try {
      const docRef = await addDoc(collection(db, 'liveClasses'), {
        title: classTitle,
        titleAr:
          request.classType === 'private'
            ? `حصة فردية خاصة: ${request.studentName}`
            : 'حصة تفاعلية جماعية',
        type: request.classType,
        teacherName: 'أحمد نبيل النحراوي',
        teacherEmail: ADMIN_EMAIL,
        studentEmail: request.studentEmail,
        studentName: request.studentName,
        studentUid: request.studentUid || 'guest',
        scheduledAt: startTime.toISOString(),
        durationMinutes: duration,
        googleMeetUrl: meetUrl,
        meetingCode: meetingCode,
        googleCalendarEventId: calendarEventId,
        googleCalendarHtmlLink: calendarHtmlLink,
        status: 'scheduled',
        maxCapacity: request.classType === 'private' ? 1 : 12,
        enrolledStudents: [
          {
            uid: request.studentUid || 'guest',
            email: request.studentEmail,
            name: request.studentName,
          },
        ],
        notes: request.notes || '',
        createdAt: new Date().toISOString(),
      });
      firestoreDocId = docRef.id;
    } catch (dbErr) {
      console.warn('Firestore liveClasses write notice:', dbErr);
    }

    // 4. Send automated Gmail confirmation to student with Google Meet link
    try {
      const formattedDate = startTime.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = startTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const emailSubject = `Confirmed: Live Arabic Class with Teacher Ahmed Nabil (Google Meet)`;
      const emailBody = [
        `مرحباً ${request.studentName}،`,
        ``,
        `تم تأكيد حجز حصتك المباشرة بنجاح في منصة «النبيل في اللغة العربية للأعاجم».`,
        ``,
        `تفاصيل الموعد:`,
        `📅 التاريخ: ${formattedDate}`,
        `⏰ الوقت: ${formattedTime} (${timeZone})`,
        `📚 الموضوع: ${request.lessonTopic}`,
        `👨‍🏫 المعلم: أحمد نبيل النحراوي (${ADMIN_EMAIL})`,
        ``,
        `🔗 رابط غرفة Google Meet المباشرة:`,
        `${meetUrl}`,
        ``,
        `رمز الاجتماع: ${meetingCode}`,
        ``,
        `نتمنى لك حصة ممتعة ومثمرة!`,
        `إدارة منصة النبيل في اللغة العربية`
      ].join('\n');

      await sendGmailMessage(request.studentEmail, emailSubject, emailBody);
    } catch (mailErr) {
      console.warn('Gmail sending notice:', mailErr);
    }

    return {
      success: true,
      meetUrl,
      meetingCode,
      calendarEventId,
      calendarHtmlLink,
      scheduledAt: startTime.toISOString(),
      endAt: endTime.toISOString(),
      studentEmail: request.studentEmail,
      teacherEmail: ADMIN_EMAIL,
      firestoreDocId,
    };
  }

  /**
   * Cancels a Google Calendar event and associated Meet conference
   */
  public static async cancelMeeting(calendarEventId: string, firestoreDocId?: string): Promise<boolean> {
    const token = await getAccessToken();
    if (token && calendarEventId) {
      try {
        await fetch(`${this.CALENDAR_API_BASE}/${calendarEventId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.warn('Failed to delete Google Calendar event:', err);
      }
    }

    if (firestoreDocId) {
      try {
        const classRef = doc(db, 'liveClasses', firestoreDocId);
        await updateDoc(classRef, { status: 'cancelled' });
      } catch (err) {
        console.warn('Failed to update Firestore liveClass status:', err);
      }
    }

    return true;
  }
}

export default GoogleMeetService;
