'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#FF6A00 1px, transparent 1px), linear-gradient(90deg, #FF6A00 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      <motion.div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
    </div>
  );
}