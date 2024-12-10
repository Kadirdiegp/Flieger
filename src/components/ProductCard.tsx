import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { ShoppingCart, Check, Heart } from 'lucide-react';
import { useCart } from '../lib/hooks/useCart';
import { useToast } from './ui/use-toast';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: string;
  category: string;
  sizes: string[];
  description: string;
  elementId: string;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, category, sizes, description, elementId, isInWishlist, toggleWishlist }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const [props, set] = useSpring(() => ({
    scale: 1,
    shadow: '0 0 0 rgba(0,0,0,0)',
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: parseFloat(price),
      size: selectedSize,
      quantity: 1,
      image,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <animated.div
      id={elementId}
      className="group relative"
      onMouseEnter={() => set({ scale: 1.02, shadow: '0 20px 25px rgba(0,0,0,0.1)' })}
      onMouseLeave={() => {
        set({ scale: 1, shadow: '0 0 0 rgba(0,0,0,0)' });
      }}
      style={props}
    >
      <div className={cn(
        "aspect-square overflow-hidden rounded-xl",
        "bg-gradient-to-b from-neutral-900 to-neutral-950",
        "flex items-center justify-center p-8"
      )}>
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-white">{name}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-lg font-semibold text-white">{price}€</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(id);
              }}
              className={cn(
                "p-2 rounded-full transition-colors",
                isInWishlist(id) ? "text-red-500" : "text-gray-400 hover:text-white"
              )}
            >
              <Heart className={cn("w-5 h-5", isInWishlist(id) && "fill-current")} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
              }}
              className={cn(
                "px-2 py-1 text-sm rounded-md transition-colors",
                selectedSize === size
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              )}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className={cn(
            "w-full transition-all duration-200",
            added && "bg-green-500 border-green-500 text-white"
          )}
          onClick={(e) => {
            e.preventDefault();
            if (!selectedSize) {
              toast({
                title: "Bitte wähle eine Größe",
                variant: "destructive"
              });
            } else {
              handleAddToCart();
              toast({
                title: "Zum Warenkorb hinzugefügt",
                description: `${name} in Größe ${selectedSize}`,
              });
            }
          }}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Hinzugefügt
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              {selectedSize ? 'In den Warenkorb' : 'Größe wählen'}
            </>
          )}
        </Button>
      </div>
    </animated.div>
  );
};