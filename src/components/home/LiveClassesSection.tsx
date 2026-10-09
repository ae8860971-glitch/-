import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Video, Calendar, Mail, Users, User, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LiveClassesSectionProps {
  onOpenBooking: () => void;
}

export const LiveClassesSection: React.FC<LiveClassesSectionProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <section id="classes" className="py-20 bg-gradient-to-b from-[#FCFBF8] to-[#F7F0E4] relative border-b border-[#e6d8c3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E7] to-[#F5E6D2] rounded-3xl p-8 sm:p-12 lg:p-16 text-[#2A160B] relative overflow-hidden shadow-xl border-2 border-[#E2CEB1]">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold shadow-xs">
                <Video className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('حصص تفاعلية مباشرة مع المعلم', 'Direct Live Interactive Sessions')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-arabic leading-tight text-[#2A160B]">
                {t(
                  'تحدث العربية بطلاقة في حصص مباشرة عبر Google Meet',
                  'Speak Arabic Fluently in Live Google Meet Sessions'
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#5C371D] leading-relaxed font-arabic font-medium">
                {t(
                  'انضم إلى المعلم أحمد نبيل النحراوي في حصص فردية خاصة أو جماعية تفاعلية. يتم ربط كل جلسة مباشرة بتقويم Google Calendar وتوليد رابط Google Meet مخصص مع إشعارات تذكيرية عبر Gmail.',
                  'Learn directly with Teacher Ahmed Nabil Al-Nahrawy in 1-on-1 private sessions or group cohorts. Every class syncs seamlessly with Google Calendar and generates a secure Google Meet link with automated Gmail notifications.'
                )}
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#422310] font-arabic font-semibold">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{t('حصص فردية مخصصة (One-to-One)', 'Private 1-on-1 Mentorship')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{t('غرف Google Meet مشفرة وعالية الجودة', 'HD Encrypted Google Meet Rooms')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{t('مزامنة فورية مع Google Calendar', 'Instant Google Calendar Sync')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{t('إشعارات وتذكيرات عبر Gmail', 'Automated Gmail Reminders')}</span>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] font-black text-sm shadow-xl shadow-amber-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5 border border-amber-300"
                >
                  <Calendar className="w-4 h-4 fill-current" />
                  <span>{t('احجز موعد حصتك المباشرة الآن', 'Book Your Live Class Now')}</span>
                </button>
              </div>
            </div>

            {/* Right Card: Teacher Ahmed Profile & Live Class Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/95 border-2 border-amber-300/80 rounded-3xl p-6 sm:p-8 max-w-sm w-full backdrop-blur-md space-y-5 text-center shadow-xl">
                
                {/* Teacher Avatar Ring */}
                <div className="relative mx-auto w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 shadow-md">
                  <div className="w-full h-full rounded-full bg-[#FAF4EA] overflow-hidden flex items-center justify-center">
                    <span className="text-3xl font-arabic font-black text-[#5C371D]">أ.ن</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[10px] text-[#24130a] font-black shadow-xs">
                    ✓
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black font-arabic text-[#2A160B]">
                    {t('المعلم أحمد نبيل النحراوي', 'Teacher Ahmed Nabil Al-Nahrawy')}
                  </h3>
                  <p className="text-xs text-amber-800 font-bold">
                    {t('معلم اللغة العربية لغير الناطقين بها', 'Lead Arabic Language Educator')}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-[#422310] text-start space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-800/80 font-medium">{t('المنصة التقنية:', 'Meeting Engine:')}</span>
                    <span className="font-bold text-amber-950">Google Meet</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-800/80 font-medium">{t('مدة الحصة:', 'Duration:')}</span>
                    <span className="font-bold text-amber-950">50 {t('دقيقة', 'mins')}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-800/80 font-medium">{t('المناطق المستهدفة:', 'Regions:')}</span>
                    <span className="font-bold text-amber-950">USA, Europe, Dubai & World</span>
                  </div>
                </div>

                <div className="text-[11px] text-amber-800 font-bold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>{t('حساب Google Workspace المعتمد', 'Official Verified Google Workspace')}</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
