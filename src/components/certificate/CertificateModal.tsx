import React, { useRef } from 'react';
import { CertificateRecord } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { BrandLogo } from '../common/BrandLogo';
import { X, Download, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  certificate: CertificateRecord;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const { t } = useLanguage();
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-amber-300 flex flex-col my-8">
        
        {/* Modal Top Bar */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">
              {t('شهادة إتمام معتمدة رسمياً', 'Official Certificate of Completion')}
            </span>
            <span className="text-xs text-amber-300 font-mono ml-2">
              #{certificate.verificationCode}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('طباعة / حفظ PDF', 'Print / Save PDF')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Sheet (A4 Proportion) */}
        <div className="p-4 sm:p-8 bg-gray-100 flex justify-center overflow-x-auto">
          <div
            ref={certRef}
            className="w-full max-w-[800px] aspect-[1.414/1] bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 p-8 sm:p-12 rounded-2xl shadow-xl border-8 border-double border-amber-600/40 relative flex flex-col justify-between text-center select-none"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(217, 119, 6, 0.03) 0%, transparent 70%)`
            }}
          >
            {/* Ornate Corner Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600"></div>
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600"></div>

            {/* Header: Logo & Title */}
            <div>
              <div className="flex justify-center mb-2">
                <BrandLogo size="lg" showSubtitle={false} />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-arabic tracking-wide">
                شَهَادَةُ إِتْمَامٍ دِرَاسِيَّة
              </h1>
              <p className="text-xs uppercase tracking-widest text-amber-800 font-bold mt-0.5">
                Certificate of Course Completion
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2"></div>
            </div>

            {/* Main Body */}
            <div className="my-auto space-y-3 py-2">
              <p className="text-xs sm:text-sm text-gray-600">
                تَشْهَدُ إِدَارَةُ مَنَصَّةِ <span className="font-bold text-emerald-950">النَّبِيلِ فِي اللُّغَةِ العَرَبِيَّةِ لِغَيْرِ النَّاطِقِينَ بِهَا</span> بِأَنَّ الطَّالِبَ/ـة:
              </p>

              {/* Student Name */}
              <div className="text-2xl sm:text-4xl font-extrabold text-emerald-900 font-arabic underline decoration-amber-400 decoration-2 underline-offset-8">
                {certificate.studentName}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed pt-2">
                قَدْ أَتَمَّ بِنَجَاحٍ دِرَاسَةَ مَنْهَجِ:
                <br />
                <span className="font-extrabold text-base sm:text-lg text-amber-900 font-arabic">
                  «{certificate.courseNameAr}»
                </span>
                <br />
                <span className="text-xs font-semibold text-gray-500 font-sans">
                  {certificate.courseName} — {certificate.level}
                </span>
              </p>

              <div className="text-xs font-semibold text-emerald-800">
                بِتَقْدِيرِ: <span className="font-bold text-amber-700">{certificate.grade || 'مُمْتَاز (Excellent)'}</span>
              </div>
            </div>

            {/* Footer: Date, Signature, Gold Seal, QR Code */}
            <div className="grid grid-cols-3 items-end pt-4 border-t border-amber-400/40 text-xs">
              
              {/* Left: Issue Date & Verification */}
              <div className="text-start space-y-1">
                <span className="text-[10px] text-gray-400 block">{t('تاريخ الإصدار', 'Date of Issue')}</span>
                <span className="font-bold text-gray-800 font-mono">{certificate.issueDate}</span>
                <span className="text-[10px] text-emerald-700 block font-mono">
                  ID: {certificate.verificationCode}
                </span>
              </div>

              {/* Center: Gold Embossed Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-amber-600 p-1 flex items-center justify-center bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md">
                  <div className="w-full h-full rounded-full border border-amber-700 flex flex-col items-center justify-center text-center p-1">
                    <span className="text-[8px] font-black text-amber-950 uppercase tracking-tighter">AL-NABEEL</span>
                    <span className="text-base font-bold text-emerald-950 font-arabic">النبيل</span>
                    <span className="text-[7px] font-bold text-amber-900">VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Right: Teacher Signature */}
              <div className="text-end space-y-1">
                <span className="text-[10px] text-gray-400 block">{t('المعلم والمشرف العام', 'Instructor & Director')}</span>
                <div className="font-arabic font-extrabold text-sm text-emerald-950">
                  {certificate.teacherNameAr || 'أحمد نبيل النحراوي'}
                </div>
                <div className="text-[9px] text-amber-800 font-serif italic">
                  Ahmed Nabil Al-Nahrawy
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
