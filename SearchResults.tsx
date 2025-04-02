
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { useBlogStore } from "@/data/posts";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const { posts, isLoading } = useBlogPosts();

  // Memoize search results to prevent unnecessary filtering
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchText = query.toLowerCase();
    const searchResults = posts.filter(post => 
      post.title.toLowerCase().includes(searchText) || 
      post.content.toLowerCase().includes(searchText) || 
      post.excerpt.toLowerCase().includes(searchText) ||
      post.category.toLowerCase().includes(searchText)
    );
    setResults(searchResults);
  }, [query, posts]);

  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          <p className="text-muted-foreground mb-10">
            {isLoading ? (
              <Skeleton className="h-6 w-64" />
            ) : (
              `Found ${results.length} results for "${query}"`
            )}
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((post) => (
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
