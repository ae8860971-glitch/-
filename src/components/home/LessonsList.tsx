import React, { useState } from 'react';
import { Lesson } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { speakArabic } from '../../services/audio';
import {
  BookOpen,
  Volume2,
  Lock,
  Unlock,
  Play,
  CheckCircle2,
  Sparkles,
  Gamepad2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LessonsListProps {
  lessons: Lesson[];
  onOpenLesson: (lesson: Lesson) => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({ lessons, onOpenLesson }) => {
  const { t } = useLanguage();
  const { canAccessLesson } = useAuth();
  const [selectedChapter, setSelectedChapter] = useState<number | null>(1); // Chapter 1 opened by default

  // Group lessons by Chapter Number
  const chaptersMap = new Map<number, Lesson[]>();
  lessons.forEach((l) => {
    const list = chaptersMap.get(l.chapterNumber) || [];
    list.push(l);
    chaptersMap.set(l.chapterNumber, list);
  });

  const chapters = Array.from(chaptersMap.entries()).sort((a, b) => a[0] - b[0]);

  return (
    <section id="lessons" className="py-20 bg-[#FAF7F2] relative border-b border-[#e6d8c3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#78350f] text-xs font-bold mb-3 border border-amber-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('فهرس الكتاب والدروس التفاعلية', 'Textbook Units & Interactive Lessons')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2a170d] font-arabic">
            {t('خطة المنهج الدراسي المتكامل', 'The Complete Arabic Curriculum')}
          </h2>
          <p className="mt-3 text-base text-[#5c3a21] font-arabic">
            {t(
              '30 وحدة تعليمية مقسمة على 10 فصول أساسية. كل وحدة تحتوي على نص أصلي، حوار واقعي، مفردات صوتية، تدريبات، ولعبة تعليمية مخصصة.',
              '30 educational units across 10 core chapters. Every unit contains original textbook material, audio vocabulary, exercises, and its own dedicated educational game.'
            )}
          </p>
        </div>

        {/* Chapters Accordion / List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {chapters.map(([chapterNum, chapterLessons]) => {
            const isExpanded = selectedChapter === chapterNum;
            const firstLesson = chapterLessons[0];
            const chapterTitleAr = firstLesson?.chapterTitleAr || `الفصل ${chapterNum}`;
            const chapterTitleEn = firstLesson?.chapterTitleEn || `Chapter ${chapterNum}`;

            return (
              <div
                key={chapterNum}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-amber-400/80 bg-[#fbf8f2] shadow-md ring-1 ring-amber-400/30'
                    : 'border-[#e8dac7] bg-white hover:border-amber-300'
                }`}
              >
                {/* Chapter Header Button */}
                <button
                  onClick={() => setSelectedChapter(isExpanded ? null : chapterNum)}
                  className="w-full px-6 py-5 flex items-center justify-between text-start cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                      isExpanded ? 'bg-[#3d2012] text-amber-300 border border-amber-500/40 shadow-xs' : 'bg-[#f4ecdf] text-[#4a2818]'
                    }`}>
                      {chapterNum}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2a170d] font-arabic">
                        {t(chapterTitleAr, chapterTitleEn)}
                      </h3>
                      <p className="text-xs text-[#704a2c]">
                        {chapterLessons.length} {t('وحدات تعليمية مع ألعاب واختبارات', 'Units with games & quizzes')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {chapterNum === 1 && (
                      <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                        {t('تجربة مجانية', 'Free Trial Included')}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-amber-800" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-amber-800/60" />
                    )}
                  </div>
                </button>

                {/* Chapter Lessons / Units List */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#ede0cc] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chapterLessons.map((lesson) => {
                      const hasAccess = canAccessLesson(lesson.id, lesson.isTrialFree);

                      return (
                        <div
                          key={lesson.id}
                          className="bg-[#fffdf9] rounded-xl p-4 border border-[#e8dac7] shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] font-bold text-[#78350f] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                                {t(`وحدة ${lesson.unitNumber}`, `Unit ${lesson.unitNumber}`)}
                              </span>
                              {hasAccess ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700">
                                  <Unlock className="w-3 h-3" />
                                  <span>{t('متاح', 'Unlocked')}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-400">
                                  <Lock className="w-3 h-3" />
                                  <span>{t('مقفل', 'Locked')}</span>
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold text-sm text-[#2a170d] font-arabic mb-1">
                              {t(lesson.titleAr, lesson.titleEn)}
                            </h4>
                            <p className="text-[11px] text-[#704a2c] line-clamp-2 font-arabic">
                              {t(lesson.unitTitleAr, lesson.unitTitleEn)} • {t(`صفحة ${lesson.pageStart}`, `Page ${lesson.pageStart}`)}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#f0e4d3] flex items-center justify-between gap-2">
                            {/* Pronunciation sample button */}
                            {lesson.vocabulary[0] && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakArabic(lesson.vocabulary[0].arabic);
                                }}
                                className="p-2 rounded-lg text-amber-800 hover:bg-amber-100/60 transition-colors"
                                title={t('استمع لنطق الكلمة الأولى', 'Listen to sample pronunciation')}
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            )}

                            {/* Open Lesson Button */}
                            <button
                              onClick={() => onOpenLesson(lesson)}
                              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                hasAccess
                                  ? 'bg-[#4a2612] hover:bg-[#381c0c] text-amber-200 shadow-xs'
                                  : 'bg-[#f4ecdf] hover:bg-amber-100 text-[#4a2818] hover:text-amber-950'
                              }`}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{hasAccess ? t('ابدأ الدرس', 'Start Lesson') : t('استكشف الدرس', 'Preview Lesson')}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
