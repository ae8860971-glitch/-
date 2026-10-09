import { Game } from '../types';

export const INITIAL_GAMES: Game[] = [
  // Game 1: Match Words for Unit 1 (Hello in Arabic)
  {
    id: 'game-ch1-unit1',
    lessonId: 'ch1-unit1',
    titleAr: 'تحدي تحيات التعارف',
    titleEn: 'Greetings Match & Speed',
    gameType: 'match_words',
    difficulty: 'easy',
    timeLimitSeconds: 60,
    pointsPerQuestion: 100,
    isPublished: true,
    questions: [
      {
        id: 'q1-1',
        questionAr: 'صِل الكلمة العربية بترجمتها الإنجليزية الصحيحة',
        questionEn: 'Match each Arabic greeting with its English meaning',
        correctAnswer: 'matched',
        pairs: [
          { arabic: 'مَرْحَبًا', english: 'Hello' },
          { arabic: 'أَهْلًا وَسَهْلًا', english: 'Welcome' },
          { arabic: 'شُكْرًا', english: 'Thank you' },
          { arabic: 'بِخَيْرٍ', english: 'Fine / Well' },
          { arabic: 'كَيْفَ حَالُكَ؟', english: 'How are you?' }
        ]
      }
    ]
  },
  // Game 2: Letter & Sounds Quiz (Multiple Choice)
  {
    id: 'game-ch1-unit2',
    lessonId: 'ch1-unit2',
    titleAr: 'تحدي الحركات القصيرة والأصوات',
    titleEn: 'Short Vowels & Letters Challenge',
    gameType: 'multiple_choice',
    difficulty: 'easy',
    timeLimitSeconds: 45,
    pointsPerQuestion: 100,
    isPublished: true,
    questions: [
      {
        id: 'q2-1',
        questionAr: 'أي صوت يمثل الحرف (بَ) مع الفتحة؟',
        questionEn: 'Which sound represents (بَ) with Fatha?',
        options: ['Ba', 'Bi', 'Bu', 'Ab'],
        correctAnswer: 'Ba',
        explanationAr: 'الفتحة علامة فوق الحرف تجعل صوته مفتوحاً (Ba).'
      },
      {
        id: 'q2-2',
        questionAr: 'أي حركة تمثل صوت الكسرة (ِ)؟',
        questionEn: 'Which mark represents the Kasra sound in (تِ)?',
        options: ['Ti', 'Ta', 'Tu', 'It'],
        correctAnswer: 'Ti',
        explanationAr: 'الكسرة خط مائل تحت الحرف يُنطق (i).'
      },
      {
        id: 'q2-3',
        questionAr: 'الحرف (سُ) يحمل ضمة، فما هو نطقه؟',
        questionEn: 'The letter (سُ) has a Damma, how is it pronounced?',
        options: ['Su', 'Sa', 'Si', 'As'],
        correctAnswer: 'Su',
        explanationAr: 'الضمة تشبه واواً صغيرة فوق الحرف وتُنطق (u).'
      }
    ]
  },
  // Game 3: Sentence Builder / Word Assembler
  {
    id: 'game-ch1-unit3',
    lessonId: 'ch1-unit3',
    titleAr: 'بناء الكلمة والجملة الأولى',
    titleEn: 'First Word & Sentence Builder',
    gameType: 'sentence_builder',
    difficulty: 'easy',
    timeLimitSeconds: 50,
    pointsPerQuestion: 150,
    isPublished: true,
    questions: [
      {
        id: 'q3-1',
        questionAr: 'رتّب الكلمات لتكوين: "هَذَا كِتَابٌ"',
        questionEn: 'Arrange the words to form: "This is a book"',
        words: ['كِتَابٌ', 'هَذَا'],
        correctOrder: ['هَذَا', 'كِتَابٌ'],
        correctAnswer: 'هَذَا كِتَابٌ'
      },
      {
        id: 'q3-2',
        questionAr: 'رتّب الكلمات لتكوين: "هَذَا بَابٌ"',
        questionEn: 'Arrange the words to form: "This is a door"',
        words: ['بَابٌ', 'هَذَا'],
        correctOrder: ['هَذَا', 'بَابٌ'],
        correctAnswer: 'هَذَا بَابٌ'
      },
      {
        id: 'q3-3',
        questionAr: 'رتّب الكلمات لتكوين: "هَذَا بَيْتٌ"',
        questionEn: 'Arrange the words to form: "This is a house"',
        words: ['بَيْتٌ', 'هَذَا'],
        correctOrder: ['هَذَا', 'بَيْتٌ'],
        correctAnswer: 'هَذَا بَيْتٌ'
      }
    ]
  },
  // Game 4: True / False Identity Challenge
  {
    id: 'game-ch2-unit1',
    lessonId: 'ch2-unit1',
    titleAr: 'صحيح أم خطأ: التعارف والأسماء',
    titleEn: 'True or False: Personal Introduction',
    gameType: 'true_false',
    difficulty: 'easy',
    timeLimitSeconds: 40,
    pointsPerQuestion: 100,
    isPublished: true,
    questions: [
      {
        id: 'q4-1',
        questionAr: 'عبارة "اسْمِي أَحْمَد" تعني "My name is Ahmed".',
        questionEn: 'The phrase "اسْمِي أَحْمَد" means "My name is Ahmed".',
        options: ['True / صحيح', 'False / خطأ'],
        correctAnswer: 'True / صحيح',
        explanationAr: 'نعم، كلمة اسْمي تعني My name.'
      },
      {
        id: 'q4-2',
        questionAr: 'نقول للمؤنث: "مَا اسْمُكَ؟" بالفتحة على الكاف.',
        questionEn: 'We say "مَا اسْمُكَ؟" (with Fatha) to ask a female.',
        options: ['True / صحيح', 'False / خطأ'],
        correctAnswer: 'False / خطأ',
        explanationAr: 'خطأ! للمؤنث نقول: "مَا اسْمُكِ؟" بالكسرة تحت الكاف.'
      },
      {
        id: 'q4-3',
        questionAr: 'الرد على "تَشَرَّفْتُ بِلِقَائِك" يكون "وَأَنَا أَيْضًا".',
        questionEn: 'The appropriate reply to "Pleased to meet you" is "Me too / Likewise".',
        options: ['True / صحيح', 'False / خطأ'],
        correctAnswer: 'True / صحيح'
      }
    ]
  },
  // Game 5: Countries & Prepositions (Memory Game)
  {
    id: 'game-ch2-unit2',
    lessonId: 'ch2-unit2',
    titleAr: 'لعبة الذاكرة: البلدان والجنسيات',
    titleEn: 'Memory Match: Countries in Arabic',
    gameType: 'memory_game',
    difficulty: 'medium',
    timeLimitSeconds: 60,
    pointsPerQuestion: 200,
    isPublished: true,
    questions: [
      {
        id: 'q5-1',
        questionAr: 'اقلب البطاقات وطابق البلد العربي بالإنجليزية',
        questionEn: 'Flip cards and match Arabic countries with English names',
        correctAnswer: 'matched',
        pairs: [
          { arabic: 'مِصْر', english: 'Egypt' },
          { arabic: 'اليَابَان', english: 'Japan' },
          { arabic: 'تُرْكِيَا', english: 'Türkiye' },
          { arabic: 'فَرَنْسَا', english: 'France' }
        ]
      }
    ]
  },
  // Game 6: Masculine vs Feminine (Drag & Drop / Classification)
  {
    id: 'game-ch3-unit1',
    lessonId: 'ch3-unit1',
    titleAr: 'تحدي اسم الإشارة (هَذَا / هَذِهِ)',
    titleEn: 'Demonstrative Challenge (Hadha vs Hadhihi)',
    gameType: 'multiple_choice',
    difficulty: 'easy',
    timeLimitSeconds: 45,
    pointsPerQuestion: 100,
    isPublished: true,
    questions: [
      {
        id: 'q6-1',
        questionAr: 'اختر اسم الإشارة لكلمة: سَيَّارَة',
        questionEn: 'Choose demonstrative for: سَيَّارَة (Car)',
        options: ['هَذِهِ', 'هَذَا'],
        correctAnswer: 'هَذِهِ',
        explanationAr: 'كلمة سيارة مؤنثة تنتهي بتاء مربوطة فتأخذ "هذه".'
      },
      {
        id: 'q6-2',
        questionAr: 'اختر اسم الإشارة لكلمة: قَلَم',
        questionEn: 'Choose demonstrative for: قَلَم (Pen)',
        options: ['هَذَا', 'هَذِهِ'],
        correctAnswer: 'هَذَا',
        explanationAr: 'قلم مذكر فيأخذ "هذا".'
      },
      {
        id: 'q6-3',
        questionAr: 'اختر اسم الإشارة لكلمة: حَقِيبَة',
        questionEn: 'Choose demonstrative for: حَقِيبَة (Bag)',
        options: ['هَذِهِ', 'هَذَا'],
        correctAnswer: 'هَذِهِ',
        explanationAr: 'حقيبة مؤنثة تأخذ "هذه".'
      }
    ]
  },
  // Game 7: Food & Restaurant Order Speed Challenge
  {
    id: 'game-ch6-unit1',
    lessonId: 'ch6-unit1',
    titleAr: 'سباق طلبات المطعم العربي',
    titleEn: 'Arabic Restaurant Speed Order',
    gameType: 'speed_challenge',
    difficulty: 'medium',
    timeLimitSeconds: 40,
    pointsPerQuestion: 120,
    isPublished: true,
    questions: [
      {
        id: 'q7-1',
        questionAr: 'تريد أن تشرب ماءً، ماذا تقول؟',
        questionEn: 'You want water, what do you say?',
        options: ['أُرِيدُ مَاءً، مِنْ فَضْلِكَ', 'أُرِيدُ قَمِيصًا', 'أَنَا أَنَامُ'],
        correctAnswer: 'أُرِيدُ مَاءً، مِنْ فَضْلِكَ'
      },
      {
        id: 'q7-2',
        questionAr: 'ما معنى كلمة (شَاي)؟',
        questionEn: 'What does (شَاي) mean?',
        options: ['Tea', 'Coffee', 'Juice', 'Bread'],
        correctAnswer: 'Tea'
      },
      {
        id: 'q7-3',
        questionAr: 'عندما يقدم لك النادل الطلب يقول:',
        questionEn: 'When the waiter serves your order he says:',
        options: ['تَفَضَّلْ', 'مَا اسْمُكَ', 'أَيْنَ المَطَار'],
        correctAnswer: 'تَفَضَّلْ'
      }
    ]
  }
];
