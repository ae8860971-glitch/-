import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { BrandLogo } from '../common/BrandLogo';
import {
  X,
  Mail,
  Lock,
  User,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const {
    signInWithGoogle,
    loginWithEmail,
    registerWithEmail,
    loginWithStudentCode,
    studentPasscode
  } = useAuth();
  const { t } = useLanguage();

  // Active method tab: 'code' | 'email' | 'google'
  const [authMethod, setAuthMethod] = useState<'code' | 'email' | 'google'>('code');

  // Email form state
  const [emailMode, setEmailMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Student Passcode form state
  const [passcode, setPasscode] = useState('12345');
  const [studentName, setStudentName] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handlePasscodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      await loginWithStudentCode(passcode, studentName);
      setSuccessMsg(t('مرحباً بك! تم تسجيل الدخول بنجاح برمز الطالب.', 'Welcome! Logged in successfully.'));
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || t('رمز الدخول غير صحيح. يرجى مراجعة المعلم.', 'Incorrect passcode. Please check with your teacher.'));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      if (emailMode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, displayName || 'Student');
      }
      setSuccessMsg(t('تم تسجيل الدخول بنجاح!', 'Successfully signed in!'));
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || t('فشل تسجيل الدخول. يرجى التأكد من البريد وكلمة المرور.', 'Authentication failed. Please check your credentials.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Google Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 text-center relative border-b border-amber-500/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-3">
            <BrandLogo size="md" variant="light" showSubtitle={false} />
          </div>

          <h3 className="font-extrabold text-lg font-arabic text-amber-300">
            {t('بوابة دخول الطلاب إلى منصة النبيل', 'Al-Nabeel Student Portal')}
          </h3>
          <p className="text-xs text-emerald-200/90 mt-1 font-arabic">
            {t('تعلّم العربية عبر الدروس التفاعلية والألعاب والحصص المباشرة', 'Interactive Arabic textbook, games & live classes')}
          </p>

          {/* Method Tabs */}
          <div className="flex items-center justify-center gap-1.5 mt-4 p-1 bg-emerald-950/80 rounded-2xl border border-emerald-800/80 text-xs">
            <button
              onClick={() => { setAuthMethod('code'); setErrorMsg(null); }}
              className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMethod === 'code'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{t('رمز الطالب (12345)', 'Passcode (12345)')}</span>
            </button>

            <button
              onClick={() => { setAuthMethod('email'); setErrorMsg(null); }}
              className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMethod === 'email'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t('الإيميل والباسورد', 'Email & Pass')}</span>
            </button>

            <button
              onClick={() => { setAuthMethod('google'); setErrorMsg(null); }}
              className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMethod === 'google'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Notification Messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* METHOD 1: Student Passcode (e.g. 12345) */}
          {authMethod === 'code' && (
            <form onSubmit={handlePasscodeLogin} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                <KeyRound className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block font-arabic">
                    {t('الدخول برقم الطالب المتفق عليه مع المعلم:', 'Student Passcode agreed with Teacher:')}
                  </span>
                  <span className="text-[11px] text-amber-800 block mt-0.5">
                    {t(
                      `يمكنك الدخول مباشرة بكتابة الرقم الذي أعطاك إياه الأستاذ أحمد نبيل (مثل: ${studentPasscode}).`,
                      `Enter the access code provided by Teacher Ahmed Nabil (e.g. ${studentPasscode}).`
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 font-arabic">
                  {t('اسم الطالب (اختياري)', 'Student Name (Optional)')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
                    placeholder={t('مثال: سارة / John / Maria', 'e.g. John / Maria')}
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 font-arabic">
                  {t('رمز الدخول المتفق عليه', 'Universal Access Passcode')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm font-mono font-bold tracking-widest text-emerald-950 border-2 border-amber-400/80 rounded-xl focus:border-emerald-600 focus:outline-none bg-amber-50/30"
                    placeholder="12345"
                  />
                  <KeyRound className="w-4 h-4 text-amber-600 absolute left-3 top-3.5" />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {t(`الرمز الافتراضي الحالي: ${studentPasscode}`, `Current default passcode: ${studentPasscode}`)}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-emerald-950 font-black text-xs cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4 text-emerald-950" />
                <span>{loading ? t('جارٍ التحقق من الرمز...', 'Verifying...') : t('دخول المنصة برمز الطالب', 'Enter Platform with Passcode')}</span>
              </button>
            </form>
          )}

          {/* METHOD 2: Email & Password */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              <div className="flex items-center justify-between bg-gray-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setEmailMode('login')}
                  className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                    emailMode === 'login' ? 'bg-white text-emerald-950 shadow-xs' : 'text-gray-500'
                  }`}
                >
                  {t('تسجيل الدخول', 'Sign In')}
                </button>
                <button
                  type="button"
                  onClick={() => setEmailMode('register')}
                  className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                    emailMode === 'register' ? 'bg-white text-emerald-950 shadow-xs' : 'text-gray-500'
                  }`}
                >
                  {t('إنشاء حساب جديد', 'Register')}
                </button>
              </div>

              {emailMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1 font-arabic">
                    {t('الاسم الكامل', 'Full Name')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
                      placeholder="Ahmed / Sarah / David"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 font-arabic">
                  {t('البريد الإلكتروني', 'Email Address')}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
                    placeholder="student@example.com"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-gray-700 font-arabic">
                    {t('كلمة المرور', 'Password')}
                  </label>
                  <span className="text-[10px] text-amber-700 font-medium">
                    {t('يجب تذكر كلمة المرور', 'Must remember password')}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 text-xs border border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{t('تذكر بيانات الدخول', 'Remember my login')}</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer shadow-md transition-all disabled:opacity-50"
              >
                {loading
                  ? t('جارٍ التحقق...', 'Verifying...')
                  : emailMode === 'login'
                  ? t('تسجيل الدخول بالإيميل والباسورد', 'Sign In with Email & Password')
                  : t('إنشاء الحساب وبدء التعلم', 'Create Account & Start Learning')}
              </button>
            </form>
          )}

          {/* METHOD 3: Google Sign-In */}
          {authMethod === 'google' && (
            <div className="space-y-4 text-center py-2">
              <p className="text-xs text-gray-600">
                {t(
                  'تسجيل دخول سريع وآمن بحساب Google الخاص بك للوصول المباشر ومزامنة حصص Google Meet.',
                  'Quick and secure sign-in with your Google account with Calendar & Google Meet sync.'
                )}
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs hover:shadow-md disabled:opacity-50"
              >
                <svg viewBox="0 0 48 48" className="w-4 h-4">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>{t('المتابعة بحساب Google', 'Continue with Google')}</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
