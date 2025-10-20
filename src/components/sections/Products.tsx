'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Rocket, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import AnimatedGrid from '../shared/AnimatedGrid';
import GlowingOrb from '../shared/GlowingOrb';

export default function Products() {
  const staggerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  const products = [
    { 
      name: 'TestForge', 
      description: 'Revolutionizing institutional exam workflows with intelligent automation and seamless management',
      icon: Zap, 
      badge: { text: 'Premium', color: 'from-[#FF6A00] to-orange-600', icon: Zap },
      features: ['Smart Exam Setup & Configuration', 'Dynamic Timetable Generation', 'Automated Seating Chart Creation', 'Intelligent Block Allocation', 'Digital eMarksheet System', 'Advanced Analytics & Reports', 'Workflow Automation Engine'],
      link: 'https://testforge.software',
      status: 'live'
    },
    { 
      name: 'ProjectNexus', 
      description: 'Empowering students and teams to build smarter, collaborate better, and deliver faster',
      icon: Rocket, 
      badge: { text: 'Next-Gen', color: 'from-purple-500 to-pink-500', icon: Rocket },
      features: ['Smart Project Kit Marketplace', 'Advanced Task Management', 'Real-time Team Collaboration', 'Integrated Authentication', 'Milestone & Progress Tracking', 'Resource Management Tools', 'Performance Analytics'],
      link: '#',
      status: 'coming-soon'
    }
  ];

  return (
    <section id="products" className="relative py-32 bg-gradient-to-b from-[#1A1A1A] to-[#121212] overflow-hidden">
      <AnimatedGrid /><GlowingOrb className="w-80 h-80 bg-orange-500 -right-40 top-1/3" />
      
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center space-x-2 mb-4"><div className="w-2 h-2 bg-[#FF6A00] rounded-full" /><span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Our Solutions</span><div className="w-2 h-2 bg-[#FF6A00] rounded-full" /></motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Flagship <span className="text-[#FF6A00]">Products</span></h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">Premium SaaS solutions designed to revolutionize workflows and drive digital transformation</p>
        </motion.div>

        <motion.div variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {products.map((product, idx) => (
            <motion.div key={idx} variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }} className="group">
              <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border-white/10 hover:border-[#FF6A00] transition-all duration-500 overflow-hidden shadow-2xl h-full">
                <div className="relative"><motion.div className="absolute inset-0 bg-gradient-to-r from-[#FF6A00] to-orange-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <Badge className={`bg-gradient-to-r ${product.badge.color} text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg`}><product.badge.icon className="w-3 h-3 mr-1" />{product.badge.text}</Badge>
                      <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}><product.icon className="w-12 h-12 text-[#FF6A00] drop-shadow-glow" /></motion.div>
                    </div>
                    <CardTitle className="text-4xl text-white mb-4">{product.name}</CardTitle>
                    <CardDescription className="text-white/60 text-lg leading-relaxed">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-4 mb-8">
                      {product.features.map((feature, featureIdx) => (
                        <motion.div key={featureIdx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: featureIdx * 0.1 }} viewport={{ once: true }} className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-[#FF6A00] flex-shrink-0" /><span className="text-white/80">{feature}</span></motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {product.status === 'live' ? (
                      <Link href={product.link} className="w-full group relative bg-gradient-to-r from-[#FF6A00] to-orange-600 hover:from-orange-600 hover:to-[#FF6A00] text-white py-6 text-lg font-semibold shadow-2xl shadow-[#FF6A00]/30 overflow-hidden text-center">
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        Explore {product.name}<ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform inline" />
                      </Link>
                    ) : (
                      <Button disabled className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white/60 py-6 text-lg font-semibold shadow-2xl relative overflow-hidden group">
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <span className="relative">Coming Soon<Clock className="ml-3 w-5 h-5 inline" /></span>
                      </Button>
                    )}
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}