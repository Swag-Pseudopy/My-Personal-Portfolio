"use client";

import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, // Swapped in for the CV viewing icon
  Moon, 
  Sun, 
  ExternalLink, 
  BookOpen, 
  X, 
  Zap,    
  Waves,
  GraduationCap // Added for Google Scholar
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ChaoticRibbonWave from "@/components/fluid-wave";

// --- DATA ARRAYS ---

const PUBLICATIONS = [
  {
    id: "hypefcm",
    year: "2025",
    title: "Hyperbolic Fuzzy C-Means with Adaptive Weight-based Filtering for Efficient Clustering",
    status: "Accepted at ICVGIP 2025 (Oral and Poster)",
    authors: ["Das S.", "Pratihar A.", "Das S."],
    summary: "Introduced Filtration-based Hyperbolic Fuzzy C-Means (HypeFCM), a novel clustering algorithm tailored for better representation of data relationships in non-Euclidean spaces using the Poincaré Disc model.",
    abstract: "Clustering algorithms play a pivotal role in unsupervised learning by identifying and grouping similar objects based on shared characteristics. Although traditional clustering techniques, such as hard and fuzzy center-based clustering, have been widely used, they struggle with complex, high-dimensional, and non-Euclidean datasets. In particular, the fuzzy C-Means (FCM) algorithm, despite its efficiency and popularity, exhibits notable limitations in non-Euclidean spaces. Euclidean spaces assume linear separability and uniform distance scaling, limiting their effectiveness in capturing complex, hierarchical, or non-Euclidean structures in fuzzy clustering. To overcome these challenges, we introduce Filtration-based Hyperbolic Fuzzy C-Means (HypeFCM), a novel clustering algorithm tailored for better representation of data relationships in non-Euclidean spaces. HypeFCM integrates the principles of fuzzy clustering with hyperbolic geometry and employs a weight-based filtering mechanism to improve performance. The algorithm initializes weights using a Dirichlet distribution and iteratively refines cluster centroids and membership assignments based on a hyperbolic metric in the Poincaré Disc model. Extensive experimental evaluations on 6 synthetic and 12 real-world datasets demonstrate that HypeFCM significantly outperforms conventional fuzzy clustering methods in non-Euclidean settings, underscoring its robustness and effectiveness.",
    links: { arxiv: "https://arxiv.org/pdf/2505.04335" }
  }
];

const FEATURED_PROJECTS = [
  {
    id: "selex",
    title: "SELEX Simulator with Generative Models",
    summary: "Deep learning system for in-silico SELEX simulation integrating bioinformatics and dynamic system learning.",
    guide: "Prof. Dr. Heinz Koeppl, Philipp Froehlich, Sebastian Wirth",
    description: "Worked on the development of a deep learning system for in-silico SELEX simulation and prediction. Designed and implemented a cross-attention predictor to model round-wise DNA sequence enrichment, and currently building a generative framework using flow matching and neural ODEs to simulate the full enrichment trajectory. Responsibilities include constructing embedding pipelines, training conditional vector fields, and evaluating models for predictive accuracy and generative performance.",
    tags: ["Deep Learning", "Flow Matching", "Neural ODEs"],
    links: { github: "#" }
  },
  {
    id: "convex",
    title: "Convex Clustering Methodologies",
    summary: "Explored Convex clustering and adapted ADMM for biclustering to simultaneously cluster samples and genes.",
    guide: "Prof. Swagatam Das, Dr. Saptarshi Chakraborty, Debolina Paul",
    description: "Explored various techniques prevalent in Convex clustering literature and methodologies commonly used by practitioners for optimization, namely ADMM (Alternating Direction Method of Multipliers). Attempted to adapt to situations where clusters w.r.t. both rows and columns are of substance (biclustering), devising appropriate objective functions coupled with optimization subroutines to reach meaningful clusters.",
    tags: ["Optimization", "ADMM", "Biclustering"],
    links: { github: "#" }
  },
  {
    id: "regression",
    title: "Advanced Regression Methodologies",
    summary: "Assessed various penalizations in regression to handle sparsity, multicollinearity, and model misspecification.",
    guide: "Prof. Kiranmoy Das",
    description: "Explored and assessed various kinds of penalizations prevalent in the literature of regression and how they affect the effectiveness of the model in terms of its ability in tactfully handling certain commonly observable traits in real-life data such as sparsity, multicollinearity, and model misspecification.",
    tags: ["Regression", "Penalization", "Statistical Modeling"],
    links: { github: "#" }
  },
  {
    id: "bregman",
    title: "Bregman Divergences & Clustering",
    summary: "Analyzed convergence rates of clustering algorithms under optimization subroutines using Bregman divergences.",
    guide: "Prof. Swagatam Das",
    description: "Explored various Bregman divergences such as Kullback-Leibler divergence and Euclidean distance, studying how they affect clustering ability to identify hidden structures without human intervention. Analyzed convergence rates under subroutines like Gradient Descent and ADAM to obtain asymptotic bounds, and explored convex formulations of such objectives.",
    tags: ["Clustering", "Math", "Optimization"],
    links: { github: "#" }
  },
  {
    id: "rl",
    title: "RL & Evolutionary Algorithms",
    summary: "Implemented minimax, Q-learning, MCTS, and deep learning variants on various gym environments.",
    guide: "Prof. Swagatam Das & Dr. Abhishek Sinha",
    description: "Surveyed literature in Reinforcement Learning, Evolutionary algorithms, and Online Optimization. Implemented algorithms like minimax, Q-learning, MCTS, and deep learning-inspired variants on environments like tic-tac-toe, blackjack, ludo, and several Atari games.",
    tags: ["RL", "Python", "MCTS"],
    links: { github: "#" }
  },
  {
    id: "spectral",
    title: "Spectral & Kernel Clustering",
    summary: "Developed DPMM-like approaches for optimal loss and hyperparameter insensitivity in Spectral and Kernel K-means.",
    guide: "Prof. Swagatam Das",
    description: "Studied algorithms like K-means, Power K-means, Kernel K-means, and Gaussian Mixture Models. Developed approaches that determine the required number of clusters using Dirichlet Process Mixture Model (DPMM)-like structures for optimal loss, detecting broader varieties of clusters beyond convex shapes, while remaining less sensitive to hyperparameters.",
    tags: ["Kernel Methods", "DPMM", "Clustering"],
    links: { github: "#" }
  }
];

