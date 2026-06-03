'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AnimatedOwlProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showParticles?: boolean;
}

export function AnimatedOwl({ size = 'lg', showParticles = true }: AnimatedOwlProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  
  const sizeMap = {
    sm: 120,
    md: 200,
    lg: 300,
    xl: 400,
  };

  const dimensions = sizeMap[size];

  // Blink every few seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect behind owl */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: dimensions * 1.2,
          height: dimensions * 1.2,
          background: 'radial-gradient(circle, oklch(0.65 0.15 185 / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating educational particles */}
      {showParticles && (
        <>
          <FloatingParticle icon="💡" delay={0} x={-80} y={-60} />
          <FloatingParticle icon="🪐" delay={0.5} x={80} y={-40} />
          <FloatingParticle icon="⚡" delay={1} x={-90} y={40} />
          <FloatingParticle icon="⚙️" delay={1.5} x={90} y={60} />
          <FloatingParticle icon="📚" delay={2} x={-60} y={80} />
          <FloatingParticle icon="🌿" delay={2.5} x={60} y={-80} />
        </>
      )}

      {/* Main owl container with animations */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        {/* Owl image */}
        <motion.div
          style={{
            width: dimensions,
            height: dimensions,
          }}
          animate={{
            scaleY: isBlinking ? 0.95 : 1,
          }}
          transition={{ duration: 0.1 }}
        >
          <Image
            src="/images/owl-mascot.png"
            alt="Curious Nest Owl Mascot"
            width={dimensions}
            height={dimensions}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

interface FloatingParticleProps {
  icon: string;
  delay: number;
  x: number;
  y: number;
}

function FloatingParticle({ icon, delay, x, y }: FloatingParticleProps) {
  return (
    <motion.div
      className="absolute text-2xl"
      initial={{ opacity: 0, x, y }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [x, x + 10, x - 5, x],
        y: [y, y - 20, y - 10, y],
        scale: [0.8, 1, 1, 0.8],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {icon}
    </motion.div>
  );
}
