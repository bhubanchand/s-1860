
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-white bg-opacity-95 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-serif font-bold">Serene</Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/category/technology" className="text-gray-600 hover:text-gray-900 transition duration-200">Technology</Link>
            <Link to="/category/design" className="text-gray-600 hover:text-gray-900 transition duration-200">Design</Link>
            <Link to="/category/business" className="text-gray-600 hover:text-gray-900 transition duration-200">Business</Link>
            <Link to="/category/lifestyle" className="text-gray-600 hover:text-gray-900 transition duration-200">Lifestyle</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="hidden md:flex">Sign In</Button>
          <Button className="hidden md:flex">Subscribe</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
