import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletterPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    localStorage.setItem('newsletterPopup', 'seen');
    setShowPopup(false);
  };

  const handleClose = () => {
    localStorage.setItem('newsletterPopup', 'seen');
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-neutral-900 p-6 rounded-xl max-w-md w-full relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-neutral-400"
          >
            <X className="h-5 w-5" />
          </button>

          <h3 className="text-2xl font-bold text-white mb-2">10% Rabatt sichern</h3>
          <p className="text-neutral-400 mb-6">
            Melde dich für unseren Newsletter an und erhalte 10% Rabatt auf deine erste Bestellung.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Deine E-Mail Adresse"
              className="w-full p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:border-white focus:ring-white"
              required
            />
            <Button type="submit" className="w-full">
              Anmelden & Rabatt sichern
            </Button>
          </form>

          <p className="text-xs text-neutral-500 mt-4">
            Mit deiner Anmeldung stimmst du zu, regelmäßig E-Mails mit Angeboten von FLEYVER zu erhalten.
            Du kannst dich jederzeit wieder abmelden.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
