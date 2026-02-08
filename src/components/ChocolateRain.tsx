
import React, { useEffect, useRef } from 'react';

const ChocolateRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chocolates: Chocolate[] = [];
        const chocolateTypes = ['🍫', '🍬', '🍩', '🍪', '🧁'];

        class Chocolate {
            x: number;
            y: number;
            size: number;
            speed: number;
            text: string;
            rotation: number;
            rotationSpeed: number;

            constructor() {
                this.x = Math.random() * (canvas?.width || 0);
                this.y = Math.random() * (canvas?.height || 0) - (canvas?.height || 0);
                this.size = Math.random() * 20 + 10;
                this.speed = Math.random() * 2 + 1;
                this.text = chocolateTypes[Math.floor(Math.random() * chocolateTypes.length)];
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 2;
            }

            update() {
                this.y += this.speed;
                this.rotation += this.rotationSpeed;
                if (this.y > (canvas?.height || 0)) {
                    this.y = -50;
                    this.x = Math.random() * (canvas?.width || 0);
                }
            }

            draw() {
                if (!ctx) return;
                ctx.font = `${this.size}px Arial`;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.fillText(this.text, 0, 0);
                ctx.restore();
            }
        }

        const init = () => {
            for (let i = 0; i < 50; i++) {
                chocolates.push(new Chocolate());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            chocolates.forEach((choco) => {
                choco.update();
                choco.draw();
            });
            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
        />
    );
};

export default ChocolateRain;
