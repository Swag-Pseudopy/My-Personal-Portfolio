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
  X, 
  Zap,    
  Waves,
  GraduationCap
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ChaoticRibbonWave from "@/components/fluid-wave";

// --- FULL UNTRIMMED DATA ARRAYS ---

const EXPERIENCE = [
  {
    id: "tu-darmstadt",
    date: "May 2025 — Jul 2025",
    title: "Research Intern",
    location: "TU Darmstadt, Germany",
    group: "Self Organizing Systems Lab",
    summary: "Worked on the development of deep learning systems and generative frameworks for in-silico SELEX simulation.",
    details: [
      "Worked on the development of a deep learning system for in-silico SELEX simulation and prediction.",
      "Designed and implemented a cross-attention predictor to model round-wise DNA sequence enrichment.",
      "Building a generative framework using flow matching and neural ODEs to simulate the full enrichment trajectory.",
      "Responsible for constructing embedding pipelines and training conditional vector fields. Evaluating models for predictive accuracy and generative performance.",
      "Work integrates bioinformatics, generative modeling, and dynamic system learning."
    ]
  },
  {
    id: "wsdl",
    date: "Jan 2025 — Mar 2025",
    title: "Organizing Member",
    location: "ISI, Kolkata",
    group: "Winter School on Deep Learning [WSDL]",
    summary: "Contributed to an intensive academic event aimed at exposing students to cutting-edge research in Deep Learning.",
    details: [
      "Contributed to an intensive academic event aimed at providing self-motivated students with in-depth knowledge and exposure to cutting-edge research in Deep Learning.",
      "Organized by the Electronics and Communication Sciences Unit at the Indian Statistical Institute, Kolkata.",
      "The school featured hands-on courses focused on applying state-of-the-art deep learning techniques to real-world problems.",
      "Covered essential theoretical foundations, including core mathematical concepts and programming skills, fostering a comprehensive understanding of the field."
    ]
  },
  {
    id: "maths-club",
    date: "Aug 2022 — May 2025",
    title: "Member",
    location: "ISI, Kolkata",
    group: "ISI Maths Club",
    summary: "Promoted interest and understanding in mathematics beyond the formal classroom setting.",
    details: [
      "A small organization focusing on promoting interest and understanding in mathematics beyond the formal classroom setting.",
      "Run and managed by mathematics enthusiasts at Indian Statistical Institute, Kolkata."
    ]
  }
];

const PUBLICATIONS = [
  {
    id: "hypefcm",
    year: "2025",
    title: "Hyperbolic Fuzzy C-Means with Adaptive Weight-based Filtering for Efficient Clustering",
    status: "Accepted at the ICVGIP, 2025 in Oral and Poster category",
    authors: ["Das S.", "Pratihar A.", "Das S."],
    summary: "Introduced Filtration-based Hyperbolic Fuzzy C-Means (HypeFCM), a novel clustering algorithm tailored for better representation of data relationships in non-Euclidean spaces.",
    abstract: "Clustering algorithms play a pivotal role in unsupervised learning by identifying and grouping similar objects based on shared characteristics. Although traditional clustering techniques, such as hard and fuzzy center-based clustering, have been widely used, they struggle with complex, high-dimensional, and non-Euclidean datasets. In particular, the fuzzy C-Means (FCM) algorithm, despite its efficiency and popularity, exhibits notable limitations in non-Euclidean spaces. Euclidean spaces assume linear separability and uniform distance scaling, limiting their effectiveness in capturing complex, hierarchical, or non-Euclidean structures in fuzzy clustering. To overcome these challenges, we introduce Filtration-based Hyperbolic Fuzzy C-Means (HypeFCM), a novel clustering algorithm tailored for better representation of data relationships in non-Euclidean spaces. HypeFCM integrates the principles of fuzzy clustering with hyperbolic geometry and employs a weight-based filtering mechanism to improve performance. The algorithm initializes weights using a Dirichlet distribution and iteratively refines cluster centroids and membership assignments based on a hyperbolic metric in the Poincaré Disc model. Extensive experimental evaluations on 6 synthetic and 12 real-world datasets demonstrate that HypeFCM significantly outperforms conventional fuzzy clustering methods in non-Euclidean settings, underscoring its robustness and effectiveness.",
    links: { arxiv: "https://arxiv.org/pdf/2505.04335" }
  }
];

