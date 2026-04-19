"use client";

import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText,
  Moon, 
  Sun, 
  ExternalLink, 
  BookOpen, 
  X, 
  Zap,    
  Waves,
  GraduationCap
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
    links: { github: "https://github.com/Swag-Pseudopy" }
  },
  {
    id: "convex",
    title: "Convex Clustering Methodologies",
    summary: "Explored Convex clustering and adapted ADMM for biclustering to simultaneously cluster samples and genes.",
    guide: "Prof. Swagatam Das, Dr. Saptarshi Chakraborty, Debolina Paul",
    description: "Explored various techniques prevalent in Convex clustering literature and methodologies commonly used by practitioners for optimization, namely ADMM (Alternating Direction Method of Multipliers). Attempted to adapt to situations where clusters w.r.t. both rows and columns are of substance (biclustering), devising appropriate objective functions coupled with optimization subroutines to reach meaningful clusters.",
    tags: ["Optimization", "ADMM", "Biclustering"],
    links: { github: "https://github.com/Swag-Pseudopy" }
  },
  {
    id: "regression",
    title: "Advanced Regression Methodologies",
    summary: "Assessed various penalizations in regression to handle sparsity, multicollinearity, and model misspecification.",
    guide: "Prof. Kiranmoy Das",
    description: "Explored and assessed various kinds of penalizations prevalent in the literature of regression and how they affect the effectiveness of the model in terms of its ability in tactfully handling certain commonly observable traits in real-life data such as sparsity, multicollinearity, and model misspecification.",
    tags: ["Regression", "Penalization", "Statistical Modeling"],
    links: { github: "https://github.com/Swag-Pseudopy" }
  },
  {
    id: "bregman",
    title: "Bregman Divergences & Clustering",
    summary: "Analyzed convergence rates of clustering algorithms under optimization subroutines using Bregman divergences.",
    guide: "Prof. Swagatam Das",
    description: "Explored various Bregman divergences such as Kullback-Leibler divergence and Euclidean distance, studying how they affect clustering ability to identify hidden structures without human intervention. Analyzed convergence rates under subroutines like Gradient Descent and ADAM to obtain asymptotic bounds.",
    tags: ["Clustering", "Math", "Optimization"],
    links: { github: "https://github.com/Swag-Pseudopy" }
  },
  {
    id: "rl",
    title: "RL & Evolutionary Algorithms",
    summary: "Implemented minimax, Q-learning, MCTS, and deep learning variants on various gym environments.",
    guide: "Prof. Swagatam Das & Dr. Abhishek Sinha",
    description: "Surveyed literature in Reinforcement Learning, Evolutionary algorithms, and Online Optimization. Implemented algorithms like minimax, Q-learning, MCTS, and deep learning-inspired variants on environments like tic-tac-toe, blackjack, ludo, and several Atari games.",
    tags: ["RL", "Python", "MCTS"],
    links: { github: "https://github.com/Swag-Pseudopy" }
  },
  {
    id: "spectral",
    title: "Spectral & Kernel Clustering",
    summary: "Developed DPMM-like approaches for optimal loss and hyperparameter insensitivity in Spectral and Kernel K-means.",
    guide: "Prof. Swagatam Das",
    description: "Studied algorithms like K-means, Power K-means, Kernel K-means, and Gaussian Mixture Models. Developed approaches that determine the required number of clusters using Dirichlet Process Mixture Model (DPMM)-like structures for optimal loss, detecting broader varieties of clusters beyond convex shapes.",
    tags: ["Kernel Methods", "DPMM", "Clustering"],
    links: { github: "https://github.com/Swag-Pseudopy" }
  }
];

const OTHER_PROJECTS = [
  {
    title: "Estimation of Intensity Parameter",
    date: "Apr 2024",
    guide: "Prof. Probal Chaudhuri",
    description: "Comparative study of PLUG-IN and LEAVE-ONE-OUT methods for estimating the intensity parameter in non-parametric density estimation."
  },
  {
    title: "Spectral Clustering Theory & Practice",
    date: "May 2023 — Sep 2023",
    guide: "Prof. Malay Bhattacharyya",
    description: "Reproduced traditional Spectral Clustering algorithms and explored eigen selection variants for improved performance."
  },
  {
    title: "Body Performance Analysis",
    date: "May 2023",
    guide: "Prof. Kiranmoy Das",
    description: "Exploratory analysis using multiple linear regression and univariate quantile regression on Korean body performance data."
  },
  {
    title: "Nitrogen Use Efficiency Analysis",
    date: "Dec 2022",
    guide: "Prof. Kiranmoy Das",
    description: "Bivariate analysis of Nitrogen Use Efficiency for India and Cuba, researching sustainable agriculture transitions."
  }
];

// --- COMPONENT ---

