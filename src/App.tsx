
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopOnNavigation from "./components/ScrollToTopOnNavigation";
import GTMTracker from "./GTMTracker";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingScreen from "./components/LoadingScreen";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
              <Suspense fallback={<LoadingScreen />}>
                <Index />
              </Suspense>
            }
          />
          <Route
            path="/post/:slug"
            element={
              <Suspense fallback={<LoadingScreen message="Loading article..." />}>
                <BlogPost />
              </Suspense>
            }
          />
          <Route
            path="/team"
            element={
              <Suspense fallback={<LoadingScreen message="Loading team info..." />}>
                <OurTeam />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<LoadingScreen message="Loading contact page..." />}>
                <ContactUs />
              </Suspense>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={<LoadingScreen message="Loading privacy policy..." />}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <Suspense fallback={<LoadingScreen message="Loading terms of service..." />}>
                <TermsOfService />
              </Suspense>
            }
          />
          <Route
            path="/category/:category"
            element={
              <Suspense fallback={<LoadingScreen message="Loading category..." />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<LoadingScreen message="Searching..." />}>
                <SearchResults />
              </Suspense>
            }
          />
          <Route
            path="/trending"
            element={
              <Suspense fallback={<LoadingScreen message="Loading trending content..." />}>
                <TrendingBlogs />
              </Suspense>
            }
          />
          <Route
            path="/movies"
            element={
              <Suspense fallback={<LoadingScreen message="Loading movie blogs..." />}>
                <MovieBlogs />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingScreen message="Page not found" />}>
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
