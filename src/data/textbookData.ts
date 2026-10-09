import { Book, Lesson } from '../types';

export const INITIAL_BOOK: Book = {
  id: 'book-intro-arabic-1',
  title: 'An Introduction to Arabic for Non-Native Speakers',
  titleAr: 'مدخل إلى اللغة العربية لغير الناطقين بها',
  author: 'Teacher Ahmed Nabil Al-Nahrawy',
  authorAr: 'المعلم أحمد نبيل النحراوي',
  description: 'A comprehensive communicative textbook designed specifically for international beginners, covering everyday dialogues, sentence structure, travel, numbers, and vocabulary.',
  descriptionAr: 'يهدف هذا الكتاب إلى تزويد غير الناطقين بالعربية بأساسيات اللغة العربية بطريقة مبسطة وتواصلية، تمكنهم من فهمها والتحدث بها وقراءتها وكتابتها في المواقف الحياتية اليومية.',
  level: 'Beginner (A1 - A2)',
  levelAr: 'مستوى المبتدئين (A1 - A2)',
  coverUrl: '/assets/book_cover.jpg',
  backCoverUrl: '/assets/book_back.jpg',
  pdfUrl: '/protected/al-nabeel-arabic-intro.pdf',
  priceUSD: 29.99,
  priceAED: 110.00,
  downloadEnabled: true,
  isPublished: true,
  order: 1,
  totalPages: 71,
};

