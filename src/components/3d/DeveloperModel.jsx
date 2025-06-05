'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, GradientTexture } from '@react-three/drei';

export default function DeveloperModel() {
  const group = useRef();
  
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Modern abstract shape */}
      <mesh position={[0, 1.5, 0]}>
        <torusKnotGeometry args={[1, 0.4, 100, 16]} />
        <meshStandardMaterial metalness={0.8} roughness={0.2}>
          <GradientTexture 
            stops={[0, 0.5, 1]}
            colors={['#3b82f6', '#60a5fa', '#93c5fd']}
          />
        </meshStandardMaterial>
      </mesh>
      
      {/* Floating title */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={1}
        color="white"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        Full-Stack Developer
      </Text>
    </group>
  );
}