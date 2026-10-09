import { getAccessToken } from './auth';
export { GoogleMeetService } from './GoogleMeetService';
export type { ClassBookingRequest, GeneratedMeetingResponse } from './GoogleMeetService';

export interface CalendarEventPayload {
  summary: string;
  description: string;
  startDateTime: string; // ISO
  endDateTime: string; // ISO
  timeZone?: string;
  attendeeEmail: string;
}

export interface CreatedClassEvent {
  eventId: string;
  meetUrl: string;
  htmlLink: string;
}

/**
 * Creates a Google Calendar Event with an attached Google Meet video conference.
 * Uses conferenceDataVersion=1 to provision a Google Meet room.
 */
export async function createCalendarMeetClass(payload: CalendarEventPayload): Promise<CreatedClassEvent> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Google OAuth token is not available. Please sign in with Google to enable Calendar & Meet integration.');
  }

  const timeZone = payload.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  const bodyData = {
    summary: payload.summary,
    description: payload.description,
    start: {
      dateTime: payload.startDateTime,
      timeZone: timeZone,
    },
    end: {
      dateTime: payload.endDateTime,
      timeZone: timeZone,
    },
    attendees: [
      { email: payload.attendeeEmail }
    ],
    conferenceData: {
      createRequest: {
        requestId: `alnabeel-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 }
      ]
    }
  };

  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Google Calendar API Error:', errorText);
    throw new Error(`Failed to create Calendar & Meet event: ${response.statusText}`);
  }

  const data = await response.json();
  const meetUrl = data.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === 'video')?.uri 
    || data.hangoutLink 
    || `https://meet.google.com/lookup/${data.id?.substring(0, 10)}`;

  return {
    eventId: data.id,
    meetUrl: meetUrl,
    htmlLink: data.htmlLink
  };
}

/**
 * Sends a notification email via the user's Gmail API.
 */
export async function sendGmailMessage(toEmail: string, subject: string, messageBody: string): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) {
    console.warn('OAuth token not available for Gmail send. User must sign in with Google.');
    return false;
  }

  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const emailLines = [
    `To: ${toEmail}`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    messageBody
  ];

  const rawMessage = emailLines.join('\r\n');
  const encodedEmail = btoa(unescape(encodeURIComponent(rawMessage)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: encodedEmail })
  });

  if (!response.ok) {
    console.error('Failed to send email via Gmail:', await response.text());
    return false;
  }

  return true;
}
