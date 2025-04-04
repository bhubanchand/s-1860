
import React, { useEffect, useRef, useState } from "react";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  className?: string;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 25,
  color = "rgba(255, 255, 255, 0.2)",
  minSize = 2,
  maxSize = 5,
  minSpeed = 0.5,
  maxSpeed = 1.5,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateDimensions = () => {
      if (canvas.parentElement) {
        const { width, height } = canvas.parentElement.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        setDimensions({ width, height });
      }
    };

    // Initial dimensions
    updateDimensions();

    // Resize listener
    window.addEventListener("resize", updateDimensions);

    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: minSize + Math.random() * (maxSize - minSize),
        speedX: (minSpeed + Math.random() * (maxSpeed - minSpeed)) * (Math.random() > 0.5 ? 1 : -1),
        speedY: (minSpeed + Math.random() * (maxSpeed - minSpeed)) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary checking
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, color, minSize, maxSize, minSpeed, maxSpeed]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 z-0"
      />
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default FloatingParticles;
