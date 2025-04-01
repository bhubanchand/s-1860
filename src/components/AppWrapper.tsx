
import React, { useEffect, useState } from 'react';
import { useBlogStore } from '../data/posts';
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const fetchPosts = useBlogStore((state) => state.fetchPosts);
  
  useEffect(() => {
    console.log("AppWrapper: Starting data fetch");
    
    // Immediately try to load any cached data
    const cachedData = localStorage.getItem('blog-posts-cache');
    if (cachedData) {
      try {
        const { posts, timestamp } = JSON.parse(cachedData);
        const cacheAge = Date.now() - timestamp;
        
        // Use cache if it's less than 1 hour old
        if (cacheAge < 60 * 60 * 1000 && Array.isArray(posts) && posts.length > 0) {
          console.log("AppWrapper: Using cached posts from localStorage");
          useBlogStore.setState({ blogPosts: posts, loading: false, error: null });
          setIsLoaded(true);
        }
      } catch (e) {
        console.warn("Failed to load cached posts:", e);
      }
    }
    
    // Always fetch fresh data
    const loadData = async () => {
      try {
        await fetchPosts({ forceFresh: true });
        setIsLoaded(true);
        console.log("AppWrapper: Data loaded successfully");
      } catch (err) {
        console.error("AppWrapper: Error loading data:", err);
        toast.error("Failed to load content. Please refresh the page.");
        setIsLoaded(true); // Still set as loaded so the UI renders
      }
    };

    loadData();
  }, [fetchPosts]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-8 w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AppWrapper;
