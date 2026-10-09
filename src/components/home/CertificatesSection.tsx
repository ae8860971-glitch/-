import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Award, ShieldCheck, CheckCircle2, Search, ExternalLink, Sparkles } from 'lucide-react';

interface CertificatesSectionProps {
  onViewSampleCertificate: () => void;
  onVerifyCode: (code: string) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  onViewSampleCertificate,
  onVerifyCode
}) => {
  const { t } = useLanguage();
  const [searchCode, setSearchCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      onVerifyCode(searchCode.trim());
    }
  };

  return (
    <section id="certificates" className="py-20 bg-[#FAF7F2] relative border-b border-[#e6d8c3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#78350f] text-xs font-bold mb-3 border border-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('توثيق رسمي ومعتمد', 'Accredited Verification')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2a170d] font-arabic">
            {t('شهادة إتمام رسمية معتمدة لكل طالب', 'Official Verified Certificate of Completion')}
          </h2>
          <p className="mt-3 text-base text-[#5c3a21] font-arabic">
            {t(
              'يحصل كل طالب يتم فصول الكتاب والاختبارات بنجاح على شهادة تخرج مهنية معتمدة برمز تحقق رقمي فريد وتوقيع المعلم أحمد نبيل النحراوي.',
              'Every student who completes the textbook units and challenges receives an official accredited Certificate of Completion with a unique digital verification code and instructor signature.'
            )}
          </p>
        </div>

        {/* Certificate Card and Verification Tool */}
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E7] to-[#F5E6D2] rounded-3xl p-8 sm:p-12 text-[#2A160B] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl border-2 border-[#E2CEB1]">
          
          {/* Left Column: Certificate Features */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-black font-arabic text-[#2A160B]">
              {t('مواصفات شهادة النبيل في اللغة العربية', 'Al-Nabeel Arabic Certificate Credentials')}
            </h3>

            <div className="space-y-3 text-sm text-[#4D2D18] font-arabic font-semibold">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>{t('رمز تحقق إلكتروني فريد يمكن التحقق منه دولياً', 'Unique electronic verification ID verifiable globally')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>{t('جاهزة للطباعة والتحميل بجودة عالية قياس A4', 'High-resolution printable A4 format')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>{t('توقيع رسمي من المعلم أحمد نبيل النحراوي', 'Official signature from Teacher Ahmed Nabil Al-Nahrawy')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>{t('مناسبة لإضافتها في السيرة الذاتية وملف LinkedIn', 'Perfect for resumes, CVs, and LinkedIn profiles')}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onViewSampleCertificate}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] font-black text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all border border-amber-300"
              >
                <Sparkles className="w-4 h-4 fill-[#24130a]" />
                <span>{t('معاينة نموذج الشهادة المعتمدة', 'Preview Sample Certificate')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Public Certificate Verification Form */}
          <div className="lg:col-span-5 bg-white/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-300/80 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm font-arabic">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>{t('بوابة التحقق من صحة الشهادة', 'Certificate Verification Portal')}</span>
            </div>
            <p className="text-xs text-[#6A4021] leading-relaxed font-arabic font-medium">
              {t(
                'أدخل رمز التحقق (Verification ID) للتأكد الفوري من صحة الشهادة وبيانات الطالب وتاريخ التخرج.',
                'Enter the verification code to instantly verify certificate validity, student name, and graduation date.'
              )}
            </p>

            <form onSubmit={handleSearch} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  required
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="e.g. NABEEL-2026-AR01"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] text-[#24130a] placeholder-stone-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 border border-amber-300 shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#24130A] font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-amber-300 shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>{t('التحقق من الشهادة الآن', 'Verify Certificate Now')}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
