
import React from "react";
import { useParams, Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { getPostsByCategory } from "@/data/blogData";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  // Capitalize category for display
  const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  
  // Get posts for the selected category
  const categoryPosts = category ? getPostsByCategory(displayCategory) : [];

  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{displayCategory}</h1>
          <p className="text-muted-foreground mb-10">
            Explore the latest {displayCategory.toLowerCase()} news, trends, and featured stories.
          </p>

          {categoryPosts.length > 0 ? (
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
