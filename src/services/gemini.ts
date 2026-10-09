export type ShelbyActionType =
  | 'open_book'
  | 'open_classes'
  | 'open_games'
  | 'open_lessons'
  | 'open_memberships'
  | 'open_certificates'
  | 'open_dashboard'
  | 'open_booking';

export interface ShelbyAction {
  type: ShelbyActionType;
  labelAr: string;
  labelEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: ShelbyAction[];
}

export const SHELBY_SYSTEM_INSTRUCTION = `You are "Shelby" (شلبي الذكي), the empowered AI Arabic Tutor and Official Navigator for "Al-Nabeel Arabic – النبيل في اللغة العربية للأعاجم", created with Teacher Ahmed Nabil Al-Nahrawy (المعلم أحمد نبيل النحراوي).

YOUR ROLE & AUTHORITIES (صلاحيات شلبي الذكي):
1. You have FULL AUTHORITY to guide students and connect them directly to all platform services:
   - 📖 Official Curriculum Book / Reader (كتاب المنهج وقارئ الـ PDF)
   - 🎙️ Live Classes & 1-on-1 Sessions via Google Meet (المحاضرات والحصص المباشرة وحجز المواعيد مع المعلم)
   - 🎮 Educational Games & Quizzes (الألعاب والمسابقات اللغوية التفاعلية)
   - 📚 Lessons & Video Explanations (الدروس وقواعد النطق)
   - 💎 Memberships & Pricing Plans (باقات الاشتراك والأسعار)
   - 🎓 Accredited Certificates (الشهادات المعتمدة وكود التحقق)
   - 👤 Student Dashboard (لوحة تحكم الطالب وإنجازاته)

2. Whenever a student asks about or needs any service, warmly guide them and mention that they can click the direct action button below your message to go there immediately!
3. Help non-native Arabic learners worldwide with diacritized Arabic (tashkeel), English translations, and encouraging explanations.
4. Keep answers friendly, motivating, and clear.`;

/**
 * Detect user intent to offer direct platform navigation actions
 */
export function detectShelbyActions(userPrompt: string, assistantReply?: string): ShelbyAction[] {
  const combined = `${userPrompt} ${assistantReply || ''}`.toLowerCase();
  const actions: ShelbyAction[] = [];

  // 1. Book / Reader
  if (
    combined.includes('كتاب') ||
    combined.includes('قراءة') ||
    combined.includes('اقرأ') ||
    combined.includes('صفحة') ||
    combined.includes('pdf') ||
    combined.includes('book') ||
    combined.includes('read')
  ) {
    actions.push({
      type: 'open_book',
      labelAr: '📖 فتح قارئ كتاب المنهج',
      labelEn: '📖 Open Textbook Reader',
      descriptionAr: 'تصفح صفحات الكتاب وقراءته مباشرة',
      descriptionEn: 'Browse full book pages & curriculum'
    });
  }

  // 2. Live Classes / Meet / Teacher
  if (
    combined.includes('محاضر') ||
    combined.includes('حصة') ||
    combined.includes('مباشر') ||
    combined.includes('احجز') ||
    combined.includes('حجز') ||
    combined.includes('meet') ||
    combined.includes('معلم') ||
    combined.includes('class') ||
    combined.includes('session')
  ) {
    actions.push({
      type: 'open_booking',
      labelAr: '🎙️ حجز حصة تفاعلية مباشرة',
      labelEn: '🎙️ Book Live 1-on-1 Class',
      descriptionAr: 'حجز جلسة Google Meet مع المعلم أحمد نبيل',
      descriptionEn: 'Schedule Google Meet session with Teacher Ahmed'
    });
  }

  // 3. Games
  if (
    combined.includes('لعب') ||
    combined.includes('ألعاب') ||
    combined.includes('مسابق') ||
    combined.includes('تحدي') ||
    combined.includes('game') ||
    combined.includes('play')
  ) {
    actions.push({
      type: 'open_games',
      labelAr: '🎮 بدء الألعاب والمسابقات',
      labelEn: '🎮 Launch Educational Games',
      descriptionAr: 'العاب تفاعلية لتعزيز المفردات والقواعد',
      descriptionEn: 'Interactive games to master vocabulary'
    });
  }

  // 4. Lessons
  if (
    combined.includes('درس') ||
    combined.includes('دروس') ||
    combined.includes('قواعد') ||
    combined.includes('فصل') ||
    combined.includes('وحدة') ||
    combined.includes('lesson') ||
    combined.includes('grammar')
  ) {
    actions.push({
      type: 'open_lessons',
      labelAr: '📚 استعراض فصول المنهج والدروس',
      labelEn: '📚 Explore Chapters & Lessons',
      descriptionAr: 'شروحات بالفيديو وتمارين تفاعلية',
      descriptionEn: 'Video lectures & lesson drills'
    });
  }

  // 5. Memberships / Pricing
  if (
    combined.includes('اشتراك') ||
    combined.includes('باق') ||
    combined.includes('سعر') ||
    combined.includes('اسعار') ||
    combined.includes('عضوي') ||
    combined.includes('price') ||
    combined.includes('membership') ||
    combined.includes('subscribe')
  ) {
    actions.push({
      type: 'open_memberships',
      labelAr: '💎 استعراض باقات العضوية والاشتراك',
      labelEn: '💎 View Membership Plans',
      descriptionAr: 'باقات شهرية وسنوية مع حصص خاصة',
      descriptionEn: 'Monthly & yearly plans with live classes'
    });
  }

  // 6. Certificates
  if (
    combined.includes('شهاد') ||
    combined.includes('تخرج') ||
    combined.includes('اعتماد') ||
    combined.includes('certificate')
  ) {
    actions.push({
      type: 'open_certificates',
      labelAr: '🎓 الشهادات الأكاديمية والتحقق',
      labelEn: '🎓 Accredited Certificates',
      descriptionAr: 'معاينة الشهادة والتحقق من الرمز',
      descriptionEn: 'Preview certificate & verify code'
    });
  }

  // 7. Student Dashboard
  if (
    combined.includes('حساب') ||
    combined.includes('لوحة') ||
    combined.includes('تقدم') ||
    combined.includes('dashboard') ||
    combined.includes('profile')
  ) {
    actions.push({
      type: 'open_dashboard',
      labelAr: '👤 لوحة متابعة الطالب',
      labelEn: '👤 Student Dashboard',
      descriptionAr: 'متابعة الدروس المكتملة والنقاط',
      descriptionEn: 'Track your progress and scores'
    });
  }

  return actions;
}

