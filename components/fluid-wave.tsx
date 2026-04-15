"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// Define a particle type for better structure
type Particle = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
  opacity: number;
  id: number; // Unique ID to anchor the wave path
};

export default function LuminousRibbons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Refs for animation state that persists across theme toggles
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const animationFrameIdRef = useRef<number>();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a second effect to initialize/manage the animation only when mounted
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Track mouse state
    const mouse = { x: -1000, y: -1000, radius: 450 }; // interactionRadius from user request
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initial and responsive canvas sizing
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles(); // Redraw particles to cover the whole screen
    };
    window.addEventListener("resize", resize);

    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Determine color palette based on theme
    const isDark = resolvedTheme === "dark";
    // Dark mode: Cyan and Magenta/Pink (Matches the JPG aesthetic)
    const darkColors = ["rgba(0, 255, 255, 1)", "rgba(255, 0, 255, 1)"];
    // Light mode: User request (Yellow/Orange for a vibrant look on white)
    const lightColors = ["rgba(255, 215, 0, 1)", "rgba(255, 69, 0, 1)"];
    const activePalette = isDark ? darkColors : lightColors;

    const initializeParticles = () => {
      particlesRef.current = [];
      const numParticles = 1000; // Large number for textured feel

      for (let i = 0; i < numParticles; i++) {
        const ribbonIndex = i % 5; // Creates 5 distinct ribbons/waves
        const color = activePalette[ribbonIndex % activePalette.length];
        
        particlesRef.current.push({
          // Scatter particles vertically across the screen
          x: (i / numParticles) * canvas.width,
          y: Math.random() * canvas.height,
          angle: (i / numParticles) * Math.PI * 2,
          speed: 1 + Math.random() * 2,
          color: color,
          // Varied size and low initial opacity create texture
          size: 1 + Math.random() * 4,
          opacity: 0.1 + Math.random() * 0.2,
          id: ribbonIndex,
        });
      }
    };

    // Re-initialize when theme changes
    initializeParticles();

    // The Animation Loop
    const animate = () => {
      // Clear the canvas, making it transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update global animation time
      timeRef.current += 0.005; 
      const time = timeRef.current;

      // This is the CRITICAL line that makes the waves look luminous
      // Overlapping particle colors will add up and glow brightly
      ctx.globalCompositeOperation = 'lighter';

      const particles = particlesRef.current;

      for (let p of particles) {
        // Calculate dynamic wave path (fluid and patterned, like ribbons)
        const ribbonOffset = p.id * (Math.PI / 2.5);
        const dynamicAmplitude = Math.sin(time + p.angle) * 100;
        
        // Base sine movement + dynamic variation + theme-based vertical position
        const defaultY = 
          (canvas.height / 2) + 
          (dynamicAmplitude + 
          Math.sin(time * 2 + p.angle * 2 + ribbonOffset) * (canvas.height * 0.2));

        // Use the angle and vertical scatter to spread the wave texture
        let y = defaultY + Math.sin(p.angle) * 50;

        // Apply magnetic cursor influence (interactionRadius = 450)
        const dx = p.x - mouse.x;
        const dy = y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const interactionRadiusSq = mouse.radius * mouse.radius;

        if (distSq < interactionRadiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          // Apply an aggressive ripple and displacement
          y += Math.sin(time * 10 + p.angle * 15) * force * 150; 
        }

        // Apply color and luminosity
        ctx.fillStyle = p.color;
        // Make individual particles very subtle so they blend elegantly
        ctx.globalAlpha = isDark ? p.opacity * 0.4 : p.opacity * 0.6;
        
        // Draw the textured particle
        ctx.beginPath();
        ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Increment particle x-position for dynamic flow
        p.x += p.speed;
        
        // Wrap around when particle goes off-screen
        if (p.x > canvas.width) {
          p.x = 0;
          p.angle = Math.random() * Math.PI * 2; // Randomize path slightly on restart
        }
      }
      
      // Reset composite operation for the rest of the UI
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Cleanup when unmounting or theme changes
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animationFrameIdRef.current) {
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
