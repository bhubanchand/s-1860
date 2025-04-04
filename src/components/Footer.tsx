import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h3 className="text-xl font-bold text-white mb-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-2xl font-bold text-white hover:scale-105 transition-transform duration-300 !no-underline"
              >
                <img
                  src="https://res.cloudinary.com/dyzamqtdw/image/upload/v1743554489/logo_llf3w4.svg"
                  alt="Tonight Logo"
                  className="w-8 h-8"
                />
                <span className="font-mono font-bold">tonight</span>
              </Link>
            </h3>
            <p className="text-muted-foreground">
              Tonight isn't just a blog. It's a time machine. Fast, fresh, and packed with the future of trends, tech, and lifestyle.
            </p>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/Entertainment"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 !no-underline"
                >
                  Entertainment
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Technology"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 !no-underline"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Lifestyle"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 !no-underline"
                >
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Gaming"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 !no-underline"
                >
                  Gaming
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/team"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 !no-underline"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 !no-underline"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy" 
                  className="text-muted-foreground hover:text-white transition-colors duration-300 !no-underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 !no-underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <h4 className="text-white font-semibold mb-4">Subscribe</h4>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest news and articles.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md bg-muted text-white focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-white"
              />
              <button className="bg-white hover:bg-white/80 transition-colors duration-300 px-4 py-2 rounded-r-md text-black font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-8 text-center text-muted-foreground animate-fade-up" style={{ animationDelay: "500ms" }}>
          <p>© {new Date().getFullYear()} Tonight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
