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
      const isDark = themeRef.current === "dark";
      ctx.fillStyle = isDark ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.0025; // Slightly slower base speed for a more elegant flow
      const time = timeRef.current;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

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

      // Reduced to 12 strands to perfectly balance the smaller step size
      const numStrands = 12; 
      
      for (let r = 0; r < numStrands; r++) {
        ctx.beginPath();
        ctx.strokeStyle = activePalette[r % activePalette.length];
        ctx.lineWidth = isDark ? 1.5 : 2.5;
        
        ctx.shadowBlur = isNeon ? (isDark ? 12 : 8) : 0;
        ctx.shadowColor = isNeon ? ctx.strokeStyle : "transparent";

        const speed = time * 1.2;
        const phaseOffset = r * 0.15; 
        const naturalSpread = (r - numStrands / 2) * 4; 

        // Step size 4 restores the perfectly smooth curve
        for (let x = -span; x <= span; x += 4) { 
          
          let baseY = Math.sin((x * 0.002) + speed + phaseOffset) * 90
                    + Math.sin((x * 0.004) - speed * 0.7 + phaseOffset) * 40
                    + naturalSpread;

          const dx = x - rMouseX;
          const dy = baseY - rMouseY;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 400; // Slightly larger interaction area
          const radiusSq = interactionRadius * interactionRadius;

          let finalY = baseY;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            // Smoother falloff curve for the force
            const force = Math.pow((interactionRadius - dist) / interactionRadius, 2); 
            
            const flare = naturalSpread * force * 4; 
            // Lowered frequency (0.04) so the chaos flows smoothly rather than jaggedly
            const fluidJitter = Math.sin(time * 12 + x * 0.04) * force * 30; 
            
            finalY += flare + fluidJitter;
          }

          if (x === -span) ctx.moveTo(x, finalY);
          else ctx.lineTo(x, finalY);
        }
        
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
      className="fixed inset-0 -z-10 pointer-events-none" 
    />
  );
}
