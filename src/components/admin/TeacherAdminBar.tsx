import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldCheck,
  Video,
  BookOpen,
  Users,
  Settings,
  LogIn,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Crown,
  CheckCircle2
} from 'lucide-react';
import { ADMIN_EMAIL } from '../../services/auth';

interface TeacherAdminBarProps {
  onOpenAdmin: (tab?: string) => void;
}

export const TeacherAdminBar: React.FC<TeacherAdminBarProps> = ({ onOpenAdmin }) => {
  const { user, profile, isAdmin, loginAsTeacherAdmin, logoutUser } = useAuth();
  const { t, lang } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const teacherNameAr = 'الأستاذ أحمد نبيل النحراوي';
  const teacherNameEn = 'Teacher Ahmed Nabil Al-Nahrawy';

  return (
    <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E7] to-[#FFFDF9] text-[#2C160B] border-b border-amber-300 shadow-xs relative z-40 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          
          {/* Left / Start: Teacher Identity & Badge */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-[#24130a] font-black shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#24130a]" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-ping"></span>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="min-w-0 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] sm:text-xs font-black tracking-wide text-amber-900 font-arabic whitespace-nowrap">
                {t('خانة المعلم المشرف:', 'Teacher Admin:')}
              </span>
              <span className="font-bold text-[#2C160B] font-arabic text-xs truncate">
                {t(teacherNameAr, teacherNameEn)}
              </span>
              <span className="hidden md:inline-block text-amber-900 font-mono text-[11px] bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300">
                {ADMIN_EMAIL}
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-200 text-amber-950 border border-amber-400 rounded-full whitespace-nowrap">
                {isAdmin ? t('مشرف معتمد', 'Active') : t('المعلم', 'Teacher')}
              </span>
            </div>
          </div>

          {/* Quick Actions for Teacher Admin */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {isAdmin ? (
              <>
                {/* Main Admin CMS Button */}
                <button
                  onClick={() => onOpenAdmin('analytics')}
                  className="px-2.5 sm:px-3.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#24130a] text-[11px] sm:text-xs font-black rounded-lg shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="لوحة تحكم وإدارة المنصة"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('لوحة تحكم المعلم (CMS)', 'Teacher CMS')}</span>
                </button>

                {/* Google Meet & Classes Quick Link */}
                <button
                  onClick={() => onOpenAdmin('classes')}
                  className="hidden sm:flex px-2.5 py-1 bg-amber-100/90 hover:bg-amber-200 text-amber-950 text-[11px] sm:text-xs font-bold rounded-lg border border-amber-300 shadow-xs transition-colors items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Video className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('Google Meet', 'Meet')}</span>
                </button>

                {/* Book & PDF Management Quick Link */}
                <button
                  onClick={() => onOpenAdmin('books')}
                  className="hidden md:flex px-2.5 py-1 bg-amber-100/90 hover:bg-amber-200 text-amber-950 text-[11px] sm:text-xs font-bold rounded-lg border border-amber-300 shadow-xs transition-colors items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('إدارة ورفع الكتاب (PDF)', 'Manage/Upload Book')}</span>
                </button>

                {/* Curriculum & Lessons Quick Link */}
                <button
                  onClick={() => onOpenAdmin('lessons')}
                  className="hidden lg:flex px-2.5 py-1 bg-amber-100/90 hover:bg-amber-200 text-amber-950 text-[11px] sm:text-xs font-bold rounded-lg border border-amber-300 shadow-xs transition-colors items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('المنهج (30 وحدة)', 'Curriculum')}</span>
                </button>
              </>
            ) : (
              /* If not currently authenticated as admin, 1-click activate */
              <button
                onClick={async () => {
                  await loginAsTeacherAdmin();
                  onOpenAdmin('analytics');
                }}
                className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#24130a] text-xs font-extrabold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 text-[#24130a]" />
                <span>{t('دخول المعلم المشرف', 'Teacher Login')}</span>
              </button>
            )}

            {/* Toggle bar visibility or collapse */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل الإضافية'}
            >
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

        {/* Collapsible Info Bar */}
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-amber-300 flex flex-wrap items-center justify-between text-[11px] text-[#5C381E] gap-2 font-medium">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('البريد الإلكتروني المعتمد للمشرف:', 'Authorized Teacher Email:')} <strong>{ADMIN_EMAIL}</strong></span>
              </span>
              <span className="hidden sm:inline-block text-amber-400/50">•</span>
              <span className="flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('خدمة Google Meet: مفعلة لتوليد روابط الاجتماعات تلقائياً', 'Google Meet Service: Active & Synchronized')}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAdmin('settings')}
                className="text-[11px] text-amber-800 hover:text-amber-950 hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <Settings className="w-3 h-3" />
                <span>{t('تخصيص الهوية والأسعار (USD / AED)', 'Edit Branding & Pricing')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
