"use client";

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.floating-card'));
    
    // Set initial random positions
    cards.forEach((card) => {
      const element = card as HTMLElement;
      element.style.setProperty('--x', `${Math.random() * 100}%`);
      element.style.setProperty('--y', `${Math.random() * 100}%`);
      element.style.setProperty('--rotation', `${(Math.random() * 20) - 10}deg`);
      element.style.setProperty('--delay', `${Math.random() * 2}s`);
    });

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        const factor = (index % 3 + 1) * 10; // Different movement factors for different cards
        const offsetX = (x - 0.5) * factor;
        const offsetY = (y - 0.5) * factor;
        
        element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(var(--rotation))`;
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-xl"
    >
      {[
        { name: "Dashboard", delay: "0s", className: "bg-primary/10" },
        { name: "Authentication", delay: "0.2s", className: "bg-blue-500/10" },
        { name: "Payments", delay: "0.4s", className: "bg-green-500/10" },
        { name: "Database", delay: "0.6s", className: "bg-yellow-500/10" },
        { name: "Analytics", delay: "0.8s", className: "bg-purple-500/10" },
      ].map((card, index) => (
        <div
          key={index}
          className={cn(
            "floating-card p-4 rounded-lg border shadow-sm transition-all duration-1000",
            "animate-float opacity-0",
            card.className
          )}
          style={{
            animationDelay: card.delay,
            animationFillMode: "forwards",
          }}
        >
          <div className="font-semibold">{card.name}</div>
          <div className="h-20 w-48 rounded-md bg-muted/50 mt-2"></div>
        </div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent bottom-0 h-32"></div>
    </div>
  );
}