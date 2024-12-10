import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { Mesh } from 'three';

export const InteractiveBox = () => {
  const meshRef = useRef<Mesh>(null);
  const [spring, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 180, friction: 30 },
  }));

  useEffect(() => {
    const handlePointerMove = (event: TouchEvent | MouseEvent) => {
      if (!meshRef.current) return;

      const x = ('touches' in event) 
        ? (event.touches[0].clientX / window.innerWidth) * 2 - 1
        : (event.clientX / window.innerWidth) * 2 - 1;
      
      const y = ('touches' in event)
        ? -(event.touches[0].clientY / window.innerHeight) * 2 + 1
        : -(event.clientY / window.innerHeight) * 2 + 1;

      // Limit rotation range
      const maxRotation = Math.PI / 4; // 45 degrees
      const rotX = y * maxRotation;
      const rotY = x * maxRotation;

      api.start({
        rotation: [rotX, rotY, 0],
      });
    };

    const handlePointerLeave = () => {
      api.start({ 
        rotation: [0, 0, 0],
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
    };
  }, [api]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Add subtle floating animation
    const floatOffset = Math.sin(state.clock.elapsedTime) * 0.1;
    meshRef.current.position.y = floatOffset;
  });

  return (
    <animated.mesh
      ref={meshRef}
      rotation={spring.rotation}
      position={[0, 0, 0]} // Fixed base position
      castShadow
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.3}
        metalness={0.7}
        envMapIntensity={1}
      />
    </animated.mesh>
  );
};