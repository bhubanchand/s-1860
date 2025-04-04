
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { useLocation } from "react-router-dom";

// GTM configuration
const tagManagerArgs = {
  gtmId: "GTM-DJXRBJWV", 
};

// Page path to readable name mapping for better analytics reporting
const pageNameMap: Record<string, string> = {
  "/": "HOME_PAGE",
  "/team": "TEAM_PAGE",
  "/contact": "CONTACT_PAGE",
  "/privacy-policy": "PRIVACY_POLICY",
  "/terms-of-service": "TERMS_OF_SERVICE",
  "/trending": "TRENDING_BLOGS",
  "/movies": "MOVIE_BLOGS",
  "/search": "SEARCH_RESULTS",
};

const GTMTracker = () => {
  const location = useLocation();

  // Initialize Google Tag Manager
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
    
    // Log GTM initialization
    console.log("Google Tag Manager initialized with ID:", tagManagerArgs.gtmId);
  }, []);

  // Track page views with enhanced data
  useEffect(() => {
    // Generate path segments for hierarchical reporting
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // Get page name from map or generate one based on path
    let pageName = pageNameMap[location.pathname] || "";
    
    // For dynamic routes, create standardized names
    if (location.pathname.startsWith("/post/")) {
      pageName = "BLOG_POST";
    } else if (location.pathname.startsWith("/category/")) {
      pageName = "CATEGORY_PAGE";
    } else if (!pageName) {
      // Generate name for unmapped pages
      pageName = pathSegments.length 
        ? `PAGE_${pathSegments.join('_').toUpperCase()}`
        : "UNKNOWN_PAGE";
    }

    // Create navigation timestamp
    const navigationTimestamp = new Date().toISOString();

    // Track page navigation with enhanced data
    TagManager.dataLayer({
      dataLayer: {
        event: "page_navigation",
        previousPage: sessionStorage.getItem('currentPage') || "",
        currentPage: location.pathname,
        pagePath: location.pathname,
        pageTitle: document.title,
        pageName: pageName,
        pageDepth: pathSegments.length,
        pageQuery: location.search,
        timestamp: navigationTimestamp,
        userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        clientTime: new Date().toLocaleTimeString(),
        refreshRequest: true,
      },
    });

    // Store current page for next navigation event
    sessionStorage.setItem('currentPage', location.pathname);

    // Additional page_view event for standard analytics
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        pagePath: location.pathname,
        pageTitle: document.title,
        pageName: pageName,
        timestamp: navigationTimestamp,
      },
    });

    console.log(`Navigation tracked: ${location.pathname} (${pageName})`);
  }, [location]);

  return null;
};

export default GTMTracker;
