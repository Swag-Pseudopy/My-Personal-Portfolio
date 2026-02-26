"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-zinc-400 selection:bg-zinc-800 selection:text-zinc-200">
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Sidebar */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl"
              >
                Swagato Das
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-3 text-lg font-medium tracking-tight text-zinc-200 sm:text-xl"
              >
                Master of Statistics @ Indian Statistical Institute
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 max-w-xs leading-normal"
              >
                Researcher focusing on Deep Learning, Generative Models, Causal Inference, and Non-Parametric Clustering.
              </motion.p>
              {/* Navigation / Contact */}
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex items-center gap-5"
              >
                <li>
                  <a href="https://github.com/Swag-Pseudopy" target="_blank" rel="noreferrer" className="block text-zinc-400 hover:text-zinc-100 transition-colors">
                    <span className="sr-only">GitHub</span>
                    <Github className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/swagato-das" target="_blank" rel="noreferrer" className="block text-zinc-400 hover:text-zinc-100 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a href="mailto:swagato.isi2227@gmail.com" className="block text-zinc-400 hover:text-zinc-100 transition-colors">
                    <span className="sr-only">Email</span>
                    <Mail className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a href="tel:+919749794322" className="block text-zinc-400 hover:text-zinc-100 transition-colors">
                    <span className="sr-only">Phone</span>
                    <Phone className="h-6 w-6" />
                  </a>
                </li>
              </motion.ul>
            </div>
          </header>

          {/* Right Content */}
          <main className="pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-24">
            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-100 lg:hidden">About</h3>
              <p className="leading-relaxed">
                I am a statistician and researcher with a strong foundation in <span className="text-zinc-100 font-medium">Biostatistics, Causal Inference, and Statistical Learning</span>. My current work explores the intersection of <span className="text-zinc-100 font-medium">Deep Learning, Flow Matching, and Generative Models</span>, particularly applied to bioinformatics and dynamic system learning.
              </p>
              <p className="leading-relaxed">
                I am currently pursuing my Master of Statistics at the Indian Statistical Institute, Kolkata, where I also completed my Bachelor's degree with honors.
              </p>
            </motion.section>

            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-100">Experience</h3>
              <div className="space-y-12">
                {/* Job 1 */}
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">
                    May 2025 &mdash; Jul 2025
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-200">
                      Research Intern &middot; TU Darmstadt, Germany
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500">Self Organizing Systems Lab</p>
                    <p className="mt-2 text-sm leading-normal">
                      Developed a deep learning system for in-silico SELEX simulation and prediction. Designed a cross-attention predictor to model round-wise DNA sequence enrichment and built a generative framework using flow matching and neural ODEs.
                    </p>
                  </div>
                </div>
                {/* Job 2 */}
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">
                    Jan 2025 &mdash; Mar 2025
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-200">
                      Organizing Member &middot; ISI, Kolkata
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500">Winter School on Deep Learning [WSDL]</p>
                    <p className="mt-2 text-sm leading-normal">
                      Contributed to an intensive academic event aimed at providing self-motivated students with in-depth knowledge and exposure to cutting-edge research in Deep Learning.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Publications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-100">Publications</h3>
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">
                  2025
                </header>
                <div className="z-10 sm:col-span-6">
                  <h4 className="font-medium leading-snug text-zinc-200">
                    Hyperbolic Fuzzy C-Means with Adaptive Weight-based Filtering for Efficient Clustering
                  </h4>
                  <p className="mt-1 text-sm text-zinc-500">Accepted at ICVGIP 2025 (Oral and Poster)</p>
                  <p className="mt-2 text-sm leading-normal">
                    Introduced Filtration-based Hyperbolic Fuzzy C-Means (HypeFCM), a novel clustering algorithm tailored for better representation of data relationships in non-Euclidean spaces using the Poincaré Disc model.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300 border border-zinc-700/50">Das S.</span>
                    <span className="inline-flex items-center rounded-full bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300 border border-zinc-700/50">Pratihar A.</span>
                    <span className="inline-flex items-center rounded-full bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300 border border-zinc-700/50">Das S.</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Projects */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-100">Selected Projects</h3>
              <div className="space-y-12">
                {/* Project 1 */}
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">
                    2025
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-200">
                      Convex Clustering Methodologies
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500">Guide: Prof. Swagatam Das</p>
                    <p className="mt-2 text-sm leading-normal">
                      Explored techniques in Convex clustering literature, adapting ADMM for biclustering to simultaneously cluster samples and genes by devising appropriate objective functions.
                    </p>
                  </div>
                </div>
                {/* Project 2 */}
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">
                    2024
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-200">
                      Bregman Divergences & Clustering Consistency
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500">Guide: Prof. Swagatam Das</p>
                    <p className="mt-2 text-sm leading-normal">
                      Analyzed convergence rates of clustering algorithms under various optimization subroutines (Gradient descent, ADAM) using different Bregman divergences like Kullback-Leibler.
                    </p>
                  </div>
                </div>
                {/* Project 3 */}
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">
                    2024
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-200">
                      Reinforcement Learning & Evolutionary Algorithms
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500">Guide: Prof. Swagatam Das & Dr. Abhishek Sinha</p>
                    <p className="mt-2 text-sm leading-normal">
                      Implemented algorithms like minimax, Q-learning, and MCTS on gym environments including tic-tac-toe, blackjack, and Atari games to study the intersection of RL and evolutionary techniques.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-100">Education</h3>
              <div className="space-y-8">
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">
                    2025 &mdash; Present
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-200">
                      Master of Statistics [M.Stat.]
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500">Indian Statistical Institute, Kolkata</p>
                    <p className="mt-2 text-sm text-zinc-400">Qualified for direct admission with a government-funded stipend.</p>
                  </div>
                </div>
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2 font-mono">
                    2022 &mdash; 2025
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-medium leading-snug text-zinc-200">
                      Bachelor of Statistics [B.Stat.] (Honors)
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500">Indian Statistical Institute, Kolkata</p>
                    <p className="mt-2 text-sm text-zinc-400">Admitted with a government-funded stipend. Aggregate Score: 75%.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-sm font-bold uppercase tracking-widest text-zinc-100">Skills & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['R', 'Python', 'C', 'LaTeX', 'Java', 'Julia', 'PyTorch', 'Git/GitHub', 'WandB', 'Jupyter'].map((skill) => (
                  <span key={skill} className="inline-flex items-center rounded-full bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-200 border border-zinc-700/50 hover:bg-zinc-700/50 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-zinc-500 sm:pb-0">
              <p>
                Designed and built with <span className="text-zinc-300">Next.js</span>, <span className="text-zinc-300">Tailwind CSS</span>, and <span className="text-zinc-300">Framer Motion</span>.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
