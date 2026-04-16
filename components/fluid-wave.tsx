"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function ChaoticRibbonWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const timeRef = useRef(0);
  const themeRef = useRef(resolvedTheme);
  const isNeonRef = useRef(true); // Tracks our new aesthetic state
  
  // The chaotic flow angle, determined once on load
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

      const isDark = themeRef.current === "dark";
      const isNeon = isNeonRef.current;

      // Define Palettes based on state
      const neonDark = ["rgba(0, 255, 255, 0.3)", "rgba(255, 0, 255, 0.3)"];
      const neonLight = ["rgba(255, 215, 0, 0.4)", "rgba(255, 69, 0, 0.4)"];
      const mutedDark = ["rgba(100, 120, 150, 0.15)", "rgba(80, 100, 130, 0.15)"]; // Slate/Ghostly
      const mutedLight = ["rgba(160, 190, 220, 0.3)", "rgba(200, 180, 210, 0.3)"]; // Pastel Blue/Lavender

      let activePalette;
      if (isNeon) activePalette = isDark ? neonDark : neonLight;
      else activePalette = isDark ? mutedDark : mutedLight;

      // Apply blending for Neon, normal drawing for Muted
      ctx.globalCompositeOperation = isNeon ? 'lighter' : 'source-over';

      // To ensure the chaotic angle covers the whole screen, we draw a line long enough 
      // to cover the diagonal of the monitor.
      const span = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
      
      // Calculate mouse coordinates relative to the rotated canvas
      const mx = mouseX - canvas.width / 2;
      const my = mouseY - canvas.height / 2;
      const angle = flowAngleRef.current;
      const rMouseX = mx * Math.cos(-angle) - my * Math.sin(-angle);
      const rMouseY = mx * Math.sin(-angle) + my * Math.cos(-angle);

      // Rotate the entire canvas context to create the chaotic flow angle
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);

      const numLines = 15; 
      
      for (let r = 0; r < numLines; r++) {
        ctx.beginPath();
        
        ctx.strokeStyle = activePalette[r % activePalette.length];
        ctx.lineWidth = isDark ? 2 : 3;
        
        // Only apply glowing shadows if in Neon mode
        ctx.shadowBlur = isNeon ? (isDark ? 15 : 10) : 0;
        ctx.shadowColor = isNeon ? ctx.strokeStyle : "transparent";

        const speed = time * 1.2;
        const phaseOffset = r * 0.1; 
        const baseAmplitude = 100 + Math.sin(time + r) * 20;

        // Draw from well off-screen left to well off-screen right
        for (let x = -span; x <= span; x += 4) {
          
          let y = Math.sin((x * 0.002) + speed + phaseOffset) * baseAmplitude
                + Math.sin((x * 0.005) - speed * 0.8 + phaseOffset) * (baseAmplitude * 0.4);

          // Apply ripple using the locally rotated mouse coordinates
          const dx = x - rMouseX;
          const dy = y - rMouseY;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 450;
          const radiusSq = interactionRadius * interactionRadius;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow((interactionRadius - dist) / interactionRadius, 2); 
            y += Math.sin(time * 10 + x * 0.015) * force * 150; 
          }

          if (x === -span) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      ctx.restore(); // Undo the rotation for the next frame
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
