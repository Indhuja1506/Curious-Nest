'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  generateStudents, 
  generateAlerts, 
  generateMistakes, 
  generateVoiceAssistance,
  attendanceChartData,
  focusTrendData,
  Student,
  DeskAlert,
  ExperimentMistake,
  VoiceAssistance
} from '@/lib/data';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Brain, 
  Mic,
  Video,
  Lightbulb,
  Activity,
  TrendingUp,
  Eye,
  AlertCircle,
  Beaker,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

export default function TeacherDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [alerts, setAlerts] = useState<DeskAlert[]>([]);
  const [mistakes, setMistakes] = useState<ExperimentMistake[]>([]);
  const [voiceAssistance, setVoiceAssistance] = useState<VoiceAssistance[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setStudents(generateStudents());
    setAlerts(generateAlerts());
    setMistakes(generateMistakes());
    setVoiceAssistance(generateVoiceAssistance());

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate statistics
  const presentStudents = students.filter(s => s.attendanceStatus === 'present').length;
  const awayStudents = students.filter(s => s.attendanceStatus === 'away').length;
  const needsHelpStudents = students.filter(s => s.focusStatus === 'needs-help').length;
  const experimentsRunning = students.filter(s => s.experimentStatus === 'in-progress').length;

  const stats = [
    { label: 'Present', value: presentStudents, icon: Users, color: 'bg-nature/20 text-nature' },
    { label: 'Away', value: awayStudents, icon: AlertTriangle, color: 'bg-destructive/20 text-destructive' },
    { label: 'Need Help', value: needsHelpStudents, icon: AlertCircle, color: 'bg-accent/20 text-accent' },
    { label: 'Experiments', value: experimentsRunning, icon: Beaker, color: 'bg-secondary/20 text-secondary' },
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
          <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Bhagya • Class Size: 30 Students</p>
        </div>
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
          <Activity className="w-4 h-4 text-nature animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            Live • {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Classroom View */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-secondary" />
                Live Classroom Monitoring
              </CardTitle>
              <Badge variant="outline" className="bg-nature/10 text-nature border-nature/30">
                30 Desks
              </Badge>
            </CardHeader>
            <CardContent>
              <ClassroomGrid students={students} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Desk Movement Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Desk Movement Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <DeskAlertCard key={alert.id} alert={alert} />
              ))}
              {alerts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-nature" />
                  <p>All students at their desks</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Experiment Monitoring & Voice Assistance */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Experiment Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-support" />
                AI Experiment Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mistakes.map((mistake) => (
                <ExperimentMistakeCard key={mistake.id} mistake={mistake} />
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Voice Assistance Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-secondary" />
                Voice Assistance Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {voiceAssistance.map((assistance) => (
                <VoiceAssistanceCard key={assistance.id} assistance={assistance} />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Classroom Heatmap & Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Classroom Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-nature" />
                Classroom Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClassroomHeatmap students={students} />
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-nature" />
                  <span className="text-xs text-muted-foreground">Focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs text-muted-foreground">Distracted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-xs text-muted-foreground">Away</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-xs text-muted-foreground">AI Help</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Weekly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceChartData}>
                    <defs>
                      <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.15 185)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="oklch(0.65 0.15 185)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
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
                      fill="url(#attendanceGradient)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="oklch(0.55 0.2 290)" 
                      fill="url(#engagementGradient)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Teacher Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Teacher Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InsightCard 
                title="Students Needing Help"
                items={['Aarav - Struggling with circuits', 'Diya - Titration confusion', 'Rohan - Formula assistance needed']}
                color="text-accent"
              />
              <InsightCard 
                title="Most Common Mistakes"
                items={['Polarity reversal (8 times)', 'Wrong measurements (5 times)', 'Missing safety gear (3 times)']}
                color="text-destructive"
              />
              <InsightCard 
                title="Top Performers"
                items={['Indu - 98% accuracy', 'Priya - 96% accuracy', 'Nikhil - 94% accuracy']}
                color="text-nature"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Classroom Grid Component
function ClassroomGrid({ students }: { students: Student[] }) {
  const getStatusColor = (student: Student) => {
    if (student.attendanceStatus === 'away') return 'bg-destructive/20 border-destructive/50';
    if (student.focusStatus === 'needs-help') return 'bg-accent/20 border-accent/50';
    if (student.aiStatus === 'assisting') return 'bg-secondary/20 border-secondary/50';
    if (student.experimentStatus === 'in-progress') return 'bg-nature/20 border-nature/50';
    return 'bg-muted/50 border-border';
  };

  const getStatusIndicator = (student: Student) => {
    if (student.attendanceStatus === 'away') return 'bg-destructive';
    if (student.focusStatus === 'needs-help') return 'bg-accent';
    if (student.aiStatus === 'assisting') return 'bg-secondary';
    if (student.experimentStatus === 'in-progress') return 'bg-nature';
    return 'bg-muted-foreground';
  };

  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
      {students.map((student) => (
        <motion.div
          key={student.id}
          whileHover={{ scale: 1.1 }}
          className={`relative p-2 rounded-lg border ${getStatusColor(student)} cursor-pointer transition-all duration-200 group`}
        >
          <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${getStatusIndicator(student)} status-indicator`} />
          <div className="text-center">
            <p className="text-xs font-medium text-foreground truncate">{student.name.split(' ')[0]}</p>
            <p className="text-[10px] text-muted-foreground">{student.deskNumber}</p>
          </div>
          
          {/* Hover tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
            <div className="glass rounded-lg p-3 text-xs whitespace-nowrap shadow-lg">
              <p className="font-medium text-foreground">{student.name}</p>
              <p className="text-muted-foreground">Desk: {student.deskNumber}</p>
              <p className="text-muted-foreground capitalize">Status: {student.attendanceStatus}</p>
              <p className="text-muted-foreground capitalize">Experiment: {student.experimentStatus}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Classroom Heatmap Component
function ClassroomHeatmap({ students }: { students: Student[] }) {
  const getHeatColor = (student: Student) => {
    if (student.focusStatus === 'focused') return 'bg-nature';
    if (student.focusStatus === 'distracted') return 'bg-accent';
    if (student.focusStatus === 'away') return 'bg-destructive';
    if (student.focusStatus === 'needs-help') return 'bg-secondary';
    return 'bg-muted';
  };

  return (
    <div className="grid grid-cols-10 gap-1">
      {students.map((student) => (
        <motion.div
          key={student.id}
          whileHover={{ scale: 1.2 }}
          className={`aspect-square rounded ${getHeatColor(student)} opacity-70 hover:opacity-100 transition-all cursor-pointer`}
          title={`${student.name} - ${student.focusStatus}`}
        />
      ))}
    </div>
  );
}

// Desk Alert Card
function DeskAlertCard({ alert }: { alert: DeskAlert }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-destructive/10 border border-destructive/30 rounded-xl p-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-foreground">{alert.studentName}</span>
            <Badge variant="outline" className="text-xs">Desk {alert.deskNumber}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Left at {alert.timeLeft}</p>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1 text-destructive">
              <Clock className="w-3 h-3" />
              {alert.duration}
            </span>
            <span className="text-muted-foreground">{alert.attendanceImpact}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Experiment Mistake Card
function ExperimentMistakeCard({ mistake }: { mistake: ExperimentMistake }) {
  const statusColors = {
    detected: 'bg-accent/10 border-accent/30 text-accent',
    corrected: 'bg-secondary/10 border-secondary/30 text-secondary',
    resolved: 'bg-nature/10 border-nature/30 text-nature',
  };

  return (
    <div className="bg-muted/30 rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="font-medium text-foreground">{mistake.studentName}</span>
          <p className="text-xs text-muted-foreground">{mistake.experiment}</p>
        </div>
        <Badge className={statusColors[mistake.status]} variant="outline">
          {mistake.status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{mistake.issue}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-secondary">
          <Brain className="w-3 h-3" />
          {mistake.aiResponse}
        </span>
        <span className="text-muted-foreground">{mistake.time}</span>
      </div>
    </div>
  );
}

// Voice Assistance Card
function VoiceAssistanceCard({ assistance }: { assistance: VoiceAssistance }) {
  const icons = {
    voice: Mic,
    video: Video,
    hint: Lightbulb,
  };
  const Icon = icons[assistance.helpType];

  return (
    <div className="bg-muted/30 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-foreground">{assistance.studentName}</span>
            <span className="text-xs text-muted-foreground">{assistance.time}</span>
          </div>
          <p className="text-sm text-muted-foreground">{assistance.description}</p>
          <div className="mt-2">
            {assistance.resolved ? (
              <Badge variant="outline" className="bg-nature/10 text-nature border-nature/30 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Resolved
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                In Progress
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Insight Card
function InsightCard({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="bg-muted/30 rounded-xl p-4">
      <h4 className={`font-medium mb-3 ${color}`}>{title}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')} mt-2 shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
