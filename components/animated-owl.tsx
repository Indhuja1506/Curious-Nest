'use client';

import { motion } from 'framer-motion';

interface AnimatedOwlProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showParticles?: boolean;
}

export function AnimatedOwl({ size = 'lg', showParticles = true }: AnimatedOwlProps) {
  const sizeMap = {
    sm: 120,
    md: 200,
    lg: 300,
    xl: 400,
  };

  const dimensions = sizeMap[size];
  const scale = dimensions / 300;

  return (
    <div className="relative flex items-center justify-center" style={{ width: dimensions, height: dimensions }}>
      {/* Glow effect behind owl */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: dimensions * 1.3,
          height: dimensions * 1.3,
          background: 'radial-gradient(circle, oklch(0.55 0.12 185 / 0.2) 0%, oklch(0.70 0.12 230 / 0.1) 40%, transparent 70%)',
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
          <FloatingIcon icon="book" delay={0} x={-90 * scale} y={-70 * scale} scale={scale} />
          <FloatingIcon icon="beaker" delay={0.5} x={90 * scale} y={-50 * scale} scale={scale} />
          <FloatingIcon icon="lightbulb" delay={1} x={-100 * scale} y={50 * scale} scale={scale} />
          <FloatingIcon icon="atom" delay={1.5} x={100 * scale} y={70 * scale} scale={scale} />
          <FloatingIcon icon="pencil" delay={2} x={-70 * scale} y={90 * scale} scale={scale} />
          <FloatingIcon icon="star" delay={2.5} x={70 * scale} y={-90 * scale} scale={scale} />
        </>
      )}

      {/* Main owl container with floating animation */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width={dimensions}
          height={dimensions}
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Definitions for gradients */}
          <defs>
            {/* Body gradient - teal to mint */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.55 0.12 185)" />
              <stop offset="50%" stopColor="oklch(0.60 0.10 175)" />
              <stop offset="100%" stopColor="oklch(0.65 0.12 160)" />
            </linearGradient>
            
            {/* Face gradient - lighter */}
            <linearGradient id="faceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.95 0.02 185)" />
              <stop offset="100%" stopColor="oklch(0.90 0.03 185)" />
            </linearGradient>
            
            {/* Wing gradient */}
            <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.50 0.12 185)" />
              <stop offset="100%" stopColor="oklch(0.45 0.10 185)" />
            </linearGradient>
            
            {/* Eye gradient - sky blue */}
            <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.80 0.12 230)" />
              <stop offset="70%" stopColor="oklch(0.65 0.15 230)" />
              <stop offset="100%" stopColor="oklch(0.55 0.12 230)" />
            </radialGradient>
            
            {/* Belly gradient - cream */}
            <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.97 0.02 85)" />
              <stop offset="100%" stopColor="oklch(0.93 0.03 85)" />
            </linearGradient>
          </defs>

          {/* Ears/Tufts */}
          <ellipse cx="100" cy="75" rx="25" ry="40" fill="url(#bodyGradient)" />
          <ellipse cx="200" cy="75" rx="25" ry="40" fill="url(#bodyGradient)" />
          
          {/* Inner ear tufts */}
          <ellipse cx="100" cy="70" rx="15" ry="25" fill="url(#faceGradient)" />
          <ellipse cx="200" cy="70" rx="15" ry="25" fill="url(#faceGradient)" />

          {/* Main body */}
          <ellipse cx="150" cy="175" rx="95" ry="110" fill="url(#bodyGradient)" />
          
          {/* Belly */}
          <ellipse cx="150" cy="195" rx="60" ry="70" fill="url(#bellyGradient)" />
          
          {/* Face mask */}
          <ellipse cx="150" cy="140" rx="80" ry="65" fill="url(#faceGradient)" />

          {/* Wings */}
          <motion.ellipse
            cx="65"
            cy="180"
            rx="25"
            ry="55"
            fill="url(#wingGradient)"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: '65px 150px' }}
          />
          <motion.ellipse
            cx="235"
            cy="180"
            rx="25"
            ry="55"
            fill="url(#wingGradient)"
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: '235px 150px' }}
          />

          {/* Eye whites */}
          <circle cx="115" cy="130" r="32" fill="white" />
          <circle cx="185" cy="130" r="32" fill="white" />
          
          {/* Eye borders */}
          <circle cx="115" cy="130" r="32" fill="none" stroke="oklch(0.70 0.12 230)" strokeWidth="2" />
          <circle cx="185" cy="130" r="32" fill="none" stroke="oklch(0.70 0.12 230)" strokeWidth="2" />

          {/* Irises */}
          <circle cx="115" cy="132" r="22" fill="url(#eyeGradient)" />
          <circle cx="185" cy="132" r="22" fill="url(#eyeGradient)" />
          
          {/* Pupils - animated blink */}
          <BlinkingPupils />

          {/* Eye highlights */}
          <circle cx="108" cy="125" r="6" fill="white" opacity="0.8" />
          <circle cx="178" cy="125" r="6" fill="white" opacity="0.8" />
          <circle cx="120" cy="138" r="3" fill="white" opacity="0.5" />
          <circle cx="190" cy="138" r="3" fill="white" opacity="0.5" />

          {/* Beak */}
          <path
            d="M150 155 L140 175 L150 170 L160 175 Z"
            fill="oklch(0.75 0.15 55)"
          />
          <path
            d="M150 155 L150 170 L160 175 Z"
            fill="oklch(0.70 0.15 55)"
          />

          {/* Feet */}
          <ellipse cx="125" cy="275" rx="20" ry="8" fill="oklch(0.75 0.15 55)" />
          <ellipse cx="175" cy="275" rx="20" ry="8" fill="oklch(0.75 0.15 55)" />
          
          {/* Toes */}
          <circle cx="110" cy="278" r="5" fill="oklch(0.70 0.15 55)" />
          <circle cx="125" cy="280" r="5" fill="oklch(0.70 0.15 55)" />
          <circle cx="140" cy="278" r="5" fill="oklch(0.70 0.15 55)" />
          
          <circle cx="160" cy="278" r="5" fill="oklch(0.70 0.15 55)" />
          <circle cx="175" cy="280" r="5" fill="oklch(0.70 0.15 55)" />
          <circle cx="190" cy="278" r="5" fill="oklch(0.70 0.15 55)" />

          {/* Feather details on belly */}
          <path d="M120 180 Q130 185 120 190" stroke="oklch(0.85 0.05 85)" strokeWidth="2" fill="none" />
          <path d="M140 175 Q150 180 140 185" stroke="oklch(0.85 0.05 85)" strokeWidth="2" fill="none" />
          <path d="M160 175 Q170 180 160 185" stroke="oklch(0.85 0.05 85)" strokeWidth="2" fill="none" />
          <path d="M180 180 Q190 185 180 190" stroke="oklch(0.85 0.05 85)" strokeWidth="2" fill="none" />
          
          <path d="M130 200 Q140 205 130 210" stroke="oklch(0.85 0.05 85)" strokeWidth="2" fill="none" />
          <path d="M150 195 Q160 200 150 205" stroke="oklch(0.85 0.05 85)" strokeWidth="2" fill="none" />
          <path d="M170 200 Q180 205 170 210" stroke="oklch(0.85 0.05 85)" strokeWidth="2" fill="none" />
          
          {/* Graduation cap */}
          <g transform="translate(150, 45)">
            <rect x="-35" y="0" width="70" height="8" fill="oklch(0.25 0.02 240)" rx="2" />
            <polygon points="0,-25 -45,0 0,10 45,0" fill="oklch(0.30 0.02 240)" />
            <polygon points="0,-25 0,10 45,0" fill="oklch(0.25 0.02 240)" />
            <line x1="35" y1="0" x2="50" y2="25" stroke="oklch(0.75 0.15 55)" strokeWidth="2" />
            <circle cx="50" cy="28" r="5" fill="oklch(0.75 0.15 55)" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

