
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTopOnNavigation from "./components/ScrollToTopOnNavigation";
import GTMTracker from "./GTMTracker";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useBlogStore } from "./data/posts";
import SEOManager from "./components/SEOManager";
import { HelmetProvider } from "react-helmet-async";
import BlogProvider from "./BlogProvider";

// Lazy load pages with consistent casing
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

// Simple fallback component
const Fallback = () => <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Data refresh component that forces data refresh on page change
const DataRefresher = () => {
  const location = useLocation();
  const fetchPosts = useBlogStore(state => state.fetchPosts);
  
  useEffect(() => {
    // Check if we should refresh data on this navigation
    const shouldRefreshData = Math.random() < 0.3; // 30% chance to refresh data on navigation
    
    if (shouldRefreshData) {
      console.log("Refreshing blog data on navigation to:", location.pathname);
      fetchPosts({ forceFresh: true });
    }
  }, [location.pathname, fetchPosts]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TooltipProvider>
          <GTMTracker />
          <ScrollToTopOnNavigation />
          <DataRefresher />
          <SEOManager />
          <BlogProvider />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Fallback />}>
                  <Index />
                </Suspense>
              }
            />
            <Route
              path="/post/:slug"
              element={
                <Suspense fallback={<Fallback />}>
                  <BlogPost />
                </Suspense>
              }
            />
            <Route
              path="/team"
              element={
                <Suspense fallback={<Fallback />}>
                  <OurTeam />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<Fallback />}>
                  <ContactUs />
                </Suspense>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <Suspense fallback={<Fallback />}>
                  <PrivacyPolicy />
                </Suspense>
              }
            />
            <Route
              path="/terms-of-service"
              element={
                <Suspense fallback={<Fallback />}>
                  <TermsOfService />
                </Suspense>
              }
            />
            <Route
              path="/category/:category"
              element={
                <Suspense fallback={<Fallback />}>
                  <CategoryPage />
                </Suspense>
              }
            />
            <Route
              path="/search"
              element={
                <Suspense fallback={<Fallback />}>
                  <SearchResults />
                </Suspense>
              }
            />
            <Route
              path="/trending"
              element={
                <Suspense fallback={<Fallback />}>
                  <TrendingBlogs />
                </Suspense>
              }
            />
            <Route
              path="/movies"
              element={
                <Suspense fallback={<Fallback />}>
                  <MovieBlogs />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Fallback />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
