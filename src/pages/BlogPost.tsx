import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import ScrollToTop from "@/components/ScrollToTop";
import ReadTimeTracker from "@/components/ReadTimeTracker";
import { getPostBySlug, getRelatedPosts } from "@/data/blogData";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import AdBanner from "@/components/AdBanner";
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Use useMemo to prevent unnecessary recalculations
  const post = useMemo(() => slug ? getPostBySlug(slug) : undefined, [slug]);
  const relatedPosts = useMemo(() => post ? getRelatedPosts(post.id, 3) : [], [post]);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      navigate("/not-found");
      return;
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
    
    if (!post) {
      // Only navigate to not-found if we've finished the initial load and post is still undefined
      const timer = setTimeout(() => {
        setLoading(false);
        if (!post) {
          console.log("Post not found, navigating to 404 page");
          toast.error("Post not found");
          navigate("/not-found");
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Post found, stop loading
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [post, navigate, slug]);

  // Render loading state
  if (loading) {
    return (
      <BlogLayout>
        <div className="pt-20 container mx-auto px-4 max-w-4xl mt-8">
          <Skeleton className="h-[400px] w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </BlogLayout>
    );
  }

  // If post is still undefined after loading, render nothing (we'll navigate away)
  if (!post) {
    return null;
  }

  return (
    <BlogLayout>
      {/* SEO optimizations */}
      <Helmet>
        <title>{post.title} | Tonight Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`${window.location.origin}/post/${post.slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={`${window.location.origin}/post/${post.slug}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        
        {/* Article specific metadata */}
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:section" content={post.category} />
        <meta property="article:author" content={post.authorName || "Tonight Blog"} />
      </Helmet>
      
      <div className="pt-20">
        <article className="container mx-auto px-4 max-w-4xl mt-8">
          {/* Hero Image with preload */}
          <div className="relative rounded-lg overflow-hidden h-[400px] mb-8 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <img
              src={post.image}
              alt={post.title}
              className="absolute w-full h-full object-cover"
              loading="eager" 
              fetchPriority="high"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <span className="inline-block px-3 py-1 text-base font-semibold rounded bg-blog-green text-black mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white text-shadow-lg mb-2">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-300 text-sm">
                <span>{post.createdAt}</span>
                {post.authorName && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.authorName}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Top Ad Banner */}
          <div className="mb-8">
            <AdBanner adSlot="1234567890" format="horizontal" responsive={true} className="mx-auto" />
          </div>

          {/* Article Content */}
          <div className="bg-secondary rounded-lg p-8 mb-8 animate-fade-up">
            <div className="prose prose-lg prose-invert max-w-none blog-content">
              <p className="text-lg leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              {/* First paragraph ad */}
              <div className="my-6">
                <AdBanner adSlot="2345678901" format="rectangle" className="mx-auto" />
              </div>
              
              {/* Render the HTML content directly */}
              <div 
                className="blog-content-html" 
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Bottom of content ad */}
              <div className="my-6">
                <AdBanner adSlot="3456789012" format="rectangle" className="mx-auto" />
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-muted">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Tags:</span>
                <a href={`/category/${post.category}`} className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground hover:bg-blog-green hover:bg-gray-500  transition-colors">
                  {post.category}
                </a>
                <a href="/trending" className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground hover:bg-blog-green hover:text-white transition-colors hover:bg-gray-500 ">
                  Trending
                </a>
              </div>
            </div>

            {/* Share */}
            <div className="mt-6 flex items-center">
              <span className="text-sm text-muted-foreground mr-4">Share:</span>
              <div className="flex space-x-2">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-blog-green transition-colors hover:bg-gray-500 "
                  aria-label="Share on Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-blog-green transition-colors hover:bg-gray-500 "
                  aria-label="Share on Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-blog-green transition-colors hover:bg-gray-500 "
                  aria-label="Share on LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878 1.216.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="p-2 rounded-full bg-muted hover:bg-blog-green transition-colors hover:bg-gray-500 "
                  aria-label="Copy link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3  0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles with Ad Banner */}
          {relatedPosts.length > 0 && (
            <>
              <div className="mb-8">
                <AdBanner adSlot="4567890123" format="horizontal" responsive={true} className="mx-auto" />
              </div>
              
              <div className="mb-16 animate-fade-up delay-100">
                <h3 className="section-title mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
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
              </div>
            </>
          )}
        </article>
      </div>

      <ScrollToTop />
    </BlogLayout>
  );
};

export default BlogPost;
