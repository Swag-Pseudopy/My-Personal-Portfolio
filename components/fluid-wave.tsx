"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function FluidWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let mouseX = -1000; // Initialize off-screen
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      time += 0.005; // Speed of the natural wave flow
      
      // Smooth out the mouse movement (easing)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subdued, minimalist colors depending on the theme
      const isDark = resolvedTheme === "dark";
      ctx.strokeStyle = isDark ? "rgba(100, 200, 255, 0.15)" : "rgba(50, 100, 200, 0.25)";
      ctx.lineWidth = 1.5;

      // Draw two overlapping waves for depth
      const numWaves = 5;
      for (let w = 0; w < numWaves; w++) {
        ctx.beginPath();
        
        // Vary the properties for each individual wave to create a 3D depth effect
        const waveSpeed = time * (1 + w * 0.1); 
        const phaseOffset = w * 2.5; 
        const baseAmplitude = 100 + (w * 20); // Waves get progressively taller
        
        for (let i = 0; i < canvas.width; i += 5) {
          // Base math for the flowing wave
          let y = (canvas.height / 2) + Math.sin((i * 0.002) + waveSpeed + phaseOffset) * baseAmplitude;

          // Calculate distance from current point to mouse cursor
          const dx = i - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 450; // <-- 1. Change this for a wider reach
          
          // Perturb the wave if the cursor is nearby
          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            // The ripple effect
            y += Math.sin(time * 5 + i * 0.01) * force * 120; // <-- 2. Change the "50" for a taller ripple
          }

          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  // The canvas stays fixed in the background
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-transparent pointer-events-none" 
    />
  );
}
