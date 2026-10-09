import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { GoogleMeetService } from '../../services/GoogleMeetService';
import { ADMIN_EMAIL } from '../../services/auth';
import {
  X,
  Video,
  Calendar,
  Clock,
  Globe,
  User,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface LiveClassBookingModalProps {
  onClose: () => void;
  onBookingSuccess?: (meetUrl: string) => void;
}

export const LiveClassBookingModal: React.FC<LiveClassBookingModalProps> = ({
  onClose,
  onBookingSuccess
}) => {
  const { user, profile } = useAuth();
  const { t } = useLanguage();

  const [classType, setClassType] = useState<'private' | 'group'>('private');
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [studentName, setStudentName] = useState(profile?.displayName || 'Student');
  const [studentEmail, setStudentEmail] = useState(user?.email || '');
  const [lessonTopic, setLessonTopic] = useState('الوحدة الأولى: حوار التعارف والتحيات');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{ meetUrl: string; eventId: string } | null>(null);

  const availableTimes = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentEmail) {
      setErrorMsg(t('يرجى إدخال البريد الإلكتروني للطالب', 'Please enter student email'));
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const startDateTime = new Date(`${selectedDate}T${selectedTime}:00`).toISOString();

      // Automatically generate new Google Meet link and Calendar event via GoogleMeetService
      const result = await GoogleMeetService.generateMeetingForClass({
        classType,
        studentName,
        studentEmail,
        studentUid: user?.uid,
        lessonTopic,
        scheduledAt: startDateTime,
        durationMinutes: 50,
        timeZone: userTimezone,
        notes: notes
      });

      setBookingResult({
        meetUrl: result.meetUrl,
        eventId: result.calendarEventId
      });
      if (onBookingSuccess) onBookingSuccess(result.meetUrl);

    } catch (err: any) {
      console.error('Booking error:', err);
      setErrorMsg(err.message || 'Failed to complete booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base font-arabic">
                {t('حجز حصة تفاعلية مباشرة مع المعلم', 'Book Live Arabic Class')}
              </h3>
              <p className="text-xs text-emerald-300">
                {t('مدعومة بروابط Google Meet وتقويم Google Calendar', 'Powered by Google Meet & Google Calendar')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {bookingResult ? (
            /* Booking Confirmation Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-gray-900 font-arabic">
                  {t('تم تأكيد حجز الحصة بنجاح!', 'Class Scheduled Successfully!')}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {t(
                    'تمت إضافة الموعد إلى تقويم Google وتوليد غرفة Google Meet وإرسال تفاصيل الدعوة لبريدك.',
                    'Synced to Google Calendar, Google Meet link created, and confirmation sent.'
                  )}
                </p>
              </div>

              {/* Google Meet Link Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-start space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>{t('رابط غرفة Google Meet:', 'Google Meet URL:')}</span>
                  <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-900">HD Video</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={bookingResult.meetUrl}
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-emerald-800 font-mono"
                  />
                  <a
                    href={bookingResult.meetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <span>{t('انضم الآن', 'Join')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] text-gray-500">
                  {t('الموعد:', 'Scheduled for:')} {selectedDate} @ {selectedTime} ({userTimezone})
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                {t('إغلاق والعودة للمنصة', 'Close & Return to Platform')}
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookSession} className="space-y-4">
              
              {/* Class Type Switcher */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setClassType('private')}
                  className={`p-3 rounded-2xl border-2 text-start transition-all cursor-pointer ${
                    classType === 'private'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold">{t('حصة فردية خاصة (1-on-1)', 'Private 1-on-1')}</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block">{t('تركيز كامل 50 دقيقة', '50 mins dedicated mentorship')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setClassType('group')}
                  className={`p-3 rounded-2xl border-2 text-start transition-all cursor-pointer ${
                    classType === 'group'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Video className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold">{t('حصة تفاعلية جماعية', 'Group Session')}</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block">{t('تواصل وتدريب مع طلاب', 'Interactive group cohort')}</span>
                </button>
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('اسم الطالب', 'Student Name')}</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('البريد الإلكتروني لدعوة Calendar', 'Student Email for Calendar')}</label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
                    placeholder="student@example.com"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t('تاريخ الحصة', 'Class Date')}</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t('الوقت المتاح', 'Available Slot')}</span>
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none bg-white"
                  >
                    {availableTimes.map((tm) => (
                      <option key={tm} value={tm}>
                        {tm} ({userTimezone.split('/')[1] || userTimezone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lesson Topic */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('موضوع الحصة المرغوب', 'Topic to Focus On')}</label>
                <select
                  value={lessonTopic}
                  onChange={(e) => setLessonTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none bg-white font-arabic"
                >
                  <option value="الوحدة الأولى: حوار التعارف والتحيات">الوحدة 1: حوار التعارف والتحيات</option>
                  <option value="الوحدة الثانية: نطق الحروف والحركات القصيرة">الوحدة 2: نطق الحروف والحركات القصيرة</option>
                  <option value="الفصل الرابع: بناء الجملة الاسمية وحروف الجر">الفصل 4: بناء الجملة وحروف الجر</option>
                  <option value="الفصل السادس: مواقف المطعم وطلب الطعام والشراء">الفصل 6: المطعم والشراء والأرقام</option>
                  <option value="الفصل السابع: السؤال عن الاتجاهات والأماكن">الفصل 7: الاتجاهات في المدينة</option>
                  <option value="مراجعة شاملة وتدريب على المحادثة الحرة">مراجعة شاملة ومحادثة حرة</option>
                </select>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t('جارٍ إنشاء موعد Calendar ورابط Meet...', 'Syncing Calendar & Creating Meet...')}</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>{t('تأكيد الحجز وإنشاء غرفة Google Meet', 'Confirm Booking & Create Google Meet')}</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
