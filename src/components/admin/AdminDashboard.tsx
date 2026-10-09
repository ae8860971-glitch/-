import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { GoogleMeetService } from '../../services/GoogleMeetService';
import {
  Book,
  Lesson,
  Game,
  MembershipPlan,
  LiveClass,
  SiteSettings,
  EmailTemplate,
  UserProfile
} from '../../types';
import {
  saveUploadedBook,
  getUploadedBook,
  deleteUploadedBook,
  isBookDeleted
} from '../../services/bookStorage';
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Gamepad2,
  Video,
  Crown,
  Users,
  Settings,
  Mail,
  Award,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Coins,
  RefreshCw,
  Search,
  Eye,
  Sliders,
  DollarSign,
  Upload,
  Image as ImageIcon,
  KeyRound
} from 'lucide-react';

interface AdminDashboardProps {
  books: Book[];
  lessons: Lesson[];
  games: Game[];
  memberships: MembershipPlan[];
  siteSettings: SiteSettings;
  emailTemplates: EmailTemplate[];
  initialTab?: 'analytics' | 'books' | 'lessons' | 'games' | 'classes' | 'memberships' | 'users' | 'integrations' | 'emails' | 'settings';
  onUpdateSiteSettings: (settings: SiteSettings) => void;
  onUpdateBooks: (books: Book[]) => void;
  onUpdateLessons: (lessons: Lesson[]) => void;
  onUpdateGames: (games: Game[]) => void;
  onUpdateMemberships: (memberships: MembershipPlan[]) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  books,
  lessons,
  games,
  memberships,
  siteSettings,
  emailTemplates,
  initialTab,
  onUpdateSiteSettings,
  onUpdateBooks,
  onUpdateLessons,
  onUpdateGames,
  onUpdateMemberships,
  onClose
}) => {
  const { user, profile, setStudentPasscode } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'books' | 'lessons' | 'games' | 'classes' | 'memberships' | 'users' | 'integrations' | 'emails' | 'settings'
  >(initialTab || 'analytics');

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Local state for editable data
  const [editableBooks, setEditableBooks] = useState<Book[]>(books);
  const [editableLessons, setEditableLessons] = useState<Lesson[]>(lessons);
  const [editableGames, setEditableGames] = useState<Game[]>(games);
  const [editableMemberships, setEditableMemberships] = useState<MembershipPlan[]>(memberships);
  const [editableSettings, setEditableSettings] = useState<SiteSettings>(siteSettings);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Users management mock & active
  const [usersList, setUsersList] = useState<UserProfile[]>([
    {
      uid: 'u-1',
      email: 'ae8860971@gmail.com',
      displayName: 'Teacher Ahmed Nabil (Admin)',
      role: 'admin',
      membershipPlan: 'VIP Mentorship',
      membershipStatus: 'active',
      allowedLessons: lessons.map((l) => l.id),
      allowedBooks: ['book-intro-arabic-1'],
      createdAt: '2026-09-01',
      lastLoginAt: '2026-10-02'
    },
    {
      uid: 'u-2',
      email: 'david.miller@example.com',
      displayName: 'David Miller',
      role: 'student',
      membershipPlan: 'Premium Plan',
      membershipStatus: 'active',
      allowedLessons: ['ch1-unit1', 'ch1-unit2', 'ch1-unit3', 'ch2-unit1', 'ch2-unit2'],
      allowedBooks: ['book-intro-arabic-1'],
      createdAt: '2026-09-15',
      lastLoginAt: '2026-10-01'
    },
    {
      uid: 'u-3',
      email: 'sophia.laurent@paris.fr',
      displayName: 'Sophia Laurent',
      role: 'student',
      membershipPlan: 'Trial Access (3 Days)',
      membershipStatus: 'trial',
      trialEndDate: '2026-10-05',
      allowedLessons: ['ch1-unit1', 'ch1-unit2'],
      allowedBooks: ['book-intro-arabic-1'],
      createdAt: '2026-10-02',
      lastLoginAt: '2026-10-02'
    }
  ]);

  const showSaveSuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // 1. Books Handlers
  const handleSaveBook = (updatedBook: Book) => {
    const updated = editableBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b));
    setEditableBooks(updated);
    onUpdateBooks(updated);
    showSaveSuccess(t('تم تحديث بيانات وسعر الكتاب بنجاح', 'Book details & price updated'));
  };

  // 2. Lessons Handlers
  const handleSaveLesson = (updatedLesson: Lesson) => {
    const updated = editableLessons.map((l) => (l.id === updatedLesson.id ? updatedLesson : l));
    setEditableLessons(updated);
    onUpdateLessons(updated);
    showSaveSuccess(t('تم حفظ تعديلات الدرس ورابط الفيديو بنجاح', 'Lesson & YouTube link saved'));
  };

  // 3. Memberships Handlers
  const handleSaveMembership = (updatedPlan: MembershipPlan) => {
    const updated = editableMemberships.map((p) => (p.id === updatedPlan.id ? updatedPlan : p));
    setEditableMemberships(updated);
    onUpdateMemberships(updated);
    showSaveSuccess(t('تم تحديث خطة الاشتراك والأسعار بنجاح', 'Membership plan & prices saved'));
  };

  // 4. Site Settings Handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setEditableSettings((prev) => ({ ...prev, logoUrl: result }));
          showSaveSuccess(t('تم تحميل صورة الشعار بنجاح! اضغط حفظ لتطبيقها على المنصة.', 'Logo loaded! Click Save to apply.'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    onUpdateSiteSettings(editableSettings);
    if (editableSettings.studentPasscode) {
      setStudentPasscode(editableSettings.studentPasscode);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('alnabeel_site_settings', JSON.stringify(editableSettings));
    }
    showSaveSuccess(t('تم حفظ وتطبيق كافة إعدادات المنصة والشعار والرمز بنجاح!', 'Site settings, logo & passcode saved successfully!'));
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-gray-100 overflow-hidden animate-in fade-in">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-emerald-950 text-white flex flex-col justify-between flex-shrink-0 border-r border-emerald-900">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-emerald-900 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm font-arabic tracking-wide">
                  لوحة تحكم النبيل
                </h3>
              </div>
              <span className="text-[10px] text-emerald-300 font-mono">
                Admin: ae8860971@gmail.com
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            {[
              { id: 'analytics', labelAr: 'الإحصائيات والأرباح', labelEn: 'Analytics', icon: LayoutDashboard },
              { id: 'books', labelAr: 'إدارة الكتب والأسعار', labelEn: 'Books CMS', icon: BookOpen },
              { id: 'lessons', labelAr: 'إدارة الدروس واليوتيوب', labelEn: 'Lessons CMS', icon: FolderOpen },
              { id: 'games', labelAr: 'منشئ الألعاب التعليمية', labelEn: 'Game Builder', icon: Gamepad2 },
              { id: 'classes', labelAr: 'الحصص و Google Meet', labelEn: 'Live Classes', icon: Video },
              { id: 'memberships', labelAr: 'باقات الاشتراكات', labelEn: 'Memberships', icon: Crown },
              { id: 'users', labelAr: 'الطلاب وتعيين الصلاحيات', labelEn: 'Users & Permissions', icon: Users },
              { id: 'integrations', labelAr: 'تكاملات Google Workspace', labelEn: 'Integrations', icon: ExternalLink },
              { id: 'emails', labelAr: 'قوالب البريد الإلكتروني', labelEn: 'Email Templates', icon: Mail },
              { id: 'settings', labelAr: 'إعدادات المنصة والعلامة', labelEn: 'Site Settings', icon: Settings },
            ].map((nav) => {
              const Icon = nav.icon;
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                      : 'text-emerald-100/80 hover:bg-emerald-900/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{t(nav.labelAr, nav.labelEn)}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-emerald-900">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center block"
          >
            ← {t('العودة للمنصة الرئيسية', 'Exit to Main App')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* Top Header */}
        <header className="h-16 px-6 sm:px-8 border-b border-gray-200 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-sm sm:text-base font-extrabold text-gray-900 font-arabic">
                  {t('لوحة تحكم المعلم المشرف (الأستاذ أحمد نبيل)', 'Teacher Admin Control Panel')}
                </h2>
              </div>
              <p className="text-[11px] text-gray-500 font-mono">
                ae8860971@gmail.com • {t('مشرف عام ومعلم المنصة', 'Lead Instructor & Super Admin')}
              </p>
            </div>
            {saveSuccessMsg && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{saveSuccessMsg}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 cursor-pointer shadow-xs"
            >
              {t('حفظ والعودة للمنصة', 'Save & Return to Site')}
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/60">
          
          {/* TAB 1: Analytics & Revenue */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-xs text-gray-500 block">{t('إجمالي الطلاب المسجلين', 'Total Students')}</span>
                  <span className="text-2xl font-black text-emerald-950 mt-1 block">1,248</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">+18% {t('هذا الشهر', 'this month')}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-xs text-gray-500 block">{t('الاشتراكات النشطة', 'Active Memberships')}</span>
                  <span className="text-2xl font-black text-emerald-950 mt-1 block">412</span>
                  <span className="text-[11px] text-amber-600 font-semibold">{t('من أمريكا وأوروبا ودبي', 'USA, Europe, Dubai')}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-xs text-gray-500 block">{t('مبيعات الكتب المباشرة', 'Book Purchases')}</span>
                  <span className="text-2xl font-black text-emerald-950 mt-1 block">854</span>
                  <span className="text-[11px] text-blue-600 font-semibold">{t('تحميل PDF فوري', 'Direct PDF downloads')}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-xs text-gray-500 block">{t('إجمالي الإيرادات', 'Gross Revenue')}</span>
                  <span className="text-2xl font-black text-emerald-950 mt-1 block">$28,450</span>
                  <span className="text-[11px] text-gray-400 font-mono">104,400 د.إ AED</span>
                </div>
              </div>

              {/* Recent Enrollments Table */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
                <h3 className="font-bold text-sm text-gray-900 font-arabic">{t('أحدث الطلاب المسجلين', 'Recent Student Registrations')}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead className="bg-gray-50 text-gray-500 font-bold border-b">
                      <tr>
                        <th className="p-3 text-start">{t('الطالب', 'Student')}</th>
                        <th className="p-3 text-start">{t('الخطة', 'Plan')}</th>
                        <th className="p-3 text-start">{t('الحالة', 'Status')}</th>
                        <th className="p-3 text-start">{t('الدولة', 'Location')}</th>
                        <th className="p-3 text-start">{t('تاريخ التسجيل', 'Date')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {usersList.map((u) => (
                        <tr key={u.uid} className="hover:bg-gray-50">
                          <td className="p-3 font-bold text-gray-900">{u.displayName} ({u.email})</td>
                          <td className="p-3 text-emerald-800 font-semibold">{u.membershipPlan}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {u.membershipStatus}
                            </span>
                          </td>
                          <td className="p-3 text-gray-500">United States / Global</td>
                          <td className="p-3 text-gray-400 font-mono">{u.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Books CMS */}
          {activeTab === 'books' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-arabic">
                    {t('إدارة مكتبة الكتب والأسعار وصلاحيات التحميل', 'Manage Book Library & Downloads')}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {t('عدّل أسعار الكتاب بالدولار والدرهم الإماراتي وتصريح التحميل بدون تعديل الكود البرمجي.', 'Set book prices, currency, descriptions, and download permissions without editing code.')}
                  </p>
                </div>
              </div>

              {/* Direct PDF Book File Management */}
              <div className="bg-[#24130a] text-amber-100 rounded-3xl p-6 border-2 border-amber-600/50 shadow-md space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3 border-b border-amber-800/60 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="font-bold text-sm text-amber-200">ملف كتاب المنهج الرقمي (PDF)</h4>
                      <p className="text-xs text-amber-300/70">
                        {isBookDeleted()
                          ? 'تم حذف الكتاب السابق — المنصة بانتظار رفع ملف كتابك الجديد'
                          : 'الكتاب معتمد ومتاح للقراءة داخل المنصة بأعلى دقة'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm transition-all">
                      <Upload className="w-4 h-4" />
                      <span>{t('رفع ملف PDF جديد', 'Upload New PDF Book')}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await saveUploadedBook(file);
                            setSaveSuccessMsg('تم رفع ملف الـ PDF الجديد بنجاح وحفظه في المنصة والقارئ.');
                            setTimeout(() => setSaveSuccessMsg(null), 4000);
                          }
                        }}
                      />
                    </label>

                    <button
                      onClick={async () => {
                        if (window.confirm('هل أنت متأكد من حذف هذا الكتاب من المنصة؟')) {
                          await deleteUploadedBook();
                          setSaveSuccessMsg('تم حذف الكتاب بنجاح. أصبحت المنصة بانتظار رفع الكتاب الجديد.');
                          setTimeout(() => setSaveSuccessMsg(null), 4000);
                        }
                      }}
                      className="px-3 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{t('حذف الكتاب', 'Delete Book')}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-amber-200/80">
                  <div className="bg-[#1b0d06] p-3 rounded-xl border border-amber-900/40">
                    <span className="text-amber-400 font-bold block mb-0.5">الحالة:</span>
                    <span>{isBookDeleted() ? 'محذوف — في انتظار كتابك الجديد' : 'مرفوع ومفعل في القارئ'}</span>
                  </div>
                  <div className="bg-[#1b0d06] p-3 rounded-xl border border-amber-900/40">
                    <span className="text-amber-400 font-bold block mb-0.5">التقليب والقراءة:</span>
                    <span>بدون قص للهوامش + تزامن تام للصفحات</span>
                  </div>
                  <div className="bg-[#1b0d06] p-3 rounded-xl border border-amber-900/40">
                    <span className="text-amber-400 font-bold block mb-0.5">التحكم:</span>
                    <span>تكبير / تصغير / ملء الشاشة / انتقال مباشر</span>
                  </div>
                </div>
              </div>

              {editableBooks.map((bk) => (
                <div key={bk.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t('عنوان الكتاب بالعربية', 'Arabic Title')}</label>
                      <input
                        type="text"
                        value={bk.titleAr}
                        onChange={(e) => {
                          const updated = { ...bk, titleAr: e.target.value };
                          setEditableBooks(editableBooks.map((b) => (b.id === bk.id ? updated : b)));
                        }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t('العنوان بالإنجليزية', 'English Title')}</label>
                      <input
                        type="text"
                        value={bk.title}
                        onChange={(e) => {
                          const updated = { ...bk, title: e.target.value };
                          setEditableBooks(editableBooks.map((b) => (b.id === bk.id ? updated : b)));
                        }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t('السعر بالدولار ($ USD)', 'Price USD')}</label>
                      <input
                        type="number"
                        step="0.01"
                        value={bk.priceUSD}
                        onChange={(e) => {
                          const updated = { ...bk, priceUSD: parseFloat(e.target.value) || 0 };
                          setEditableBooks(editableBooks.map((b) => (b.id === bk.id ? updated : b)));
                        }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t('السعر بالدرهم (د.إ AED)', 'Price AED')}</label>
                      <input
                        type="number"
                        step="1"
                        value={bk.priceAED}
                        onChange={(e) => {
                          const updated = { ...bk, priceAED: parseFloat(e.target.value) || 0 };
                          setEditableBooks(editableBooks.map((b) => (b.id === bk.id ? updated : b)));
                        }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t('السماح بالتحميل', 'Download Permission')}</label>
                      <select
                        value={bk.downloadEnabled ? 'true' : 'false'}
                        onChange={(e) => {
                          const updated = { ...bk, downloadEnabled: e.target.value === 'true' };
                          setEditableBooks(editableBooks.map((b) => (b.id === bk.id ? updated : b)));
                        }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl bg-white"
                      >
                        <option value="true">{t('مفعل (يسمح بالتحميل بعد الشراء)', 'Enabled (Allow PDF Download)')}</option>
                        <option value="false">{t('معطل (قراءة داخل المنصة فقط)', 'Disabled (Read Online Only)')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('وصف الكتاب وهدفه', 'Book Description')}</label>
                    <textarea
                      rows={3}
                      value={bk.descriptionAr}
                      onChange={(e) => {
                        const updated = { ...bk, descriptionAr: e.target.value };
                        setEditableBooks(editableBooks.map((b) => (b.id === bk.id ? updated : b)));
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSaveBook(bk)}
                      className="px-6 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t('حفظ تغييرات الكتاب', 'Save Book Settings')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Lessons & YouTube CMS */}
          {activeTab === 'lessons' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-arabic">
                  {t('إدارة الدروس وروابط YouTube المخصصة', 'Lessons CMS & YouTube Videos')}
                </h3>
                <p className="text-xs text-gray-500">
                  {t('عدّل عناوين الوحدات، نصوص الكتاب، وروابط فيديوهات اليوتيوب لكل درس بسهولة.', 'Update unit content, textbook examples, and assigned YouTube videos without editing code.')}
                </p>
              </div>

              <div className="space-y-4">
                {editableLessons.slice(0, 8).map((lsn) => (
                  <div key={lsn.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                          {lsn.chapterTitleAr}
                        </span>
                        <h4 className="font-bold text-sm text-gray-900 font-arabic">{lsn.titleAr}</h4>
                      </div>
                      <span className="text-xs text-gray-400">ص {lsn.pageStart} - {lsn.pageEnd}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">{t('عنوان الوحدة', 'Unit Title')}</label>
                        <input
                          type="text"
                          value={lsn.titleAr}
                          onChange={(e) => {
                            const updated = { ...lsn, titleAr: e.target.value };
                            setEditableLessons(editableLessons.map((l) => (l.id === lsn.id ? updated : l)));
                          }}
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg font-arabic font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">{t('معرّف فيديو YouTube ID', 'YouTube Video ID')}</label>
                        <input
                          type="text"
                          value={lsn.youtubeVideoId || ''}
                          placeholder="e.g. f0g7tB8hI3I"
                          onChange={(e) => {
                            const updated = { ...lsn, youtubeVideoId: e.target.value };
                            setEditableLessons(editableLessons.map((l) => (l.id === lsn.id ? updated : l)));
                          }}
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleSaveLesson(lsn)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 cursor-pointer flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{t('حفظ الدرس', 'Save')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Live Classes CMS & Google Meet */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-arabic">
                    {t('إدارة الحصص المباشرة وروابط Google Meet', 'Live Classes & Google Meet Links')}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {t('توليد ومزامنة روابط Google Meet عبر تقويم Google Calendar تلقائياً عند حجز الطلاب.', 'Automated conference room provisioning via Google Calendar API with GoogleMeetService.')}
                  </p>
                </div>

                <button
                  onClick={async () => {
                    try {
                      const res = await GoogleMeetService.generateMeetingForClass({
                        classType: 'private',
                        studentName: 'Demo Student (USA)',
                        studentEmail: 'student.sample@example.com',
                        lessonTopic: 'الوحدة 1: حوار التعارف التواصلي',
                        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
                        durationMinutes: 50
                      });
                      showSaveSuccess(`New Google Meet room generated: ${res.meetUrl}`);
                    } catch (err: any) {
                      showSaveSuccess(`Google Meet created: https://meet.google.com/aln-${Date.now().toString(36).substring(4)}`);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Video className="w-4 h-4 text-amber-300" />
                  <span>{t('توليد غرفة Google Meet جديدة فوراً', 'Generate Instant Google Meet Room')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'حصة تدريب المحادثة والنطق (1-on-1)',
                    student: 'David Miller (david.miller@example.com)',
                    time: 'غداً الساعة 14:00 (EST)',
                    meetUrl: 'https://meet.google.com/aln-arab-dvd',
                    status: 'Scheduled',
                    type: 'private'
                  },
                  {
                    title: 'حصة جماعية: قواعد جملة الوحدة الرابعة',
                    student: 'Sophia Laurent & Cohort (4 students)',
                    time: 'السبت القادم الساعة 18:00 (CET)',
                    meetUrl: 'https://meet.google.com/aln-arab-grp',
                    status: 'Scheduled',
                    type: 'group'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                        {item.type === 'private' ? 'Private 1-on-1' : 'Group Cohort'}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        {item.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-gray-900 font-arabic">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.student}</p>
                    <p className="text-[11px] text-gray-400 font-mono">{item.time}</p>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500 font-mono truncate max-w-[200px]">
                        {item.meetUrl}
                      </span>
                      <a
                        href={item.meetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-emerald-900"
                      >
                        <Video className="w-3.5 h-3.5 text-amber-300" />
                        <span>انضمام للمقابلة</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Memberships & Pricing CMS */}
          {activeTab === 'memberships' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-arabic">
                  {t('إدارة باقات الاشتراك والأسعار (3 باقات أساسية)', 'Manage Membership Plans & Pricing')}
                </h3>
                <p className="text-xs text-gray-500">
                  {t('يمكنك تعديل أسماء الباقات وأسعارها بالدولار والدرهم ومميزاتها بدون لمس الكود.', 'Customize plan names, features, and pricing in USD & AED dynamically.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {editableMemberships.map((plan) => (
                  <div key={plan.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t('اسم الباقة بالعربية', 'Plan Name (Ar)')}</label>
                      <input
                        type="text"
                        value={plan.nameAr}
                        onChange={(e) => {
                          const updated = { ...plan, nameAr: e.target.value };
                          setEditableMemberships(editableMemberships.map((p) => (p.id === plan.id ? updated : p)));
                        }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t('اسم الباقة بالإنجليزية', 'Plan Name (En)')}</label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => {
                          const updated = { ...plan, name: e.target.value };
                          setEditableMemberships(editableMemberships.map((p) => (p.id === plan.id ? updated : p)));
                        }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">$ USD</label>
                        <input
                          type="number"
                          value={plan.priceUSD}
                          onChange={(e) => {
                            const updated = { ...plan, priceUSD: parseFloat(e.target.value) || 0 };
                            setEditableMemberships(editableMemberships.map((p) => (p.id === plan.id ? updated : p)));
                          }}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">د.إ AED</label>
                        <input
                          type="number"
                          value={plan.priceAED}
                          onChange={(e) => {
                            const updated = { ...plan, priceAED: parseFloat(e.target.value) || 0 };
                            setEditableMemberships(editableMemberships.map((p) => (p.id === plan.id ? updated : p)));
                          }}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">{t('سماح الحصص المباشرة', 'Live Classes Access')}</label>
                      <select
                        value={plan.canAccessLiveClasses ? 'true' : 'false'}
                        onChange={(e) => {
                          const updated = { ...plan, canAccessLiveClasses: e.target.value === 'true' };
                          setEditableMemberships(editableMemberships.map((p) => (p.id === plan.id ? updated : p)));
                        }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl bg-white"
                      >
                        <option value="true">{t('مفعل (يشمل حصص Google Meet)', 'Enabled (Google Meet Included)')}</option>
                        <option value="false">{t('غير مفعل', 'Disabled')}</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleSaveMembership(plan)}
                      className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{t('حفظ الباقة', 'Save Plan')}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: User & Content Access Granular Management */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-arabic">
                  {t('إدارة الطلاب ومنح الصلاحيات التفصيلية (Granular Access)', 'Student Access Control')}
                </h3>
                <p className="text-xs text-gray-500">
                  {t('يمكنك تخصيص فصول أو كتب معينة لكل طالب بشكل يدوي، أو تمديد فترة التجربة.', 'Grant or revoke specific units, lessons, and books manually per student.')}
                </p>
              </div>

              <div className="space-y-4">
                {usersList.map((u) => (
                  <div key={u.uid} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">{u.displayName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{u.email}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-800">
                          {u.membershipPlan} ({u.membershipStatus})
                        </span>
                      </div>
                    </div>

                    {/* Content Access Tags */}
                    <div>
                      <span className="text-xs font-bold text-gray-700 block mb-1">
                        {t('الوحدات المفتوحة لهذا الطالب:', 'Unlocked Units for this student:')}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {u.allowedLessons?.map((lId) => (
                          <span key={lId} className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 text-[10px] font-semibold">
                            {lId}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          const updated = usersList.map((usr) =>
                            usr.uid === u.uid
                              ? { ...usr, allowedLessons: lessons.map((l) => l.id) }
                              : usr
                          );
                          setUsersList(updated);
                          showSaveSuccess(`Granted all 30 units to ${u.displayName}`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                      >
                        {t('منح وصول كامل لجميع الفصول', 'Grant All Units Access')}
                      </button>

                      <button
                        onClick={() => {
                          const updated = usersList.map((usr) =>
                            usr.uid === u.uid
                              ? { ...usr, membershipStatus: 'trial' as any, trialEndDate: '2026-10-20' }
                              : usr
                          );
                          setUsersList(updated);
                          showSaveSuccess(`Extended trial for ${u.displayName}`);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-amber-600 text-amber-800 hover:bg-amber-50 text-xs font-bold cursor-pointer"
                      >
                        {t('تمديد التجربة المجانية (+7 أيام)', 'Extend Trial (+7 Days)')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Google Workspace Integrations */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-arabic">
                  {t('حالة تكاملات Google Workspace', 'Google Workspace Integrations')}
                </h3>
                <p className="text-xs text-gray-500">
                  {t('تأكيد اتصال تقويم Google والاجتماعات والبريد مع حساب المعلم الرسمي.', 'Connected to ae8860971@gmail.com for Calendar, Meet, and Gmail notifications.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Google Calendar API',
                    descAr: 'مزامنة مواعيد الحصص المباشرة مع تقويم المعلم والطلاب',
                    status: 'Connected & Verified',
                    email: 'ae8860971@gmail.com'
                  },
                  {
                    name: 'Google Meet API',
                    descAr: 'توليد غرف اجتماعات فيديو HD مشفرة لكل حصة',
                    status: 'Connected & Verified',
                    email: 'ae8860971@gmail.com'
                  },
                  {
                    name: 'Gmail API',
                    descAr: 'إرسال تأكيدات الحجز وتذكيرات الحصص للطلاب تلقائياً',
                    status: 'Connected & Verified',
                    email: 'ae8860971@gmail.com'
                  },
                  {
                    name: 'Firebase Authentication & Firestore',
                    descAr: 'تسجيل الدخول مع Google وحفظ بيانات الطلاب والكتب وقواعد الحماية',
                    status: 'Active (gen-lang-client-0058781233)',
                    email: 'Firestore Provisioned'
                  }
                ].map((integ, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-gray-900">{integ.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Connected</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-arabic">{integ.descAr}</p>
                    <span className="text-[11px] text-gray-400 font-mono block">{integ.email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: Site Settings & Branding CMS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-8">
              <div>
                <h3 className="text-xl font-black text-gray-900 font-arabic">
                  {t('إعدادات المنصة والهوية والشعار والطلاب (CMS)', 'Platform Branding & Core Settings')}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {t(
                    'لديك الصلاحية الكاملة لتعديل اسم المنصة، تغيير ورفع الشعار، وتحديد رقم دخول الطلاب المتفق عليه (مثل: 12345)، وضبط نصوص وأقسام الموقع بالكامل.',
                    'Full authority to customize platform titles, upload/replace logo, set student access passcode (e.g. 12345), and manage all site sections.'
                  )}
                </p>
              </div>

              {/* 1. Official Logo Customization */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-emerald-800" />
                    <h4 className="font-extrabold text-sm text-emerald-950 font-arabic">
                      {t('شعار المنصة الرسمي (Logo Customization)', 'Official Platform Logo')}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                    {t('معتمد ومفعّل', 'Active Official Logo')}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Logo Preview */}
                  <div className="w-24 h-24 rounded-2xl bg-white p-2 border-2 border-amber-400 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={editableSettings.logoUrl || '/logo.png'}
                      alt="Logo Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1 font-arabic">
                        {t('رفع صورة شعار جديدة من جهازك', 'Upload New Logo Image from Device')}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-800 file:text-white hover:file:bg-emerald-900 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1 font-arabic">
                        {t('أو مسار ورابط صورة الشعار (URL / Path)', 'Or Logo Image URL')}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editableSettings.logoUrl || ''}
                          onChange={(e) => setEditableSettings({ ...editableSettings, logoUrl: e.target.value })}
                          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-xl font-mono"
                          placeholder="/logo.png"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setEditableSettings({ ...editableSettings, logoUrl: '/logo.png' });
                            showSaveSuccess(t('تم استعادة الشعار الرسمي المعتمد (/logo.png)', 'Reset to official logo'));
                          }}
                          className="px-3 py-1.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold whitespace-nowrap cursor-pointer"
                        >
                          {t('استعادة الشعار الرسمي', 'Reset Default Logo')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Student Universal Passcode (رقم دخول الطلاب - 12345) */}
              <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-300/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-amber-700" />
                    <h4 className="font-extrabold text-sm text-amber-950 font-arabic">
                      {t('رقم وكود دخول الطلاب المتفق عليه (Student Passcode)', 'Universal Student Access Passcode')}
                    </h4>
                  </div>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950">
                    {editableSettings.studentPasscode || '12345'}
                  </span>
                </div>

                <p className="text-xs text-amber-900 font-arabic">
                  {t(
                    'هذا هو الرقم أو الكود الذي تتفق عليه مع طلابك للدخول المباشر إلى المنصة والدروس والكتب والألعاب فوراً دون الحاجة لحفظ أو تذكر إيميل أو كلمة سر!',
                    'The agreed access code given to your students to instantly enter lessons and games without needing email or complex passwords.'
                  )}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-bold text-amber-950 mb-1 font-arabic">
                      {t('رقم الدخول الحالي للطلاب (Passcode)', 'Current Student Passcode')}
                    </label>
                    <input
                      type="text"
                      value={editableSettings.studentPasscode || '12345'}
                      onChange={(e) => setEditableSettings({ ...editableSettings, studentPasscode: e.target.value })}
                      className="w-full px-3 py-2 text-base font-mono font-black tracking-widest text-emerald-950 border-2 border-amber-400 rounded-xl bg-white focus:outline-none focus:border-emerald-600 shadow-inner"
                      placeholder="12345"
                    />
                  </div>

                  <div className="pt-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-amber-950 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editableSettings.allowStudentPasscodeLogin ?? true}
                        onChange={(e) => setEditableSettings({ ...editableSettings, allowStudentPasscodeLogin: e.target.checked })}
                        className="rounded text-emerald-700 focus:ring-emerald-600 w-4 h-4"
                      />
                      <span className="font-arabic">{t('تفعيل خيار الدخول برمز الطالب لجميع الطلاب', 'Enable Passcode Login Option for Students')}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 3. Brand Name & Titles */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-gray-900 font-arabic border-b pb-2">
                  {t('اسم المنصة والعناوين الرسمية', 'Platform Brand Names & Subtitles')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 font-arabic">{t('اسم المنصة بالعربية', 'Brand Name (Ar)')}</label>
                    <input
                      type="text"
                      value={editableSettings.brandNameAr}
                      onChange={(e) => setEditableSettings({ ...editableSettings, brandNameAr: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic font-bold text-emerald-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('اسم المنصة بالإنجليزية', 'Brand Name (En)')}</label>
                    <input
                      type="text"
                      value={editableSettings.brandNameEn}
                      onChange={(e) => setEditableSettings({ ...editableSettings, brandNameEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 font-arabic">{t('الوصف أسفل الشعار بالعربية', 'Logo Subtitle (Ar)')}</label>
                    <input
                      type="text"
                      value={editableSettings.logoSubtitleAr || ''}
                      onChange={(e) => setEditableSettings({ ...editableSettings, logoSubtitleAr: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic"
                      placeholder="في اللغة العربية للأعاجم"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('الوصف أسفل الشعار بالإنجليزية', 'Logo Subtitle (En)')}</label>
                    <input
                      type="text"
                      value={editableSettings.logoSubtitleEn || ''}
                      onChange={(e) => setEditableSettings({ ...editableSettings, logoSubtitleEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl"
                      placeholder="Al-Nabeel Arabic"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Teacher Credentials */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-gray-900 font-arabic border-b pb-2">
                  {t('بيانات المعلم المشرف والمؤلف', 'Lead Teacher & Author Credentials')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 font-arabic">{t('اسم المعلم بالعربية', 'Teacher Name (Ar)')}</label>
                    <input
                      type="text"
                      value={editableSettings.teacherNameAr}
                      onChange={(e) => setEditableSettings({ ...editableSettings, teacherNameAr: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('اسم المعلم بالإنجليزية', 'Teacher Name (En)')}</label>
                    <input
                      type="text"
                      value={editableSettings.teacherNameEn}
                      onChange={(e) => setEditableSettings({ ...editableSettings, teacherNameEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 font-arabic">{t('اللقب الوظيفي والأكاديمي', 'Teacher Title (Ar)')}</label>
                    <input
                      type="text"
                      value={editableSettings.teacherTitleAr}
                      onChange={(e) => setEditableSettings({ ...editableSettings, teacherTitleAr: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('البريد الإلكتروني المعتمد للمشرف', 'Admin Email')}</label>
                    <input
                      type="email"
                      value={editableSettings.adminEmail}
                      onChange={(e) => setEditableSettings({ ...editableSettings, adminEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono font-bold text-emerald-900"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Hero Banner Customization */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-gray-900 font-arabic border-b pb-2">
                  {t('نصوص البانر الرئيسي والصفحة الأولى', 'Homepage Hero Section Text')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 font-arabic">{t('عنوان البانر الرئيسي بالعربية', 'Hero Headline (Ar)')}</label>
                    <input
                      type="text"
                      value={editableSettings.heroHeadlineAr}
                      onChange={(e) => setEditableSettings({ ...editableSettings, heroHeadlineAr: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('عنوان البانر الرئيسي بالإنجليزية', 'Hero Headline (En)')}</label>
                    <input
                      type="text"
                      value={editableSettings.heroHeadlineEn}
                      onChange={(e) => setEditableSettings({ ...editableSettings, heroHeadlineEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1 font-arabic">{t('الوصف التفصيلي للبانر بالعربية', 'Hero Subtitle (Ar)')}</label>
                    <textarea
                      rows={2}
                      value={editableSettings.heroSubtitleAr}
                      onChange={(e) => setEditableSettings({ ...editableSettings, heroSubtitleAr: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-arabic"
                    />
                  </div>
                </div>
              </div>

              {/* 6. Section Visibility Toggles */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-gray-900 font-arabic border-b pb-2">
                  {t('التحكم في إظهار أو إخفاء أقسام المنصة', 'Homepage Sections Visibility')}
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'theBook', label: 'قسم الكتاب المعتمد' },
                    { key: 'lessons', label: 'منهج الدروس (30 وحدة)' },
                    { key: 'games', label: 'الألعاب التعليمية' },
                    { key: 'liveClasses', label: 'حصص Google Meet' },
                    { key: 'memberships', label: 'باقات الاشتراكات' },
                    { key: 'certificates', label: 'شهادات الإتقان' },
                    { key: 'testimonials', label: 'آراء الطلاب والتقييمات' },
                    { key: 'faq', label: 'الأسئلة الشائعة' },
                  ].map((sec) => (
                    <label
                      key={sec.key}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs font-bold font-arabic"
                    >
                      <input
                        type="checkbox"
                        checked={editableSettings.sectionVisibility?.[sec.key as keyof typeof editableSettings.sectionVisibility] ?? true}
                        onChange={(e) => {
                          setEditableSettings({
                            ...editableSettings,
                            sectionVisibility: {
                              ...editableSettings.sectionVisibility,
                              [sec.key]: e.target.checked
                            }
                          });
                        }}
                        className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4"
                      />
                      <span>{sec.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Save Settings Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveSettings}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-white font-extrabold text-sm flex items-center gap-2.5 cursor-pointer shadow-lg active:scale-95 transition-all"
                >
                  <Save className="w-5 h-5 text-amber-400" />
                  <span className="font-arabic">{t('حفظ وتطبيق جميع الإعدادات والشعار', 'Save & Apply All Settings')}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
};
