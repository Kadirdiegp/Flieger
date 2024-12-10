import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { InteractiveHoodie } from './InteractiveHoodie';

export const Scene = () => {
  return (
    <ErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 45 }}
        style={{ 
          touchAction: 'none',
          background: '#111111',
          width: '100%',
          height: '100%'
        }}
        dpr={[1, 2]} // Optimiert für Retina Displays
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={0.8}
          castShadow
        />
        
        <Suspense fallback={<LoadingSpinner />}>
          <InteractiveHoodie />
          <Environment preset="city" />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={1}
            maxDistance={2}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};