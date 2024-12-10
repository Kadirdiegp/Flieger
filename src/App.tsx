import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes';
import { initGoogleAnalytics, initFacebookPixel } from './utils/analytics';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';  // Import i18n configuration

// Enable future flags for React Router
import { UNSAFE_EnableScrollRestoration, UNSAFE_useScrollRestoration } from 'react-router-dom';

// Configure future flags
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

import { ToastProvider } from './components/ui/toast';
import { Toaster } from './components/ui/toaster';

const App: React.FC = () => {
  React.useEffect(() => {
    // Initialize analytics and tracking
    initGoogleAnalytics();
    initFacebookPixel();
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter {...router}>
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <Layout>
              <AppRoutes />
            </Layout>
            <Footer />
          </div>
          <Toaster />
        </ToastProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;