
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
        <div className="relative w-16 h-16 mb-4">
          <img
            src="https://res.cloudinary.com/dyzamqtdw/image/upload/v1743444325/profile_bhuban_tonight_nbupw7.svg"
            alt="Tonight Blog"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
        <p className="text-white text-xl font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
