import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
}

export const WishlistButton: React.FC<{ product: Product }> = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = React.useState(false);

  React.useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some((item: Product) => item.id === product.id));
  }, [product.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isInWishlist) {
      const newWishlist = wishlist.filter((item: Product) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    } else {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    setIsInWishlist(!isInWishlist);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleWishlist}
      className={isInWishlist ? 'text-red-500' : ''}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
    </Button>
  );
};

export const WishlistDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (productId: string) => {
    const newWishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setWishlist(newWishlist);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <Heart className="h-5 w-5" />
        {wishlist.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-900 z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Wunschliste</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              {wishlist.length === 0 ? (
                <div className="text-center text-neutral-400 mt-12">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Deine Wunschliste ist noch leer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-4 bg-neutral-800 p-4 rounded-lg"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-neutral-400">
                          {product.size && `Größe: ${product.size}`}
                        </p>
                        <p className="font-medium">{product.price}€</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
