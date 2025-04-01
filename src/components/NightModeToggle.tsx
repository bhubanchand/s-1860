
import React, { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';

const NightModeToggle: React.FC = () => {
  // Always use AMOLED dark mode for this design
  const [isAmoledMode] = useState(true);
  
  useEffect(() => {
    // Apply AMOLED mode styles
    document.documentElement.classList.add('amoled-mode');
    document.body.style.background = '#000000'; // Pure black for AMOLED screens
    localStorage.setItem('amoledMode', 'true');
  }, []);
  
  return (
    <div className="relative">
      <button
        className="p-2 rounded-full transition-all duration-300 bg-black text-gray-400 border border-gray-800"
        aria-label="AMOLED mode active"
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default NightModeToggle;
