'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, easeInOut, useSpring } from 'framer-motion';
import { Menu, X, Code, Rocket, Users, Award, Mail, Phone, Linkedin, Github, Twitter, ExternalLink, CheckCircle, AlertCircle, Calendar, Database, Shield, Zap, BarChart, Clock, Globe, Smartphone, Cloud, Brain, Layout, Settings, GitBranch, Cpu, Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import Image from 'next/image';
import { SiAuth0, SiClerk, SiExpo, SiFastapi, SiFramer, SiMysql, SiNextdotjs, SiNginx, SiPostgresql, SiPostman, SiReact, SiSupabase, SiTailwindcss, SiTypescript, SiVercel, SiVscodium } from 'react-icons/si';
import { TbComponents, TbPlugConnected } from 'react-icons/tb';
import { FaDocker, FaGithub, FaNodeJs, FaReact } from 'react-icons/fa';
import { MdOutlineHttp } from 'react-icons/md';
import Link from 'next/link';

// Floating particles background component
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-[#FF6A00] to-orange-400 rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />
      ))}
    </div>
  );
};

// Animated grid background
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(#FF6A00 1px, transparent 1px),
                            linear-gradient(90deg, #FF6A00 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
};

// Glowing orb component
const GlowingOrb = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: easeInOut,
      }}
    />
  );
};

