
import React from "react";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
  size?: "large" | "medium" | "small";
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({
  image,
  category,
  title,
  excerpt,
  slug,
  size = "medium",
}) => {
  const sizeClasses = {
    large: "col-span-6 md:col-span-6 lg:col-span-6 md:row-span-2 h-[350px] md:h-[400px]",
    medium: "col-span-6 md:col-span-3 lg:col-span-2 h-[200px] md:h-[250px]",
    small: "col-span-6 md:col-span-3 lg:col-span-2 h-[200px] md:h-[250px]",
  };

  const titleSizes = {
    large: "text-xl md:text-2xl",
    medium: "text-lg",
    small: "text-base",
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${sizeClasses[size]} animate-fade-in`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        <span className="inline-block px-2 py-0.5 mb-1 text-xs font-semibold rounded bg-blog-green text-white">
          {category}
        </span>
        <Link to={`/post/${slug}`}>
          <h2 className={`${titleSizes[size]} font-bold text-white text-shadow-lg mb-1 leading-tight hover:text-blog-green transition-colors`}>
            {title}
          </h2>
        </Link>
        {size === "large" && (
          <p className="text-gray-200 text-xs md:text-sm line-clamp-2 mb-1">{excerpt}</p>
        )}
        <Link to={`/post/${slug}`} className="text-blog-green hover:text-blog-accent text-xs font-medium transition-colors inline-flex items-center">
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
    </div>
  );
};

export default FeaturedPost;
