import React from 'react';
import { motion } from 'framer-motion';
import { Steps } from './Steps';
import { CartSummary } from './CartSummary';

interface CheckoutLayoutProps {
  children: React.ReactNode;
  step: number;
}

export const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ children, step }) => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Steps currentStep={step} />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
          
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};