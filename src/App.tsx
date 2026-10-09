import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero3D } from './components/home/Hero3D';
import { BookShowcase } from './components/home/BookShowcase';
import { LessonsList } from './components/home/LessonsList';
import { EducationalGamesSection } from './components/home/EducationalGamesSection';
import { LiveClassesSection } from './components/home/LiveClassesSection';
import { MembershipCards } from './components/home/MembershipCards';
import { CertificatesSection } from './components/home/CertificatesSection';
import { TestimonialsFAQ } from './components/home/TestimonialsFAQ';
import { LessonViewerModal } from './components/lessons/LessonViewerModal';
import { GameEngineModal } from './components/games/GameEngineModal';
import { BookReaderModal } from './components/book/BookReaderModal';
import { PurchaseModal } from './components/book/PurchaseModal';
import { LiveClassBookingModal } from './components/classes/LiveClassBookingModal';
import { CertificateModal } from './components/certificate/CertificateModal';
import { CertificateVerifyModal } from './components/certificate/CertificateVerifyModal';
import { AuthModal } from './components/auth/AuthModal';
import { ShelbyTutorChat } from './components/chat/ShelbyTutorChat';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TeacherAdminBar } from './components/admin/TeacherAdminBar';
import { TeacherAdminCard } from './components/home/TeacherAdminCard';
import { INITIAL_BOOK, INITIAL_LESSONS } from './data/textbookData';
import { INITIAL_GAMES } from './data/initialGames';
import { INITIAL_MEMBERSHIP_PLANS } from './data/initialMemberships';
import { INITIAL_SITE_SETTINGS, INITIAL_EMAIL_TEMPLATES } from './data/initialSiteSettings';
import { Book, Lesson, Game, MembershipPlan, CertificateRecord, SiteSettings } from './types';