export default function Portfolio() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState<typeof FEATURED_PROJECTS[0] | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<typeof PUBLICATIONS[0] | null>(null);
  
  const [isNeon, setIsNeon] = useState(false);

  useEffect(() => setMounted(true), []);

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

  const handleThemeToggle = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }
    document.startViewTransition(() => setTheme(nextTheme));
  };

  return (
    <div className="min-h-screen text-zinc-600 dark:text-zinc-400 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-200 transition-colors duration-300">
      
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
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{selectedProject.title}</h3>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-6">Guide: {selectedProject.guide}</p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-4 mt-auto border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <a href={selectedProject.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-sky-500 transition-colors">
                  <Github className="w-4 h-4" /> View Repository
                </a>
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
              <button onClick={() => setSelectedPublication(null)} className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{selectedPublication.title}</h3>
              <p className="text-sm font-medium text-sky-600 mb-6">{selectedPublication.status}</p>
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-3">Abstract</h4>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">{selectedPublication.abstract}</p>
              </div>
              <div className="flex flex-wrap gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <a href={selectedPublication.links.arxiv} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-sky-500 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Read on arXiv
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto min-h-screen max-w-screen-xl">
        <div className={`absolute inset-0 -z-10 transition-all duration-1000 sm:border-x ${isNeon ? "bg-white/70 dark:bg-black/70 backdrop-blur-[12px] border-zinc-200/50 dark:border-zinc-800/50" : "bg-transparent backdrop-blur-none border-zinc-200/10 dark:border-zinc-800/10"}`}></div>

        <div className="px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <div>
                <div className="flex w-full justify-between items-start mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shrink-0">
                    <Image src="/profile.jpg" alt="Swagato Das" width={160} height={160} className="object-cover w-full h-full" />
                  </motion.div>
                  <div className="flex gap-3 z-50">
                    {mounted && (
                      <motion.button onClick={toggleAesthetic} className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-md">
                        {isNeon ? <Zap className="w-5 h-5 text-sky-500 fill-sky-500/20" /> : <Waves className="w-5 h-5" />}
                      </motion.button>
                    )}
                    {mounted && (
                      <motion.button onClick={handleThemeToggle} className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-md">
                        {resolvedTheme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      </motion.button>
                    )}
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">Swagato Das</h1>
                  <h2 className="mt-3 text-lg font-medium text-zinc-700 dark:text-zinc-200 sm:text-xl">Master of Statistics @ ISI Kolkata</h2>
                  <p className="mt-4 max-w-xs leading-normal">Focusing on Deep Learning, Generative Models, and Causal Inference.</p>
                </div>
                <ul className="mt-8 flex items-center gap-5">
                  <li><a href="https://github.com/Swag-Pseudopy" target="_blank" rel="noreferrer"><Github className="h-6 w-6" /></a></li>
                  <li><a href="https://scholar.google.com/" target="_blank" rel="noreferrer"><GraduationCap className="h-6 w-6" /></a></li>
                  <li><a href="https://linkedin.com/in/swagato-das" target="_blank" rel="noreferrer"><Linkedin className="h-6 w-6" /></a></li>
                  <li><a href="mailto:swagato.isi2227@gmail.com"><Mail className="h-6 w-6" /></a></li>
                  {/* <Phone number commented out safely /> */}
                </ul>
                <div className="mt-8">
                  <a href="/Swagato_Das_Cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 border rounded-full">
                    <FileText className="h-4 w-4" /> View CV
                  </a>
                </div>
              </div>
            </header>

            <main className="pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-24">
              
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Education</h3>
                <div className="group/list space-y-8">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8">
                    <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono">Jul 2025 — Present</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-200">Master of Statistics [M.Stat.]</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-500">Indian Statistical Institute, Kolkata</p>
                    </div>
                  </div>
                  <div className="group relative grid pb-1 sm:grid-cols-8 sm:gap-8">
                    <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono">Aug 2022 — May 2025</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-200">Bachelor of Statistics [B.Stat.] (Honors)</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-500">Indian Statistical Institute, Kolkata</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Experience</h3>
                <div className="group/list space-y-12">
                  <div className="group relative grid pb-1 sm:grid-cols-8 sm:gap-8">
                    <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono">May 2025 — Jul 2025</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-200">Research Intern · TU Darmstadt</h4>
                      <ul className="mt-2 text-sm leading-normal list-disc list-inside">
                        <li>Worked on deep learning systems for SELEX simulation and prediction.</li>
                        <li>Designed cross-attention predictors for DNA sequence enrichment.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Skills & Coursework</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-2">Technical Toolkit</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Linux/Bash', 'R', 'Python', 'C', 'RStudio', 'Git', 'WandB', 'VS Code', 'Jupyter', 'ChatGPT'].map((s) => (
                        <span key={s} className="rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic border-l-2 border-sky-500/20 pl-4">
                    Coursework: Causal Inference, Statistical Methods of Genetics, Parametric Inference, Design of Experiments, Linear Statistical Models, Multivariate Analysis, Measure Theoretic Probability.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Publications</h3>
                <div className="group/list space-y-10">
                  {PUBLICATIONS.map((pub) => (
                    <div key={pub.id} onClick={() => setSelectedPublication(pub)} className="group relative grid sm:grid-cols-8 sm:gap-8 cursor-pointer">
                      <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono">{pub.year}</header>
                      <div className="z-10 sm:col-span-6">
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-200">{pub.title}</h4>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {pub.authors.map((a, i) => <span key={i} className="rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs">{a}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Featured Projects</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {FEATURED_PROJECTS.map((p) => (
                    <div key={p.id} onClick={() => setSelectedProject(p)} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 cursor-pointer shadow-sm">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{p.title}</h4>
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{p.summary}</p>
                    </div>
                  ))}
                </div>
              </section>

              <footer className="pb-16 text-sm text-zinc-500 border-t pt-8 mt-8">
                <p>Built with Next.js, Tailwind CSS, and Framer Motion.</p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
