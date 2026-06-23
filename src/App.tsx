import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Code2,
  Terminal,
  Cpu,
  Globe,
  Github,
  Send,
  CheckCircle2,
  Layers,
  Wrench,
  Activity,
  MessageSquare,
  Mail,
  Instagram,
  ChevronDown,
  ArrowRight,
  Bot,
  Database
} from 'lucide-react';

const projects = [
  {
    title: 'Multi-AI Telegram Bot',
    description: 'Telegram bot supporting multiple AI models (GPT, LLaMA, Gemini) with robust user controls & admin dashboard.',
    features: ['Model switching', 'User tiering', 'Admin panel', 'Image/Text processing'],
    tech: ['Python', 'Telegram API', 'OpenRouter'],
    icon: <Bot className="w-6 h-6" />,
    border: 'hover:border-red-500/50'
  },
  {
    title: 'Script Runner Bot',
    description: 'Secure sandbox environment bot that executes user-uploaded Python and Node.js scripts directly in chat.',
    features: ['Code execution', 'Time limits', 'Process management', 'Live output'],
    tech: ['Python', 'Node.js', 'Termux'],
    icon: <Terminal className="w-6 h-6" />,
    border: 'hover:border-red-500/50'
  },
  {
    title: 'File Runner Web App',
    description: 'Cloud-based web application to upload, manage, and run multiple script file types with a live simulated console.',
    features: ['Multi-file upload', 'Live console', 'Responsive UI'],
    tech: ['Flask', 'HTML/JS', 'Tailwind CSS'],
    icon: <Globe className="w-6 h-6" />,
    border: 'hover:border-red-500/50'
  },
  {
    title: 'Game Prediction API',
    description: 'Automated integration bot fetching real-time game data to predict statistical outcomes with timer-based alerts.',
    features: ['Real-time APIs', 'Prediction logic', 'Automated alerts'],
    tech: ['Python', 'REST API'],
    icon: <Activity className="w-6 h-6" />,
    border: 'hover:border-red-500/50'
  }
];

const techStack = [
  { 
    category: 'Languages & Web', 
    items: ['Python', 'PHP', 'JavaScript', 'Node.js', 'HTML / CSS'],
    icon: <Code2 className="w-6 h-6 text-red-600" />,
    bg: 'bg-red-50'
  },
  { 
    category: 'Frameworks', 
    items: ['React', 'Laravel', 'Angular', 'Flask', 'Tailwind CSS'],
    icon: <Wrench className="w-6 h-6 text-red-600" />,
    bg: 'bg-red-50'
  },
  { 
    category: 'Databases', 
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'],
    icon: <Database className="w-6 h-6 text-red-600" />,
    bg: 'bg-red-50'
  },
  { 
    category: 'APIs & Agents', 
    items: ['REST/JSON APIs', 'Custom API Dev', 'WhatsApp/TG Agents', 'Auto Email Agents'],
    icon: <Cpu className="w-6 h-6 text-red-600" />,
    bg: 'bg-red-50'
  }
];

const skills = [
  'Custom API Development (REST, JSON)',
  'WhatsApp & Telegram Bot Agents',
  'Automated Email Agents',
  'Database Setup & Architecture',
  'Full-stack Web Development'
];

interface TypewriterTextProps {
  text: string;
  speed?: number;
  once?: boolean;
  delay?: number;
  className?: string;
}

