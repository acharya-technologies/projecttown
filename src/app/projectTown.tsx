"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FiArrowRight, FiLayers, FiMenu, FiPhone, FiMail, FiX, FiStar, FiCheck } from "react-icons/fi";
import {
  SiReact, SiNodedotjs, SiPython, SiMongodb, SiFlutter, SiAndroid, SiNextdotjs, SiTypescript,
  SiSupabase,
  SiFlask,
  SiFirebase,
} from "react-icons/si";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MdFlipCameraAndroid, MdWeb, MdDesktopMac } from "react-icons/md";
import { TbBrandReactNative, TbBuildingStore } from "react-icons/tb";
import { PhoneCall, Users, Clock, Award } from "lucide-react";

// Type Definitions
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  onClick?: () => void;
}

interface CountUpProps {
  end: number;
  suffix?: string;
}

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface Project {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

interface Plan {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface NavbarProps {
  scrollTo: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

interface HeroProps {
  scrollTo: (id: string) => void;
}

interface ContactProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleSubmit: (data: FormData) => Promise<void>;
  formStatus: string;
}

// Form Schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Enhanced Animation Component
const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, direction = "up" }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const directionVariants = {
    up: { visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } },
    down: { visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -40 } },
    left: { visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: 40 } },
    right: { visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -40 } },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      variants={directionVariants[direction]}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Feature Card
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, gradient, onClick }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }} 
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="h-full"
  >
    <Card className="border-gray-200/70 hover:border-blue-200/50 hover:shadow-2xl transition-all duration-500 h-full bg-white/70 backdrop-blur-sm overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-8 relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-white text-2xl" />
        </div>
        <CardTitle className="text-xl mb-3 font-bold text-gray-900">{title}</CardTitle>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        {onClick && (
          <Button 
            variant="ghost" 
            onClick={onClick} 
            className="p-0 text-blue-600 hover:text-blue-700 font-medium group/btn"
          >
            Learn more 
            <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

// Count Up Animation
const CountUp: React.FC<CountUpProps> = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
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
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const ProjectTownApp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "", phone: "" });
  const [formStatus, setFormStatus] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (data: FormData) => {
    setFormStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xrbpjrvn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "", phone: "" });
        setTimeout(() => setFormStatus(""), 5000);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/10">
      <Navbar scrollTo={scrollTo} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero scrollTo={scrollTo} />
      <Services scrollTo={scrollTo} />
      <Projects />
      <Technologies />
      <Stats />
      <Testimonials />
      <Pricing />
      <Contact formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} formStatus={formStatus} />
      <Footer />
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ scrollTo, mobileMenuOpen, setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "Services", "Projects", "Technologies", "Pricing", "Contact"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-sm py-2" 
          : "bg-white/80 backdrop-blur-lg py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.button 
            onClick={() => scrollTo("home")} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TbBuildingStore className="text-white text-xl" />
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ProjectTown
              </h1>
              <p className="text-xs text-gray-500 font-medium">Academic Excellence</p>
            </div>
          </motion.button>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Button
                key={link}
                variant="ghost"
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </Button>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollTo("contact")} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Get Quote
              </Button>
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
            >
              {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </Button>
          </motion.div>
        </div>

        <motion.div 
          initial={false} 
          animate={{ height: mobileMenuOpen ? "auto" : 0 }} 
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-gray-100 mt-4">
            {links.map((link) => (
              <Button
                key={link}
                variant="ghost"
                onClick={() => scrollTo(link.toLowerCase())}
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                {link}
              </Button>
            ))}
            <Button 
              onClick={() => scrollTo("contact")} 
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Get Quote
            </Button>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

const Hero: React.FC<HeroProps> = ({ scrollTo }) => (
  <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30" />
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
    
    <div className="max-w-6xl mx-auto text-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl mb-8 border border-blue-100 shadow-lg shadow-blue-100/50"
        >
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-700">15+ Projects Delivered • 24/7 Support</span>
          <Award className="w-4 h-4 text-blue-600" />
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 leading-tight">
          Premium
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Academic Projects
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          &quote;Empower your academic success with complete source code, professional documentation, and expert guidance.&quote;
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => scrollTo("services")}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              size="lg"
            >
              Explore Services
              <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="tel:8551900826" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full px-8 py-6 text-lg border-2" size="lg">
                <PhoneCall className="mr-3" />
                Call Now
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: 15, suffix: "+", label: "Projects", icon: FiLayers },
            { value: 98, suffix: "%", label: "Success Rate", icon: Award },
            { value: 48, suffix: "hrs", label: "Delivery", icon: Clock },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <stat.icon className="text-2xl text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Services: React.FC<HeroProps> = ({ scrollTo }) => {
  const services: FeatureCardProps[] = [
    {
      icon: MdWeb,
      title: "Web Applications",
      description: "Full-stack solutions with React, Node.js, and modern frameworks. Responsive design with cutting-edge technologies.",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: MdFlipCameraAndroid,
      title: "Mobile Apps",
      description: "Native Android and cross-platform Flutter applications. Smooth UX and modern design patterns.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: MdDesktopMac,
      title: "Desktop Software",
      description: "Java Swing, C# WPF, and Electron desktop applications. Professional-grade desktop solutions.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: FiLayers,
      title: "AI/ML Projects",
      description: "Python-based ML solutions with TensorFlow and NLP. Intelligent systems and data-driven applications.",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              &quote;From concept to deployment, we deliver comprehensive projects that excel in academic evaluations.&quote;
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <FeatureCard {...service} onClick={() => scrollTo("contact")} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState("web");

  const projects: Record<string, Project[]> = {
    web: [
      {
        title: "AutoAssure – AI Car Marketplace",
        link: "https://autoassure.vercel.app/",
        description: "India's premier car marketplace with real-time auctions, AI chatbot, and secure payments.",
        tags: ["Next.js", "Supabase", "AI", "Razorpay"],
      },
      {
        title: "TestForge - Exam Platform",
        link: "https://testforge.vercel.app/",
        description: "Comprehensive exam conduction platform with MSBTE compliance and automated reporting.",
        tags: ["React", "Node.js", "MongoDB"],
      },
    ],
    mobile: [
      {
        title: "CrimeReport – Security System",
        link: "https://crime-report-beta.vercel.app/",
        description: "Flutter-based crime reporting system with real-time tracking and police coordination.",
        tags: ["Flutter", "Firebase", "Web"],
      },
    ],
    ai: [
      {
        title: "HireSphere – AI Career Planner",
        link: "https://hiresphere-gamma.vercel.app/",
        description: "AI-driven career navigation with personalized learning paths and success tracking.",
        tags: ["AI", "Next.js", "Gemini"],
      },
      {
        title: "Travzi – Travel Planner",
        link: "/projects/travzi",
        description: "Intelligent itinerary generator with real-time insights and business optimization.",
        tags: ["AI", "React", "Maps"],
      },
    ],
  };

  return (
    <section id="projects" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              &quote;15+ verified projects designed to boost your academic success and impress your evaluators.&quote;
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto mb-12">
            <TabsList className="grid grid-cols-3 bg-white/80 backdrop-blur-sm p-2 rounded-2xl border border-gray-200 shadow-lg">
              {["web", "mobile", "ai"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab} 
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {["web", "mobile", "ai"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  {projects[tab].map((project, i) => (
                    <FadeIn key={project.title} delay={i * 0.15}>
                      <Card className="border-gray-200/70 hover:border-blue-200/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                        <CardContent className="p-8">
                          <div className="flex justify-between items-start mb-4">
                            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {project.title}
                            </CardTitle>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, j) => (
                                <FiStar key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-100"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              24–48 hrs
                            </span>
                            <span className="font-bold text-blue-600 text-lg">₹4000</span>
                          </div>
                          
                          <Button asChild variant="outline" className="w-full group/btn border-2">
                            <Link href={project.link}>
                              View Project Details
                              <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                size="lg"
              >
                Request Custom Project
                <TbBuildingStore className="ml-3" />
              </Button>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Technologies: React.FC = () => {
  const techs: { name: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { name: "React", icon: SiReact, color: "text-cyan-500" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
    { name: "Python", icon: SiPython, color: "text-blue-500" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Flutter", icon: SiFlutter, color: "text-blue-400" },
    { name: "Android", icon: SiAndroid, color: "text-green-500" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-gray-900" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
    { name: "Supabase", icon: SiSupabase, color: "text-green-500" },
    { name: "Flask", icon: SiFlask, color: "text-gray-800" },
    { name: "Firebase", icon: SiFirebase, color: "text-amber-500" },
    { name: "React Native", icon: TbBrandReactNative, color: "text-blue-500" },
  ];

  return (
    <section id="technologies" className="py-24 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              &quote;Cutting-edge technologies powering robust, scalable, and modern academic solutions.&quote;
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {techs.map((tech, i) => (
            <FadeIn key={tech.name} delay={i * 0.05} direction="up">
              <motion.div
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/70 rounded-2xl p-8 flex flex-col items-center gap-4 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-300 group"
              >
                <tech.icon className={`text-5xl ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-sm font-semibold text-gray-700 text-center">{tech.name}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats: React.FC = () => {
  const stats: { icon: React.ComponentType<{ className?: string }>; value: number; suffix: string; label: string }[] = [
    { icon: FiLayers, value: 15, suffix: "+", label: "Projects Delivered" },
    { icon: Users, value: 100, suffix: "+", label: "Students Helped" },
    { icon: Award, value: 98, suffix: "%", label: "Success Rate" },
    { icon: Clock, value: 48, suffix: "hrs", label: "Avg Delivery" },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} direction="up">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                  <stat.icon className="text-3xl text-white opacity-90" />
                </div>
                <div className="text-5xl font-bold mb-3">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-blue-100 text-lg font-medium">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const testimonials: { name: string; course: string; text: string; avatar: string; rating: number }[] = [
    { 
      name: "Rahul S.", 
      course: "B.Tech Computer Science", 
      text: "Received my web application project within 24 hours. The code was clean, documentation thorough, and scored 9.8/10 in my final evaluation!", 
      avatar: "RS", 
      rating: 5 
    },
    { 
      name: "Priya P.", 
      course: "MCA Final Year", 
      text: "The Flutter mobile app they delivered was flawless. Great support throughout the project and excellent viva preparation guidance.", 
      avatar: "PP", 
      rating: 5 
    },
    { 
      name: "Amit K.", 
      course: "BCA Data Science", 
      text: "Custom AI/ML project impressed my professor. Complete source code with LaTeX report helped me understand every aspect clearly.", 
      avatar: "AK", 
      rating: 5 
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              Student{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              &quote;Join hundreds of students who achieved academic excellence with our projects.&quote;
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <Card className="border-gray-200/70 hover:border-blue-200/50 hover:shadow-2xl transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, j) => (
                      <FiStar key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed italic">&quote;{t.text}&quote;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{t.name}</p>
                      <p className="text-gray-500 text-sm">{t.course}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  const plans: Plan[] = [
    {
      name: "Essential",
      price: "₹4000",
      features: [
        "Complete Source Code",
        "Basic Documentation", 
        "48-hour Delivery",
        "Email Support",
        "Setup Instructions"
      ],
    },
    {
      name: "Complete",
      price: "₹5000",
      features: [
        "Complete Source Code",
        "Professional LaTeX Report", 
        "Full Setup Assistance",
        "Viva Preparation Guide",
        "Priority 24/7 Support",
        "1 Week Revision Support",
        "Deployment Assistance"
      ],
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              Simple{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              &quote;Affordable plans designed to help you succeed in your academic journey.&quote;
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.2} direction="up">
              <Card className={`relative border-2 transition-all duration-500 group hover:shadow-2xl ${
                plan.popular 
                  ? "border-blue-500 shadow-xl scale-105" 
                  : "border-gray-200/70 hover:border-blue-200/50"
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-6">
                  <CardTitle className="text-3xl font-bold text-gray-900 text-center">{plan.name}</CardTitle>
                  <div className="text-5xl font-bold text-gray-900 text-center mt-4">
                    {plan.price}
                    <span className="text-lg text-gray-500 font-normal">/project</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-600">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FiCheck className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={plan.popular ? 'default' : 'outline'}
                      className={`w-full py-6 text-lg font-semibold border-2 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40' 
                          : 'hover:border-blue-600 hover:text-blue-600'
                      }`}
                      size="lg"
                    >
                      Choose {plan.name}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC<ContactProps> = ({ formData, setFormData, handleSubmit, formStatus }) => {
  const { register, handleSubmit: formSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: FormData) => {
    handleSubmit(data);
    if (formStatus === "success") reset();
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-blue-50/30 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              Start Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Project
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              &quote;Let&apos;s build your dream project together. Get a free quote and expert consultation.&quote;
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          <FadeIn delay={0.2} direction="right">
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-bold">Get In Touch</CardTitle>
                <p className="text-blue-100 text-lg mt-2">
                  We&apos;re here to help you succeed in your academic journey.
                </p>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <a href="tel:8551900826" className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">8551 900 826</p>
                    <p className="text-blue-100 text-sm">Call us anytime</p>
                  </div>
                </a>
                <a href="mailto:omkar.kulkarni.3174@gmail.com" className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Email Us</p>
                    <p className="text-blue-100 text-sm break-all">omkar.kulkarni.3174@gmail.com</p>
                  </div>
                </a>
                <div className="p-6 bg-white/10 rounded-2xl mt-8">
                  <h4 className="font-bold text-lg mb-3">Why Choose Us?</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-300" />
                      24/7 Student Support
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-300" />
                      Free Viva Preparation
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-300" />
                      Complete Documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-300" />
                      On-time Delivery Guarantee
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4} direction="left">
            <Card className="border-gray-200/70 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardContent className="p-8">
                <form onSubmit={formSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Input 
                      placeholder="Your Full Name" 
                      {...register("name")} 
                      className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-2 font-medium">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Your Email Address" 
                      {...register("email")} 
                      className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-2 font-medium">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="Your Phone Number (Optional)" 
                      {...register("phone")} 
                      className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Tell us about your project requirements, deadline, and any specific technologies you prefer..." 
                      {...register("message")} 
                      rows={6}
                      className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl resize-none"
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-2 font-medium">{errors.message.message}</p>}
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 rounded-xl"
                      size="lg"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                          Sending Your Request...
                        </>
                      ) : (
                        "Get Free Quote & Consultation"
                      )}
                    </Button>
                  </motion.div>
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl text-lg text-center font-medium"
                    >
                      ✓ Thank you! We&apos;ll contact you within 30 minutes.
                    </motion.div>
                  )}
                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-lg text-center font-medium"
                    >
                      ✗ Something went wrong. Please try again or call us directly.
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-16 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TbBuildingStore className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                ProjectTown
              </h3>
              <p className="text-sm text-gray-400 font-medium">Academic Excellence</p>
            </div>
          </div>
          <p className="text-lg text-gray-400 mb-6 max-w-md leading-relaxed">
             &quote;Empowering students with premium academic projects, complete source code, and expert guidance for academic success.&quote;
          </p>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
              <FiPhone className="text-xl text-blue-400" />
            </div>
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
              <FiMail className="text-xl text-blue-400" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-white">Our Services</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer">Web Development</li>
            <li className="hover:text-white transition-colors cursor-pointer">Mobile Applications</li>
            <li className="hover:text-white transition-colors cursor-pointer">Desktop Software</li>
            <li className="hover:text-white transition-colors cursor-pointer">AI/ML Projects</li>
            <li className="hover:text-white transition-colors cursor-pointer">Academic Reports</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer">24/7 Assistance</li>
            <li className="hover:text-white transition-colors cursor-pointer">Free Explanations</li>
            <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
            <li className="hover:text-white transition-colors cursor-pointer">Viva Preparation</li>
            <li className="hover:text-white transition-colors cursor-pointer">Revision Support</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-400 text-lg">
          &copy; 2025 ProjectTown. All rights reserved.{" "}
          <span className="text-blue-400">
            Powered by{" "}
            <a href="https://acharya.is-local.org" className="underline hover:text-blue-300 transition-colors">
              Acharya Technologies
            </a>
          </span>
        </p>
      </div>
    </div>
  </footer>
);

export default ProjectTownApp;