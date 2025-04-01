
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">FW</div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-blog-green transition-colors">Home</Link>
            <Link to="/services" className="text-white hover:text-blog-green transition-colors">Services</Link>
            <Link to="/work" className="text-white hover:text-blog-green transition-colors">Work</Link>
            <Link to="/blog" className="text-white hover:text-blog-green transition-colors">Blog</Link>
            <Link to="/about" className="text-white hover:text-blog-green transition-colors">About</Link>
            <Link to="/contact" className="text-white hover:text-blog-green transition-colors">Contact</Link>
          </nav>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative h-screen flex items-center bg-black border-b border-white/5" 
          style={{
            backgroundImage: "url(/images/grid-pattern.svg)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="absolute inset-0 bg-[url('/lovable-uploads/c8d213c7-03e1-46ae-b981-5c23cac57b91.png')] bg-right-top bg-no-repeat opacity-60"></div>
          <div className="container mx-auto px-4 z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                We <span className="text-blog-green">brand</span> it all.
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                A creative agency focused on growing your brand through strategic design and digital marketing.
              </p>
              <Link to="/contact" className="inline-flex items-center bg-blog-green hover:bg-opacity-90 text-black font-bold py-3 px-6 rounded-sm transition-all">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-neutral-900 p-8 rounded-sm border border-white/5 hover:border-blog-green/30 transition-all group">
                <div className="bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full mb-6">
                  <span className="text-blog-green">01</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Future-forward</h3>
                <p className="text-gray-400 mb-6">We create cutting-edge digital experiences that push boundaries and set new standards.</p>
                <Link to="/services" className="text-blog-green group-hover:underline inline-flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="bg-neutral-900 p-8 rounded-sm border border-white/5 hover:border-blog-green/30 transition-all group">
                <div className="bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full mb-6">
                  <span className="text-blog-green">02</span>
                </div>
                <h3 className="text-xl font-bold mb-4">The Winning Edge</h3>
                <p className="text-gray-400 mb-6">Strategic solutions designed to give your brand the competitive advantage it deserves.</p>
                <Link to="/services" className="text-blog-green group-hover:underline inline-flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="bg-neutral-900 p-8 rounded-sm border border-white/5 hover:border-blog-green/30 transition-all group">
                <div className="bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full mb-6">
                  <span className="text-blog-green">03</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Simple Solutions</h3>
                <p className="text-gray-400 mb-6">We distill complex ideas into clean, intuitive designs that effectively communicate your message.</p>
                <Link to="/services" className="text-blog-green group-hover:underline inline-flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 bg-black border-t border-b border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-10 text-center">Trusted by leading brands</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <img src="/placeholder.svg" alt="Client Logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <img src="/placeholder.svg" alt="Client Logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <img src="/placeholder.svg" alt="Client Logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <img src="/placeholder.svg" alt="Client Logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </section>
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

export default Index;
