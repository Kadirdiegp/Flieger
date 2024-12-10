import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../lib/hooks/useCart';

export const CartSummary = () => {
  const { items, subtotal, shipping, total } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900 rounded-xl p-6"
    >
      <h2 className="text-lg font-semibold text-white mb-6">Bestellübersicht</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover bg-neutral-800"
              />
              <div>
                <p className="text-white">{item.name}</p>
                <p className="text-neutral-400">
                  Größe: {item.size} | Anzahl: {item.quantity}
                </p>
              </div>
            </div>
            <p className="text-white">{item.price}€</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-neutral-800 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-400">Zwischensumme</span>
          <span className="text-white">{subtotal}€</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-400">Versand</span>
          <span className="text-white">{shipping}€</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-2 border-t border-neutral-800">
          <span className="text-white">Gesamt</span>
          <span className="text-white">{total}€</span>
        </div>
      </div>
    </motion.div>
  );
};