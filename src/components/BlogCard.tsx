
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
      className={`blog-card rounded-lg bg-secondary h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        layout === "horizontal" ? "grid grid-cols-12 gap-4" : "flex flex-col"
      } animate-fade-in`}
    >
      <div 
        className={`${
          layout === "horizontal" ? "col-span-4 md:col-span-5" : "w-full aspect-video"
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
          layout === "horizontal" ? "col-span-8 md:col-span-7 p-3 md:p-4" : "p-4"
        } flex flex-col h-full`}
      >
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="px-2 py-1 rounded bg-blog-green text-white font-medium">
            {category}
          </span>
          <div className="text-muted-foreground flex items-center">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </div>
        </div>
        <Link to={`/post/${slug}`} className="flex-grow">
          <h3 className="blog-headline text-lg md:text-xl mb-2 hover:text-blog-green transition-colors">{title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{excerpt}</p>
        <Link to={`/post/${slug}`} className="read-more inline-flex items-center mt-auto text-blog-green hover:text-blog-accent transition-colors">
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
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
