import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Lesson, Book, CertificateRecord } from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Flame,
  Video,
  Award,
  Download,
  Calendar,
  Sparkles,
  Play,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface StudentDashboardProps {
  lessons: Lesson[];
  book: Book;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenBookReader: (book: Book) => void;
  onOpenBooking: () => void;
  onViewCertificate: () => void;
  onOpenUpgrade: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  lessons,
  book,
  onOpenLesson,
  onOpenBookReader,
  onOpenBooking,
  onViewCertificate,
  onOpenUpgrade
}) => {
  const { user, profile, isAdmin } = useAuth();
  const { t } = useLanguage();

  const completedLessons = profile?.allowedLessons?.length || 2;
  const totalLessons = lessons.length;
  const progressPercent = Math.min(Math.round((completedLessons / totalLessons) * 100), 100);

  // Check trial status
  const isTrial = profile?.membershipStatus === 'trial';
  const trialEnd = profile?.trialEndDate ? new Date(profile.trialEndDate) : null;
  const now = new Date();
  const daysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{profile?.membershipPlan || t('عضوية تجريبية', 'Trial Student')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-arabic">
              {t(`مرحباً بك يا ${profile?.displayName || 'طالبنا العزيز'}!`, `Welcome back, ${profile?.displayName || 'Student'}!`)}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl">
              {t(
                'استمر في إتقان وحدات كتاب النبيل، وتدرب على النطق بالألعاب التفاعلية، واستعد لحصتك القادمة.',
                'Continue your Arabic learning journey with Teacher Ahmed Nabil Al-Nahrawy.'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 z-10">
            <button
              onClick={() => onOpenLesson(lessons[0])}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-extrabold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t('متابعة التعلّم', 'Continue Learning')}</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/10 transition-colors cursor-pointer"
            >
              <Video className="w-4 h-4 text-amber-300" />
              <span>{t('حجز حصة Google Meet', 'Book Live Class')}</span>
            </button>
          </div>
        </div>

        {/* Trial Warning Banner if on trial */}
        {isTrial && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-amber-900 font-arabic">
                  {t('فترة التجربة المجانية نشطة', 'Free Trial Active')}
                </h4>
                <p className="text-xs text-amber-800">
                  {t(`متبقي ${daysLeft} أيام في تجربتك المجانية قبل قفل الدروس. اشترك للاحتفاظ بالوصول الكامل.`, `${daysLeft} days remaining on your free trial. Upgrade to keep lifetime access.`)}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenUpgrade}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer"
            >
              {t('ترقية الاشتراك الآن', 'Upgrade Plan')}
            </button>
          </div>
        )}

        {/* Metrics Grid: Progress, Points, Streak, Classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">{t('إنجاز المنهج', 'Curriculum Progress')}</span>
              <span className="text-xl font-black text-gray-900">{progressPercent}%</span>
              <span className="text-[11px] text-emerald-700 font-medium block">
                {completedLessons} / {totalLessons} {t('وحدات', 'Units')}
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">{t('مجموع النقاط', 'Total Points')}</span>
              <span className="text-xl font-black text-gray-900">450 pts</span>
              <span className="text-[11px] text-amber-700 font-medium block">{t('المستوى 2 — متقدم', 'Level 2 Learner')}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">{t('أيام الحماس المتتالية', 'Daily Streak')}</span>
              <span className="text-xl font-black text-gray-900">3 {t('أيام', 'Days')}</span>
              <span className="text-[11px] text-red-600 font-medium block">{t('واصل التدريب اليومي!', 'Keep it going!')}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">{t('الحصص المباشرة', 'Live Classes')}</span>
              <span className="text-xl font-black text-gray-900">Google Meet</span>
              <span className="text-[11px] text-blue-700 font-medium block">{t('مزامنة مع Calendar', 'Calendar Synced')}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Content: Upcoming Classes & Book Shelf */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Recent Lessons & Book */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Book Shelf Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-950 font-bold font-arabic text-base">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                  <span>{t('مكتبة كتبي الرقمية', 'My Digital Book Shelf')}</span>
                </div>
                <button
                  onClick={() => onOpenBookReader(book)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                >
                  {t('فتح القارئ الإلكتروني', 'Open Digital Reader')}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-20 rounded-lg bg-emerald-950 text-amber-400 p-2 flex flex-col justify-between text-center shadow-md">
                    <span className="text-[8px] font-bold">AL-NABEEL</span>
                    <span className="text-xs font-arabic font-extrabold">النبيل</span>
                    <span className="text-[7px]">PDF</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 font-arabic">{book.titleAr}</h4>
                    <p className="text-xs text-gray-500">{book.authorAr} • {book.totalPages} ص</p>
                    <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded">
                      {t('مرخص بالكامل للقراءة', 'Full Reading License')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenBookReader(book)}
                    className="px-4 py-2 rounded-xl bg-white border border-emerald-600 text-emerald-800 text-xs font-bold hover:bg-emerald-50 cursor-pointer"
                  >
                    {t('قراءة أونلاين', 'Read Online')}
                  </button>
                  <button
                    onClick={() => alert(t('تم توليد رابط التحميل الآمن لكتاب النبيل PDF.', 'Secure PDF download started.'))}
                    className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t('تحميل', 'Download')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access Lessons List */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold font-arabic text-base text-gray-900">
                  {t('دروسك المقترحة التالية', 'Continue Studying')}
                </h3>
              </div>

              <div className="space-y-3">
                {lessons.slice(0, 3).map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => onOpenLesson(lesson)}
                    className="p-4 rounded-2xl border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
                        {lesson.unitNumber}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 font-arabic">
                          {lesson.titleAr}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {lesson.unitTitleAr} ({lesson.titleEn})
                        </p>
                      </div>
                    </div>

                    <button className="px-4 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      {t('متابعة', 'Resume')}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Classes & Certificates */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Class Schedule Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-emerald-950 font-arabic text-sm">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>{t('حصتك المباشرة القادمة', 'Next Live Class')}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                  <span>Google Meet Session</span>
                  <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded text-amber-900">Scheduled</span>
                </div>

                <div className="text-xs space-y-1 text-gray-700">
                  <p className="font-bold font-arabic text-emerald-950">حصة تدريب المحادثة مع المعلم أحمد</p>
                  <p className="text-[11px] text-gray-500">غداً في تمام الساعة 14:00 (توقيتك المحلي)</p>
                </div>

                <a
                  href="https://meet.google.com/aln-arab-live"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Video className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('الانضمام لغرفة Google Meet', 'Join Google Meet')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 text-center block cursor-pointer"
              >
                + {t('حجز حصة جديدة', 'Book another class')}
              </button>
            </div>

            {/* Issued Certificate Banner */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-emerald-950 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6 fill-emerald-950" />
              </div>
              <h4 className="font-bold text-base font-arabic">
                {t('شهادة إتمام المستوى', 'Level Completion Certificate')}
              </h4>
              <p className="text-xs leading-relaxed text-emerald-950/80">
                {t(
                  'أكمل بقية اختبارات الفصول لإصدار شهادتك الرسمية المعتمدة برمز التحقق QR.',
                  'Complete course challenges to issue your official verified certificate.'
                )}
              </p>
              <button
                onClick={onViewCertificate}
                className="w-full py-2 rounded-xl bg-emerald-950 text-white font-bold text-xs hover:bg-emerald-900 cursor-pointer transition-colors shadow-xs"
              >
                {t('معاينة الشهادة المعتمدة', 'Preview Certificate')}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
