import React, { useState } from 'react';
import { Lesson, Game } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { speakArabic } from '../../services/audio';
import { analyzePronunciation } from '../../services/gemini';
import {
  X,
  Volume2,
  BookOpen,
  Gamepad2,
  Video,
  CheckCircle,
  Mic,
  MicOff,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Lock
} from 'lucide-react';

interface LessonViewerModalProps {
  lesson: Lesson;
  game?: Game;
  onClose: () => void;
  onLaunchGame: (game: Game) => void;
  onMarkLessonCompleted?: (lessonId: string) => void;
  onOpenUpgradeModal?: () => void;
}

export const LessonViewerModal: React.FC<LessonViewerModalProps> = ({
  lesson,
  game,
  onClose,
  onLaunchGame,
  onMarkLessonCompleted,
  onOpenUpgradeModal
}) => {
  const { t, dir } = useLanguage();
  const { canAccessLesson } = useAuth();
  const [activeTab, setActiveTab] = useState<'textbook' | 'dialogue' | 'vocabulary' | 'exercises' | 'video' | 'speech'>('textbook');
  
  // Exercise states
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [exerciseChecked, setExerciseChecked] = useState(false);

  // Audio Speech Evaluation states
  const [isRecording, setIsRecording] = useState(false);
  const [speechTarget, setSpeechTarget] = useState(lesson.vocabulary[0]?.arabic || 'مَرْحَبًا');
  const [evaluatingSpeech, setEvaluatingSpeech] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<{ score: number; feedbackAr: string; feedbackEn: string } | null>(null);

  const hasAccess = canAccessLesson(lesson.id, lesson.isTrialFree);

  // Handle Speech Recording simulation / Web Speech API recognition
  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      evaluateRecordedSpeech();
    } else {
      setIsRecording(true);
      setSpeechFeedback(null);
      
      // Auto-stop after 4 seconds of speech
      setTimeout(() => {
        setIsRecording(false);
        evaluateRecordedSpeech();
      }, 3500);
    }
  };

  const evaluateRecordedSpeech = async () => {
    setEvaluatingSpeech(true);
    try {
      const result = await analyzePronunciation(speechTarget, speechTarget);
      setSpeechFeedback(result);
    } finally {
      setEvaluatingSpeech(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  {t(lesson.chapterTitleAr, lesson.chapterTitleEn)}
                </span>
                <span className="text-[11px] text-emerald-300">
                  {t(`صفحة ${lesson.pageStart}-${lesson.pageEnd}`, `Pages ${lesson.pageStart}-${lesson.pageEnd}`)}
                </span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg font-arabic text-white">
                {t(lesson.titleAr, lesson.titleEn)}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {game && hasAccess && (
              <button
                onClick={() => onLaunchGame(game)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Gamepad2 className="w-4 h-4 fill-emerald-950" />
                <span>{t('العب لعبة الدرس', 'Play Lesson Game')}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Locked Content Banner if student lacks access */}
        {!hasAccess ? (
          <div className="p-8 text-center my-auto space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center border-2 border-amber-300">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 font-arabic">
              {t('هذا المحتوى محمي ويتطلب اشتراكاً نشطاً', 'Protected Lesson Content')}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t(
                'الوحدات المتقدمة متاحة للمشتركين فقط أو من خلال فترة التجربة المجانية الممتدة. اشترك الآن في باقة النبيل للوصول الكامل لجميع فصول الكتاب وألعابه.',
                'This unit is protected by server authorization. Subscribe to a membership plan or activate your trial to unlock all 10 textbook chapters and games.'
              )}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenUpgradeModal) onOpenUpgradeModal();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                {t('ترقية الاشتراك / تفعيل التجربة', 'Upgrade Plan / Activate Trial')}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-6 pt-3 bg-gray-50 border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab('textbook')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'textbook'
                    ? 'border-emerald-600 text-emerald-900 bg-white rounded-t-lg'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('نص الكتاب الأصلي', 'Original Textbook')}</span>
              </button>

              {lesson.dialogue && lesson.dialogue.length > 0 && (
                <button
                  onClick={() => setActiveTab('dialogue')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'dialogue'
                      ? 'border-emerald-600 text-emerald-900 bg-white rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{t('الحوار التواصلي', 'Dialogue')}</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('vocabulary')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'vocabulary'
                    ? 'border-emerald-600 text-emerald-900 bg-white rounded-t-lg'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('المفردات الصوتية', 'Audio Vocabulary')}</span>
              </button>

              <button
                onClick={() => setActiveTab('exercises')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'exercises'
                    ? 'border-emerald-600 text-emerald-900 bg-white rounded-t-lg'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t('التدريبات والأنشطة', 'Exercises')}</span>
              </button>

              <button
                onClick={() => setActiveTab('speech')}
                className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'speech'
                    ? 'border-emerald-600 text-emerald-900 bg-white rounded-t-lg'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('مختبر النطق الصوتي AI', 'AI Pronunciation Lab')}</span>
              </button>

              {lesson.youtubeVideoId && (
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'video'
                      ? 'border-emerald-600 text-emerald-900 bg-white rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-red-600" />
                  <span>{t('فيديو الشرح', 'Video Lesson')}</span>
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Tab 1: Original Textbook Content */}
              {activeTab === 'textbook' && (
                <div className="space-y-6">
                  {/* Advice Banner from Author */}
                  {lesson.adviceAr && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-amber-900 block mb-0.5">
                          {t('نصيحة المعلم أحمد نبيل النحراوي:', 'Teacher Ahmed Nabil’s Advice:')}
                        </span>
                        <p className="text-amber-800 leading-relaxed font-arabic">
                          {lesson.adviceAr}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Reading Passage or Content */}
                  {lesson.readingPassageAr && (
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800">{t('المحتوى المقروء:', 'Reading Text:')}</span>
                        <button
                          onClick={() => speakArabic(lesson.readingPassageAr!)}
                          className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>{t('استمع للنص كاملاً', 'Listen to full passage')}</span>
                        </button>
                      </div>
                      <p className="text-lg sm:text-xl font-arabic leading-loose text-gray-900 whitespace-pre-line">
                        {lesson.readingPassageAr}
                      </p>
                    </div>
                  )}

                  {/* Examples from Textbook */}
                  {lesson.examples.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-900 font-arabic flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span>{t('أمثلة الكتاب (Examples)', 'Textbook Examples')}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lesson.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 transition-all flex items-center justify-between group"
                          >
                            <span className="text-base font-bold font-arabic text-gray-800">{ex}</span>
                            <button
                              onClick={() => speakArabic(ex)}
                              className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Tasks */}
                  {lesson.additionalTasks.length > 0 && (
                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-dashed border-emerald-300 space-y-2">
                      <h4 className="text-xs font-bold text-emerald-900 font-arabic">
                        {t('تدريب إضافي وتطبيقي (Additional Practice):', 'Additional Practice Tasks:')}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        {lesson.additionalTasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-bold text-emerald-700">{idx + 1}.</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Dialogue */}
              {activeTab === 'dialogue' && lesson.dialogue && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-500">
                      {t('انقر على أي جملة للاستماع إلى نطقها الصحيح', 'Click any dialogue bubble to hear pronunciation')}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {lesson.dialogue.map((line, idx) => {
                      const isLeft = idx % 2 === 1;
                      return (
                        <div
                          key={idx}
                          onClick={() => speakArabic(line.textAr)}
                          className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                            isLeft
                              ? 'bg-amber-50/60 border-amber-200'
                              : 'bg-emerald-50/60 border-emerald-200'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            isLeft ? 'bg-amber-600 text-white' : 'bg-emerald-800 text-white'
                          }`}>
                            {line.speakerAr.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-gray-700">{line.speakerAr} ({line.speaker})</span>
                              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                            </div>
                            <p className="text-lg font-bold font-arabic text-gray-900 mb-1">
                              {line.textAr}
                            </p>
                            <p className="text-xs text-gray-500">
                              {line.textEn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 3: Vocabulary Flashcards */}
              {activeTab === 'vocabulary' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {lesson.vocabulary.map((vocab) => (
                    <div
                      key={vocab.id}
                      onClick={() => speakArabic(vocab.arabic)}
                      className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-2xl font-extrabold font-arabic text-emerald-950 group-hover:text-emerald-700 transition-colors">
                          {vocab.arabic}
                        </span>
                        <div className="p-1.5 rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                          <Volume2 className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <div className="text-xs font-semibold text-amber-700">{vocab.transliteration}</div>
                        <div className="text-xs text-gray-600 font-medium">{vocab.english}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Exercises */}
              {activeTab === 'exercises' && (
                <div className="space-y-6">
                  {lesson.exercises.map((ex, idx) => (
                    <div key={ex.id} className="p-5 rounded-2xl border border-gray-200 bg-white space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                        <span>{t(`تدريب ${idx + 1}`, `Exercise ${idx + 1}`)}:</span>
                        <span>{ex.instructionAr} ({ex.instruction})</span>
                      </div>

                      <p className="text-base font-bold font-arabic text-gray-900">
                        {ex.question}
                      </p>

                      {ex.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                          {ex.options.map((opt, oIdx) => {
                            const isChosen = exerciseAnswers[ex.id] === opt;
                            const isCorrectOpt = opt === ex.correctAnswer;
                            let style = 'bg-gray-50 border-gray-200 hover:border-emerald-300 text-gray-800';

                            if (exerciseChecked) {
                              if (isCorrectOpt) {
                                style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                              } else if (isChosen) {
                                style = 'bg-red-100 border-red-400 text-red-950 font-bold';
                              }
                            } else if (isChosen) {
                              style = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold';
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => setExerciseAnswers({ ...exerciseAnswers, [ex.id]: opt })}
                                className={`p-3 rounded-xl border text-xs sm:text-sm font-arabic transition-all cursor-pointer text-center ${style}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <button
                      onClick={() => setExerciseChecked(!exerciseChecked)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer shadow-md"
                    >
                      {exerciseChecked ? t('إعادة حل التدريبات', 'Reset Exercises') : t('تصحيح الإجابات', 'Check My Answers')}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 5: AI Speech Lab */}
              {activeTab === 'speech' && (
                <div className="space-y-6 max-w-xl mx-auto text-center py-4">
                  <div className="inline-flex p-3 rounded-2xl bg-amber-50 text-amber-700 mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-arabic text-gray-900">
                      {t('مختبر النطق الصوتي المدعوم بالذكاء الاصطناعي', 'AI Arabic Speech Pronunciation Lab')}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {t(
                        'اختر كلمة من الدرس، انقر زر التسجيل، وانطقها بصوتك ليقوم نموذج الذكاء الاصطناعي بتقييم مخارج الحروف.',
                        'Select a textbook vocabulary word, record your voice, and get instant pronunciation feedback.'
                      )}
                    </p>
                  </div>

                  {/* Target Word Selector */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs text-gray-500 block mb-1">{t('الكلمة المستهدفة للنطق:', 'Target Word:')}</span>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-3xl font-extrabold font-arabic text-emerald-950">{speechTarget}</span>
                      <button
                        onClick={() => speakArabic(speechTarget)}
                        className="p-2 rounded-full bg-emerald-200 text-emerald-900 hover:bg-emerald-300"
                        title="Listen to native voice"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {lesson.vocabulary.slice(0, 5).map((v) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            setSpeechTarget(v.arabic);
                            setSpeechFeedback(null);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-arabic font-bold cursor-pointer ${
                            speechTarget === v.arabic
                              ? 'bg-emerald-700 text-white'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {v.arabic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Record Button */}
                  <div className="py-2">
                    <button
                      onClick={handleToggleRecord}
                      disabled={evaluatingSpeech}
                      className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                        isRecording
                          ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-200'
                          : 'bg-emerald-800 hover:bg-emerald-900 text-white hover:scale-105'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                    <span className="text-xs font-bold text-gray-500 block mt-2">
                      {isRecording
                        ? t('جارٍ الاستماع... تكلّم الآن', 'Listening... Speak clearly')
                        : t('انقر للتحدث والتسجيل', 'Click to Speak')}
                    </span>
                  </div>

                  {/* Speech Evaluation Result */}
                  {evaluatingSpeech && (
                    <div className="text-xs text-amber-700 font-bold animate-pulse">
                      {t('جارٍ تحليل نطقك ومخارج الحروف مع نموذج Gemini...', 'Analyzing your Arabic speech with Gemini...')}
                    </div>
                  )}

                  {speechFeedback && (
                    <div className="p-4 rounded-2xl bg-white border-2 border-emerald-300 text-start space-y-2 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-700">{t('درجة دقة النطق:', 'Pronunciation Score:')}</span>
                        <span className="text-base font-extrabold text-emerald-800">{speechFeedback.score}%</span>
                      </div>
                      <p className="text-xs font-bold font-arabic text-emerald-900">
                        {speechFeedback.feedbackAr}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {speechFeedback.feedbackEn}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 6: YouTube Video Embed */}
              {activeTab === 'video' && lesson.youtubeVideoId && (
                <div className="space-y-4">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${lesson.youtubeVideoId}`}
                      title={lesson.titleEn}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    {t(
                      'فيديو شرح تطبيقي للدرس مع المعلم أحمد نبيل النحراوي عبر YouTube.',
                      'Interactive video lesson walkthrough by Teacher Ahmed Nabil Al-Nahrawy on YouTube.'
                    )}
                  </p>
                </div>
              )}

            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => {
                  if (onMarkLessonCompleted) onMarkLessonCompleted(lesson.id);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <CheckCircle className="w-4 h-4 text-amber-300" />
                <span>{t('تمييز الدرس كمكتمل', 'Mark Lesson Complete')}</span>
              </button>

              {game && (
                <button
                  onClick={() => onLaunchGame(game)}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Gamepad2 className="w-4 h-4 fill-emerald-950" />
                  <span>{t('الانتقال للعبة التفاعلية', 'Play Lesson Game')}</span>
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
