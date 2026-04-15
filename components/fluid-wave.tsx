"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function NeonContinuousRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const timeRef = useRef(0);
  const themeRef = useRef(resolvedTheme);
  const animationFrameIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update theme dynamically without resetting the animation loop
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.005;
      const time = timeRef.current;

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      ctx.globalCompositeOperation = 'lighter';

      const isDark = themeRef.current === "dark";
      const darkColors = ["rgba(0, 255, 255, 0.3)", "rgba(255, 0, 255, 0.3)"];
      const lightColors = ["rgba(255, 215, 0, 0.4)", "rgba(255, 69, 0, 0.4)"];
      const activePalette = isDark ? darkColors : lightColors;

      const numLines = 15; 
      
      for (let r = 0; r < numLines; r++) {
        ctx.beginPath();
        
        ctx.strokeStyle = activePalette[r % activePalette.length];
        ctx.lineWidth = isDark ? 2 : 3;
        ctx.shadowBlur = isDark ? 15 : 10;
        ctx.shadowColor = ctx.strokeStyle;

        const speed = time * 1.2;
        const phaseOffset = r * 0.1; 
        const baseAmplitude = 100 + Math.sin(time + r) * 20;

        for (let x = 0; x <= canvas.width; x += 4) {
          
          let y = (canvas.height / 2) 
            + Math.sin((x * 0.002) + speed + phaseOffset) * baseAmplitude
            + Math.sin((x * 0.005) - speed * 0.8 + phaseOffset) * (baseAmplitude * 0.4);

          const dx = x - mouseX;
          const dy = y - mouseY;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 450;
          const radiusSq = interactionRadius * interactionRadius;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow((interactionRadius - dist) / interactionRadius, 2); 
            y += Math.sin(time * 10 + x * 0.015) * force * 150; 
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      ctx.globalCompositeOperation = 'source-over';

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
  }, [mounted]); // Removed resolvedTheme from dependencies

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-white dark:bg-black pointer-events-none transition-colors duration-700" 
    />
  );
}
