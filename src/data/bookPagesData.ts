// Complete, verbatim data for all 71 pages of the official textbook:
// "مدخل إلى اللغة العربية لغير الناطقين بها" — إعداد المعلم أحمد نبيل النحراوي

export interface BookPage {
  pageNumber: number;
  type: 'cover' | 'toc' | 'chapter_cover' | 'lesson_content' | 'lesson_exercises' | 'review' | 'back_cover';
  chapterTitleAr?: string;
  unitTitleAr?: string;
  unitTitleEn?: string;
  content?: {
    listenSection?: {
      title: string;
      lines: { speaker?: string; textAr: string; textEn?: string }[];
    };
    readingPassage?: {
      title: string;
      text: string;
      textEn?: string;
    };
    notes?: string[];
    vocabulary?: { arabic: string; english: string; transliteration?: string }[];
    advice?: string;
    examples?: string[];
    exercises?: {
      id: string;
      instruction: string;
      question?: string;
      type: 'fill' | 'choose' | 'free';
      options?: string[];
      correctAnswer?: string;
    }[];
    additionalTasks?: string[];
    taskDetails?: {
      title: string;
      description: string;
      criteria?: string[];
    };
  };
}

export const BOOK_PAGES_DATA: BookPage[] = [
  // Page 1: الغلاف الخارجي
  {
    pageNumber: 1,
    type: 'cover'
  },

  // Page 2: فهرس المحتويات (الفصل 1 إلى 5)
  {
    pageNumber: 2,
    type: 'toc',
    content: {
      notes: ['الفصل الأول: أبدأ العربية', 'الفصل الثاني: مَنْ أَنَا؟', 'الفصل الثالث: الأشخاص والأشياء', 'الفصل الرابع: بناء الجملة العربية', 'الفصل الخامس: يومي ووقتي']
    }
  },

  // Page 3: فهرس المحتويات (الفصل 6 إلى 10)
  {
    pageNumber: 3,
    type: 'toc',
    content: {
      notes: ['الفصل السادس: الطعام والشراء', 'الفصل السابع: المدينة والاتجاهات', 'الفصل الثامن: الدراسة والعمل', 'الفصل التاسع: مواقف الحياة', 'الفصل العاشر: أتواصل بالعربية']
    }
  },

  // Page 4: الفصل الأول: أبدأ العربية
  {
    pageNumber: 4,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 5: الوحدة الأولى: مرحباً بالعربية
  {
    pageNumber: 5,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    unitTitleAr: 'الوحدة الأولى: مرحباً بالعربية',
    unitTitleEn: 'Hello in Arabic',
    content: {
      listenSection: {
        title: 'استمع وافهم',
        lines: [
          { speaker: 'أحمد', textAr: 'مَرْحَبًا.' },
          { speaker: 'سارة', textAr: 'مَرْحَبًا.' },
          { speaker: 'أحمد', textAr: 'أَهْلًا وَسَهْلًا.' },
          { speaker: 'سارة', textAr: 'أَهْلًا بِكِ.' },
          { speaker: 'أحمد', textAr: 'كَيْفَ حَالُكِ؟' },
          { speaker: 'سارة', textAr: 'أَنَا بِخَيْرٍ، شُكْرًا. وَأَنْتَ؟' },
          { speaker: 'أحمد', textAr: 'أَنَا بِخَيْرٍ، الحَمْدُ لِلَّهِ.' }
        ]
      },
      vocabulary: [
        { arabic: 'أَهْلًا وَسَهْلًا', english: 'Welcome / Hello' },
        { arabic: 'مَرْحَبًا', english: 'Hello' },
        { arabic: 'كَيْفَ', english: 'How' },
        { arabic: 'أَهْلًا بِكِ', english: 'Welcome' },
        { arabic: 'أَنَا', english: 'I' },
        { arabic: 'حَال', english: 'Condition / state' },
        { arabic: 'شُكْرًا', english: 'Thank you' },
        { arabic: 'بِخَيْرٍ', english: 'Fine / well' },
        { arabic: 'وَأَنْتَ؟', english: 'And you?' }
      ]
    }
  },

  // Page 6: الأمثلة والنصيحة
  {
    pageNumber: 6,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    unitTitleAr: 'الوحدة الأولى: مرحباً بالعربية',
    unitTitleEn: 'Hello in Arabic',
    content: {
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. مَرْحَبًا.',
        '2. كَيْفَ حَالُكَ؟',
        '3. أَنَا بِخَيْرٍ، شُكْرًا.'
      ]
    }
  },

  // Page 7: تدريب وتدريب إضافي
  {
    pageNumber: 7,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    unitTitleAr: 'الوحدة الأولى: مرحباً بالعربية',
    unitTitleEn: 'Hello in Arabic',
    content: {
      exercises: [
        {
          id: 'ex-p7-1',
          instruction: 'أكمل الحوار:',
          question: 'أحمد: مرحباً. أنت: ______ | أحمد: كيف حالك؟ أنت: ______ | أحمد: شكراً. أنت: ______',
          type: 'fill',
          options: ['مَرْحَبًا', 'أَنَا بِخَيْرٍ، شُكْرًا', 'عَفْوًا / أَهْلًا بِكَ'],
          correctAnswer: 'مَرْحَبًا'
        },
        {
          id: 'ex-p7-2',
          instruction: 'اختر: عندما تقابل شخصاً تقول:',
          question: 'عندما تقابل شخصاً تقول: (مرحباً / شكراً / كتاب)',
          type: 'choose',
          options: ['مَرْحَبًا', 'شُكْرًا', 'كِتَاب'],
          correctAnswer: 'مَرْحَبًا'
        },
        {
          id: 'ex-p7-3',
          instruction: 'أجب: كيف حالك؟',
          question: 'كَيْفَ حَالُكَ؟ —',
          type: 'choose',
          options: ['أَنَا بِخَيْرٍ، الحَمْدُ لِلَّهِ', 'مَعَ السَّلَامَة', 'اسْمِي أَحْمَد'],
          correctAnswer: 'أَنَا بِخَيْرٍ، الحَمْدُ لِلَّهِ'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 8: الوحدة الثانية: الحروف والأصوات
  {
    pageNumber: 8,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    unitTitleAr: 'الوحدة الثانية: الحروف والأصوات',
    unitTitleEn: 'Arabic Letters and Sounds',
    content: {
      readingPassage: {
        title: 'اتجاه الكتابة والحروف',
        text: 'تُكتب العربية من اليمين إلى اليسار. سنتعلم أولاً: ا، ب، ت، ث، ج، ح، خ، د، ذ، ر، ز، س، ش.'
      },
      notes: [
        'الحركات القصيرة:',
        'الفتحة: بَ — تَ — سَ',
        'الكسرة: بِ — تِ — سِ',
        'الضمة: بُ — تُ — سُ',
        'تدريب قراءة: بَ، بِ، بُ — تَ، تِ، تُ — سَ، سِ، سُ.'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. بَ — بِ — بُ',
        '2. تَ — تِ — تُ',
        '3. سَ — سِ — سُ'
      ]
    }
  },

  // Page 9: تدريب الحروف والأصوات
  {
    pageNumber: 9,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    unitTitleAr: 'الوحدة الثانية: الحروف والأصوات',
    unitTitleEn: 'Arabic Letters and Sounds',
    content: {
      exercises: [
        {
          id: 'ex-p9-1',
          instruction: 'اقرأ بصوت واضح:',
          question: 'بَ — تِ — سُ / تَ — بُ — سِ / سَ — تِ — بُ',
          type: 'fill'
        },
        {
          id: 'ex-p9-2',
          instruction: 'ميّز بين الحروف والحركات:',
          question: 'ميّز: بَ / تَ — سَ / شَ',
          type: 'choose',
          options: ['بَ (Ba) / تَ (Ta)', 'سَ (Sa) / شَ (Sha)'],
          correctAnswer: 'بَ (Ba) / تَ (Ta)'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 10: الوحدة الثالثة: أقرأ كلمتي الأولى
  {
    pageNumber: 10,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    unitTitleAr: 'الوحدة الثالثة: أقرأ كلمتي الأولى',
    unitTitleEn: 'I Read My First Arabic Word',
    content: {
      readingPassage: {
        title: 'من الحرف إلى الكلمة',
        text: 'حرف ← صوت ← مقطع ← كلمة.\nكلمات: بَاب، بَيْت، كِتَاب، بِنْت، أَب.'
      },
      notes: [
        'السكون والقراءة:',
        'السكون: بْ. اقرأ: أَبْ، بَاب.',
        'لاحظ اتصال الحروف داخل الكلمة، ولا تحاول حفظ جميع أشكالها في هذه المرحلة.'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. بَابٌ',
        '2. بَيْتٌ',
        '3. هَذَا كِتَابٌ.'
      ]
    }
  },

  // Page 11: تدريب قراءة كلمتي الأولى
  {
    pageNumber: 11,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    unitTitleAr: 'الوحدة الثالثة: أقرأ كلمتي الأولى',
    unitTitleEn: 'I Read My First Arabic Word',
    content: {
      exercises: [
        {
          id: 'ex-p11-1',
          instruction: 'رتّب الحروف لتكوين كلمة:',
          question: 'ب — ا — ب = _____ / ت — ي — ب = _____ / ا — ب — ت — ك = _____',
          type: 'fill',
          options: ['بَاب', 'بَيْت', 'كِتَاب'],
          correctAnswer: 'بَاب'
        },
        {
          id: 'ex-p11-2',
          instruction: 'أكمل الجملة:',
          question: 'أكمل: هَذَا ______ (باب / بنت)',
          type: 'choose',
          options: ['بَابٌ', 'بِنْتٌ'],
          correctAnswer: 'بَابٌ'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 12: الفصل الثاني: مَنْ أَنَا؟
  {
    pageNumber: 12,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 13: الوحدة الأولى: اسمي
  {
    pageNumber: 13,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    unitTitleAr: 'الوحدة الأولى: اسمي',
    unitTitleEn: 'My Name',
    content: {
      listenSection: {
        title: 'استمع وافهم',
        lines: [
          { textAr: 'مَرْحَبًا. اسْمِي أَحْمَد. مَا اسْمُكِ؟' },
          { textAr: 'اسْمِي سَارَة. تَشَرَّفْتُ بِلِقَائِكِ.' }
        ]
      },
      notes: [
        'عبارات مهمة:',
        'اسمي ______.',
        'ما اسمك؟',
        'تشرفت بلقائك.',
        'وأنا أيضاً.'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. مَا اسْمُكَ؟',
        '2. اسْمِي أَحْمَدُ.',
        '3. تَشَرَّفْتُ بِلِقَائِكَ.'
      ]
    }
  },

  // Page 14: تدريب: اسمي
  {
    pageNumber: 14,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    unitTitleAr: 'الوحدة الأولى: اسمي',
    unitTitleEn: 'My Name',
    content: {
      exercises: [
        {
          id: 'ex-p14-1',
          instruction: 'أكمل الفراغات:',
          question: 'أكمل: اسْمِي ______. / مَا ______؟',
          type: 'fill',
          options: ['أَحْمَد', 'اسْمُكَ', 'اسْمُكِ'],
          correctAnswer: 'أَحْمَد'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 15: الوحدة الثانية: من أين أنت؟
  {
    pageNumber: 15,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    unitTitleAr: 'الوحدة الثانية: من أين أنت؟',
    unitTitleEn: 'Where Are You From?',
    content: {
      listenSection: {
        title: 'استمع وافهم',
        lines: [
          { textAr: 'مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنْ مِصْرَ. وَأَنْتَ؟ أَنَا مِنَ اليَابَانِ.' }
        ]
      },
      vocabulary: [
        { arabic: 'مِصْر', english: 'Egypt' },
        { arabic: 'اليَابَان', english: 'Japan' },
        { arabic: 'تُرْكِيَا', english: 'Türkiye' },
        { arabic: 'فَرَنْسَا', english: 'France' },
        { arabic: 'مِنْ', english: 'from / who بحسب السياق' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. مِنْ أَيْنَ أَنْتَ؟',
        '2. أَنَا مِنْ مِصْرَ.',
        '3. أَنَا مِنَ الإِسْكَنْدَرِيَّةِ.'
      ]
    }
  },

  // Page 16: تدريب من أين أنت؟
  {
    pageNumber: 16,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    unitTitleAr: 'الوحدة الثانية: من أين أنت؟',
    unitTitleEn: 'Where Are You From?',
    content: {
      exercises: [
        {
          id: 'ex-p16-1',
          instruction: 'اختر حرف الجر المناسب:',
          question: 'اختر: أَنَا (مِنْ / إِلَى) مِصْرَ.',
          type: 'choose',
          options: ['مِنْ', 'إِلَى'],
          correctAnswer: 'مِنْ'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 17: الوحدة الثالثة: معلوماتي الشخصية
  {
    pageNumber: 17,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    unitTitleAr: 'الوحدة الثالثة: معلوماتي الشخصية',
    unitTitleEn: 'Personal Information',
    content: {
      exercises: [
        {
          id: 'ex-p17-1',
          instruction: 'تدريب بطاقة تعريف:',
          question: 'اكتب بطاقة تعريف قصيرة: الاسم، البلد، المدينة، اللغة التي تتعلمها. تحدث لمدة ثلاثين ثانية عن نفسك دون قراءة النص.',
          type: 'fill'
        }
      ],
      examples: [
        '1. أَنَا طَالِبٌ.',
        '2. أَنَا فِي الإِسْكَنْدَرِيَّةِ.',
        '3. أَدْرُسُ اللُّغَةَ العَرَبِيَّةَ.'
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 18: الفصل الثالث: الأشخاص والأشياء
  {
    pageNumber: 18,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 19: الوحدة الأولى: هذا كتاب
  {
    pageNumber: 19,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    unitTitleAr: 'الوحدة الأولى: هذا كتاب',
    unitTitleEn: 'This Is a Book',
    content: {
      readingPassage: {
        title: 'ألاحظ',
        text: 'هذا كتاب. هذا بيت. هذا قلم. هذه حقيبة. هذه سيارة.'
      },
      notes: [
        'ملاحظة لغوية:',
        'نستخدم «هذا» مع الاسم المذكر، و«هذه» مع الاسم المؤنث. تعلّم المثال في سياقه قبل الدخول في التفاصيل النحوية.'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. هَذَا كِتَابٌ.',
        '2. هَذَا قَلَمٌ.',
        '3. هَذِهِ حَقِيبَةٌ.'
      ]
    }
  },

  // Page 20: تدريب هذا كتاب
  {
    pageNumber: 20,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    unitTitleAr: 'الوحدة الأولى: هذا كتاب',
    unitTitleEn: 'This Is a Book',
    content: {
      exercises: [
        {
          id: 'ex-p20-1',
          instruction: 'اختر اسم الإشارة المناسب:',
          question: 'اختر: (هَذَا / هَذِهِ) كِتَابٌ.',
          type: 'choose',
          options: ['هَذَا', 'هَذِهِ'],
          correctAnswer: 'هَذَا'
        },
        {
          id: 'ex-p20-2',
          instruction: 'اختر اسم الإشارة المناسب:',
          question: 'اختر: (هَذَا / هَذِهِ) حَقِيبَةٌ.',
          type: 'choose',
          options: ['هَذِهِ', 'هَذَا'],
          correctAnswer: 'هَذِهِ'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 21: الوحدة الثانية: مذكر أم مؤنث؟
  {
    pageNumber: 21,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    unitTitleAr: 'الوحدة الثانية: مذكر أم مؤنث؟',
    unitTitleEn: 'Masculine or Feminine?',
    content: {
      exercises: [
        {
          id: 'ex-p21-1',
          instruction: 'صنّف الكلمات إلى مذكر ومؤنث:',
          question: 'صنّف: كتاب، سيارة، قلم، حقيبة، بيت، شجرة.',
          type: 'fill',
          options: ['مذكر: كتاب، قلم، بيت', 'مؤنث: سيارة، حقيبة، شجرة'],
          correctAnswer: 'مذكر: كتاب، قلم، بيت'
        }
      ],
      examples: [
        '1. هَذَا طَالِبٌ.',
        '2. هَذِهِ طَالِبَةٌ.',
        '3. هَذِهِ سَيَّارَةٌ.'
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 22: الوحدة الثالثة: صف الشيء
  {
    pageNumber: 22,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    unitTitleAr: 'الوحدة الثالثة: صف الشيء',
    unitTitleEn: 'Describe the Object',
    content: {
      readingPassage: {
        title: 'أقرأ',
        text: 'هذا كتاب جديد. هذه حقيبة كبيرة. هذا قلم صغير. هذه سيارة جميلة.'
      },
      vocabulary: [
        { arabic: 'جَدِيد', english: 'New' },
        { arabic: 'قَدِيم', english: 'Old' },
        { arabic: 'كَبِير', english: 'Big' },
        { arabic: 'صَغِير', english: 'Small' },
        { arabic: 'جَمِيل', english: 'Beautiful' },
        { arabic: 'سَرِيع', english: 'Fast' },
        { arabic: 'بَطِيء', english: 'Slow' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. هَذَا كِتَابٌ جَدِيدٌ.',
        '2. هَذِهِ حَقِيبَةٌ كَبِيرَةٌ.',
        '3. هَذَا قَلَمٌ صَغِيرٌ.'
      ]
    }
  },

  // Page 23: تدريب صف الشيء
  {
    pageNumber: 23,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    unitTitleAr: 'الوحدة الثالثة: صف الشيء',
    unitTitleEn: 'Describe the Object',
    content: {
      exercises: [
        {
          id: 'ex-p23-1',
          instruction: 'أكمل بصفة مناسبة:',
          question: 'أكمل: هَذَا كِتَابٌ ______. / هَذِهِ حَقِيبَةٌ ______.',
          type: 'choose',
          options: ['جَدِيدٌ / كَبِيرَةٌ', 'صَغِيرٌ / جَمِيلَةٌ'],
          correctAnswer: 'جَدِيدٌ / كَبِيرَةٌ'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 24: الفصل الرابع: بناء الجملة العربية
  {
    pageNumber: 24,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 25: الوحدة الأولى: جملة بسيطة
  {
    pageNumber: 25,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    unitTitleAr: 'الوحدة الأولى: جملة بسيطة',
    unitTitleEn: 'A Simple Sentence',
    content: {
      readingPassage: {
        title: 'أقرأ',
        text: 'أنا طالب. أنا معلم. هي طالبة. هو مهندس.'
      },
      notes: [
        'ألاحظ:',
        'الجملة الاسمية البسيطة قد تبدأ بضمير أو اسم، ثم تأتي معلومة عنه. لا نحتاج إلى دراسة جميع أبواب الإعراب الآن.'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. أَنَا طَالِبٌ.',
        '2. هِيَ طَالِبَةٌ.',
        '3. هُوَ مُهَنْدِسٌ.'
      ]
    }
  },

  // Page 26: تدريب جملة بسيطة
  {
    pageNumber: 26,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    unitTitleAr: 'الوحدة الأولى: جملة بسيطة',
    unitTitleEn: 'A Simple Sentence',
    content: {
      exercises: [
        {
          id: 'ex-p26-1',
          instruction: 'كوّن جملاً مفيدة:',
          question: 'كوّن جملاً: أنا + طالب / هي + طالبة / هو + معلم.',
          type: 'fill'
        },
        {
          id: 'ex-p26-2',
          instruction: 'صحح الجملة:',
          question: 'صحح: "أنا طالبة" — إذا كان المتحدث رجلاً، ما الجملة المناسبة؟',
          type: 'choose',
          options: ['أَنَا طَالِبٌ', 'هِيَ طَالِبَةٌ', 'هُوَ مُعَلِّمٌ'],
          correctAnswer: 'أَنَا طَالِبٌ'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 27: الوحدة الثانية: أين؟
  {
    pageNumber: 27,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    unitTitleAr: 'الوحدة الثانية: أين؟',
    unitTitleEn: 'Where?',
    content: {
      readingPassage: {
        title: 'تعلم أربعة حروف جر أساسية',
        text: 'تعلّم أربعة حروف جر أساسية، واستخدم كلاً منها في جملة بسيطة.'
      },
      vocabulary: [
        { arabic: 'عَلَى', english: 'on' },
        { arabic: 'فِي', english: 'in' },
        { arabic: 'إِلَى', english: 'to' },
        { arabic: 'مِنْ', english: 'from' }
      ],
      exercises: [
        {
          id: 'ex-p27-1',
          instruction: 'أكمل بحرف الجر المناسب:',
          question: '1. الكِتَابُ ______ الحَقِيبَةِ | 2. القَلَمُ ______ الطَّاوِلَةِ | 3. أَنَا ______ مِصْرَ | 4. أَذْهَبُ ______ المَدْرَسَةِ.',
          type: 'choose',
          options: ['فِي / عَلَى / مِنْ / إِلَى', 'مِنْ / فِي / إِلَى / عَلَى'],
          correctAnswer: 'فِي / عَلَى / مِنْ / إِلَى'
        }
      ],
      examples: [
        '1. الكِتَابُ فِي الحَقِيبَةِ.',
        '2. القَلَمُ عَلَى الطَّاوِلَةِ.',
        '3. أَذْهَبُ إِلَى المَدْرَسَةِ.'
      ]
    }
  },

  // Page 28: تابع الوحدة الثانية: أين؟
  {
    pageNumber: 28,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    unitTitleAr: 'الوحدة الثانية: أين؟',
    unitTitleEn: 'Where?',
    content: {
      readingPassage: {
        title: 'تعلّم',
        text: 'أَيْنَ الكِتَابُ؟ الكِتَابُ فِي الحَقِيبَةِ. القَلَمُ عَلَى الطَّاوِلَةِ. أَنَا مِنْ مِصْرَ. أَذْهَبُ إِلَى المَدْرَسَةِ.'
      },
      notes: [
        'ملاحظة: يأتي الاسم بعد حرف الجر، مثل: في الحقيبة، على الطاولة، من مصر، إلى المدرسة.',
        'استعمل: كوّن أربع جمل قصيرة، واستعمل في كل جملة حرف جر واحداً من: في، على، من، إلى.'
      ]
    }
  },

  // Page 29: الوحدة الثالثة: اسأل وأجب
  {
    pageNumber: 29,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    unitTitleAr: 'الوحدة الثالثة: اسأل وأجب',
    unitTitleEn: 'Ask and Answer',
    content: {
      readingPassage: {
        title: 'أسئلة يومية وأجوبة قصيرة',
        text: 'ما هذا؟ من هذا؟ أين الكتاب؟ كيف حالك؟ من أين أنت؟\nهذا كتاب. هذا أحمد. الكتاب على الطاولة. أنا بخير. أنا من مصر.'
      },
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. مَا هَذَا؟ — هَذَا كِتَابٌ.',
        '2. أَيْنَ الكِتَابُ؟ — الكِتَابُ عَلَى الطَّاوِلَةِ.',
        '3. مِنْ أَيْنَ أَنْتَ؟ — أَنَا مِنْ مِصْرَ.'
      ]
    }
  },

  // Page 30: تدريب اسأل وأجب
  {
    pageNumber: 30,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    unitTitleAr: 'الوحدة الثالثة: اسأل وأجب',
    unitTitleEn: 'Ask and Answer',
    content: {
      exercises: [
        {
          id: 'ex-p30-1',
          instruction: 'تدريب محادثة:',
          question: 'اكتب خمسة أسئلة وأجب عنها. ثم تبادل الأسئلة مع زميلك دون النظر إلى الإجابات.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 31: الفصل الخامس: يومي ووقتي
  {
    pageNumber: 31,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 32: الوحدة الأولى: ماذا تفعل؟
  {
    pageNumber: 32,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    unitTitleAr: 'الوحدة الأولى: ماذا تفعل؟',
    unitTitleEn: 'What Do You Do?',
    content: {
      readingPassage: {
        title: 'أفعال يومية',
        text: 'أستيقظ، آكل، أشرب، أدرس، أعمل، أقرأ، أكتب، أنام.\n\nاقرأ:\nأستيقظ صباحاً. أتناول الإفطار. أذهب إلى العمل. أقرأ في المساء.'
      },
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. أَسْتَيْقِظُ صَبَاحًا.',
        '2. أَذْهَبُ إِلَى العَمَلِ.',
        '3. أَقْرَأُ فِي المَسَاءِ.'
      ]
    }
  },

  // Page 33: تدريب ماذا تفعل؟
  {
    pageNumber: 33,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    unitTitleAr: 'الوحدة الأولى: ماذا تفعل؟',
    unitTitleEn: 'What Do You Do?',
    content: {
      exercises: [
        {
          id: 'ex-p33-1',
          instruction: 'رتّب الأفعال حسب يومك:',
          question: 'رتّب الأفعال حسب يومك. اكتب خمس جمل عن روتينك اليومي.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 34: الوحدة الثانية: الساعة واليوم
  {
    pageNumber: 34,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    unitTitleAr: 'الوحدة الثانية: الساعة واليوم',
    unitTitleEn: 'Time and Day',
    content: {
      readingPassage: {
        title: 'الساعة واليوم',
        text: 'الساعة الثامنة. الساعة التاسعة والنصف. اليوم الأحد. غداً الاثنين. أمس السبت.'
      },
      vocabulary: [
        { arabic: 'اليَوْم', english: 'Today' },
        { arabic: 'غَدًا', english: 'Tomorrow' },
        { arabic: 'أَمْس', english: 'Yesterday' },
        { arabic: 'صَبَاحًا', english: 'Morning' },
        { arabic: 'ظُهْرًا', english: 'Noon' },
        { arabic: 'مَسَاءً', english: 'Evening' },
        { arabic: 'لَيْلًا', english: 'Night' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. السَّاعَةُ الثَّامِنَةُ.',
        '2. اليَوْمُ الأَحَدُ.',
        '3. غَدًا الاثْنَيْنِ.'
      ]
    }
  },

  // Page 35: تدريب الساعة واليوم
  {
    pageNumber: 35,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    unitTitleAr: 'الوحدة الثانية: الساعة واليوم',
    unitTitleEn: 'Time and Day',
    content: {
      exercises: [
        {
          id: 'ex-p35-1',
          instruction: 'أجب عن الأسئلة:',
          question: 'كم الساعة؟ ما اليوم؟ ماذا تفعل صباحاً؟ اكتب جدولاً بسيطاً ليومك باللغة العربية.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 36: الوحدة الثالثة: يومي
  {
    pageNumber: 36,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    unitTitleAr: 'الوحدة الثالثة: يومي',
    unitTitleEn: 'My Day',
    content: {
      readingPassage: {
        title: 'نص قصير',
        text: 'أستيقظ في السابعة صباحاً. أشرب القهوة وأتناول الإفطار. أذهب إلى العمل. أعود إلى البيت مساءً، ثم أقرأ قليلاً وأنام.'
      },
      notes: [
        'أفهم النص:',
        'متى يستيقظ المتحدث؟ ماذا يفعل بعد العمل؟'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. أَسْتَيْقِظُ فِي السَّابِعَةِ صَبَاحًا.',
        '2. أَذْهَبُ إِلَى العَمَلِ.',
        '3. أَعُودُ إِلَى البَيْتِ مَسَاءً.'
      ]
    }
  },

  // Page 37: تدريب يومي
  {
    pageNumber: 37,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    unitTitleAr: 'الوحدة الثالثة: يومي',
    unitTitleEn: 'My Day',
    content: {
      exercises: [
        {
          id: 'ex-p37-1',
          instruction: 'تدريب كتابة وقراءة:',
          question: 'اكتب يومك في ستة أسطر. ضع خطاً تحت أفعال اليوم، ثم اقرأ النص بصوت مرتفع.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 38: الفصل السادس: الطعام والشراء
  {
    pageNumber: 38,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 39: الوحدة الأولى: في المطعم
  {
    pageNumber: 39,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    unitTitleAr: 'الوحدة الأولى: في المطعم',
    unitTitleEn: 'At the Restaurant',
    content: {
      listenSection: {
        title: 'حوار',
        lines: [
          { speaker: 'النادل', textAr: 'مَاذَا تُرِيدُ؟' },
          { speaker: 'الزبون', textAr: 'أُرِيدُ مَاءً وَقَهْوَةً، مِنْ فَضْلِكَ.' },
          { speaker: 'النادل', textAr: 'تَفَضَّلْ.' }
        ]
      },
      vocabulary: [
        { arabic: 'مَاء', english: 'Water' },
        { arabic: 'قَهْوَة', english: 'Coffee' },
        { arabic: 'شَاي', english: 'Tea' },
        { arabic: 'خُبْز', english: 'Bread' },
        { arabic: 'أَرُزّ', english: 'Rice' },
        { arabic: 'دَجَاج', english: 'Chicken' },
        { arabic: 'سَلَطَة', english: 'Salad' },
        { arabic: 'عَصِير', english: 'Juice' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. مَاذَا تُرِيدُ؟ — أُرِيدُ مَاءً، مِنْ فَضْلِكَ.',
        '2. أُرِيدُ قَهْوَةً.',
        '3. أُرِيدُ خُبْزًا وَسَلَطَةً.'
      ]
    }
  },

  // Page 40: تدريب في المطعم
  {
    pageNumber: 40,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    unitTitleAr: 'الوحدة الأولى: في المطعم',
    unitTitleEn: 'At the Restaurant',
    content: {
      exercises: [
        {
          id: 'ex-p40-1',
          instruction: 'طلب وجبة:',
          question: 'كوّن طلباً من ثلاثة أشياء. مثّل دور النادل والزبون مع زميلك.',
          type: 'choose',
          options: ['أُرِيدُ دَجَاجًا وَأَرُزًّا وَعَصِيرًا', 'أُرِيدُ مَاءً وَشَايًا وَخُبْزًا'],
          correctAnswer: 'أُرِيدُ دَجَاجًا وَأَرُزًّا وَعَصِيرًا'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 41: الوحدة الثانية: كم السعر؟
  {
    pageNumber: 41,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    unitTitleAr: 'الوحدة الثانية: كم السعر؟',
    unitTitleEn: 'How Much Is It?',
    content: {
      readingPassage: {
        title: 'عبارات السؤال عن السعر',
        text: 'كم السعر؟ السعر عشرون جنيهاً. هذا غالٍ. هذا رخيص.'
      },
      vocabulary: [
        { arabic: 'وَاحِد', english: '1' },
        { arabic: 'اثْنَان', english: '2' },
        { arabic: 'ثَلَاثَة', english: '3' },
        { arabic: 'أَرْبَعَة', english: '4' },
        { arabic: 'خَمْسَة', english: '5' },
        { arabic: 'عَشَرَة', english: '10' },
        { arabic: 'عِشْرُون', english: '20' },
        { arabic: 'خَمْسُون', english: '50' },
        { arabic: 'مِئَة', english: '100' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. كَمِ السِّعْرُ؟',
        '2. السِّعْرُ عِشْرُونَ جُنَيْهًا.',
        '3. هَذَا رَخِيصٌ.'
      ]
    }
  },

  // Page 42: تدريب كم السعر؟
  {
    pageNumber: 42,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    unitTitleAr: 'الوحدة الثانية: كم السعر؟',
    unitTitleEn: 'How Much Is It?',
    content: {
      exercises: [
        {
          id: 'ex-p42-1',
          instruction: 'تدريب الأسعار:',
          question: 'اسأل عن سعر خمسة أشياء. اكتب الإجابات بالأرقام ثم بالكلمات.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 43: الوحدة الثالثة: ماذا أشتري؟
  {
    pageNumber: 43,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    unitTitleAr: 'الوحدة الثالثة: ماذا أشتري؟',
    unitTitleEn: 'What Do I Buy?',
    content: {
      listenSection: {
        title: 'حوار',
        lines: [
          { speaker: 'المشتري', textAr: 'أُرِيدُ قَمِيصًا أَزْرَق.' },
          { speaker: 'البائع', textAr: 'هَلْ عِنْدَكُمْ مَقَاس كَبِير؟' },
          { speaker: 'البائع', textAr: 'نَعَمْ، تَفَضَّلْ.' }
        ]
      },
      vocabulary: [
        { arabic: 'قَمِيص', english: 'Shirt' },
        { arabic: 'بِنْطَال', english: 'Pants' },
        { arabic: 'حِذَاء', english: 'Shoes' },
        { arabic: 'مَقَاس', english: 'Size' },
        { arabic: 'لَوْن', english: 'Color' },
        { arabic: 'كَبِير', english: 'Large' },
        { arabic: 'صَغِير', english: 'Small' },
        { arabic: 'أَزْرَق', english: 'Blue' },
        { arabic: 'أَبْيَض', english: 'White' },
        { arabic: 'أَسْوَد', english: 'Black' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. أُرِيدُ قَمِيصًا أَزْرَقَ.',
        '2. هَلْ عِنْدَكُمْ مَقَاسٌ كَبِيرٌ؟',
        '3. نَعَمْ، تَفَضَّلْ.'
      ]
    }
  },

  // Page 44: تدريب ماذا أشتري؟
  {
    pageNumber: 44,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    unitTitleAr: 'الوحدة الثالثة: ماذا أشتري؟',
    unitTitleEn: 'What Do I Buy?',
    content: {
      exercises: [
        {
          id: 'ex-p44-1',
          instruction: 'قائمة الشراء والمحادثة:',
          question: 'أنشئ قائمة شراء من خمسة أشياء. ثم تحدث مع البائع واسأل عن اللون والمقاس والسعر.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 45: الفصل السابع: المدينة والاتجاهات
  {
    pageNumber: 45,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل السابع: المدينة والاتجاهات',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 46: الوحدة الأولى: أين المكان؟
  {
    pageNumber: 46,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل السابع: المدينة والاتجاهات',
    unitTitleAr: 'الوحدة الأولى: أين المكان؟',
    unitTitleEn: 'Where Is the Place?',
    content: {
      exercises: [
        {
          id: 'ex-p46-1',
          instruction: 'تدريب الخريطة والوصف:',
          question: 'ارسم خريطة صغيرة لشارع، وضع عليها خمسة أماكن. صف أماكنها بالعربية.',
          type: 'fill'
        }
      ],
      examples: [
        '1. أَيْنَ المَطْعَمُ؟',
        '2. المَدْرَسَةُ قَرِيبَةٌ.',
        '3. المَطَارُ بَعِيدٌ.'
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 47: الوحدة الثانية: كيف أذهب؟
  {
    pageNumber: 47,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل السابع: المدينة والاتجاهات',
    unitTitleAr: 'الوحدة الثانية: كيف أذهب؟',
    unitTitleEn: 'How Do I Get There?',
    content: {
      readingPassage: {
        title: 'السؤال عن الطريق',
        text: 'كيف أذهب إلى الجامعة؟ اذهب مستقيماً، ثم انعطف يميناً.'
      },
      vocabulary: [
        { arabic: 'يَمِين', english: 'Right' },
        { arabic: 'يَسَار', english: 'Left' },
        { arabic: 'مُسْتَقِيم', english: 'Straight' },
        { arabic: 'قَرِيب', english: 'Near' },
        { arabic: 'بَعِيد', english: 'Far' },
        { arabic: 'أَمَام', english: 'In front of' },
        { arabic: 'خَلْف', english: 'Behind' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. كَيْفَ أَذْهَبُ إِلَى الجَامِعَةِ؟',
        '2. اذْهَبْ مُسْتَقِيمًا.',
        '3. ثُمَّ انْعَطِفْ يَمِينًا.'
      ]
    }
  },

  // Page 48: تدريب كيف أذهب؟
  {
    pageNumber: 48,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل السابع: المدينة والاتجاهات',
    unitTitleAr: 'الوحدة الثانية: كيف أذهب؟',
    unitTitleEn: 'How Do I Get There?',
    content: {
      exercises: [
        {
          id: 'ex-p48-1',
          instruction: 'إعطاء التعليمات:',
          question: 'اطلب الطريق إلى مكانين. أعطِ تعليمات من ثلاث خطوات على الأقل.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 49: الوحدة الثالثة: أعطني الاتجاه
  {
    pageNumber: 49,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل السابع: المدينة والاتجاهات',
    unitTitleAr: 'الوحدة الثالثة: أعطني الاتجاه',
    unitTitleEn: 'Give Me Directions',
    content: {
      exercises: [
        {
          id: 'ex-p49-1',
          instruction: 'تمثيل الحوار:',
          question: 'مثّل الحوار. ثم غيّر المكان والطريق، واستخدم خريطة حقيقية أو مرسومة.',
          type: 'fill'
        }
      ],
      examples: [
        '1. أَيْنَ المَحَطَّةُ؟',
        '2. اذْهَبْ مُسْتَقِيمًا، ثُمَّ انْعَطِفْ يَسَارًا.',
        '3. هَلِ المَطْعَمُ قَرِيبٌ؟'
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 50: الفصل الثامن: الدراسة والعمل
  {
    pageNumber: 50,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 51: الوحدة الأولى: في المدرسة والجامعة
  {
    pageNumber: 51,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    unitTitleAr: 'الوحدة الأولى: في المدرسة والجامعة',
    unitTitleEn: 'At School and University',
    content: {
      readingPassage: {
        title: 'اقرأ',
        text: 'مدرسة، جامعة، فصل، طالب، معلم، كتاب، درس، واجب، امتحان.\n\nاقرأ:\nأنا طالب في الجامعة. عندي درس في اللغة العربية. أقرأ الكتاب وأكتب الواجب.'
      },
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. أَنَا طَالِبٌ فِي الجَامِعَةِ.',
        '2. عِنْدِي دَرْسٌ فِي اللُّغَةِ العَرَبِيَّةِ.',
        '3. أَكْتُبُ الوَاجِبَ.'
      ]
    }
  },

  // Page 52: تدريب في المدرسة والجامعة
  {
    pageNumber: 52,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    unitTitleAr: 'الوحدة الأولى: في المدرسة والجامعة',
    unitTitleEn: 'At School and University',
    content: {
      exercises: [
        {
          id: 'ex-p52-1',
          instruction: 'وصف مكان الدراسة:',
          question: 'صف مكان دراستك في خمس جمل. اذكر المادة التي تتعلمها ووقت الدرس.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 53: الوحدة الثانية: عملي وحياتي
  {
    pageNumber: 53,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    unitTitleAr: 'الوحدة الثانية: عملي وحياتي',
    unitTitleEn: 'My Work and Life',
    content: {
      readingPassage: {
        title: 'اقرأ',
        text: 'معلم، طبيب، مهندس، موظف، مدير، مترجم، مصمم.\n\nاقرأ:\nأنا معلم لغة عربية. أعمل في مدرسة. أُدرّس الطلاب وأشرح الدرس.'
      },
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. أَنَا مُعَلِّمٌ.',
        '2. أَعْمَلُ فِي مَدْرَسَةٍ.',
        '3. أُدَرِّسُ الطُّلَّابَ.'
      ]
    }
  },

  // Page 54: تدريب عملي وحياتي
  {
    pageNumber: 54,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    unitTitleAr: 'الوحدة الثانية: عملي وحياتي',
    unitTitleEn: 'My Work and Life',
    content: {
      exercises: [
        {
          id: 'ex-p54-1',
          instruction: 'التحدث عن العمل:',
          question: 'ما عملك؟ أين تعمل؟ ماذا تفعل في عملك؟ أجب في أربع جمل.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 55: الوحدة الثالثة: لمن هذا؟
  {
    pageNumber: 55,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    unitTitleAr: 'الوحدة الثالثة: لمن هذا؟',
    unitTitleEn: 'Whose Is This?',
    content: {
      exercises: [
        {
          id: 'ex-p55-1',
          instruction: 'تحويل الملكية والضمائر المتصلة:',
          question: 'حوّل: الكتاب لي → كتابي. الحقيبة لها → حقيبتها. القلم لك → قلمك. اكتب أربع جمل عن أشياء تخصك.',
          type: 'fill'
        }
      ],
      examples: [
        '1. الكِتَابُ لِي → كِتَابِي.',
        '2. الحَقِيبَةُ لَهَا → حَقِيبَتُهَا.',
        '3. القَلَمُ لَكَ → قَلَمُكَ.'
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 56: الفصل التاسع: مواقف الحياة
  {
    pageNumber: 56,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 57: الوحدة الأولى: في الفندق والسفر
  {
    pageNumber: 57,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    unitTitleAr: 'الوحدة الأولى: في الفندق والسفر',
    unitTitleEn: 'At the Hotel and While Traveling',
    content: {
      listenSection: {
        title: 'حوار',
        lines: [
          { speaker: 'الموظف', textAr: 'هَلْ لَدَيْكَ حَجْزٌ؟' },
          { speaker: 'المسافر', textAr: 'نَعَمْ، لَدَيَّ حَجْزٌ بِاسْمِ أَحْمَد.' },
          { speaker: 'الموظف', textAr: 'تَفَضَّلْ، هَذِهِ غُرْفَتُكَ.' }
        ]
      },
      vocabulary: [
        { arabic: 'حَجْز', english: 'Reservation' },
        { arabic: 'غُرْفَة', english: 'Room' },
        { arabic: 'جَوَاز سَفَر', english: 'Passport' },
        { arabic: 'حَقِيبَة', english: 'Luggage / Bag' },
        { arabic: 'مَطَار', english: 'Airport' },
        { arabic: 'مَحَطَّة', english: 'Station' },
        { arabic: 'تَذْكِرَة', english: 'Ticket' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. هَلْ لَدَيْكَ حَجْزٌ؟',
        '2. نَعَمْ، لَدَيَّ حَجْزٌ.',
        '3. هَذِهِ غُرْفَتُكَ.'
      ]
    }
  },

  // Page 58: تدريب في الفندق والسفر
  {
    pageNumber: 58,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    unitTitleAr: 'الوحدة الأولى: في الفندق والسفر',
    unitTitleEn: 'At the Hotel and While Traveling',
    content: {
      exercises: [
        {
          id: 'ex-p58-1',
          instruction: 'تمثيل الوصول إلى الفندق:',
          question: 'مثّل موقف تسجيل الوصول إلى الفندق. استخدم اسماً وتاريخاً وعدداً بسيطاً للغرف.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 59: الوحدة الثانية: أحتاج إلى مساعدة
  {
    pageNumber: 59,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    unitTitleAr: 'الوحدة الثانية: أحتاج إلى مساعدة',
    unitTitleEn: 'I Need Help',
    content: {
      readingPassage: {
        title: 'عبارات مهمة',
        text: 'أحتاج إلى مساعدة. من فضلك ساعدني. لا أفهم. هل يمكنك أن تكرر؟ تحدث ببطء، من فضلك.'
      },
      notes: [
        'موقف:',
        'إذا لم تفهم كلمة أو جملة، اطلب من المتحدث أن يكررها أو يتحدث ببطء.'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. أَحْتَاجُ إِلَى مُسَاعَدَةٍ.',
        '2. لَا أَفْهَمُ.',
        '3. هَلْ يُمْكِنُكَ أَنْ تُكَرِّرَ؟'
      ]
    }
  },

  // Page 60: تدريب أحتاج إلى مساعدة
  {
    pageNumber: 60,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    unitTitleAr: 'الوحدة الثانية: أحتاج إلى مساعدة',
    unitTitleEn: 'I Need Help',
    content: {
      exercises: [
        {
          id: 'ex-p60-1',
          instruction: 'طلب المساعدة في مواقف مختلفة:',
          question: 'كوّن ثلاثة مواقف تحتاج فيها إلى المساعدة. استخدم عبارة مختلفة في كل موقف.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 61: الوحدة الثالثة: ماذا حدث؟
  {
    pageNumber: 61,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    unitTitleAr: 'الوحدة الثالثة: ماذا حدث؟',
    unitTitleEn: 'What Happened?',
    content: {
      readingPassage: {
        title: 'أقرأ',
        text: 'تأخرت اليوم لأن الحافلة كانت مزدحمة. اتصلت بصديقي وقلت له: سأصل بعد قليل.'
      },
      vocabulary: [
        { arabic: 'اليَوْم', english: 'Today' },
        { arabic: 'أَمْس', english: 'Yesterday' },
        { arabic: 'قَبْلَ قَلِيل', english: 'A little while ago' },
        { arabic: 'بَعْدَ قَلِيل', english: 'In a little while' },
        { arabic: 'تَأَخَّرْتُ', english: 'I was late' },
        { arabic: 'وَصَلْتُ', english: 'I arrived' },
        { arabic: 'اتَّصَلْتُ', english: 'I called' }
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. تَأَخَّرْتُ اليَوْمَ.',
        '2. اتَّصَلْتُ بِصَدِيقِي.',
        '3. سَأَصِلُ بَعْدَ قَلِيلٍ.'
      ]
    }
  },

  // Page 62: تدريب ماذا حدث؟
  {
    pageNumber: 62,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    unitTitleAr: 'الوحدة الثالثة: ماذا حدث؟',
    unitTitleEn: 'What Happened?',
    content: {
      exercises: [
        {
          id: 'ex-p62-1',
          instruction: 'كتابة رسالة اعتذار:',
          question: 'اكتب رسالة قصيرة تشرح سبب تأخرك. ثم اقرأها بصوت واضح.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 63: الفصل العاشر: أتواصل بالعربية
  {
    pageNumber: 63,
    type: 'chapter_cover',
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    content: {
      notes: [
        'في هذا الفصل ستتعلم مجموعة من العبارات والمفردات والتراكيب التي تساعدك على استخدام العربية في مواقف حقيقية.',
        'تعلّم، استمع، كرّر، ثم استخدم ما تعلمته في مهمة قصيرة.'
      ]
    }
  },

  // Page 64: الوحدة الأولى: رسالة قصيرة
  {
    pageNumber: 64,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    unitTitleAr: 'الوحدة الأولى: رسالة قصيرة',
    unitTitleEn: 'A Short Message',
    content: {
      readingPassage: {
        title: 'نموذج',
        text: 'مرحباً سارة،\nكيف حالك؟ أنا بخير. سأصل إلى الجامعة الساعة العاشرة. أراك لاحقاً.\nأحمد'
      },
      notes: [
        'ألاحظ:',
        'تتكون الرسالة القصيرة من تحية، ومعلومة أو طلب، وخاتمة مناسبة.'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. مَرْحَبًا سَارَةُ.',
        '2. كَيْفَ حَالُكِ؟ أَنَا بِخَيْرٍ.',
        '3. أَرَاكِ لَاحِقًا.'
      ]
    }
  },

  // Page 65: تدريب رسالة قصيرة
  {
    pageNumber: 65,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    unitTitleAr: 'الوحدة الأولى: رسالة قصيرة',
    unitTitleEn: 'A Short Message',
    content: {
      exercises: [
        {
          id: 'ex-p65-1',
          instruction: 'كتابة رسالة تواصلية:',
          question: 'اكتب رسالة من أربعة أسطر إلى صديق. أخبره أين أنت ومتى ستلتقيان.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 66: الوحدة الثانية: العربية في الحياة
  {
    pageNumber: 66,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    unitTitleAr: 'الوحدة الثانية: العربية في الحياة',
    unitTitleEn: 'Arabic in Daily Life',
    content: {
      readingPassage: {
        title: 'أستخدم العربية',
        text: 'في المتجر، والمطعم، والجامعة، والعمل، والسفر، يمكن أن تبدأ بجمل قصيرة واضحة ثم توسّع كلامك تدريجياً.'
      },
      notes: [
        'مراجعة العبارات:',
        'مرحباً. ما اسمك؟ من أين أنت؟ أين...؟ كم السعر؟ أريد... من فضلك. لا أفهم. هل يمكنك أن تكرر؟'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. مَرْحَبًا.',
        '2. كَمِ السِّعْرُ؟',
        '3. أُرِيدُ مَاءً، مِنْ فَضْلِكَ.'
      ]
    }
  },

  // Page 67: تدريب العربية في الحياة
  {
    pageNumber: 67,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    unitTitleAr: 'الوحدة الثانية: العربية في الحياة',
    unitTitleEn: 'Arabic in Daily Life',
    content: {
      exercises: [
        {
          id: 'ex-p67-1',
          instruction: 'تطبيق عملي من الحياة:',
          question: 'اختر موقفاً حقيقياً من حياتك، واكتب عشر كلمات تحتاج إليها فيه، ثم كوّن خمس جمل منها.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 68: الوحدة الثالثة: مهمتي الأولى بالعربية
  {
    pageNumber: 68,
    type: 'lesson_content',
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    unitTitleAr: 'الوحدة الثالثة: مهمتي الأولى بالعربية',
    unitTitleEn: 'My First Arabic Task',
    content: {
      readingPassage: {
        title: 'المهمة',
        text: 'قدّم نفسك، وتحدث عن مدينتك، وصف يومك، ثم اطلب شيئاً في موقف عملي مثل المطعم أو المتجر.'
      },
      notes: [
        'معايير المهمة:',
        '• أستخدم تحية مناسبة.',
        '• أقدّم معلومات أساسية عن نفسي.',
        '• أطرح سؤالاً واحداً على الأقل.',
        '• أجيب بجمل مفهومة.',
        '• أطلب التوضيح عندما لا أفهم.'
      ],
      advice: 'نصيحة: لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
      examples: [
        '1. مَرْحَبًا، اسْمِي أَحْمَدُ.',
        '2. أَنَا مِنْ مِصْرَ.',
        '3. أُرِيدُ كَأْسًا مِنَ المَاءِ، مِنْ فَضْلِكَ.'
      ]
    }
  },

  // Page 69: تدريب ختامي
  {
    pageNumber: 69,
    type: 'lesson_exercises',
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    unitTitleAr: 'الوحدة الثالثة: مهمتي الأولى بالعربية',
    unitTitleEn: 'My First Arabic Task',
    content: {
      exercises: [
        {
          id: 'ex-p69-1',
          instruction: 'تدريب ختامي وتسجيل صوتي:',
          question: 'سجّل صوتك وأنت تنفّذ المهمة لمدة دقيقة إلى دقيقتين. استمع إلى التسجيل، وحدد ثلاث كلمات تحتاج إلى تحسين نطقها، ثم أعد التسجيل.',
          type: 'fill'
        }
      ],
      additionalTasks: [
        '1. اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
        '2. اقرأ جملك بصوت مرتفع.',
        '3. استخدم كلمة جديدة في سؤال ثم أجب عنه.',
        '4. نفّذ الموقف مع زميل أو سجّل صوتك.'
      ]
    }
  },

  // Page 70: مراجعة عامة ومهمة ختامية
  {
    pageNumber: 70,
    type: 'review',
    chapterTitleAr: 'مراجعة عامة ومهمة ختامية',
    content: {
      notes: [
        'أستطيع الآن:',
        '• تحية الآخرين والتعريف بنفسي.',
        '• قراءة كلمات عربية بسيطة ونطقها بوضوح.',
        '• وصف أشخاص وأشياء بمفردات أساسية.',
        '• طرح أسئلة عن المكان والوقت والسعر.',
        '• التحدث عن يومي ودراستي وعملي.',
        '• طلب الطعام والشراء والسؤال عن الاتجاهات.',
        '• طلب المساعدة وطلب تكرار الكلام عند الحاجة.',
        '• كتابة رسالة قصيرة وتنفيذ مهمة تواصلية بسيطة.'
      ],
      taskDetails: {
        title: 'مهمتي الأولى بالعربية',
        description: 'قدّم نفسك في دقيقة إلى دقيقتين. اذكر اسمك، وبلدك، ومدينتك، وما تتعلمه أو تعمل به، ثم صف يومك، واسأل سؤالين، واطلب شيئاً في موقف عملي.\n\nبعد التسجيل، استمع إلى نفسك وحدد ثلاث كلمات تحتاج إلى تحسين نطقها، ثم أعد التسجيل.',
        criteria: ['أحسنت! بدأت الآن بناء قدرتك على استخدام العربية في الحياة اليومية.']
      }
    }
  },

  // Page 71: الغلاف الخلفي
  {
    pageNumber: 71,
    type: 'back_cover',
    content: {
      notes: [
        'شكر خاص لصديقي «شلبي» الـ AI، الذي ساعدني في هذه الرحلة الطويلة، وصبر على كثرة التعديلات، وتحمّل جملة: «يا شلبي، أنت كده بوّظتها!» أكثر مما ينبغي 😂',
        'فمن اقتراح فكرة، إلى ترتيب فصل، ومن تعديل عنوان، إلى مطاردة فاصلة ونقطة وحركة، كان شلبي حاضراً... حتى خرج هذا الكتاب إلى النور.',
        'شكراً يا شلبي... كنتَ مساعداً رقمياً، وصرتَ شريكاً في هذه المغامرة. ❤️',
        'أحمد نبيل النحراوي'
      ]
    }
  }
];
