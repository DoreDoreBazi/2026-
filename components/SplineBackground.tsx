import React, { useState } from 'react';

export const SplineBackground: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-gray-900">
      {/* 
        요청하신 Moon Parallax iframe을 사용합니다.
        iframe이 로드되면 opacity를 1로 변경하여 부드럽게 나타나게 합니다.
      */}
      <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
         <iframe 
           src='https://my.spline.design/moonparallax-iVcaJgeah174dttzkbHMDy6g/' 
           frameBorder='0' 
           width='100%' 
           height='100%'
           className="w-full h-full border-none"
           onLoad={() => setIsLoaded(true)}
           title="Moon Parallax 3D Background"
         />
      </div>
      
      {/* 로딩 중일 때 보여줄 화면 (앱 테마와 어울리는 다크 테마) */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
           <div className="animate-pulse flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-violet-300 font-medium text-sm">3D Scene Loading...</p>
           </div>
        </div>
      )}
    </div>
  );
};