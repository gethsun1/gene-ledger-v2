'use client';

import { motion } from 'framer-motion';

export function DnaStrand() {
  return (
    <div className="relative w-64 h-64 opacity-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          
          {/* DNA Double Helix */}
          <path
            d="M50 20 Q75 50 50 80 Q25 110 50 140 Q75 170 50 200"
            stroke="url(#dnaGradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M150 20 Q125 50 150 80 Q175 110 150 140 Q125 170 150 200"
            stroke="url(#dnaGradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
          
          {/* Connecting bonds */}
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1="50"
              y1={30 + i * 22}
              x2="150"
              y2={30 + i * 22}
              stroke="url(#dnaGradient)"
              strokeWidth="2"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}