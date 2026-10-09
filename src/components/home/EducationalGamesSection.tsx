import React from 'react';
import { Game } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Gamepad2, Play, Sparkles, Trophy, Zap, Target, Brain, Shuffle } from 'lucide-react';

interface EducationalGamesSectionProps {
  games: Game[];
  onPlayGame: (game: Game) => void;
}

export const EducationalGamesSection: React.FC<EducationalGamesSectionProps> = ({ games, onPlayGame }) => {
  const { t } = useLanguage();

  const gameTypes = [
    { type: 'match_words', nameAr: 'توصيل الكلمات', nameEn: 'Match Words', icon: Shuffle, descAr: 'طابق المفردات العربية مع معانيها الإنجليزية' },
    { type: 'multiple_choice', nameAr: 'تحدي الخيارات', nameEn: 'Multiple Choice', icon: Target, descAr: 'اختر الإجابة الصحيحة بسرعة ودقة' },
    { type: 'sentence_builder', nameAr: 'بناء الجمل', nameEn: 'Sentence Builder', icon: Brain, descAr: 'رتّب الكلمات لتكوين جمل عربية صحيحة' },
    { type: 'memory_game', nameAr: 'لعبة الذاكرة', nameEn: 'Memory Cards', icon: Sparkles, descAr: 'اقلب البطاقات وطابق الكلمات المشكولة' },
    { type: 'speed_challenge', nameAr: 'سباق السرعة', nameEn: 'Speed Challenge', icon: Zap, descAr: 'أجب قبل انتهاء العداد واجمع أعلى النقاط' },
    { type: 'true_false', nameAr: 'صحيح أم خطأ', nameEn: 'True / False', icon: Trophy, descAr: 'اختبر فهمك للقواعد والمذكر والمؤنث' },
  ];

  return (
    <section id="games" className="py-20 bg-[#1c0d05] text-[#f7ebd8] relative overflow-hidden border-b border-amber-900/40">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>{t('تعلّم وتنافس بدون ملل', 'Gamified Learning')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fff7ed] font-arabic">
            {t('لعبة تعليمية فريدة لكل درس', 'A Unique Educational Game for Every Lesson')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 font-arabic">
            {t(
              'لا نكتفي بالقراءة فقط؛ صممنا لكل وحدة في كتاب النبيل لعبة تعليمية تفاعلية ترسخ المفردات وتكافئك بالنقاط وسلاسل الإتقان (Streaks).',
              'We don’t just teach theory. Every unit in the textbook has its own interactive game engine reinforcing vocabulary, testing comprehension, and rewarding accuracy with streaks and badges.'
            )}
          </p>
        </div>

        {/* 6 Game Engines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gameTypes.map((item, idx) => {
            const Icon = item.icon;
            // Find an active game for this type if exists
            const sampleGame = games.find((g) => g.gameType === item.type) || games[0];

            return (
              <div
                key={idx}
                className="bg-[#2a150b]/80 rounded-2xl p-6 border border-amber-900/60 hover:border-amber-400/60 hover:bg-[#341b0e] transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-100 font-arabic mb-1">
                    {t(item.nameAr, item.nameEn)}
                  </h3>
                  <p className="text-xs text-amber-200/70 leading-relaxed mb-4 font-arabic">
                    {t(item.descAr, item.descAr)}
                  </p>
                </div>

                {sampleGame && (
                  <button
                    onClick={() => onPlayGame(sampleGame)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md border border-amber-300"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t('جرّب اللعبة الآن', 'Play Demo Game')}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
