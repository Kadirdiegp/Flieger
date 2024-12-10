import React from 'react';
import { Heart } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { useWishlist } from '../../lib/hooks/useWishlist';
import { ProductCard } from '../ProductCard';
import { cn } from '../../lib/utils';

export const WishlistDrawer = () => {
  const { wishlist, isInWishlist, toggleWishlist } = useWishlist();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <Heart className={cn("h-6 w-6", wishlist.length > 0 && "fill-red-500 text-red-500")} />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Wunschliste ({wishlist.length})</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">
                Deine Wunschliste ist noch leer
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard
                  {...product}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
