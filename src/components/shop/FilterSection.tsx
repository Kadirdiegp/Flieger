import React from 'react';
import { FilterState } from '../../lib/hooks/useFilters';
import { Button } from '../ui/button';
import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '../ui/slider';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onReset: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const FilterHeader = ({ title, section }: { title: string; section: string }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-4 text-left"
    >
      <span className="text-sm font-medium text-white">{title}</span>
      <ChevronDown
        className={`h-4 w-4 text-white transition-transform ${
          activeSection === section ? 'rotate-180' : ''
        }`}
      />
    </button>
  );

  // Größen-Mapping
  const sizeMap = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const sizeIndex = sizeMap.findIndex(size => size.toLowerCase() === filters.size) || 2; // Default to M

  // Farben-Mapping
  const colorMap = [
    { id: 'all', name: 'Alle Farben', hex: '#FFFFFF' },
    { id: 'black', name: 'Schwarz', hex: '#000000' },
    { id: 'white', name: 'Weiß', hex: '#FFFFFF' },
    { id: 'gray', name: 'Grau', hex: '#808080' },
    { id: 'blue', name: 'Blau', hex: '#0000FF' },
    { id: 'red', name: 'Rot', hex: '#FF0000' }
  ];

  return (
    <div className="sticky top-24 bg-neutral-900 rounded-xl border border-neutral-800">
      <div className="p-4 border-b border-neutral-800">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Filter</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-white hover:text-white hover:bg-neutral-800"
          >
            <X className="h-4 w-4 mr-2" />
            Zurücksetzen
          </Button>
        </div>
      </div>

      <div className="divide-y divide-neutral-800">
        {/* Category Filter */}
        <div className="px-4">
          <FilterHeader title="Kategorie" section="category" />
          <AnimatePresence>
            {activeSection === 'category' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pb-4"
              >
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'Alle Kategorien' },
                    { id: 'hoodies', label: 'Hoodies' },
                    { id: 'tshirts', label: 'T-Shirts' },
                    { id: 'pants', label: 'Hosen' }
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => onFilterChange('category', id)}
                      className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                        filters.category === id
                          ? 'bg-white text-black'
                          : 'text-white hover:bg-neutral-800'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Size Filter */}
        <div className="px-4">
          <FilterHeader title="Größe" section="size" />
          <AnimatePresence>
            {activeSection === 'size' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pb-4"
              >
                <div className="px-2 pt-4">
                  <Slider
                    defaultValue={[sizeIndex]}
                    min={0}
                    max={5}
                    step={1}
                    onValueChange={(value) => {
                      onFilterChange('size', sizeMap[value[0]].toLowerCase());
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-neutral-400 mt-2">
                    {sizeMap.map((size) => (
                      <span key={size}>{size}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Color Filter */}
        <div className="px-4">
          <FilterHeader title="Farbe" section="color" />
          <AnimatePresence>
            {activeSection === 'color' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pb-4"
              >
                <div className="px-2 pt-4">
                  <Slider
                    defaultValue={[colorMap.findIndex(c => c.id === filters.color)]}
                    min={0}
                    max={colorMap.length - 1}
                    step={1}
                    onValueChange={(value) => {
                      onFilterChange('color', colorMap[value[0]].id);
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    {colorMap.map((color) => (
                      <div
                        key={color.id}
                        className="w-4 h-4 rounded-full border border-neutral-700"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Filter */}
        <div className="px-4">
          <FilterHeader title="Preis" section="price" />
          <AnimatePresence>
            {activeSection === 'price' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pb-4"
              >
                <div className="px-2 pt-4">
                  <Slider
                    defaultValue={[filters.priceRange[1]]}
                    min={0}
                    max={500}
                    step={10}
                    onValueChange={(value) => {
                      onFilterChange('priceRange', [0, value[0]]);
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-neutral-400 mt-2">
                    <span>0€</span>
                    <span>bis {filters.priceRange[1]}€</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};