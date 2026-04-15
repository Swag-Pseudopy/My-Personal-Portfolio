"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Particle = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
  opacity: number;
  id: number;
};

export default function LuminousRibbons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Refs for animation state that persists across theme toggles
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const themeRef = useRef(resolvedTheme);
  
  // FIX: Added initial value 'undefined' to satisfy TypeScript
  const animationFrameIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      initializeParticles();
    };
    window.addEventListener("resize", resize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const isDark = resolvedTheme === "dark";
    const darkColors = ["rgba(0, 255, 255, 1)", "rgba(255, 0, 255, 1)"];
    const lightColors = ["rgba(255, 215, 0, 1)", "rgba(255, 69, 0, 1)"];
    const activePalette = isDark ? darkColors : lightColors;

    const initializeParticles = () => {
      particlesRef.current = [];
      const numParticles = 1000;

      for (let i = 0; i < numParticles; i++) {
        const ribbonIndex = i % 5;
        const color = activePalette[ribbonIndex % activePalette.length];
        
        particlesRef.current.push({
          x: (i / numParticles) * canvas.width,
          y: Math.random() * canvas.height,
          angle: (i / numParticles) * Math.PI * 2,
          speed: 1 + Math.random() * 2,
          color: color,
          size: 1 + Math.random() * 4,
          opacity: 0.1 + Math.random() * 0.2,
          id: ribbonIndex,
        });
      }
    };

    initializeParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.005; 
      const time = timeRef.current;

      ctx.globalCompositeOperation = 'lighter';
      const particles = particlesRef.current;

      for (let p of particles) {
        const ribbonOffset = p.id * (Math.PI / 2.5);
        const dynamicAmplitude = Math.sin(time + p.angle) * 100;
        
        const defaultY = 
          (canvas.height / 2) + 
          (dynamicAmplitude + 
          Math.sin(time * 2 + p.angle * 2 + ribbonOffset) * (canvas.height * 0.2));

        let y = defaultY + Math.sin(p.angle) * 50;

        const dx = p.x - mouse.x;
        const dy = y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const interactionRadiusSq = mouse.radius * mouse.radius;

        if (distSq < interactionRadiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          y += Math.sin(time * 10 + p.angle * 15) * force * 150; 
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = isDark ? p.opacity * 0.4 : p.opacity * 0.6;
        
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
  }, [mounted, resolvedTheme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-white dark:bg-black pointer-events-none transition-colors duration-700" 
    />
  );
}
