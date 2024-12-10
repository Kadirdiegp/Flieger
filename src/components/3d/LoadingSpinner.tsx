import React from 'react';
import { Html } from '@react-three/drei';

export const LoadingSpinner = () => {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white rounded-full animate-spin border-t-transparent" />
      </div>
    </Html>
  );
};