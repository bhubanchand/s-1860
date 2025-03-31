
import { useEffect, useState } from "react";
import { useBlogStore } from "./data/posts";
import LoadingScreen from "@/components/LoadingScreen";

const BlogProvider = () => {
  const fetchPosts = useBlogStore((state) => state.fetchPosts);
  const startAutoFetch = useBlogStore((state) => state.startAutoFetch);
  const loading = useBlogStore((state) => state.loading);
  const error = useBlogStore((state) => state.error);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      // Start progress animation
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
        // Fetch posts
        await fetchPosts();
      } catch (err) {
        console.error("Error in BlogProvider:", err);
      } finally {
        // Complete progress and clear interval
        clearInterval(progressInterval);
        setProgress(100);
      }
    };

    loadData();
    
    const stopAutoFetch = startAutoFetch(); // Start auto-fetching
    return () => {
      stopAutoFetch(); // Cleanup on unmount
    }
  }, [fetchPosts, startAutoFetch]);

  if (loading && progress < 100) {
    return <LoadingScreen message="Loading blog content..." progress={progress} />;
  }

  if (error) {
    console.error("Failed to load blog posts:", error);
  }

  return null; 
};

export default BlogProvider;
