'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatedOwl } from '@/components/animated-owl';
import { FloatingParticles } from '@/components/floating-particles';
import { motivationalMessages, demoUsers, UserRole } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Sparkles, 
  Eye, 
  EyeOff, 
  User, 
  Lock,
  GraduationCap,
  BookOpen,
  Settings,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    setMotivationalMessage(motivationalMessages[randomIndex]);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = demoUsers.find(
      u => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      // Store user in localStorage for demo
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect based on role
      switch (role) {
        case 'teacher':
          router.push('/dashboard/teacher');
          break;
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'student':
          router.push('/dashboard/student');
          break;
      }
    } else {
      setError('Invalid credentials. Please check username, password, and role.');
      setIsLoading(false);
    }
  };

  const roles = [
    { value: 'teacher' as UserRole, label: 'Teacher', icon: GraduationCap },
    { value: 'student' as UserRole, label: 'Student', icon: BookOpen },
    { value: 'admin' as UserRole, label: 'Admin', icon: Settings },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <FloatingParticles />
      
      {/* Back to Home */}
      <Link href="/" className="fixed top-6 left-6 z-50">
        <Button variant="ghost" size="sm" className="glass">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Owl & Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col items-center text-center"
          >
            <AnimatedOwl size="lg" showParticles={true} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-foreground">Curious</span>{' '}
                <span className="bg-gradient-to-r from-secondary to-support bg-clip-text text-transparent">
                  Nest
                </span>
              </h1>
              <p className="text-muted-foreground">Explore • Learn • Grow</p>
            </motion.div>

            {/* Motivational Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 glass rounded-2xl px-6 py-4 max-w-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">Today&apos;s Message</span>
              </div>
              <p className="text-muted-foreground text-sm">{motivationalMessage}</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-3xl p-8 md:p-12 max-w-md mx-auto">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Curious Nest</h1>
                  <p className="text-xs text-muted-foreground">Explore • Learn • Grow</p>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
                <p className="text-muted-foreground text-sm">Sign in to continue your learning journey</p>
              </div>

              {/* Role Selector */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-3 block">Select Role</Label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                        role === value
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-background/50 border-border/50 focus:border-secondary"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-secondary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-sm text-center bg-destructive/10 rounded-lg py-2"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center mb-4">Demo Credentials</p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-secondary/10 rounded-lg p-3 text-center">
                    <div className="font-medium text-secondary mb-1">Teacher</div>
                    <div className="text-muted-foreground">bhagya</div>
                    <div className="text-muted-foreground">demo123</div>
                  </div>
                  <div className="bg-nature/10 rounded-lg p-3 text-center">
                    <div className="font-medium text-nature mb-1">Student</div>
                    <div className="text-muted-foreground">indu</div>
                    <div className="text-muted-foreground">demo123</div>
                  </div>
                  <div className="bg-support/10 rounded-lg p-3 text-center">
                    <div className="font-medium text-support mb-1">Admin</div>
                    <div className="text-muted-foreground">aravind</div>
                    <div className="text-muted-foreground">demo123</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