const ALL_PROJECTS = [
  {
    id: "selex",
    title: "Investigating Virtual Evolution: SELEX Simulator with Generative Models",
    location: "TU Darmstadt, Germany",
    date: "May, 2025 — October, 2025",
    guide: "Prof. Dr. Heinz Koeppl, Philipp Froehlich, Sebastian Wirth",
    description: "In this project, we worked on the development of a deep learning system for in-silico SELEX simulation and prediction. Designed and implemented a cross-attention predictor to model round-wise DNA sequence enrichment, and currently building a generative framework using flow matching and neural ODEs to simulate the full enrichment trajectory. Responsibilities include constructing embedding pipelines, training conditional vector fields, and evaluating models for predictive accuracy and generative performance. The work integrates bioinformatics, generative modeling, and dynamic system learning."
  },
  {
    id: "convex",
    title: "Convex Clustering methodologies",
    location: "ISI, Kolkata",
    date: "January, 2025 — May, 2025",
    guide: "Prof. Swagatam Das jointly with Dr. Saptarshi Chakraborty [University of Michigan] and Debolina Paul [PhD, Oxford University]",
    description: "In this project, We ventured through and explored various techniques that are prevalent in the landscape of the Convex clustering literature and various methodologies that commonly are used by practitioners to deal with the sort of optimization problems these usually transform into, namely ADMM (Alternating Direction Method of Multipliers), and using these we were attempting to adapt to situations where clusters w.r.t. both the rows and columns are of substance, a.k.a. biclustering, hence, devising an appropriate objective function(s) coupled with appropriate optimization subroutines to reach to meaningful clusters, for instance, clustering a group of samples and along with that a group of genes simultaneously and so on."
  },
  {
    id: "regression",
    title: "Various Regression methodologies",
    location: "ISI, Kolkata",
    date: "August, 2024 — May, 2025",
    guide: "Prof. Kiranmoy Das",
    description: "In this project, We have explored and assessed various kinds of penalizations prevalent in the literature of regression and how they affect the effectiveness of the model in terms of it's ability in tactfully handling certain commonly observable traits in real life data and otherwise like sparsity, Multicollinearity and Model Misspecification."
  },
  {
    id: "bregman",
    title: "Various Bregman Divergences and clustering based on those divergences",
    location: "ISI, Kolkata",
    date: "October, 2024 — February, 2025",
    guide: "Prof. Swagatam Das",
    description: "In this project, We have explored various Bregman divergences such as the Kullback Leibler divergence, euclidean distance and so on, and studied how they affect the clustering ability of an algorithm and how they are able to identify hidden structures or patterns in data without any human intervention or supervision. We also tried to analyse their convergence rates under various optimization subroutines like Gradient descent, ADAM and so on and hence obtain some asymptotic bounds on these rates along with which we also explored various convex formulations of such objectives and tried to observe how they influence each other."
  },
  {
    id: "rl",
    title: "On Reinforcement Learning, Evolutionary algorithms and Online Optimization Techniques",
    location: "ISI, Kolkata",
    date: "January, 2024 — September, 2024",
    guide: "Prof. Swagatam Das jointly with Dr. Abhishek Sinha [TIFR, Mumbai]",
    description: "This Project is mostly about surveying literature in these disciplines and how these disciplines have intertwined and gave rise to the techniques commonly used. In this project, I implemented algorithms like minimax, Q-learning, MCTS and a few other variants of it including a few inspired from deep learning methodologies on a few simple environments gym environments like tic tac toe, blackjack, ludo and a few more atari environments."
  },
  {
    id: "plugin",
    title: "On the performance of PLUG-IN Method and LEAVE-ONE-OUT Method in construction of an estimate of the intensity parameter",
    location: "ISI, Kolkata",
    date: "April, 2024",
    guide: "Prof. Probal Chaudhuri",
    description: "This class project mainly focused on a comparative study of the PLUG-IN and the LEAVE-ONE-OUT Methods which are used quite often in estimation of the intensity parameter where, we want to obtain an estimate for µ(.) from the sample at hand, starting with a consistent estimate of the density(given, it exists), we construct a point-wise local average estimate of the parameter by considering a δ-neighborhood around the desired t. These methods intervene to determine the optimal size of the moving window for which the MSE of the estimate is in a reasonable vicinity of the Global minima(if exists) of the MSE over all the δs."
  },
  {
    id: "spectral",
    title: "Exploring Spectral Clustering, Kernel based methods for clustering like kernel power K-means and Dirichlet Process Mixture Models",
    location: "ISI, Kolkata",
    date: "August, 2023 — December, 2023",
    guide: "Prof. Swagatam Das",
    description: "This project is primarily centered around studying algorithms like K-means, Power K-means, Kernel K-means, Gaussian Mixture Models, where while initializing we need to state the number of clusters, and developing it into one where it itself determines the required number of clusters using Dirichlet Process Mixture Model like approach for optimal Loss, detects a broader variety of cluster instead of only the \"convex\" ones like in Spectral clustering like algorithms and is less sensitive to the hyperparameters."
  },
  {
    id: "spectral_reading",
    title: "Reading Project on Spectral Clustering and it's variants",
    location: "ISI, Kolkata",
    date: "May, 2023 — September, 2023",
    guide: "Prof. Malay Bhattacharyya",
    description: "This project is mainly focused on studying and reproducing the traditional Spectral Clustering Algorithm as was suggested by Andrew Y. Ng, Micheal I. Jordan and Yair Weiss in their paper published on 2001 'On Spectral Clustering: Analysis and an algorithm.' and a few variants of it namely, the one stated in the paper 'Eigen Selection in Spectral Clustering: A theory-Guided Practice' by Xiao Han, Xin Tong and Yingying Fan(accepted on April 2021)."
  },
  {
    id: "body_perf",
    title: "Body Performance Analysis",
    location: "ISI, Kolkata",
    date: "May, 2023",
    guide: "Prof. Kiranmoy Das",
    description: "This project is all about exploratory data analysis using multiple linear regression, univariate quantile regression and simulations of multiple variables for prediction of missing values on body performance data from a Korean sports promotion foundation."
  },
  {
    id: "quantile",
    title: "Reading Project on Quantile Regression and Its Applications",
    location: "ISI, Kolkata",
    date: "February, 2023",
    guide: "Prof. Kiranmoy Das",
    description: "This project is centered around study and comparison of exposure groups on the distribution of an outcome."
  },
  {
    id: "nitrogen",
    title: "Bivariate Analysis of Nitrogen Use Efficiency and Nitrogen Fertilizer Use per hectare of cropland for India and Cuba between 1991-2014",
    location: "ISI, Kolkata",
    date: "December, 2022",
    guide: "Prof. Kiranmoy Das",
    description: "This project is an exploratory analysis of Nitrogen Use Efficiency and Nitrogen Fertilizer Use per hectare of cropland and a quest for whether it is possible to cut down on the amount nitrogenous fertilisers used in agriculture without affecting the yield. This analysis provides us an assessment of the Cuban system of Organopónicos, and a vision for moving Indian agriculture towards sustainability."
  },
  {
    id: "russia_gdp",
    title: "Exploratory Data Analysis on Life Expectancy and GDP per capita of Russia, 1951-2022",
    location: "ISI, Kolkata",
    date: "November, 2022",
    guide: "Prof. Kiranmoy Das",
    description: "This project is a preliminary analysis of how the life expectancy (in years) and the GDP per capita (in international dollars, fixed 2017 prices, PPP based on 2017 ICP) has been varying over the past 7 decades in Russia."
  }
];

