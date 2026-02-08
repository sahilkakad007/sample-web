import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface ClickBurst {
  id: number;
  x: number;
  y: number;
}

const ChocolateCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);
  const [particleId, setParticleId] = useState(0);

  const addParticle = useCallback((x: number, y: number) => {
    const newParticle: Particle = {
      id: particleId,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 6 + 3,
      opacity: 1,
    };
    setParticleId(prev => prev + 1);
    setParticles(prev => [...prev.slice(-15), newParticle]);
  }, [particleId]);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let frameCount = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );
      
      frameCount++;
      if (distance > 10 && frameCount % 3 === 0) {
        addParticle(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      const burst: ClickBurst = {
        id: Date.now(),
        x: position.x,
        y: position.y,
      };
      setClickBursts(prev => [...prev, burst]);
      setTimeout(() => {
        setClickBursts(prev => prev.filter(b => b.id !== burst.id));
      }, 600);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [addParticle, position.x, position.y]);

  // Fade out particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.05 }))
          .filter(p => p.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Particle Trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            background: `radial-gradient(circle, #FF6B6B 0%, #C53030 100%)`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px rgba(229, 62, 62, 0.5)',
          }}
        />
      ))}

      {/* Click Burst Effects */}
      {clickBursts.map(burst => (
        <div key={burst.id} className="fixed pointer-events-none z-[9997]" style={{ left: burst.x, top: burst.y }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-chocolate-rain"
              style={{
                width: 8 + Math.random() * 6,
                height: 8 + Math.random() * 6,
              background: i % 2 === 0 
                  ? '#C53030' 
                  : '#FF6B6B',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                animation: `chocolateRain 0.6s ease-out forwards`,
                animationDelay: `${i * 0.03}s`,
                left: Math.cos(i * 45 * Math.PI / 180) * 30,
                top: Math.sin(i * 45 * Math.PI / 180) * 30,
              }}
            />
          ))}
        </div>
      ))}

      {/* Main Cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-150 ${
          isHovering ? 'scale-150' : ''
        } ${isClicking ? 'scale-90' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Chocolate Heart Shape */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          className={`drop-shadow-lg transition-all duration-200 ${
            isHovering ? 'animate-wiggle' : ''
          }`}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(78, 52, 46, 0.5))',
          }}
        >
          <defs>
            <linearGradient id="chocolateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="30%" stopColor="#E53E3E" />
              <stop offset="100%" stopColor="#C53030" />
            </linearGradient>
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#chocolateGradient)"
          />
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#shineGradient)"
            opacity="0.6"
          />
        </svg>

        {/* Glow effect on hover */}
        {isHovering && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(255, 107, 107, 0.4) 0%, transparent 70%)',
              width: 50,
              height: 50,
              transform: 'translate(-35%, -35%)',
            }}
          />
        )}
      </div>
    </>
  );
};

export default ChocolateCursor;
