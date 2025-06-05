'use client';
import { Html, Text } from '@react-three/drei';
import { useState } from 'react';

export default function InteractiveElements() {
  const [activeSection, setActiveSection] = useState(null);
  
  const sections = [
    { id: 'about', title: 'About Me', position: [-5, 2, 0], 
      content: 'Experienced developer with 5+ years in web, database, and network systems.' },
    { id: 'projects', title: 'Projects', position: [0, -3, 0], 
      content: 'Check out my portfolio of successful applications and systems.' },
    { id: 'contact', title: 'Contact', position: [5, 2, 0], 
      content: 'Available for freelance and full-time opportunities.' }
  ];

  return (
    <>
      {sections.map((section) => (
        <group key={section.id} position={section.position}>
          {/* Interactive button */}
          <Text
            fontSize={0.5}
            color="#bfdbfe"
            anchorX="center"
            anchorY="middle"
            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          >
            {section.title}
          </Text>
          
          {/* Info panel */}
          {activeSection === section.id && (
            <Html center>
              <div className="bg-blue-800/90 text-white p-4 rounded-lg w-64 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-blue-100">{section.content}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSection(null);
                  }}
                  className="mt-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 transition"
                >
                  Close
                </button>
              </div>
            </Html>
          )}
        </group>
      ))}
    </>
  );
}