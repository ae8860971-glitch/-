import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useLanguage } from '../../context/LanguageContext';
import { SiteSettings } from '../../types';
import { ShieldCheck, Heart, Mail, Globe, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  siteSettings?: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, siteSettings }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-[#F7F0E4] to-[#EFE4D3] text-[#2C160B] pt-16 pb-12 border-t-2 border-[#DFCDB5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Teacher Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo
              size="lg"
              variant="dark"
              customLogoUrl={siteSettings?.logoUrl}
              customTitle={siteSettings?.brandNameAr}
              customSubtitle={siteSettings?.logoSubtitleAr}
            />
            
            <p className="text-xs text-[#5C381E] leading-relaxed font-arabic font-medium max-w-sm">
              {t(
                'المنصة التعليمية الأولى المتخصصة في تدريس اللغة العربية لغير الناطقين بها حول العالم، استناداً إلى كتاب «مدخل إلى اللغة العربية» بإعداد المعلم أحمد نبيل النحراوي.',
                'The premier educational platform for non-native Arabic learners globally, built upon the official communicative textbook by Teacher Ahmed Nabil Al-Nahrawy.'
              )}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold text-amber-900">
              <span className="px-2 py-1 bg-white/80 rounded-md border border-amber-300 shadow-xs">🇺🇸 United States</span>
              <span className="px-2 py-1 bg-white/80 rounded-md border border-amber-300 shadow-xs">🇪🇺 Europe</span>
              <span className="px-2 py-1 bg-white/80 rounded-md border border-amber-300 shadow-xs">🇦🇪 Dubai / UAE</span>
              <span className="px-2 py-1 bg-white/80 rounded-md border border-amber-300 shadow-xs">🌍 International</span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
              {t('المنهج والتعليم', 'Curriculum')}
            </h4>
            <ul className="space-y-2 text-xs text-[#5C381E] font-medium">
              <li><button onClick={() => onNavigate('book')} className="hover:text-amber-800 transition-colors cursor-pointer">{t('كتاب النبيل المعتمد', 'The Textbook')}</button></li>
              <li><button onClick={() => onNavigate('lessons')} className="hover:text-amber-800 transition-colors cursor-pointer">{t('الفصول والوحدات', 'Chapters & Units')}</button></li>
              <li><button onClick={() => onNavigate('games')} className="hover:text-amber-800 transition-colors cursor-pointer">{t('الألعاب التعليمية', 'Educational Games')}</button></li>
              <li><button onClick={() => onNavigate('classes')} className="hover:text-amber-800 transition-colors cursor-pointer">{t('حصص Google Meet', 'Live Classes')}</button></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
              {t('الاشتراك والشهادات', 'Plans & Verification')}
            </h4>
            <ul className="space-y-2 text-xs text-[#5C381E] font-medium">
              <li><button onClick={() => onNavigate('memberships')} className="hover:text-amber-800 transition-colors cursor-pointer">{t('باقات الاشتراكات (USD / AED)', 'Membership Plans')}</button></li>
              <li><button onClick={() => onNavigate('certificates')} className="hover:text-amber-800 transition-colors cursor-pointer">{t('بوابة التحقق من الشهادة', 'Verify Certificate')}</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-800 transition-colors cursor-pointer">{t('التجربة المجانية (3 أيام)', '3-Day Free Trial')}</button></li>
            </ul>
          </div>

          {/* Teacher & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
              {t('التواصل الرسمي', 'Official Contact')}
            </h4>
            <div className="space-y-2 text-xs text-[#5C381E]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-mono font-bold text-amber-950">ae8860971@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">Google Workspace Verified</span>
              </div>
              <p className="text-[10px] text-amber-900/90 pt-2 font-arabic font-bold">
                إشراف وإعداد: المعلم أحمد نبيل النحراوي
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Dedication */}
        <div className="pt-8 border-t border-[#DFCDB5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6A4021] font-medium">
          <div>
            © {new Date().getFullYear()} {t('منصة النبيل في اللغة العربية للأعاجم. جميع الحقوق محفوظة.', 'Al-Nabeel Arabic. All rights reserved.')}
          </div>
          <div className="flex items-center gap-1.5 text-amber-900 font-bold">
            <span>{t('إهداء خاص للمساعد الذكي شلبي AI 🤖', 'Special dedication to Shelby AI assistant 🤖')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
