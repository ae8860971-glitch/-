export type UserRole = 'admin' | 'teacher' | 'student';

export type MembershipStatus = 'active' | 'trial' | 'expired' | 'none';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  membershipPlan?: string;
  membershipStatus: MembershipStatus;
  trialStartDate?: string;
  trialEndDate?: string;
  trialDaysRemaining?: number;
  allowedLessons?: string[];
  allowedBooks?: string[];
  createdAt: string;
  lastLoginAt: string;
}

export interface Book {
  id: string;
  title: string;
  titleAr: string;
  author: string;
  authorAr: string;
  description: string;
  descriptionAr: string;
  level: string;
  levelAr: string;
  coverUrl: string;
  backCoverUrl?: string;
  pdfUrl?: string;
  priceUSD: number;
  priceAED: number;
  downloadEnabled: boolean;
  isPublished: boolean;
  order: number;
  totalPages: number;
}

export interface VocabularyItem {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  audioPrompt?: string;
  category?: string;
}

export interface DialogueLine {
  speaker: string;
  speakerAr: string;
  textAr: string;
  textEn: string;
}

export interface ExerciseItem {
  id: string;
  instruction: string;
  instructionAr: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  type: 'fill_blank' | 'choose' | 'reorder' | 'open_task';
}

export interface Lesson {
  id: string;
  bookId: string;
  chapterNumber: number;
  chapterTitleAr: string;
  chapterTitleEn: string;
  unitNumber: number;
  unitTitleAr: string;
  unitTitleEn: string;
  lessonNumber: number;
  titleAr: string;
  titleEn: string;
  pageStart: number;
  pageEnd: number;
  dialogue?: DialogueLine[];
  vocabulary: VocabularyItem[];
  grammarNotesAr?: string;
  grammarNotesEn?: string;
  readingPassageAr?: string;
  readingPassageEn?: string;
  examples: string[];
  exercises: ExerciseItem[];
  additionalTasks: string[];
  adviceAr?: string;
  youtubeVideoId?: string;
  gameId: string;
  isTrialFree: boolean;
  isPublished: boolean;
}

export type GameType = 
  | 'multiple_choice'
  | 'true_false'
  | 'match_words'
  | 'drag_drop'
  | 'sentence_builder'
  | 'memory_game'
  | 'flashcards'
  | 'speed_challenge';

export interface GameQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  options?: string[];
  correctAnswer: string;
  pairs?: { arabic: string; english: string }[];
  words?: string[];
  correctOrder?: string[];
  explanationAr?: string;
  explanationEn?: string;
}

export interface Game {
  id: string;
  lessonId: string;
  titleAr: string;
  titleEn: string;
  gameType: GameType;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimitSeconds: number;
  pointsPerQuestion: number;
  questions: GameQuestion[];
  isPublished: boolean;
}

export interface LiveClass {
  id: string;
  title: string;
  titleAr: string;
  type: 'private' | 'group';
  teacherName: string;
  teacherEmail: string;
  studentEmail?: string;
  studentName?: string;
  scheduledAt: string; // ISO string
  durationMinutes: number;
  googleMeetUrl: string;
  googleCalendarEventId?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  maxCapacity: number;
  enrolledStudents: { uid: string; email: string; name: string }[];
  notes?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  priceUSD: number;
  priceAED: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  featuresAr: string[];
  isFeatured: boolean;
  isActive: boolean;
  canAccessAllLessons: boolean;
  canAccessAllBooks: boolean;
  canDownloadBooks: boolean;
  canAccessLiveClasses: boolean;
  canGetCertificate: boolean;
}

export interface StudentProgress {
  userId: string;
  completedLessons: string[];
  completedGames: string[];
  gameScores: Record<string, number>;
  totalScore: number;
  streakDays: number;
  lastActiveAt: string;
  purchasedBooks: string[];
  issuedCertificates: string[];
}

export interface CertificateRecord {
  id: string;
  verificationCode: string;
  userId: string;
  studentName: string;
  courseName: string;
  courseNameAr: string;
  level: string;
  levelAr: string;
  teacherName: string;
  teacherNameAr: string;
  issueDate: string;
  grade: string;
  qrCodeUrl?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  subjectAr: string;
  body: string;
  bodyAr: string;
  variables: string[];
}

export interface SiteSettings {
  brandNameAr: string;
  brandNameEn: string;
  logoUrl?: string;
  logoSubtitleAr?: string;
  logoSubtitleEn?: string;
  studentPasscode: string;
  allowStudentPasscodeLogin: boolean;
  teacherNameAr: string;
  teacherNameEn: string;
  teacherTitleAr: string;
  teacherTitleEn: string;
  adminEmail: string;
  trialDurationDays: number;
  allowTrial: boolean;
  trialLessonId: string;
  defaultCurrency: 'USD' | 'AED';
  exchangeRateUsdToAed: number;
  heroHeadlineAr: string;
  heroHeadlineEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  googleCalendarConnected: boolean;
  googleMeetConnected: boolean;
  gmailConnected: boolean;
  lastCalendarSync?: string;
  sectionVisibility: {
    hero: boolean;
    whyLearn: boolean;
    about: boolean;
    theBook: boolean;
    lessons: boolean;
    games: boolean;
    liveClasses: boolean;
    memberships: boolean;
    bookStore: boolean;
    trial: boolean;
    certificates: boolean;
    testimonials: boolean;
    faq: boolean;
  };
}