function AppContent() {
  const { user, profile, isAdmin } = useAuth();
  const { t } = useLanguage();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [adminInitialTab, setAdminInitialTab] = useState<any>('analytics');
  const [currency, setCurrency] = useState<'USD' | 'AED'>('USD');

  // App Data (modifiable via Admin CMS)
  const [books, setBooks] = useState<Book[]>([INITIAL_BOOK]);
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [memberships, setMemberships] = useState<MembershipPlan[]>(INITIAL_MEMBERSHIP_PLANS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('alnabeel_site_settings');
      if (stored) {
        try {
          return { ...INITIAL_SITE_SETTINGS, ...JSON.parse(stored) };
        } catch (e) {
          console.warn('Failed parsing stored site settings:', e);
        }
      }
    }
    return INITIAL_SITE_SETTINGS;
  });

  // Modals state
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [purchasingItem, setPurchasingItem] = useState<{ type: 'book' | 'membership'; book?: Book; plan?: MembershipPlan } | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState<CertificateRecord | null>(null);
  const [verifyCodeModalOpen, setVerifyCodeModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Sample Certificate for preview
  const defaultCertificate: CertificateRecord = {
    id: 'cert-sample-1',
    verificationCode: 'NABEEL-2026-AR01',
    userId: user?.uid || 'guest',
    studentName: profile?.displayName || 'David Miller',
    courseName: 'An Introduction to Arabic for Non-Native Speakers',
    courseNameAr: 'مدخل إلى اللغة العربية لغير الناطقين بها',
    level: 'Beginner Level (A1 - A2)',
    levelAr: 'المستوى التأسيسي الشامل (A1 - A2)',
    teacherName: 'Ahmed Nabil Al-Nahrawy',
    teacherNameAr: 'أحمد نبيل النحراوي',
    issueDate: '2026-10-02',
    grade: 'مُمْتَاز مع مرتبة الشرف (High Honors)'
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'AED' : 'USD'));
  };

  const handleOpenLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const handlePlayGame = (game: Game) => {
    setActiveGame(game);
  };

  const handlePurchaseBook = (book: Book) => {
    setPurchasingItem({ type: 'book', book });
  };

  const handleSelectPlan = (plan: MembershipPlan) => {
    setPurchasingItem({ type: 'membership', plan });
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminWithTab = (tab?: string) => {
    if (tab) setAdminInitialTab(tab);
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8] text-[#24130A] selection:bg-amber-400 selection:text-[#24130a]">
      
      {/* Unified Sticky Header: Teacher Admin Ribbon + Main Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs">
        <TeacherAdminBar onOpenAdmin={handleOpenAdminWithTab} />
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          siteSettings={siteSettings}
        />
      </div>

      {/* Main Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Hero 3D */}
            {siteSettings.sectionVisibility.hero && (
              <Hero3D
                onStartLearning={() => handleOpenLesson(lessons[0])}
                onExploreBook={() => setReadingBook(books[0])}
                onViewMemberships={() => {
                  const el = document.getElementById('memberships');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                headlineAr={siteSettings.heroHeadlineAr}
                headlineEn={siteSettings.heroHeadlineEn}
                subtitleAr={siteSettings.heroSubtitleAr}
                subtitleEn={siteSettings.heroSubtitleEn}
              />
            )}

            {/* 2. The Book */}
            {siteSettings.sectionVisibility.theBook && (
              <BookShowcase
                book={books[0]}
                currency={currency}
                onReadOnline={(bk) => setReadingBook(bk)}
                onPurchaseBook={handlePurchaseBook}
              />
            )}

            {/* Dedicated Teacher Admin Hub Card (خانة المعلم المشرف - إدارة فورية) */}
            <TeacherAdminCard
              onOpenAdmin={handleOpenAdminWithTab}
              onOpenBookingModal={() => setIsBookingOpen(true)}
            />

            {/* 3. Interactive Lessons Curriculum */}
            {siteSettings.sectionVisibility.lessons && (
              <LessonsList
                lessons={lessons}
                onOpenLesson={handleOpenLesson}
              />
            )}

            {/* 4. Educational Games Showcase */}
            {siteSettings.sectionVisibility.games && (
              <EducationalGamesSection
                games={games}
                onPlayGame={handlePlayGame}
              />
            )}

            {/* 5. Live Classes via Google Meet */}
            {siteSettings.sectionVisibility.liveClasses && (
              <LiveClassesSection
                onOpenBooking={() => setIsBookingOpen(true)}
              />
            )}

            {/* 6. Membership Plans */}
            {siteSettings.sectionVisibility.memberships && (
              <MembershipCards
                plans={memberships}
                currency={currency}
                onSelectPlan={handleSelectPlan}
              />
            )}

            {/* 7. Certificates */}
            {siteSettings.sectionVisibility.certificates && (
              <CertificatesSection
                onViewSampleCertificate={() => setViewingCertificate(defaultCertificate)}
                onVerifyCode={(code) => setVerifyCodeModalOpen(true)}
              />
            )}

            {/* 8. Testimonials & FAQ */}
            <TestimonialsFAQ />
          </>
        )}

        {/* Dedicated Book View */}
        {currentView === 'book' && (
          <div className="py-8">
            <BookShowcase
              book={books[0]}
              currency={currency}
              onReadOnline={(bk) => setReadingBook(bk)}
              onPurchaseBook={handlePurchaseBook}
            />
          </div>
        )}

        {/* Dedicated Lessons View */}
        {currentView === 'lessons' && (
          <div className="py-8">
            <LessonsList
              lessons={lessons}
              onOpenLesson={handleOpenLesson}
            />
          </div>
        )}

        {/* Dedicated Games View */}
        {currentView === 'games' && (
          <div className="py-8">
            <EducationalGamesSection
              games={games}
              onPlayGame={handlePlayGame}
            />
          </div>
        )}

        {/* Dedicated Live Classes View */}
        {currentView === 'classes' && (
          <div className="py-8">
            <LiveClassesSection
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </div>
        )}

        {/* Dedicated Memberships View */}
        {currentView === 'memberships' && (
          <div className="py-8">
            <MembershipCards
              plans={memberships}
              currency={currency}
              onSelectPlan={handleSelectPlan}
            />
          </div>
        )}

        {/* Dedicated Certificates View */}
        {currentView === 'certificates' && (
          <div className="py-8">
            <CertificatesSection
              onViewSampleCertificate={() => setViewingCertificate(defaultCertificate)}
              onVerifyCode={(code) => setVerifyCodeModalOpen(true)}
            />
          </div>
        )}

        {/* Student Dashboard */}
        {currentView === 'dashboard' && (
          <StudentDashboard
            lessons={lessons}
            book={books[0]}
            onOpenLesson={handleOpenLesson}
            onOpenBookReader={(bk) => setReadingBook(bk)}
            onOpenBooking={() => setIsBookingOpen(true)}
            onViewCertificate={() => setViewingCertificate(defaultCertificate)}
            onOpenUpgrade={() => {
              handleNavigate('memberships');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} siteSettings={siteSettings} />

      {/* Floating AI Tutor "شلبي" with full platform navigation powers */}
      <ShelbyTutorChat
        onOpenBook={() => setReadingBook(books[0])}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenGame={() => {
          if (games.length > 0) setActiveGame(games[0]);
          else handleNavigate('games');
        }}
        onOpenLesson={() => {
          if (lessons.length > 0) setActiveLesson(lessons[0]);
          else handleNavigate('lessons');
        }}
        onOpenCertificate={() => setViewingCertificate(defaultCertificate)}
      />

      {/* Modals Container */}
      {activeLesson && (
        <LessonViewerModal
          lesson={activeLesson}
          game={games.find((g) => g.lessonId === activeLesson.id) || games[0]}
          onClose={() => setActiveLesson(null)}
          onLaunchGame={handlePlayGame}
          onMarkLessonCompleted={(lId) => {
            alert(t('أحسنت! تم تسجيل إكمال الدرس بنجاح في سجلك الأكاديمي.', 'Lesson marked as completed!'));
          }}
          onOpenUpgradeModal={() => {
            setActiveLesson(null);
            handleNavigate('memberships');
          }}
        />
      )}

      {activeGame && (
        <GameEngineModal
          game={activeGame}
          onClose={() => setActiveGame(null)}
          onGameCompleted={(score) => {
            console.log('Game completed with score:', score);
          }}
        />
      )}

      {readingBook && (
        <BookReaderModal
          book={readingBook}
          lessons={lessons}
          onClose={() => setReadingBook(null)}
          onOpenPurchase={() => {
            setReadingBook(null);
            handlePurchaseBook(books[0]);
          }}
        />
      )}

      {purchasingItem && (
        <PurchaseModal
          itemType={purchasingItem.type}
          book={purchasingItem.book}
          plan={purchasingItem.plan}
          currency={currency}
          onClose={() => setPurchasingItem(null)}
          onSuccess={() => {
            console.log('Purchase confirmed');
          }}
        />
      )}

      {isBookingOpen && (
        <LiveClassBookingModal
          onClose={() => setIsBookingOpen(false)}
          onBookingSuccess={(meetUrl) => {
            console.log('Class booked with Google Meet URL:', meetUrl);
          }}
        />
      )}

      {viewingCertificate && (
        <CertificateModal
          certificate={viewingCertificate}
          onClose={() => setViewingCertificate(null)}
        />
      )}

      {verifyCodeModalOpen && (
        <CertificateVerifyModal
          onClose={() => setVerifyCodeModalOpen(false)}
          onViewFullCertificate={(cert) => {
            setVerifyCodeModalOpen(false);
            setViewingCertificate(cert);
          }}
        />
      )}

      {authModalOpen && (
        <AuthModal onClose={() => setAuthModalOpen(false)} />
      )}

      {/* Admin Dashboard Full CMS */}
      {currentView === 'admin' && (
        <AdminDashboard
          books={books}
          lessons={lessons}
          games={games}
          memberships={memberships}
          siteSettings={siteSettings}
          emailTemplates={INITIAL_EMAIL_TEMPLATES}
          initialTab={adminInitialTab}
          onUpdateSiteSettings={setSiteSettings}
          onUpdateBooks={setBooks}
          onUpdateLessons={setLessons}
          onUpdateGames={setGames}
          onUpdateMemberships={setMemberships}
          onClose={() => setCurrentView('home')}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
