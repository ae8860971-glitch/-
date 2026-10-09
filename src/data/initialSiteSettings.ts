import { SiteSettings, EmailTemplate } from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  brandNameAr: 'النبيل في اللغة العربية للأعاجم',
  brandNameEn: 'Al-Nabeel Arabic',
  logoUrl: '/logo.png',
  logoSubtitleAr: 'في اللغة العربية للأعاجم',
  logoSubtitleEn: 'Al-Nabeel Arabic',
  studentPasscode: '12345',
  allowStudentPasscodeLogin: true,
  teacherNameAr: 'أحمد نبيل النحراوي',
  teacherNameEn: 'Ahmed Nabil Al-Nahrawy',
  teacherTitleAr: 'معلم اللغة العربية لغير الناطقين بها والمشرف العام',
  teacherTitleEn: 'Arabic Language Educator & Lead Instructor',
  adminEmail: 'ae8860971@gmail.com',
  trialDurationDays: 3,
  allowTrial: true,
  trialLessonId: 'ch1-unit1',
  defaultCurrency: 'USD',
  exchangeRateUsdToAed: 3.67,
  heroHeadlineAr: 'تعلَّم العربية مع النبيل للأعاجم',
  heroHeadlineEn: 'Master Arabic with Al-Nabeel',
  heroSubtitleAr: 'منصة تعليمية متكاملة لغير الناطقين بالعربية تجمع بين منهج الكتاب المعتمد، والألعاب التفاعلية، والفيديوهات، والحصص المباشرة عبر Google Meet.',
  heroSubtitleEn: 'Learn Arabic through interactive textbook lessons, educational games, videos, and live classes powered by Google Workspace.',
  googleCalendarConnected: true,
  googleMeetConnected: true,
  gmailConnected: true,
  lastCalendarSync: new Date().toISOString(),
  sectionVisibility: {
    hero: true,
    whyLearn: true,
    about: true,
    theBook: true,
    lessons: true,
    games: true,
    liveClasses: true,
    memberships: true,
    bookStore: true,
    trial: true,
    certificates: true,
    testimonials: true,
    faq: true
  }
};