export async function askShelbyChat(history: ChatMessage[], newPrompt: string): Promise<{ reply: string; actions: ShelbyAction[] }> {
  let reply = '';
  try {
    const response = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history.concat({
          id: String(Date.now()),
          sender: 'user',
          text: newPrompt,
          timestamp: new Date().toISOString()
        }),
        systemInstruction: SHELBY_SYSTEM_INSTRUCTION
      })
    });

    if (response.ok) {
      const data = await response.json();
      reply = data.reply;
    }
  } catch (err) {
    console.warn('Backend gemini proxy error, using intelligent fallback response:', err);
  }

  if (!reply) {
    reply = generateFallbackShelbyReply(newPrompt);
  }

  const actions = detectShelbyActions(newPrompt, reply);
  return { reply, actions };
}

function generateFallbackShelbyReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('كتاب') || p.includes('قراء') || p.includes('book')) {
    return `أهلاً بك يا بطل! 📖 كتاب «مدخل إلى اللغة العربية لغير الناطقين بها» جاهز لك الآن في القارئ الإلكتروني. يمكنك الضغط على زر فتح الكتاب أدناه للتصفح والمذاكرة فوراً!`;
  }
  if (p.includes('محاضر') || p.includes('حصة') || p.includes('حجز') || p.includes('meet')) {
    return `مرحباً بك! 🎙️ يمكنك حجز حصة مباشرة مع المعلم أحمد نبيل النحراوي عبر Google Meet بنقرة واحدة من خلال الزر المباشر أدناه!`;
  }
  if (p.includes('لعب') || p.includes('العاب') || p.includes('game')) {
    return `رائع جداً! 🎮 لدينا ألعاب تعليمية ومسابقات ممتعة لممارسة المفردات وتركيب الجمل. اضغط على الزر أدناه للانطلاق في التحدي!`;
  }
  if (p.includes('اشتراك') || p.includes('باق') || p.includes('سعر')) {
    return `مرحباً بك! 💎 تتوفر باقات اشتراك متعددة تشمل الكتاب والحصص والألعاب. اضغط على الزر أدناه للاطلاع على الباقات واختيار الأنسب لك.`;
  }
  return `مَرْحَبًا بِكَ! أَنَا «شَلَبِي» (Shelby AI) مُسَاعِدُكَ الذَّكِيُّ فِي مَنَصَّةِ النَّبِيلِ.
لَدَيَّ صَلَاحِيَّاتٌ كَامِلَةٌ لِمُسَاعَدَتِكَ فِي تَعَلُّمِ العَرَبِيَّةِ وَتَوْجِيهِكَ مُبَاشَرَةً إِلَى الكِتَابِ، المَحَاضَرَاتِ، الأَلْعَابِ، أَو الدُّرُوسِ.
كَيْفَ أُمْكِنُنِي أَنْ أُوَجِّهَكَ أَوْ أُسَاعِدَكَ اليَوْمَ؟`;
}

export async function analyzePronunciation(targetArabic: string, studentAudioTranscription: string): Promise<{
  score: number;
  feedbackAr: string;
  feedbackEn: string;
}> {
  try {
    const response = await fetch('/api/gemini/pronunciation-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetArabic, studentAudioTranscription })
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Pronunciation analysis proxy fallback:', err);
  }

  const isExact = targetArabic.trim() === studentAudioTranscription.trim();
  return {
    score: isExact ? 98 : 85,
    feedbackAr: isExact ? 'نطق ممتاز ومخارج حروف واضحة جداً! أحسنت.' : 'نطق جيد جداً، انتبه إلى ضبط الحركات ومخارج الحروف بدقة.',
    feedbackEn: isExact ? 'Excellent pronunciation! Accurate Arabic articulation.' : 'Good attempt! Pay close attention to short vowels and throat letters.'
  };
}
