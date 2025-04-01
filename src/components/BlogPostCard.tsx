
import { Link } from "react-router-dom";
import { formatDate } from "@/data/blog";
import { BlogPost } from "@/data/blog";
import { Badge } from "@/components/ui/badge";

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard = ({ post, featured = false }: BlogPostCardProps) => {
  return (
    <article className={`overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md ${featured ? 'col-span-2' : ''}`}>
      <Link to={`/blog/${post.slug}`} className="block">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-48 w-full object-cover transition-transform hover:scale-105 sm:h-64"
        />
      </Link>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700">{post.author.name}</span>
          </div>
          <time className="text-xs text-gray-500">
            {formatDate(post.date)}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
