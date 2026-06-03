'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { 
  systemHealthData,
  learningStyleAnalytics,
  experimentAnalytics,
  generateRecentErrors,
  getSystemStatus,
  generateLiveData,
  SystemHealth,
  RecentError,
  SystemStatus
} from '@/lib/data';
import { 
  Server,
  Database,
  Activity,
  Users,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  FileText,
  Beaker
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recentErrors, setRecentErrors] = useState<RecentError[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeDesks, setActiveDesks] = useState(0);

  const fetchData = useCallback(() => {
    const students = generateLiveData();
    setTotalRecords(students.length);
    setTotalStudents(students.length);
    setActiveDesks(students.filter(s => s.StudentPresent).length);
    setRecentErrors(generateRecentErrors());
    setSystemStatus(getSystemStatus());
  }, []);

  useEffect(() => {
    fetchData();
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const refreshTimer = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(refreshTimer);
    };
  }, [fetchData]);

  const topStats = [
    { label: 'Total Records', value: totalRecords, icon: FileText, color: 'bg-primary/10 text-primary border-primary/20' },
    { label: 'Total Students', value: totalStudents, icon: Users, color: 'bg-secondary/10 text-secondary border-secondary/20' },
    { label: 'Active Desks', value: activeDesks, icon: Beaker, color: 'bg-nature/10 text-nature border-nature/20' },
    { label: 'System Health', value: '3/3', icon: CheckCircle, color: 'bg-nature/10 text-nature border-nature/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
            <Activity className="w-4 h-4 text-nature animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              All Systems Online • {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="w-3 h-3" />
            <span>Auto-refresh: 5s</span>
          </div>
        </div>
      </motion.div>

      {/* Top Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {topStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`border ${stat.color.split(' ')[2]} bg-card card-shadow`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color.split(' ').slice(0, 2).join(' ')} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* System Health Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card card-shadow border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Server className="w-5 h-5 text-nature" />
              System Health
            </CardTitle>
            <Badge variant="outline" className="bg-nature/10 text-nature border-nature/30">
              All Systems Operational
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {systemHealthData.map((system, index) => (
                <SystemHealthCard key={system.name} system={system} index={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Learning Style Analytics - Donut Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card card-shadow border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5 text-accent" />
                Learning Style Analytics
              </CardTitle>
              <p className="text-xs text-muted-foreground">Distribution of learning preferences</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={learningStyleAnalytics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {learningStyleAnalytics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'oklch(1.0 0 0 / 0.95)', 
                        border: '1px solid oklch(0.92 0.005 240)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px oklch(0.20 0.02 240 / 0.1)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {learningStyleAnalytics.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experiment Analytics - Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card card-shadow border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Beaker className="w-5 h-5 text-secondary" />
                Experiment Analytics
              </CardTitle>
              <p className="text-xs text-muted-foreground">Students per experiment</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={experimentAnalytics} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 240)" />
                    <XAxis type="number" stroke="oklch(0.50 0.02 240)" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="oklch(0.50 0.02 240)" fontSize={11} width={80} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'oklch(1.0 0 0 / 0.95)', 
                        border: '1px solid oklch(0.92 0.005 240)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px oklch(0.20 0.02 240 / 0.1)'
                      }} 
                    />
                    <Bar 
                      dataKey="students" 
                      fill="oklch(0.70 0.12 230)" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Errors Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-card card-shadow border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="w-5 h-5 text-support" />
                Recent Errors
              </CardTitle>
              <p className="text-xs text-muted-foreground">Latest detected mistakes</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentErrors.map((error) => (
                <div 
                  key={error.id}
                  className="bg-support/10 border border-support/20 rounded-xl p-3"
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-medium text-sm text-foreground">{error.studentName}</span>
                    <span className="text-xs text-muted-foreground">{error.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{error.errorDescription}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-card card-shadow border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Database className="w-5 h-5 text-primary" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemStatus && (
                <>
                  <StatusRow 
                    icon={Clock}
                    label="Last Update Time"
                    value={systemStatus.lastUpdateTime}
                    color="text-primary"
                  />
                  <StatusRow 
                    icon={RefreshCw}
                    label="Data Refresh Interval"
                    value={systemStatus.dataRefreshInterval}
                    color="text-secondary"
                  />
                  <StatusRow 
                    icon={Users}
                    label="Total Active Sessions"
                    value={String(systemStatus.totalActiveSessions)}
                    color="text-nature"
                  />
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// System Health Card Component
function SystemHealthCard({ system, index }: { system: SystemHealth; index: number }) {
  const statusConfig = {
    online: {
      bg: 'bg-nature/10',
      border: 'border-nature/30',
      dot: 'bg-nature',
      text: 'text-nature',
    },
    offline: {
      bg: 'bg-destructive/10',
      border: 'border-destructive/30',
      dot: 'bg-destructive',
      text: 'text-destructive',
    },
    warning: {
      bg: 'bg-support/10',
      border: 'border-support/30',
      dot: 'bg-support',
      text: 'text-support',
    },
  };

  const config = statusConfig[system.status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`${config.bg} ${config.border} border rounded-xl p-4`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${config.dot} status-indicator`} />
          <span className="font-medium text-sm text-foreground">{system.name}</span>
        </div>
        <Badge variant="outline" className={`text-[10px] ${config.bg} ${config.text} ${config.border}`}>
          {system.status}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{system.description}</p>
    </motion.div>
  );
}

// Status Row Component
function StatusRow({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string; 
  color: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