export default function Portfolio() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Modal states
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[0] | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<typeof PUBLICATIONS[0] | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<typeof EXPERIENCE[0] | null>(null);
  const [isCourseworkOpen, setIsCourseworkOpen] = useState(false);
  
  const [isNeon, setIsNeon] = useState(false);

  useEffect(() => setMounted(true), []);

  // Global scroll lock for all modals
  useEffect(() => {
    if (selectedProject || selectedPublication || selectedExperience || isCourseworkOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject, selectedPublication, selectedExperience, isCourseworkOpen]);

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

      {/* --- MODALS --- */}
      
      {/* 1. PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:left-1/2 lg:w-1/2 lg:p-12 cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }} />
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden no-scrollbar rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/90 p-8 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 cursor-default"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pr-8 mb-2">{selectedProject.title}</h3>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-1">{selectedProject.location} | {selectedProject.date}</p>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6">Guide: {selectedProject.guide}</p>
              
              <div className="mb-2 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-3">Overview</h4>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PUBLICATION MODAL */}
      <AnimatePresence>
        {selectedPublication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPublication(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:left-1/2 lg:w-1/2 lg:p-12 cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }} />
            <motion.div
              layoutId={`pub-card-${selectedPublication.id}`}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden no-scrollbar rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/90 p-8 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 cursor-default"
            >
              <button onClick={() => setSelectedPublication(null)} className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pr-8 mb-2">{selectedPublication.title}</h3>
              <p className="text-sm font-medium text-sky-600 mb-6">{selectedPublication.status}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPublication.authors.map((author, idx) => (
                  <span key={idx} className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">{author}</span>
                ))}
              </div>

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

      {/* 3. EXPERIENCE MODAL */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExperience(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:left-1/2 lg:w-1/2 lg:p-12 cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }} />
            <motion.div
              layoutId={`exp-card-${selectedExperience.id}`}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden no-scrollbar rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/90 p-8 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 cursor-default"
            >
              <button onClick={() => setSelectedExperience(null)} className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-8 mb-2">{selectedExperience.title}</h3>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-500 mb-1">{selectedExperience.group} · {selectedExperience.location}</p>
              <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-6">{selectedExperience.date}</p>
              
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-4">Responsibilities & Details</h4>
                <ul className="space-y-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 list-disc list-inside">
                  {selectedExperience.details.map((detail, idx) => (
                    <li key={idx} className="text-justify">{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. COURSEWORK MODAL */}
      <AnimatePresence>
        {isCourseworkOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCourseworkOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:left-1/2 lg:w-1/2 lg:p-12 cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)' }} />
            <motion.div
              layoutId="coursework-card"
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden no-scrollbar rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/90 p-8 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 cursor-default"
            >
              <button onClick={() => setIsCourseworkOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pr-8 mb-6">List of all courseworks</h3>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                Causal Inference (Ongoing), Statistical Methods of Genetics, Parametric Inference, Nonparametric and Sequential Methods, Large Sample Statistical Methods (Ongoing), Design of Experiments, Linear Statistical Models, Decision Theory, Multivariate Analysis, Regression Techniques, Categorical Data Analysis, Sample Surveys, Molecular Biology (Elective), Introduction to Stochastic Processes, Applied Stochastic Processes, Introduction to Programming and Data Structures, Real Analysis (I-III), Probability Theory (I-III), Measure Theoretic Probability (Ongoing), Vector and Matrices (I-II), Numerical Analysis, Elements of Algebraic Structures, Discrete Mathematics, Differential Equation, Design and Analysis of Algorithms, Statistical Quality Control and Operations Research, Statistics Comprehensive, Metric Topology and Complex Analysis (Elective) (Ongoing), Optimization Techniques (Elective) (Ongoing), Algebra (Audit) (Ongoing).
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- MAIN PAGE CONTENT --- */}
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
                </ul>
                <div className="mt-8">
                  <a href="/Swagato_Das_Cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 border rounded-full">
                    <FileText className="h-4 w-4" /> View CV
                  </a>
                </div>
              </div>
            </header>

            <main className="pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-20">
              
              {/* 1. EDUCATION */}
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Education</h3>
                <div className="group/list space-y-8">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8">
                    <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono">Jul 2025 — Present</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-200">Master of Statistics [M.Stat.]</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-500">Indian Statistical Institute, Kolkata</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Aggregate Score - Ongoing</p>
                    </div>
                  </div>
                  <div className="group relative grid pb-1 sm:grid-cols-8 sm:gap-8">
                    <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono">Aug 2022 — May 2025</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-200">Bachelor of Statistics [B.Stat.] (Honors)</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-500">Indian Statistical Institute, Kolkata</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Aggregate Score - 75%</p>
                    </div>
                  </div>
                  <div className="group relative grid pb-1 sm:grid-cols-8 sm:gap-8">
                    <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono">2021</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-200">AISSCE (Class XII)</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-500">Hem Sheela Model School, Durgapur</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Aggregate Score - 94.2%</p>
                    </div>
                  </div>
                  <div className="group relative grid pb-1 sm:grid-cols-8 sm:gap-8">
                    <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono">2019</header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-200">AISSE (Class X)</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-500">Hem Sheela Model School, Durgapur</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Aggregate Score - 95%</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. INTERESTS */}
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Interests</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                  Biostatistics, Causal Inference and Discovery, Bayesian Techniques, Statistical Learning, Non-Parametric Clustering techniques, Flow Matching, Diffusion Processes, LLMs, Deep Learning, Convex and Non-Convex Optimization Techniques, Convex Clustering, Evolutionary Algorithms, Reinforcement Learning, Information Theory, Graph Learning.
                </p>
              </section>

              {/* 3. PUBLICATIONS */}
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Publications, Pre-Prints and Under Review Articles</h3>
                <div className="group/list space-y-10">
                  {PUBLICATIONS.map((pub) => (
                    <motion.div 
                      layoutId={`pub-card-${pub.id}`}
                      key={pub.id} 
                      onClick={() => setSelectedPublication(pub)} 
                      className="group relative grid sm:grid-cols-8 sm:gap-8 p-4 -mx-4 rounded-2xl cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                    >
                      <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono mt-1">{pub.year}</header>
                      <div className="z-10 sm:col-span-6">
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-200 leading-snug">{pub.title}</h4>
                        <p className="mt-1 text-sm font-medium text-sky-600 dark:text-sky-500">{pub.status}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {pub.authors.map((a, i) => <span key={i} className="rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">{a}</span>)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 4. EXPERIENCE (INTERACTIVE) */}
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Experience</h3>
                <div className="group/list space-y-6">
                  {EXPERIENCE.map((exp) => (
                    <motion.div 
                      layoutId={`exp-card-${exp.id}`}
                      key={exp.id} 
                      onClick={() => setSelectedExperience(exp)}
                      className="group relative grid pb-4 pt-4 sm:grid-cols-8 sm:gap-8 rounded-2xl p-4 -mx-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 cursor-pointer"
                    >
                      <header className="z-10 text-xs uppercase text-zinc-500 sm:col-span-2 font-mono mt-1">{exp.date}</header>
                      <div className="z-10 sm:col-span-6">
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-200">{exp.title} · {exp.location}</h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-500 mt-1">{exp.group}</p>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                          {exp.summary}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 5. RELEVANT COURSEWORK (INTERACTIVE) */}
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Relevant Coursework</h3>
                <motion.div 
                  layoutId="coursework-card"
                  onClick={() => setIsCourseworkOpen(true)}
                  className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 cursor-pointer shadow-sm hover:shadow-md transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                    Causal Inference (Ongoing), Optimization Techniques, Metric Topology and Complex Analysis, Measure Theoretic Probability, Nonparametric and Sequential Methods, Large Sample Statistical Methods... <br/><br/>
                    <span className="text-sky-600 dark:text-sky-500 font-medium group-hover:text-sky-500 transition-colors">Click to expand and view the full academic list &rarr;</span>
                  </p>
                </motion.div>
              </section>

              {/* 6. SKILLS */}
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Skills</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {['R', 'Python', 'C', 'LaTeX', 'Java', 'Julia'].map((skill) => (
                        <span key={skill} className="rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-2">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Linux/Bash', 'RStudio', 'Git/GitHub', 'WandB', 'VS Code', 'Google AppScripts', 'Jupyter Notebook', 'Google Colab', 'Microsoft Copilot', 'ChatGPT', 'Geogebra'].map((skill) => (
                        <span key={skill} className="rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 7. PROJECTS (ALL 12) */}
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Projects</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {ALL_PROJECTS.map((project) => (
                    <motion.div 
                      layoutId={`project-card-${project.id}`}
                      key={project.id} 
                      onClick={() => setSelectedProject(project)} 
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 cursor-pointer shadow-sm hover:shadow-md transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    >
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">{project.title}</h4>
                      <p className="mt-2 text-xs font-mono text-zinc-500 mb-3">{project.date}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">{project.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 8. ACADEMIC ACHIEVEMENTS */}
              <section>
                <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Academic Achievements</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-4">
                    <span className="text-zinc-500 font-mono shrink-0">ISI</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Qualified for direct admission to M.Stat. program with a government funded stipend.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-zinc-500 font-mono shrink-0">ISI</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Admitted for B.Stat. (Hons.) program with a government funded stipend.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-zinc-500 font-mono shrink-0">JEE</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Ranked amongst top 0.1 percentile in Joint Entrance Examination - Mains amongst 1 Million candidates.</span>
                  </li>
                </ul>
              </section>

              {/* 9 & 10. LANGUAGES & HOBBIES */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Languages</h3>
                  <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <li><strong className="text-zinc-900 dark:text-zinc-200">English:</strong> Full professional proficiency</li>
                    <li><strong className="text-zinc-900 dark:text-zinc-200">Bengali:</strong> Native or bilingual proficiency</li>
                    <li><strong className="text-zinc-900 dark:text-zinc-200">Hindi:</strong> Native or bilingual proficiency</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Hobbies</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Music, Table Tennis, Coding</p>
                </div>
              </section>

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
