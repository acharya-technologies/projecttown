"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  FiCode, FiMenu, FiX, FiArrowRight, FiCalendar,
  FiLayers, FiZap, FiShield,
  FiTrendingUp, FiUsers, FiDatabase, FiCloud, FiSmartphone,
  FiCpu, FiCheckCircle, FiAward, FiTarget
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
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
      transition={{ duration: 0.6, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 30 }
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
    <div ref={ref} className="text-4xl sm:text-5xl font-bold text-orange-500">
      {prefix}{count}{suffix}
    </div>
  );
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
  const [formStatus, setFormStatus] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
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
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 min-h-screen">
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-lg shadow-lg shadow-orange-500/5' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <motion.div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
          >
            <FiCode className="text-2xl sm:text-3xl text-orange-500 group-hover:text-orange-400 transition-colors" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Acharya Technologies
            </span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-slate-400 hover:text-orange-500 transition-colors text-sm font-medium relative group"
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-orange-500">
                <FiMenu className="text-2xl" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-950 border-slate-800">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 hover:text-orange-500 transition-colors text-lg font-medium text-left"
                  >
                    {link.name}
                  </button>
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-slate-900" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building the Future of
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Technology & Digital Solutions
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-slate-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering businesses with cutting-edge software solutions, innovative tech products,
            and transformative digital experiences
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => scrollToSection('products')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg group"
            >
              Explore TestForge
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('products')}
              variant="outline"
              className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10 px-8 py-6 text-lg group"
            >
              Discover ProjectNexus
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Team = () => {
  const teamMembers = [
    {
      name: '1ndrajeet',
      role: 'Full-Stack Architect',
      initials: '1',
      phoneNumber: '+91 8551900826',
      description: 'Leading architecture design and full-stack development',
      icon: TerminalIcon
    },
    {
      name: 'Tyler Durden',
      role: 'Product Engineer',
      initials: 'N',
      description: 'Driving product innovation and engineering excellence',
      icon: FiLayers
    }
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Leadership <span className="text-orange-500">Team</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Driven by expertise, united by innovation
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <Avatar className="w-20 h-20 border-2 border-orange-500">
                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-2xl font-bold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>

                    </div>
                    <CardTitle className="text-orange-500 text-xl flex items-center justify-center gap-2">
                      <member.icon className="text-orange-500" />
                      {member.name}
                    </CardTitle>
                    <p className="text-slate-400 mb-2">{member.role}</p>
                    <CardDescription className="text-slate-400 mt-2">
                      {member.description}
                    </CardDescription>
                    {member.phoneNumber && <Link href={`tel:${member.phoneNumber}`} className="text-slate-400 mt-0">{member.phoneNumber}</Link>}
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
    { value: 50, prefix: "₹", suffix: 'K+', label: 'Revenue Past Year', icon: FiTrendingUp },
    { value: 15, suffix: "+", label: 'Projects Delivered', icon: FiCheckCircle },
    { value: 10, suffix: "+", label: 'Happy Clients', icon: FiUsers },
    { value: 5, label: 'Team Members', icon: FiCode }
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 border-slate-800 hover:border-orange-500/50 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="w-14 h-14 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 mx-auto">
                      <stat.icon className="text-3xl text-orange-500" />
                    </div>
                    <CountUp
                      end={stat.value}
                      prefix={stat.prefix || ''}
                      suffix={stat.suffix || ''}
                    />
                    <CardDescription className="text-slate-400 mt-2">
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

const About = () => {
  const values = [
    {
      icon: FiTarget,
      title: 'Precision',
      description: 'Meticulous attention to detail in every line of code and design decision'
    },
    {
      icon: FiZap,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technologies and creative solutions'
    },
    {
      icon: FiShield,
      title: 'Resilience',
      description: 'Building robust, scalable systems that stand the test of time'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Who <span className="text-orange-500">We Are</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              An MSME-registered technology company with over a year of proven expertise in delivering
              custom software solutions and innovative tech products for small to mid-level companies.
              With ₹40k in revenue last year, we&apos;ve established ourselves as a trusted partner in digital transformation.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 border-slate-800 hover:border-orange-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                      <value.icon className="text-3xl text-orange-500" />
                    </div>
                    <CardTitle className="text-orange-500 text-xl">{value.title}</CardTitle>
                    <CardDescription className="text-slate-400">
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
    { icon: FiZap, title: 'Smart Exam Setup', desc: 'Intuitive configuration for any exam format' },
    { icon: FiCalendar, title: 'Dynamic Timetable', desc: 'Automated scheduling with conflict resolution' },
    { icon: FiUsers, title: 'Automated Seating', desc: 'Intelligent seating arrangement generation' },
    { icon: FiAward, title: 'Digital eMarksheet', desc: 'Secure, instant result distribution' },
    { icon: FiTrendingUp, title: 'Advanced Analytics', desc: 'Deep insights into exam performance' },
    { icon: FiCpu, title: 'Workflow Engine', desc: 'Complete automation of exam lifecycle' }
  ];

  const projectNexusFeatures = [
    { icon: FiLayers, title: 'Project Marketplace', desc: 'Discover custom & prebuilt college projects' },
    { icon: FiCheckCircle, title: 'Task Management', desc: 'Streamlined project task tracking' },
    { icon: FiUsers, title: 'Team Collaboration', desc: 'Real-time teamwork and communication' },
    { icon: FiTarget, title: 'Milestone Tracking', desc: 'Monitor progress with visual milestones' },
    { icon: FiDatabase, title: 'Resource Management', desc: 'Centralized project resource hub' },
    { icon: FiTrendingUp, title: 'Performance Analytics', desc: 'Detailed project performance metrics' }
  ];

  return (
    <section id="products" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-orange-500">Products</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Innovative solutions designed to transform workflows and drive success
            </p>
          </div>
        </FadeInWhenVisible>

        <Tabs defaultValue="testforge" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-slate-900 border border-slate-800 ">
            <TabsTrigger value="testforge" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-white">
              TestForge
            </TabsTrigger>
            <TabsTrigger value="projectnexus" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-white">
              ProjectNexus
            </TabsTrigger>
          </TabsList>

          <TabsContent value="testforge">
            <FadeInWhenVisible>
              <Card className="bg-gradient-to-br from-slate-900/70 to-slate-900/30 border-slate-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-orange-500 text-2xl sm:text-3xl flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <FiCpu className="text-2xl text-orange-500" />
                    </div>
                    TestForge
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-400">
                    Revolutionary exam workflow automation tool that streamlines the entire examination lifecycle
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeInWhenVisible>

            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 md:grid md:grid-cols-3 md:gap-6 min-w-max md:min-w-0">
                {testForgeFeatures.map((feature, i) => (
                  <FadeInWhenVisible key={i} delay={i * 0.1}>
                    <motion.div
                      className="w-72 md:w-auto"
                      whileHover={{ y: -8 }}
                    >
                      <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all duration-300 h-full">
                        <CardHeader>
                          <feature.icon className="text-3xl text-orange-500 mb-3" />
                          <CardTitle className="text-orange-500 text-lg">{feature.title}</CardTitle>
                          <CardDescription className="text-slate-400">
                            {feature.desc}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </FadeInWhenVisible>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg group"
              >
                <Link href="https://testforge.software">Explore TestForge</Link>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="projectnexus">
            <FadeInWhenVisible>
              <Card className="bg-gradient-to-br from-slate-900/70 to-slate-900/30 border-slate-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-orange-500 text-2xl sm:text-3xl flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <FiLayers className="text-2xl text-orange-500" />
                    </div>
                    ProjectNexus
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-400">
                    Comprehensive e-commerce platform for college project services, connecting students with quality custom and prebuilt projects
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeInWhenVisible>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectNexusFeatures.map((feature, i) => (
                <FadeInWhenVisible key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -8 }}>
                    <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all duration-300 h-full">
                      <CardHeader>
                        <feature.icon className="text-3xl text-orange-500 mb-3" />
                        <CardTitle className="text-orange-500 text-lg">{feature.title}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {feature.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg group cursor-pointer"
              >
                Coming soon...<Rocket className="text-xl group-hover:-translate-y-2 group-hover:translate-x-1 transition-transform duration-100" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const TechStack = () => {
  const technologies = [
    { icon: SiNextdotjs, name: 'Next.js', color: '#fff' },
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    { icon: FiLayers, name: 'Shadcn/UI', color: '#f97316' },
    { icon: SiFastapi, name: 'FastAPI', color: '#009688' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
    { icon: FiShield, name: 'Clerk', color: '#f97316' },
    { icon: FiUsers, name: 'OAuth', color: '#f97316' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiVercel, name: 'Vercel', color: '#fff' },
    { icon: SiNginx, name: 'Nginx', color: '#009639' },
    { icon: SiExpo, name: 'Expo', color: '#fff' },
    { icon: FiSmartphone, name: 'React Native', color: '#61DAFB' }
  ];

  return (
    <section id="tech-stack" className="py-20 sm:py-32 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Tech <span className="text-orange-500">Stack</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Leveraging industry-leading technologies to build scalable, high-performance solutions
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.1, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <tech.icon
                      className="text-4xl mb-3"
                      style={{ color: tech.color }}
                    />
                    <p className="text-sm text-slate-400 font-medium">{tech.name}</p>
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
      items: ['UX Research', 'System Architecture', 'Product Strategy']
    },
    {
      title: 'Full-Stack Development',
      icon: FiCode,
      items: ['Frontend Development', 'Backend Development', 'Database Design']
    },
    {
      title: 'Mobile App Development',
      icon: FiSmartphone,
      items: ['iOS & Android', 'Cross-Platform', 'Native Performance']
    },
    {
      title: 'Cloud & Automation',
      icon: FiCloud,
      items: ['DevOps', 'Cloud Infrastructure', 'AI Integration']
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-orange-500">Expertise</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Comprehensive technology services tailored to your business needs
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-slate-900/70 to-slate-900/30 border-slate-800 hover:border-orange-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                      <service.icon className="text-3xl text-orange-500" />
                    </div>
                    <CardTitle className="text-orange-500 text-2xl mb-4">{service.title}</CardTitle>
                    <div className="space-y-3">
                      {service.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <FiCheckCircle className="text-orange-500 flex-shrink-0" />
                          <span className="text-slate-400">{item}</span>
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
    <section id="contact" className="py-20 sm:py-32 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-orange-500">Touch</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Whether you have a project in mind or just want to say hello, we&apos;d love to hear from you!
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-slate-900/50 border border-slate-800 rounded-lg p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
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
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
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
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                Phone
              </label>
              <Input
                id="phone"
                type="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Your phone"
                required
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your Message"
                required
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:ring-orange-500"
                rows={5}
              />
            </div>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 text-lg w-full"
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </Button>
            {formStatus === 'success' && (
              <p className="mt-4 text-green-500">Thank you! Your message has been sent.</p>
            )}
            {formStatus === 'error' && (
              <p className="mt-4 text-red-500">Oops! Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
const Footer = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <footer className="py-8 sm:py-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
        >
          <FiCode className="text-2xl sm:text-3xl text-orange-500 group-hover:text-orange-400 transition-colors" />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            Acharya Technologies
          </span>
        </motion.div>

        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Acharya Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default App;