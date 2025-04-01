import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import ScrollToTop from "@/components/ScrollToTop";
import { getPostsByCategory, getRecentPosts } from "@/data/blogData";

// Blog categories
const categories = [
  "Technology", 
  "Entertainment", 
  "Lifestyle", 
  "Gaming", 
  "Movies", 
  "Business", 
  "Health"
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  // Get posts based on category
  const getPosts = () => {
    // If searching, filter all recent posts
    if (searchTerm) {
      const allPosts = getRecentPosts(100);
      const lowerCaseSearch = searchTerm.toLowerCase();
      return allPosts.filter(post => 
        post.title.toLowerCase().includes(lowerCaseSearch) || 
        post.excerpt.toLowerCase().includes(lowerCaseSearch) ||
        post.category.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Otherwise filter by category
    if (activeCategory === "all") {
      return getRecentPosts(24); // Get more posts for the all category
    }
    
    return getPostsByCategory(activeCategory, 24);
  };
  
  const posts = getPosts();

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <BlogLayout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Stay updated with the latest insights, news, and tips from our experts.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-secondary rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Categories */}
              <div className="flex overflow-x-auto py-2 space-x-2 min-w-0 scrollbar-none mb-4 md:mb-0">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeCategory === "all"
                      ? "bg-blog-green text-white"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-blog-green text-white"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-full bg-white/5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blog-green"
                />
                <button
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setSearchTerm("")}
                >
                  {searchTerm && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Results */}
          {searchTerm && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">
                {posts.length} {posts.length === 1 ? "result" : "results"} for "{searchTerm}"
              </h2>
            </div>
          )}
          
          {/* Blog Posts Grid */}
          <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
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
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-2xl font-semibold mb-4">No posts found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm
                    ? `No posts matching "${searchTerm}"`
                    : `No posts found in ${activeCategory}`}
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchTerm("");
                  }}
                  className="px-6 py-3 bg-blog-green text-white rounded-lg hover:bg-opacity-90 transition-all"
                >
                  View All Posts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollToTop />
    </BlogLayout>
  );
};

export default Blog;