const OTHER_PROJECTS = [
  {
    title: "Estimation of Intensity Parameter",
    date: "Apr 2024",
    guide: "Prof. Probal Chaudhuri",
    description: "Comparative study of PLUG-IN and LEAVE-ONE-OUT methods for estimating the intensity parameter, determining optimal moving window sizes for minimizing MSE."
  },
  {
    title: "Spectral Clustering Theory & Practice",
    date: "May 2023 — Sep 2023",
    guide: "Prof. Malay Bhattacharyya",
    description: "Reproduced traditional Spectral Clustering (Ng, Jordan, Weiss 2001) and explored eigen selection variants in spectral clustering."
  },
  {
    title: "Body Performance Analysis",
    date: "May 2023",
    guide: "Prof. Kiranmoy Das",
    description: "Exploratory data analysis using multiple linear regression and univariate quantile regression for prediction of missing values on Korean sports data."
  },
  {
    title: "Quantile Regression Applications",
    date: "Feb 2023",
    guide: "Prof. Kiranmoy Das",
    description: "Centered around the study and comparison of exposure groups on the distribution of outcomes using Quantile Regression methodologies."
  },
  {
    title: "Nitrogen Use Efficiency Analysis",
    date: "Dec 2022",
    guide: "Prof. Kiranmoy Das",
    description: "Bivariate exploratory analysis of Nitrogen Use Efficiency and Fertilizer Use in India vs. Cuba (1991-2014) to assess sustainable agriculture practices."
  },
  {
    title: "Russia GDP & Life Expectancy",
    date: "Nov 2022",
    guide: "Prof. Kiranmoy Das",
    description: "Exploratory data analysis tracking the variation of life expectancy and GDP per capita (PPP) in Russia over 7 decades (1951-2022)."
  }
];

// --- COMPONENT ---

