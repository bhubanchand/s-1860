
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import FeaturedPost from "@/components/FeaturedPost";
import BlogCard from "@/components/BlogCard";
import ScrollToTop from "@/components/ScrollToTop";
import { getFeaturedPosts, getPostsByCategory, getRecentPosts } from "@/data/blogData";
import { Volume } from "lucide-react";

const Index = () => {
  const featuredPosts = getFeaturedPosts();
  const entertainmentPosts = getPostsByCategory("Entertainment", 3);
  const technologyPosts = getPostsByCategory("Technology", 3);
  const moviePosts = getPostsByCategory("Movies", 4);
  const recentPosts = getRecentPosts(6);

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
      <div className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mt-8">
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
          className="container mx-auto px-4 mt-20 opacity-0"
        >
          <h2 className="section-title">Entertainment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 appear-animation">
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
          className="container mx-auto px-4 mt-20 opacity-0"
        >
          <div className="bg-secondary rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
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
          className="container mx-auto px-4 mt-20 opacity-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0">Latest Movies</h2>
            <Link to="/movies" className="text-blog-green hover:text-blog-accent transition-colors text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 appear-animation">
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
          className="container mx-auto px-4 mt-20 opacity-0"
        >
          <h2 className="section-title">Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 appear-animation">
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

        {/* More Articles Section */}
        <section 
          ref={addToRefs} 
          className="container mx-auto px-4 mt-20 mb-20 opacity-0"
        >
          <div className="flex items-center justify-between mb-6">
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
      </div>

      <ScrollToTop />
    </BlogLayout>
  );
};

export default Index;
