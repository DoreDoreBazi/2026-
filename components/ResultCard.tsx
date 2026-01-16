import React, { useMemo } from 'react';
import { RecommendationResult } from '../types';
import { JIJI, JIJI_KR, ANIMAL_IMAGES } from '../constants';
import { Sparkles, RefreshCw, ExternalLink } from 'lucide-react';

interface ResultCardProps {
  result: RecommendationResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  
  // 랜덤 이미지 선택 함수
  const getRandomImage = (images: string[]) => {
    if (!images || images.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // useMemo를 사용하여 컴포넌트가 리렌더링되어도 이미지가 바뀌지 않도록 함
  const firstBgImage = useMemo(() => getRandomImage(ANIMAL_IMAGES[result.first.jiji]), [result.first.jiji]);
  const secondBgImage = useMemo(() => 
    result.second ? getRandomImage(ANIMAL_IMAGES[result.second.jiji]) : '', 
    [result.second?.jiji]
  );

  // Default fallback for position
  const defaultPosition = '50% 40%';

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-md mx-auto animate-fade-in-up hover:bg-slate-900/50 transition-colors duration-300">
      <div className="text-center mb-6">
        <p className="text-lg text-slate-300 mb-1">
          멤버십 회원님 <span className="font-bold text-violet-400 text-xl">'{result.name}'</span>을 위한
        </p>
        <p className="text-slate-200 font-medium">2026 병오년 추천 배경화면</p>
      </div>

      <div className="space-y-4">
        {/* 1st Place */}
        <div className="relative overflow-hidden group rounded-2xl h-32 md:h-36">
           {/* Background Image with Blur */}
           <div className="absolute inset-0 z-0 bg-slate-800">
             {firstBgImage && (
               <img 
                 src={firstBgImage} 
                 alt={result.first.name}
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover blur-[2px] opacity-80 scale-105 transform group-hover:scale-100 transition-transform duration-700"
                 style={{ objectPosition: result.first.position || defaultPosition }}
                 onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
               />
             )}
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-violet-900/40" />
           </div>

          <div className="relative z-10 p-5 flex items-center justify-between h-full">
            <div className="flex items-center space-x-5">
              <span className="text-6xl filter drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                {result.first.emoji}
              </span>
              <div>
                 <div className="flex items-center space-x-2 mb-1">
                   <span className="px-2 py-0.5 bg-violet-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg">1순위 추천</span>
                   <Sparkles size={16} className="text-violet-300 animate-pulse" />
                 </div>
                <h3 className="text-3xl font-bold text-white tracking-wide shadow-black drop-shadow-md">{result.first.name}</h3>
                <p className="text-slate-200 text-sm font-medium">
                  지지: {JIJI_KR[JIJI.indexOf(result.first.jiji)]}({result.first.hanja})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd Place */}
        {result.second && (
          <div className="relative overflow-hidden group rounded-2xl h-24 md:h-28">
             {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0 bg-slate-800">
              {secondBgImage && (
                <img 
                  src={secondBgImage} 
                  alt={result.second.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover blur-[2px] opacity-70 scale-105 transform group-hover:scale-100 transition-transform duration-700"
                  style={{ objectPosition: result.second.position || defaultPosition }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/50" />
            </div>

             <div className="relative z-10 p-5 flex items-center justify-between h-full">
              <div className="flex items-center space-x-5">
                <span className="text-4xl md:text-5xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {result.second.emoji}
                </span>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-0.5 bg-slate-600/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">2순위 추천</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-200">{result.second.name}</h3>
                  <p className="text-slate-400 text-sm">
                    지지: {JIJI_KR[JIJI.indexOf(result.second.jiji)]}({result.second.hanja})
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <div className="p-5 bg-violet-900/30 rounded-xl border border-violet-500/20 text-sm text-slate-300 leading-relaxed text-left md:text-center backdrop-blur-sm shadow-inner">
          <p className="mb-4">
            위 동물들은 <span className="font-semibold text-violet-300">'{result.name}'</span>님의 사주 원국을 바탕으로,<br className="hidden md:block"/>
            2026년에 부족한 기운을 오행적 관점에서 보완해 줄 수 있는 동물입니다.<br className="hidden md:block"/>
            휴대폰 배경화면으로 설정해 두시면 도움이 될 거예요🪽
          </p>
          <p className="mb-4 text-violet-200/90">
            이 동물들로 제작된 배경화면 원본 파일 다운로드는<br className="md:hidden" /> <span className="underline decoration-violet-500/50 underline-offset-4 font-medium text-white">도화도르 유튜브 채널 멤버십 탭</span>에서<br className="hidden md:block"/> 가능합니다.
          </p>
          <p className="text-xs md:text-sm text-slate-400">
            이외에도, 2026년 도화도르 홍염 멤버십에서는 AI 기술과 접목하여<br className="hidden md:block"/>
            더욱 다양한 사주 서비스를 선보일 예정입니다.
          </p>
          <p className="mt-2 font-medium text-violet-300 text-center animate-pulse">
            많이 기대해 주세요!
          </p>
        </div>
        
        {/* CTA Button */}
        <a 
          href="https://ink-capacity-564.notion.site/22664237ca2440bbbd3fb25e0ce60d47"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-full h-auto py-4 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center w-full text-center">
              <span className="font-bold text-sm md:text-base leading-snug break-words">
                🎁 (클릭) 홍염 멤버십 혜택 & 다운로드 안내
              </span>
              <ExternalLink size={16} className="ml-2 flex-shrink-0 opacity-80 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </a>

        <div className="text-center pt-2">
          <button 
            onClick={onReset}
            className="inline-flex items-center text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium"
          >
            <RefreshCw size={14} className="mr-1.5" />
            다시 입력하기
          </button>
        </div>
      </div>
      
       <div className="text-center mt-6 text-[10px] text-slate-500">
          © 2026 홍염 멤버십을 위한 사주 고서 및 도화도르 임상자료
        </div>
    </div>
  );
};