
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { getRecentPosts } from "@/data/blogData";

const POSTS_PER_PAGE = 10;

const TrendingBlogs = () => {
  const navigate = useNavigate();
  const allPosts = getRecentPosts(100); // Get a large number as a pool
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  
  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + POSTS_PER_PAGE);
  };

  const displayedPosts = allPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < allPosts.length;

  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Trending Now</h1>
            <button 
              onClick={() => navigate(-1)} 
              className="text-blog-green hover:text-blog-accent transition-colors"
            >
              &larr; Back
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-10">
            {displayedPosts.map((post) => (
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
          
          {hasMorePosts && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-blog-green hover:bg-green-600 text-white font-medium rounded-md transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
};

export default TrendingBlogs;
