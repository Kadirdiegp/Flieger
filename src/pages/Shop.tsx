import React, { useState, useEffect } from 'react';
import { useFilters } from '../lib/hooks/useFilters';
import { FilterSection } from '../components/shop/FilterSection';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useLocation } from 'react-router-dom';
import { useCart } from '../lib/hooks/useCart';
import { useWishlist } from '../lib/hooks/useWishlist';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

const Shop = () => {
  const { filters, updateFilter, resetFilters } = useFilters({
    category: 'all',
    size: 'all',
    color: 'all',
    priceRange: [0, 500],
  });

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const featuredProduct = searchParams.get('product');
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (featuredProduct === 'premium-hoodie') {
      updateFilter('category', 'hoodies');
      const element = document.getElementById('premium-hoodie');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [featuredProduct]);

  useEffect(() => {
    if (categoryParam) {
      updateFilter('category', categoryParam);
    }
  }, [categoryParam, updateFilter]);

  // Aktive Filter berechnen
  const activeFilters = [
    filters.category !== 'all' && { type: 'category', value: filters.category, label: getCategoryLabel(filters.category) },
    filters.size !== 'all' && { type: 'size', value: filters.size, label: filters.size.toUpperCase() },
    filters.color !== 'all' && { type: 'color', value: filters.color, label: getColorLabel(filters.color) },
    filters.priceRange[1] < 500 && { type: 'price', value: filters.priceRange, label: `Bis ${filters.priceRange[1]}€` }
  ].filter(Boolean);

  // Produkte filtern und sortieren
  let filteredProducts = products.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.size !== 'all' && !product.sizes.includes(filters.size)) return false;
    if (filters.color !== 'all' && !product.colors.includes(filters.color)) return false;
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    )
      return false;
    return true;
  });

  // Sortierung anwenden
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-desc':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'popular':
        return (b.popularity || 0) - (a.popularity || 0);
      case 'newest':
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  // Filter Label Helper Funktionen
  function getCategoryLabel(category: string): string {
    const categories = {
      'hoodies': 'Hoodies',
      'tshirts': 'T-Shirts',
      'pants': 'Hosen'
    };
    return categories[category] || category;
  }

  function getColorLabel(color: string): string {
    const colors = {
      'black': 'Schwarz',
      'white': 'Weiß',
      'gray': 'Grau',
      'navy': 'Navy'
    };
    return colors[color] || color;
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle und Sortierung */}
        <div className="lg:hidden mb-4 flex gap-2">
          <Button 
            onClick={() => setShowMobileFilters(true)}
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-900 text-white border-neutral-800">
              <DropdownMenuItem onClick={() => setSortBy('newest')} className="hover:bg-neutral-800">
                Neueste zuerst
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('price-asc')} className="hover:bg-neutral-800">
                Preis: Aufsteigend
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('price-desc')} className="hover:bg-neutral-800">
                Preis: Absteigend
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('popular')} className="hover:bg-neutral-800">
                Beliebteste zuerst
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Aktive Filter Tags */}
        {activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <div
                key={filter.type + filter.value}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-800 text-white text-sm"
              >
                {filter.label}
                <button
                  onClick={() => {
                    if (filter.type === 'price') {
                      updateFilter('priceRange', [0, 500]);
                    } else {
                      updateFilter(filter.type, 'all');
                    }
                  }}
                  className="ml-1 hover:text-neutral-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={resetFilters}
                className="text-sm text-neutral-400 hover:text-white"
              >
                Alle Filter zurücksetzen
              </button>
            )}
          </div>
        )}

        {/* Mobile Filter Overlay */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setShowMobileFilters(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed right-0 top-0 h-full w-full max-w-xs bg-neutral-900 p-4 z-50 lg:hidden overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-white">Filter</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileFilters(false)}
                    className="text-white hover:text-white hover:bg-neutral-800"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <FilterSection
                  filters={filters}
                  onFilterChange={updateFilter}
                  onReset={resetFilters}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <FilterSection
              filters={filters}
              onFilterChange={updateFilter}
              onReset={resetFilters}
            />
          </div>

          {/* Products Grid mit Desktop Sortierung */}
          <div className="lg:col-span-3">
            <div className="hidden lg:flex justify-end mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800">
                    Sortieren
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-neutral-900 text-white border-neutral-800">
                  <DropdownMenuItem onClick={() => setSortBy('newest')} className="hover:bg-neutral-800">
                    Neueste zuerst
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price-asc')} className="hover:bg-neutral-800">
                    Preis: Aufsteigend
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price-desc')} className="hover:bg-neutral-800">
                    Preis: Absteigend
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('popular')} className="hover:bg-neutral-800">
                    Beliebteste zuerst
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-white mb-2">
                  Keine Produkte gefunden
                </h3>
                <p className="text-neutral-400">
                  Versuche es mit anderen Filtereinstellungen
                </p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price.toString()}
                    category={product.category}
                    sizes={product.sizes}
                    isInWishlist={isInWishlist}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const products = [
  {
    id: '1',
    name: 'Premium Hoodie Schwarz',
    price: 89.99,
    category: 'hoodies',
    sizes: ['s', 'm', 'l', 'xl'],
    colors: ['black'],
    image: '/products/hoodie-black.png',
    featured: true,
    elementId: 'premium-hoodie'
  },
  {
    id: '2',
    name: 'Essential T-Shirt Weiß',
    price: 29.99,
    category: 'tshirts',
    sizes: ['xs', 's', 'm', 'l', 'xl'],
    colors: ['white'],
    image: '/products/tshirt-white.png',
  },
  {
    id: '3',
    name: 'Cargo Hose Schwarz',
    price: 79.99,
    category: 'pants',
    sizes: ['s', 'm', 'l', 'xl'],
    colors: ['black'],
    image: '/products/pants-black.png',
  },
  {
    id: '4',
    name: 'Oversized Hoodie Grau',
    price: 94.99,
    category: 'hoodies',
    sizes: ['m', 'l', 'xl', 'xxl'],
    colors: ['gray'],
    image: '/products/hoodie-gray.png',
  },
  {
    id: '5',
    name: 'Premium T-Shirt Schwarz',
    price: 34.99,
    category: 'tshirts',
    sizes: ['s', 'm', 'l'],
    colors: ['black'],
    image: '/products/tshirt-black.png',
  },
  {
    id: '6',
    name: 'Slim Fit Hose Grau',
    price: 69.99,
    category: 'pants',
    sizes: ['s', 'm', 'l'],
    colors: ['gray'],
    image: '/products/pants-gray.png',
  },
];

export default Shop;