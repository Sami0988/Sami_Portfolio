'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function DatabaseModel() {
  const group = useRef();
  
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={group} position={[-2, -1, 2]}>
      <mesh>
        <cylinderGeometry args={[1, 1, 1.5, 8]} />
        <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.3} />
      </mesh>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Database
      </Text>
    </group>
  );
}