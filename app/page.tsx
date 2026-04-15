"use client";

import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, Phone, Download, Moon, Sun, Monitor, ExternalLink, BookOpen, FileText, X } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Project Data Array for easy mapping and state management
const PROJECTS = [
  {
    id: "selex",
    title: "SELEX Simulator",
    summary: "Deep learning system for in-silico SELEX simulation. Designed a cross-attention predictor to model round-wise DNA sequence enrichment.",
    description: "In this project, we worked on the development of a deep learning system for in-silico SELEX simulation and prediction. Designed and implemented a cross-attention predictor to model round-wise DNA sequence enrichment, and currently building a generative framework using flow matching and neural ODEs to simulate the full enrichment trajectory. Responsibilities include constructing embedding pipelines, training conditional vector fields, and evaluating models for predictive accuracy and generative performance.",
    tags: ["Deep Learning", "Flow Matching"],
    links: { github: "#", pdf: "#" }
  },
  {
    id: "convex",
    title: "Convex Clustering",
    summary: "Explored techniques in Convex clustering literature, adapting ADMM for biclustering to simultaneously cluster samples and genes.",
    description: "Explored various techniques that are prevalent in the landscape of Convex clustering literature and methodologies commonly used by practitioners to deal with optimization problems, namely ADMM (Alternating Direction Method of Multipliers). Attempted to adapt to situations where clusters w.r.t. both rows and columns are of substance (biclustering), devising appropriate objective functions coupled with optimization subroutines.",
    tags: ["Optimization", "ADMM"],
    links: { github: "#", pdf: "#" }
  },
  {
    id: "bregman",
    title: "Bregman Divergences",
    summary: "Analyzed convergence rates of clustering algorithms under various optimization subroutines using different Bregman divergences.",
    description: "Explored various Bregman divergences such as Kullback-Leibler divergence, Euclidean distance, and studied how they affect the clustering ability of an algorithm to identify hidden structures without human intervention. Analyzed convergence rates under subroutines like Gradient Descent and ADAM to obtain asymptotic bounds.",
    tags: ["Clustering", "Math"],
    links: { github: "#", pdf: "#", publication: "#" }
  },
  {
    id: "rl",
    title: "RL & Evolutionary Algos",
    summary: "Implemented minimax, Q-learning, and MCTS on gym environments including tic-tac-toe, blackjack, and Atari games.",
    description: "Surveyed literature in these disciplines and how they intertwine. Implemented algorithms like minimax, Q-learning, MCTS, and deep learning inspired variants on simple environments like tic-tac-toe, blackjack, ludo, and several Atari environments.",
    tags: ["RL", "Python"],
    links: { github: "#" }
  }
];

