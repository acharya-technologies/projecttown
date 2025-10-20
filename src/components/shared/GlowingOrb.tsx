'use client';
import React from 'react';
import { motion, easeInOut } from 'framer-motion';

export default function GlowingOrb({ className = "" }: { className?: string }) {
  return (
    <motion.div className={`absolute rounded-full blur-3xl opacity-20 ${className}`} animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: easeInOut }} />
  );
}