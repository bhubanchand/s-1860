
import { useEffect, useState } from 'react';
import { useBlogStore, BlogPost } from '@/data/posts';

/**
 * Custom hook for fetching and managing blog posts with proper caching
 */
export function useBlogPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const fetchPosts = useBlogStore((state) => state.fetchPosts);
  const getPublishedPosts = useBlogStore((state) => state.getPublishedPosts);
  const blogPosts = useBlogStore((state) => state.blogPosts);
  const error = useBlogStore((state) => state.error);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        // First try to use cached posts if available
        if (blogPosts.length > 0) {
          setIsLoading(false);
          return;
        }

        await fetchPosts();
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, [fetchPosts, blogPosts.length]);

  return {
    posts: getPublishedPosts(),
    isLoading,
    error
  };
}
