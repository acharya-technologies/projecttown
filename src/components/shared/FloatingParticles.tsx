'use client';
import React from 'react';
import { motion, easeInOut } from 'framer-motion';

export default function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 5, duration: 10 + Math.random() * 10 }));
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div key={particle.id} className="absolute w-1 h-1 bg-gradient-to-r from-[#FF6A00] to-orange-400 rounded-full opacity-20" style={{ left: `${particle.x}%`, top: `${particle.y}%` }} animate={{ y: [0, -100, 0], x: [0, Math.random() * 50 - 25, 0], opacity: [0, 0.5, 0] }} transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: easeInOut }} />
      ))}
    </div>
  );
}