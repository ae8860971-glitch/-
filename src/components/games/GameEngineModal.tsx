import React, { useState, useEffect } from 'react';
import { Game, GameQuestion } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { speakArabic } from '../../services/audio';
import confetti from 'canvas-confetti';
import {
  X,
  Trophy,
  Flame,
  Timer,
  Volume2,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award
} from 'lucide-react';

interface GameEngineModalProps {
  game: Game;
  onClose: () => void;
  onGameCompleted?: (score: number) => void;
}

export const GameEngineModal: React.FC<GameEngineModalProps> = ({
  game,
  onClose,
  onGameCompleted
}) => {
  const { t, dir } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(game.timeLimitSeconds || 60);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Match Words / Memory Game state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedArabic, setSelectedArabic] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);

  // Sentence Builder state
  const [assembledSentence, setAssembledSentence] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const currentQ: GameQuestion | undefined = game.questions[currentQuestionIndex];

  // Initialize Sentence Builder words
  useEffect(() => {
    if (currentQ?.words) {
      setAvailableWords([...currentQ.words].sort(() => Math.random() - 0.5));
      setAssembledSentence([]);
    }
  }, [currentQuestionIndex, currentQ]);

  // Timer countdown
  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  const finishGame = () => {
    setGameOver(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onGameCompleted) {
      onGameCompleted(score);
    }
  };

  // Multiple Choice / True-False answer check
  const handleSelectOption = (option: string) => {
    if (isAnswered || gameOver) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option.trim().toLowerCase() === currentQ?.correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      const bonus = streak * 20;
      const questionPoints = game.pointsPerQuestion + bonus;
      setScore((prev) => prev + questionPoints);
      setStreak((prev) => prev + 1);
      speakArabic(currentQ?.questionAr || option);
    } else {
      setStreak(0);
    }
  };

  // Match Words Engine
  const handleMatchWord = (arabic?: string, english?: string) => {
    let newAr = arabic !== undefined ? arabic : selectedArabic;
    let newEn = english !== undefined ? english : selectedEnglish;

    if (arabic !== undefined) {
      setSelectedArabic(arabic);
      speakArabic(arabic);
    }
    if (english !== undefined) setSelectedEnglish(english);

    if (newAr && newEn) {
      const pair = currentQ?.pairs?.find((p) => p.arabic === newAr && p.english === newEn);
      if (pair) {
        setMatchedPairs((prev) => [...prev, newAr!]);
        setScore((prev) => prev + 100 + streak * 10);
        setStreak((prev) => prev + 1);
        if (matchedPairs.length + 1 >= (currentQ?.pairs?.length || 0)) {
          // Finished matching all pairs!
          setTimeout(handleNextQuestion, 600);
        }
      } else {
        setStreak(0);
      }
      setSelectedArabic(null);
      setSelectedEnglish(null);
    }
  };

  // Sentence Builder logic
  const handleAddWordToSentence = (word: string, index: number) => {
    setAssembledSentence((prev) => [...prev, word]);
    const remaining = [...availableWords];
    remaining.splice(index, 1);
    setAvailableWords(remaining);
  };

  const handleRemoveWordFromSentence = (word: string, index: number) => {
    const updated = [...assembledSentence];
    updated.splice(index, 1);
    setAssembledSentence(updated);
    setAvailableWords((prev) => [...prev, word]);
  };

  const handleVerifySentence = () => {
    const userResult = assembledSentence.join(' ').trim();
    const correct = userResult === currentQ?.correctAnswer.trim();
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + game.pointsPerQuestion + 50);
      setStreak((prev) => prev + 1);
      speakArabic(userResult);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setSelectedArabic(null);
    setSelectedEnglish(null);

    if (currentQuestionIndex + 1 < game.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishGame();
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(game.timeLimitSeconds || 60);
    setGameOver(false);
    setIsAnswered(false);
    setSelectedOption(null);
    setMatchedPairs([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-arabic">
                {t(game.titleAr, game.titleEn)}
              </h3>
              <span className="text-[11px] text-emerald-300 capitalize font-medium">
                {game.gameType.replace('_', ' ')} • {t('تحدي تنافسي', 'Competitive Learning')}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar: Points, Streak, Timer */}
        <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-950">
          <div className="flex items-center gap-1.5 text-amber-700">
            <Sparkles className="w-4 h-4 fill-amber-400" />
            <span>{score} {t('نقطة', 'pts')}</span>
          </div>

          <div className="flex items-center gap-1.5 text-red-600">
            <Flame className="w-4 h-4 fill-red-500" />
            <span>{streak}x {t('سلسلة', 'Streak')}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-800">
            <Timer className="w-4 h-4" />
            <span className={timeLeft <= 10 ? 'text-red-600 animate-pulse font-extrabold' : ''}>
              {timeLeft} {t('ثانية', 'sec')}
            </span>
          </div>
        </div>

        {/* Game Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-between">
          {gameOver ? (
            /* Game Over Screen */
            <div className="text-center py-8 space-y-5 my-auto">
              <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center border-4 border-amber-300">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900 font-arabic">
                  {score >= 200 ? t('أحسنت صنعاً! أداء رائع', 'Outstanding Performance!') : t('اكتمل التحدي!', 'Challenge Completed!')}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {t('لقد جمعت درجات ممتازة في تعزيز مفردات الدرس.', 'You earned great mastery points reinforcing textbook vocabulary.')}
                </p>
              </div>

              <div className="inline-block bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-3">
                <span className="text-xs text-gray-500 block">{t('النتيجة النهائية', 'Final Score')}</span>
                <span className="text-3xl font-extrabold text-emerald-800">{score} {t('نقطة', 'Points')}</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t('إعادة المحاولة', 'Play Again')}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  {t('إنهاء والعودة للدرس', 'Done & Back to Lesson')}
                </button>
              </div>
            </div>
          ) : (
            /* Active Game Question */
            <div className="space-y-6">
              
              {/* Question Header */}
              <div className="text-center space-y-2">
                <div className="text-xs text-emerald-700 font-bold">
                  {t(`السؤال ${currentQuestionIndex + 1} من ${game.questions.length}`, `Question ${currentQuestionIndex + 1} of ${game.questions.length}`)}
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-arabic">
                  {currentQ?.questionAr}
                </h4>
                {currentQ?.questionEn && (
                  <p className="text-xs text-gray-500 font-medium">
                    {currentQ.questionEn}
                  </p>
                )}
              </div>

              {/* Pronunciation audio prompt if Arabic available */}
              {currentQ?.questionAr && (
                <div className="flex justify-center">
                  <button
                    onClick={() => speakArabic(currentQ.questionAr)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{t('استمع للنطق الصوتي', 'Listen to Arabic pronunciation')}</span>
                  </button>
                </div>
              )}

              {/* Engine 1: Multiple Choice & True/False */}
              {(game.gameType === 'multiple_choice' || game.gameType === 'true_false' || game.gameType === 'speed_challenge') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentQ?.options?.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    let btnStyle = 'bg-white border-gray-200 hover:border-emerald-400 text-gray-800';

                    if (isAnswered) {
                      if (option === currentQ.correctAnswer) {
                        btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-100 border-red-400 text-red-950 font-bold';
                      } else {
                        btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option)}
                        disabled={isAnswered}
                        className={`p-4 rounded-2xl border-2 text-sm sm:text-base font-arabic transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && option === currentQ.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        )}
                        {isAnswered && isSelected && option !== currentQ.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Engine 2: Match Words Pairs */}
              {(game.gameType === 'match_words' || game.gameType === 'memory_game') && currentQ?.pairs && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {/* Arabic Column */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-500 block mb-1">{t('الكلمة بالعربية', 'Arabic')}</span>
                    {currentQ.pairs.map((p, idx) => {
                      const isMatched = matchedPairs.includes(p.arabic);
                      const isSelected = selectedArabic === p.arabic;
                      return (
                        <button
                          key={idx}
                          disabled={isMatched}
                          onClick={() => handleMatchWord(p.arabic, undefined)}
                          className={`w-full p-3 rounded-xl border text-sm font-bold font-arabic transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-900 opacity-60'
                              : isSelected
                              ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-sm'
                              : 'bg-white border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          {p.arabic}
                        </button>
                      );
                    })}
                  </div>

                  {/* English Column */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-500 block mb-1">{t('المعنى بالإنجليزية', 'English')}</span>
                    {currentQ.pairs.map((p, idx) => {
                      const isMatched = matchedPairs.includes(p.arabic);
                      const isSelected = selectedEnglish === p.english;
                      return (
                        <button
                          key={idx}
                          disabled={isMatched}
                          onClick={() => handleMatchWord(undefined, p.english)}
                          className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-900 opacity-60'
                              : isSelected
                              ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-sm'
                              : 'bg-white border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          {p.english}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Engine 3: Sentence Builder */}
              {game.gameType === 'sentence_builder' && (
                <div className="space-y-4 pt-2">
                  {/* Assembled Sentence Box */}
                  <div className="min-h-16 p-3 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 flex flex-wrap gap-2 items-center justify-center">
                    {assembledSentence.length === 0 ? (
                      <span className="text-xs text-gray-400">
                        {t('انقر على الكلمات أدناه لترتيب الجملة بالترتيب الصحيح', 'Click words below to assemble the sentence')}
                      </span>
                    ) : (
                      assembledSentence.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveWordFromSentence(word, idx)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-arabic font-bold text-sm shadow-xs cursor-pointer hover:bg-red-600 transition-colors"
                        >
                          {word} ×
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Words Pool */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {availableWords.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddWordToSentence(word, idx)}
                        className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-gray-800 font-arabic font-bold text-sm hover:border-emerald-500 shadow-xs cursor-pointer transition-all hover:scale-105"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {!isAnswered && (
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={handleVerifySentence}
                        disabled={assembledSentence.length === 0}
                        className="px-6 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer disabled:opacity-50"
                      >
                        {t('تحقق من الجملة', 'Check Sentence')}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback and Explanation */}
              {isAnswered && (
                <div className={`p-4 rounded-2xl border ${
                  isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="text-emerald-900">{t('إجابة صحيحة! أحسنت 🌟', 'Correct Answer! Great Job 🌟')}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-900">{t('إجابة خاطئة. الإجابة الصحيحة هي: ', 'Incorrect. The correct answer is: ')} {currentQ?.correctAnswer}</span>
                      </>
                    )}
                  </div>
                  {currentQ?.explanationAr && (
                    <p className="text-xs text-gray-600 mt-1">
                      {currentQ.explanationAr}
                    </p>
                  )}
                </div>
              )}

              {/* Next Question Navigation */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t('السؤال التالي', 'Next Question')}</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
