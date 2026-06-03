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
  Shield,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [motivationalMessage, setMotivationalMessage] = useState(motivationalMessages[0]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('teacher');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Rotate motivational messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMotivationalMessage(motivationalMessages[messageIndex]);
  }, [messageIndex]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 800));

    const user = demoUsers.find(
      u => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push(`/dashboard/${role}`);
    } else {
      setError('Invalid credentials. Please check username, password, and role.');
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setError('');
  };

  const roles = [
    { value: 'teacher' as UserRole, label: 'Teacher Login', icon: GraduationCap, color: 'bg-primary hover:bg-primary/90' },
    { value: 'admin' as UserRole, label: 'Admin Login', icon: Shield, color: 'bg-secondary hover:bg-secondary/90' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center">
      <FloatingParticles />
      
      {/* Subtle background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Back to Home */}
      <Link href="/" className="fixed top-6 left-6 z-50">
        <Button variant="ghost" size="sm" className="glass text-foreground">
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
                <span className="gradient-text">Curious Nest</span>
              </h1>
              <p className="text-muted-foreground text-lg">Explore • Learn • Grow</p>
            </motion.div>

            {/* Rotating Motivational Message */}
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-8 glass rounded-2xl px-6 py-4 max-w-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Inspiration</span>
              </div>
              <p className="text-muted-foreground text-sm italic">&quot;{motivationalMessage}&quot;</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-3xl p-8 md:p-12 max-w-md mx-auto card-shadow border border-border">
              {/* Mobile Logo */}
              <div className="lg:hidden flex flex-col items-center mb-8">
                <AnimatedOwl size="sm" showParticles={false} />
                <h1 className="text-2xl font-bold gradient-text mt-4">Curious Nest</h1>
                <p className="text-xs text-muted-foreground">Explore • Learn • Grow</p>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
                <p className="text-muted-foreground text-sm">Sign in to your dashboard</p>
              </div>

              {/* Role Selector Buttons */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-3 block">Select Role</Label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map(({ value, label, icon: Icon, color }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRoleSelect(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 border-2 ${
                        role === value
                          ? `${color} text-primary-foreground border-transparent shadow-lg`
                          : 'bg-muted/30 text-muted-foreground border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{label}</span>
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
                      className="pl-10 bg-background border-border focus:border-primary"
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
                      className="pl-10 pr-10 bg-background border-border focus:border-primary"
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
                    className="text-destructive text-sm text-center bg-destructive/10 rounded-lg py-2 px-3"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-4 font-medium">Demo Credentials</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-primary/10 rounded-xl p-4 text-center border border-primary/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">Teacher</span>
                    </div>
                    <div className="text-muted-foreground space-y-1">
                      <p><span className="text-foreground font-medium">User:</span> teacher</p>
                      <p><span className="text-foreground font-medium">Pass:</span> curious123</p>
                    </div>
                  </div>
                  <div className="bg-secondary/10 rounded-xl p-4 text-center border border-secondary/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-secondary" />
                      <span className="font-semibold text-secondary">Admin</span>
                    </div>
                    <div className="text-muted-foreground space-y-1">
                      <p><span className="text-foreground font-medium">User:</span> admin</p>
                      <p><span className="text-foreground font-medium">Pass:</span> admin123</p>
                    </div>
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
