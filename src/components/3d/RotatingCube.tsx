import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const Cube = () => {
  const meshRef = React.useRef();
  const { nodes, materials } = useGLTF('/hoodie-model.glb');
  const [spring, api] = useSpring(() => ({
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  }));

  React.useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.5;
      meshRef.current.rotation.y = 0.5;
    }
  }, []);

  const handlePointerEnter = () => {
    api.start({
      scale: [1.2, 1.2, 1.2],
      rotation: [0, Math.PI, 0]
    });
  };

  const handlePointerLeave = () => {
    api.start({
      scale: [1, 1, 1],
      rotation: [0, 0, 0]
    });
  };

  return (
    <animated.group
      ref={meshRef}
      scale={spring.scale}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Scene.children[0].geometry}
        material={materials.defaultMaterial}
      >
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.7}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
    </animated.group>
  );
};

export const RotatingCube: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
};