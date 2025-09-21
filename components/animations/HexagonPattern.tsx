'use client';

import { motion } from 'framer-motion';

export function HexagonPattern() {
  const hexagons = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i % 5) * 100 + Math.random() * 50,
    y: Math.floor(i / 5) * 100 + Math.random() * 50,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute w-16 h-16 opacity-10"
          style={{ left: `${hex.x}px`, top: `${hex.y}px` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            delay: hex.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,10 85,30 85,70 50,90 15,70 15,30"
              stroke="url(#hexGradient)"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="hexGradient">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}