import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackground
 * Renders subtle drifting gold particles and slow-moving deep blue atmospheric glow.
 * Optimized for performance: checks prefers-reduced-motion, pauses when offscreen or document is hidden.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Visibility change handler to save battery & CPU
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Particles system: subtle golden pollen / light specks
    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.4 + 0.15), // Gentle upward drift
      alpha: Math.random() * 0.4 + 0.15,
      goldHue: Math.random() > 0.4 ? 'rgba(245, 197, 66,' : 'rgba(30, 107, 255,'
    }));

    let waveOffset = 0;

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw soft moving radial glow in background
        waveOffset += 0.003;
        const glowX = canvas.width * 0.5 + Math.sin(waveOffset) * 120;
        const glowY = canvas.height * 0.35 + Math.cos(waveOffset * 0.8) * 80;

        const radialGrad = ctx.createRadialGradient(glowX, glowY, 50, glowX, glowY, canvas.width * 0.65);
        radialGrad.addColorStop(0, 'rgba(30, 107, 255, 0.08)');
        radialGrad.addColorStop(0.5, 'rgba(10, 20, 40, 0.03)');
        radialGrad.addColorStop(1, 'rgba(5, 11, 24, 0)');
        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render ambient floating particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -10) p.x = canvas.width + 10;
          if (p.x > canvas.width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.goldHue} ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.goldHue.includes('245') ? 'rgba(245, 197, 66, 0.4)' : 'rgba(30, 107, 255, 0.4)';
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
}
