import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ADMIN_EMAIL } from '../../services/auth';
import { SiteSettings } from '../../types';
import {
  Globe,
  Coins,
  BookOpen,
  Sparkles,
  Gamepad2,
  Video,
  Award,
  Crown,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  User as UserIcon,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currency: 'USD' | 'AED';
  onToggleCurrency: () => void;
  onOpenAuthModal: () => void;
  siteSettings?: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currency,
  onToggleCurrency,
  onOpenAuthModal,
  siteSettings
}) => {
  const { user, profile, isAdmin, loginAsTeacherAdmin, logoutUser } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home', icon: Sparkles },
    { id: 'book', labelAr: 'الكتاب', labelEn: 'The Book', icon: BookOpen },
    { id: 'lessons', labelAr: 'الدروس', labelEn: 'Lessons', icon: BookOpen },
    { id: 'games', labelAr: 'الألعاب التعليمية', labelEn: 'Games', icon: Gamepad2 },
    { id: 'classes', labelAr: 'الحصص المباشرة', labelEn: 'Live Classes', icon: Video },
    { id: 'memberships', labelAr: 'الاشتراكات', labelEn: 'Memberships', icon: Crown },
    { id: 'certificates', labelAr: 'الشهادات', labelEn: 'Certificates', icon: Award },
  ];

  return (
    <header className="bg-[#fdfaf5]/95 backdrop-blur-md border-b border-[#e7dcc7] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo */}
          <div onClick={() => onNavigate('home')} className="flex-shrink-0 cursor-pointer">
            <BrandLogo
              size="md"
              customLogoUrl={siteSettings?.logoUrl}
              customTitle={siteSettings?.brandNameAr}
              customSubtitle={siteSettings?.logoSubtitleAr}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#f5ede0] text-[#78350f] shadow-xs font-bold'
                      : 'text-[#3d2314] hover:text-amber-900 hover:bg-[#f8f2e7]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isActive ? 'text-amber-700' : 'text-amber-900/40'}`} />
                  <span>{t(link.labelAr, link.labelEn)}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Currency, Language, Auth */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#dfd0ba] text-xs font-bold text-[#3d2314] hover:bg-[#f6eee0] transition-colors cursor-pointer"
              title="Switch Currency USD / AED"
            >
              <Coins className="w-3.5 h-3.5 text-amber-700" />
              <span>{currency === 'USD' ? '$ USD' : 'د.إ AED'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#dfd0ba] text-xs font-bold text-[#3d2314] hover:bg-[#f6eee0] transition-colors cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-800" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#decbb2] bg-[#f8f1e5]/80 hover:bg-[#f3e8d7] transition-colors cursor-pointer"
                >
                  {profile?.photoURL ? (
                    <img
                      src={profile.photoURL}
                      alt={profile.displayName}
                      className="w-7 h-7 rounded-full object-cover border border-amber-400"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#4a2612] text-amber-200 flex items-center justify-center text-xs font-bold">
                      {profile?.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-bold text-[#2a170d] max-w-[100px] truncate">
                    {profile?.displayName?.split(' ')[0] || 'User'}
                  </span>
                  {isAdmin && (
                    <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-[#24130a] rounded-md shadow-2xs">
                      ADMIN
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#ebdcc8]">
                      <p className="text-xs font-bold text-[#2a170d] truncate">{profile?.displayName}</p>
                      <p className="text-[11px] text-[#78350f]/80 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-amber-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>{profile?.membershipPlan || 'Free Plan'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#3d2314] hover:bg-[#f6eee2] hover:text-amber-950"
                    >
                      <LayoutDashboard className="w-4 h-4 text-amber-700" />
                      <span>{t('لوحة معلومات الطالب', 'Student Dashboard')}</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('admin');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-50"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>{t('لوحة تحكم المشرف (CMS)', 'Admin CMS Dashboard')}</span>
                      </button>
                    )}

                    <div className="border-t border-[#ebdcc8] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logoutUser();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('تسجيل الخروج', 'Sign Out')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="gsi-material-button inline-flex items-center gap-2 px-4 py-2 bg-[#381c0e] hover:bg-[#271309] text-amber-200 border border-amber-600/40 rounded-xl text-xs font-bold shadow-sm transition-all hover:shadow-md cursor-pointer"
              >
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center p-0.5">
                  <svg viewBox="0 0 48 48" className="w-3.5 h-3.5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                </div>
                <span>{t('تسجيل الدخول مع Google', 'Sign in with Google')}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleCurrency}
              className="px-2 py-1 rounded text-xs font-bold bg-[#f3e9da] text-[#3d2314]"
            >
              {currency}
            </button>
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2 py-1 rounded text-xs font-bold bg-[#f3e9da] text-[#3d2314]"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3d2314] hover:bg-[#f3e9da]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#ebdcc8] flex flex-col gap-2">
            {/* Prominent Mobile Teacher Admin Button */}
            <button
              onClick={async () => {
                if (!isAdmin) {
                  await loginAsTeacherAdmin();
                }
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-[#1f0e06] font-black text-sm shadow-md mb-2 cursor-pointer border border-amber-400"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#1f0e06]" />
                <span className="font-arabic">{t('خانة المعلم المشرف (الأدمن)', 'Teacher Admin Portal')}</span>
              </div>
              <span className="text-[10px] font-mono bg-[#1f0e06] text-amber-300 px-2 py-0.5 rounded-full">
                ae8860971@gmail.com
              </span>
            </button>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold ${
                    currentView === link.id
                      ? 'bg-[#f4ebe0] text-[#78350f] font-bold'
                      : 'text-[#3d2314] hover:bg-[#f6eee2]'
                  }`}
                >
                  <Icon className="w-5 h-5 text-amber-700" />
                  <span>{t(link.labelAr, link.labelEn)}</span>
                </button>
              );
            })}

            {user ? (
              <div className="pt-3 border-t border-[#ebdcc8] flex flex-col gap-2">
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-[#78350f]"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>{t('لوحة معلومات الطالب', 'Student Dashboard')}</span>
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-amber-800"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>{t('لوحة تحكم المشرف (CMS)', 'Admin CMS')}</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t('تسجيل الخروج', 'Sign Out')}</span>
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-[#ebdcc8]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full py-2.5 bg-[#381c0e] hover:bg-[#271309] text-amber-200 border border-amber-600/40 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <span>{t('تسجيل الدخول مع Google', 'Sign in with Google')}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
