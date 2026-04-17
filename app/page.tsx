"use client";

import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Moon, 
  Sun, 
  ExternalLink, 
  BookOpen, 
  FileText, 
  X, 
  Zap,    // New Neon Icon
  Waves   // New Muted Icon
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ChaoticRibbonWave from "@/components/fluid-wave";

// Project Data Array
const PROJECTS = [
  {
    id: "selex",
    title: "SELEX Simulator",
    summary: "Deep learning system for in-silico SELEX simulation. Designed a cross-attention predictor to model round-wise DNA sequence enrichment.",
    description: "In this project, we worked on the development of a deep learning system for in-silico SELEX simulation and prediction. Designed and implemented a cross-attention predictor to model round-wise DNA sequence enrichment, and currently building a generative framework using flow matching and neural ODEs to simulate the full enrichment trajectory.",
    tags: ["Deep Learning", "Flow Matching"],
    links: { github: "#", pdf: "#" }
  },
  {
    id: "convex",
    title: "Convex Clustering",
    summary: "Explored techniques in Convex clustering literature, adapting ADMM for biclustering to simultaneously cluster samples and genes.",
    description: "Explored various techniques that are prevalent in the landscape of Convex clustering literature and methodologies commonly used by practitioners to deal with optimization problems, namely ADMM (Alternating Direction Method of Multipliers).",
    tags: ["Optimization", "ADMM"],
    links: { github: "#", pdf: "#" }
  },
  {
    id: "bregman",
    title: "Bregman Divergences",
    summary: "Analyzed convergence rates of clustering algorithms under various optimization subroutines using different Bregman divergences.",
    description: "Explored various Bregman divergences such as Kullback-Leibler divergence and studied how they affect the clustering ability of an algorithm. Analyzed convergence rates under subroutines like Gradient Descent and ADAM.",
    tags: ["Clustering", "Math"],
    links: { github: "#", pdf: "#", publication: "#" }
  },
  {
    id: "rl",
    title: "RL & Evolutionary Algos",
    summary: "Implemented minimax, Q-learning, and MCTS on gym environments including tic-tac-toe, blackjack, and Atari games.",
    description: "Surveyed literature in these disciplines and how they intertwine. Implemented algorithms like minimax, Q-learning, MCTS, and deep learning inspired variants on simple environments like tic-tac-toe and Atari.",
    tags: ["RL", "Python"],
    links: { github: "#" }
  }
];

export default function Portfolio() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  
  // Set to FALSE so it defaults to the readable Muted Pastel aesthetic
  const [isNeon, setIsNeon] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock scroll when project modal is open
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const toggleAesthetic = () => {
    const newState = !isNeon;
    setIsNeon(newState);
    // Notify the canvas component to change styles
    window.dispatchEvent(new CustomEvent("toggle-aesthetic", { detail: { isNeon: newState } }));
  };

  return (
    <div className="min-h-screen text-zinc-600 dark:text-zinc-400 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-200 transition-colors duration-300">
      
      {/* Background Animated Wave */}
      <ChaoticRibbonWave />

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:left-1/2 lg:w-1/2 lg:p-12 cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" 
                 style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }} 
            />

            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/90 p-8 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 cursor-default"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 pr-12 mb-4">{selectedProject.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">{tag}</span>
                ))}
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-auto border-t border-zinc-200 dark:border-zinc-800 pt-6">
                {selectedProject.links.github && (
                  <a href={selectedProject.links.github} className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <Github className="w-4 h-4" /> View Repository
                  </a>
                )}
                {selectedProject.links.pdf && (
                  <a href={selectedProject.links.pdf} className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <FileText className="w-4 h-4" /> View PDF
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative mx-auto min-h-screen max-w-screen-xl">
        
        {/* THE DYNAMIC GLASS PANE: Only activates during Neon mode */}
        <div 
          className={`absolute inset-0 -z-10 transition-all duration-700 sm:border-x ${
            isNeon 
              ? "bg-white/70 dark:bg-black/70 backdrop-blur-[12px] border-zinc-200/50 dark:border-zinc-800/50" 
              : "bg-transparent backdrop-blur-none border-zinc-200/10 dark:border-zinc-800/10"
          }`}
        ></div>

        <div className="px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <div>
                <div className="flex flex-col items-start w-full">
                  
                  <div className="flex w-full justify-between items-start mb-6">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-100 dark:bg-zinc-900"
                    >
                      <Image src="/profile.jpg" alt="Swagato Das" width={160} height={160} className="object-cover w-full h-full" />
                    </motion.div>

                    <div className="flex gap-3 z-50">
                      {mounted && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={toggleAesthetic}
                          className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all shadow-md hover:shadow-lg"
                          aria-label="Toggle visual aesthetic"
                          title={isNeon ? "Switch to Muted Flow" : "Switch to Neon Glow"}
                        >
                          {isNeon ? <Zap className="w-5 h-5 text-sky-500 fill-sky-500/20" /> : <Waves className="w-5 h-5" />}
                        </motion.button>
                      )}

                      {mounted && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            boxShadow: isNeon 
                              ? (resolvedTheme === 'dark' 
                                ? "0 0 10px rgba(0, 255, 255, 0.4), 0 0 20px rgba(255, 0, 255, 0.2)" 
                                : "0 0 10px rgba(255, 215, 0, 0.4), 0 0 20px rgba(255, 69, 0, 0.2)")
                              : "none"
                          }}
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                          className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all shadow-md hover:shadow-lg"
                          aria-label="Toggle theme"
                        >
                          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                      Swagato Das
                    </motion.h1>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 text-lg font-medium tracking-tight text-zinc-700 dark:text-zinc-200 sm:text-xl">
                      Master of Statistics @ ISI Kolkata
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 max-w-xs leading-normal">
                      Focusing on Deep Learning, Generative Models, and Causal Inference.
                    </motion.p>
                  </div>
                </div>

                <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex items-center gap-5">
                  <li><a href="https://github.com/Swag-Pseudopy" target="_blank" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><Github className="h-6 w-6" /></a></li>
                  <li><a href="https://linkedin.com/in/swagato-das" target="_blank" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><Linkedin className="h-6 w-6" /></a></li>
                  <li><a href="mailto:swagato.isi2227@gmail.com" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><Mail className="h-6 w-6" /></a></li>
                </motion.ul>
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
                  <a href="/Swagato_Das_Cv.pdf" download className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 bg-zinc-100 border-zinc-200 hover:bg-zinc-200 dark:text-zinc-100 dark:bg-zinc-800/50 border dark:border-zinc-700/50 rounded-full dark:hover:bg-zinc-700/50 transition-colors">
                    <Download className="h-4 w-4" /> Download CV
                  </a>
                </motion.div>
              </div>
            </header>

            <main className="pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-24">
              <section id="projects">
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Selected Projects</h3>
                <div className="grid grid-cols-1 gap-6">
                  {PROJECTS.map((project) => (
                    <motion.div 
                      layoutId={`project-card-${project.id}`}
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer shadow-sm"
                    >
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h4>
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{project.summary}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-1 text-[10px] font-medium">{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <footer className="pb-16 text-sm text-zinc-500">
                <p>Built with Next.js, Tailwind CSS, and Framer Motion.</p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
