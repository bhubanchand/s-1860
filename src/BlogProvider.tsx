
import { useEffect, useState } from "react";
import { useBlogStore } from "./data/posts";
import LoadingScreen from "@/components/LoadingScreen";
import { toast } from "sonner";

const BlogProvider = () => {
  const fetchPosts = useBlogStore((state) => state.fetchPosts);
  const startAutoFetch = useBlogStore((state) => state.startAutoFetch);
  const loading = useBlogStore((state) => state.loading);
  const error = useBlogStore((state) => state.error);
  const [progress, setProgress] = useState(0);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    console.log("BlogProvider mounted");
    
    const loadData = async () => {
      // Show loading progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90; // Cap at 90% until actual loading completes
          }
          return prev + 10;
        });
      }, 200);
      
      try {
        console.log("Initial fetch starting...");
        await fetchPosts();
        console.log("Initial fetch completed successfully");
        
        setInitialFetchDone(true);
      } catch (err) {
        console.error("Error in initial fetch:", err);
        toast.error("Failed to load blog posts. Please try refreshing the page.");
      } finally {
        clearInterval(progressInterval);
        setProgress(100);
      }
    };

    // Load data immediately
    loadData();
    
    // Set up auto-fetch interval
    const stopAutoFetch = startAutoFetch();
    
    // Clean up on unmount
    return () => {
      stopAutoFetch();
    };
  }, [fetchPosts, startAutoFetch]);

  // Show loading screen during initial load
  if (loading && !initialFetchDone && progress < 100) {
    return <LoadingScreen message="Loading blog content..." progress={progress} />;
  }

  if (error && !initialFetchDone) {
    console.error("Failed to load blog posts:", error);
    toast.error("Failed to load blog posts. Please try refreshing the page.");
  }

  return null;
};

export default BlogProvider;
