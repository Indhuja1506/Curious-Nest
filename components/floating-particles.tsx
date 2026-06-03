'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'dot' | 'leaf' | 'glow';
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = [];
    
    // Generate dots
    for (let i = 0; i < 20; i++) {
      generatedParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
        type: 'dot',
      });
    }

    // Generate leaves
    for (let i = 20; i < 30; i++) {
      generatedParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 20 + 15,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 10,
        type: 'leaf',
      });
    }

    // Generate glowing orbs
    for (let i = 30; i < 38; i++) {
      generatedParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 40,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 3,
        type: 'glow',
      });
    }

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => {
        if (particle.type === 'dot') {
          return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-secondary/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        }

        if (particle.type === 'leaf') {
          return (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                fontSize: particle.size,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, 30, -20, 40, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              🍃
            </motion.div>
          );
        }

        if (particle.type === 'glow') {
          return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, oklch(0.65 0.15 185 / 0.15) 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