export default function Portfolio() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Track open modals
  const [selectedProject, setSelectedProject] = useState<typeof FEATURED_PROJECTS[0] | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<typeof PUBLICATIONS[0] | null>(null);
  
  const [isNeon, setIsNeon] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock scroll when ANY modal is open
  useEffect(() => {
    if (selectedProject || selectedPublication) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject, selectedPublication]);

  const toggleAesthetic = () => {
    const newState = !isNeon;
    setIsNeon(newState);
    window.dispatchEvent(new CustomEvent("toggle-aesthetic", { detail: { isNeon: newState } }));
  };

  return (
    <div className="min-h-screen text-zinc-600 dark:text-zinc-400 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-200 transition-colors duration-300">
      
      <ChaoticRibbonWave />

      {/* FEATURED PROJECT MODAL */}
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
              
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 pr-12 mb-2">{selectedProject.title}</h3>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-4">Guide: {selectedProject.guide}</p>
              
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
                  <a href={selectedProject.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <Github className="w-4 h-4" /> View Repository
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PUBLICATION MODAL */}
      <AnimatePresence>
        {selectedPublication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPublication(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:left-1/2 lg:w-1/2 lg:p-12 cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" 
                 style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }} 
            />

            <motion.div
              layoutId={`pub-card-${selectedPublication.id}`}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden no-scrollbar rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/90 p-8 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 cursor-default"
            >
              <button 
                onClick={() => setSelectedPublication(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-12 mb-2">{selectedPublication.title}</h3>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-4">{selectedPublication.status}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPublication.authors.map((author, idx) => (
                  <span key={idx} className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">{author}</span>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-3">Abstract</h4>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                  {selectedPublication.abstract}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-auto border-t border-zinc-200 dark:border-zinc-800 pt-6">
                {selectedPublication.links.arxiv && (
                  <a href={selectedPublication.links.arxiv} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <ExternalLink className="w-4 h-4" /> Read on arXiv
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="relative mx-auto min-h-screen max-w-screen-xl">
        
        {/* Dynamic Glass Pane */}
        <div 
          className={`absolute inset-0 -z-10 transition-all duration-700 sm:border-x ${
            isNeon 
              ? "bg-white/70 dark:bg-black/70 backdrop-blur-[12px] border-zinc-200/50 dark:border-zinc-800/50" 
              : "bg-transparent backdrop-blur-none border-zinc-200/10 dark:border-zinc-800/10"
          }`}
        ></div>

        <div className="px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            
            {/* HEADER (Sticky Left Side) */}
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
                  <li><a href="https://github.com/Swag-Pseudopy" target="_blank" rel="noreferrer" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><Github className="h-6 w-6" /></a></li>
                  <li><a href="https://scholar.google.com/citations?user=Fr2FQ4IAAAAJ&hl=en" target="_blank" rel="noreferrer" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors" title="Google Scholar"><GraduationCap className="h-6 w-6" /></a></li>
                  <li><a href="https://linkedin.com/in/swagato-das" target="_blank" rel="noreferrer" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><Linkedin className="h-6 w-6" /></a></li>
                  <li><a href="mailto:swagato.isi2227@gmail.com" target="_blank" rel="noreferrer" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><Mail className="h-6 w-6" /></a></li>
                  {/* <li><a href="tel:+91XXXXXXXXXX" className="block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"><Phone className="h-6 w-6" /></a></li> */}
                </motion.ul>
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
                  {/* Changed 'download' attribute to target="_blank" so it opens in the browser */}
                  <a href="/Swagato_Das_Cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 bg-zinc-100 border-zinc-200 hover:bg-zinc-200 dark:text-zinc-100 dark:bg-zinc-800/50 border dark:border-zinc-700/50 rounded-full dark:hover:bg-zinc-700/50 transition-colors">
                    <FileText className="h-4 w-4" /> View CV
                  </a>
                </motion.div>
              </div>
            </header>

            {/* MAIN CONTENT (Right Side scrollable) */}
            <main className="pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-24">
              
              {/* EDUCATION */}
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Education</h3>
                <div className="group/list space-y-8">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">Jul 2025 &mdash; Present</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Master of Statistics [M.Stat.]</h4>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Indian Statistical Institute, Kolkata</p>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Aggregate Score - Ongoing</p>
                    </div>
                  </div>
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">Aug 2022 &mdash; May 2025</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Bachelor of Statistics [B.Stat.] (Honors)</h4>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Indian Statistical Institute, Kolkata</p>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Aggregate Score - 75%</p>
                    </div>
                  </div>
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">2021</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">AISSCE (Class XII)</h4>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Hem Sheela Model School, Durgapur</p>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Aggregate Score - 94.2%</p>
                    </div>
                  </div>
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">2019</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">AISSE (Class X)</h4>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Hem Sheela Model School, Durgapur</p>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Aggregate Score - 95%</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* EXPERIENCE */}
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Experience</h3>
                <div className="group/list space-y-12">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">May 2025 &mdash; Jul 2025</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Research Intern &middot; TU Darmstadt</h4>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Self Organizing Systems Lab</p>
                      <ul className="mt-2 text-sm leading-normal list-disc list-inside space-y-1">
                        <li>Worked on the development of a deep learning system for in-silico SELEX simulation and prediction.</li>
                        <li>Designed and implemented a cross-attention predictor to model round-wise DNA sequence enrichment.</li>
                        <li>Building a generative framework using flow matching and neural ODEs.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">Jan 2025 &mdash; Mar 2025</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">Organizing Member &middot; ISI, Kolkata</h4>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">Winter School on Deep Learning [WSDL]</p>
                      <p className="mt-2 text-sm leading-normal">
                        Contributed to an intensive academic event aimed at providing self-motivated students with in-depth knowledge and exposure to cutting-edge research in Deep Learning.
                      </p>
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

              {/* SKILLS */}
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
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-2">Tools & Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Linux/Bash', 'RStudio', 'Git', 'WandB', 'VS Code', 'Jupyter', 'Colab', 'Copilot', 'ChatGPT', 'Geogebra'].map((skill) => (
                        <span key={skill} className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* COURSEWORK & INTERESTS */}
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Coursework & Interests</h3>
                <p className="leading-relaxed text-sm mb-4">
                  <strong className="text-zinc-900 dark:text-zinc-200">Interests:</strong> Biostatistics, Causal Inference and Discovery, Bayesian Techniques, Statistical Learning, Non-Parametric Clustering techniques, Flow Matching, Diffusion Processes, LLMs, Deep Learning, Convex and Non-Convex Optimization Techniques.
                </p>
                <p className="leading-relaxed text-sm text-zinc-500 dark:text-zinc-500">
                  <strong className="text-zinc-700 dark:text-zinc-300">Select Courses:</strong> Causal Inference, Statistical Methods of Genetics, Parametric Inference, Nonparametric and Sequential Methods, Large Sample Statistical Methods, Design of Experiments, Linear Statistical Models, Decision Theory, Multivariate Analysis, Measure Theoretic Probability, Numerical Analysis.
                </p>
              </motion.section>

              {/* PUBLICATIONS */}
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Publications</h3>
                <div className="group/list space-y-10">
                  {PUBLICATIONS.map((pub) => (
                    <div 
                      key={pub.id}
                      onClick={() => setSelectedPublication(pub)}
                      className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 cursor-pointer"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">{pub.year}</header>
                      <div className="z-10 sm:col-span-6">
                        <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">
                          {pub.title}
                        </h4>
                        <p className="mt-1 text-sm text-sky-600 dark:text-sky-500 font-medium">{pub.status}</p>
                        <p className="mt-2 text-sm leading-normal text-zinc-600 dark:text-zinc-400">
                          {pub.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {pub.authors.map((author, idx) => (
                            <span key={idx} className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">
                              {author}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* PROJECTS GRID */}
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Featured Projects</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {FEATURED_PROJECTS.map((project) => (
                    <motion.div 
                      layoutId={`project-card-${project.id}`}
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h4>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{project.summary}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-700 dark:text-zinc-300">{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* ACADEMIC & READING PROJECTS */}
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Academic & Exploratory Projects</h3>
                <div className="group/list space-y-10">
                  {OTHER_PROJECTS.map((project, idx) => (
                    <div key={idx} className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-100/50 dark:lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(228,228,231,0.5)] dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">{project.date}</header>
                      <div className="z-10 sm:col-span-6">
                        <h4 className="font-medium leading-snug text-zinc-900 dark:text-zinc-200">{project.title}</h4>
                        <p className="mt-1 text-sm text-sky-600 dark:text-sky-500 font-medium">Guide: {project.guide}</p>
                        <p className="mt-2 text-sm leading-normal text-zinc-600 dark:text-zinc-400">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* ACHIEVEMENTS & EXTRAS */}
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Achievements</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3 items-start">
                      <span className="text-sky-500 font-bold mt-0.5">›</span>
                      <span>Qualified for direct admission to M.Stat. program (ISI).</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-sky-500 font-bold mt-0.5">›</span>
                      <span>Top 0.1 percentile in JEE Mains (1M+ candidates).</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Languages & Hobbies</h3>
                  <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    <li><strong className="text-zinc-900 dark:text-zinc-200">English:</strong> Professional</li>
                    <li><strong className="text-zinc-900 dark:text-zinc-200">Bengali / Hindi:</strong> Native</li>
                  </ul>
                  <p className="text-sm text-zinc-500">Music, Table Tennis, Coding</p>
                </div>
              </motion.section>

              <footer className="pb-16 text-sm text-zinc-500 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-8 mt-8">
                <p>Built with Next.js, Tailwind CSS, and Framer Motion.</p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
