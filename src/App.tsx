import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index"; // Fixed import case
import Layout from "./components/Layout";
import CategoryPage from "./pages/CategoryPage";
import GTMTracker from "./GTMTracker";
import AboutPage from "./pages/AboutPage";
import TrendingBlogs from "./pages/TrendingBlogs";
import MovieBlogs from "./pages/MovieBlogs";
import ContactUs from "./pages/ContactUs";
import BlogProvider from "./BlogProvider";
import SearchResults from "./pages/SearchResults";
import OurTeam from "./pages/OurTeam";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import "./App.css";

function App() {
  useEffect(() => {
    // console.log("App component mounted");
  }, []);

  return (
    <>
      <BlogProvider>
        <Router>
          <GTMTracker />
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/post/:slug" element={<BlogPostPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/trending" element={<TrendingBlogs />} />
              <Route path="/movies" element={<MovieBlogs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/team" element={<OurTeam />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
        <Toaster richColors closeButton />
      </BlogProvider>
    </>
  );
}

export default App;
