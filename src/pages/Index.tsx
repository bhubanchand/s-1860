
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import FeaturedPost from "@/components/FeaturedPost";
import BlogCard from "@/components/BlogCard";
import ScrollToTop from "@/components/ScrollToTop";
import { getFeaturedPosts, getPostsByCategory, getRecentPosts} from "@/data/blogData";
import { toast } from "sonner";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Memoize posts data using useState + useEffect to avoid recalculation on every render
  const [postsData, setPostsData] = useState({
    featuredPosts: [] as ReturnType<typeof getFeaturedPosts>,
    entertainmentPosts: [] as ReturnType<typeof getPostsByCategory>,
    technologyPosts: [] as ReturnType<typeof getPostsByCategory>,
    moviePosts: [] as ReturnType<typeof getPostsByCategory>,
    recentPosts: [] as ReturnType<typeof getRecentPosts>,
  });
  
  // Load data once on component mount
  useEffect(() => {
    try {
      // Get featured posts
      const featuredPosts = getFeaturedPosts();
      
      // Track displayed post IDs
      const displayedPostIds = featuredPosts.map(post => post.id);
      
      // Get category posts excluding already displayed
      const entertainmentPosts = getPostsByCategory("Entertainment", 4, displayedPostIds);
      entertainmentPosts.forEach(post => displayedPostIds.push(post.id));
      
      const technologyPosts = getPostsByCategory("Technology", 4, displayedPostIds);
      technologyPosts.forEach(post => displayedPostIds.push(post.id));
      
      const moviePosts = getPostsByCategory("Movies", 4, displayedPostIds);
      moviePosts.forEach(post => displayedPostIds.push(post.id));
      
      // Get recent posts that haven't been displayed yet
      const recentPosts = getRecentPosts(6, displayedPostIds);
      
      // Update state with all post data
      setPostsData({
        featuredPosts,
        entertainmentPosts,
        technologyPosts,
        moviePosts,
        recentPosts
      });
      
      // Mark as loaded to enable animations
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading posts data:", error);
      toast.error("Failed to load some content. Please refresh the page.");
    }
  }, []);
  
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Setup intersection observer for animations
  useEffect(() => {
    if (!isLoaded) return;
    
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isLoaded]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const { featuredPosts, entertainmentPosts, technologyPosts, moviePosts, recentPosts } = postsData;

  return (
    <BlogLayout>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mt-4">
          <div className="grid grid-cols-6 gap-4 appear-animation">
            {featuredPosts.map((post) => (
              <FeaturedPost
                key={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                date={post.createdAt}
                authorName={post.authorName}
                size={post.featuredSize}
              />
            ))}
          </div>
        </section>

        {/* Entertainment Section */}
        <section 
          ref={addToRefs} 
          className="container mx-auto px-4 mt-12 opacity-0"
        >
          <h2 className="section-title">Entertainment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 appear-animation">
            {entertainmentPosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                date={post.createdAt}
                authorName={post.authorName}
                slug={post.slug}
              />
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section 
          ref={addToRefs} 
          className="container mx-auto px-4 mt-12 opacity-0"
        >
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title mb-0">Trending Now</h2>
              <Link to="/trending" className="text-blog-green hover:text-blog-accent transition-colors text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 appear-animation">
              {recentPosts.slice(0, 3).map((post) => (
                <BlogCard
                  key={post.id}
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.createdAt}
                  authorName={post.authorName}
                  slug={post.slug}
                  layout="horizontal"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Movies Section */}
        <section 
          ref={addToRefs} 
          className="container mx-auto px-4 mt-12 opacity-0"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Latest Movies</h2>
            <Link to="/movies" className="text-blog-green hover:text-blog-accent transition-colors text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 appear-animation">
            {moviePosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                date={post.createdAt}
                authorName={post.authorName}
                slug={post.slug}
              />
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section 
          ref={addToRefs} 
          className="container mx-auto px-4 mt-12 opacity-0"
        >
          <h2 className="section-title">Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 appear-animation">
            {technologyPosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                date={post.createdAt}
                authorName={post.authorName}
                slug={post.slug}
              />
            ))}
          </div>
        </section>

        {/* More Articles Section - Only show if there are still posts to display */}
        {recentPosts.slice(3).length > 0 && (
          <section 
            ref={addToRefs} 
            className="container mx-auto px-4 mt-12 mb-16 opacity-0"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title mb-0">More Articles</h2>
              <Link to="/trending" className="text-blog-green hover:text-blog-accent transition-colors text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 appear-animation">
              {recentPosts.slice(3).map((post) => (
                <BlogCard
                  key={post.id}
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.createdAt}
                  authorName={post.authorName}
                  slug={post.slug}
                  layout="horizontal"
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <ScrollToTop />
    </BlogLayout>
  );
};

export default Index;
