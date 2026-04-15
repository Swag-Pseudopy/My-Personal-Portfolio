"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Particle = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  baseOpacity: number;
  id: number;
};

export default function LuminousRibbons() {
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

  // Sync theme changes to ref so canvas doesn't reset on toggle
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

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
          speed: 1 + Math.random() * 2,
          size: 1 + Math.random() * 4,
          baseOpacity: 0.1 + Math.random() * 0.2, // Base opacity stored here
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

      // Check current theme dynamically mid-flight
      const isDark = themeRef.current === "dark";
      const darkColors = ["rgba(0, 255, 255, 1)", "rgba(255, 0, 255, 1)"]; // Neon Cyan/Magenta
      const lightColors = ["rgba(255, 215, 0, 1)", "rgba(255, 69, 0, 1)"];  // Vibrant Yellow/Orange
      const activePalette = isDark ? darkColors : lightColors;

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

        // Apply color dynamically based on themeRef
        ctx.fillStyle = activePalette[p.id % activePalette.length];
        ctx.globalAlpha = isDark ? p.baseOpacity * 0.4 : p.baseOpacity * 0.6;
        
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
  }, [mounted]); // Only run once on mount!

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-white dark:bg-black pointer-events-none transition-colors duration-700" 
    />
  );
}
