import React from 'react';
import { MembershipPlan } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Crown, Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface MembershipCardsProps {
  plans: MembershipPlan[];
  currency: 'USD' | 'AED';
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const MembershipCards: React.FC<MembershipCardsProps> = ({
  plans,
  currency,
  onSelectPlan
}) => {
  const { t, dir } = useLanguage();

  return (
    <section id="memberships" className="py-20 bg-[#FAF7F2] relative border-b border-[#e6d8c3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#78350f] text-xs font-bold mb-3 border border-amber-300">
            <Crown className="w-3.5 h-3.5" />
            <span>{t('باقات مرنة ومناسبة للجميع', 'Flexible Membership Plans')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2a170d] font-arabic">
            {t('اختر باقة الاشتراك المناسبة لرحلتك', 'Choose Your Arabic Learning Plan')}
          </h2>
          <p className="mt-3 text-base text-[#5c3a21] font-arabic">
            {t(
              'خيارات اشتراك شهرية مرنة بالدولار الأمريكي والدرهم الإماراتي تناسب المتعلمين في أمريكا وأوروبا ودبي وجميع أنحاء العالم.',
              'Transparent pricing in USD and AED crafted for learners in the USA, Europe, Dubai, and worldwide. Cancel anytime.'
            )}
          </p>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = currency === 'USD' ? `$${plan.priceUSD.toFixed(0)}` : `${plan.priceAED.toFixed(0)} د.إ`;
            const isFeatured = plan.isFeatured;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E7] to-[#F5E6D2] text-[#2A160B] shadow-2xl border-2 border-amber-400 ring-2 ring-amber-300/50 transform lg:-translate-y-2'
                    : 'bg-white text-[#24130a] shadow-lg border-2 border-[#EADFCF] hover:border-amber-400'
                }`}
              >
                {/* Popular Pill */}
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-[#24130a] px-4 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 uppercase tracking-wide border border-amber-300">
                    <Sparkles className="w-3.5 h-3.5 fill-[#24130a]" />
                    <span>{t('الخطة الأكثر طلباً', 'Most Popular')}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className={`text-xl font-black font-arabic ${isFeatured ? 'text-amber-950' : 'text-[#2a170d]'}`}>
                      {t(plan.nameAr, plan.name)}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed min-h-[36px] font-arabic ${isFeatured ? 'text-[#6A4021]' : 'text-[#704a2c]'}`}>
                    {t(plan.taglineAr, plan.tagline)}
                  </p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-amber-300/60">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-[#2A160B]">{price}</span>
                      <span className="text-xs font-bold text-amber-800">
                        / {t('شهرياً', 'month')}
                      </span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider block text-amber-900">
                      {t('المميزات المتضمنة:', 'What’s included:')}
                    </span>
                    {(plan.featuresAr || plan.features).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed font-arabic">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isFeatured ? 'bg-amber-200 text-amber-900' : 'bg-amber-100 text-[#78350f]'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[#3d2314] font-medium">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isFeatured
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] shadow-amber-500/20 border border-amber-300'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                  }`}
                >
                  <span>{t('اشترك في هذه الباقة', 'Subscribe to Plan')}</span>
                  {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
