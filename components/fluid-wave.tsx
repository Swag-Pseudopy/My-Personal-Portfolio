"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Particle = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  baseOpacity: number; // We now store base opacity here, not the hardcoded color
  id: number;
};

export default function ElegantFluidRibbons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const themeRef = useRef(resolvedTheme);
  const animationFrameIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync the theme to a ref so we can read it inside the loop without restarting it
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Notice: resolvedTheme is NO LONGER in this dependency array!
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -1000, y: -1000, radius: 450 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const initializeParticles = () => {
      particlesRef.current = [];
      const numParticles = 1000;

      for (let i = 0; i < numParticles; i++) {
        const ribbonIndex = i % 5;
        
        particlesRef.current.push({
          x: (i / numParticles) * canvas.width,
          y: Math.random() * canvas.height,
          angle: (i / numParticles) * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.5,
          size: 1 + Math.random() * 3,
          baseOpacity: 0.05 + Math.random() * 0.15,
          id: ribbonIndex,
        });
      }
    };

    // Seed particles once
    initializeParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.003;
      const time = timeRef.current;

      ctx.globalCompositeOperation = 'lighter';
      const particles = particlesRef.current;

      // Determine colors dynamically based on the current theme ref
      const isDark = themeRef.current === "dark";
      const darkColors = ["rgba(100, 150, 255, 1)", "rgba(50, 150, 200, 1)"];
      const lightColors = ["rgba(14, 165, 233, 1)", "rgba(56, 189, 248, 1)"];
      const activePalette = isDark ? darkColors : lightColors;

      for (let p of particles) {
        const ribbonOffset = p.id * (Math.PI / 2.5);
        const dynamicAmplitude = Math.sin(time + p.angle) * 80;
        
        const defaultY = 
          (canvas.height / 2) + 
          (dynamicAmplitude + 
          Math.sin(time * 1.5 + p.angle * 2 + ribbonOffset) * (canvas.height * 0.15));

        let y = defaultY + Math.sin(p.angle) * 40;

        const dx = p.x - mouse.x;
        const dy = y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const interactionRadiusSq = mouse.radius * mouse.radius;

        if (distSq < interactionRadiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          y += Math.sin(time * 8 + p.angle * 10) * force * 100;
        }

        // Apply color and opacity mid-flight
        ctx.fillStyle = activePalette[p.id % activePalette.length];
        ctx.globalAlpha = isDark ? p.baseOpacity * 0.25 : p.baseOpacity * 0.35;
        
        ctx.beginPath();
        ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speed;
        
        if (p.x > canvas.width) {
          p.x = 0;
          p.angle = Math.random() * Math.PI * 2;
        }
      }
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animationFrameIdRef.current !== undefined) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [mounted]); // <-- Removed resolvedTheme here!

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-white dark:bg-black pointer-events-none transition-colors duration-700" 
    />
  );
}
