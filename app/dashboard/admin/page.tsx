'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  systemHealthData, 
  classroomAnalytics,
  generateStudents,
  Student,
  attendanceChartData
} from '@/lib/data';
import { 
  Server,
  Database,
  Wifi,
  Camera,
  Mic,
  BarChart3,
  HardDrive,
  Globe,
  Activity,
  Users,
  UserCheck,
  UserX,
  Percent,
  Beaker,
  CheckCircle,
  Brain,
  Volume2,
  TrendingUp,
  Shield,
  Settings,
  Download,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setStudents(generateStudents());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const systemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'AI Engine': Brain,
    'Database': Database,
    'Server': Server,
    'Network': Wifi,
    'Camera Systems': Camera,
    'Voice Assistant': Mic,
    'Analytics Engine': BarChart3,
    'Storage': HardDrive,
    'API Gateway': Globe,
  };

  const analyticsStats = [
    { label: 'Total Students', value: classroomAnalytics.totalStudents, icon: Users, color: 'bg-primary/20 text-primary' },
    { label: 'Active Now', value: classroomAnalytics.activeStudents, icon: UserCheck, color: 'bg-nature/20 text-nature' },
    { label: 'Inactive', value: classroomAnalytics.inactiveStudents, icon: UserX, color: 'bg-destructive/20 text-destructive' },
    { label: 'Attendance', value: `${classroomAnalytics.attendancePercent}%`, icon: Percent, color: 'bg-secondary/20 text-secondary' },
    { label: 'Experiments Running', value: classroomAnalytics.experimentsRunning, icon: Beaker, color: 'bg-support/20 text-support' },
    { label: 'Completed Today', value: classroomAnalytics.experimentsCompleted, icon: CheckCircle, color: 'bg-nature/20 text-nature' },
    { label: 'AI Corrections', value: classroomAnalytics.aiCorrectionsIssued, icon: Brain, color: 'bg-accent/20 text-accent' },
    { label: 'Voice Sessions', value: classroomAnalytics.voiceAssistanceSessions, icon: Volume2, color: 'bg-secondary/20 text-secondary' },
  ];

  const pieData = [
    { name: 'Active', value: classroomAnalytics.activeStudents, color: 'oklch(0.65 0.2 145)' },
    { name: 'Inactive', value: classroomAnalytics.inactiveStudents, color: 'oklch(0.55 0.22 25)' },
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
          <p className="text-muted-foreground">Welcome back, Aravind • System Administrator</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
            <Activity className="w-4 h-4 text-nature animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              All Systems Operational • {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-nature" />
              System Health
            </CardTitle>
            <Badge variant="outline" className="bg-nature/10 text-nature border-nature/30">
              9/9 Online
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {systemHealthData.map((system, index) => {
                const Icon = systemIcons[system.name] || Server;
                return (
                  <SystemHealthCard 
                    key={system.name} 
                    system={system} 
                    Icon={Icon}
                    delay={index * 0.05}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Classroom Analytics Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-secondary" />
              Classroom Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analyticsStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Digital Classroom View & Analytics Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Digital Classroom View */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-support" />
                Digital Classroom View
              </CardTitle>
              <Badge variant="outline">30 Desks</Badge>
            </CardHeader>
            <CardContent>
              <DigitalClassroomView students={students} />
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-nature" />
                  <span className="text-xs text-muted-foreground">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-xs text-muted-foreground">Empty</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-xs text-muted-foreground">AI Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-nature" />
                Student Activity Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'oklch(0.99 0.002 240 / 0.9)', 
                        border: '1px solid oklch(0.90 0.01 240)',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-8 mt-4">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              Weekly Attendance & Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceChartData}>
                  <defs>
                    <linearGradient id="adminAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.65 0.15 185)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="oklch(0.65 0.15 185)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="adminEngagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.55 0.2 290)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="oklch(0.55 0.2 290)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 240)" />
                  <XAxis dataKey="day" stroke="oklch(0.45 0.02 240)" fontSize={12} />
                  <YAxis stroke="oklch(0.45 0.02 240)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(0.99 0.002 240 / 0.9)', 
                      border: '1px solid oklch(0.90 0.01 240)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="oklch(0.65 0.15 185)" 
                    fill="url(#adminAttendance)" 
                    strokeWidth={2}
                    name="Attendance %"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="oklch(0.55 0.2 290)" 
                    fill="url(#adminEngagement)" 
                    strokeWidth={2}
                    name="Engagement %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Management & Reports */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <UserManagementRow label="Teachers" count={8} color="bg-secondary/20 text-secondary" />
              <UserManagementRow label="Students" count={120} color="bg-nature/20 text-nature" />
              <UserManagementRow label="Admins" count={3} color="bg-support/20 text-support" />
              <div className="pt-4 border-t border-border/50">
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Users & Permissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Generate Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ReportButton label="Attendance Report" />
              <ReportButton label="Experiment Report" />
              <ReportButton label="Learning Analytics" />
              <ReportButton label="AI Assistance Report" />
              <ReportButton label="Student Performance" />
              <div className="pt-4 border-t border-border/50 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Learning Engagement Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-nature" />
              Overall Learning Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Learning Engagement</span>
                  <span className="font-bold text-foreground">{classroomAnalytics.learningEngagement}%</span>
                </div>
                <Progress value={classroomAnalytics.learningEngagement} className="h-4" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-nature">{classroomAnalytics.learningEngagement}%</div>
                <div className="text-sm text-muted-foreground">Excellent</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// System Health Card
function SystemHealthCard({ 
  system, 
  Icon,
  delay
}: { 
  system: typeof systemHealthData[0]; 
  Icon: React.ComponentType<{ className?: string }>;
  delay: number;
}) {
  const statusColors = {
    online: 'bg-nature text-nature',
    offline: 'bg-destructive text-destructive',
    warning: 'bg-accent text-accent',
  };

  const statusBg = {
    online: 'bg-nature/10 border-nature/30',
    offline: 'bg-destructive/10 border-destructive/30',
    warning: 'bg-accent/10 border-accent/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`p-4 rounded-xl border ${statusBg[system.status]} hover:shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg ${statusColors[system.status].replace('text-', 'bg-')}/20 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${statusColors[system.status].split(' ')[1]}`} />
        </div>
        <div className={`w-2 h-2 rounded-full ${statusColors[system.status].split(' ')[0]} status-indicator`} />
      </div>
      <p className="font-medium text-sm text-foreground mb-1">{system.name}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{system.uptime}</span>
        <span>{system.load}% load</span>
      </div>
      <Progress value={system.load} className="h-1 mt-2" />
    </motion.div>
  );
}

// Digital Classroom View
function DigitalClassroomView({ students }: { students: Student[] }) {
  const getDeskStatus = (student: Student) => {
    if (student.attendanceStatus === 'away') return 'bg-destructive/30 border-destructive/50';
    if (student.aiStatus === 'assisting') return 'bg-secondary/30 border-secondary/50';
    return 'bg-nature/30 border-nature/50';
  };

  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
      {students.map((student) => (
        <motion.div
          key={student.id}
          whileHover={{ scale: 1.1 }}
          className={`aspect-square rounded-lg border-2 ${getDeskStatus(student)} flex items-center justify-center cursor-pointer transition-all`}
          title={`${student.name} - Desk ${student.deskNumber}`}
        >
          <span className="text-[10px] font-medium text-foreground">{student.deskNumber}</span>
        </motion.div>
      ))}
    </div>
  );
}

// User Management Row
function UserManagementRow({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Users className="w-5 h-5" />
        </div>
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <Badge variant="outline">{count}</Badge>
    </div>
  );
}

// Report Button
function ReportButton({ label }: { label: string }) {
  return (
    <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
      <FileText className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}
