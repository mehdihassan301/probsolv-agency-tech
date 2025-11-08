import React, { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    if (isLoading) {
      setProgress(0);
      setIsComplete(false);
      
      const startTime = Date.now();
      const duration = 700; // Animate progress over 700ms

      const updateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min(Math.round((elapsedTime / duration) * 100), 100);
        setProgress(newProgress);
        
        if (newProgress < 100) {
          animationFrameId = requestAnimationFrame(updateProgress);
        } else {
          setIsComplete(true);
        }
      };

      animationFrameId = requestAnimationFrame(updateProgress);

    } else {
      setProgress(0);
      setIsComplete(false);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }
  
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg_dark/90 animate-fade-in" aria-live="polite" aria-busy="true">
      <div className={`relative ${isComplete ? 'animate-pop-in' : ''}`}>
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            className="text-primary/20"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className="text-primary"
            style={{transition: 'stroke-dashoffset 0.1s linear'}}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold text-white ${!isComplete ? 'animate-pulse-text' : ''}`}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
