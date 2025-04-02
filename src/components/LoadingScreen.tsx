
import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-background z-50 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center animate-fade-up">
        <div className="w-16 h-16 border-4 border-t-white border-opacity-20 rounded-full animate-spin mb-4"></div>
        <p className="text-white text-xl font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
