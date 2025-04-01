import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-blog-dark/95 backdrop-blur-sm shadow-md py-2"
          : "bg-blog-dark py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-white"
          >
            <img src="/favicon.ico" alt="Tonight Logo" className="w-8 h-8" />
            <span className="font-mono font-bold">tonight</span>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-blog-green transition-colors"
            >
              Home
            </Link>
            <Link
              to="/category/Entertainment"
              className="text-white hover:text-blog-green transition-colors"
            >
              Entertainment
            </Link>
            <Link
              to="/category/Technology"
              className="text-white hover:text-blog-green transition-colors"
            >
              Technology
            </Link>
            <Link
              to="/category/Lifestyle"
              className="text-white hover:text-blog-green transition-colors"
            >
              Lifestyle
            </Link>
            <Link
              to="/category/Gaming"
              className="text-white hover:text-blog-green transition-colors"
            >
              Gaming
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
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[300px] opacity-100 py-4"
              : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-blog-green transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/category/Entertainment"
              className="text-white hover:text-blog-green transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Entertainment
            </Link>
            <Link
              to="/category/Technology"
              className="text-white hover:text-blog-green transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Technology
            </Link>
            <Link
              to="/category/Lifestyle"
              className="text-white hover:text-blog-green transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Lifestyle
            </Link>
            <Link
              to="/category/Gaming"
              className="text-white hover:text-blog-green transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gaming
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
