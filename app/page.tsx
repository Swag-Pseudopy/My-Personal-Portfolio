"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "HypeFCM (ICVGIP 2025)",
    desc: "Filtration-based Hyperbolic Fuzzy C-Means for non-Euclidean spaces.",
    tags: ["Clustering", "Hyperbolic Geometry"]
  },
  {
    title: "SELEX Simulator",
    desc: "Deep learning system for in-silico SELEX simulation using Neural ODEs.",
    tags: ["Deep Learning", "Flow Matching"]
  },
  {
    title: "Convex Biclustering",
    desc: "Adapting ADMM to identify simultaneous patterns in high-dimensional data.",
    tags: ["Optimization", "ADMM"]
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col lg:flex-row">
      
      {/* LEFT HALF: Fixed Identity Panel */}
      <div className="w-full lg:w-1/2 lg:h-screen p-8 md:p-16 lg:p-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
          >
            Swagato Das.
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-400 font-light mb-8"
          >
            Master of Statistics @ ISI Kolkata
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-sm md:text-base text-zinc-500 leading-relaxed"
          >
            Bridging rigorous statistical theory with modern deep learning. 
            Currently exploring Flow Matching, Causal Inference, and Non-Parametric Clustering.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 lg:mt-0 flex gap-6"
        >
          <a href="https://github.com/Swag-Pseudopy" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/swagato-das" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:swagato.isi2227@gmail.com" className="text-zinc-500 hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* RIGHT HALF: The Slider Area */}
      <div className="w-full lg:w-1/2 lg:h-screen relative flex items-center bg-zinc-950/50">
        
        {/* Decorative corner accents for the "self-design" look */}
        <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-zinc-700 hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-zinc-700 hidden lg:block" />

        <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 px-8 py-16 lg:py-0 md:px-16 no-scrollbar">
          
          {/* Slider Cards */}
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              className="min-w-[85vw] md:min-w-[300px] lg:min-w-[400px] snap-center shrink-0 border border-zinc-800 bg-black p-8 flex flex-col justify-between hover:border-zinc-500 transition-colors group"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-zinc-300 transition-colors">{project.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  {project.desc}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 border border-zinc-800 text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors -rotate-45 group-hover:rotate-0" />
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </div>
  );
}
