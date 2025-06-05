'use client';
import { Html } from '@react-three/drei';
import { useState } from 'react';

export default function SkillInfoPanel() {
  const [activeSkill, setActiveSkill] = useState(null);
  
  return (
    activeSkill && (
      <Html position={[0, 3, 0]} center>
        <div className="bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-xs">
          <h3 className="text-xl font-bold mb-2">
            {activeSkill === 'developer' && 'Web & App Development'}
            {activeSkill === 'database' && 'Database Administration'}
            {activeSkill === 'network' && 'Network Administration'}
          </h3>
          <p>
            {activeSkill === 'developer' && 'Full-stack development with modern frameworks and mobile technologies.'}
            {activeSkill === 'database' && 'Expertise in database design, optimization, and administration across multiple platforms.'}
            {activeSkill === 'network' && 'Network infrastructure design, implementation, and security management.'}
          </p>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveSkill(null); }}
            className="mt-2 px-3 py-1 bg-blue-600 rounded"
          >
            Close
          </button>
        </div>
      </Html>
    )
  );
}