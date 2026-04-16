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
    // Determine the chaotic flow direction once when the component mounts
    flowAngleRef.current = Math.random() * Math.PI * 2;
  }, []);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Listen for the custom aesthetic toggle event from page.tsx
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
    
    // alpha: false keeps the massive performance boost
    const ctx = canvas.getContext("2d", { alpha: false }); 
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
      // Fast solid background clearing
      const isDark = themeRef.current === "dark";
      ctx.fillStyle = isDark ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.0025; // Slower base speed for elegant flow
      const time = timeRef.current;

      // Easing for smooth mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const isNeon = isNeonRef.current;

      // Solid color bases for the fake glow technique (no alpha here)
      const neonDark = ["rgba(0, 255, 255, 1)", "rgba(255, 0, 255, 1)"];
      const neonLight = ["rgba(255, 140, 0, 1)", "rgba(255, 0, 128, 1)"]; 
      // Muted palettes can keep their alpha since they don't use the multi-stroke technique
      const mutedDark = ["rgba(100, 120, 150, 0.4)", "rgba(80, 100, 130, 0.4)"]; 
      const mutedLight = ["rgba(160, 190, 220, 0.6)", "rgba(200, 180, 210, 0.6)"]; 

      let activePalette;
      if (isNeon) activePalette = isDark ? neonDark : neonLight;
      else activePalette = isDark ? mutedDark : mutedLight;

      // Force source-over. Blending modes cause lag.
      ctx.globalCompositeOperation = 'source-over'; 

      const span = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
      const mx = mouseX - canvas.width / 2;
      const my = mouseY - canvas.height / 2;
      const angle = flowAngleRef.current;
      
      const rMouseX = mx * Math.cos(-angle) - my * Math.sin(-angle);
      const rMouseY = mx * Math.sin(-angle) + my * Math.cos(-angle);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);

      const numStrands = 12; 
      
      for (let r = 0; r < numStrands; r++) {
        ctx.beginPath();
        ctx.strokeStyle = activePalette[r % activePalette.length];
        
        // Explicitly disable native shadows to prevent lag
        ctx.shadowBlur = 0; 
        ctx.shadowColor = "transparent";

        const speed = time * 1.2;
        const phaseOffset = r * 0.15; 
        const naturalSpread = (r - numStrands / 2) * 4; 

        // Step size 4 for perfectly smooth curves
        for (let x = -span; x <= span; x += 4) { 
          
          let baseY = Math.sin((x * 0.002) + speed + phaseOffset) * 90
                    + Math.sin((x * 0.004) - speed * 0.7 + phaseOffset) * 40
                    + naturalSpread;

          const dx = x - rMouseX;
          const dy = baseY - rMouseY;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 400; 
          const radiusSq = interactionRadius * interactionRadius;

          let finalY = baseY;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow((interactionRadius - dist) / interactionRadius, 2); 
            
            // Ribbon widening
            const flare = naturalSpread * force * 4; 
            // Smooth, fluid chaos
            const fluidJitter = Math.sin(time * 12 + x * 0.04) * force * 30; 
            
            finalY += flare + fluidJitter;
          }

          if (x === -span) ctx.moveTo(x, finalY);
          else ctx.lineTo(x, finalY);
        }
        
        // --- THE FAKE GLOW RENDERING ---
        if (isNeon) {
          // 1. Draw the "Glow" (Thick, highly transparent)
          ctx.lineWidth = isDark ? 8 : 12;
          ctx.globalAlpha = 0.15; 
          ctx.stroke();
          
          // 2. Draw the "Core" (Thin, fully opaque)
          ctx.lineWidth = isDark ? 1.5 : 2.5;
          ctx.globalAlpha = 1.0; 
          ctx.stroke();
        } else {
          // Muted Mode rendering
          ctx.lineWidth = isDark ? 1.5 : 2.5;
          ctx.globalAlpha = 1.0;
          ctx.stroke();
        }
      }
      
      ctx.restore();
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
      className="fixed inset-0 -z-10 pointer-events-none" 
    />
  );
}