function TypewriterText({ text, speed = 20, once = true, delay = 0, className = "" }: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px 0px -100px 0px" });
  const [displayed, setDisplayed] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    let index = 0;
    
    if (isInView) {
      setComplete(false);
      setDisplayed("");
      const startTyping = () => {
        const tick = () => {
          if (index < text.length) {
            setDisplayed(text.substring(0, index + 1));
            index++;
            timeoutId = setTimeout(tick, speed);
          } else {
            setComplete(true);
          }
        };
        tick();
      };
      timeoutId = setTimeout(startTyping, delay);
    } else {
      setDisplayed("");
      setComplete(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {!complete && isInView && (
        <span className="inline-block w-[3px] h-[1em] bg-red-500 ml-0.5 animate-pulse" style={{ verticalAlign: 'middle' }} />
      )}
    </span>
  );
}

function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState('');
  const fullText = 'PrimeKhatab';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl sm:text-6xl font-display font-black text-white flex items-center h-[1.2em]">
          {text}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1.5 sm:w-2.5 h-[0.8em] bg-red-600 ml-1.5 sm:ml-2 block"
          />
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: text === fullText ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-red-600 font-bold tracking-widest uppercase text-sm"
        >
          Welcome
        </motion.p>
      </div>
    </motion.div>
  );
}

