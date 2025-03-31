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
const BlogPost = lazy(() => import("./pages/BlogPost"));
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
const Loader = () => <div className="loading-spinner">Loading...</div>;

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
                <Index />
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
            path="/contact"
            element={
              <Suspense fallback={<Loader />}>
                <ContactUs />
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
