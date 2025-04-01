
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import NightModeToggle from "./NightModeToggle";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const isAgencyPath = location.pathname.startsWith('/agency') || location.pathname === '/services' || location.pathname === '/contact';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-amoled-black/95 backdrop-blur-sm shadow-md py-2"
          : "bg-amoled-black py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-white"
          >
            <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
            <span className="font-mono font-bold">YourAgency</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/agency"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/agency' ? 'text-blog-green' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/services' ? 'text-blog-green' : ''
              }`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/contact' ? 'text-blog-green' : ''
              }`}
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/blog' || (location.pathname.includes('/category') && !isAgencyPath) ? 'text-blog-green' : ''
              }`}
            >
              Blog
            </Link>
            <Link
              to="/team"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/team' ? 'text-blog-green' : ''
              }`}
            >
              Our Team
            </Link>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary p-2 rounded-md text-white w-36 focus:w-48 focus:outline-none focus:ring-1 focus:ring-blog-green transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-muted-foreground"
              >
                <Search size={16} />
              </button>
            </form>
            <NightModeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <NightModeToggle />
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[400px] opacity-100 py-4"
              : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/agency"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/agency' ? 'text-blog-green' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/services' ? 'text-blog-green' : ''
              }`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/contact' ? 'text-blog-green' : ''
              }`}
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/blog' || (location.pathname.includes('/category') && !isAgencyPath) ? 'text-blog-green' : ''
              }`}
            >
              Blog
            </Link>
            <Link
              to="/team"
              className={`text-white hover:text-blog-green transition-colors ${
                location.pathname === '/team' ? 'text-blog-green' : ''
              }`}
            >
              Our Team
            </Link>
            <form onSubmit={handleSearch} className="relative mt-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary p-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blog-green"
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-muted-foreground"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
