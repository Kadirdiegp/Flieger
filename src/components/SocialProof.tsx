import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Star, ShoppingBag, Users } from 'lucide-react';

interface ViewerNotification {
  productId: string;
  count: number;
}

interface RecentPurchase {
  productId: string;
  buyerName: string;
  location: string;
  timeAgo: string;
}

export const LiveViewers: React.FC<{ productId: string }> = ({ productId }) => {
  const [viewers, setViewers] = React.useState<number>(0);

  React.useEffect(() => {
    // Simulate real-time viewer updates
    const baseViewers = Math.floor(Math.random() * 20) + 5;
    setViewers(baseViewers);

    const interval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setViewers(prev => Math.max(5, prev + change));
    }, 30000);

    return () => clearInterval(interval);
  }, [productId]);

  const message = productId === 'featured' 
    ? `${viewers} Besucher online`
    : `${viewers} Personen schauen sich dieses Produkt gerade an`;

  return (
    <div className="flex items-center gap-2 text-sm text-neutral-400">
      <Eye className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};

export const RecentPurchaseNotification: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentPurchase, setCurrentPurchase] = React.useState<RecentPurchase | null>(null);

  const mockPurchases: RecentPurchase[] = [
    { productId: '1', buyerName: 'Max', location: 'Berlin', timeAgo: 'vor 2 Minuten' },
    { productId: '2', buyerName: 'Lisa', location: 'Hamburg', timeAgo: 'vor 5 Minuten' },
    { productId: '3', buyerName: 'Tom', location: 'München', timeAgo: 'vor 8 Minuten' },
  ];

  React.useEffect(() => {
    const showNotification = () => {
      const randomPurchase = mockPurchases[Math.floor(Math.random() * mockPurchases.length)];
      setCurrentPurchase(randomPurchase);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    const interval = setInterval(showNotification, 15000);
    showNotification(); // Show first notification immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && currentPurchase && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 bg-neutral-900 p-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-center gap-3">
            <div className="bg-neutral-800 p-2 rounded-full">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">{currentPurchase.buyerName}</span> aus{' '}
                <span className="font-medium">{currentPurchase.location}</span> hat gerade
                eingekauft
              </p>
              <p className="text-xs text-neutral-400">{currentPurchase.timeAgo}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ProductStats: React.FC<{ productId: string }> = ({ productId }) => {
  return (
    <div className="grid grid-cols-2 gap-4 my-6">
      <div className="bg-neutral-900 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-5 w-5 text-neutral-400" />
          <span className="text-sm font-medium">Käufer insgesamt</span>
        </div>
        <p className="text-2xl font-bold">1.2k+</p>
      </div>
      <div className="bg-neutral-900 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-neutral-400" />
          <span className="text-sm font-medium">Durchschnittliche Bewertung</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">4.8</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 text-yellow-400 fill-current"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
