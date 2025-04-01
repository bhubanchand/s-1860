
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
    console.log("GTM initialized with ID:", tagManagerArgs.gtmId);
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

    // Send enhanced data to GTM
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        pagePath: location.pathname,
        pageTitle: document.title,
        pageName: pageName,
        pageDepth: pathSegments.length,
        pageQuery: location.search,
        timestamp: new Date().toISOString(),
      },
    });

    console.log(`Page tracked: ${pageName} (${location.pathname})`);
  }, [location]);

  return null;
};

export default GTMTracker;
