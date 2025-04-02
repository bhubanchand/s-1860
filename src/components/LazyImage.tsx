
import React, { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoaded(false);

    // Create image object to preload
    const img = new Image();
    
    // Set up load event before setting src
    img.onload = () => {
      setIsLoaded(true);
      setImgSrc(src);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setIsLoaded(true); // Still mark as loaded to remove skeleton
      setImgSrc("https://res.cloudinary.com/dyzamqtdw/image/upload/v1743420162/placeholder.svg");
    };
    
    // Start loading
    img.src = src;

    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className="relative">
      {!isLoaded && (
        <Skeleton 
          className={`absolute inset-0 ${className}`}
          style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        />
      )}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          width={width}
          height={height}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
