
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import FeaturedPost from "@/components/FeaturedPost";
import BlogCard from "@/components/BlogCard";
import ScrollToTop from "@/components/ScrollToTop";
import { getFeaturedPosts, getPostsByCategory, getRecentPosts,BlogPost  } from "@/data/blogData";

const Index = () => {
  const featuredPosts = getFeaturedPosts();
  // Track IDs of posts that have been displayed to prevent repetition
  const displayedPostIds = featuredPosts.map(post => post.id);
   
  // Get category posts excluding already displayed posts
  const entertainmentPosts = getPostsByCategory("Entertainment", 4, displayedPostIds);
  
  // Update displayed posts IDs
  entertainmentPosts.forEach(post => displayedPostIds.push(post.id));
  
  // Get more category posts excluding already displayed posts
  const technologyPosts = getPostsByCategory("Technology", 4, displayedPostIds);
  
  // Update displayed posts IDs again
  technologyPosts.forEach(post => displayedPostIds.push(post.id));
  
  // Get movie posts excluding already displayed posts
  const moviePosts = getPostsByCategory("Movies", 4, displayedPostIds);
  
  // Update displayed posts IDs with movie posts
  moviePosts.forEach(post => displayedPostIds.push(post.id));
  
  // Get recent posts that haven't been displayed yet
  const recentPosts = getRecentPosts(6, displayedPostIds);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
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
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

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
                size={post.featuredSize}
              />
            ))}
          </div>
        </section>

        {/* Entertainment Section */}
        <section 
          ref={addToRefs} 
          className="container mx-auto px-4 mt-16 opacity-0"
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
                readTime={post.readTime}
                slug={post.slug}
              />
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section 
          ref={addToRefs} 
          className="container mx-auto px-4 mt-16 opacity-0"
        >
          <div className="bg-secondary rounded-lg p-6">
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
                  readTime={post.readTime}
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
          className="container mx-auto px-4 mt-16 opacity-0"
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
                readTime={post.readTime}
                slug={post.slug}
              />
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section 
          ref={addToRefs} 
          className="container mx-auto px-4 mt-16 opacity-0"
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
                readTime={post.readTime}
                slug={post.slug}
              />
            ))}
          </div>
        </section>

     {/* More Articles Section - Only show if there are still posts to display */}
     {recentPosts.slice(3).length > 0 && (
           <section 
             ref={addToRefs} 
             className="container mx-auto px-4 mt-16 mb-16 opacity-0"
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
                   readTime={post.readTime}
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
