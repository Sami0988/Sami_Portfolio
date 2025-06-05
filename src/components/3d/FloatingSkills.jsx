'use client';
import { Float, Text } from '@react-three/drei';

export default function FloatingSkills() {
  const skills = [
    { name: 'React', color: '#61dafb', level: 0.9 },
    { name: 'Next.js', color: '#000000', level: 0.8 },
    { name: 'Three.js', color: '#049ef4', level: 0.7 },
    { name: 'Node.js', color: '#68a063', level: 0.85 },
    { name: 'MongoDB', color: '#4db33d', level: 0.75 },
    { name: 'PostgreSQL', color: '#336791', level: 0.8 },
    { name: 'AWS', color: '#ff9900', level: 0.7 },
    { name: 'Docker', color: '#2496ed', level: 0.65 },
    { name: 'Python', color: '#3776ab', level: 0.8 },
    { name: 'Networking', color: '#ffffff', level: 0.75 }
  ];
  
  return (
    <>
      {skills.map((skill, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <Text
            position={[
              Math.sin(i * 0.7) * 8,
              Math.cos(i * 0.5) * 5,
              -5 + (i % 4)
            ]}
            fontSize={0.3 + (skill.level * 0.2)}
            color={skill.color}
            outlineColor="#1e3a8a"
            outlineWidth={0.005}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        </Float>
      ))}
    </>
  );
}