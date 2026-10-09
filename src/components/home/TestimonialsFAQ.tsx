import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_TESTIMONIALS, INITIAL_FAQS } from '../../data/initialSiteSettings';
import { Star, ChevronDown, ChevronUp, MessageCircle, HelpCircle, Quote } from 'lucide-react';

export const TestimonialsFAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#FAF7F2] py-20 border-t border-[#e6d8c3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION 1: Testimonials from USA, Europe, Dubai */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#78350f] text-xs font-bold mb-3 border border-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{t('تجارب الطلاب حول العالم', 'Global Student Stories')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2a170d] font-arabic">
              {t('ماذا يقول طلاب النبيل في أمريكا وأوروبا ودبي؟', 'What International Students Say')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-[#fffdfa] rounded-3xl p-6 sm:p-8 border border-[#e5d4be] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
              >
                <Quote className="w-8 h-8 text-amber-500/20 absolute top-6 right-6" />
                
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4a2e1b] leading-relaxed font-arabic">
                    "{t(item.quoteAr, item.quoteEn)}"
                  </p>
                </div>

                <div className="pt-6 border-t border-[#f0e4d3] flex items-center gap-3 mt-6">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-400"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#2a170d] font-arabic">{item.name}</h4>
                    <p className="text-[11px] text-[#704a2c]">{item.role} • {item.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Interactive FAQ */}
        <div id="faq" className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#78350f] text-xs font-bold mb-3 border border-amber-300">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('الأسئلة الأكثر شيوعاً', 'Frequently Asked Questions')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2a170d] font-arabic">
              {t('إجابات واضحة لجميع استفساراتك', 'Clear Answers to Common Questions')}
            </h2>
          </div>

          <div className="space-y-3">
            {INITIAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-[#fffdfa] rounded-2xl border border-[#e5d4be] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 font-bold text-sm text-[#2a170d] hover:text-[#78350f] cursor-pointer"
                  >
                    <span className="font-arabic">{t(faq.questionAr, faq.questionEn)}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-700 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#4a2e1b] leading-relaxed border-t border-[#f0e4d3] font-arabic">
                      {t(faq.answerAr, faq.answerEn)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
