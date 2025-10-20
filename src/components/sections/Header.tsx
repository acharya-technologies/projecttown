'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Code } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const navLinks = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'products', label: 'Products' },
  { id: 'tech-stack', label: 'Tech Stack' }, { id: 'expertise', label: 'Expertise' }, { id: 'vision', label: 'Vision' }, { id: 'contact', label: 'Contact' }
];

export default function Header({ mobileMenuOpen, setMobileMenuOpen, activeSection, setActiveSection, headerOpacity, headerBackground }: any) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <motion.header style={{ opacity: headerOpacity, backgroundColor: headerBackground }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10 shadow-2xl transition-all duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}><Code className="w-8 h-8 text-[#FF6A00] drop-shadow-glow" /></motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Acharya <span className="text-[#FF6A00]">Technologies</span></span>
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <motion.button key={link.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} onClick={() => scrollToSection(link.id)} className={`relative text-sm font-medium transition-all duration-300 ${activeSection === link.id ? 'text-[#FF6A00] drop-shadow-glow' : 'text-white/80 hover:text-white hover:drop-shadow-glow'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {link.label}
              {activeSection === link.id && <motion.div layoutId="activeSection" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6A00] to-orange-600 rounded-full" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
            </motion.button>
          ))}
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden"><Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10"><Menu className="w-6 h-6" /></Button></SheetTrigger>
          <SheetContent side="right" className="bg-[#1A1A1A] border-white/10 backdrop-blur-xl">
            <div className="flex flex-col space-y-6 mt-8">
              {navLinks.map(link => (
                <motion.button key={link.id} onClick={() => scrollToSection(link.id)} whileHover={{ x: 10 }} className={`text-left text-lg font-medium transition-all ${activeSection === link.id ? 'text-[#FF6A00]' : 'text-white/80 hover:text-white'}`}>{link.label}</motion.button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}