export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome & Account Created',
    subject: 'Welcome to Al-Nabeel Arabic! مرحباً بك في النبيل للعربية',
    subjectAr: 'مرحباً بك في النبيل للعربية!',
    body: 'Hello {{student_name}},\n\nWelcome to Al-Nabeel Arabic! Your journey to mastering the Arabic language has officially begun.\n\nYou can now log in, explore the textbook units, play interactive games, and track your progress.\n\nHappy learning!\nTeacher Ahmed Nabil Al-Nahrawy',
    bodyAr: 'مرحباً بك يا {{student_name}} في منصة النبيل لتعليم اللغة العربية لغير الناطقين بها.\nنتمنى لك رحلة تعليمية شيقة وممتعة!\nالمعلم أحمد نبيل النحراوي',
    variables: ['{{student_name}}', '{{email}}']
  },
  {
    id: 'trial_started',
    name: '3-Day Free Trial Started',
    subject: 'Your 3-Day Free Trial is Now Active! بدأت فترتك التجريبية',
    subjectAr: 'بدأت فترتك التجريبية المجانية لمدة 3 أيام',
    body: 'Hello {{student_name}},\n\nYour 3-day free trial on Al-Nabeel Arabic has started. You have full access to Unit 1: Hello in Arabic and its educational games.\n\nStart your first lesson now: {{lesson_name}}',
    bodyAr: 'مرحباً {{student_name}}، لقد بدأت فترتك التجريبية المجانية بنجاح. استمتع بدراسة الوحدة الأولى ولعب الألعاب التفاعلية.',
    variables: ['{{student_name}}', '{{lesson_name}}']
  },
  {
    id: 'class_booked',
    name: 'Live Class Booked (Google Meet & Calendar)',
    subject: 'Confirmed: Arabic Live Class with Teacher Ahmed Nabil',
    subjectAr: 'تأكيد حجز الحصة المباشرة مع المعلم أحمد نبيل',
    body: 'Hello {{student_name}},\n\nYour live Arabic class has been scheduled successfully!\n\nDate & Time: {{class_date}} at {{class_time}} ({{timezone}})\nClass Topic: {{lesson_name}}\nGoogle Meet Link: {{meet_link}}\n\nThis event has been synced to Google Calendar. Please join on time with your microphone ready.',
    bodyAr: 'مرحباً {{student_name}}، تم تأكيد حجز حصتك المباشرة بنجاح.\nالتاريخ: {{class_date}} في تمام {{class_time}}\nرابط Google Meet المباشر: {{meet_link}}',
    variables: ['{{student_name}}', '{{class_date}}', '{{class_time}}', '{{timezone}}', '{{lesson_name}}', '{{meet_link}}']
  },
  {
    id: 'book_purchased',
    name: 'Book Purchased & Download Link',
    subject: 'Your Book is Ready: An Introduction to Arabic for Non-Native Speakers',
    subjectAr: 'تم الشراء بنجاح: كتاب مدخل إلى اللغة العربية للأعاجم',
    body: 'Hello {{student_name}},\n\nThank you for purchasing "{{book_name}}" by Teacher Ahmed Nabil Al-Nahrawy.\n\nYour high-resolution PDF download link is ready: {{download_link}}\n\nYou also have unlimited access to read the digital version online anytime inside the platform.',
    bodyAr: 'شكراً لشرائك كتاب {{book_name}}، يمكنك الآن تحميل النسخة الكاملة أو قراءتها عبر المنصة.',
    variables: ['{{student_name}}', '{{book_name}}', '{{download_link}}']
  },
  {
    id: 'certificate_issued',
    name: 'Certificate of Completion Ready',
    subject: 'Congratulations! Your Official Arabic Certificate is Issued',
    subjectAr: 'مبارك! صدرت شهادتك الرسمية في إتمام دورة اللغة العربية',
    body: 'Congratulations {{student_name}}!\n\nYou have successfully completed the Al-Nabeel Arabic course. Your official Certificate of Completion (Verification ID: {{certificate_id}}) is now ready for download in high-resolution PDF format.',
    bodyAr: 'مبارك إتمامك للدورة بنجاح! شهادتك المعتمدة جاهزة للتحميل الآن برمز التحقق: {{certificate_id}}.',
    variables: ['{{student_name}}', '{{certificate_id}}']
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 't1',
    name: 'David Miller',
    country: 'United States 🇺🇸',
    role: 'Diplomatic Consultant',
    quoteEn: 'Al-Nabeel Arabic made conversational Arabic click for me after years of struggle. Teacher Ahmed explains nuance with crystal clarity, and the games made memorizing vocabulary effortless!',
    quoteAr: 'منهج النبيل غير نظرتي لتعلم العربية، شرح المعلم أحمد رائع والألعاب جعلت حفظ الكلمات ممتعاً للغاية.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't2',
    name: 'Sophia Laurent',
    country: 'France 🇫🇷',
    role: 'International Journalist',
    quoteEn: 'The direct live sessions on Google Meet and the textbook coherence are unmatched. I went from zero alphabet knowledge to navigating airport and restaurant dialogues in Dubai within 4 weeks.',
    quoteAr: 'الحصص المباشرة عبر Google Meet والتدرج الرائع في الكتاب ساعداني على التحدث بثقة في دبي خلال شهر واحد فقط.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't3',
    name: 'Kenji Takahashi',
    country: 'Japan 🇯🇵',
    role: 'Software Architect',
    quoteEn: 'As an engineer, I loved the structured nominal sentence progression in Chapter 4 and the instant feedback on pronunciation. Truly an international caliber platform!',
    quoteAr: 'المنهج الهندسي المنظم لبناء الجملة في الفصل الرابع وتمارين النطق الفورية لا مثيل لها.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_FAQS = [
  {
    id: 'faq1',
    questionEn: 'Is this course suitable for complete beginners who don’t know the alphabet?',
    questionAr: 'هل المنهج مناسب للمبتدئين الذين لا يعرفون الحروف إطلاقاً؟',
    answerEn: 'Yes! Chapter 1 starts from ground zero: writing direction, letter sounds with short vowels (Fatha, Kasra, Damma), and your very first words (Door, House, Book) with native audio pronunciation.',
    answerAr: 'نعم بكل تأكيد! يبدأ الفصل الأول من الصفر تماماً: اتجاه الكتابة، نطق الحروف بالحركات القصيرة، وقراءة الكلمات الأولى مثل (باب، بيت، كتاب) مع تسجيلات صوتية واضحة.'
  },
  {
    id: 'faq2',
    questionEn: 'How do the live classes and Google Meet work?',
    questionAr: 'كيف تعمل الحصص المباشرة عبر Google Meet؟',
    answerEn: 'When you book a private or group session, the system automatically creates a Google Calendar event and a dedicated Google Meet room. You will receive an invitation in Gmail and can join directly with one click from your student dashboard.',
    answerAr: 'بمجرد حجز الحصة، يتم تلقائياً إنشاء موعد في تقويم Google وتوليد رابط غرفة Google Meet مباشرة وإرسال رسالة تأكيد لبريدك الإلكتروني، مع إمكانية الانضمام بزر واحد من لوحة الطالب.'
  },
  {
    id: 'faq3',
    questionEn: 'Can I purchase the textbook separately without a subscription?',
    questionAr: 'هل يمكنني شراء الكتاب بشكل منفصل دون اشتراك شهري؟',
    answerEn: 'Yes, our Book Store allows you to buy the standalone "An Introduction to Arabic for Non-Native Speakers" textbook PDF for lifetime access and downloading.',
    answerAr: 'نعم، يتيح لك متجر الكتب شراء النسخة الإلكترونية الكاملة لكتاب "مدخل إلى اللغة العربية لغير الناطقين بها" بصيغة PDF وتحميلها مدى الحياة.'
  },
  {
    id: 'faq4',
    questionEn: 'How does the 3-day free trial work?',
    questionAr: 'كيف تعمل الفترة التجريبية المجانية لمدة 3 أيام؟',
    answerEn: 'Every new student can activate a 3-day full access trial for the initial chapter, all its interactive games, and speech exercises without needing a credit card.',
    answerAr: 'يحصل كل طالب جديد على فترة تجريبية مجانية لمدة 3 أيام لاستكشاف الفصل الأول بكافة ألعابه التفاعلية وتمارينه الصوتية دون الحاجة لبطاقة ائتمان.'
  }
];
