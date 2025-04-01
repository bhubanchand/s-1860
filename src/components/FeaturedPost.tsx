
import React from "react";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  authorName?: string; // Added author name
  size?: "large" | "medium" | "small";
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({
  image,
  category,
  title,
  excerpt,
  slug,
  date,
  authorName,
  size = "medium",
}) => {
  const sizeClasses = {
    large: "col-span-6 md:col-span-6 lg:col-span-6 md:row-span-2 h-[400px] md:h-[500px]",
    medium: "col-span-6 md:col-span-3 lg:col-span-2 h-[250px] md:h-[300px]",
    small: "col-span-6 md:col-span-3 lg:col-span-2 h-[250px] md:h-[300px]",
  };

  const titleSizes = {
    large: "text-2xl md:text-3xl",
    medium: "text-xl",
    small: "text-lg",
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${sizeClasses[size]} animate-fade-in`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
        <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded bg-blog-green text-white">
          {category}
        </span>
        <Link to={`/post/${slug}`}>
          <h2 className={`${titleSizes[size]} font-bold text-white text-shadow-lg mb-2 leading-tight hover:text-blog-green transition-colors`}>
            {title}
          </h2>
        </Link>
        {size === "large" && (
          <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-2">{excerpt}</p>
        )}
        <div className="flex items-center text-gray-300 text-xs">
          <span>{date}</span>
          {authorName && (
            <>
              <span className="mx-2">•</span>
              <span>{authorName}</span>
            </>
          )}
        </div>
        <Link to={`/post/${slug}`} className="text-blog-green hover:text-blog-accent text-sm font-medium transition-colors inline-flex items-center mt-2">
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
    </div>
  );
};

export default FeaturedPost;
