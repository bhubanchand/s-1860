
import React, { useEffect, useState } from "react";
import { 
  Loader2, 
  LoaderCircle, 
  Sparkles, 
  Zap,
  CircleDashed,
  RotateCcw,
  RefreshCw,
  Hourglass
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  progress?: number;
  className?: string;
}

// Collection of modern loading icons
const loadingIcons = [
  Loader2,
  LoaderCircle,
  Sparkles,
  Zap,
  CircleDashed,
  RotateCcw,
  RefreshCw,
  Hourglass
];

const LoadingScreen = ({
  message = "Loading content...",
  progress,
  className,
}: LoadingScreenProps) => {
  // Randomly select a loading icon on each render
  const [LoadingIcon, setLoadingIcon] = useState<React.ElementType>(Loader2);
  
  useEffect(() => {
    // Pick a random icon from the collection
    const randomIndex = Math.floor(Math.random() * loadingIcons.length);
    setLoadingIcon(loadingIcons[randomIndex]);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 px-4 text-center">
        <div className="flex items-center justify-center rounded-full border border-gray-800 bg-black p-4 shadow-lg">
          <LoadingIcon className="h-10 w-10 animate-spin text-blog-green" />
        </div>
        
        <h2 className="text-xl font-medium text-white">{message}</h2>
        
        {progress !== undefined && (
          <div className="w-full max-w-xs">
            <Progress value={progress} className="h-2 w-full bg-muted" />
            <p className="mt-2 text-sm text-muted-foreground">{progress}% complete</p>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <img src="/favicon.ico" alt="Tonight Blog Logo" className="h-8 w-8" />
      </div>
    </div>
  );
};

export default LoadingScreen;
