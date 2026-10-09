import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { askShelbyChat, ChatMessage, ShelbyAction, ShelbyActionType } from '../../services/gemini';
import { speakArabic } from '../../services/audio';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  RefreshCw,
  Minimize2,
  BookOpen,
  Video,
  Gamepad2,
  GraduationCap,
  Crown,
  Compass,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface ShelbyTutorChatProps {
  onOpenBook?: () => void;
  onNavigate?: (view: string) => void;
  onOpenBooking?: () => void;
  onOpenGame?: () => void;
  onOpenLesson?: () => void;
  onOpenCertificate?: () => void;
}

export const ShelbyTutorChat: React.FC<ShelbyTutorChatProps> = ({
  onOpenBook,
  onNavigate,
  onOpenBooking,
  onOpenGame,
  onOpenLesson,
  onOpenCertificate
}) => {
  const { t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeActions: ShelbyAction[] = [
    {
      type: 'open_book',
      labelAr: '📖 فتح قارئ كتاب المنهج',
      labelEn: '📖 Open Textbook',
      descriptionAr: 'قراءة صفحات المنهج الأصلي',
      descriptionEn: 'Browse curriculum pages'
    },
    {
      type: 'open_booking',
      labelAr: '🎙️ حجز حصة Google Meet',
      labelEn: '🎙️ Book Live Class',
      descriptionAr: 'مع المعلم أحمد نبيل النحراوي',
      descriptionEn: 'With Teacher Ahmed Nabil'
    },
    {
      type: 'open_games',
      labelAr: '🎮 الألعاب التعليمية',
      labelEn: '🎮 Educational Games',
      descriptionAr: 'تحديات ومسابقات لغوية',
      descriptionEn: 'Interactive language games'
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'مَرْحَبًا بِكَ! أَنَا «شَلَبِي» (Shelby AI)، المُسَاعِدُ الذَّكِيُّ وَالمُرْشِدُ الرَّسْمِيُّ لِمَنَصَّةِ النَّبِيلِ مَعَ المُعَلِّمِ أَحْمَد نَبِيل النَّحْرَاوِي.\n\nلَدَيَّ صَلَاحِيَّاتٌ كَامِلَةٌ لِتَوْجِيهِكَ مُبَاشَرَةً إِلَى أَيِّ خِدْمَةٍ تَحْتَاجُهَا فِي المَنَصَّةِ: الكِتَابُ، الحِصَصُ المَبَاشِرَةُ، الأَلْعَابُ، الدُّرُوسُ، أَوِ الشَّهَادَاتُ. كَيْفَ أُسَاعِدُكَ اليَوْمَ؟',
      timestamp: new Date().toISOString(),
      actions: initialWelcomeActions
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleActionClick = (actionType: ShelbyActionType) => {
    switch (actionType) {
      case 'open_book':
        if (onOpenBook) {
          onOpenBook();
        } else if (onNavigate) {
          onNavigate('book');
        }
        break;
      case 'open_booking':
        if (onOpenBooking) {
          onOpenBooking();
        } else if (onNavigate) {
          onNavigate('classes');
        }
        break;
      case 'open_classes':
        if (onNavigate) onNavigate('classes');
        break;
      case 'open_games':
        if (onOpenGame) {
          onOpenGame();
        } else if (onNavigate) {
          onNavigate('games');
        }
        break;
      case 'open_lessons':
        if (onOpenLesson) {
          onOpenLesson();
        } else if (onNavigate) {
          onNavigate('lessons');
        }
        break;
      case 'open_memberships':
        if (onNavigate) onNavigate('memberships');
        break;
      case 'open_certificates':
        if (onOpenCertificate) {
          onOpenCertificate();
        } else if (onNavigate) {
          onNavigate('certificates');
        }
        break;
      case 'open_dashboard':
        if (onNavigate) onNavigate('dashboard');
        break;
      default:
        break;
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || inputMsg).trim();
    if (!textToSend || isLoading) return;

    setInputMsg('');

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const { reply, actions } = await askShelbyChat(messages, textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toISOString(),
          actions: actions.length > 0 ? actions : undefined
        }
      ]);
    } catch (err) {
      console.error('Shelby chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: 'يسعدني مساعدتك دائماً! يمكنك استخدام أزرار التوجيه السريع أعلاه للوصول الفوري للكتاب والمحاضرات والألعاب.',
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white rounded-full shadow-2xl hover:shadow-amber-600/50 border-2 border-amber-300 transition-all transform hover:scale-105 cursor-pointer"
          aria-label="فتح شلبي المساعد الذكي"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-[#24130A] flex items-center justify-center font-bold text-sm shadow-md">
              ش
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></span>
          </div>
          <div className="text-start">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black font-arabic block leading-tight text-amber-100">
                شلبي الذكي
              </span>
              <span className="text-[9px] bg-amber-400/30 text-amber-200 px-1.5 py-0.2 rounded font-bold">
                مرشد المنصة
              </span>
            </div>
            <span className="text-[10px] text-amber-200/90 font-medium">
              توجيه الطلاب وممارسة العربية
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#FAF7F2] rounded-3xl w-84 sm:w-[410px] h-[560px] shadow-2xl border-2 border-amber-400/50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#381F11] via-[#4D2A17] to-[#381F11] text-amber-50 p-3.5 flex items-center justify-between border-b border-amber-600/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-[#24130A] flex items-center justify-center font-black text-sm shadow-md border border-amber-300">
                ش
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black font-arabic text-amber-100 leading-tight">
                    شلبي الذكي — مرشد المنصة التعليمية
                  </h4>
                </div>
                <span className="text-[10px] text-amber-300/90 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>متصل الآن • صلاحيات التوجيه والوصول السريع</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowNavMenu(!showNavMenu)}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                  showNavMenu ? 'bg-amber-500 text-[#24130a]' : 'bg-white/10 text-amber-200 hover:bg-white/20'
                }`}
                title="أدوات التوجيه السريع"
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-amber-300 hover:text-white transition-colors"
                title="إغلاق النافذة"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Navigator Bar (صلاحيات شلبي للتوجيه السريع) */}
          {showNavMenu && (
            <div className="bg-[#FFFDF9] px-3 py-2.5 border-b border-amber-200 shadow-inner">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-amber-900 font-arabic flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>صلاحيات شلبي للوصول السريع (انقر للانتقال الفوري):</span>
                </span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
                <button
                  onClick={() => handleActionClick('open_book')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold font-arabic whitespace-nowrap flex items-center gap-1 transition-transform active:scale-95 shadow-xs"
                >
                  <BookOpen className="w-3 h-3 text-amber-700" />
                  <span>📖 قارئ الكتاب</span>
                </button>
                <button
                  onClick={() => handleActionClick('open_booking')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold font-arabic whitespace-nowrap flex items-center gap-1 transition-transform active:scale-95 shadow-xs"
                >
                  <Video className="w-3 h-3 text-amber-700" />
                  <span>🎙️ المحاضرات المباشرة</span>
                </button>
                <button
                  onClick={() => handleActionClick('open_games')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold font-arabic whitespace-nowrap flex items-center gap-1 transition-transform active:scale-95 shadow-xs"
                >
                  <Gamepad2 className="w-3 h-3 text-amber-700" />
                  <span>🎮 الألعاب اللغوية</span>
                </button>
                <button
                  onClick={() => handleActionClick('open_lessons')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold font-arabic whitespace-nowrap flex items-center gap-1 transition-transform active:scale-95 shadow-xs"
                >
                  <GraduationCap className="w-3 h-3 text-amber-700" />
                  <span>📚 الدروس</span>
                </button>
                <button
                  onClick={() => handleActionClick('open_memberships')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold font-arabic whitespace-nowrap flex items-center gap-1 transition-transform active:scale-95 shadow-xs"
                >
                  <Crown className="w-3 h-3 text-amber-700" />
                  <span>💎 باقات الاشتراك</span>
                </button>
                <button
                  onClick={() => handleActionClick('open_dashboard')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold font-arabic whitespace-nowrap flex items-center gap-1 transition-transform active:scale-95 shadow-xs"
                >
                  <User className="w-3 h-3 text-amber-700" />
                  <span>👤 لوحة الطالب</span>
                </button>
              </div>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FCFBF8]">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1 shadow-xs">
                      ش
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[86%] text-xs leading-relaxed ${
                      isAssistant
                        ? 'bg-white border border-[#E9DFCE] text-[#2C170C] shadow-xs'
                        : 'bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-br-none shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line font-arabic font-medium leading-relaxed">
                      {msg.text}
                    </p>

                    {/* Interactive Action Cards if attached to assistant message */}
                    {isAssistant && msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-amber-100/80 space-y-1.5">
                        <span className="text-[10px] font-bold text-amber-800 font-arabic block">
                          🚀 صلاحيات التوجيه — اضغط للانتقال المباشر:
                        </span>
                        <div className="grid grid-cols-1 gap-1">
                          {msg.actions.map((act, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleActionClick(act.type)}
                              className="w-full text-start p-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300 text-amber-950 text-[11px] font-bold font-arabic flex items-center justify-between transition-all transform active:scale-[0.98] shadow-xs cursor-pointer group"
                            >
                              <div className="flex items-center gap-1.5">
                                <span>{act.labelAr}</span>
                                {act.descriptionAr && (
                                  <span className="text-[9px] font-normal text-amber-700 hidden sm:inline">
                                    • {act.descriptionAr}
                                  </span>
                                )}
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Audio read aloud for assistant messages */}
                    {isAssistant && (
                      <div className="mt-2 pt-1 border-t border-amber-100 flex justify-end">
                        <button
                          onClick={() => speakArabic(msg.text)}
                          className="p-1 rounded text-amber-800 hover:bg-amber-50 flex items-center gap-1 text-[10px] font-arabic font-bold cursor-pointer"
                          title="استمع للنطق الصوتي الصحيح"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>استمع للنطق</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span className="font-arabic font-bold">شلبي يكتب لك ويجهز الرابط المطلوب...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="bg-[#FAF4EA] px-3 py-1.5 border-t border-amber-200 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSendMessage(undefined, 'افتح لي كتاب المنهج')}
              className="px-2 py-0.5 rounded-full bg-white border border-amber-300 text-amber-900 font-arabic font-bold whitespace-nowrap hover:bg-amber-100"
            >
              📖 افتح لي الكتاب
            </button>
            <button
              onClick={() => handleSendMessage(undefined, 'عايز احجز محاضرة مع المعلم')}
              className="px-2 py-0.5 rounded-full bg-white border border-amber-300 text-amber-900 font-arabic font-bold whitespace-nowrap hover:bg-amber-100"
            >
              🎙️ حجز محاضرة
            </button>
            <button
              onClick={() => handleSendMessage(undefined, 'وريني الألعاب التعليمية')}
              className="px-2 py-0.5 rounded-full bg-white border border-amber-300 text-amber-900 font-arabic font-bold whitespace-nowrap hover:bg-amber-100"
            >
              🎮 الألعاب
            </button>
            <button
              onClick={() => handleSendMessage(undefined, 'ما هي باقات الاشتراك والأسعار؟')}
              className="px-2 py-0.5 rounded-full bg-white border border-amber-300 text-amber-900 font-arabic font-bold whitespace-nowrap hover:bg-amber-100"
            >
              💎 أسعار الاشتراك
            </button>
          </div>

          {/* Input Footer */}
          <form onSubmit={(e) => handleSendMessage(e)} className="p-3 bg-white border-t border-amber-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="اطلب من شلبي أي شيء: افتح الكتاب، احجز محاضرة، شغل لعبة..."
              className="flex-1 px-3 py-2 text-xs border border-amber-300 rounded-xl focus:outline-none focus:border-amber-600 font-arabic bg-[#FFFDF9]"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white disabled:opacity-40 cursor-pointer transition-all shadow-sm"
              title="إرسال"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
