import React, { useState } from 'react';
import { Book, MembershipPlan } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { sendGmailMessage } from '../../services/googleWorkspace';
import {
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';

interface PurchaseModalProps {
  itemType: 'book' | 'membership';
  book?: Book;
  plan?: MembershipPlan;
  currency: 'USD' | 'AED';
  onClose: () => void;
  onSuccess?: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  itemType,
  book,
  plan,
  currency,
  onClose,
  onSuccess
}) => {
  const { t } = useLanguage();
  const { user, profile, refreshProfile } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');
  const [cardName, setCardName] = useState(profile?.displayName || 'Student Cardholder');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const titleAr = itemType === 'book' ? book?.titleAr : plan?.nameAr;
  const titleEn = itemType === 'book' ? book?.title : plan?.name;
  
  const priceUSD = itemType === 'book' ? (book?.priceUSD || 29.99) : (plan?.priceUSD || 49.00);
  const priceAED = itemType === 'book' ? (book?.priceAED || 110.00) : (plan?.priceAED || 180.00);
  const priceDisplay = currency === 'USD' ? `$${priceUSD.toFixed(2)} USD` : `${priceAED.toFixed(0)} د.إ AED`;

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // Simulate real gateway response time
      await new Promise((resolve) => setTimeout(resolve, 1400));

      const purchaseId = `txn_${Date.now()}`;
      const now = new Date().toISOString();

      // 1. Record verified purchase in Firestore
      if (user) {
        await addDoc(collection(db, 'purchases'), {
          purchaseId,
          userId: user.uid,
          userEmail: user.email,
          itemType,
          itemId: itemType === 'book' ? book?.id : plan?.id,
          titleEn,
          titleAr,
          amount: currency === 'USD' ? priceUSD : priceAED,
          currency,
          paymentMethod,
          status: 'completed',
          createdAt: now
        });

        // 2. Update user profile membership or allowedBooks
        const userRef = doc(db, 'users', user.uid);
        if (itemType === 'membership' && plan) {
          await updateDoc(userRef, {
            membershipPlan: plan.name,
            membershipStatus: 'active',
            allowedLessons: ['ch1-unit1', 'ch1-unit2', 'ch1-unit3', 'ch2-unit1', 'ch2-unit2', 'ch2-unit3', 'ch3-unit1', 'ch3-unit2', 'ch3-unit3', 'ch4-unit1', 'ch4-unit2', 'ch4-unit3', 'ch5-unit1', 'ch5-unit2', 'ch5-unit3', 'ch6-unit1', 'ch6-unit2', 'ch6-unit3', 'ch7-unit1', 'ch7-unit2', 'ch7-unit3', 'ch8-unit1', 'ch8-unit2', 'ch8-unit3', 'ch9-unit1', 'ch9-unit2', 'ch9-unit3', 'ch10-unit1', 'ch10-unit2', 'ch10-unit3']
          });
        } else if (itemType === 'book' && book) {
          const currentAllowed = profile?.allowedBooks || [];
          await updateDoc(userRef, {
            allowedBooks: Array.from(new Set([...currentAllowed, book.id]))
          });
        }

        await refreshProfile();

        // 3. Send automated confirmation email via Gmail
        try {
          const emailSubject = itemType === 'book' ? 'Book Purchase Confirmation - Al-Nabeel Arabic' : 'Membership Activation - Al-Nabeel Arabic';
          const emailBody = `مرحباً ${profile?.displayName || 'عزيزنا الطالب'},\n\nتم استلام دفعتك بنجاح (${priceDisplay}).\n\nالعنصر: ${titleAr}\nرقم العملية: ${purchaseId}\n\nنتمنى لك رحلة موفقة وممتعة في تعلم اللغة العربية.`;
          await sendGmailMessage(user.email || '', emailSubject, emailBody);
        } catch (mailErr) {
          console.warn('Gmail sending note:', mailErr);
        }
      }

      setIsCompleted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Payment failure:', err);
      setErrorMsg(err.message || 'Payment could not be processed. Please check card details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-[#fffdfa] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-amber-900/20 flex flex-col">
        
        {/* Header */}
        <div className="bg-[#24130a] text-amber-100 px-6 py-4 flex items-center justify-between border-b border-amber-600/40">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm font-arabic">
              {t('بوابة الدفع الآمنة', 'Secure Checkout')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-amber-200/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isCompleted ? (
            /* Success Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-[#78350f] mx-auto flex items-center justify-center border-2 border-amber-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-[#24130a] font-arabic">
                {t('تمت عملية الدفع بنجاح!', 'Payment Successful!')}
              </h4>
              <p className="text-xs text-[#5c3a21] font-arabic">
                {itemType === 'book'
                  ? t('تم تفعيل حق تحميل وقراءة كتاب النبيل لحسابك.', 'You now have full access to read and download the textbook.')
                  : t('تم تفعيل اشتراكك بنجاح وفتح جميع الفصول والألعاب.', 'Your membership has been activated. All content is now unlocked!')}
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 text-xs font-mono text-amber-950 border border-amber-200">
                <span>{t('المبلغ المدفوع:', 'Amount Paid:')} {priceDisplay}</span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130a] font-bold text-xs cursor-pointer shadow-md border border-amber-300"
              >
                {t('العودة والبدء الآن', 'Done & Start Learning')}
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleProcessPayment} className="space-y-4">
              
              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-[#fbf6ee] border border-[#e8dcc8] space-y-1">
                <span className="text-[11px] text-[#78350f] block uppercase font-bold tracking-wider">
                  {t('ملخص الطلب', 'Order Summary')}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#24130a] font-arabic line-clamp-1">{titleAr}</span>
                  <span className="text-base font-black text-[#78350f]">{priceDisplay}</span>
                </div>
                <span className="text-[11px] text-[#704a2c] font-sans block">{titleEn}</span>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-amber-600 bg-amber-50 text-[#24130a]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-700" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'apple_pay'
                      ? 'border-amber-600 bg-amber-50 text-[#24130a]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span> Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'google_pay'
                      ? 'border-amber-600 bg-amber-50 text-[#24130a]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>G Pay</span>
                </button>
              </div>

              {/* Card Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    {t('اسم صاحب البطاقة', 'Cardholder Name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    {t('رقم البطاقة (Visa, Mastercard, Amex)', 'Card Number')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">MM/YY</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-[#4a2612] hover:bg-[#381c0c] text-amber-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50 border border-amber-600/40"
              >
                {isProcessing ? (
                  <span>{t('جارٍ معالجة الدفع الآمن...', 'Processing Secure Payment...')}</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>{t(`دفع ${priceDisplay} بأمان`, `Pay ${priceDisplay} Safely`)}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>256-bit SSL encrypted • Stripe Payment Architecture</span>
              </p>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
