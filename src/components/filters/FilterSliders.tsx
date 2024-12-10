import React from 'react';
import { Slider } from '../ui/slider';

// Größen-Mapping (XS=0, S=1, M=2, L=3, XL=4, XXL=5)
const sizeMap = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Farben-Mapping
const colorMap = [
  { name: 'Schwarz', hex: '#000000' },
  { name: 'Weiß', hex: '#FFFFFF' },
  { name: 'Grau', hex: '#808080' },
  { name: 'Blau', hex: '#0000FF' },
  { name: 'Rot', hex: '#FF0000' },
  { name: 'Grün', hex: '#008000' }
];

interface FilterSlidersProps {
  onSizeChange: (size: string[]) => void;
  onColorChange: (color: string) => void;
  onPriceChange: (range: [number, number]) => void;
  initialSize?: string[];
  initialColor?: string;
  initialPriceRange?: [number, number];
}

export const FilterSliders: React.FC<FilterSlidersProps> = ({
  onSizeChange,
  onColorChange,
  onPriceChange,
  initialSize = ['M'],
  initialColor = '#000000',
  initialPriceRange = [0, 200]
}) => {
  // Size Slider
  const handleSizeChange = (value: number[]) => {
    const selectedSizes = sizeMap.slice(value[0], value[1] + 1);
    onSizeChange(selectedSizes);
  };

  // Color Slider
  const handleColorChange = (value: number[]) => {
    onColorChange(colorMap[value[0]].hex);
  };

  // Price Slider
  const handlePriceChange = (value: number[]) => {
    onPriceChange([value[0], value[1]]);
  };

  return (
    <div className="space-y-8 p-6 bg-neutral-900 rounded-lg">
      {/* Größen Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white">Größe</label>
          <span className="text-sm text-neutral-400">
            {initialSize.join(', ')}
          </span>
        </div>
        <Slider
          defaultValue={[2, 3]} // Default: M-L
          min={0}
          max={5}
          step={1}
          onValueChange={handleSizeChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-neutral-400">
          {sizeMap.map((size) => (
            <span key={size}>{size}</span>
          ))}
        </div>
      </div>

      {/* Farben Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white">Farbe</label>
          <span className="text-sm text-neutral-400">
            {colorMap.find(c => c.hex === initialColor)?.name}
          </span>
        </div>
        <Slider
          defaultValue={[0]}
          min={0}
          max={colorMap.length - 1}
          step={1}
          onValueChange={handleColorChange}
          className="w-full"
        />
        <div className="flex justify-between">
          {colorMap.map((color) => (
            <div
              key={color.hex}
              className="w-4 h-4 rounded-full border border-neutral-700"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Preis Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white">Preis</label>
          <span className="text-sm text-neutral-400">
            {initialPriceRange[0]}€ - {initialPriceRange[1]}€
          </span>
        </div>
        <Slider
          defaultValue={initialPriceRange}
          min={0}
          max={200}
          step={10}
          onValueChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-neutral-400">
          <span>0€</span>
          <span>200€</span>
        </div>
      </div>
    </div>
  );
};
