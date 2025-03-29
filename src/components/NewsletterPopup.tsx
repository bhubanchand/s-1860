
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NewsletterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  useEffect(() => {
    // Check if the user already subscribed
    const hasSubscribed = localStorage.getItem('newsletterSubscribed') === 'true';
    if (hasSubscribed) {
      return;
    }
    
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulating subscription
    setIsSubscribed(true);
    localStorage.setItem('newsletterSubscribed', 'true');
    
    // Close popup after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="relative max-w-md w-full bg-blog-darker border border-blog-neon animate-glow rounded-lg overflow-hidden z-10 animate-scale-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
          onClick={handleClose}
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          {!isSubscribed ? (
            <>
              <h3 className="text-2xl font-bold text-blog-neon text-shadow-neon mb-2">
                Join the Cybernetic Revolution
              </h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter and stay updated with the latest tech insights and futuristic content.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-blog-charcoal border border-gray-700 p-3 rounded-md text-white focus:outline-none focus:border-blog-neon transition-colors duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full neon-button-pink font-medium"
                >
                  Subscribe Now
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to our privacy policy and terms of service.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-blog-neon text-black flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blog-neon text-shadow-neon mb-2">
                Thank You!
              </h3>
              <p className="text-gray-300">
                You've successfully subscribed to our newsletter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
