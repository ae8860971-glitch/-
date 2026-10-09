import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, BookOpen, Crown, Play, ShieldAlert, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Hero3DProps {
  onStartLearning: () => void;
  onExploreBook: () => void;
  onViewMemberships: () => void;
  headlineAr?: string;
  headlineEn?: string;
  subtitleAr?: string;
  subtitleEn?: string;
}

export const Hero3D: React.FC<Hero3DProps> = ({
  onStartLearning,
  onExploreBook,
  onViewMemberships,
  headlineAr = 'تعلَّم العربية مع النبيل للأعاجم',
  headlineEn = 'Learn Arabic with Al-Nabeel',
  subtitleAr = 'منصة تعليمية متكاملة لغير الناطقين بالعربية تجمع بين منهج الكتاب المعتمد، والألعاب التفاعلية، وفيديوهات الشرح، والحصص المباشرة عبر Google Meet.',
  subtitleEn = 'Master Arabic with interactive textbook curriculum, educational games, video lessons, and live classes powered by Google Meet.'
}) => {
  const { lang, t, dir } = useLanguage();
  const [bookOpened, setBookOpened] = useState(true);

  // Floating Arabic letters emerging from the book
  const letters = [
    { char: 'أ', top: '15%', left: '18%', delay: '0s', size: 'text-3xl' },
    { char: 'ب', top: '22%', left: '78%', delay: '1.2s', size: 'text-2xl' },
    { char: 'كِتَابٌ', top: '8%', left: '46%', delay: '0.6s', size: 'text-lg font-bold' },
    { char: 'مَرْحَبًا', top: '75%', left: '12%', delay: '2.1s', size: 'text-base font-semibold' },
    { char: 'نَـبِـيـل', top: '68%', left: '76%', delay: '1.8s', size: 'text-xl font-bold' },
    { char: 'سَلَام', top: '35%', left: '86%', delay: '2.7s', size: 'text-sm' },
    { char: 'ض', top: '48%', left: '8%', delay: '3.1s', size: 'text-2xl' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F3E7D5] text-[#2A160B] pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-[#E5D7C2]">
      {/* Decorative Islamic Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(180, 83, 9, 0.25) 2px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-start">
            
            {/* 3-Day Free Trial Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <span className="text-xs font-bold text-amber-900">
                {t('تجربة مجانية لمدة 3 أيام متاحة الآن', '3-Day Free Trial Available Now')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.2] text-[#2B150A] font-arabic">
              <span className="block">{t(headlineAr, headlineEn)}</span>
              <span className="block mt-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent">
                {t('لغير الناطقين بالعربية', 'For Non-Native Speakers')}
              </span>
            </h1>

            {/* Author Credential */}
            <p className="text-sm font-bold text-[#6C4022] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span>{t('إعداد المعلم أحمد نبيل النحراوي — معلم اللغة العربية', 'By Teacher Ahmed Nabil Al-Nahrawy — Arabic Language Educator')}</span>
            </p>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#52331C] leading-relaxed max-w-2xl font-arabic font-medium">
              {t(subtitleAr, subtitleEn)}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={onStartLearning}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] font-black shadow-lg shadow-amber-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer text-sm border border-amber-300"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t('ابدأ التعلّم الآن', 'Start Learning')}</span>
                {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={onExploreBook}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-[#3C2111] font-bold border-2 border-amber-500/70 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>{t('قارئ الكتاب / رفع كتاب جديد (PDF)', 'Book Reader / Upload New PDF')}</span>
              </button>

              <button
                onClick={onViewMemberships}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#553018] font-bold border border-amber-300 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Crown className="w-4 h-4 text-amber-700" />
                <span>{t('باقات الاشتراك', 'View Memberships')}</span>
              </button>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E5D7C2] text-xs text-[#52331C] font-semibold w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{t('10 فصول و 30 وحدة', '10 Chapters & 30 Units')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{t('حصص مباشرة Google Meet', 'Google Meet Live Classes')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{t('شهادة إتمام معتمدة', 'Official Verified Certificate')}</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Arabic Book Animation & Floating Calligraphy */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-8">
            <div className="relative w-full max-w-md h-[400px] flex items-center justify-center perspective-[1200px]">
              
              {/* Floating Letters & Words */}
              {letters.map((item, index) => (
                <div
                  key={index}
                  className={`absolute ${item.size} font-arabic text-amber-700/40 drop-shadow-[0_2px_4px_rgba(217,119,6,0.3)] animate-pulse pointer-events-none select-none transition-all duration-1000`}
                  style={{
                    top: item.top,
                    left: item.left,
                    animationDuration: `${3.5 + index * 0.7}s`,
                    animationDelay: item.delay,
                  }}
                >
                  {item.char}
                </div>
              ))}

              {/* 3D Book Container - Interactive Book */}
              <div 
                onClick={onExploreBook}
                className="relative cursor-pointer transition-transform duration-500 transform hover:scale-105 group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(-16deg) rotateX(8deg)',
                }}
                role="button"
                tabIndex={0}
                title={t('انقر لفتح واستكشاف كتاب النبيل في اللغة العربية للأعاجم أونلاين', 'Click to open and explore the book online')}
              >
                {/* 3D Book Glow and Shadow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/30 to-amber-400/20 rounded-3xl blur-xl group-hover:opacity-100 opacity-60 transition-opacity"></div>
                <div className="absolute -bottom-8 left-4 right-4 h-10 bg-black/60 blur-xl rounded-full"></div>

                {/* The 3D Book Object */}
                <div className="relative w-68 h-92 sm:w-76 sm:h-[410px] rounded-r-2xl rounded-l-md shadow-2xl transition-all duration-500 bg-gradient-to-r from-[#2a160c] via-[#201007] to-[#140904] p-1.5 border-2 border-amber-400/80 flex flex-col justify-between group-hover:border-amber-300">
                  
                  {/* Book Spine Simulation */}
                  <div className="absolute left-0 top-0 bottom-0 w-7 bg-gradient-to-r from-[#1b0c05] via-[#241108] to-[#3a1d0f] rounded-l-md border-r border-amber-500/40 flex flex-col items-center justify-between py-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <div className="text-[10px] text-amber-300 font-arabic font-bold [writing-mode:vertical-rl] tracking-wider">
                      الـنَّـبِـيـل
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  </div>

                  {/* Book Cover Frame (Islamic Ornate border) */}
                  <div className="ml-6 h-full rounded-r-xl border border-amber-400/50 p-5 flex flex-col items-center justify-between text-center relative overflow-hidden bg-gradient-to-b from-[#29150b] via-[#1f0f07] to-[#140904]">
                    
                    {/* Top Ornate Header */}
                    <div className="w-full flex items-center justify-center gap-2 text-amber-400 text-[10px] font-bold tracking-widest uppercase">
                      <span>❖</span>
                      <span>{t('المنهج التعليمي المعتمد', 'Official Accredited Curriculum')}</span>
                      <span>❖</span>
                    </div>

                    {/* Book Cover Title - Clearly Named Al-Nabeel */}
                    <div className="my-auto space-y-2.5">
                      <div className="inline-block px-3 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold font-arabic">
                        {t('كتاب المنهج الدراسي', 'Textbook Curriculum')}
                      </div>

                      <div className="text-3xl sm:text-4xl font-black text-amber-400 font-arabic tracking-wide drop-shadow-md leading-tight">
                        الـنَّـبِـيـل
                      </div>

                      <div className="text-sm sm:text-base font-extrabold text-amber-100 font-arabic">
                        فِي اللُّغَةِ العَرَبِيَّةِ لِلأَعَاجِم
                      </div>

                      <div className="text-[11px] text-amber-200/80 font-medium font-arabic">
                        (مدخل إلى اللغة العربية لغير الناطقين بها)
                      </div>
                      
                      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2"></div>

                      <div className="text-[10px] text-amber-200/90 font-sans tracking-wide">
                        An Introduction to Arabic for Non-Native Speakers
                      </div>
                    </div>

                    {/* Author Bottom Plaque */}
                    <div className="w-full pt-3 border-t border-amber-500/40">
                      <div className="text-[10px] text-amber-200/80 font-semibold">{t('إعداد المعلم المشرف', 'Prepared by Lead Teacher')}</div>
                      <div className="text-xs font-bold text-amber-300 font-arabic">أحمد نبيل النحراوي</div>
                      <div className="text-[9px] text-amber-300/70">{t('معلم اللغة العربية لغير الناطقين بها', 'Arabic Educator for Non-Native Speakers')}</div>
                    </div>

                    {/* Golden Corners */}
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400"></div>
                    <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400"></div>
                  </div>

                  {/* Interactive Open Hint Button */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-[#24130a] text-xs font-black shadow-lg flex items-center gap-1.5 whitespace-nowrap animate-pulse group-hover:scale-105 transition-transform border border-amber-300">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t('📖 انقر هنا لفتح وتصفح الكتاب أونلاين', 'Click to open & read textbook online')}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
