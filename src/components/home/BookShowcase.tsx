import React from 'react';
import { Book } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Download, ShoppingBag, CheckCircle, ShieldCheck, Eye, Sparkles } from 'lucide-react';

interface BookShowcaseProps {
  book: Book;
  currency: 'USD' | 'AED';
  onReadOnline: (book: Book) => void;
  onPurchaseBook: (book: Book) => void;
}

export const BookShowcase: React.FC<BookShowcaseProps> = ({
  book,
  currency,
  onReadOnline,
  onPurchaseBook
}) => {
  const { t } = useLanguage();
  const { canAccessBook, canDownloadBook } = useAuth();

  const price = currency === 'USD' ? `$${book.priceUSD.toFixed(2)}` : `${book.priceAED.toFixed(0)} د.إ`;
  const hasAccess = canAccessBook(book.id);
  const hasDownload = canDownloadBook(book.id);

  return (
    <section id="book-showcase" className="py-20 bg-gradient-to-b from-[#FCFBF8] to-[#F7F1E5] relative border-b border-[#e6d7c1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#78350f] text-xs font-bold mb-3 border border-amber-300 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('المنهج التعليمي المعتمد', 'Official Course Textbook')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2a170d] font-arabic">
            {t('كتاب مدخل إلى اللغة العربية لغير الناطقين بها', 'An Introduction to Arabic for Non-Native Speakers')}
          </h2>
          <p className="mt-3 text-base text-[#5c3a21] font-arabic font-medium">
            {t(
              'المرجع التعليمي الأساسي للمنصة — إعداد المعلم أحمد نبيل النحراوي. يتضمن 10 فصول، حوارات حية، تدريبات تواصلية، ومفردات مشكولة بالكامل.',
              'The core textbook behind our curriculum by Teacher Ahmed Nabil Al-Nahrawy. Featuring 10 structured chapters, real-world dialogues, communicative tasks, and fully vocalized Arabic.'
            )}
          </p>
        </div>

        {/* 3D Book Presentation Card */}
        <div className="bg-[#fffdfa] rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#e5d4be] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3D Double Book View (Front and Back Cover) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6">
            
            {/* Front Cover Card - Clickable */}
            <div 
              onClick={() => onReadOnline(book)}
              className="relative group perspective-[1000px] cursor-pointer"
              title={t('انقر لقراءة وتصفح الكتاب أونلاين', 'Click to read book online')}
            >
              <div className="w-52 h-72 sm:w-56 sm:h-80 rounded-xl overflow-hidden shadow-2xl border-2 border-amber-400 bg-gradient-to-br from-[#5D3217] via-[#46230E] to-[#361808] p-4 flex flex-col justify-between text-center relative transition-transform duration-500 group-hover:scale-105 group-hover:border-amber-300">
                <div className="border border-amber-300/60 h-full rounded-lg p-3 flex flex-col justify-between bg-gradient-to-b from-[#4F2A14] to-[#381B0B]">
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    {t('الطبعة الأولى المعتمدة', 'First Edition')}
                  </div>
                  <div>
                    <div className="text-amber-200 text-xs font-arabic">كِتَابُ المَنْهَجِ المـُعْتَمَدِ</div>
                    <div className="text-2xl font-black text-amber-300 font-arabic my-1">
                      الـنَّـبِـيـل
                    </div>
                    <div className="text-xs font-extrabold text-amber-100 font-arabic">فِي اللُّغَةِ العَرَبِيَّةِ لِلأَعَاجِم</div>
                    <div className="text-[9px] text-amber-200/90 font-arabic">(مدخل لغير الناطقين بها)</div>
                  </div>
                  <div className="pt-2 border-t border-amber-400/40">
                    <div className="text-[9px] text-amber-300/90">{t('إعداد المعلم المشرف', 'By')}</div>
                    <div className="text-xs font-bold text-amber-200 font-arabic">أحمد نبيل النحراوي</div>
                  </div>
                </div>
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#361808]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                  <BookOpen className="w-8 h-8 text-amber-300 mb-2 animate-bounce" />
                  <span className="text-xs font-black text-amber-200">{t('انقر لفتح وتصفح الكتاب', 'Click to open book')}</span>
                </div>
              </div>
              <div className="mt-2 text-center text-xs font-bold text-[#78350f] flex items-center justify-center gap-1 font-arabic">
                <Eye className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('غلاف الكتاب (انقر للقراءة)', 'Front Cover (Click to Read)')}</span>
              </div>
            </div>

            {/* Back Cover Card (Goal of This Book) - Also Clickable */}
            <div 
              onClick={() => onReadOnline(book)}
              className="relative group hidden sm:block perspective-[1000px] cursor-pointer"
              title={t('انقر لقراءة وتصفح الكتاب أونلاين', 'Click to read book online')}
            >
              <div className="w-48 h-68 sm:w-52 sm:h-74 rounded-xl overflow-hidden shadow-xl border-2 border-amber-400/70 bg-gradient-to-br from-[#5D3217] via-[#46230E] to-[#361808] p-4 flex flex-col justify-between text-center relative group-hover:border-amber-300 transition-colors">
                <div className="border border-amber-300/50 h-full rounded-lg p-3 flex flex-col justify-between text-[10px] text-amber-100/90 leading-relaxed bg-gradient-to-b from-[#4F2A14] to-[#381B0B]">
                  <div className="font-bold text-amber-300 text-xs font-arabic">{t('هدف الكتاب', 'Goal of Book')}</div>
                  <p className="line-clamp-6 text-[9px] text-amber-100/90 font-arabic">
                    {book.descriptionAr}
                  </p>
                  <div className="border-t border-amber-400/40 pt-1 text-[8px] text-amber-300 font-mono">
                    ISBN: 978-603-456-789-3
                  </div>
                </div>
                <div className="absolute inset-0 bg-[#361808]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                  <BookOpen className="w-6 h-6 text-amber-300 mb-1" />
                  <span className="text-[11px] font-bold text-amber-200">{t('تصفح الكتاب أونلاين', 'Browse Book Online')}</span>
                </div>
              </div>
              <div className="mt-2 text-center text-xs font-bold text-[#8c522a] font-arabic">{t('غلاف الكتاب الخلفي', 'Back Cover')}</div>
            </div>

          </div>

          {/* Right Column: Book Specs & Purchase / Read Online Options */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-[#78350f] border border-amber-300">
                {book.levelAr}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f5ecde] text-[#5c2d11] border border-[#e2d0b8]">
                {book.totalPages} {t('صفحة تعليمية', 'Pages')}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                PDF + {t('قارئ إلكتروني تفاعلي', 'Interactive Reader')}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#26150a] font-arabic">
                {t(book.titleAr, book.title)}
              </h3>
              <p className="text-sm font-semibold text-[#8b4513] mt-1 font-arabic">
                {t(book.authorAr, book.author)}
              </p>
            </div>

            <p className="text-sm text-[#4a2e1b] leading-relaxed font-arabic">
              {t(book.descriptionAr, book.description)}
            </p>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#3d2314] pt-2 font-arabic font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{t('10 فصول و 30 وحدة تواصلية', '10 Chapters & 30 communicative units')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{t('مفردات مصحوبة بالتشكيل والترجمة', 'Vocalized words with English translations')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{t('تدريبات عملية ومواقف حياتية واقعية', 'Practical real-life situational drills')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{t('إمكانية القراءة المباشرة من المتصفح', 'In-browser digital reading experience')}</span>
              </div>
            </div>

            {/* Price & Purchase Bar */}
            <div className="p-4 rounded-2xl bg-[#faf5ec] border border-[#e8dcc7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#785338] block font-medium">{t('السعر للشراء المنفصل', 'Standalone Purchase Price')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#26150a]">{price}</span>
                  <span className="text-xs text-gray-400 line-through">
                    {currency === 'USD' ? '$45.00' : '165 د.إ'}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    {t('خصم 35%', '35% OFF')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onReadOnline(book)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-amber-600 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <BookOpen className="w-4 h-4 text-amber-200" />
                  <span>{t('فتح القارئ / رفع كتابك الجديد (PDF)', 'Open Reader / Upload New Book (PDF)')}</span>
                </button>

                {hasDownload ? (
                  <button
                    onClick={() => onReadOnline(book)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#4a2612] hover:bg-[#381c0c] text-amber-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>{t('تحميل النسخة الكاملة PDF', 'Download Full PDF')}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onPurchaseBook(book)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md border border-amber-300"
                  >
                    <ShoppingBag className="w-4 h-4 fill-current" />
                    <span>{t('شراء الكتاب الآن', 'Buy Book Now')}</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-[11px] text-[#7d5d44] flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('متاح للشراء بالدولار والدرهم الإماراتي مع إمكانية التحميل الفوري بعد الدفع.', 'Secure checkout in USD and AED with instant download upon payment.')}</span>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
