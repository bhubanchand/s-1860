
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const NightModeToggle: React.FC = () => {
  // Since we're now always in AMOLED dark mode, this toggle becomes 
  // a contrast toggle between dark and ultra-dark (AMOLED)
  const [isAmoledMode, setIsAmoledMode] = useState(true);
  
  useEffect(() => {
    // Check if AMOLED mode is active in localStorage
    const storedMode = localStorage.getItem('amoledMode');
    if (storedMode) {
      setIsAmoledMode(storedMode === 'true');
    }
  }, []);
  
  useEffect(() => {
    // Apply AMOLED mode styles
    if (isAmoledMode) {
      document.documentElement.classList.add('amoled-mode');
      document.body.style.background = '#000000'; // Pure black
      localStorage.setItem('amoledMode', 'true');
    } else {
      document.documentElement.classList.remove('amoled-mode');
      document.body.style.background = '#121212'; // Dark gray
      localStorage.setItem('amoledMode', 'false');
    }
  }, [isAmoledMode]);
  
  return (
    <button
      onClick={() => setIsAmoledMode(!isAmoledMode)}
      className={`relative p-2 rounded-full transition-all duration-300 ${
        isAmoledMode 
          ? 'bg-black text-gray-400 border border-gray-800' 
          : 'bg-gray-900 text-gray-300'
      }`}
      aria-label={isAmoledMode ? 'Switch to standard dark mode' : 'Switch to AMOLED mode'}
    >
      {isAmoledMode ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isAmoledMode ? 'AMOLED Mode' : 'Standard Dark'}
      </span>
    </button>
  );
};

export default NightModeToggle;
