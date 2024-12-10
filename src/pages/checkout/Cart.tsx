import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { CheckoutLayout } from '../../components/checkout/CheckoutLayout';
import { useCart } from '../../lib/hooks/useCart';

const Cart = () => {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <CheckoutLayout step={1}>
      <div className="space-y-8">
        <div className="bg-neutral-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Warenkorb</h2>
          
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-400 mb-6">Dein Warenkorb ist leer</p>
              <Button asChild>
                <Link to="/shop">Weiter einkaufen</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-neutral-800"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover bg-neutral-800"
                    />
                    <div>
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-neutral-400">Größe: {item.size}</p>
                      <p className="text-white mt-1">{item.price}€</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center text-white">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex justify-end">
            <Button asChild size="lg">
              <Link to="/checkout/shipping">Weiter zur Lieferung</Link>
            </Button>
          </div>
        )}
      </div>
    </CheckoutLayout>
  );
};

export default Cart;