// NavBar Component
function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 backdrop-blur-md bg-black/40 border-b border-white/10 flex items-center shadow-lg' : 'py-6 bg-transparent flex items-center'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl w-full mx-auto px-6 flex items-center justify-between">
        <div className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2 cursor-pointer animate-pulse" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src="https://avatars.githubusercontent.com/u/219814163?s=400&u=43ec5ab70664a48478b9f08ed14a8b6984dba377&v=4" alt="PrimeKhatab Avatar" className="w-8 h-8 rounded-full object-cover shadow-md border border-red-500/40" />
          PrimeKhatab
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-300">
          <button onClick={() => scrollTo('stack')} className="hover:text-red-500 transition-colors uppercase tracking-wider">STACK</button>
          <button onClick={() => scrollTo('projects')} className="hover:text-red-500 transition-colors uppercase tracking-wider">PROJECTS</button>
          <button onClick={() => scrollTo('skills')} className="hover:text-red-500 transition-colors uppercase tracking-wider">SKILLS</button>
          <button onClick={() => scrollTo('contact')} className="px-6 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-full transition-all border border-red-500/30">LET'S TALK</button>
        </div>
      </div>
    </motion.nav>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [bgVideoId, setBgVideoId] = useState<string>('');

  useEffect(() => {
    const videos = ['-jiAXbLJGJw', 'nAe82r8C9_4'];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setBgVideoId(randomVideo);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Check if the form should be submitted via standard form action.
    // By allowing native form submission, FormSubmit can show its activation page.
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <div className={`min-h-screen bg-transparent text-white font-sans selection:bg-red-500 selection:text-white overflow-x-hidden ${showIntro ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* Dynamic Cinematic Background Video Stream (YouTube Shorts) */}
      {bgVideoId && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#050505] select-none">
          {/* Blurred background copy for rich desktop fill */}
          <div className="absolute inset-0 hidden md:block opacity-[0.6] select-none scale-125 blur-[100px]">
            <iframe
              src={`https://www.youtube.com/embed/${bgVideoId}?autoplay=1&mute=1&loop=1&playlist=${bgVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1&fs=0`}
              className="w-full h-full min-h-[100vh] min-w-[100vw] pointer-events-none border-0"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          </div>

          {/* High quality portrait viewport in the back */}
          <div className="absolute inset-0 flex justify-center items-center opacity-100">
            <div className="relative w-full h-full max-w-[500px] md:max-w-[450px] aspect-[9/16] overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${bgVideoId}?autoplay=1&mute=1&loop=1&playlist=${bgVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1&fs=0`}
                className="absolute top-1/2 left-1/2 w-[100%] h-[100%] pointer-events-none scale-[1.5] -translate-x-1/2 -translate-y-1/2 border-0"
                allow="autoplay; encrypted-media"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}

      <NavBar />

      <main className="relative z-10 w-full mb-20">
        
        {/* HERO SECTION */}
        <section className="min-h-[100svh] flex flex-col justify-center items-center px-6 pt-24 pb-12">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8"
          >
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 0.4 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-sm font-bold shadow-md backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Available for Freelance Work
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.1] pb-2 break-words max-w-full">
              Building AI <br className="hidden sm:block"/>
              <span className="text-red-500">Experiences.</span>
            </h1>
            
            <p className="max-w-2xl text-lg sm:text-2xl text-gray-300 leading-relaxed font-light">
              I'm <span className="font-semibold text-white">PrimeKhatab</span>, an AI Developer with 10 months of intense experience building Telegram bots, workflow automations, and API integrations.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full"
            >
              <a href="#projects" className="inline-flex flex-shrink-0 items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors w-full sm:w-auto shadow-lg shadow-red-600/35 text-center">
                View My Work
                <ArrowRight className="w-5 h-5 shrink-0" />
              </a>
              <a href="https://github.com/rexban18" target="_blank" rel="noopener noreferrer" className="inline-flex flex-shrink-0 items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 border border-white/10 transition-colors w-full sm:w-auto shadow-md text-center backdrop-blur-sm">
                <Github className="w-5 h-5 shrink-0" />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce"
          >
             <span className="text-xs font-bold uppercase tracking-widest text-red-500">Discover</span>
             <ChevronDown className="w-4 h-4 text-red-500" />
          </motion.div>
        </section>

        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-32">
          
          {/* TECH STACK BENTO GRID */}
          <section id="stack">
             <div className="flex flex-col items-center text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4 tracking-tight min-h-[3rem]">
                 <TypewriterText text="Core Arsenal" speed={40} />
               </h2>
               <p className="text-gray-300 max-w-xl text-lg min-h-[3rem]">
                 <TypewriterText text="The tools and technologies I use to bring ideas to life rapidly." speed={20} delay={300} />
               </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {techStack.map((stack, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.5, delay: idx * 0.1 }}
                   className="group relative bg-transparent p-6 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
                 >
                   <div className={`w-14 h-14 rounded-xl ${stack.bg} flex items-center justify-center mb-8 bg-red-600/10 border border-red-500/20`}>
                     {stack.icon}
                   </div>
                   <h3 className="text-white font-bold text-xl mb-4 font-display">
                     <TypewriterText text={stack.category} speed={30} delay={idx * 150 + 600} />
                   </h3>
                   <div className="flex flex-wrap gap-2">
                     {stack.items.map((item, i) => (
                       <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-200">
                         {item}
                       </span>
                     ))}
                   </div>
                 </motion.div>
               ))}
             </div>
          </section>

          {/* PROJECTS TIMELINE/CARDS */}
          <section id="projects">
             <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4 tracking-tight min-h-[3rem]">
                  <TypewriterText text="Selected Works" speed={40} />
                </h2>
                <p className="text-gray-300 max-w-xl text-lg min-h-[3rem]">
                  <TypewriterText text="Production-ready bots, workflow tools, and integrations." speed={20} delay={300} />
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="group bg-transparent p-6 md:p-8 rounded-3xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-5 mb-6">
                         <div className="w-14 h-14 rounded-xl bg-red-600/15 flex items-center justify-center text-red-500 border border-red-500/25">
                           {project.icon}
                         </div>
                         <h3 className="text-2xl font-bold text-white font-display">
                           <TypewriterText text={project.title} speed={25} delay={idx * 150 + 500} />
                         </h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-8 flex-grow text-lg min-h-[4rem]">
                        <TypewriterText text={project.description} speed={12} delay={idx * 150 + 800} />
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Capabilities</div>
                          <div className="flex flex-wrap gap-2">
                            {project.features.map((feature, i) => (
                              <span key={i} className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-200 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <div className="flex flex-wrap items-center gap-2">
                            {project.tech.map((t, i) => (
                              <span key={i} className="text-sm font-mono text-red-400 font-semibold uppercase tracking-tight">
                                {t}{i < project.tech.length - 1 ? <span className="opacity-40 mx-2 text-gray-500">/</span> : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* TWO COLUMN: SKILLS + HONEST ASSESSMENT */}
          <section id="skills">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.6 }}
                   className="bg-transparent p-6 md:p-8 rounded-3xl text-white"
                >
                   <h3 className="text-3xl font-black text-white mb-8 font-display min-h-[3rem]">
                     <TypewriterText text="Definitive Strengths" speed={30} />
                   </h3>
                   <ul className="space-y-5">
                     {skills.map((skill, idx) => (
                       <li key={idx} className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-5 h-5" />
                         </div>
                         <span className="text-gray-200 font-medium text-lg">
                           <TypewriterText text={skill} speed={20} delay={idx * 150 + 400} />
                         </span>
                       </li>
                     ))}
                   </ul>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.6, delay: 0.15 }}
                   className="bg-transparent p-6 md:p-8 rounded-3xl text-white"
                >
                   <h3 className="text-3xl font-black text-white mb-4 font-display min-h-[3rem]">
                     <TypewriterText text="Areas of Growth" speed={30} />
                   </h3>
                   <p className="text-gray-300 mb-8 leading-relaxed text-lg min-h-[5rem]">
                     <TypewriterText text="I believe in radical transparency. In my first 10 months, I've shipped fast, but I'm actively building my deeper knowledge in:" speed={15} delay={300} />
                   </p>
                   <ul className="space-y-4">
                     {['Advanced ML Training & Fine-Tuning pipelines', 'Microservices Architecture & Scaling', 'Enterprise-grade Security Hardening'].map((item, i) => (
                       <li key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                         <Activity className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                         <span className="text-base font-medium text-gray-200">
                           <TypewriterText text={item} speed={20} delay={i * 150 + 850} />
                         </span>
                       </li>
                     ))}
                   </ul>
                </motion.div>

             </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact">
             <div className="relative bg-transparent p-6 md:p-10 lg:p-12">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center"
                  >
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 tracking-tight leading-tight min-h-[5rem]">
                      <TypewriterText text="Let's build something." speed={30} />
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-10 min-h-[4rem]">
                      <TypewriterText text="I am currently available for custom bot development, automated API workflows, and AI integration projects. Drop me a line!" speed={15} delay={400} />
                    </p>
                    
                    <div className="flex flex-col gap-6">
                      <a href="mailto:mrkhatab112@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 flex items-center justify-center">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg break-all">mrkhatab112@gmail.com</span>
                      </a>
                      <a href="https://wa.me/919682544349?text=Hello%20PrimeKhatab%2C%20I%20want%20to%20build%20a%20website." target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-green-400 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg">+91 96825 44349</span>
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-transparent p-6 md:p-8 rounded-2xl"
                  >
                    <form action="https://formsubmit.co/mrkhatab112@gmail.com" method="POST" className="flex flex-col gap-5 h-full justify-center">
                      <input type="hidden" name="_subject" value="New Project Inquiry from your Portfolio!" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_next" value={window.location.href} />
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-gray-300">Name</label>
                          <input required name="name" type="text" placeholder="John Doe" className="bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-gray-300">Email</label>
                          <input required name="email" type="email" placeholder="john@example.com" className="bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-gray-300">Message</label>
                          <textarea required name="message" rows={4} placeholder="Let's build..." className="bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none font-medium" />
                        </div>
                        <button 
                          type="submit" 
                          className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors group w-full"
                        >
                          Send Message
                          <Send className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-1">Submit to send an email directly to my inbox.</p>
                      </div>
                    </form>
                  </motion.div>
                </div>
             </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-16 flex flex-col items-center gap-8 border-t border-white/10 font-medium">
        <div className="flex items-center gap-4">
          <a href="https://github.com/rexban18" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/15 transition-colors" title="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://t.me/primekhatab" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors" title="Telegram">
            <Send className="w-5 h-5" />
          </a>
          <a href="https://wa.me/919682544349?text=Hello%20PrimeKhatab%2C%20I%20want%20to%20build%20a%20website." target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors" title="WhatsApp">
            <MessageSquare className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/primekhatab" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/20 transition-colors" title="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        <div className="text-gray-400 text-sm tracking-wide">
          © {new Date().getFullYear()} PrimeKhatab. All rights reserved.
        </div>
      </footer>
    </div>
    </>
  );
}
