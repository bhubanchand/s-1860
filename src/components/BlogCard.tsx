
import React from "react";
import { Link } from "react-router-dom";

export interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  authorName?: string;
  readTime?: string;
  layout?: "vertical" | "horizontal";
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  category,
  title,
  excerpt,
  date,
  slug,
  authorName,
  readTime,
  layout = "vertical",
}) => {
  const isHorizontal = layout === "horizontal";

  return (
    <div className={`group relative bg-secondary rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 ${
      isHorizontal ? "flex flex-col md:flex-row" : ""
    }`}>
      <div className={`overflow-hidden ${isHorizontal ? "md:w-1/3 h-64 md:h-auto" : "h-52"}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={`p-5 flex flex-col ${isHorizontal ? "md:w-2/3" : ""}`}>
        <div className="flex justify-between items-center mb-3">
          <span className="px-2 py-1 text-xs font-medium bg-white text-black rounded">
            {category}
          </span>
          <span className="text-sm text-gray-400">{date}</span>
        </div>
        <Link to={`/post/${slug}`} className="!no-underline">
          <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-400 mb-4 line-clamp-2">{excerpt}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {authorName && (
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-400">By {authorName}</span>
              </div>
            )}
            {readTime && (
              <div className="text-sm text-gray-400">{readTime} min read</div>
            )}
          </div>
          <Link to={`/post/${slug}`} className="text-white hover:text-white/80 text-sm font-medium">
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
