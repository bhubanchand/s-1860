
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { blogPosts, getAllTags } from "@/data/blog";
import BlogPostCard from "@/components/BlogPostCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const tags = getAllTags();
  const tagFilter = searchParams.get("tag");

  useEffect(() => {
    // Filter posts based on tag and search term
    let filtered = [...blogPosts];

    if (tagFilter) {
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === tagFilter.toLowerCase())
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Sort by date (newest first)
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setFilteredPosts(filtered);
  }, [tagFilter, searchTerm]);

  const handleTagClick = (tag: string) => {
    setSearchParams({ tag });
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering happens in the useEffect
  };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="blog-container">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            Explore our collection of articles on technology, design, and development.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <div>
              {tagFilter && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-blog-primary"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={tagFilter === tag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                No articles found
              </h2>
              <p className="mt-2 text-gray-600">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blog-primary hover:text-blog-accent"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="mt-8 blog-grid">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
