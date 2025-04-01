
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Work = () => {
  // Mock work/case studies data
  const projects = [
    {
      id: 1,
      title: "Brand Refresh for Tech Startup",
      category: "Branding",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "E-commerce Website Redesign",
      category: "Web Development",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Social Media Campaign for Fashion Label",
      category: "Digital Marketing",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Mobile App UX/UI Design",
      category: "Design",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Product Launch Strategy",
      category: "Marketing",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Corporate Identity Design",
      category: "Branding",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">FW</Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-blog-green transition-colors">Home</Link>
            <Link to="/services" className="text-white hover:text-blog-green transition-colors">Services</Link>
            <Link to="/work" className="text-white hover:text-blog-green transition-colors text-blog-green">Work</Link>
            <Link to="/blog" className="text-white hover:text-blog-green transition-colors">Blog</Link>
            <Link to="/about" className="text-white hover:text-blog-green transition-colors">About</Link>
            <Link to="/contact" className="text-white hover:text-blog-green transition-colors">Contact</Link>
          </nav>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Our Work</h1>
          <p className="text-xl text-gray-400">
            Explore our case studies and see how we've helped brands achieve their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="aspect-w-16 aspect-h-12 rounded-sm overflow-hidden bg-neutral-900 mb-4">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blog-green/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-black text-white px-4 py-2 rounded-sm">View Project</span>
                </div>
              </div>
              <span className="text-sm text-blog-green block mb-2">{project.category}</span>
              <h3 className="text-xl font-bold group-hover:text-blog-green transition-colors">{project.title}</h3>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto mt-20 bg-neutral-900 p-12 rounded-sm border border-white/5 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's create something great together</h2>
          <p className="text-xl text-gray-400 mb-8">
            Ready to transform your brand with our creative expertise?
          </p>
          <Link to="/contact" className="inline-flex items-center bg-blog-green hover:bg-opacity-90 text-black font-bold py-3 px-8 rounded-sm transition-all">
            Start a Project <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
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

export default Work;
