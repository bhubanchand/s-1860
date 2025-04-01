
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { getPostsByCategory } from "@/data/blogData";
import { useBlogStore } from "@/data/posts";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const storeLoading = useBlogStore(state => state.loading);
  
  // Format category name for display (capitalize first letter)
  const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  
  // Use state to store category posts
  const [categoryPosts, setCategoryPosts] = useState([]);
  
  useEffect(() => {
    // Wait for the blog store to finish loading
    if (!storeLoading) {
      console.log(`Loading posts for category: ${displayCategory}`);
      
      if (category) {
        // Get posts for the current category
        const posts = getPostsByCategory(displayCategory);
        
        // Update state with the fetched posts
        setCategoryPosts(posts);
        
        // Log for debugging
        console.log(`Found ${posts.length} posts for category: ${displayCategory}`);
        
        if (posts.length > 0) {
          console.log("First few posts:");
          posts.slice(0, 3).forEach(post => {
            console.log(`- ${post.title} (ID: ${post.id}, Slug: ${post.slug})`);
          });
        }
      }
      
      setIsLoading(false);
    }
  }, [category, displayCategory, storeLoading]);

  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{displayCategory}</h1>
          <p className="text-muted-foreground mb-10">
            Explore the latest {displayCategory.toLowerCase()} news, trends, and featured stories.
          </p>

          {isLoading ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium mb-3">Loading posts...</h3>
              <p className="text-muted-foreground">
                Please wait while we fetch the latest posts.
              </p>
            </div>
          ) : categoryPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
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
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium mb-3">No posts found</h3>
              <p className="text-muted-foreground">
                We couldn't find any posts in the {displayCategory.toLowerCase()} category.
              </p>
              <Link
                to="/"
                className="inline-block mt-8 px-6 py-3 bg-blog-green hover:bg-green-600 text-white font-medium rounded-md transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
};

export default CategoryPage;
