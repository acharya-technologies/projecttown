'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFastapi, SiSupabase, SiPostgresql, SiMysql, SiClerk, SiAuth0, SiVercel, SiNginx, SiExpo, SiPostman, SiVscodium, SiFramer } from 'react-icons/si';
import { TbComponents, TbPlugConnected } from 'react-icons/tb';
import { FaDocker, FaGithub, FaNodeJs, FaReact } from 'react-icons/fa';
import { MdOutlineHttp } from 'react-icons/md';
import { Badge } from '../ui/badge';
import FloatingParticles from '../shared/FloatingParticles';
import GlowingOrb from '../shared/GlowingOrb';

export default function TechStack() {
  const staggerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  const technologies = [
    { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend" }, { name: "React", icon: <SiReact />, category: "Frontend" }, { name: "TypeScript", icon: <SiTypescript />, category: "Language" }, { name: "Tailwind", icon: <SiTailwindcss />, category: "Styling" },
    { name: "Shadcn/UI", icon: <TbComponents />, category: "UI" }, { name: "Framer Motion", icon: <SiFramer />, category: "Animation" }, { name: "FastAPI", icon: <SiFastapi />, category: "Backend" }, { name: "Node.js", icon: <FaNodeJs />, category: "Backend" },
    { name: "Supabase", icon: <SiSupabase />, category: "Database" }, { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database" }, { name: "MySQL", icon: <SiMysql />, category: "Database" }, { name: "Clerk", icon: <SiClerk />, category: "Auth" },
    { name: "OAuth", icon: <SiAuth0 />, category: "Auth" }, { name: "REST", icon: <MdOutlineHttp />, category: "API" }, { name: "WebSockets", icon: <TbPlugConnected />, category: "Real-time" }, { name: "Docker", icon: <FaDocker />, category: "DevOps" },
    { name: "Vercel", icon: <SiVercel />, category: "Deployment" }, { name: "Nginx", icon: <SiNginx />, category: "Server" }, { name: "React Native", icon: <FaReact />, category: "Mobile" }, { name: "Expo", icon: <SiExpo />, category: "Mobile" },
    { name: "GitHub", icon: <FaGithub />, category: "Tools" }, { name: "Postman", icon: <SiPostman />, category: "Tools" }, { name: "VS Code", icon: <SiVscodium />, category: "Tools" },
  ];

  return (
    <section id="tech-stack" className="relative py-32 bg-gradient-to-b from-[#121212] to-[#1A1A1A] overflow-hidden">
      <FloatingParticles /><GlowingOrb className="w-96 h-96 bg-blue-500 -left-48 bottom-1/4" />
      
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center space-x-2 mb-4"><div className="w-2 h-2 bg-[#FF6A00] rounded-full" /><span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-wider">Our Technology</span><div className="w-2 h-2 bg-[#FF6A00] rounded-full" /></motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Built on Modern <span className="text-[#FF6A00]">Tech</span></h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">We use proven, scalable, and modern technologies to deliver future-ready solutions that stand the test of time</p>
        </motion.div>

        <motion.div variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {technologies.map((tech, idx) => (
            <motion.div key={idx} variants={itemVariants} whileHover={{ scale: 1.1, y: -5, rotate: [0, -5, 5, 0] }} transition={{ duration: 0.3, rotate: { duration: 0.5 } }} className="group relative">
              <div className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FF6A00] transition-all duration-300 backdrop-blur-sm h-full">
                <div className="text-4xl text-[#FF6A00] group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                <span className="text-sm text-white font-medium text-center">{tech.name}</span>
                <div className="absolute -top-2 -right-2"><Badge variant="secondary" className="bg-[#FF6A00]/20 text-[#FF6A00] text-xs border-0">{tech.category}</Badge></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}