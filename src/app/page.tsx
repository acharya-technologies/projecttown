"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  FiCode, FiMenu, FiArrowRight, FiCalendar,
  FiLayers, FiZap, FiShield,
  FiTrendingUp, FiUsers, FiDatabase, FiCloud, FiSmartphone,
  FiCpu, FiCheckCircle, FiTarget
} from 'react-icons/fi';
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFastapi,
  SiNodedotjs, SiSupabase, SiPostgresql, SiMysql, SiDocker,
  SiVercel, SiNginx, SiExpo
} from 'react-icons/si';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import Link from 'next/link';
import { Rocket, TerminalIcon } from 'lucide-react';

const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  );
};

const CountUp = ({ end, prefix = '', suffix = '' }: { end: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
      {prefix}{count}{suffix}
    </div>
  );
};

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
  const [formStatus, setFormStatus] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xrbpjrvn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '', phone: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 text-slate-100 min-h-screen">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10">
        <Navbar scrollToSection={scrollToSection} />
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Products scrollToSection={scrollToSection} />
        <TechStack />
        <Services />
        <Stats />
        <Team />
        <Contact
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          formStatus={formStatus}
        />
        <Footer scrollToSection={scrollToSection} />
      </div>
    </div>
  );
};

const Navbar = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Products', id: 'products' },
    { name: 'Tech Stack', id: 'tech-stack' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-indigo-500/20 shadow-2xl shadow-indigo-500/10' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <motion.div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
              <FiCode className="relative text-2xl text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Acharya Technologies
            </span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-slate-300 hover:text-indigo-300 transition-all duration-300 text-sm font-medium relative group px-3 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500" />
              </motion.button>
            ))}
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                <FiMenu className="text-xl" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-950/95 backdrop-blur-2xl border-indigo-500/30">
              <div className="flex flex-col gap-4 mt-10">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-300 hover:text-indigo-300 transition-colors text-base font-medium text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 250 + 50,
              height: Math.random() * 250 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(168, 85, 247, 0.15)'} 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, Math.random() * 80 - 40, 0],
              y: [0, Math.random() * 80 - 40, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 backdrop-blur-md">
              <span className="text-xs text-indigo-300 font-semibold">MSME Registered • 1+ Year of Excellence</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Pioneering the Future of
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Digital Innovation
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Delivering bespoke software solutions, cutting-edge products, and transformative digital strategies to propel businesses forward in a competitive landscape.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('products')}
                className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-6 text-base group border-0 shadow-xl shadow-indigo-500/30"
              >
                <span className="relative z-10 flex items-center">
                  Explore TestForge
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('products')}
                variant="outline"
                className="relative border-2 border-indigo-500/40 text-black hover:bg-indigo-500/10 hover:border-indigo-500/60 hover:text-white px-8 py-6 text-base group backdrop-blur-md overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Discover ProjectNexus
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <FiArrowRight />
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-indigo-900 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-indigo-400/40 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-indigo-400"
          />
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const values = [
    {
      icon: FiTarget,
      title: 'Precision',
      description: 'Unwavering commitment to detail in code, design, and execution for flawless outcomes'
    },
    {
      icon: FiZap,
      title: 'Innovation',
      description: 'Harnessing emerging technologies to deliver groundbreaking solutions'
    },
    {
      icon: FiShield,
      title: 'Resilience',
      description: 'Crafting durable, scalable systems engineered for long-term success'
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Who <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">We Are</span>
            </h2>
            <p className="text-slate-300 text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              Acharya Technologies is an MSME-registered firm with over a year of specialized experience in custom software development and innovative product creation. Serving small to mid-sized enterprises, we&apos;ve generated ₹40k in revenue, focusing on scalable solutions that drive efficiency and growth. Our team combines technical prowess with strategic insight to deliver measurable results.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Card className="bg-slate-900/60 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-500 h-full group overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="p-6 lg:p-8 relative z-10">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30">
                        <value.icon className="text-3xl text-indigo-400" />
                      </div>
                    </div>
                    <CardTitle className="text-indigo-300 text-xl mb-3">{value.title}</CardTitle>
                    <CardDescription className="text-slate-300 text-sm leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  const testForgeFeatures = [
    { icon: FiZap, title: 'Smart Exam Setup', desc: 'Intuitive configuration for diverse exam formats' },
    { icon: FiCalendar, title: 'Dynamic Timetable', desc: 'Automated scheduling with intelligent conflict resolution' },
    { icon: FiUsers, title: 'Automated Seating', desc: 'Efficient, AI-driven seating arrangements' },
    { icon: FiCheckCircle, title: 'Digital eMarksheet', desc: 'Secure, real-time result generation and distribution' },
    { icon: FiTrendingUp, title: 'Advanced Analytics', desc: 'In-depth performance insights and reporting' },
    { icon: FiCpu, title: 'Workflow Engine', desc: 'End-to-end automation of exam processes' }
  ];

  const projectNexusFeatures = [
    { icon: FiLayers, title: 'Project Marketplace', desc: 'Curated selection of custom and prebuilt projects' },
    { icon: FiCheckCircle, title: 'Task Management', desc: 'Robust tools for task assignment and tracking' },
    { icon: FiUsers, title: 'Team Collaboration', desc: 'Seamless real-time communication and teamwork' },
    { icon: FiTarget, title: 'Milestone Tracking', desc: 'Visual progress monitoring with alerts' },
    { icon: FiDatabase, title: 'Resource Management', desc: 'Centralized repository for project assets' },
    { icon: FiTrendingUp, title: 'Performance Analytics', desc: 'Comprehensive metrics for project optimization' }
  ];

  return (
    <section id="products" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-950 via-indigo-950 to-gray-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto">
              Cutting-edge solutions engineered to streamline operations and foster innovation
            </p>
          </div>
        </FadeInWhenVisible>

        <Tabs defaultValue="testforge" className="w-full">
          <TabsList className="relative grid w-full max-w-sm mx-auto grid-cols-2 mb-12 bg-slate-900/70 border border-indigo-500/30 p-1.5 rounded-2xl backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300" />

            <TabsTrigger
              value="testforge"
              className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-500/25 text-slate-300 hover:text-indigo-300 font-medium rounded-xl transition-all duration-300 py-2.5 data-[state=active]:scale-105 group"
            >
              <span className="relative z-10">TestForge</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl -inset-1 opacity-0 group-hover:opacity-100 blur-sm"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            </TabsTrigger>

            <TabsTrigger
              value="projectnexus"
              className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-500/25 text-slate-300 hover:text-indigo-300 font-medium rounded-xl transition-all duration-300 py-2.5 data-[state=active]:scale-105 group"
            >
              <span className="relative z-10">ProjectNexus</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl -inset-1 opacity-0 group-hover:opacity-100 blur-sm"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="testforge">
            <FadeInWhenVisible>
              <Card className="bg-gradient-to-br from-slate-900/70 to-slate-900/40 border-indigo-500/40 mb-10 backdrop-blur-md overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                <CardHeader className="p-8 lg:p-10 relative z-10">
                  <CardTitle className="text-indigo-300 text-2xl lg:text-3xl flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center border border-indigo-500/40">
                      <FiCpu className="text-2xl text-indigo-400" />
                    </div>
                    TestForge
                  </CardTitle>
                  <CardDescription className="text-base text-slate-300 leading-relaxed">
                    A revolutionary platform automating the complete examination lifecycle, from setup to analytics.
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeInWhenVisible>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testForgeFeatures.map((feature, i) => (
                <FadeInWhenVisible key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="bg-slate-900/60 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-500 h-full group overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardHeader className="p-6 lg:p-8 relative z-10">
                        <feature.icon className="text-3xl text-indigo-400 mb-3" />
                        <CardTitle className="text-indigo-300 text-lg mb-2">{feature.title}</CardTitle>
                        <CardDescription className="text-slate-300 text-sm leading-relaxed">
                          {feature.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-6 text-base group border-0 shadow-xl shadow-indigo-500/30">
                  <Link href="https://testforge.software" className="flex items-center">
                    Explore TestForge
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="projectnexus">
            <FadeInWhenVisible>
              <Card className="bg-gradient-to-br from-slate-900/70 to-slate-900/40 border-indigo-500/40 mb-10 backdrop-blur-md overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                <CardHeader className="p-8 lg:p-10 relative z-10">
                  <CardTitle className="text-indigo-300 text-2xl lg:text-3xl flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center border border-indigo-500/40">
                      <FiLayers className="text-2xl text-indigo-400" />
                    </div>
                    ProjectNexus
                  </CardTitle>
                  <CardDescription className="text-base text-slate-300 leading-relaxed">
                    An advanced e-commerce ecosystem for academic projects, bridging students with premium custom and ready-made solutions.
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeInWhenVisible>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectNexusFeatures.map((feature, i) => (
                <FadeInWhenVisible key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="bg-slate-900/60 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-500 h-full group overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardHeader className="p-6 lg:p-8 relative z-10">
                        <feature.icon className="text-3xl text-indigo-400 mb-3" />
                        <CardTitle className="text-indigo-300 text-lg mb-2">{feature.title}</CardTitle>
                        <CardDescription className="text-slate-300 text-sm leading-relaxed">
                          {feature.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-6 text-base group border-0 shadow-xl shadow-indigo-500/30 cursor-pointer"
                >
                  Coming Soon
                  <Rocket className="ml-2 text-lg group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const TechStack = () => {
  const technologies = [
    { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' },
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: FiLayers, name: 'Shadcn/UI', color: '#8b5cf6' },
    { icon: SiFastapi, name: 'FastAPI', color: '#009688' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
    { icon: FiShield, name: 'Clerk', color: '#8b5cf6' },
    { icon: FiUsers, name: 'OAuth', color: '#8b5cf6' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiVercel, name: 'Vercel', color: '#ffffff' },
    { icon: SiNginx, name: 'Nginx', color: '#009639' },
    { icon: SiExpo, name: 'Expo', color: '#ffffff' },
    { icon: FiSmartphone, name: 'React Native', color: '#61DAFB' }
  ];

  return (
    <section id="tech-stack" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Tech <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Stack</span>
            </h2>
            <p className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto">
              Utilizing premier technologies to engineer robust, efficient, and future-proof applications
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 lg:gap-6">
          {technologies.map((tech, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.1, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-slate-900/60 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-500 h-full group overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center relative z-10">
                    <tech.icon
                      className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: tech.color }}
                    />
                    <p className="text-xs text-slate-300 font-medium">{tech.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Product Design & Strategy',
      icon: FiTarget,
      items: ['User Experience Research', 'System Architecture Planning', 'Strategic Product Roadmapping']
    },
    {
      title: 'Full-Stack Development',
      icon: FiCode,
      items: ['Frontend Engineering', 'Backend Development', 'Database Optimization']
    },
    {
      title: 'Mobile App Development',
      icon: FiSmartphone,
      items: ['iOS & Android Apps', 'Cross-Platform Solutions', 'Native Performance Tuning']
    },
    {
      title: 'Cloud & Automation',
      icon: FiCloud,
      items: ['DevOps Implementation', 'Cloud Infrastructure Management', 'AI & Automation Integration']
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-950 via-indigo-950 to-gray-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto">
              Tailored technology services designed to address your unique business challenges and goals
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <motion.div
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-gradient-to-br from-slate-900/70 to-slate-900/40 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-500 h-full group overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="p-8 lg:p-10 relative z-10">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30">
                        <service.icon className="text-3xl text-indigo-400" />
                      </div>
                    </div>
                    <CardTitle className="text-indigo-300 text-xl lg:text-2xl mb-4">{service.title}</CardTitle>
                    <div className="space-y-3">
                      {service.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { value: 40, prefix: "₹", suffix: 'K+', label: 'Revenue Past Year', icon: FiTrendingUp },
    { value: 15, suffix: "+", label: 'Projects Delivered', icon: FiCheckCircle },
    { value: 10, suffix: "+", label: 'Happy Clients', icon: FiUsers },
    { value: 5, label: 'Team Members', icon: FiCode }
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-gradient-to-br from-slate-900/70 to-slate-900/40 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-500 h-full group overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="text-center p-8 lg:p-10 relative z-10">
                    <div className="relative mb-4 inline-block">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                      <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 mx-auto">
                        <stat.icon className="text-3xl text-indigo-400" />
                      </div>
                    </div>
                    <CountUp
                      end={stat.value}
                      prefix={stat.prefix || ''}
                      suffix={stat.suffix || ''}
                    />
                    <CardDescription className="text-slate-300 mt-3 text-base">
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const teamMembers = [
    {
      name: 'Indrajeet',
      role: 'Full-Stack Architect',
      initials: 'I',
      phoneNumber: '+91 8551900826',
      description: 'Orchestrating system architecture and leading full-stack initiatives with precision',
      icon: TerminalIcon
    },
    {
      name: 'Tyler Durden',
      role: 'Product Engineer',
      initials: 'T',
      description: 'Spearheading product development and engineering innovation for optimal outcomes',
      icon: FiLayers
    }
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-950 via-indigo-950 to-gray-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Leadership <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-slate-300 text-base lg:text-lg max-w-xl mx-auto">
              A dedicated team of experts committed to excellence and innovation
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-slate-900/60 backdrop-blur-md border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-500 overflow-hidden group h-full rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="text-center relative z-10 p-8 lg:p-10">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                        <Avatar className="relative w-20 h-20 border-2 border-indigo-500/40 group-hover:border-indigo-500/60 transition-colors">
                          <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-2xl font-bold">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <CardTitle className="text-indigo-300 text-xl flex items-center justify-center gap-2 mb-1">
                      <member.icon className="text-indigo-400 text-lg" />
                      {member.name}
                    </CardTitle>
                    <p className="text-slate-300 text-base mb-3">{member.role}</p>
                    <CardDescription className="text-slate-300 mt-3 text-sm leading-relaxed">
                      {member.description}
                    </CardDescription>
                    {member.phoneNumber && (
                      <Link
                        href={`tel:${member.phoneNumber}`}
                        className="text-indigo-400 hover:text-indigo-300 mt-3 inline-block transition-colors text-sm"
                      >
                        {member.phoneNumber}
                      </Link>
                    )}
                  </CardHeader>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({
  formData,
  setFormData,
  handleSubmit,
  formStatus
}: {
  formData: { name: string; email: string; message: string; phone: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string; phone: string }>>;
  handleSubmit: (e: React.FormEvent) => void;
  formStatus: string;
}) => {
  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get in <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto">
              Ready to transform your ideas into reality? Contact us for consultations, collaborations, or inquiries.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-8 lg:p-10 overflow-hidden group relative"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                  className="bg-slate-800/60 border-indigo-500/40 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 h-12 text-base rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email"
                  required
                  className="bg-slate-800/60 border-indigo-500/40 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 h-12 text-base rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Your Phone"
                  required
                  className="bg-slate-800/60 border-indigo-500/40 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 h-12 text-base rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  required
                  className="bg-slate-800/60 border-indigo-500/40 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 text-base rounded-xl min-h-32"
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-6 text-base w-full border-0 shadow-xl shadow-indigo-500/30"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </Button>
              {formStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-green-400 text-center text-base"
                >
                  Thank you! Your message has been sent successfully.
                </motion.p>
              )}
              {formStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-red-400 text-center text-base"
                >
                  An error occurred. Please try again later.
                </motion.p>
              )}
            </div>
          </motion.form>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

const Footer = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <footer className="py-10 bg-slate-950 border-t border-indigo-500/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
            <FiCode className="relative text-2xl text-indigo-400 group-hover:text-indigo-300 transition-colors" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Acharya Technologies
          </span>
        </motion.div>

        <p className="text-slate-400 text-xs">
          &copy; {new Date().getFullYear()} Acharya Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default App;