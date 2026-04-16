"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function ChaoticRibbonWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const timeRef = useRef(0);
  const themeRef = useRef(resolvedTheme);
  const isNeonRef = useRef(true); 
  
  const flowAngleRef = useRef(0);
  const animationFrameIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    flowAngleRef.current = Math.random() * Math.PI * 2;
  }, []);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const handleAestheticToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      isNeonRef.current = customEvent.detail.isNeon;
    };
    window.addEventListener("toggle-aesthetic", handleAestheticToggle);
    return () => window.removeEventListener("toggle-aesthetic", handleAestheticToggle);
  }, []);

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
      
      timeRef.current += 0.003; // Slightly slower time for better particle flow
      const time = timeRef.current;

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      const isDark = themeRef.current === "dark";
      const isNeon = isNeonRef.current;

      const neonDark = ["rgba(0, 255, 255, 0.6)", "rgba(255, 0, 255, 0.6)"];
      const neonLight = ["rgba(255, 215, 0, 0.8)", "rgba(255, 69, 0, 0.8)"];
      const mutedDark = ["rgba(100, 120, 150, 0.4)", "rgba(80, 100, 130, 0.4)"]; 
      const mutedLight = ["rgba(160, 190, 220, 0.6)", "rgba(200, 180, 210, 0.6)"]; 

      let activePalette;
      if (isNeon) activePalette = isDark ? neonDark : neonLight;
      else activePalette = isDark ? mutedDark : mutedLight;

      ctx.globalCompositeOperation = isNeon ? 'lighter' : 'source-over';

      const span = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
      const mx = mouseX - canvas.width / 2;
      const my = mouseY - canvas.height / 2;
      const angle = flowAngleRef.current;
      
      const rMouseX = mx * Math.cos(-angle) - my * Math.sin(-angle);
      const rMouseY = mx * Math.sin(-angle) + my * Math.cos(-angle);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);

      const numStrands = 10; 
      
      for (let r = 0; r < numStrands; r++) {
        ctx.fillStyle = activePalette[r % activePalette.length];
        
        ctx.shadowBlur = isNeon ? (isDark ? 10 : 8) : 0;
        ctx.shadowColor = isNeon ? ctx.fillStyle : "transparent";

        const speed = time * 1.5;
        const phaseOffset = r * 0.2; 
        const baseAmplitude = 80 + Math.sin(time + r) * 30;

        // Iterate across the screen width
        for (let x = -span; x <= span; x += 6) { // Step size dictates particle density horizontally
          
          let baseY = Math.sin((x * 0.002) + speed + phaseOffset) * baseAmplitude
                    + Math.sin((x * 0.005) - speed * 0.8 + phaseOffset) * (baseAmplitude * 0.5);

          const dx = x - rMouseX;
          const dy = baseY - rMouseY;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 350;
          const radiusSq = interactionRadius * interactionRadius;

          // Base ribbon thickness
          let dispersion = 4; 

          // If the mouse is near, multiply the dispersion exponentially
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow((interactionRadius - dist) / interactionRadius, 2); 
            dispersion += force * 60; // Ribbon bursts up to 60px wide
            baseY += Math.sin(time * 10 + x * 0.02) * force * 50; // Add chaotic vertical jitter
          }

          // Draw 3 random particles at this X coordinate to form the "cloud" ribbon
          for (let p = 0; p < 3; p++) {
            // Randomly scatter the point vertically around the main mathematical curve
            const scatterY = (Math.random() - 0.5) * dispersion * 2;
            const finalY = baseY + scatterY;

            ctx.beginPath();
            // Dots are slightly larger in light mode to remain visible against white
            ctx.arc(x, finalY, isDark ? 1.2 : 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      ctx.restore();
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
  }, [mounted]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-white dark:bg-black pointer-events-none transition-colors duration-700" 
    />
  );
}
