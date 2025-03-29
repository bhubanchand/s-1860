
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Blog<span className="text-blog-green">Pulse</span>
            </h3>
            <p className="text-muted-foreground">
              Your source for the latest entertainment and tech news.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/Entertainment" className="text-muted-foreground hover:text-blog-green transition-colors">
                  Entertainment
                </Link>
              </li>
              <li>
                <Link to="/category/Technology" className="text-muted-foreground hover:text-blog-green transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/Lifestyle" className="text-muted-foreground hover:text-blog-green transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/category/Gaming" className="text-muted-foreground hover:text-blog-green transition-colors">
                  Gaming
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-blog-green transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-blog-green transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-blog-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-blog-green transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Subscribe</h4>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest news and articles.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md bg-muted text-white focus:outline-none"
              />
              <button className="bg-blog-green hover:bg-green-600 transition-colors px-4 py-2 rounded-r-md text-white font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} BlogPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
