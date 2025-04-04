
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to ensure Google Ads and GTM tracking are properly loaded on each page
 */
export function useTrackingAndAds() {
  const location = useLocation();
  
  useEffect(() => {
    // Check if GTM is loaded
    if (window.dataLayer) {
      // Send page view event to GTM
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname,
        page_title: document.title,
        timestamp: new Date().toISOString(),
        logo_image: 'https://res.cloudinary.com/dyzamqtdw/image/upload/v1743554489/logo_llf3w4.svg'
      });
      
      console.log(`Page view tracked for ${location.pathname}`);
    } else {
      console.warn('GTM not loaded properly');
    }
    
    // Handle Google AdSense
    if (window.adsbygoogle) {
      try {
        // Refresh ads on page navigation
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('Google AdSense ads refreshed');
      } catch (error) {
        console.error('Error refreshing AdSense ads:', error);
      }
    } else {
      console.warn('Google AdSense not loaded properly');
    }
  }, [location.pathname]);
}