export default function AcharyaTechnologies() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const headerBackground = useTransform(
    scrollYProgress,
    [0, 0.1],
    ['rgba(26, 26, 26, 0)', 'rgba(26, 26, 26, 0.95)']
  );

  // Spring-based scroll progress for smoother animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scaleX = useTransform(smoothScrollProgress, [0, 1], [0, 1]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'vision', label: 'Vision' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xrbpjrvn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeInOut } }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans scroll-smooth overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6A00] to-orange-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <motion.header
        style={{ opacity: headerOpacity, backgroundColor: headerBackground }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10 shadow-2xl transition-all duration-300"
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Code className="w-8 h-8 text-[#FF6A00] drop-shadow-glow" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Acharya <span className="text-[#FF6A00]">Technologies</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => scrollToSection(link.id)}
                className={`relative text-sm font-medium transition-all duration-300 ${activeSection === link.id
                  ? 'text-[#FF6A00] drop-shadow-glow'
                  : 'text-white/80 hover:text-white hover:drop-shadow-glow'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6A00] to-orange-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1A1A1A] border-white/10 backdrop-blur-xl">
              <div className="flex flex-col space-y-6 mt-8">
                {navLinks.map(link => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    whileHover={{ x: 10 }}
                    className={`text-left text-lg font-medium transition-all ${activeSection === link.id
                      ? 'text-[#FF6A00]'
                      : 'text-white/80 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <AnimatedGrid />
        <FloatingParticles />

        {/* Glowing Orbs */}
        <GlowingOrb className="w-96 h-96 bg-[#FF6A00] -top-48 -left-48" />
        <GlowingOrb className="w-80 h-80 bg-orange-500 -bottom-32 -right-32" />
        <GlowingOrb className="w-64 h-64 bg-purple-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center max-w-6xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#FF6A00]" />
              <span className="text-sm text-white/70">Premium Digital Solutions</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-[#FF6A00] to-orange-400 bg-clip-text text-transparent leading-tight"
            >
              Building the
              <motion.span
                className="block bg-gradient-to-r from-[#FF6A00] to-orange-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Future Digital
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Premium products, custom software, and cutting-edge solutions engineered for
              <span className="text-[#FF6A00] font-semibold"> exceptional performance</span> and
              <span className="text-[#FF6A00] font-semibold"> scalability</span>.
            </motion.p>

            {/* Developer Personas */}
            <motion.div variants={itemVariants} className="flex justify-center items-center space-x-8 mb-16">
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6A00] to-orange-600 flex items-center justify-center mb-3 shadow-2xl shadow-[#FF6A00]/50 group-hover:shadow-[#FF6A00]/80"
                >
                  <span className="text-xl font-bold text-white">BW</span>
                </motion.div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white">Bruce Wayne</span>
                <span className="text-xs text-[#FF6A00] mt-1">Full-Stack Architect</span>
              </motion.div>

              <Separator orientation="vertical" className="h-20 bg-white/20" />

              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6A00] to-orange-600 flex items-center justify-center mb-3 shadow-2xl shadow-[#FF6A00]/50 group-hover:shadow-[#FF6A00]/80"
                >
                  <span className="text-xl font-bold text-white">TD</span>
                </motion.div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white">Tyler Durden</span>
                <span className="text-xs text-[#FF6A00] mt-1">Product Engineer</span>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => scrollToSection('products')}
                  className="group relative bg-gradient-to-r from-[#FF6A00] to-orange-600 hover:from-orange-600 hover:to-[#FF6A00] text-white px-10 py-7 text-lg font-semibold shadow-2xl shadow-[#FF6A00]/30 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    whileHover={{ translateX: "100%" }}
                  />
                  Explore TestForge
                  <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => scrollToSection('products')}
                  variant="outline"
                  className="group border-2 border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white px-10 py-7 text-lg font-semibold backdrop-blur-sm relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#FF6A00] -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  />
                  <span className="relative">Discover ProjectNexus</span>
                </Button>
              </motion.div>
            </motion.div>


          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 bg-gradient-to-b from-[#121212] to-[#1A1A1A] overflow-hidden">
        <FloatingParticles />
        <GlowingOrb className="w-64 h-64 bg-purple-600 -left-32 top-1/4" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-4"
            >
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
              <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              About <span className="text-[#FF6A00]">Us</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Acharya Technologies is a product-driven software company redefining how technology
              <span className="text-[#FF6A00] font-semibold"> empowers institutions</span>, developers, and creators
              through innovative digital solutions.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Badge variant="secondary" className="bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/30 px-4 py-2">
                <Star className="w-3 h-3 mr-1 fill-current" />
                1+ year of product excellence and engineering innovation
              </Badge>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Rocket,
                title: 'Precision',
                desc: 'Delivering accurate, high-quality solutions with meticulous attention to detail and excellence in execution.',
                color: 'from-blue-500 to-cyan-400'
              },
              {
                icon: Cpu,
                title: 'Innovation',
                desc: 'Pushing boundaries with cutting-edge technology and forward-thinking approaches to complex challenges.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Shield,
                title: 'Resilience',
                desc: 'Building scalable, reliable systems that withstand the test of time and evolving business needs.',
                color: 'from-green-500 to-emerald-400'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-[#1A1A1A]/80 border-white/10 hover:border-[#FF6A00]/50 transition-all duration-500 backdrop-blur-sm overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    <CardHeader className="relative">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-xl transition-all duration-300`}
                      >
                        <item.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                        {item.desc}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-32 bg-gradient-to-b from-[#1A1A1A] to-[#121212] overflow-hidden">
        <AnimatedGrid />
        <GlowingOrb className="w-80 h-80 bg-orange-500 -right-40 top-1/3" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-4"
            >
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
              <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Our Solutions</span>
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Flagship <span className="text-[#FF6A00]">Products</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Premium SaaS solutions designed to revolutionize workflows and drive digital transformation
            </p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
          >
            {/* TestForge */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border-white/10 hover:border-[#FF6A00] transition-all duration-500 overflow-hidden shadow-2xl h-full">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF6A00] to-orange-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <Badge className="bg-gradient-to-r from-[#FF6A00] to-orange-600 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
                        <Zap className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Zap className="w-12 h-12 text-[#FF6A00] drop-shadow-glow" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-4xl text-white mb-4">TestForge</CardTitle>
                    <CardDescription className="text-white/60 text-lg leading-relaxed">
                      Revolutionizing institutional exam workflows with intelligent automation and seamless management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-4 mb-8">
                      {[
                        'Smart Exam Setup & Configuration',
                        'Dynamic Timetable Generation',
                        'Automated Seating Chart Creation',
                        'Intelligent Block Allocation',
                        'Digital eMarksheet System',
                        'Advanced Analytics & Reports',
                        'Workflow Automation Engine'
                      ].map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-[#FF6A00] flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="https://testforge.software" className="w-full group relative bg-gradient-to-r from-[#FF6A00] to-orange-600 hover:from-orange-600 hover:to-[#FF6A00] text-white py-6 text-lg font-semibold shadow-2xl shadow-[#FF6A00]/30 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      />
                      Explore TestForge
                      <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>

            {/* ProjectNexus */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border-white/10 hover:border-[#FF6A00] transition-all duration-500 overflow-hidden shadow-2xl h-full">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF6A00] to-orange-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
                        <Rocket className="w-3 h-3 mr-1" />
                        Next-Gen
                      </Badge>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Rocket className="w-12 h-12 text-purple-500 drop-shadow-glow" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-4xl text-white mb-4">ProjectNexus</CardTitle>
                    <CardDescription className="text-white/60 text-lg leading-relaxed">
                      Empowering students and teams to build smarter, collaborate better, and deliver faster
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-4 mb-8">
                      {[
                        'Smart Project Kit Marketplace',
                        'Advanced Task Management',
                        'Real-time Team Collaboration',
                        'Integrated Authentication',
                        'Milestone & Progress Tracking',
                        'Resource Management Tools',
                        'Performance Analytics'
                      ].map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      disabled
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white/60 py-6 text-lg font-semibold shadow-2xl relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      />
                      <span className="relative">
                        Coming Soon
                        <Clock className="ml-3 w-5 h-5 inline" />
                      </span>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="relative py-32 bg-gradient-to-b from-[#121212] to-[#1A1A1A] overflow-hidden">
        <FloatingParticles />
        <GlowingOrb className="w-96 h-96 bg-blue-500 -left-48 bottom-1/4" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-4"
            >
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
              <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Our Technology</span>
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Built on Modern <span className="text-[#FF6A00]">Tech</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              We use proven, scalable, and modern technologies to deliver future-ready solutions that stand the test of time
            </p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto"
          >
            {[
              { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend" },
              { name: "React", icon: <SiReact />, category: "Frontend" },
              { name: "TypeScript", icon: <SiTypescript />, category: "Language" },
              { name: "Tailwind", icon: <SiTailwindcss />, category: "Styling" },
              { name: "Shadcn/UI", icon: <TbComponents />, category: "UI" },
              { name: "Framer Motion", icon: <SiFramer />, category: "Animation" },
              { name: "FastAPI", icon: <SiFastapi />, category: "Backend" },
              { name: "Node.js", icon: <FaNodeJs />, category: "Backend" },
              { name: "Supabase", icon: <SiSupabase />, category: "Database" },
              { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database" },
              { name: "MySQL", icon: <SiMysql />, category: "Database" },
              { name: "Clerk", icon: <SiClerk />, category: "Auth" },
              { name: "OAuth", icon: <SiAuth0 />, category: "Auth" },
              { name: "REST", icon: <MdOutlineHttp />, category: "API" },
              { name: "WebSockets", icon: <TbPlugConnected />, category: "Real-time" },
              { name: "Docker", icon: <FaDocker />, category: "DevOps" },
              { name: "Vercel", icon: <SiVercel />, category: "Deployment" },
              { name: "Nginx", icon: <SiNginx />, category: "Server" },
              { name: "React Native", icon: <FaReact />, category: "Mobile" },
              { name: "Expo", icon: <SiExpo />, category: "Mobile" },
              { name: "GitHub", icon: <FaGithub />, category: "Tools" },
              { name: "Postman", icon: <SiPostman />, category: "Tools" },
              { name: "VS Code", icon: <SiVscodium />, category: "Tools" },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 0.3,
                  rotate: { duration: 0.5 }
                }}
                className="group relative"
              >
                <div className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FF6A00] transition-all duration-300 backdrop-blur-sm h-full">
                  <div className="text-4xl text-[#FF6A00] group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <span className="text-sm text-white font-medium text-center">{tech.name}</span>
                  <div className="absolute -top-2 -right-2">
                    <Badge variant="secondary" className="bg-[#FF6A00]/20 text-[#FF6A00] text-xs border-0">
                      {tech.category}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     // Continue from the previous code...

      {/* Expertise Section */}
      <section id="expertise" className="relative py-32 bg-gradient-to-b from-[#1A1A1A] to-[#121212] overflow-hidden">
        <AnimatedGrid />
        <GlowingOrb className="w-72 h-72 bg-green-500 -left-36 top-1/3" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-4"
            >
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
              <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Our Services</span>
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              What We Do <span className="text-[#FF6A00]">Best</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Engineering powerful digital experiences with cutting-edge technology and innovative solutions
            </p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {[
              {
                icon: Brain,
                title: 'Product Design & Strategy',
                desc: 'User-centered design thinking and scalable architecture planning for robust digital products.',
                features: ['UX Research', 'System Architecture', 'Product Strategy'],
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Layout,
                title: 'Full-Stack Development',
                desc: 'End-to-end development with Next.js, FastAPI, Supabase, and modern database solutions.',
                features: ['Frontend', 'Backend', 'Database Design'],
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Smartphone,
                title: 'Mobile App Development',
                desc: 'Cross-platform mobile solutions using React Native & Expo for seamless user experiences.',
                features: ['iOS & Android', 'Cross-Platform', 'Native Performance'],
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: Cloud,
                title: 'Cloud & Automation',
                desc: 'CI/CD pipelines, Docker containerization, and AI-assisted systems for scalable deployment.',
                features: ['DevOps', 'Cloud Infrastructure', 'AI Integration'],
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group h-full"
              >
                <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border-white/10 hover:border-[#FF6A00]/50 transition-all duration-500 backdrop-blur-sm overflow-hidden h-full">
                  <div className="relative h-full">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    <CardHeader className="relative pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-xl transition-all duration-300`}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative pb-6">
                      <p className="text-white/60 leading-relaxed mb-6 group-hover:text-white/70 transition-colors duration-300">
                        {item.desc}
                      </p>
                      <div className="space-y-2">
                        {item.features.map((feature, featureIdx) => (
                          <motion.div
                            key={featureIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: featureIdx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`} />
                            <span className="text-white/70">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="relative pt-4">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center text-[#FF6A00] text-sm font-semibold cursor-pointer group/arrow"
                      >
                        Learn more
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                      </motion.div>
                    </CardFooter>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '100%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Support' },
              { number: '1Y+', label: 'Experience' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 group-hover:border-[#FF6A00]/30 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#FF6A00] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="relative py-32 bg-gradient-to-b from-[#121212] to-[#1A1A1A] overflow-hidden">
        <FloatingParticles />
        <GlowingOrb className="w-96 h-96 bg-purple-600 -right-48 bottom-1/4" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-4"
            >
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
              <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Future Roadmap</span>
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Our <span className="text-[#FF6A00]">Vision</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              At Acharya Technologies, we're shaping the next era of digital systems —
              <span className="text-[#FF6A00] font-semibold"> building intelligent, scalable solutions</span> that transform how businesses operate and innovate.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Timeline */}
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF6A00] to-orange-600 rounded-full"></div>

              {[
                {
                  phase: "Phase 1",
                  title: "Foundation & Core Products",
                  status: "Completed",
                  items: ["TestForge Launch", "ProjectNexus MVP", "Tech Stack Establishment"],
                  position: "left",
                  icon: Settings
                },
                {
                  phase: "Phase 2",
                  title: "Expansion & Integration",
                  status: "In Progress",
                  items: ["API Ecosystem", "Mobile Applications", "Enterprise Features"],
                  position: "right",
                  icon: Zap
                },
                {
                  phase: "Phase 3",
                  title: "AI & Automation",
                  status: "Upcoming",
                  items: ["Machine Learning", "Predictive Analytics", "Smart Automation"],
                  position: "left",
                  icon: Brain
                },
                {
                  phase: "Phase 4",
                  title: "Global Ecosystem",
                  status: "Future",
                  items: ["International Expansion", "Developer Platform", "Open Source Initiatives"],
                  position: "right",
                  icon: Globe
                }
              ].map((phase, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`relative flex items-center mb-12 ${phase.position === 'left' ? 'flex-row' : 'flex-row-reverse'
                    }`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${phase.position === 'left' ? 'pr-12' : 'pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-[#FF6A00]/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={`
                    ${phase.status === 'Completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                    ${phase.status === 'In Progress' ? 'bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/30' : ''}
                    ${phase.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                    ${phase.status === 'Future' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : ''}
                    px-3 py-1 text-xs font-semibold
                  `}>
                          {phase.status}
                        </Badge>
                        <span className="text-[#FF6A00] font-bold text-sm">{phase.phase}</span>
                      </div>

                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6A00] to-orange-600 flex items-center justify-center">
                          <phase.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                      </div>

                      <ul className="space-y-2">
                        {phase.items.map((item, itemIdx) => (
                          <motion.li
                            key={itemIdx}
                            initial={{ opacity: 0, x: phase.position === 'left' ? -10 : 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: itemIdx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-2 text-white/70 text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full"></div>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#FF6A00] rounded-full border-4 border-[#121212] z-10 shadow-2xl shadow-[#FF6A00]/50"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-20"
          >
            <Card className="bg-gradient-to-r from-[#FF6A00]/10 to-orange-600/10 border-[#FF6A00]/20 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="py-12">
                <Rocket className="w-16 h-16 text-[#FF6A00] mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Build the Future Together?
                </h3>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  Join us in creating innovative solutions that transform industries and empower businesses worldwide.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollToSection('contact')}
                    className="bg-gradient-to-r from-[#FF6A00] to-orange-600 hover:from-orange-600 hover:to-[#FF6A00] text-white px-8 py-6 text-lg font-semibold shadow-2xl shadow-[#FF6A00]/30"
                  >
                    Start Your Project <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 bg-gradient-to-b from-[#1A1A1A] to-[#121212] overflow-hidden">
        <AnimatedGrid />
        <GlowingOrb className="w-80 h-80 bg-cyan-500 -left-40 top-1/2" />
        <GlowingOrb className="w-64 h-64 bg-pink-500 -right-32 bottom-1/3" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-4"
            >
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
              <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full"></div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Let's Build <span className="text-[#FF6A00]">Together</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Have a project in mind? Let's collaborate to create something extraordinary that drives your business forward.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:pr-8"
              >
                <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl text-white">Send us a message</CardTitle>
                    <CardDescription className="text-white/60 text-lg">
                      We'll get back to you within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/80">Your Name</label>
                          <Input
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 focus:border-[#FF6A00] transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/80">Your Email</label>
                          <Input
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 focus:border-[#FF6A00] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Your Message</label>
                        <Textarea
                          placeholder="Tell us about your project, goals, and timeline..."
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={6}
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-[#FF6A00] transition-colors resize-none"
                        />
                      </div>

                      <AnimatePresence mode="wait">
                        {formStatus === 'success' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <Alert className="bg-green-500/20 border-green-500/50">
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <AlertDescription className="text-green-200">
                                Message sent successfully! We'll be in touch within 24 hours.
                              </AlertDescription>
                            </Alert>
                          </motion.div>
                        )}
                        {formStatus === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <Alert className="bg-red-500/20 border-red-500/50">
                              <AlertCircle className="h-4 w-4 text-red-400" />
                              <AlertDescription className="text-red-200">
                                Failed to send message. Please try again or contact us directly.
                              </AlertDescription>
                            </Alert>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-[#FF6A00] to-orange-600 hover:from-orange-600 hover:to-[#FF6A00] text-white font-semibold py-6 text-lg shadow-2xl shadow-[#FF6A00]/30 relative overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                          />
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Settings className="w-5 h-5" />
                              </motion.div>
                              <span>Sending...</span>
                            </div>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:pl-8"
              >
                <div className="space-y-8">
                  {/* Contact Methods */}
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        icon: Mail,
                        title: 'Email Us',
                        description: 'We\'ll respond quickly',
                        value: 'contact@acharya.tech',
                        href: 'mailto:contact@acharya.tech',
                        color: 'from-blue-500 to-cyan-500'
                      },
                      {
                        icon: Phone,
                        title: 'Call Us',
                        description: 'Mon - Fri, 9am - 6pm',
                        value: '+1 (555) 123-4567',
                        href: 'tel:+15551234567',
                        color: 'from-green-500 to-emerald-500'
                      },
                      {
                        icon: Calendar,
                        title: 'Book a Meeting',
                        description: 'Schedule a consultation',
                        value: 'Schedule Now',
                        href: '#',
                        color: 'from-purple-500 to-pink-500'
                      }
                    ].map((contact, idx) => (
                      <motion.a
                        key={idx}
                        href={contact.href}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="block group"
                      >
                        <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border-white/10 hover:border-[#FF6A00]/50 transition-all duration-300 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <contact.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{contact.title}</h3>
                                <p className="text-white/60 text-sm">{contact.description}</p>
                                <p className="text-[#FF6A00] font-medium mt-1">{contact.value}</p>
                              </div>
                              <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-[#FF6A00] transition-colors" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.a>
                    ))}
                  </div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border-white/10 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white text-xl">Follow Our Journey</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { icon: Github, name: 'GitHub', href: '#', description: 'Open Source' },
                            { icon: Linkedin, name: 'LinkedIn', href: '#', description: 'Professional' },
                            { icon: Twitter, name: 'Twitter', href: '#', description: 'Updates' },
                            { icon: Mail, name: 'Newsletter', href: '#', description: 'Insights' }
                          ].map((social, idx) => (
                            <motion.a
                              key={idx}
                              href={social.href}
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#FF6A00]/30 transition-all duration-300 group"
                            >
                              <social.icon className="w-5 h-5 text-white/60 group-hover:text-[#FF6A00] transition-colors" />
                              <div>
                                <div className="text-white font-medium text-sm">{social.name}</div>
                                <div className="text-white/40 text-xs">{social.description}</div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-[#121212] to-black border-t border-white/10 py-16 overflow-hidden">
        <AnimatedGrid />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
              {/* Company Info */}
              <div className="md:col-span-2">
                <motion.div
                  className="flex items-center space-x-3 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Code className="w-10 h-10 text-[#FF6A00]" />
                  <span className="text-2xl font-bold">
                    Acharya <span className="text-[#FF6A00]">Technologies</span>
                  </span>
                </motion.div>
                <p className="text-white/60 leading-relaxed max-w-md">
                  Building the future of digital innovation with premium products,
                  custom software, and cutting-edge solutions engineered for exceptional performance.
                </p>
                <div className="flex space-x-4 mt-6">
                  {[
                    { icon: Github, href: '#' },
                    { icon: Linkedin, href: '#' },
                    { icon: Twitter, href: '#' },
                    { icon: Mail, href: 'mailto:contact@acharya.tech' }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#FF6A00] flex items-center justify-center transition-all duration-300 group"
                    >
                      <social.icon className="w-4 h-4 text-white/60 group-hover:text-[#FF6A00] transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {navLinks.slice(1).map((link) => (
                    <li key={link.id}>
                      <motion.button
                        onClick={() => scrollToSection(link.id)}
                        whileHover={{ x: 5 }}
                        className="text-white/60 hover:text-[#FF6A00] transition-colors text-left"
                      >
                        {link.label}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Products</h3>
                <ul className="space-y-2">
                  <li>
                    <motion.button
                      onClick={() => scrollToSection('products')}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-[#FF6A00] transition-colors text-left"
                    >
                      TestForge
                    </motion.button>
                  </li>
                  <li>
                    <motion.button
                      onClick={() => scrollToSection('products')}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-[#FF6A00] transition-colors text-left"
                    >
                      ProjectNexus
                    </motion.button>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-[#FF6A00] transition-colors">
                      Custom Solutions
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="my-8 bg-white/10" />

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/60">
                © 2025 <span className="text-[#FF6A00] font-semibold">Acharya Technologies</span>. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-white/40">
                <a href="#" className="hover:text-[#FF6A00] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#FF6A00] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#FF6A00] transition-colors">Cookies</a>
              </div>
            </div>

            {/* Inspirational Quote */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/40 text-sm mt-8 italic"
            >
              Empowering the Future through Code. Building Tomorrow, Today.
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}