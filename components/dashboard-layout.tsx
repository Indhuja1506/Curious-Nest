'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  GraduationCap,
  BookOpen,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/data';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'teacher':
        return GraduationCap;
      case 'student':
        return BookOpen;
      case 'admin':
        return Shield;
      default:
        return Users;
    }
  };

  const getNavItems = (role: string) => {
    const baseItems = [
      { href: `/dashboard/${role}`, label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (role === 'teacher') {
      return [
        ...baseItems,
        { href: `/dashboard/${role}/classroom`, label: 'Classroom', icon: Users },
        { href: `/dashboard/${role}/analytics`, label: 'Analytics', icon: BarChart3 },
      ];
    }

    if (role === 'admin') {
      return [
        ...baseItems,
        { href: `/dashboard/${role}/users`, label: 'Users', icon: Users },
        { href: `/dashboard/${role}/analytics`, label: 'Analytics', icon: BarChart3 },
        { href: `/dashboard/${role}/settings`, label: 'Settings', icon: Settings },
      ];
    }

    return [
      ...baseItems,
      { href: `/dashboard/${role}/experiments`, label: 'Experiments', icon: BarChart3 },
    ];
  };

  const navItems = user ? getNavItems(user.role) : [];
  const RoleIcon = user ? getRoleIcon(user.role) : Users;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        className="fixed lg:static inset-y-0 left-0 w-64 bg-sidebar z-50 lg:translate-x-0 transition-transform duration-300"
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <span className="font-semibold text-sidebar-foreground">Curious Nest</span>
                <p className="text-xs text-sidebar-foreground/60">Explore • Learn • Grow</p>
              </div>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-sidebar-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="mb-6 p-3 rounded-xl bg-sidebar-accent/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center">
                  <RoleIcon className="w-5 h-5 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sidebar-foreground">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 glass border-b border-border/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Curious Nest</span>
            </div>
            <div className="w-6" />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
