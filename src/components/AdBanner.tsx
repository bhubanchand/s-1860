
import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adSlot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  format = 'auto',
  responsive = true,
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        // Push the ad to Google AdSense
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        console.log('AdSense ad pushed to queue', { adSlot });
      }
    } catch (error) {
      console.error('Error loading AdSense ad:', error);
    }
  }, [adSlot]);

  let adFormat = {};
  
  if (responsive) {
    adFormat = {
      display: 'block',
    };
  } else if (format === 'rectangle') {
    adFormat = {
      width: '300px',
      height: '250px',
    };
  } else if (format === 'horizontal') {
    adFormat = {
      width: '728px',
      height: '90px',
    };
  } else if (format === 'vertical') {
    adFormat = {
      width: '160px',
      height: '600px',
    };
  }

  return (
    <div ref={adRef} className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adFormat}
        data-ad-client="ca-pub-5927916631268063"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  );
};

export default AdBanner;
