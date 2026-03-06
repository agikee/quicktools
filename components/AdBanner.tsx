'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual AdSense publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Placeholder for development
export function AdPlaceholder({ type = 'sidebar' }: { type?: 'sidebar' | 'inline' | 'banner' }) {
  const sizes = {
    sidebar: 'h-[300px] w-full',
    inline: 'h-[90px] w-full',
    banner: 'h-[250px] w-full',
  };

  return (
    <div
      className={`${sizes[type]} bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm`}
    >
      Advertisement
    </div>
  );
}
