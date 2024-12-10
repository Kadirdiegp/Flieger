import ReactGA from 'react-ga4';
import { Crisp } from 'crisp-sdk-web';

// Google Analytics
export const initGoogleAnalytics = () => {
  const GA_ID = import.meta.env.VITE_GA_ID;
  
  // Only initialize if we have a valid GA ID
  if (!GA_ID || GA_ID === 'your-ga-id-here') {
    console.warn('Google Analytics ID not configured');
    return;
  }

  // Add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_ID);
};

export const logPageView = () => {
  window.dataLayer.push({
    'event': 'page_view',
    'page_path': window.location.pathname
  });
};

// Facebook Pixel
export const initFacebookPixel = () => {
  const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;
  
  // Only initialize if we have a valid Pixel ID
  if (!FB_PIXEL_ID || FB_PIXEL_ID === 'your-fb-pixel-id-here') {
    console.warn('Facebook Pixel ID not configured');
    return;
  }

  // Load Facebook Pixel
  !function(f:any,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', FB_PIXEL_ID);
  fbq('track', 'PageView');
};

// Crisp Chat
export const initCrispChat = () => {
  Crisp.configure('YOUR-CRISP-WEBSITE-ID');
};

// HotJar
export const initHotjar = () => {
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:'YOUR-HOTJAR-ID',hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
};
