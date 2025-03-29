
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface ReadTimeTrackerProps {
  contentSelector: string;
}

const ReadTimeTracker: React.FC<ReadTimeTrackerProps> = ({ contentSelector }) => {
  const [readTime, setReadTime] = useState("0 min read");
  const [percentRead, setPercentRead] = useState(0);

  useEffect(() => {
    const calculateReadingTime = () => {
      const content = document.querySelector(contentSelector);
      if (!content) return;

      const text = content.textContent || "";
      const wordCount = text.split(/\s+/).length;
      const wordsPerMinute = 200;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      
      setReadTime(`${readingTime} min read`);
    };

    const trackReadingProgress = () => {
      const content = document.querySelector(contentSelector);
      if (!content) return;

      const contentHeight = content.getBoundingClientRect().height;
      const contentTop = content.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the content is visible
      let visibleContentHeight = 0;
      
      if (contentTop < 0) {
        // Content has scrolled up partially
        visibleContentHeight = Math.min(contentHeight + contentTop, windowHeight);
      } else if (contentTop < windowHeight) {
        // Content is partially visible
        visibleContentHeight = Math.min(windowHeight - contentTop, contentHeight);
      }
      
      // Calculate percentage read
      const percentageRead = Math.min(
        100,
        Math.round((window.scrollY / (contentHeight - windowHeight + 200)) * 100)
      );
      
      setPercentRead(Math.max(0, percentageRead));
    };

    calculateReadingTime();
    trackReadingProgress();

    window.addEventListener("scroll", trackReadingProgress);
    return () => window.removeEventListener("scroll", trackReadingProgress);
  }, [contentSelector]);

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Clock size={14} className="mr-1" />
      <span>{readTime}</span>
      {percentRead > 0 && (
        <span className="ml-2">• {percentRead}% read</span>
      )}
    </div>
  );
};

export default ReadTimeTracker;