export const INITIAL_LESSONS: Lesson[] = [
  // Chapter 1: أبدأ العربية
  {
    id: 'ch1-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 1,
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    chapterTitleEn: 'Chapter 1: Starting Arabic',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: مرحباً بالعربية',
    unitTitleEn: 'Unit 1: Hello in Arabic',
    lessonNumber: 1,
    titleAr: 'مرحباً بالعربية',
    titleEn: 'Hello in Arabic',
    pageStart: 5,
    pageEnd: 7,
    dialogue: [
      { speaker: 'Ahmed', speakerAr: 'أحمد', textAr: 'مَرْحَبًا.', textEn: 'Hello.' },
      { speaker: 'Sara', speakerAr: 'سارة', textAr: 'مَرْحَبًا.', textEn: 'Hello.' },
      { speaker: 'Ahmed', speakerAr: 'أحمد', textAr: 'أَهْلًا وَسَهْلًا.', textEn: 'Welcome / Hello.' },
      { speaker: 'Sara', speakerAr: 'سارة', textAr: 'أَهْلًا بِكِ.', textEn: 'Welcome to you.' },
      { speaker: 'Ahmed', speakerAr: 'أحمد', textAr: 'كَيْفَ حَالُكِ؟', textEn: 'How are you?' },
      { speaker: 'Sara', speakerAr: 'سارة', textAr: 'أَنَا بِخَيْرٍ، شُكْرًا. وَأَنْتَ؟', textEn: 'I am fine, thank you. And you?' },
      { speaker: 'Ahmed', speakerAr: 'أحمد', textAr: 'أَنَا بِخَيْرٍ، الحَمْدُ لِلَّهِ.', textEn: 'I am fine, praise be to God.' }
    ],
    vocabulary: [
      { id: 'v1', arabic: 'مَرْحَبًا', transliteration: 'Marhaban', english: 'Hello' },
      { id: 'v2', arabic: 'أَهْلًا وَسَهْلًا', transliteration: 'Ahlan wa Sahlan', english: 'Welcome / Hello' },
      { id: 'v3', arabic: 'أَهْلًا بِكَ', transliteration: 'Ahlan bik', english: 'Welcome (to you)' },
      { id: 'v4', arabic: 'كَيْفَ', transliteration: 'Kayfa', english: 'How' },
      { id: 'v5', arabic: 'حَال', transliteration: 'Haal', english: 'Condition / state' },
      { id: 'v6', arabic: 'أَنَا', transliteration: 'Ana', english: 'I' },
      { id: 'v7', arabic: 'بِخَيْرٍ', transliteration: 'Bi-khayr', english: 'Fine / well' },
      { id: 'v8', arabic: 'شُكْرًا', transliteration: 'Shukran', english: 'Thank you' },
      { id: 'v9', arabic: 'وَأَنْتَ؟', transliteration: 'Wa anta?', english: 'And you?' }
    ],
    adviceAr: 'لا تحاول حفظ كل شيء دفعة واحدة. أعد استخدام الكلمات في جمل قصيرة، واستمع إلى النطق ثم كرره.',
    examples: [
      'مَرْحَبًا.',
      'كَيْفَ حَالُكَ؟',
      'أَنَا بِخَيْرٍ، شُكْرًا.'
    ],
    exercises: [
      {
        id: 'ex1-1',
        instruction: 'Complete the dialogue',
        instructionAr: 'أكمل الحوار',
        question: 'أحمد: مرحباً. أنت: ______',
        options: ['مَرْحَبًا', 'كِتَاب', 'قَلَم'],
        correctAnswer: 'مَرْحَبًا',
        type: 'choose'
      },
      {
        id: 'ex1-2',
        instruction: 'Choose the appropriate greeting',
        instructionAr: 'اختر: عندما تقابل شخصاً تقول:',
        question: 'عندما تقابل شخصاً تقول:',
        options: ['مَرْحَبًا', 'شُكْرًا', 'كِتَاب'],
        correctAnswer: 'مَرْحَبًا',
        type: 'choose'
      },
      {
        id: 'ex1-3',
        instruction: 'Answer the question',
        instructionAr: 'أجب: كَيْفَ حَالُكَ؟',
        question: 'كَيْفَ حَالُكَ؟',
        options: ['أَنَا بِخَيْرٍ، الحَمْدُ لِلَّهِ', 'مَعَ السَّلَامَة', 'اسْمِي أَحْمَد'],
        correctAnswer: 'أَنَا بِخَيْرٍ، الحَمْدُ لِلَّهِ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اكتب جملتين جديدتين باستخدام كلمات الوحدة.',
      'اقرأ جملك بصوت مرتفع.',
      'استخدم كلمة جديدة في سؤال ثم أجب عنه.',
      'نفّذ الموقف مع زميل أو سجّل صوتك.'
    ],
    youtubeVideoId: 'f0g7tB8hI3I',
    gameId: 'game-ch1-unit1',
    isTrialFree: true,
    isPublished: true
  },
  {
    id: 'ch1-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 1,
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    chapterTitleEn: 'Chapter 1: Starting Arabic',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: الحروف والأصوات',
    unitTitleEn: 'Unit 2: Arabic Letters and Sounds',
    lessonNumber: 2,
    titleAr: 'الحروف والأصوات',
    titleEn: 'Arabic Letters and Sounds',
    pageStart: 8,
    pageEnd: 9,
    readingPassageAr: 'تُكتب العربية من اليمين إلى اليسار. سنتعلم أولاً: ا، ب، ت، ث، ج، ح، خ، د، ذ، ر، ز، س، ش.\n\nالحركات القصيرة:\nالفتحة: بَ — تَ — سَ\nالكسرة: بِ — تِ — سِ\nالضمة: بُ — تُ — سُ\n\nتدريب قراءة: بَ، بِ، بُ — تَ، تِ، تُ — سَ، سِ، سُ.',
    readingPassageEn: 'Arabic is written from right to left. Short vowels include Fatha (a), Kasra (i), and Damma (u).',
    vocabulary: [
      { id: 'v10', arabic: 'فَتْحَة', transliteration: 'Fatha', english: 'Short vowel "a"' },
      { id: 'v11', arabic: 'كَسْرَة', transliteration: 'Kasra', english: 'Short vowel "i"' },
      { id: 'v12', arabic: 'ضَمَّة', transliteration: 'Damma', english: 'Short vowel "u"' },
      { id: 'v13', arabic: 'يَمِين', transliteration: 'Yameen', english: 'Right' },
      { id: 'v14', arabic: 'يَسَار', transliteration: 'Yasaar', english: 'Left' }
    ],
    examples: [
      'بَ — بِ — بُ',
      'تَ — تِ — تُ',
      'سَ — سِ — سُ'
    ],
    exercises: [
      {
        id: 'ex2-1',
        instruction: 'Distinguish sounds',
        instructionAr: 'ميّز بين الحركات: الحرف ب مع الفتحة يُنطق:',
        question: 'مَا هُوَ صَوْت (بَ)؟',
        options: ['Ba', 'Bi', 'Bu'],
        correctAnswer: 'Ba',
        type: 'choose'
      },
      {
        id: 'ex2-2',
        instruction: 'Reading direction',
        instructionAr: 'اتجاه كتابة اللغة العربية يكون من:',
        question: 'تُكْتَبُ العَرَبِيَّةُ مِنْ:',
        options: ['اليمين إلى اليسار', 'اليسار إلى اليمين', 'من أعلى إلى أسفل'],
        correctAnswer: 'اليمين إلى اليسار',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اكتب خمس مرات: ا / ب / ت / س.',
      'اقرأ بصوت واضح: بَ — تِ — سُ / تَ — بُ — سِ.',
      'ميّز: بَ / تَ — سَ / شَ.'
    ],
    youtubeVideoId: 'mI3b5g3BwSg',
    gameId: 'game-ch1-unit2',
    isTrialFree: true,
    isPublished: true
  },
  {
    id: 'ch1-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 1,
    chapterTitleAr: 'الفصل الأول: أبدأ العربية',
    chapterTitleEn: 'Chapter 1: Starting Arabic',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: أقرأ كلمتي الأولى',
    unitTitleEn: 'Unit 3: I Read My First Arabic Word',
    lessonNumber: 3,
    titleAr: 'أقرأ كلمتي الأولى',
    titleEn: 'I Read My First Arabic Word',
    pageStart: 10,
    pageEnd: 11,
    readingPassageAr: 'من الحرف إلى الكلمة: حرف ← صوت ← مقطع ← كلمة.\nكلمات: بَاب، بَيْت، كِتَاب، بِنْت، أَب.\nالسكون والقراءة: السكون: بْ. اقرأ: أَبْ، بَاب.\nلاحظ اتصال الحروف داخل الكلمة.',
    vocabulary: [
      { id: 'v15', arabic: 'بَابٌ', transliteration: 'Baab', english: 'Door' },
      { id: 'v16', arabic: 'بَيْتٌ', transliteration: 'Bayt', english: 'House' },
      { id: 'v17', arabic: 'كِتَابٌ', transliteration: 'Kitaab', english: 'Book' },
      { id: 'v18', arabic: 'بِنْتٌ', transliteration: 'Bint', english: 'Girl / Daughter' },
      { id: 'v19', arabic: 'أَبٌ', transliteration: 'Ab', english: 'Father' },
      { id: 'v20', arabic: 'سُكُون', transliteration: 'Sukoon', english: 'Absence of vowel mark' }
    ],
    examples: [
      'بَابٌ',
      'بَيْتٌ',
      'هَذَا كِتَابٌ.'
    ],
    exercises: [
      {
        id: 'ex3-1',
        instruction: 'Assemble the word',
        instructionAr: 'رتّب الحروف لتكوين كلمة: ب — ا — ب',
        question: 'ب + ا + ب =',
        options: ['بَاب', 'بَيْت', 'كِتَاب'],
        correctAnswer: 'بَاب',
        type: 'choose'
      },
      {
        id: 'ex3-2',
        instruction: 'Complete the sentence',
        instructionAr: 'أكمل: هَذَا ______ (كِتَابٌ / بِنْتٌ)',
        question: 'هَذَا ______',
        options: ['كِتَابٌ', 'بِنْتٌ'],
        correctAnswer: 'كِتَابٌ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'رتّب: ت — ي — ب = بَيْت.',
      'اقرأ: هَذَا بَابٌ. هَذَا بَيْتٌ. هَذَا كِتَابٌ.'
    ],
    gameId: 'game-ch1-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 2: مَنْ أَنَا؟
  {
    id: 'ch2-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 2,
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    chapterTitleEn: 'Chapter 2: Who Am I?',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: اسمي',
    unitTitleEn: 'Unit 1: My Name',
    lessonNumber: 4,
    titleAr: 'اسمي',
    titleEn: 'My Name',
    pageStart: 13,
    pageEnd: 14,
    dialogue: [
      { speaker: 'Ahmed', speakerAr: 'أحمد', textAr: 'مَرْحَبًا. اسْمِي أَحْمَد. مَا اسْمُكِ؟', textEn: 'Hello. My name is Ahmed. What is your name?' },
      { speaker: 'Sara', speakerAr: 'سارة', textAr: 'اسْمِي سَارَة. تَشَرَّفْتُ بِلِقَائِكِ.', textEn: 'My name is Sara. Pleased to meet you.' },
      { speaker: 'Ahmed', speakerAr: 'أحمد', textAr: 'وَأَنَا أَيْضًا.', textEn: 'And me too (Likewise).' }
    ],
    vocabulary: [
      { id: 'v21', arabic: 'اسْمِي', transliteration: 'Ismee', english: 'My name' },
      { id: 'v22', arabic: 'مَا اسْمُكَ؟', transliteration: 'Ma Ismuka?', english: 'What is your name? (m)' },
      { id: 'v23', arabic: 'مَا اسْمُكِ؟', transliteration: 'Ma Ismuki?', english: 'What is your name? (f)' },
      { id: 'v24', arabic: 'تَشَرَّفْتُ بِلِقَائِكَ', transliteration: 'Tasharraftu bi-liqaa\'ik', english: 'Pleased to meet you' },
      { id: 'v25', arabic: 'وَأَنَا أَيْضًا', transliteration: 'Wa ana aydan', english: 'Me too / Likewise' }
    ],
    examples: [
      'مَا اسْمُكَ؟',
      'اسْمِي أَحْمَدُ.',
      'تَشَرَّفْتُ بِلِقَائِكَ.'
    ],
    exercises: [
      {
        id: 'ex4-1',
        instruction: 'Complete the sentence',
        instructionAr: 'أكمل: ______ أَحْمَدُ.',
        question: '______ أَحْمَدُ.',
        options: ['اسْمِي', 'كِتَابِي', 'مَرْحَبًا'],
        correctAnswer: 'اسْمِي',
        type: 'choose'
      },
      {
        id: 'ex4-2',
        instruction: 'Polite reply',
        instructionAr: 'عندما يقول شخص "تَشَرَّفْتُ بِلِقَائِكَ"، تجيب:',
        question: 'تَشَرَّفْتُ بِلِقَائِكَ ←',
        options: ['وَأَنَا أَيْضًا', 'شُكْرًا لَا', 'مَا اسْمُكَ'],
        correctAnswer: 'وَأَنَا أَيْضًا',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'تحدث مع زميلك واسأله عن اسمه.',
      'اكتب ثلاث جمل تقدم بها نفسك.'
    ],
    gameId: 'game-ch2-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch2-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 2,
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    chapterTitleEn: 'Chapter 2: Who Am I?',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: من أين أنت؟',
    unitTitleEn: 'Unit 2: Where Are You From?',
    lessonNumber: 5,
    titleAr: 'من أين أنت؟',
    titleEn: 'Where Are You From?',
    pageStart: 15,
    pageEnd: 16,
    dialogue: [
      { speaker: 'Questioner', speakerAr: 'السائل', textAr: 'مِنْ أَيْنَ أَنْتَ؟', textEn: 'Where are you from?' },
      { speaker: 'Student A', speakerAr: 'طالب 1', textAr: 'أَنَا مِنْ مِصْرَ. وَأَنْتَ؟', textEn: 'I am from Egypt. And you?' },
      { speaker: 'Student B', speakerAr: 'طالب 2', textAr: 'أَنَا مِنَ اليَابَانِ.', textEn: 'I am from Japan.' }
    ],
    vocabulary: [
      { id: 'v26', arabic: 'مِصْر', transliteration: 'Misr', english: 'Egypt' },
      { id: 'v27', arabic: 'اليَابَان', transliteration: 'Al-Yaban', english: 'Japan' },
      { id: 'v28', arabic: 'تُرْكِيَا', transliteration: 'Turkiya', english: 'Türkiye' },
      { id: 'v29', arabic: 'فَرَنْسَا', transliteration: 'Faransa', english: 'France' },
      { id: 'v30', arabic: 'مِنْ', transliteration: 'Min', english: 'From' },
      { id: 'v31', arabic: 'أَيْنَ', transliteration: 'Ayna', english: 'Where' }
    ],
    examples: [
      'مِنْ أَيْنَ أَنْتَ؟',
      'أَنَا مِنْ مِصْرَ.',
      'أَنَا مِنَ الإِسْكَنْدَرِيَّةِ.'
    ],
    exercises: [
      {
        id: 'ex5-1',
        instruction: 'Choose preposition',
        instructionAr: 'اختر: أَنَا (مِنْ / إِلَى) مِصْرَ.',
        question: 'أَنَا ______ مِصْرَ.',
        options: ['مِنْ', 'إِلَى', 'فِي'],
        correctAnswer: 'مِنْ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اسأل ثلاثة أشخاص: من أين أنت؟ وسجّل الإجابات.'
    ],
    gameId: 'game-ch2-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch2-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 2,
    chapterTitleAr: 'الفصل الثاني: مَنْ أَنَا؟',
    chapterTitleEn: 'Chapter 2: Who Am I?',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: معلوماتي الشخصية',
    unitTitleEn: 'Unit 3: Personal Information',
    lessonNumber: 6,
    titleAr: 'معلوماتي الشخصية',
    titleEn: 'Personal Information',
    pageStart: 17,
    pageEnd: 17,
    examples: [
      'أَنَا طَالِبٌ.',
      'أَنَا فِي الإِسْكَنْدَرِيَّةِ.',
      'أَدْرُسُ اللُّغَةَ العَرَبِيَّةَ.'
    ],
    vocabulary: [
      { id: 'v32', arabic: 'طَالِبٌ', transliteration: 'Taalib', english: 'Student' },
      { id: 'v33', arabic: 'مَدِينَة', transliteration: 'Madeenah', english: 'City' },
      { id: 'v34', arabic: 'بَلَد', transliteration: 'Balad', english: 'Country' },
      { id: 'v35', arabic: 'اللُّغَة العَرَبِيَّة', transliteration: 'Al-lughah al-Arabiyyah', english: 'The Arabic Language' }
    ],
    exercises: [
      {
        id: 'ex6-1',
        instruction: 'Identify role',
        instructionAr: 'اختر الكلمة المناسبة: أَنَا ______ لُغَة عَرَبِيَّة.',
        question: 'أَنَا ______ لُغَة عَرَبِيَّة.',
        options: ['طَالِبُ', 'كِتَابُ', 'بَابُ'],
        correctAnswer: 'طَالِبُ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اكتب بطاقة تعريف قصيرة: الاسم، البلد، المدينة، اللغة التي تتعلمها.',
      'تحدث لمدة ثلاثين ثانية عن نفسك دون قراءة النص.'
    ],
    gameId: 'game-ch2-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 3: الأشخاص والأشياء
  {
    id: 'ch3-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 3,
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    chapterTitleEn: 'Chapter 3: People and Objects',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: هذا كتاب',
    unitTitleEn: 'Unit 1: This Is a Book',
    lessonNumber: 7,
    titleAr: 'هذا كتاب',
    titleEn: 'This Is a Book',
    pageStart: 19,
    pageEnd: 20,
    readingPassageAr: 'هَذَا كِتَابٌ. هَذَا بَيْتٌ. هَذَا قَلَمٌ. هَذِهِ حَقِيبَةٌ. هَذِهِ سَيَّارَةٌ.\n\nملاحظة لغوية: نستخدم «هذا» مع الاسم المذكر، و«هذه» مع الاسم المؤنث.',
    vocabulary: [
      { id: 'v36', arabic: 'هَذَا', transliteration: 'Hadha', english: 'This (masculine)' },
      { id: 'v37', arabic: 'هَذِهِ', transliteration: 'Hadhihi', english: 'This (feminine)' },
      { id: 'v38', arabic: 'قَلَمٌ', transliteration: 'Qalam', english: 'Pen / Pencil' },
      { id: 'v39', arabic: 'حَقِيبَةٌ', transliteration: 'Haqeebah', english: 'Bag' },
      { id: 'v40', arabic: 'سَيَّارَةٌ', transliteration: 'Sayyarah', english: 'Car' }
    ],
    examples: [
      'هَذَا كِتَابٌ.',
      'هَذَا قَلَمٌ.',
      'هَذِهِ حَقِيبَةٌ.'
    ],
    exercises: [
      {
        id: 'ex7-1',
        instruction: 'Choose demonstrative',
        instructionAr: 'اختر: (هَذَا / هَذِهِ) كِتَابٌ.',
        question: '______ كِتَابٌ.',
        options: ['هَذَا', 'هَذِهِ'],
        correctAnswer: 'هَذَا',
        type: 'choose'
      },
      {
        id: 'ex7-2',
        instruction: 'Choose demonstrative',
        instructionAr: 'اختر: (هَذَا / هَذِهِ) حَقِيبَةٌ.',
        question: '______ حَقِيبَةٌ.',
        options: ['هَذِهِ', 'هَذَا'],
        correctAnswer: 'هَذِهِ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'أشر إلى خمسة أشياء وقل: هذا ______ / هذه ______.'
    ],
    gameId: 'game-ch3-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch3-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 3,
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    chapterTitleEn: 'Chapter 3: People and Objects',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: مذكر أم مؤنث؟',
    unitTitleEn: 'Unit 2: Masculine or Feminine?',
    lessonNumber: 8,
    titleAr: 'مذكر أم مؤنث؟',
    titleEn: 'Masculine or Feminine?',
    pageStart: 21,
    pageEnd: 21,
    examples: [
      'هَذَا طَالِبٌ.',
      'هَذِهِ طَالِبَةٌ.',
      'هَذِهِ سَيَّارَةٌ.'
    ],
    vocabulary: [
      { id: 'v41', arabic: 'طَالِبٌ', transliteration: 'Taalib', english: 'Male Student' },
      { id: 'v42', arabic: 'طَالِبَةٌ', transliteration: 'Taalibah', english: 'Female Student' },
      { id: 'v43', arabic: 'شَجَرَةٌ', transliteration: 'Shajarah', english: 'Tree' }
    ],
    exercises: [
      {
        id: 'ex8-1',
        instruction: 'Classify gender',
        instructionAr: 'صنّف: كلمة (طَالِبَةٌ) تعتبر:',
        question: 'كَلِمَةُ (طَالِبَةٌ) هِيَ:',
        options: ['مؤنث', 'مذكر'],
        correctAnswer: 'مؤنث',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'صنّف: كتاب، سيارة، قلم، حقيبة، بيت، شجرة.',
      'اكتب جملة مع «هذا» وجملة مع «هذه».'
    ],
    gameId: 'game-ch3-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch3-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 3,
    chapterTitleAr: 'الفصل الثالث: الأشخاص والأشياء',
    chapterTitleEn: 'Chapter 3: People and Objects',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: صف الشيء',
    unitTitleEn: 'Unit 3: Describe the Object',
    lessonNumber: 9,
    titleAr: 'صف الشيء',
    titleEn: 'Describe the Object',
    pageStart: 22,
    pageEnd: 23,
    readingPassageAr: 'هَذَا كِتَابٌ جَدِيدٌ. هَذِهِ حَقِيبَةٌ كَبِيرَةٌ. هَذَا قَلَمٌ صَغِيرٌ. هَذِهِ سَيَّارَةٌ جَمِيلَةٌ.',
    vocabulary: [
      { id: 'v44', arabic: 'جَدِيد', transliteration: 'Jadeed', english: 'New' },
      { id: 'v45', arabic: 'قَدِيم', transliteration: 'Qadeem', english: 'Old' },
      { id: 'v46', arabic: 'كَبِير', transliteration: 'Kabeer', english: 'Big / Large' },
      { id: 'v47', arabic: 'صَغِير', transliteration: 'Sagheer', english: 'Small' },
      { id: 'v48', arabic: 'جَمِيل', transliteration: 'Jameel', english: 'Beautiful' },
      { id: 'v49', arabic: 'سَرِيع', transliteration: 'Saree\'', english: 'Fast' },
      { id: 'v50', arabic: 'بَطِيء', transliteration: 'Batee\'', english: 'Slow' }
    ],
    examples: [
      'هَذَا كِتَابٌ جَدِيدٌ.',
      'هَذِهِ حَقِيبَةٌ كَبِيرَةٌ.',
      'هَذَا قَلَمٌ صَغِيرٌ.'
    ],
    exercises: [
      {
        id: 'ex9-1',
        instruction: 'Match adjective',
        instructionAr: 'اختر الصفة المناسبة: هَذِهِ حَقِيبَةٌ ______ (كَبِيرَةٌ / كَبِيرٌ).',
        question: 'هَذِهِ حَقِيبَةٌ ______',
        options: ['كَبِيرَةٌ', 'كَبِيرٌ'],
        correctAnswer: 'كَبِيرَةٌ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'صف شيئين من حولك بثلاث كلمات على الأقل لكل شيء.'
    ],
    gameId: 'game-ch3-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 4: بناء الجملة العربية
  {
    id: 'ch4-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 4,
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    chapterTitleEn: 'Chapter 4: Arabic Sentence Structure',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: جملة بسيطة',
    unitTitleEn: 'Unit 1: A Simple Sentence',
    lessonNumber: 10,
    titleAr: 'جملة بسيطة',
    titleEn: 'A Simple Sentence',
    pageStart: 25,
    pageEnd: 26,
    readingPassageAr: 'أَنَا طَالِبٌ. أَنَا مُعَلِّمٌ. هِيَ طَالِبَةٌ. هُوَ مُهَنْدِسٌ.\n\nملاحظة: الجملة الاسمية البسيطة قد تبدأ بضمير أو اسم، ثم تأتي معلومة عنه.',
    vocabulary: [
      { id: 'v51', arabic: 'مُعَلِّمٌ', transliteration: 'Mu\'allim', english: 'Teacher' },
      { id: 'v52', arabic: 'مُهَنْدِسٌ', transliteration: 'Muhandis', english: 'Engineer' },
      { id: 'v53', arabic: 'هُوَ', transliteration: 'Huwa', english: 'He' },
      { id: 'v54', arabic: 'هِيَ', transliteration: 'Hiya', english: 'She' }
    ],
    examples: [
      'أَنَا طَالِبٌ.',
      'هِيَ طَالِبَةٌ.',
      'هُوَ مُهَنْدِسٌ.'
    ],
    exercises: [
      {
        id: 'ex10-1',
        instruction: 'Form correct sentence',
        instructionAr: 'اختر الجملة الصحيحة:',
        question: 'للمتحدث المذكر:',
        options: ['أَنَا طَالِبٌ', 'أَنَا طَالِبَةٌ'],
        correctAnswer: 'أَنَا طَالِبٌ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'كوّن جملاً: أنا + طالب / هي + طالبة / هو + معلم.'
    ],
    gameId: 'game-ch4-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch4-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 4,
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    chapterTitleEn: 'Chapter 4: Arabic Sentence Structure',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: أين؟',
    unitTitleEn: 'Unit 2: Where? (Prepositions)',
    lessonNumber: 11,
    titleAr: 'أين؟ حروف الجر',
    titleEn: 'Where? (Prepositions)',
    pageStart: 27,
    pageEnd: 28,
    readingPassageAr: 'تعلّم أربعة حروف جر أساسية:\nفِي (in): الكِتَابُ فِي الحَقِيبَةِ.\nعَلَى (on): القَلَمُ عَلَى الطَّاوِلَةِ.\nمِنْ (from): أَنَا مِنْ مِصْرَ.\nإِلَى (to): أَذْهَبُ إِلَى المَدْرَسَةِ.',
    vocabulary: [
      { id: 'v55', arabic: 'فِي', transliteration: 'Fee', english: 'In / inside' },
      { id: 'v56', arabic: 'عَلَى', transliteration: 'Ala', english: 'On / upon' },
      { id: 'v57', arabic: 'مِنْ', transliteration: 'Min', english: 'From' },
      { id: 'v58', arabic: 'إِلَى', transliteration: 'Ila', english: 'To' },
      { id: 'v59', arabic: 'طَاوِلَة', transliteration: 'Taawilah', english: 'Table' },
      { id: 'v60', arabic: 'مَدْرَسَة', transliteration: 'Madrasah', english: 'School' }
    ],
    examples: [
      'الكِتَابُ فِي الحَقِيبَةِ.',
      'القَلَمُ عَلَى الطَّاوِلَةِ.',
      'أَذْهَبُ إِلَى المَدْرَسَةِ.'
    ],
    exercises: [
      {
        id: 'ex11-1',
        instruction: 'Fill preposition',
        instructionAr: 'أكمل: القَلَمُ ______ الطَّاوِلَةِ.',
        question: 'القَلَمُ ______ الطَّاوِلَةِ.',
        options: ['عَلَى', 'إِلَى', 'مِنْ'],
        correctAnswer: 'عَلَى',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'كوّن أربع جمل قصيرة باستخدام: في، على، من، إلى.'
    ],
    gameId: 'game-ch4-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch4-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 4,
    chapterTitleAr: 'الفصل الرابع: بناء الجملة العربية',
    chapterTitleEn: 'Chapter 4: Arabic Sentence Structure',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: اسأل وأجب',
    unitTitleEn: 'Unit 3: Ask and Answer',
    lessonNumber: 12,
    titleAr: 'اسأل وأجب',
    titleEn: 'Ask and Answer',
    pageStart: 29,
    pageEnd: 30,
    examples: [
      'مَا هَذَا؟ — هَذَا كِتَابٌ.',
      'أَيْنَ الكِتَابُ؟ — الكِتَابُ عَلَى الطَّاوِلَةِ.',
      'مِنْ أَيْنَ أَنْتَ؟ — أَنَا مِنْ مِصْرَ.'
    ],
    vocabulary: [
      { id: 'v61', arabic: 'مَا', transliteration: 'Ma', english: 'What (for objects)' },
      { id: 'v62', arabic: 'مَنْ', transliteration: 'Man', english: 'Who (for people)' },
      { id: 'v63', arabic: 'أَيْنَ', transliteration: 'Ayna', english: 'Where' },
      { id: 'v64', arabic: 'كَيْفَ', transliteration: 'Kayfa', english: 'How' }
    ],
    exercises: [
      {
        id: 'ex12-1',
        instruction: 'Choose question tool',
        instructionAr: 'للسؤال عن شخص نقول: (مَا / مَنْ) هَذَا؟',
        question: '______ هَذَا؟ (للسؤال عن عاقل)',
        options: ['مَنْ', 'مَا', 'أَيْنَ'],
        correctAnswer: 'مَنْ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اكتب خمسة أسئلة وأجب عنها.'
    ],
    gameId: 'game-ch4-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 5: يومي ووقتي
  {
    id: 'ch5-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 5,
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    chapterTitleEn: 'Chapter 5: My Day and Time',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: ماذا تفعل؟',
    unitTitleEn: 'Unit 1: What Do You Do?',
    lessonNumber: 13,
    titleAr: 'ماذا تفعل؟ الأفعال اليومية',
    titleEn: 'What Do You Do? Daily Verbs',
    pageStart: 32,
    pageEnd: 33,
    readingPassageAr: 'أَفْعَال يَوْمِيَّة: أَسْتَيْقِظُ، آكُلُ، أَشْرَبُ، أَدْرُسُ، أَعْمَلُ، أَقْرَأُ، أَكْتُبُ، أَنَامُ.\nأَسْتَيْقِظُ صَبَاحًا. أَتَنَاوَلُ الإِفْطَارَ. أَذْهَبُ إِلَى العَمَلِ. أَقْرَأُ فِي المَسَاءِ.',
    vocabulary: [
      { id: 'v65', arabic: 'أَسْتَيْقِظُ', transliteration: 'Astayqithu', english: 'I wake up' },
      { id: 'v66', arabic: 'آكُلُ', transliteration: 'Aakulu', english: 'I eat' },
      { id: 'v67', arabic: 'أَشْرَبُ', transliteration: 'Ashrabu', english: 'I drink' },
      { id: 'v68', arabic: 'أَدْرُسُ', transliteration: 'Adrusu', english: 'I study' },
      { id: 'v69', arabic: 'أَعْمَلُ', transliteration: 'A\'malu', english: 'I work' },
      { id: 'v70', arabic: 'أَقْرَأُ', transliteration: 'Aqra\'u', english: 'I read' },
      { id: 'v71', arabic: 'أَكْتُبُ', transliteration: 'Aktubu', english: 'I write' },
      { id: 'v72', arabic: 'أَنَامُ', transliteration: 'Anaamu', english: 'I sleep' }
    ],
    examples: [
      'أَسْتَيْقِظُ صَبَاحًا.',
      'أَذْهَبُ إِلَى العَمَلِ.',
      'أَقْرَأُ فِي المَسَاءِ.'
    ],
    exercises: [
      {
        id: 'ex13-1',
        instruction: 'Choose appropriate verb',
        instructionAr: 'اختر: فِي الصَّبَاحِ ______ (أَنَامُ / أَسْتَيْقِظُ).',
        question: 'فِي الصَّبَاحِ ______',
        options: ['أَسْتَيْقِظُ', 'أَنَامُ'],
        correctAnswer: 'أَسْتَيْقِظُ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'رتّب الأفعال حسب يومك. اكتب خمس جمل عن روتينك اليومي.'
    ],
    gameId: 'game-ch5-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch5-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 5,
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    chapterTitleEn: 'Chapter 5: My Day and Time',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: الساعة واليوم',
    unitTitleEn: 'Unit 2: Time and Day',
    lessonNumber: 14,
    titleAr: 'الساعة واليوم',
    titleEn: 'Time and Day',
    pageStart: 34,
    pageEnd: 35,
    readingPassageAr: 'السَّاعَةُ الثَّامِنَةُ. السَّاعَةُ التَّاسِعَةُ وَالنِّصْفُ. اليَوْمُ الأَحَدُ. غَدًا الِاثْنَيْنِ. أَمْسِ السَّبْتِ.\nكَلِمَاتُ الوَقْتِ: اليَوْمَ، غَدًا، أَمْسِ، صَبَاحًا، ظُهْرًا، مَسَاءً، لَيْلًا.',
    vocabulary: [
      { id: 'v73', arabic: 'السَّاعَة', transliteration: 'As-saa\'ah', english: 'The hour / clock / time' },
      { id: 'v74', arabic: 'اليَوْم', transliteration: 'Al-yawm', english: 'Today' },
      { id: 'v75', arabic: 'غَدًا', transliteration: 'Ghadan', english: 'Tomorrow' },
      { id: 'v76', arabic: 'أَمْس', transliteration: 'Ams', english: 'Yesterday' },
      { id: 'v77', arabic: 'صَبَاحًا', transliteration: 'Sabahan', english: 'In the morning' },
      { id: 'v78', arabic: 'مَسَاءً', transliteration: 'Masaa\'an', english: 'In the evening' }
    ],
    examples: [
      'السَّاعَةُ الثَّامِنَةُ.',
      'اليَوْمُ الأَحَدُ.',
      'غَدًا الِاثْنَيْنِ.'
    ],
    exercises: [
      {
        id: 'ex14-1',
        instruction: 'Time vocabulary',
        instructionAr: 'اليوم الذي يلي الأحد هو:',
        question: 'اليَوْمُ الأَحَدُ، غَدًا ______',
        options: ['الاِثْنَيْن', 'السَّبْت', 'الثُّلَاثَاء'],
        correctAnswer: 'الاِثْنَيْن',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'أجب: كم الساعة؟ ما اليوم؟ ماذا تفعل صباحاً؟'
    ],
    gameId: 'game-ch5-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch5-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 5,
    chapterTitleAr: 'الفصل الخامس: يومي ووقتي',
    chapterTitleEn: 'Chapter 5: My Day and Time',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: يومي',
    unitTitleEn: 'Unit 3: My Day',
    lessonNumber: 15,
    titleAr: 'يومي',
    titleEn: 'My Day (Reading Passage)',
    pageStart: 36,
    pageEnd: 37,
    readingPassageAr: 'أَسْتَيْقِظُ فِي السَّابِعَةِ صَبَاحًا. أَشْرَبُ القَهْوَةَ وَأَتَنَاوَلُ الإِفْطَارَ. أَذْهَبُ إِلَى العَمَلِ. أَعُودُ إِلَى البَيْتِ مَسَاءً، ثُمَّ أَقْرَأُ قَلِيلًا وَأَنَامُ.',
    vocabulary: [
      { id: 'v79', arabic: 'قَهْوَة', transliteration: 'Qahwah', english: 'Coffee' },
      { id: 'v80', arabic: 'إِفْطَار', transliteration: 'Iftaar', english: 'Breakfast' },
      { id: 'v81', arabic: 'أَعُودُ', transliteration: 'A\'oodu', english: 'I return' },
      { id: 'v82', arabic: 'قَلِيلًا', transliteration: 'Qaleelan', english: 'A little' }
    ],
    examples: [
      'أَسْتَيْقِظُ فِي السَّابِعَةِ صَبَاحًا.',
      'أَذْهَبُ إِلَى العَمَلِ.',
      'أَعُودُ إِلَى البَيْتِ مَسَاءً.'
    ],
    exercises: [
      {
        id: 'ex15-1',
        instruction: 'Comprehension',
        instructionAr: 'مَتَى يَسْتَيْقِظُ المُتَحَدِّثُ؟',
        question: 'يَسْتَيْقِظُ المُتَحَدِّثُ فِي السَّاعَةِ:',
        options: ['السَّابِعَة صَبَاحًا', 'العَاشِرَة لَيْلًا'],
        correctAnswer: 'السَّابِعَة صَبَاحًا',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اكتب يومك في ستة أسطر. ضع خطاً تحت أفعال اليوم.'
    ],
    gameId: 'game-ch5-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 6: الطعام والشراء
  {
    id: 'ch6-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 6,
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    chapterTitleEn: 'Chapter 6: Food and Shopping',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: في المطعم',
    unitTitleEn: 'Unit 1: At the Restaurant',
    lessonNumber: 16,
    titleAr: 'في المطعم',
    titleEn: 'At the Restaurant',
    pageStart: 39,
    pageEnd: 40,
    dialogue: [
      { speaker: 'Waiter', speakerAr: 'النادل', textAr: 'مَاذَا تُرِيدُ؟', textEn: 'What do you want / desire?' },
      { speaker: 'Customer', speakerAr: 'الزبون', textAr: 'أُرِيدُ مَاءً وَقَهْوَةً، مِنْ فَضْلِكَ.', textEn: 'I want water and coffee, please.' },
      { speaker: 'Waiter', speakerAr: 'النادل', textAr: 'تَفَضَّلْ.', textEn: 'Here you go / Please have it.' }
    ],
    vocabulary: [
      { id: 'v83', arabic: 'مَاء', transliteration: 'Maa\'', english: 'Water' },
      { id: 'v84', arabic: 'شَاي', transliteration: 'Shaay', english: 'Tea' },
      { id: 'v85', arabic: 'خُبْز', transliteration: 'Khubz', english: 'Bread' },
      { id: 'v86', arabic: 'أَرُزّ', transliteration: 'Aruzz', english: 'Rice' },
      { id: 'v87', arabic: 'دَجَاج', transliteration: 'Dajaaj', english: 'Chicken' },
      { id: 'v88', arabic: 'سَلَطَة', transliteration: 'Salatah', english: 'Salad' },
      { id: 'v89', arabic: 'عَصِير', transliteration: 'Aseer', english: 'Juice' },
      { id: 'v90', arabic: 'مِنْ فَضْلِك', transliteration: 'Min fadlik', english: 'Please' }
    ],
    examples: [
      'مَاذَا تُرِيدُ؟ — أُرِيدُ مَاءً، مِنْ فَضْلِكَ.',
      'أُرِيدُ قَهْوَةً.',
      'أُرِيدُ خُبْزًا وَسَلَطَةً.'
    ],
    exercises: [
      {
        id: 'ex16-1',
        instruction: 'Polite expression',
        instructionAr: 'عندما تطلب شيئاً بأدب تقول في النهاية:',
        question: 'أُرِيدُ مَاءً ______',
        options: ['مِنْ فَضْلِكَ', 'إِلَى اللِّقَاء', 'اسْمِي سَارَة'],
        correctAnswer: 'مِنْ فَضْلِكَ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'كوّن طلباً من ثلاثة أشياء. مثّل دور النادل والزبون مع زميلك.'
    ],
    gameId: 'game-ch6-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch6-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 6,
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    chapterTitleEn: 'Chapter 6: Food and Shopping',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: كم السعر؟',
    unitTitleEn: 'Unit 2: How Much Is It?',
    lessonNumber: 17,
    titleAr: 'كم السعر؟',
    titleEn: 'How Much Is It?',
    pageStart: 41,
    pageEnd: 42,
    readingPassageAr: 'كَمِ السِّعْرُ؟ السِّعْرُ عِشْرُونَ جُنَيْهًا. هَذَا غَالٍ. هَذَا رَخِيصٌ.\nأَرْقَامٌ أَسَاسِيَّةٌ: وَاحِد، اِثْنَان، ثَلَاثَة، أَرْبَعَة، خَمْسَة، عَشَرَة، عِشْرُون، خَمْسُون، مِئَة.',
    vocabulary: [
      { id: 'v91', arabic: 'كَمِ السِّعْر؟', transliteration: 'Kamis-si\'r?', english: 'How much is the price?' },
      { id: 'v92', arabic: 'غَالٍ', transliteration: 'Ghaalin', english: 'Expensive' },
      { id: 'v93', arabic: 'رَخِيصٌ', transliteration: 'Rakhees', english: 'Cheap' },
      { id: 'v94', arabic: 'عِشْرُونَ', transliteration: 'Ishroon', english: 'Twenty' },
      { id: 'v95', arabic: 'مِئَة', transliteration: 'Mi\'ah', english: 'One hundred' }
    ],
    examples: [
      'كَمِ السِّعْرُ؟',
      'السِّعْرُ عِشْرُونَ جُنَيْهًا.',
      'هَذَا رَخِيصٌ.'
    ],
    exercises: [
      {
        id: 'ex17-1',
        instruction: 'Vocabulary meaning',
        instructionAr: 'عكس كلمة (غَالٍ) هو:',
        question: 'عَكْسُ (غَالٍ):',
        options: ['رَخِيصٌ', 'كَبِيرٌ', 'جَدِيدٌ'],
        correctAnswer: 'رَخِيصٌ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اسأل عن سعر خمسة أشياء. اكتب الإجابات بالأرقام ثم بالكلمات.'
    ],
    gameId: 'game-ch6-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch6-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 6,
    chapterTitleAr: 'الفصل السادس: الطعام والشراء',
    chapterTitleEn: 'Chapter 6: Food and Shopping',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: أشتري ماذا؟',
    unitTitleEn: 'Unit 3: What Do I Buy?',
    lessonNumber: 18,
    titleAr: 'أشتري ماذا؟ الملابس والألوان',
    titleEn: 'What Do I Buy? Clothes and Colors',
    pageStart: 43,
    pageEnd: 44,
    dialogue: [
      { speaker: 'Customer', speakerAr: 'المشتري', textAr: 'أُرِيدُ قَمِيصًا أَزْرَقَ. هَلْ عِنْدَكُمْ مَقَاسٌ كَبِيرٌ؟', textEn: 'I want a blue shirt. Do you have a large size?' },
      { speaker: 'Salesperson', speakerAr: 'البائع', textAr: 'نَعَمْ، تَفَضَّلْ.', textEn: 'Yes, here you are.' }
    ],
    vocabulary: [
      { id: 'v96', arabic: 'قَمِيص', transliteration: 'Qamees', english: 'Shirt' },
      { id: 'v97', arabic: 'بِنْطَال', transliteration: 'Bintaal', english: 'Trousers / Pants' },
      { id: 'v98', arabic: 'حِذَاء', transliteration: 'Hidhaa\'', english: 'Shoes' },
      { id: 'v99', arabic: 'مَقَاس', transliteration: 'Maqaas', english: 'Size' },
      { id: 'v100', arabic: 'لَوْن', transliteration: 'Lawn', english: 'Color' },
      { id: 'v101', arabic: 'أَزْرَق', transliteration: 'Azraq', english: 'Blue' },
      { id: 'v102', arabic: 'أَبْيَض', transliteration: 'Abyad', english: 'White' },
      { id: 'v103', arabic: 'أَسْوَد', transliteration: 'Aswad', english: 'Black' }
    ],
    examples: [
      'أُرِيدُ قَمِيصًا أَزْرَقَ.',
      'هَلْ عِنْدَكُمْ مَقَاسٌ كَبِيرٌ؟',
      'نَعَمْ، تَفَضَّلْ.'
    ],
    exercises: [
      {
        id: 'ex18-1',
        instruction: 'Color match',
        instructionAr: 'اختر: قَمِيصٌ (أَزْرَق / بِنْطَال).',
        question: 'قَمِيصٌ ______',
        options: ['أَزْرَق', 'بِنْطَال', 'مَقَاس'],
        correctAnswer: 'أَزْرَق',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'أنشئ قائمة شراء من خمسة أشياء. ثم تحدث مع البائع واسأل عن اللون والمقاس والسعر.'
    ],
    gameId: 'game-ch6-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 7: المدينة والاتجاهات
  {
    id: 'ch7-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 7,
    chapterTitleAr: 'الفصل السابع: المدينة والاتجاهات',
    chapterTitleEn: 'Chapter 7: The City and Directions',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: أين المكان؟',
    unitTitleEn: 'Unit 1: Where Is the Place?',
    lessonNumber: 19,
    titleAr: 'أين المكان؟',
    titleEn: 'Where Is the Place?',
    pageStart: 46,
    pageEnd: 46,
    examples: [
      'أَيْنَ المَطْعَمُ؟',
      'المَدْرَسَةُ قَرِيبَةٌ.',
      'المَطَارُ بَعِيدٌ.'
    ],
    vocabulary: [
      { id: 'v104', arabic: 'مَطْعَم', transliteration: 'Mat\'am', english: 'Restaurant' },
      { id: 'v105', arabic: 'مَطَار', transliteration: 'Mataar', english: 'Airport' },
      { id: 'v106', arabic: 'قَرِيب', transliteration: 'Qareeb', english: 'Near / Close' },
      { id: 'v107', arabic: 'بَعِيد', transliteration: 'Ba\'eed', english: 'Far' }
    ],
    exercises: [
      {
        id: 'ex19-1',
        instruction: 'Antonyms',
        instructionAr: 'عكس كلمة (قَرِيب) هو:',
        question: 'عَكْسُ (قَرِيب):',
        options: ['بَعِيدٌ', 'سَرِيعٌ', 'صَغِيرٌ'],
        correctAnswer: 'بَعِيدٌ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'ارسم خريطة صغيرة لشارع، وضع عليها خمسة أماكن، وصف أماكنها بالعربية.'
    ],
    gameId: 'game-ch7-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch7-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 7,
    chapterTitleAr: 'الفصل السابع: المدينة والاتجاهات',
    chapterTitleEn: 'Chapter 7: The City and Directions',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: كيف أذهب؟',
    unitTitleEn: 'Unit 2: How Do I Get There?',
    lessonNumber: 20,
    titleAr: 'كيف أذهب؟',
    titleEn: 'How Do I Get There?',
    pageStart: 47,
    pageEnd: 48,
    readingPassageAr: 'كَيْفَ أَذْهَبُ إِلَى الجَامِعَةِ؟ اِذْهَبْ مُسْتَقِيمًا، ثُمَّ انْعَطِفْ يَمِينًا.\nاتِّجَاهَات: يَمِين، يَسَار، مُسْتَقِيم، قَرِيب، بَعِيد، أَمَام، خَلْف.',
    vocabulary: [
      { id: 'v108', arabic: 'يَمِين', transliteration: 'Yameen', english: 'Right' },
      { id: 'v109', arabic: 'يَسَار', transliteration: 'Yasaar', english: 'Left' },
      { id: 'v110', arabic: 'مُسْتَقِيمًا', transliteration: 'Mustaqeeman', english: 'Straight ahead' },
      { id: 'v111', arabic: 'أَمَام', transliteration: 'Amaam', english: 'In front of' },
      { id: 'v112', arabic: 'خَلْف', transliteration: 'Khalf', english: 'Behind' },
      { id: 'v113', arabic: 'انْعَطِفْ', transliteration: 'In\'atif', english: 'Turn' }
    ],
    examples: [
      'كَيْفَ أَذْهَبُ إِلَى الجَامِعَةِ؟',
      'اِذْهَبْ مُسْتَقِيمًا.',
      'ثُمَّ انْعَطِفْ يَمِينًا.'
    ],
    exercises: [
      {
        id: 'ex20-1',
        instruction: 'Giving directions',
        instructionAr: 'لطلب السير للأمام مباشرة نقول:',
        question: 'السَّيْرُ لِلْأَمَامِ مُبَاشَرَةً:',
        options: ['اِذْهَبْ مُسْتَقِيمًا', 'انْعَطِفْ يَسَارًا', 'خَلْفَكَ'],
        correctAnswer: 'اِذْهَبْ مُسْتَقِيمًا',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اطلب الطريق إلى مكانين. أعطِ تعليمات من ثلاث خطوات على الأقل.'
    ],
    gameId: 'game-ch7-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch7-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 7,
    chapterTitleAr: 'الفصل السابع: المدينة والاتجاهات',
    chapterTitleEn: 'Chapter 7: The City and Directions',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: أعطني الاتجاه',
    unitTitleEn: 'Unit 3: Give Me Directions',
    lessonNumber: 21,
    titleAr: 'أعطني الاتجاه',
    titleEn: 'Give Me Directions',
    pageStart: 49,
    pageEnd: 49,
    examples: [
      'أَيْنَ المَحَطَّةُ؟',
      'اِذْهَبْ مُسْتَقِيمًا، ثُمَّ انْعَطِفْ يَسَارًا.',
      'هَلِ المَطْعَمُ قَرِيبٌ؟'
    ],
    vocabulary: [
      { id: 'v114', arabic: 'مَحَطَّة', transliteration: 'Mahattah', english: 'Station' },
      { id: 'v115', arabic: 'شَارِع', transliteration: 'Shaari\'', english: 'Street' },
      { id: 'v116', arabic: 'خَرِيطَة', transliteration: 'Khareetah', english: 'Map' }
    ],
    exercises: [
      {
        id: 'ex21-1',
        instruction: 'Station inquiry',
        instructionAr: 'أكمل السؤال: أَيْنَ ______؟ (المَحَطَّةُ / يَمِينًا)',
        question: 'أَيْنَ ______؟',
        options: ['المَحَطَّةُ', 'يَمِينًا'],
        correctAnswer: 'المَحَطَّةُ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'مثّل الحوار. ثم غيّر المكان والطريق، واستخدم خريطة حقيقية أو مرسومة.'
    ],
    gameId: 'game-ch7-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 8: الدراسة والعمل
  {
    id: 'ch8-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 8,
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    chapterTitleEn: 'Chapter 8: Study and Work',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: في المدرسة والجامعة',
    unitTitleEn: 'Unit 1: At School and University',
    lessonNumber: 22,
    titleAr: 'في المدرسة والجامعة',
    titleEn: 'At School and University',
    pageStart: 51,
    pageEnd: 52,
    readingPassageAr: 'مَدْرَسَة، جَامِعَة، فَصْل، طَالِب، مُعَلِّم، كِتَاب، دَرْس، وَاجِب، اِمْتِحَان.\nأَنَا طَالِبٌ فِي الجَامِعَةِ. عِنْدِي دَرْسٌ فِي اللُّغَةِ العَرَبِيَّةِ. أَقْرَأُ الكِتَابَ وَأَكْتُبُ الوَاجِبَ.',
    vocabulary: [
      { id: 'v117', arabic: 'فَصْل', transliteration: 'Fasl', english: 'Classroom / Term' },
      { id: 'v118', arabic: 'دَرْس', transliteration: 'Dars', english: 'Lesson' },
      { id: 'v119', arabic: 'وَاجِب', transliteration: 'Waajib', english: 'Homework' },
      { id: 'v120', arabic: 'اِمْتِحَان', transliteration: 'Imtihaan', english: 'Exam / Test' }
    ],
    examples: [
      'أَنَا طَالِبٌ فِي الجَامِعَةِ.',
      'عِنْدِي دَرْسٌ فِي اللُّغَةِ العَرَبِيَّةِ.',
      'أَكْتُبُ الوَاجِبَ.'
    ],
    exercises: [
      {
        id: 'ex22-1',
        instruction: 'Study verb',
        instructionAr: 'اختر: أَنَا ______ الوَاجِبَ (أَكْتُبُ / أَشْرَبُ).',
        question: 'أَنَا ______ الوَاجِبَ.',
        options: ['أَكْتُبُ', 'أَشْرَبُ'],
        correctAnswer: 'أَكْتُبُ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'صف مكان دراستك في خمس جمل. اذكر المادة التي تتعلمها ووقت الدرس.'
    ],
    gameId: 'game-ch8-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch8-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 8,
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    chapterTitleEn: 'Chapter 8: Study and Work',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: عملي وحياتي',
    unitTitleEn: 'Unit 2: My Work and Life',
    lessonNumber: 23,
    titleAr: 'عملي وحياتي',
    titleEn: 'My Work and Life (Professions)',
    pageStart: 53,
    pageEnd: 54,
    readingPassageAr: 'مُعَلِّم، طَبِيب، مُهَنْدِس، مُوَظَّف، مُدِير، مُتَرْجِم، مُصَمِّم.\nأَنَا مُعَلِّمُ لُغَةٍ عَرَبِيَّةٍ. أَعْمَلُ فِي مَدْرَسَةٍ. أُدَرِّسُ الطُّلَّابَ وَأَشْرَحُ الدَّرْسَ.',
    vocabulary: [
      { id: 'v121', arabic: 'طَبِيب', transliteration: 'Tabeeb', english: 'Doctor' },
      { id: 'v122', arabic: 'مُوَظَّف', transliteration: 'Muwadhaf', english: 'Employee' },
      { id: 'v123', arabic: 'مُدِير', transliteration: 'Mudeer', english: 'Manager' },
      { id: 'v124', arabic: 'مُتَرْجِم', transliteration: 'Mutarjim', english: 'Translator' },
      { id: 'v125', arabic: 'مُصَمِّم', transliteration: 'Musammim', english: 'Designer' }
    ],
    examples: [
      'أَنَا مُعَلِّمٌ.',
      'أَعْمَلُ فِي مَدْرَسَةٍ.',
      'أُدَرِّسُ الطُّلَّابَ.'
    ],
    exercises: [
      {
        id: 'ex23-1',
        instruction: 'Profession matching',
        instructionAr: 'الذي يعالج المرضى هو:',
        question: 'الَّذِي يُعَالِجُ المَرْضَى هُوَ:',
        options: ['طَبِيبٌ', 'مُصَمِّمٌ', 'مُتَرْجِمٌ'],
        correctAnswer: 'طَبِيبٌ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'ما عملك؟ أين تعمل؟ ماذا تفعل في عملك؟ أجب في أربع جمل.'
    ],
    gameId: 'game-ch8-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch8-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 8,
    chapterTitleAr: 'الفصل الثامن: الدراسة والعمل',
    chapterTitleEn: 'Chapter 8: Study and Work',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: لمن هذا؟',
    unitTitleEn: 'Unit 3: Whose Is This?',
    lessonNumber: 24,
    titleAr: 'لمن هذا؟ الملكية',
    titleEn: 'Whose Is This? Possessives',
    pageStart: 55,
    pageEnd: 55,
    readingPassageAr: 'تعلّم صيغ الملكية:\nالكِتَابُ لِي ← كِتَابِي.\nالحَقِيبَةُ لَهَا ← حَقِيبَتُهَا.\nالقَلَمُ لَكَ ← قَلَمُكَ.',
    vocabulary: [
      { id: 'v126', arabic: 'لِي', transliteration: 'Lee', english: 'Mine / For me' },
      { id: 'v127', arabic: 'لَكَ', transliteration: 'Laka', english: 'Yours (m)' },
      { id: 'v128', arabic: 'لَهَا', transliteration: 'Laha', english: 'Hers' },
      { id: 'v129', arabic: 'كِتَابِي', transliteration: 'Kitaabee', english: 'My book' },
      { id: 'v130', arabic: 'قَلَمُكَ', transliteration: 'Qalamuka', english: 'Your pen' }
    ],
    examples: [
      'الكِتَابُ لِي ← كِتَابِي.',
      'الحَقِيبَةُ لَهَا ← حَقِيبَتُهَا.',
      'القَلَمُ لَكَ ← قَلَمُكَ.'
    ],
    exercises: [
      {
        id: 'ex24-1',
        instruction: 'Possessive transformation',
        instructionAr: 'حوّل: البَيْتُ لِي ←',
        question: 'البَيْتُ لِي ← ______',
        options: ['بَيْتِي', 'بَيْتُكَ', 'بَيْتُهَا'],
        correctAnswer: 'بَيْتِي',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اكتب أربع جمل عن أشياء تخصك.'
    ],
    gameId: 'game-ch8-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 9: مواقف الحياة
  {
    id: 'ch9-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 9,
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    chapterTitleEn: 'Chapter 9: Life Situations',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: في الفندق والسفر',
    unitTitleEn: 'Unit 1: At the Hotel and While Traveling',
    lessonNumber: 25,
    titleAr: 'في الفندق والسفر',
    titleEn: 'At the Hotel and While Traveling',
    pageStart: 57,
    pageEnd: 58,
    dialogue: [
      { speaker: 'Receptionist', speakerAr: 'الموظف', textAr: 'هَلْ لَدَيْكَ حَجْزٌ؟', textEn: 'Do you have a reservation?' },
      { speaker: 'Traveler', speakerAr: 'المسافر', textAr: 'نَعَمْ، لَدَيَّ حَجْزٌ بِاسْمِ أَحْمَد.', textEn: 'Yes, I have a reservation under the name Ahmed.' },
      { speaker: 'Receptionist', speakerAr: 'الموظف', textAr: 'تَفَضَّلْ، هَذِهِ غُرْفَتُكَ.', textEn: 'Here you go, this is your room.' }
    ],
    vocabulary: [
      { id: 'v131', arabic: 'حَجْزٌ', transliteration: 'Hajz', english: 'Reservation / Booking' },
      { id: 'v132', arabic: 'غُرْفَة', transliteration: 'Ghurfah', english: 'Room' },
      { id: 'v133', arabic: 'جَوَاز سَفَر', transliteration: 'Jawaaz Safar', english: 'Passport' },
      { id: 'v134', arabic: 'تَذْكِرَة', transliteration: 'Tadhkirah', english: 'Ticket' }
    ],
    examples: [
      'هَلْ لَدَيْكَ حَجْزٌ؟',
      'نَعَمْ، لَدَيَّ حَجْزٌ.',
      'هَذِهِ غُرْفَتُكَ.'
    ],
    exercises: [
      {
        id: 'ex25-1',
        instruction: 'Hotel vocabulary',
        instructionAr: 'عند الوصول للفندق يسألك الموظف عن:',
        question: 'هَلْ لَدَيْكَ ______؟',
        options: ['حَجْزٌ', 'طَبِيبٌ', 'سَيَّارَةٌ'],
        correctAnswer: 'حَجْزٌ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'مثّل موقف تسجيل الوصول إلى الفندق. استخدم اسماً وتاريخاً وعدداً بسيطاً للغرف.'
    ],
    gameId: 'game-ch9-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch9-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 9,
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    chapterTitleEn: 'Chapter 9: Life Situations',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: أحتاج إلى مساعدة',
    unitTitleEn: 'Unit 2: I Need Help',
    lessonNumber: 26,
    titleAr: 'أحتاج إلى مساعدة',
    titleEn: 'I Need Help',
    pageStart: 59,
    pageEnd: 60,
    readingPassageAr: 'عِبَارَاتٌ مُهِمَّةٌ:\nأَحْتَاجُ إِلَى مُسَاعَدَةٍ. مِنْ فَضْلِكَ سَاعِدْنِي. لَا أَفْهَمُ. هَلْ يُمْكِنُكَ أَنْ تُكَرِّرَ؟ تَحَدَّثْ بِبُطْءٍ، مِنْ فَضْلِكَ.',
    vocabulary: [
      { id: 'v135', arabic: 'أَحْتَاجُ', transliteration: 'Ahtaaju', english: 'I need' },
      { id: 'v136', arabic: 'مُسَاعَدَة', transliteration: 'Musaa\'adah', english: 'Help / Assistance' },
      { id: 'v137', arabic: 'لَا أَفْهَم', transliteration: 'Laa afhamu', english: 'I do not understand' },
      { id: 'v138', arabic: 'تُكَرِّر', transliteration: 'Tukarrir', english: 'Repeat' },
      { id: 'v139', arabic: 'بِبُطْء', transliteration: 'Bi-but\'', english: 'Slowly' }
    ],
    examples: [
      'أَحْتَاجُ إِلَى مُسَاعَدَةٍ.',
      'لَا أَفْهَمُ.',
      'هَلْ يُمْكِنُكَ أَنْ تُكَرِّرَ؟'
    ],
    exercises: [
      {
        id: 'ex26-1',
        instruction: 'Polite request',
        instructionAr: 'إذا لم تفهم كلام شخص تقول له:',
        question: 'إِذَا لَمْ تَفْهَمْ تَقُولُ:',
        options: ['لَا أَفْهَمُ، كَرِّرْ مِنْ فَضْلِكَ', 'أَنَا أَنَامُ', 'السَّاعَةُ خَمْسَة'],
        correctAnswer: 'لَا أَفْهَمُ، كَرِّرْ مِنْ فَضْلِكَ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'كوّن ثلاثة مواقف تحتاج فيها إلى المساعدة. استخدم عبارة مختلفة في كل موقف.'
    ],
    gameId: 'game-ch9-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch9-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 9,
    chapterTitleAr: 'الفصل التاسع: مواقف الحياة',
    chapterTitleEn: 'Chapter 9: Life Situations',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: ماذا حدث؟',
    unitTitleEn: 'Unit 3: What Happened?',
    lessonNumber: 27,
    titleAr: 'ماذا حدث؟',
    titleEn: 'What Happened?',
    pageStart: 61,
    pageEnd: 62,
    readingPassageAr: 'تَأَخَّرْتُ اليَوْمَ لِأَنَّ الحَافِلَةَ كَانَتْ مُزْدَحِمَةً. اِتَّصَلْتُ بِصَدِيقِي وَقُلْتُ لَهُ: سَأَصِلُ بَعْدَ قَلِيلٍ.',
    vocabulary: [
      { id: 'v140', arabic: 'تَأَخَّرْتُ', transliteration: 'Ta\'akhkhartu', english: 'I was late' },
      { id: 'v141', arabic: 'حَافِلَة', transliteration: 'Haafilah', english: 'Bus' },
      { id: 'v142', arabic: 'مُزْدَحِمَة', transliteration: 'Muzdahimah', english: 'Crowded' },
      { id: 'v143', arabic: 'سَأَصِلُ', transliteration: 'Sa-asilu', english: 'I will arrive' },
      { id: 'v144', arabic: 'بَعْدَ قَلِيل', transliteration: 'Ba\'da qaleel', english: 'In a little while / soon' }
    ],
    examples: [
      'تَأَخَّرْتُ اليَوْمَ.',
      'اِتَّصَلْتُ بِصَدِيقِي.',
      'سَأَصِلُ بَعْدَ قَلِيلٍ.'
    ],
    exercises: [
      {
        id: 'ex27-1',
        instruction: 'Sentence understanding',
        instructionAr: 'تَأَخَّرَ الشَّخْصُ لِأَنَّ الحَافِلَةَ كَانَتْ:',
        question: 'كَانَتِ الحَافِلَةُ:',
        options: ['مُزْدَحِمَةً', 'سَرِيعَةً', 'جَدِيدَةً'],
        correctAnswer: 'مُزْدَحِمَةً',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اكتب رسالة قصيرة تشرح سبب تأخرك. ثم اقرأها بصوت واضح.'
    ],
    gameId: 'game-ch9-unit3',
    isTrialFree: false,
    isPublished: true
  },

  // Chapter 10: أتواصل بالعربية
  {
    id: 'ch10-unit1',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 10,
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    chapterTitleEn: 'Chapter 10: Communicating in Arabic',
    unitNumber: 1,
    unitTitleAr: 'الوحدة الأولى: رسالة قصيرة',
    unitTitleEn: 'Unit 1: A Short Message',
    lessonNumber: 28,
    titleAr: 'رسالة قصيرة',
    titleEn: 'A Short Message',
    pageStart: 64,
    pageEnd: 65,
    readingPassageAr: 'نَمُوذَج رِسَالَة:\nمَرْحَبًا سَارَة،\nكَيْفَ حَالُكِ؟ أَنَا بِخَيْرٍ. سَأَصِلُ إِلَى الجَامِعَةِ السَّاعَةَ العَاشِرَةَ. أَرَاكِ لَاحِقًا.\nأَحْمَد',
    vocabulary: [
      { id: 'v145', arabic: 'رِسَالَة', transliteration: 'Risaalah', english: 'Message / Letter' },
      { id: 'v146', arabic: 'أَرَاكِ لَاحِقًا', transliteration: 'Araaki laahiqan', english: 'See you later' },
      { id: 'v147', arabic: 'تَحِيَّة', transliteration: 'Tahiyyah', english: 'Greeting' },
      { id: 'v148', arabic: 'خَاتِمَة', transliteration: 'Khaatimah', english: 'Conclusion / sign-off' }
    ],
    examples: [
      'مَرْحَبًا سَارَةُ.',
      'كَيْفَ حَالُكِ؟ أَنَا بِخَيْرٍ.',
      'أَرَاكِ لَاحِقًا.'
    ],
    exercises: [
      {
        id: 'ex28-1',
        instruction: 'Closing phrase',
        instructionAr: 'تُختتم الرسالة الودية بعبارة:',
        question: 'فِي نِهَايَةِ الرِّسَالَةِ تَقُولُ:',
        options: ['أَرَاكَ لَاحِقًا', 'كَمِ السِّعْر', 'أَنَا أَنَام'],
        correctAnswer: 'أَرَاكَ لَاحِقًا',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اكتب رسالة من أربعة أسطر إلى صديق. أخبره أين أنت ومتى ستلتقيان.'
    ],
    gameId: 'game-ch10-unit1',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch10-unit2',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 10,
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    chapterTitleEn: 'Chapter 10: Communicating in Arabic',
    unitNumber: 2,
    unitTitleAr: 'الوحدة الثانية: العربية في الحياة',
    unitTitleEn: 'Unit 2: Arabic in Daily Life',
    lessonNumber: 29,
    titleAr: 'العربية في الحياة',
    titleEn: 'Arabic in Daily Life (Review)',
    pageStart: 66,
    pageEnd: 67,
    readingPassageAr: 'مُرَاجَعَةُ العِبَارَاتِ:\nمَرْحَبًا. مَا اسْمُكَ؟ مِنْ أَيْنَ أَنْتَ؟ أَيْنَ...؟ كَمِ السِّعْرُ؟ أُرِيدُ... مِنْ فَضْلِكَ. لَا أَفْهَمُ. هَلْ يُمْكِنُكَ أَنْ تُكَرِّرَ؟',
    vocabulary: [
      { id: 'v149', arabic: 'مُتَجَر', transliteration: 'Matjar', english: 'Shop / Store' },
      { id: 'v150', arabic: 'حَيَاة', transliteration: 'Hayaat', english: 'Life' }
    ],
    examples: [
      'مَرْحَبًا.',
      'كَمِ السِّعْرُ؟',
      'أُرِيدُ مَاءً، مِنْ فَضْلِكَ.'
    ],
    exercises: [
      {
        id: 'ex29-1',
        instruction: 'General review',
        instructionAr: 'الجملة الصحيحة لطلب الشيء:',
        question: 'لِطَلَبِ شَيْءٍ بِأَدَبٍ:',
        options: ['أُرِيدُ مَاءً، مِنْ فَضْلِكَ', 'كَيْفَ أَنْتَ حَقِيبَة', 'هَذَا لَيْلًا'],
        correctAnswer: 'أُرِيدُ مَاءً، مِنْ فَضْلِكَ',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'اختر موقفاً حقيقياً من حياتك، واكتب عشر كلمات تحتاج إليها فيه، ثم كوّن خمس جمل منها.'
    ],
    gameId: 'game-ch10-unit2',
    isTrialFree: false,
    isPublished: true
  },
  {
    id: 'ch10-unit3',
    bookId: 'book-intro-arabic-1',
    chapterNumber: 10,
    chapterTitleAr: 'الفصل العاشر: أتواصل بالعربية',
    chapterTitleEn: 'Chapter 10: Communicating in Arabic',
    unitNumber: 3,
    unitTitleAr: 'الوحدة الثالثة: مهمتي الأولى بالعربية',
    unitTitleEn: 'Unit 3: My First Arabic Task',
    lessonNumber: 30,
    titleAr: 'مهمتي الأولى بالعربية - المشروع الختامي',
    titleEn: 'My First Arabic Task - Capstone Project',
    pageStart: 68,
    pageEnd: 70,
    readingPassageAr: 'المُهِمَّةُ الخِتَامِيَّة:\nقَدِّمْ نَفْسَكَ فِي دَقِيقَةٍ إِلَى دَقِيقَتَيْنِ. اذْكُرِ اسْمَكَ، وَبَلَدَكَ، وَمَدِينَتَكَ، وَمَا تَتَعَلَّمُهُ أَوْ تَعْمَلُ بِهِ، ثُمَّ صِفْ يَوْمَكَ، وَاسْأَلْ سُؤَالَيْنِ، وَاطْلُبْ شَيْئًا فِي مَوْقِفٍ عَمَلِيٍّ.\n\nمَعَايِيرُ النَّجَاح:\n• تَحِيَّة الآخَرِينَ وَالتَّعْرِيفُ بِنَفْسِي.\n• قِرَاءَة كَلِمَات عَرَبِيَّة بَسِيطَة وَنُطْقُهَا بِوُضُوح.\n• وَصْف أَشْخَاص وَأَشْيَاء بِمُفْرَدَات أَسَاسِيَّة.\n• طَرْح أَسْئِلَة عَنِ المَكَان وَالوَقْت وَالسِّعْر.\n• التَّحَدُّث عَنْ يَوْمِي وَدِرَاسَتِي وَعَمَلِي.',
    vocabulary: [
      { id: 'v151', arabic: 'مُهِمَّة', transliteration: 'Muhimmah', english: 'Mission / Task' },
      { id: 'v152', arabic: 'مَعَايِير', transliteration: 'Ma\'aayeer', english: 'Criteria' },
      { id: 'v153', arabic: 'نَجَاح', transliteration: 'Najaah', english: 'Success' }
    ],
    examples: [
      'مَرْحَبًا، اسْمِي أَحْمَدُ.',
      'أَنَا مِنْ مِصْرَ.',
      'أُرِيدُ كَأْسًا مِنَ المَاءِ، مِنْ فَضْلِكَ.'
    ],
    exercises: [
      {
        id: 'ex30-1',
        instruction: 'Capstone check',
        instructionAr: 'أنا مستعد الآن للتحدث بالعربية واستلام شهادة الإتمام!',
        question: 'هَلْ أَتْمَمْتَ جَمِيعَ دُرُوسِ الكِتَابِ بِنَجَاحٍ؟',
        options: ['نَعَمْ، بِكُلِّ فَخْرٍ!', 'مَا زِلْتُ أَتَعَلَّم'],
        correctAnswer: 'نَعَمْ، بِكُلِّ فَخْرٍ!',
        type: 'choose'
      }
    ],
    additionalTasks: [
      'سجّل صوتك وأنت تنفذ المهمة لمدة دقيقة إلى دقيقتين.',
      'استمع إلى التسجيل وحدد ثلاث كلمات تحتاج إلى تحسين نطقها ثم أعد التسجيل.'
    ],
    gameId: 'game-ch10-unit3',
    isTrialFree: false,
    isPublished: true
  }
];
