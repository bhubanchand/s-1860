
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  count?: number;
  maxSize?: number;
  minSize?: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 50,
  maxSize = 6,
  minSize = 2,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight * 2; // Make particles cover the entire page height
    
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * 5 + 5, // 5-10 seconds
        delay: Math.random() * 5, // 0-5 seconds delay
      });
    }
    
    setParticles(newParticles);
    
    // Handle resize
    const handleResize = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 2),
      })));
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [count, maxSize, minSize]);
  
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
