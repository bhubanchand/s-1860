
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getPostBySlug, formatDate, getRecentPosts } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import BlogPostCard from "@/components/BlogPostCard";
import NotFound from "./NotFound";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = getRecentPosts(3);
  const [readingTime, setReadingTime] = useState("5 min");

  useEffect(() => {
    if (post) {
      // Calculate reading time (average reading speed: 200 words per minute)
      const wordCount = post.content.split(/\s+/).length;
      const time = Math.ceil(wordCount / 200);
      setReadingTime(`${time} min read`);
    }
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <Layout>
      <article className="py-8 sm:py-12">
        <div className="blog-container">
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link to={`/blog?tag=${tag}`} key={tag}>
                <Badge variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime}</span>
            </div>
          </div>

          <div className="mt-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blog-primary prose-a:no-underline hover:prose-a:text-blog-accent prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
              />
            </div>

            <div className="space-y-8 lg:col-span-1">
              <div className="rounded-lg border bg-white p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {post.author.name}
                    </h3>
                    <p className="text-sm text-gray-600">Author</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{post.author.bio}</p>
              </div>

              <div className="rounded-lg border bg-white p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Share this article
                </h3>
                <div className="mt-4 flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }}
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-gray-50 py-12">
        <div className="blog-container">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            More Articles
          </h2>
          <div className="blog-grid">
            {relatedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

// This is a very simple Markdown to HTML converter for demo purposes
// In a real application, you would use a proper Markdown library
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Convert headers
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  
  // Convert paragraphs
  html = html.replace(/^\s*(\n)?(.+)/gm, function(m) {
    return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
  });
  
  // Convert code blocks
  html = html.replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert lists
  html = html.replace(/^\s*\n\*/gm, '<ul>\n*');
  html = html.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
  html = html.replace(/^\*(.+)/gm, '<li>$1</li>');
  
  // Convert links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Fix multiple <p> tags
  html = html.replace(/<\/p><p>/g, '</p>\n<p>');
  
  return html;
}

export default BlogPostPage;
