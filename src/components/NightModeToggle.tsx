
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const NightModeToggle: React.FC = () => {
  // Since we're using AMOLED dark mode
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
      document.body.style.background = '#000000'; // Pure black for AMOLED screens
      localStorage.setItem('amoledMode', 'true');
    } else {
      document.documentElement.classList.remove('amoled-mode');
      document.body.style.background = '#121212'; // Dark gray for standard dark mode
      localStorage.setItem('amoledMode', 'false');
    }
  }, [isAmoledMode]);
  
  return (
    <div className="relative group">
      <button
        onClick={() => setIsAmoledMode(!isAmoledMode)}
        className={`p-2 rounded-full transition-all duration-300 ${
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
      </button>
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 text-white px-2 py-1 rounded">
        {isAmoledMode ? 'AMOLED Mode' : 'Standard Dark'}
      </span>
    </div>
  );
};

export default NightModeToggle;
