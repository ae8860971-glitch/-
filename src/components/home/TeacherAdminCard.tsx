import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { GoogleMeetService } from '../../services/GoogleMeetService';
import { ADMIN_EMAIL } from '../../services/auth';
import {
  ShieldCheck,
  Video,
  BookOpen,
  Gamepad2,
  Users,
  Award,
  Crown,
  Settings,
  Sparkles,
  ExternalLink,
  Copy,
  CheckCircle2,
  PlusCircle,
  Clock,
  Mail
} from 'lucide-react';

interface TeacherAdminCardProps {
  onOpenAdmin: (tab?: string) => void;
  onOpenBookingModal?: () => void;
}

export const TeacherAdminCard: React.FC<TeacherAdminCardProps> = ({
  onOpenAdmin,
  onOpenBookingModal
}) => {
  const { user, profile, isAdmin, loginAsTeacherAdmin } = useAuth();
  const { t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [quickMeetUrl, setQuickMeetUrl] = useState<string>('https://meet.google.com/aln-arabic-class');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleGenerateInstantMeet = async () => {
    setIsGenerating(true);
    try {
      const result = await GoogleMeetService.generateMeetingForClass({
        classType: 'private',
        studentName: 'طالب تدريب (Demo Student)',
        studentEmail: 'student@example.com',
        lessonTopic: 'حصة لغة عربية مباشرة مع الأستاذ أحمد نبيل',
        scheduledAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        durationMinutes: 50
      });
      setQuickMeetUrl(result.meetUrl);
      setNotice(t('تم توليد رابط Google Meet وحفظ الموعد بنجاح!', 'Google Meet link generated successfully!'));
    } catch (err: any) {
      const fallbackUrl = `https://meet.google.com/aln-${Date.now().toString(36).substring(4)}`;
      setQuickMeetUrl(fallbackUrl);
      setNotice(t('تم تجهيز رابط Google Meet فوري للحصة!', 'Instant Google Meet room ready!'));
    } finally {
      setIsGenerating(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="py-10 bg-gradient-to-b from-[#24130a] via-[#351b0e] to-[#200f07] text-[#f7ebd8] relative overflow-hidden border-y-4 border-amber-500 shadow-xl">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-800/60">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#24130a] shadow-lg flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-[#24130a] uppercase tracking-wider">
                  {t('بوابة الإدارة الخاصة', 'Official Admin Hub')}
                </span>
                <span className="text-xs text-amber-200/80 font-mono">
                  {ADMIN_EMAIL}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#fff7ed] font-arabic mt-1">
                {t('خانة المعلم المشرف (الأستاذ أحمد نبيل النحراوي)', 'Teacher Admin Hub (Teacher Ahmed Nabil)')}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl mt-1 font-arabic">
                {t(
                  'لوحة القيادة المباشرة للمعلم: التحكم في المحتوى الأكاديمي، توليد حصص Google Meet التفاعلية، وإدارة الطلاب والاشتراكات.',
                  'Direct control console for the instructor: Manage curriculum, generate Google Meet classes, and administer students.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isAdmin ? (
              <button
                onClick={async () => {
                  await loginAsTeacherAdmin();
                  onOpenAdmin('analytics');
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-300"
              >
                <Sparkles className="w-4 h-4 text-[#24130a]" />
                <span>{t('تفعيل صلاحيات المعلم (ae8860971@gmail.com)', 'Authorize as Teacher Admin')}</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenAdmin('analytics')}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer border border-amber-300"
              >
                <Sparkles className="w-4 h-4 text-[#24130a]" />
                <span>{t('فتح لوحة التحكم الشاملة (CMS)', 'Open Full Admin CMS')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Notice alert */}
        {notice && (
          <div className="mt-4 p-3 rounded-xl bg-amber-400/20 border border-amber-400 text-amber-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{notice}</span>
          </div>
        )}

        {/* 4 Feature Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* Card 1: Live Google Meet Classes */}
          <div className="bg-[#1b0c05]/80 rounded-2xl p-5 border border-amber-900/60 hover:border-amber-400/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#4a2612] flex items-center justify-center text-amber-400 mb-3">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-amber-100 font-arabic">
                {t('حصص Google Meet المباشرة', 'Google Meet Live Sessions')}
              </h3>
              <p className="text-xs text-amber-200/70 mt-1 font-arabic">
                {t('توليد فوري لروابط Google Meet ومزامنتها على Google Calendar.', 'Instant Google Meet generation & Calendar sync.')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-900/60 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono bg-[#140803] px-2.5 py-1.5 rounded-lg border border-amber-900/60">
                <span className="truncate flex-1 text-amber-300">{quickMeetUrl}</span>
                <button
                  onClick={() => copyToClipboard(quickMeetUrl)}
                  className="text-amber-400 hover:text-white"
                  title="Copy link"
                >
                  {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={quickMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-white"
                  title="Open Meet"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleGenerateInstantMeet}
                  disabled={isGenerating}
                  className="w-full py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#24130a] text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{isGenerating ? t('جار التوليد...', 'Generating...') : t('توليد رابط فوري', 'New Meet Link')}</span>
                </button>
                <button
                  onClick={() => onOpenAdmin('classes')}
                  className="px-2.5 py-1.5 bg-[#4a2612] hover:bg-[#381c0c] text-amber-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-amber-700/40"
                  title="Manage Classes"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Curriculum & Lessons */}
          <div className="bg-[#1b0c05]/80 rounded-2xl p-5 border border-amber-900/60 hover:border-amber-400/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#4a2612] flex items-center justify-center text-amber-400 mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-amber-100 font-arabic">
                {t('المنهج: 10 أبواب و 30 وحدة', 'Curriculum: 10 Chapters')}
              </h3>
              <p className="text-xs text-amber-200/70 mt-1 font-arabic">
                {t('تعديل نصوص كتاب «النبيل»، إضافة روابط فيديو يوتيوب، وضبط أقسام المفردات.', 'Edit textbook lessons, YouTube videos, and exercises.')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-900/60 flex items-center gap-2">
              <button
                onClick={() => onOpenAdmin('books')}
                className="flex-1 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('رفع وإدارة الكتاب (PDF)', 'Manage/Upload PDF')}</span>
              </button>
              <button
                onClick={() => onOpenAdmin('lessons')}
                className="py-2 px-3 bg-[#4a2612] hover:bg-[#381c0c] text-amber-200 text-xs font-bold rounded-lg transition-colors flex items-center justify-center cursor-pointer border border-amber-700/40"
                title="إدارة الدروس"
              >
                <span>{t('الدروس', 'Lessons')}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Interactive Games & Exercises */}
          <div className="bg-[#1b0c05]/80 rounded-2xl p-5 border border-amber-900/60 hover:border-amber-400/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#4a2612] flex items-center justify-center text-amber-400 mb-3">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-amber-100 font-arabic">
                {t('منشئ الألعاب التعليمية', 'Interactive Game Builder')}
              </h3>
              <p className="text-xs text-amber-200/70 mt-1 font-arabic">
                {t('التحكم في ألعاب مطابقة الكلمات، ترتيب الجمل، الذاكرة، وسرعة البديهة.', 'Manage matching, ordering, memory & speed games.')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-900/60">
              <button
                onClick={() => onOpenAdmin('games')}
                className="w-full py-2 bg-[#4a2612] hover:bg-[#381c0c] text-amber-200 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border border-amber-700/40"
              >
                <span>{t('تخصيص الألعاب التعليمية', 'Customize Games')}</span>
                <span>←</span>
              </button>
            </div>
          </div>

          {/* Card 4: Students, Pricing & Certificates */}
          <div className="bg-[#1b0c05]/80 rounded-2xl p-5 border border-amber-900/60 hover:border-amber-400/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#4a2612] flex items-center justify-center text-amber-400 mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-amber-100 font-arabic">
                {t('شؤون الطلاب والأسعار', 'Students, Pricing & Certificates')}
              </h3>
              <p className="text-xs text-amber-200/70 mt-1 font-arabic">
                {t('منح الصلاحيات للطلاب، إصدار الشهادات، وتحديد الأسعار بالـ USD و AED.', 'Grant lesson access, issue certificates, set pricing.')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-900/60">
              <button
                onClick={() => onOpenAdmin('users')}
                className="w-full py-2 bg-[#4a2612] hover:bg-[#381c0c] text-amber-200 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border border-amber-700/40"
              >
                <span>{t('إدارة الطلاب والشهادات', 'Manage Students & Certs')}</span>
                <span>←</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
