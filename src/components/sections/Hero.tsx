'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import FloatingParticles from '../shared/FloatingParticles';
import AnimatedGrid from '../shared/AnimatedGrid';
import GlowingOrb from '../shared/GlowingOrb';

export default function Hero() {
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <AnimatedGrid /><FloatingParticles />
      <GlowingOrb className="w-96 h-96 bg-[#FF6A00] -top-48 -left-48" />
      <GlowingOrb className="w-80 h-80 bg-orange-500 -bottom-32 -right-32" />
      <GlowingOrb className="w-64 h-64 bg-purple-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"><Sparkles className="w-4 h-4 text-[#FF6A00]" /><span className="text-sm text-white/70">Premium Digital Solutions</span></motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-[#FF6A00] to-orange-400 bg-clip-text text-transparent leading-tight">
            Building the
            <motion.span className="block bg-gradient-to-r from-[#FF6A00] to-orange-400 bg-clip-text text-transparent" animate={{ backgroundPosition: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundSize: '200% 200%' }}>Future Digital</motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">Premium products, custom software, and cutting-edge solutions engineered for <span className="text-[#FF6A00] font-semibold"> exceptional performance</span> and <span className="text-[#FF6A00] font-semibold"> scalability</span>.</motion.p>

          <motion.div variants={itemVariants} className="flex justify-center items-center space-x-8 mb-16">
            {['Bruce Wayne', 'Tyler Durden'].map((name, idx) => (
              <React.Fragment key={name}>
                <motion.div whileHover={{ scale: 1.1, y: -5 }} className="flex flex-col items-center group cursor-pointer">
                  <motion.div whileHover={{ rotateY: 180 }} transition={{ duration: 0.6 }} className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6A00] to-orange-600 flex items-center justify-center mb-3 shadow-2xl shadow-[#FF6A00]/50 group-hover:shadow-[#FF6A00]/80"><span className="text-xl font-bold text-white">{name.split(' ').map(n => n[0]).join('')}</span></motion.div>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white">{name}</span>
                  <span className="text-xs text-[#FF6A00] mt-1">{idx === 0 ? 'Full-Stack Architect' : 'Product Engineer'}</span>
                </motion.div>
                {idx === 0 && <Separator orientation="vertical" className="h-20 bg-white/20" />}
              </React.Fragment>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}><Button onClick={() => scrollToSection('products')} className="group relative bg-gradient-to-r from-[#FF6A00] to-orange-600 hover:from-orange-600 hover:to-[#FF6A00] text-white px-10 py-7 text-lg font-semibold shadow-2xl shadow-[#FF6A00]/30 overflow-hidden"><motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />Explore TestForge<ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" /></Button></motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}><Button onClick={() => scrollToSection('products')} variant="outline" className="group border-2 border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white px-10 py-7 text-lg font-semibold backdrop-blur-sm relative overflow-hidden"><motion.div className="absolute inset-0 bg-[#FF6A00] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" /><span className="relative">Discover ProjectNexus</span></Button></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}