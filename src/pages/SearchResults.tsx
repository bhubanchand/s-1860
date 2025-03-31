
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { BlogPost, useBlogStore } from "@/data/posts";


const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<BlogPost[]>([]);
    const blogPosts = useBlogStore.getState().blogPosts;
  useEffect(() => {
    if (query) {
      const searchResults = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) || 
        post.content.toLowerCase().includes(query.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          <p className="text-muted-foreground mb-10">
            Found {results.length} results for "{query}"
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((post) => (
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
              <h3 className="text-2xl font-medium mb-3">No results found</h3>
              <p className="text-muted-foreground">
                We couldn't find any posts matching your search query. Try different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
};

export default SearchResults;
