'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Cpu, Shield, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import FloatingParticles from '../shared/FloatingParticles';
import GlowingOrb from '../shared/GlowingOrb';

export default function About() {
  const staggerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  const features = [
    { icon: Rocket, title: 'Precision', desc: 'Delivering accurate, high-quality solutions with meticulous attention to detail and excellence in execution.', color: 'from-blue-500 to-cyan-400' },
    { icon: Cpu, title: 'Innovation', desc: 'Pushing boundaries with cutting-edge technology and forward-thinking approaches to complex challenges.', color: 'from-purple-500 to-pink-500' },
    { icon: Shield, title: 'Resilience', desc: 'Building scalable, reliable systems that withstand the test of time and evolving business needs.', color: 'from-green-500 to-emerald-400' }
  ];

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-[#121212] to-[#1A1A1A] overflow-hidden">
      <FloatingParticles /><GlowingOrb className="w-64 h-64 bg-purple-600 -left-32 top-1/4" />
      
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center space-x-2 mb-4"><div className="w-2 h-2 bg-[#FF6A00] rounded-full" /><span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Who We Are</span><div className="w-2 h-2 bg-[#FF6A00] rounded-full" /></motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">About <span className="text-[#FF6A00]">Us</span></h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">Acharya Technologies is a product-driven software company redefining how technology <span className="text-[#FF6A00] font-semibold"> empowers institutions</span>, developers, and creators through innovative digital solutions.</p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8"><Badge variant="secondary" className="bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/30 px-4 py-2"><Star className="w-3 h-3 mr-1 fill-current" />1+ year of product excellence and engineering innovation</Badge></motion.div>
        </motion.div>

        <motion.div variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants} whileHover={{ y: -10, scale: 1.02 }} className="group"><Card className="bg-[#1A1A1A]/80 border-white/10 hover:border-[#FF6A00]/50 transition-all duration-500 backdrop-blur-sm overflow-hidden h-full">
              <div className="relative overflow-hidden"><motion.div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <CardHeader className="relative"><motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.6 }} className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-xl transition-all duration-300`}><item.icon className="w-10 h-10 text-white" /></motion.div><CardTitle className="text-2xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">{item.title}</CardTitle></CardHeader>
                <CardContent><p className="text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300">{item.desc}</p></CardContent>
              </div>
            </Card></motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}