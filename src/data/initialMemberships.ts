import { MembershipPlan } from '../types';

export const INITIAL_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter Plan',
    nameAr: 'خطة المبتدئ',
    tagline: 'Ideal for independent self-paced beginners starting their Arabic journey.',
    taglineAr: 'مثالية للراغبين في تعلم أساسيات اللغة العربية بخطوات ذاتية مرنة.',
    priceUSD: 19.00,
    priceAED: 70.00,
    billingCycle: 'monthly',
    features: [
      'Access to Chapters 1 to 3',
      'All Chapter Interactive Games & Quizzes',
      'Digital Book Online Reader',
      'Pronunciation Audio Guides',
      'Progress & Streak Tracking',
      'Community Learning Forum'
    ],
    featuresAr: [
      'الوصول إلى الفصول من 1 إلى 3',
      'جميع الألعاب التعليمية التفاعلية والاختبارات',
      'قارئ الكتاب الإلكتروني المدمج',
      'تسجيلات النطق الصوتي العربي',
      'لوحة متابعة التقدم والنقاط اليومية',
      'منتدى مجتمع المتعلمين'
    ],
    isFeatured: false,
    isActive: true,
    canAccessAllLessons: false,
    canAccessAllBooks: false,
    canDownloadBooks: false,
    canAccessLiveClasses: false,
    canGetCertificate: false
  },
  {
    id: 'plan-premium',
    name: 'Premium Plan',
    nameAr: 'الخطة المميزة (الأكثر طلباً)',
    tagline: 'Complete access to all 10 chapters, educational games, book downloads, and group sessions.',
    taglineAr: 'الوصول الكامل لجميع فصول الكتاب العشرة، تحميل الكتاب، وحصص جماعية مباشرة.',
    priceUSD: 49.00,
    priceAED: 180.00,
    billingCycle: 'monthly',
    features: [
      'Complete Access to All 10 Chapters & 30 Units',
      'All 8 Educational Game Engines',
      'Complete Textbook PDF Download Included',
      '2 Monthly Live Group Classes with Teacher Ahmed Nabil',
      'Gemini AI Arabic Conversational Tutor (Shelby AI)',
      'Official Certificate of Completion upon Exam'
    ],
    featuresAr: [
      'الوصول الكامل إلى جميع فصول الكتاب العشرة (30 وحدة)',
      'جميع أنماط الألعاب التعليمية الثمانية',
      'تحميل النسخة الكاملة للكتاب بصيغة PDF مجاناً',
      'حصتان جماعيتان مباشرتان شهرياً مع المعلم أحمد نبيل',
      'مساعد الذكاء الاصطناعي شلبي لممارسة المحادثة وتصحيح النطق',
      'شهادة إتمام معتمدة رسمياً برمز تحقق QR'
    ],
    isFeatured: true,
    isActive: true,
    canAccessAllLessons: true,
    canAccessAllBooks: true,
    canDownloadBooks: true,
    canAccessLiveClasses: true,
    canGetCertificate: true
  },
  {
    id: 'plan-vip',
    name: 'VIP Private Mentorship',
    nameAr: 'باقة VIP مع الإشراف الخاص',
    tagline: 'The ultimate Arabic fluency experience with 1-on-1 private classes and personalized tutoring.',
    taglineAr: 'التجربة الشاملة للإتقان السريع مع حصص فردية خاصة وجداول مخصصة.',
    priceUSD: 129.00,
    priceAED: 475.00,
    billingCycle: 'monthly',
    features: [
      'Everything in Premium Plan',
      '4 Private 1-on-1 Live Classes with Teacher Ahmed',
      'Personalized Google Meet & Calendar scheduling',
      'Direct WhatsApp & Gmail teacher support',
      'Customized homework review & speech diagnosis',
      'Priority VIP Certificate with Honors endorsement'
    ],
    featuresAr: [
      'كل ما تتضمنه الباقة المميزة',
      '4 حصص خاصة فردية مباشرة (One-on-One) مع المعلم أحمد نبيل',
      'مزامنة المواعيد مع Google Calendar وإنشاء غرف Google Meet خاصة',
      'دعم مباشر ومتابعة مخصصة عبر البريد الإلكتروني',
      'تصحيح شخصي للواجبات وتقييم متقدم للنطق والمحادثة',
      'شهادة شرفية ممتازة مع توقيع رسمي'
    ],
    isFeatured: false,
    isActive: true,
    canAccessAllLessons: true,
    canAccessAllBooks: true,
    canDownloadBooks: true,
    canAccessLiveClasses: true,
    canGetCertificate: true
  }
];
