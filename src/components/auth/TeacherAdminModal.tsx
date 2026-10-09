import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { BrandLogo } from '../common/BrandLogo';
import {
  X,
  ShieldCheck,
  Crown,
  Key,
  Mail,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface TeacherAdminModalProps {
  onClose: () => void;
  onSuccessAdmin: () => void;
}

export const TeacherAdminModal: React.FC<TeacherAdminModalProps> = ({
  onClose,
  onSuccessAdmin
}) => {
  const { signInWithGoogle, loginAsTeacherAdmin, profile, isAdmin } = useAuth();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const teacherEmail = 'ae8860971@gmail.com';

  const handleGoogleAdminLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
      onSuccessAdmin();
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Google Sign-in failed. Please try the direct session option.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantTeacherAccess = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await loginAsTeacherAdmin();
      onSuccessAdmin();
      onClose();
    } catch (err: any) {
      setErrorMsg('Failed to activate teacher session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-amber-400 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 text-center relative border-b border-amber-500/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-emerald-950 mx-auto flex items-center justify-center shadow-lg border-2 border-white/20 mb-3">
            <Crown className="w-8 h-8 fill-emerald-950" />
          </div>

          <h3 className="font-extrabold text-lg sm:text-xl font-arabic text-amber-300">
            {t('بوابة المعلم والمشرف العام (Admin)', 'Teacher & Administrator Portal')}
          </h3>
          <p className="text-xs text-emerald-200 mt-1 font-arabic">
            {t('منصة النبيل في اللغة العربية للأعاجم', 'Al-Nabeel Arabic Educational Platform')}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          
          {/* Teacher Profile Card */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-sm font-arabic">
                أ.ن
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 font-arabic">
                  {t('المعلم أحمد نبيل النحراوي', 'Teacher Ahmed Nabil Al-Nahrawy')}
                </h4>
                <p className="text-xs text-amber-800 font-mono font-semibold">
                  {teacherEmail}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed font-arabic pt-1 border-t border-amber-200/60">
              {t(
                'هذه البوابة مخصصة للمشرف العام لإدارة محتوى الكتب، الدروس، الألعاب التعليمية، حصص Google Meet، والأسعار.',
                'Dedicated administrative portal to manage books, curriculum units, educational games, Google Meet classes, and students.'
              )}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action 1: Instant Direct Teacher Session */}
          <button
            type="button"
            onClick={handleInstantTeacherAccess}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4 fill-emerald-950 text-amber-300" />
            <span>{t('دخول فوري بصلاحيات المعلم أحمد نبيل (Admin CMS)', 'Enter Now as Teacher Ahmed Nabil (Admin CMS)')}</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-gray-400 font-medium absolute">
              {t('أو الدخول عبر حساب Google', 'Or Sign In with Google Account')}
            </span>
          </div>

          {/* Action 2: Sign In with Google */}
          <button
            type="button"
            onClick={handleGoogleAdminLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs hover:shadow-md disabled:opacity-50"
          >
            <svg viewBox="0 0 48 48" className="w-4 h-4">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            <span>{t('تسجيل الدخول مع Google (ae8860971@gmail.com)', 'Sign in with Google (ae8860971@gmail.com)')}</span>
          </button>

          <p className="text-[10px] text-gray-400 text-center font-arabic">
            {t('صلاحيات المشرف العام مؤمنة ومشفرة عبر قواعد Firebase و Google Workspace.', 'Administrator role verified via Firebase rules & Google Workspace.')}
          </p>

        </div>

      </div>
    </div>
  );
};
