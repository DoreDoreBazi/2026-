import React, { useState } from 'react';
import { SplineBackground } from './components/SplineBackground';
import { SajuForm } from './components/SajuForm';
import { ResultCard } from './components/ResultCard';
import { calculateRecommendation } from './utils';
import { RecommendationResult } from './types';

export default function App() {
  const [name, setName] = useState('');
  const [yearPillar, setYearPillar] = useState('');
  const [monthPillar, setMonthPillar] = useState('');
  const [dayPillar, setDayPillar] = useState('');
  const [timePillar, setTimePillar] = useState('');
  
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    const calculation = calculateRecommendation(
      name, yearPillar, monthPillar, dayPillar, timePillar
    );

    if (typeof calculation === 'string') {
      setError(calculation);
      setResult(null);
    } else {
      setResult(calculation);
    }
  };

  const handleReset = () => {
    setResult(null);
    setYearPillar('');
    setMonthPillar('');
    setDayPillar('');
    setTimePillar('');
    setError('');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-sans text-gray-900">
      {/* 3D Background Layer */}
      <SplineBackground />

      {/* Content Layer */}
      <div className="relative z-10 w-full px-4 py-8 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen pointer-events-none">
        {/* Enable pointer events only for the interactive card */}
        <div className="w-full pointer-events-auto">
          {result ? (
            <ResultCard result={result} onReset={handleReset} />
          ) : (
            <SajuForm 
              name={name}
              year={yearPillar}
              month={monthPillar}
              day={dayPillar}
              time={timePillar}
              error={error}
              onNameChange={setName}
              onYearChange={setYearPillar}
              onMonthChange={setMonthPillar}
              onDayChange={setDayPillar}
              onTimeChange={setTimePillar}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}