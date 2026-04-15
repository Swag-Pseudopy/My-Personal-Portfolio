"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function FluidWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  
  // Use refs to store mutable data so we don't trigger re-renders of the animation loop
  const themeRef = useRef(resolvedTheme);
  const timeRef = useRef(0);

  // Update the theme ref whenever it changes, without restarting the canvas loop
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000; 
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
      timeRef.current += 0.005; 
      const time = timeRef.current;
      
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check the ref to see if we are in dark or light mode
      const isDark = themeRef.current === "dark";
      
      // VIBRANT colors for light mode, subtle for dark mode.
      ctx.strokeStyle = isDark ? "rgba(100, 200, 255, 0.08)" : "rgba(14, 165, 233, 0.45)"; // Sky blue for light mode
      ctx.lineWidth = isDark ? 1.5 : 2.0;

      const numWaves = 5;
      for (let w = 0; w < numWaves; w++) {
        ctx.beginPath();
        
        const waveSpeed = time * (1 + w * 0.1); 
        const phaseOffset = w * 2.5; 
        const baseAmplitude = 100 + (w * 20); 
        
        for (let i = 0; i < canvas.width; i += 5) {
          let y = (canvas.height / 2) + Math.sin((i * 0.002) + waveSpeed + phaseOffset) * baseAmplitude;

          const dx = i - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 450;

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            y += Math.sin(time * 5 + i * 0.01) * force * 120; 
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
  }, []); // Empty dependency array means this loop starts once and never resets!

  return (
    <canvas 
      ref={canvasRef} 
      // The canvas itself manages the true background color now
      className="fixed inset-0 -z-10 bg-white dark:bg-black pointer-events-none transition-colors duration-700" 
    />
  );
}
