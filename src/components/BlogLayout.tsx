
import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-blog-dark">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default BlogLayout;
