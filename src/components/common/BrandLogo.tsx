import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'color';
  showSubtitle?: boolean;
  customLogoUrl?: string;
  customTitle?: string;
  customSubtitle?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'color',
  showSubtitle = true,
  customLogoUrl,
  customTitle,
  customSubtitle
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    sm: { imgSize: 'w-8 h-8', height: 32, titleSize: 'text-base', subSize: 'text-[11px]' },
    md: { imgSize: 'w-11 h-11', height: 44, titleSize: 'text-xl', subSize: 'text-xs' },
    lg: { imgSize: 'w-16 h-16', height: 64, titleSize: 'text-2xl', subSize: 'text-sm' },
    xl: { imgSize: 'w-24 h-24', height: 96, titleSize: 'text-3xl', subSize: 'text-base' },
  };

  const currentSize = sizeMap[size];
  const logoSrc = customLogoUrl || '/logo.png';

  // Format brand title and subtitle cleanly
  let primaryName = 'الـنَّـبِـيـل';
  let secondaryName = 'في اللغة العربية للأعاجم';

  if (customTitle && customTitle.trim()) {
    if (customTitle.includes('في اللغة العربية للأعاجم')) {
      primaryName = 'الـنَّـبِـيـل';
      secondaryName = 'في اللغة العربية للأعاجم';
    } else {
      primaryName = customTitle;
      secondaryName = customSubtitle || 'في اللغة العربية للأعاجم';
    }
  }

  return (
    <div className="flex items-center gap-3 select-none cursor-pointer group flex-shrink-0">
      {/* Official Calligraphic Emblem Logo Image */}
      <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        {!imageError ? (
          <div className={`${currentSize.imgSize} rounded-xl overflow-hidden shadow-md border-2 border-amber-400/50 bg-white p-0.5 flex items-center justify-center ring-1 ring-amber-900/10`}>
            <img
              src={logoSrc}
              alt="شعار النبيل في اللغة العربية للأعاجم"
              className="w-full h-full object-contain"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          /* High-fidelity Vector Fallback */
          <svg
            height={currentSize.height}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            <path
              d="M 50 8 C 30 8 18 24 18 48 C 18 64 26 78 50 88 C 74 78 82 64 82 48 C 82 24 70 8 50 8 Z"
              fill="url(#goldGradient)"
              opacity="0.15"
            />
            <path
              d="M 50 10 C 32 10 20 25 20 48 C 20 62 27 76 50 86 C 73 76 80 62 80 48 C 80 25 68 10 50 10 Z"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 50 78 C 35 70 24 73 12 78 C 14 62 25 58 48 64 L 50 78 Z"
              fill="#2e170a"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
            />
            <path
              d="M 50 78 C 65 70 76 73 88 78 C 86 62 75 58 52 64 L 50 78 Z"
              fill="#2e170a"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
            />
            <path
              d="M 50 56 L 45 68 L 50 76 L 55 68 Z"
              fill="url(#goldGradient)"
            />
            <path
              d="M 32 50 C 32 36 38 32 40 42 C 41 48 48 48 54 42 C 58 37 62 38 65 48 C 66 52 70 48 72 34"
              stroke="#451a03"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Brand Text - Unified, Prominent, and Clear */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`font-arabic font-black tracking-tight whitespace-nowrap ${currentSize.titleSize} ${
              variant === 'light' ? 'text-white' : 'text-[#24130a]'
            }`}
            style={{ fontFamily: "'Tajawal', 'Amiri', sans-serif" }}
          >
            {primaryName}
          </span>
          <span
            className={`font-arabic font-bold whitespace-nowrap text-xs sm:text-xs px-2 py-0.5 rounded-md border ${
              variant === 'light'
                ? 'bg-amber-400/20 text-amber-200 border-amber-400/30'
                : 'bg-[#f6efe4] text-[#78350f] border-[#dfceb7]'
            }`}
          >
            {secondaryName}
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-sans tracking-wide text-[10px] sm:text-[11px] font-medium truncate ${
              variant === 'light' ? 'text-amber-200/80' : 'text-amber-950/60'
            }`}
          >
            Al-Nabeel Arabic for Non-Native Speakers
          </span>
        )}
      </div>
    </div>
  );
};
