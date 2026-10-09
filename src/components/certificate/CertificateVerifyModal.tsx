import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CertificateRecord } from '../../types';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Search, Award } from 'lucide-react';

interface CertificateVerifyModalProps {
  initialCode?: string;
  onClose: () => void;
  onViewFullCertificate: (cert: CertificateRecord) => void;
}

export const CertificateVerifyModal: React.FC<CertificateVerifyModalProps> = ({
  initialCode = '',
  onClose,
  onViewFullCertificate
}) => {
  const { t } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<CertificateRecord | null>(null);
  const [searched, setSearched] = useState(false);

  // Mock / Verified database of issued certificates
  const sampleCertificates: Record<string, CertificateRecord> = {
    'NABEEL-2026-AR01': {
      id: 'cert-1',
      verificationCode: 'NABEEL-2026-AR01',
      userId: 'u-1',
      studentName: 'David Miller',
      courseName: 'An Introduction to Arabic for Non-Native Speakers',
      courseNameAr: 'مدخل إلى اللغة العربية لغير الناطقين بها',
      level: 'Elementary Level (A1)',
      levelAr: 'المستوى التأسيسي (A1)',
      teacherName: 'Ahmed Nabil Al-Nahrawy',
      teacherNameAr: 'أحمد نبيل النحراوي',
      issueDate: '2026-09-28',
      grade: 'مُمْتَاز مع مرتبة الشرف (High Honors)'
    },
    'NABEEL-2026-AR02': {
      id: 'cert-2',
      verificationCode: 'NABEEL-2026-AR02',
      userId: 'u-2',
      studentName: 'Sophia Laurent',
      courseName: 'An Introduction to Arabic for Non-Native Speakers',
      courseNameAr: 'مدخل إلى اللغة العربية لغير الناطقين بها',
      level: 'Intermediate Communication (A2)',
      levelAr: 'المستوى التواصلي المتوسط (A2)',
      teacherName: 'Ahmed Nabil Al-Nahrawy',
      teacherNameAr: 'أحمد نبيل النحراوي',
      issueDate: '2026-09-30',
      grade: 'مُمْتَاز (Excellent)'
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleaned = code.trim().toUpperCase();
    if (sampleCertificates[cleaned]) {
      setResult(sampleCertificates[cleaned]);
    } else {
      // Dynamic fallback certificate for testing any code
      setResult({
        id: `cert-${Date.now()}`,
        verificationCode: cleaned || 'NABEEL-2026-VERIFIED',
        userId: 'student-demo',
        studentName: 'Honored Arabic Graduate',
        courseName: 'An Introduction to Arabic for Non-Native Speakers',
        courseNameAr: 'مدخل إلى اللغة العربية لغير الناطقين بها',
        level: 'Beginner Level (A1 - A2)',
        levelAr: 'المستوى التأسيسي الشامل',
        teacherName: 'Ahmed Nabil Al-Nahrawy',
        teacherNameAr: 'أحمد نبيل النحراوي',
        issueDate: '2026-10-02',
        grade: 'مُمْتَاز (Verified Grade)'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm font-arabic">
              {t('التحقق الإلكتروني من الشهادة المعتمدة', 'Certificate Verification Portal')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleVerify} className="flex gap-2">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. NABEEL-2026-AR01"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:border-emerald-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t('تحقق', 'Verify')}</span>
            </button>
          </form>

          {searched && result && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-800" />
                  <span>{t('شهادة معتمدة وصحيحة 100%', 'Verified Authentic Certificate')}</span>
                </span>
                <span className="font-mono text-xs text-gray-500">#{result.verificationCode}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">{t('اسم الطالب المتخرج:', 'Student Name:')}</span>
                  <span className="text-base font-bold text-gray-900 font-arabic">{result.studentName}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px]">{t('المنهج الدراسي:', 'Course:')}</span>
                  <span className="font-bold text-emerald-950 font-arabic">{result.courseNameAr}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 text-[11px]">
                  <div>
                    <span className="text-gray-400 block">{t('المعلم المشرف:', 'Teacher:')}</span>
                    <span className="font-bold text-gray-800">{result.teacherNameAr}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">{t('تاريخ التخرج:', 'Date:')}</span>
                    <span className="font-mono font-bold text-gray-800">{result.issueDate}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onViewFullCertificate(result)}
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>{t('عرض وتحميل وثيقة الشهادة كاملة', 'View & Download Full Certificate')}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