export default function Portfolio() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  useEffect(() => setMounted(true), []);

  // Prevent background scrolling when project is expanded
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <div className="min-h-screen text-zinc-600 dark:text-zinc-400 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-200 transition-colors duration-300">
      
      {/* EXPANDED PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            // The overlay: Centers on mobile. On desktop, restricts to the right half.
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:left-1/2 lg:w-1/2 lg:p-12 cursor-pointer"
          >
            {/* Soft, glowing backdrop that fades to edges */}
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" 
                 style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }} 
            />

            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking card
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
                {selectedProject.links.publication && (
                  <a href={selectedProject.links.publication} className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <BookOpen className="w-4 h-4" /> Publication
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          
          {/* Left Sidebar */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <div className="flex flex-col items-start w-full">
                
                {/* Profile Pic & Theme Toggle Row */}
                <div className="flex w-full justify-between items-start mb-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-100 dark:bg-zinc-900"
                  >
                    <Image src="/profile.jpg" alt="Swagato Das" width={160} height={160} className="object-cover w-full h-full" />
                  </motion.div>

                  {/* The new 3-way toggle button with the glowing neon box-shadow */}
                  {mounted && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        boxShadow: resolvedTheme === 'dark' 
                          ? "0 0 10px rgba(0, 255, 255, 0.4), 0 0 20px rgba(255, 0, 255, 0.2)" 
                          : "0 0 10px rgba(255, 215, 0, 0.4), 0 0 20px rgba(255, 69, 0, 0.2)"  
                      }}
                      onClick={() => {
                        // Cycle: System -> Light -> Dark -> System
                        if (theme === 'system') setTheme('light');
                        else if (theme === 'light') setTheme('dark');
                        else setTheme('system');
                      }}
                      className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all z-50 shadow-md hover:shadow-lg"
                      aria-label="Toggle theme"
                      title={`Current theme: ${theme}`}
                    >
                      {theme === 'system' ? <Monitor className="w-5 h-5" /> : theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </motion.button>
                  )}
                </div>

                <div>
                  <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Swagato Das
                  </motion.h1>
                  <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 text-lg font-medium tracking-tight text-zinc-700 dark:text-zinc-200 sm:text-xl">
                    Master of Statistics Student @ ISI Kolkata
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 max-w-xs leading-normal">
                    A humble master's student at the Indian Statistical Institute. <br/><br/>
                    <span className="text-zinc-900 dark:text-zinc-200 font-medium">Research interests:</span> Deep Learning, Generative Models, Causal Inference, and Non-Parametric Clustering.
                  </motion.p>
                </div>
              </div>

              {/* Navigation / Contact */}
              <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex items-center gap-5">
                <li><a href="https://github.com/Swag-Pseudopy" target="_blank" rel="noreferrer" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><span className="sr-only">GitHub</span><Github className="h-6 w-6" /></a></li>
                <li><a href="https://linkedin.com/in/swagato-das" target="_blank" rel="noreferrer" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><span className="sr-only">LinkedIn</span><Linkedin className="h-6 w-6" /></a></li>
                <li><a href="mailto:swagato.isi2227@gmail.com" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><span className="sr-only">Email</span><Mail className="h-6 w-6" /></a></li>
                <li><a href="tel:+919749794322" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><span className="sr-only">Phone</span><Phone className="h-6 w-6" /></a></li>
              </motion.ul>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
                <a href="/Swagato_Das_CV.pdf" download className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 bg-zinc-100 border-zinc-200 hover:bg-zinc-200 dark:text-zinc-100 dark:bg-zinc-800/50 border dark:border-zinc-700/50 rounded-full dark:hover:bg-zinc-700/50 transition-colors">
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </motion.div>
            </div>
          </header>

          {/* Right Content */}
          <main className="pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-24">

            {/* Education */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Education</h3>
              <div className="space-y-8">
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">Jul 2025 &mdash; Present</header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Master of Statistics [M.Stat.]</h4>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Indian Statistical Institute, Kolkata</p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Aggregate Score - Ongoing</p>
                  </div>
                </div>
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">Aug 2022 &mdash; May 2025</header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Bachelor of Statistics [B.Stat.] (Honors)</h4>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Indian Statistical Institute, Kolkata</p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Aggregate Score - 75%</p>
                  </div>
                </div>
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">2021</header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">AISSCE (Class XII)</h4>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Hem Sheela Model School, Durgapur</p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Aggregate Score - 94.2%</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Relevant Coursework */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Relevant Coursework</h3>
              <p className="leading-relaxed text-sm">
                Causal Inference (Ongoing), Statistical Methods of Genetics, Parametric Inference, Nonparametric and Sequential Methods, Large Sample Statistical Methods (Ongoing), Design of Experiments, Linear Statistical Models, Decision Theory, Multivariate Analysis, Regression Techniques, Categorical Data Analysis, Sample Surveys, Molecular Biology (Elective), Introduction to Stochastic Processes, Applied Stochastic Processes, Introduction to Programming and Data Structures, Real Analysis (I-III), Probability Theory (I-III), Measure Theoretic Probability (Ongoing), Vector and Matrices (I-II), Numerical Analysis, Elements of Algebraic Structures, Discrete Mathematics, Differential Equation, Design and Analysis of Algorithms, Statistical Quality Control and Operations Research, Statistics Comprehensive, Metric Topology and Complex Analysis (Elective) (Ongoing), Optimization Techniques (Elective) (Ongoing), Algebra (Audit) (Ongoing).
              </p>
            </motion.section>

            {/* Experience */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Experience</h3>
              <div className="space-y-12">
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">May 2025 &mdash; Jul 2025</header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Research Intern &middot; TU Darmstadt, Germany</h4>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Self Organizing Systems Lab</p>
                    <ul className="mt-2 text-sm leading-normal list-disc list-inside space-y-1">
                      <li>Worked on the development of a deep learning system for in-silico SELEX simulation and prediction.</li>
                      <li>Designed and implemented a cross-attention predictor to model round-wise DNA sequence enrichment.</li>
                      <li>Building a generative framework using flow matching and neural ODEs to simulate the full enrichment trajectory.</li>
                      <li>Responsible for constructing embedding pipelines and training conditional vector fields.</li>
                    </ul>
                  </div>
                </div>
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">Jan 2025 &mdash; Mar 2025</header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Organizing Member &middot; ISI, Kolkata</h4>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Winter School on Deep Learning [WSDL]</p>
                    <ul className="mt-2 text-sm leading-normal list-disc list-inside space-y-1">
                      <li>Contributed to an intensive academic event aimed at providing self-motivated students with in-depth knowledge and exposure to cutting-edge research in Deep Learning.</li>
                    </ul>
                  </div>
                </div>
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">Aug 2022 &mdash; May 2025</header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Member &middot; ISI Maths Club</h4>
                    <p className="mt-2 text-sm leading-normal">
                      A small organization focusing on promoting interest and understanding in mathematics beyond the formal classroom setting.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Publications */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Publications</h3>
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">2025</header>
                <div className="z-10 sm:col-span-6">
                  <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">
                    Hyperbolic Fuzzy C-Means with Adaptive Weight-based Filtering for Efficient Clustering
                  </h4>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Accepted at ICVGIP 2025 (Oral and Poster)</p>
                  <p className="mt-2 text-sm leading-normal">
                    Introduced Filtration-based Hyperbolic Fuzzy C-Means (HypeFCM), a novel clustering algorithm tailored for better representation of data relationships in non-Euclidean spaces using the Poincaré Disc model.
                  </p>
                  
                  {/* Interactive Author Links */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href="https://swagato.vercel.app" className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Das S.</a>
                    <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 cursor-default">Pratihar A.</span>
                    <a href="#" className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Das S.</a>
                  </div>

                  {/* External Resource Links */}
                  <div className="mt-4 flex items-center gap-4">
                    <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors">
                      <ExternalLink className="w-4 h-4" /> arXiv
                    </a>
                    <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors">
                      <BookOpen className="w-4 h-4" /> Publisher
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Interests & Skills omitted for brevity in response, keep them exactly as they were in previous steps */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Interests</h3>
              <p className="leading-relaxed text-sm">
                Biostatistics, Causal Inference and Discovery, Bayesian Techniques, Statistical Learning, Non-Parametric Clustering techniques, Flow Matching, Diffusion Processes, LLMs, Deep Learning, Convex and Non-Convex Optimization Techniques, Convex Clustering, Evolutionary Algorithms, Reinforcement Learning, Information Theory, Graph Learning.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['R', 'Python', 'C', 'LaTeX', 'Java', 'Julia'].map((skill) => (
                      <span key={skill} className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['RStudio', 'Git/GitHub', 'WandB', 'VS Code', 'Google AppScripts', 'Jupyter Notebook', 'Google Colab'].map((skill) => (
                      <span key={skill} className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Projects */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Projects</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                
                {PROJECTS.map((project) => (
                  <motion.div 
                    layoutId={`project-card-${project.id}`}
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h4>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                        {project.summary}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-700 dark:text-zinc-300">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}

              </div>
            </motion.section>

            {/* Academic Achievements */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Academic Achievements</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-4">
                  <span className="text-zinc-500 font-mono shrink-0">ISI</span>
                  <span>Qualified for direct admission to M.Stat. program with a government funded stipend.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-zinc-500 font-mono shrink-0">ISI</span>
                  <span>Admitted for B.Stat.(Hons.) program with a government funded stipend.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-zinc-500 font-mono shrink-0">JEE</span>
                  <span>Ranked amongst top 0.1 percentile in Joint Entrance Examination - Mains amongst 1 Million candidates.</span>
                </li>
              </ul>
            </motion.section>

            {/* Languages & Hobbies */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Languages</h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><strong className="text-zinc-900 dark:text-zinc-200 font-medium">English:</strong> Full professional</li>
                  <li><strong className="text-zinc-900 dark:text-zinc-200 font-medium">Bengali:</strong> Native/bilingual</li>
                  <li><strong className="text-zinc-900 dark:text-zinc-200 font-medium">Hindi:</strong> Native/bilingual</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Hobbies</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Music, Table Tennis, Coding</p>
              </div>
            </motion.section>

            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-zinc-500 sm:pb-0">
              <p>Designed and built with <span className="text-zinc-700 dark:text-zinc-300">Next.js</span>, <span className="text-zinc-700 dark:text-zinc-300">Tailwind CSS</span>, and <span className="text-zinc-700 dark:text-zinc-300">Framer Motion</span>.</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
