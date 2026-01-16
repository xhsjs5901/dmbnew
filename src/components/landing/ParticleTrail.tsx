import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  decay: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

const ParticleTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const animationRef = useRef<number>();
  const isMouseInViewRef = useRef(false);

  // Brand colors with alpha variations
  const colors = [
    'rgba(199, 21, 133, 0.8)',   // Magenta primary
    'rgba(255, 107, 129, 0.8)',  // Coral
    'rgba(102, 51, 153, 0.7)',   // Royal purple
    'rgba(0, 206, 209, 0.7)',    // Teal
    'rgba(255, 182, 193, 0.6)',  // Light pink
  ];

  const createParticle = useCallback((x: number, y: number, vx: number, vy: number): Particle => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    const size = Math.random() * 4 + 2 + Math.min(speed * 0.5, 3);
    
    return {
      x,
      y,
      size,
      alpha: Math.random() * 0.5 + 0.5,
      decay: Math.random() * 0.02 + 0.015,
      vx: vx * 0.1 + (Math.random() - 0.5) * 0.5,
      vy: vy * 0.1 + (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    };
  }, []);

  const spawnParticles = useCallback(() => {
    const { x, y, lastX, lastY } = mouseRef.current;
    const vx = x - lastX;
    const vy = y - lastY;
    const speed = Math.sqrt(vx * vx + vy * vy);

    if (speed > 1 && isMouseInViewRef.current) {
      // Spawn more particles based on movement speed
      const particleCount = Math.min(Math.floor(speed * 0.3), 5);
      
      for (let i = 0; i < particleCount; i++) {
        // Interpolate positions for smoother trails
        const t = i / particleCount;
        const px = lastX + (x - lastX) * t + (Math.random() - 0.5) * 8;
        const py = lastY + (y - lastY) * t + (Math.random() - 0.5) * 8;
        
        particlesRef.current.push(createParticle(px, py, vx, vy));
      }

      // Occasionally spawn a larger "glow" particle
      if (Math.random() < 0.1) {
        const glowParticle = createParticle(x, y, vx, vy);
        glowParticle.size *= 2.5;
        glowParticle.decay *= 0.5;
        glowParticle.alpha *= 0.4;
        particlesRef.current.push(glowParticle);
      }
    }

    // Limit particle count for performance
    if (particlesRef.current.length > 150) {
      particlesRef.current = particlesRef.current.slice(-100);
    }

    mouseRef.current.lastX = x;
    mouseRef.current.lastY = y;
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      isMouseInViewRef.current = true;
    };

    const handleMouseLeave = () => {
      isMouseInViewRef.current = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Spawn new particles
      spawnParticles();

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98; // Friction
        particle.vy *= 0.98;
        particle.vy += 0.02; // Slight gravity
        particle.life -= particle.decay;
        particle.alpha = particle.life * 0.8;

        if (particle.life <= 0) return false;

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.alpha;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        
        const baseColor = particle.color.replace(/[\d.]+\)$/, '');
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.4, `${baseColor}0.3)`);
        gradient.addColorStop(1, `${baseColor}0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        ctx.restore();

        return true;
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spawnParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleTrail;
