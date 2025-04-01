
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">FW</Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-blog-green transition-colors">Home</Link>
            <Link to="/services" className="text-white hover:text-blog-green transition-colors">Services</Link>
            <Link to="/work" className="text-white hover:text-blog-green transition-colors">Work</Link>
            <Link to="/blog" className="text-white hover:text-blog-green transition-colors">Blog</Link>
            <Link to="/about" className="text-white hover:text-blog-green transition-colors text-blog-green">About</Link>
            <Link to="/contact" className="text-white hover:text-blog-green transition-colors">Contact</Link>
          </nav>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-400">
            We are a creative agency focused on growing your brand through strategic design and digital marketing.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 mb-8">
            This is a placeholder for the About page. Content will be added later.
          </p>
          
          <div className="flex justify-center mt-8">
            <Link to="/contact" className="inline-flex items-center bg-blog-green hover:bg-opacity-90 text-black font-bold py-3 px-6 rounded-sm transition-all">
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-4">FW</h3>
              <p className="text-gray-400">Building brands that stand out in a crowded digital landscape.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/services" className="text-gray-400 hover:text-white">Branding</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white">Web Design</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white">Digital Marketing</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white">Social Media</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/work" className="text-gray-400 hover:text-white">Our Work</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2023 FW Agency. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-white text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
