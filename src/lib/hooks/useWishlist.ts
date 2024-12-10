import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  sizes: string[];
  description: string;
}

interface WishlistStore {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
}

const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (product) =>
        set((state) => ({
          wishlist: [...state.wishlist, product],
        })),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().wishlist.some((item) => item.id === productId),
      toggleWishlist: (productId) => {
        const store = get();
        if (store.isInWishlist(productId)) {
          store.removeFromWishlist(productId);
        } else {
          const product = store.wishlist.find((item) => item.id === productId);
          if (product) {
            store.addToWishlist(product);
          }
        }
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

export const useWishlist = () => {
  const store = useWishlistStore();
  return {
    wishlist: store.wishlist,
    addToWishlist: store.addToWishlist,
    removeFromWishlist: store.removeFromWishlist,
    isInWishlist: store.isInWishlist,
    toggleWishlist: store.toggleWishlist,
  };
};
