
import React, { useRef, useEffect } from 'react';

type AnimationType = 'network' | 'waves' | 'dots';

interface ParticleBackgroundProps {
  type: AnimationType;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let waves: any[] = [];
    let time = 0;

    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150
    };
    
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);


    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      const parentHeight = canvas.parentElement?.clientHeight;
      canvas.height = parentHeight && parentHeight > 0 ? parentHeight : window.innerHeight;

      if (type === 'network' || type === 'dots') {
        initParticles();
      } else if (type === 'waves') {
        initWaves();
      }
    };
    
    // --- PARTICLE/NETWORK/DOTS LOGIC ---
    class Particle {
      x: number;
      y: number;
      baseRadius: number;
      radius: number;
      color: string;
      dx: number;
      dy: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.baseRadius = radius;
        this.radius = radius;
        this.color = color;

        // For dots interaction
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy = -this.dy;
        
        this.x += this.dx;
        this.y += this.dy;
        
        // Mouse interaction
        if (mouse.x !== undefined && mouse.y !== undefined) {
            const dxMouse = mouse.x - this.x;
            const dyMouse = mouse.y - this.y;
            const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (type === 'network') { // Repel effect
                if (distance < mouse.radius) {
                    this.x -= dxMouse / 20;
                    this.y -= dyMouse / 20;
                }
            } else if (type === 'dots') { // Magnify effect
                if (distance < mouse.radius) {
                    this.radius = Math.min(this.baseRadius * 3, this.baseRadius + (mouse.radius - distance) / 10);
                } else if (this.radius > this.baseRadius) {
                    this.radius -= 0.1;
                }
            }
        }

        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const particleCount = type === 'network' ? (isMobile ? 40 : 80) : (isMobile ? 60 : 180);
      const speed = type === 'dots' ? 0.2 : 0.4;
      for (let i = 0; i < particleCount; i++) {
        const radius = type === 'network' ? Math.random() * 2 + 1 : Math.random() * 2.5 + 1;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * speed;
        const dy = (Math.random() - 0.5) * speed;
        const color = i % 3 === 0 ? 'rgba(123, 62, 240, 0.85)' : 'rgba(106, 236, 255, 0.85)';
        particles.push(new Particle(x, y, dx, dy, radius, color));
      }
    };
    
    const connect = () => {
      if(!ctx) return;
      let opacityValue = 1;
      const connectDistance = canvas.width / 8;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            (particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2
          );

          if (distance < connectDistance) {
            opacityValue = 1 - (distance / connectDistance);
            const lineColor = mouse.x && mouse.y && Math.sqrt((mouse.x - particles[a].x)**2 + (mouse.y - particles[a].y)**2) < mouse.radius ? 'rgba(123, 62, 240, ' : 'rgba(106, 236, 255, ';
            ctx.strokeStyle = `${lineColor}${opacityValue})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // --- WAVES LOGIC ---
    const initWaves = () => {
        waves = [];
        const isDarkMode = document.documentElement.classList.contains('dark');
        // More visible colors, slightly different for light/dark mode for better contrast
        const colors = isDarkMode
            ? ['rgba(123, 62, 240, 0.5)', 'rgba(106, 236, 255, 0.5)', 'rgba(123, 62, 240, 0.35)']
            : ['rgba(123, 62, 240, 0.4)', 'rgba(106, 236, 255, 0.4)', 'rgba(123, 62, 240, 0.25)'];
            
        for(let i = 0; i < colors.length; i++) {
            waves.push({
                timeModifier: (Math.random() * 0.4) + 0.6, // Slower, more varied speeds
                baseAmplitude: Math.random() * 60 + 50, // Taller waves
                amplitude: Math.random() * 60 + 50,
                wavelength: Math.random() * 200 + 250, // Longer, smoother waves
                color: colors[i],
                yOffset: Math.random() * canvas.height / 4 // Less vertical spread
            });
        }
    }
    
    const drawWaves = () => {
        if(!ctx) return;
        time += 0.015; // Increased speed for more fluid motion

        waves.forEach((wave, index) => {
            // Mouse interaction for waves
            if (mouse.y !== undefined) {
                const influence = (mouse.y / canvas.height) * 2 - 1; // -1 to 1
                wave.amplitude = wave.baseAmplitude + influence * 20 * (index + 1);
            }

            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.fillStyle = wave.color;

            for (let i = 0; i < canvas.width; i++) {
                // Raised the whole thing a bit to be more centered
                const y = Math.sin(i / wave.wavelength + time * wave.timeModifier) * wave.amplitude + canvas.height / 2 + wave.yOffset - 150;
                ctx.lineTo(i, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();
        });
    }

    // --- ANIMATION LOOP ---
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (type === 'network') {
        particles.forEach(p => p.update());
        connect();
      } else if (type === 'dots') {
        particles.forEach(p => p.update());
      } else if (type === 'waves') {
        drawWaves();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- SETUP ---
    window.addEventListener('resize', resizeCanvas);
    
    setTimeout(resizeCanvas, 100);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
