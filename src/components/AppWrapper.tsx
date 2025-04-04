
import React, { useEffect, useState, useMemo } from 'react';
import { useBlogStore } from '../data/posts';
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const fetchPosts = useBlogStore((state) => state.fetchPosts);
  const blogPosts = useBlogStore((state) => state.blogPosts);
  
  // Performance optimization: Check cache status once on mount
  const hasCachedPosts = useMemo(() => {
    try {
      const cachedData = localStorage.getItem('blog-posts-cache');
      if (cachedData) {
        const { posts, timestamp } = JSON.parse(cachedData);
        const cacheAge = Date.now() - timestamp;
        
        return cacheAge < 60 * 60 * 1000 && Array.isArray(posts) && posts.length > 0;
      }
      return false;
    } catch (e) {
      console.warn("Failed to check cached posts:", e);
      return false;
    }
  }, []);
  
  useEffect(() => {
    console.log("AppWrapper: Starting data fetch");
    let isMounted = true;
    
    // Immediately try to use cached data on component mount
    if (hasCachedPosts || blogPosts.length > 0) {
      console.log("AppWrapper: Using cached posts");
      setIsLoaded(true);
      
      // Still fetch fresh data in the background
      fetchPosts({ forceFresh: false }).catch(err => {
        console.error("Background refresh error:", err);
      });
      return;
    }
    
    // No cached data, need to fetch
    const loadData = async () => {
      try {
        await fetchPosts({ forceFresh: true });
        if (isMounted) {
          setIsLoaded(true);
          console.log("AppWrapper: Data loaded successfully");
        }
      } catch (err) {
        console.error("AppWrapper: Error loading data:", err);
        if (isMounted) {
          toast.error("Failed to load content. Please refresh the page.");
          setIsLoaded(true); // Still set as loaded so the UI renders
        }
      }
    };

    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [fetchPosts, hasCachedPosts, blogPosts.length]);

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
