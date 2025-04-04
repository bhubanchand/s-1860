
import React, { useEffect, useRef, useState } from "react";

type AnimationStyle = "fade-up" | "fade-in" | "fade-down" | "scale-in" | "slide-in";

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: AnimationStyle;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 500,
  className = "",
  threshold = 0.2,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const getAnimationStyle = () => {
    let transform = "translateY(0)";
    let opacity = isVisible ? 1 : 0;
    
    switch (animation) {
      case "fade-up":
        transform = isVisible ? "translateY(0)" : "translateY(30px)";
        break;
      case "fade-down":
        transform = isVisible ? "translateY(0)" : "translateY(-30px)";
        break;
      case "scale-in":
        transform = isVisible ? "scale(1)" : "scale(0.95)";
        break;
      case "slide-in":
        transform = isVisible ? "translateX(0)" : "translateX(-30px)";
        break;
      default:
        break;
    }

    return {
      opacity,
      transform,
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    };
  };

  return (
    <div ref={elementRef} className={className} style={getAnimationStyle()}>
      {children}
    </div>
  );
};

export default AnimatedElement;
