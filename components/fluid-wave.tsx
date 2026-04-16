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
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false boosts performance since bg is solid
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
      // Draw solid background based on theme (much faster than clearRect on some devices)
      const isDark = themeRef.current === "dark";
      ctx.fillStyle = isDark ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.003; 
      const time = timeRef.current;

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      const isNeon = isNeonRef.current;

      const neonDark = ["rgba(0, 255, 255, 0.4)", "rgba(255, 0, 255, 0.4)"];
      const neonLight = ["rgba(255, 215, 0, 0.5)", "rgba(255, 69, 0, 0.5)"];
      const mutedDark = ["rgba(100, 120, 150, 0.2)", "rgba(80, 100, 130, 0.2)"]; 
      const mutedLight = ["rgba(160, 190, 220, 0.4)", "rgba(200, 180, 210, 0.4)"]; 

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

      // Using 15 distinct line strands
      const numStrands = 15; 
      
      for (let r = 0; r < numStrands; r++) {
        ctx.beginPath();
        ctx.strokeStyle = activePalette[r % activePalette.length];
        ctx.lineWidth = isDark ? 1.5 : 2.5;
        
        ctx.shadowBlur = isNeon ? (isDark ? 12 : 8) : 0;
        ctx.shadowColor = isNeon ? ctx.strokeStyle : "transparent";

        const speed = time * 1.5;
        const phaseOffset = r * 0.15; 
        
        // This spreads the 15 lines out naturally so it looks like a ribbon
        const naturalSpread = (r - numStrands / 2) * 5; 

        // Larger step size (10px) = drastically fewer calculations = buttery smooth 60fps
        for (let x = -span; x <= span; x += 10) { 
          
          let baseY = Math.sin((x * 0.002) + speed + phaseOffset) * 90
                    + Math.sin((x * 0.005) - speed * 0.8 + phaseOffset) * 45
                    + naturalSpread;

          const dx = x - rMouseX;
          const dy = baseY - rMouseY;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 350;
          const radiusSq = interactionRadius * interactionRadius;

          let finalY = baseY;

          // If the mouse is near, apply the interactive dispersion!
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow((interactionRadius - dist) / interactionRadius, 2); 
            
            // Outer strands push away harder than inner strands, causing the ribbon to "widen"
            const flare = naturalSpread * force * 3; 
            // Add a little chaotic high-frequency wave locally
            const jitter = Math.sin(time * 20 + x * 0.1) * force * 20; 
            
            finalY += flare + jitter;
          }

          if (x === -span) ctx.moveTo(x, finalY);
          else ctx.lineTo(x, finalY);
        }
        
        // Draw the entire strand in one single GPU operation
        ctx.stroke();
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
      // Removed bg-white/bg-black here since we are painting it directly in the canvas for speed
      className="fixed inset-0 -z-10 pointer-events-none" 
    />
  );
}
