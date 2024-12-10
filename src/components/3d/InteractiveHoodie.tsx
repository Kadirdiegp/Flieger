import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Model: React.FC = () => {
  const { scene } = useGLTF('/hoodie-model.glb');
  const modelRef = useRef<THREE.Group>();
  
  React.useEffect(() => {
    if (scene) {
      scene.position.set(0, -1, 0);
      scene.scale.set(0.5, 0.5, 0.5);
      scene.rotation.set(0, 0, 0);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (modelRef.current) {
      // Sanfte automatische Rotation
      modelRef.current.rotation.y += 0.005;
    }
  });

  if (!scene) return null;

  return (
    <primitive 
      ref={modelRef}
      object={scene}
      position={[0, -1, 0]}
    />
  );
};

export const InteractiveHoodie: React.FC = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Model />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />
      <Environment preset="city" />
    </Canvas>
  );
};

useGLTF.preload('/hoodie-model.glb');