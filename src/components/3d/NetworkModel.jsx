'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function NetworkModel() {
  const group = useRef();
  
  useFrame(({ clock }) => {
    group.current.rotation.x = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={group} position={[2, -1, -2]}>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#f59e0b" wireframe />
      </mesh>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Network
      </Text>
    </group>
  );
}