import { useEffect } from "react";
import { useBlogStore } from "./data/posts";

const BlogProvider = () => {
  const fetchPosts = useBlogStore((state) => state.fetchPosts);
  const startAutoFetch = useBlogStore((state) => state.startAutoFetch);

  useEffect(() => {
    fetchPosts(); 

    const stopAutoFetch = startAutoFetch(); // Start auto-fetching
    return stopAutoFetch; // Cleanup on unmount
  }, [fetchPosts, startAutoFetch]); // Dependencies ensure reactivity

  return null; 
};

export default BlogProvider;
