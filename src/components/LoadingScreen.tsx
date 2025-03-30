
import React from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  progress?: number;
  className?: string;
}

const LoadingScreen = ({
  message = "Loading content...",
  progress,
  className,
}: LoadingScreenProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 px-4 text-center">
        <div className="flex items-center justify-center rounded-full border border-gray-800 bg-black p-4 shadow-lg">
          <Loader2 className="h-10 w-10 animate-spin text-blog-green" />
        </div>
        
        <h2 className="text-xl font-medium text-white">{message}</h2>
        
        {progress !== undefined && (
          <div className="w-full max-w-xs">
            <Progress value={progress} className="h-2 w-full bg-muted" />
            <p className="mt-2 text-sm text-muted-foreground">{progress}% complete</p>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground">Tonight Blog</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