// Blinking pupils component
function BlinkingPupils() {
  return (
    <motion.g
      animate={{
        scaleY: [1, 1, 0.1, 1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        times: [0, 0.45, 0.5, 0.55, 1],
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: '150px 132px' }}
    >
      <circle cx="115" cy="132" r="10" fill="oklch(0.15 0.02 240)" />
      <circle cx="185" cy="132" r="10" fill="oklch(0.15 0.02 240)" />
    </motion.g>
  );
}

// Floating educational icons
interface FloatingIconProps {
  icon: 'book' | 'beaker' | 'lightbulb' | 'atom' | 'pencil' | 'star';
  delay: number;
  x: number;
  y: number;
  scale: number;
}

function FloatingIcon({ icon, delay, x, y, scale }: FloatingIconProps) {
  const iconSize = 24 * scale;
  
  const icons = {
    book: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="oklch(0.55 0.12 185)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="oklch(0.55 0.12 185)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    beaker: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <path d="M9 3h6M10 3v6.5L5 21h14l-5-11.5V3" stroke="oklch(0.70 0.12 230)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14h8" stroke="oklch(0.70 0.12 230)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    lightbulb: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" stroke="oklch(0.75 0.15 55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    atom: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="oklch(0.75 0.10 290)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="oklch(0.75 0.10 290)" strokeWidth="1.5" transform="rotate(0 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="oklch(0.75 0.10 290)" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="oklch(0.75 0.10 290)" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      </svg>
    ),
    pencil: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="oklch(0.75 0.12 160)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    star: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="oklch(0.75 0.15 55 / 0.3)">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="oklch(0.75 0.15 55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, x, y }}
      animate={{
        opacity: [0, 0.8, 0.8, 0],
        x: [x, x + 15, x - 10, x],
        y: [y, y - 25, y - 15, y],
        scale: [0.8, 1, 1, 0.8],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {icons[icon]}
    </motion.div>
  );
}
