
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopOnNavigation from "./components/ScrollToTopOnNavigation";
import GTMTracker from "./GTMTracker";
import { TooltipProvider } from "@/components/ui/tooltip";
import BlogProvider from "./BlogProvider";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Agency = lazy(() => import("./pages/Agency"));
const Services = lazy(() => import("./pages/Services"));
const AgencyContact = lazy(() => import("./pages/AgencyContact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OurTeam = lazy(() => import("./pages/OurTeam"));
const ContactUs = lazy(() => import("./pages/ContactUs")); 
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const TrendingBlogs = lazy(() => import("./pages/TrendingBlogs"));
const MovieBlogs = lazy(() => import("./pages/MovieBlogs"));

// Custom loading fallback
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-amoled-black">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blog-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-lg font-medium">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BlogProvider />
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <TooltipProvider>
        <GTMTracker />
        <ScrollToTopOnNavigation />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Agency />
              </Suspense>
            }
          />
          <Route
            path="/agency"
            element={
              <Suspense fallback={<Loader />}>
                <Agency />
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={<Loader />}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loader />}>
                <AgencyContact />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<Loader />}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="/post/:slug"
            element={
              <Suspense fallback={<Loader />}>
                <BlogPost />
              </Suspense>
            }
          />
          <Route
            path="/team"
            element={
              <Suspense fallback={<Loader />}>
                <OurTeam />
              </Suspense>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={<Loader />}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <Suspense fallback={<Loader />}>
                <TermsOfService />
              </Suspense>
            }
          />
          <Route
            path="/category/:category"
            element={
              <Suspense fallback={<Loader />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<Loader />}>
                <SearchResults />
              </Suspense>
            }
          />
          <Route
            path="/trending"
            element={
              <Suspense fallback={<Loader />}>
                <TrendingBlogs />
              </Suspense>
            }
          />
          <Route
            path="/movies"
            element={
              <Suspense fallback={<Loader />}>
                <MovieBlogs />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
