
import React from "react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-white border-opacity-20 rounded-full animate-spin mb-4"></div>
        <p className="text-white text-xl font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
