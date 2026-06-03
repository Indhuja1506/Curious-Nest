'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { AnimatedOwl } from '@/components/animated-owl';
import { FloatingParticles } from '@/components/floating-particles';
import { motivationalMessages } from '@/lib/data';
import { useEffect, useState } from 'react';
import { 
  Brain, 
  Microscope, 
  Users, 
  BarChart3, 
  Shield,
  Sparkles,
  ChevronRight,
  Play,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate motivational messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <FloatingParticles />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 mt-4">
          <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground">Curious Nest</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Features
              </Link>
              <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Testimonials
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              {/* Rotating Motivational Message */}
              <div className="h-16 mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={messageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 glass rounded-full px-5 py-3"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground italic">&quot;{motivationalMessages[messageIndex]}&quot;</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
                <span className="text-foreground">Curious</span>
                <br />
                <span className="gradient-text">
                  Nest
                </span>
              </h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium"
              >
                Explore • Learn • Grow
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto lg:mx-0"
              >
                AI-powered smart classrooms where curiosity meets intelligence. 
                Real-time monitoring, personalized guidance, and immersive experiments.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/login">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto group">
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/dashboard/teacher">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-muted">
                    View Dashboard
                  </Button>
                </Link>
                <Button size="lg" variant="ghost" className="w-full sm:w-auto group text-muted-foreground hover:text-foreground">
                  <Play className="w-4 h-4 mr-2" />
                  Request Demo
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Schools</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Owl Mascot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <AnimatedOwl size="xl" showParticles={true} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              The Future of Learning
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience education like never before with AI-powered tools that adapt to every student
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to transform your classroom experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-8 text-center h-full card-shadow border border-border hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold gradient-text">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden card-shadow border border-border"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="relative z-10">
              <AnimatedOwl size="md" showParticles={false} />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground mt-8">
                Ready to Transform Learning?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join thousands of educators who are already using Curious Nest to create engaging, personalized learning experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Free Trial
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Curious Nest</span>
            </div>
            <p className="text-muted-foreground text-sm">
              2026 Curious Nest. Explore • Learn • Grow
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Brain,
    title: 'AI Experiment Monitoring',
    description: 'Real-time detection of experiment mistakes with intelligent corrections and voice guidance.',
    color: 'from-primary to-primary/50',
  },
  {
    icon: Users,
    title: 'Smart Desk Detection',
    description: 'Instant alerts when students leave their workspace with complete activity timeline.',
    color: 'from-secondary to-secondary/50',
  },
  {
    icon: Microscope,
    title: 'Live Lab Sessions',
    description: 'Interactive experiments with step-by-step AI guidance and progress tracking.',
    color: 'from-nature to-nature/50',
  },
  {
    icon: BarChart3,
    title: 'Learning Analytics',
    description: 'Comprehensive insights into student engagement, focus trends, and performance.',
    color: 'from-accent to-accent/50',
  },
  {
    icon: Zap,
    title: 'Voice Assistance',
    description: 'AI-powered voice help, video tutorials, and hint cards for instant support.',
    color: 'from-primary to-secondary/50',
  },
  {
    icon: Shield,
    title: 'Classroom Heatmap',
    description: 'Visual overview of student focus levels and engagement across the classroom.',
    color: 'from-support to-support/50',
  },
];

const steps = [
  {
    title: 'Setup Your Classroom',
    description: 'Configure your smart desks and connect AI monitoring systems in minutes.',
  },
  {
    title: 'Students Begin Learning',
    description: 'Students start experiments while AI monitors progress and provides guidance.',
  },
  {
    title: 'Track & Optimize',
    description: 'View real-time insights and analytics to improve learning outcomes.',
  },
];

interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    color: string;
  };
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-card rounded-2xl p-6 h-full card-shadow border border-border hover:border-primary/30 transition-all duration-300">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
        <p className="text-muted-foreground text-sm">{feature.description}</p>
      </div>
    </motion.div>
  );
}
