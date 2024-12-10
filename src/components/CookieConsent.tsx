import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = React.useState(false);

  React.useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setShowConsent(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-4 z-50"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white text-sm">
            <p>
              Wir verwenden Cookies, um dein Einkaufserlebnis zu verbessern und unsere Dienste
              bereitzustellen. Durch die weitere Nutzung der Website stimmst du der Verwendung
              von Cookies zu.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={acceptEssential}
              className="text-white border-neutral-700 hover:bg-neutral-800"
            >
              Nur Essenzielle
            </Button>
            <Button onClick={acceptAll}>Alle akzeptieren</Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
