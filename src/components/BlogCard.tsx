
import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  layout?: "horizontal" | "vertical";
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  category,
  title,
  excerpt,
  date,
  readTime,
  slug,
  layout = "vertical",
}) => {
  return (
    <article 
      className={`blog-card rounded-lg bg-secondary overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        layout === "horizontal" ? "grid grid-cols-12 gap-3" : "flex flex-col"
      } animate-fade-in`}
    >
      <div 
        className={`${
          layout === "horizontal" ? "col-span-4 md:col-span-5" : "w-full h-48"
        } overflow-hidden`}
      >
        <Link to={`/post/${slug}`}>
          <img
            src={image}
            alt={title}
            className="blog-card-image w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>
      <div 
        className={`${
          layout === "horizontal" ? "col-span-8 md:col-span-7 p-2 md:p-3" : "p-3"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="px-2 py-0.5 rounded bg-blog-green text-white font-medium">
            {category}
          </span>
          <div className="text-muted-foreground flex items-center text-xs">
            <span>{date}</span>
            <span className="mx-1">•</span>
            <span>{readTime}</span>
          </div>
        </div>
        <Link to={`/post/${slug}`} className="mb-1">
          <h3 className="blog-headline text-base md:text-lg font-semibold hover:text-blog-green transition-colors leading-tight">{title}</h3>
        </Link>
        <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-2">{excerpt}</p>
        <Link to={`/post/${slug}`} className="read-more inline-flex items-center mt-auto text-blog-green hover:text-blog-accent transition-colors text-xs">
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
