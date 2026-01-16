import React from 'react';
import { Info } from 'lucide-react';

interface SajuFormProps {
  name: string;
  year: string;
  month: string;
  day: string;
  time: string;
  error: string;
  onNameChange: (val: string) => void;
  onYearChange: (val: string) => void;
  onMonthChange: (val: string) => void;
  onDayChange: (val: string) => void;
  onTimeChange: (val: string) => void;
  onSubmit: () => void;
}

export const SajuForm: React.FC<SajuFormProps> = ({
  name, year, month, day, time, error,
  onNameChange, onYearChange, onMonthChange, onDayChange, onTimeChange, onSubmit
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSubmit();
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-md mx-auto transition-all duration-300 hover:shadow-violet-500/10 hover:bg-slate-900/50">
      <div className="text-center mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          🧧 2026년, 나를 위한 12지지 찾기🧧
        </h1>
        <p className="text-white font-medium text-sm md:text-base break-keep leading-relaxed opacity-95 drop-shadow-sm">
          도화도르가 직접 기획한,<br className="hidden md:block"/> 
          나에게 꼭 맞는 <span className="text-violet-300 font-bold">2026년 개운(開運) 배경화면</span> 찾기
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-white mb-2 pl-1 shadow-sm">이름 (닉네임)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="홍길동"
            className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none transition-all placeholder:text-white/30 text-white backdrop-blur-sm"
          />
        </div>

        <div>
           <div className="flex items-center justify-between mb-2 pl-1">
             <label className="block text-sm font-semibold text-white shadow-sm">사주 입력</label>
             <div className="flex items-center text-xs text-white/90 bg-white/10 border border-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                <Info size={12} className="mr-1" />
                <span>한글(갑자) 또는 한자(甲子)</span>
             </div>
           </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: '년주', val: year, set: onYearChange, ph: '기사' },
              { label: '월주', val: month, set: onMonthChange, ph: '정축' },
              { label: '일주', val: day, set: onDayChange, ph: '갑오' },
              { label: '시주', val: time, set: onTimeChange, ph: '을해' }
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <input
                  type="text"
                  value={field.val}
                  onChange={(e) => field.set(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={field.ph}
                  maxLength={2}
                  className="w-full px-2 py-3 text-center bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none transition-all placeholder:text-white/30 text-lg font-medium text-white backdrop-blur-sm"
                />
                <span className="text-[10px] text-center text-white/70 mt-1">{field.label}</span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-100 rounded-xl text-sm flex items-center justify-center animate-shake backdrop-blur-sm">
            <span>⚠️ {error}</span>
          </div>
        )}

        <button
          onClick={onSubmit}
          className="
            w-full py-4 mt-2 
            bg-gradient-to-r from-violet-600/50 to-indigo-600/50 
            hover:from-violet-600/70 hover:to-indigo-600/70
            border border-white/30
            backdrop-blur-md
            text-white font-bold text-lg
            rounded-2xl 
            shadow-[0_4px_20px_-5px_rgba(124,58,237,0.4)]
            transform transition-all duration-300 
            hover:-translate-y-1 active:scale-95
            hover:shadow-[0_8px_25px_-5px_rgba(124,58,237,0.5)]
            hover:border-white/50
          "
        >
          내 사주 동물 확인하러 가기✨
        </button>

        <div className="text-center pt-2 text-[10px] text-slate-500">
          © 2026 홍염 멤버십을 위한 사주 고서 및 도화도르 임상자료
        </div>
      </div>
    </div>
  );
};