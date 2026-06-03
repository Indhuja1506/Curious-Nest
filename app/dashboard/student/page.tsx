'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  generateTimesheet, 
  generateAIGuidance,
  achievements,
  experimentProgressData,
  TimesheetEntry,
  AIGuidance
} from '@/lib/data';
import { 
  User,
  Clock,
  Target,
  Flame,
  Award,
  Beaker,
  CheckCircle,
  Brain,
  Mic,
  Video,
  Lightbulb,
  AlertCircle,
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  RadialBarChart,
  RadialBar,
} from 'recharts';

export default function StudentDashboard() {
  const [timesheet, setTimesheet] = useState<TimesheetEntry[]>([]);
  const [aiGuidance, setAIGuidance] = useState<AIGuidance[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setTimesheet(generateTimesheet());
    setAIGuidance(generateAIGuidance());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Student data
  const studentData = {
    name: 'Indu',
    focusScore: 92,
    learningStreak: 12,
    attendanceStatus: 'Present',
    currentExperiment: "Ohm's Law Verification",
    currentStep: 4,
    totalSteps: 6,
    completionPercent: 67,
    expectedOutcome: 'Verify V = IR relationship',
  };

  // Learning analytics data
  const weeklyProgressData = [
    { day: 'Mon', progress: 85, focus: 88 },
    { day: 'Tue', progress: 78, focus: 82 },
    { day: 'Wed', progress: 92, focus: 90 },
    { day: 'Thu', progress: 88, focus: 85 },
    { day: 'Fri', progress: 95, focus: 94 },
  ];

  const focusRadialData = [
    { name: 'Focus Score', value: studentData.focusScore, fill: 'oklch(0.65 0.15 185)' },
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
          <h1 className="text-3xl font-bold text-foreground">Welcome, {studentData.name}</h1>
          <p className="text-muted-foreground">Your learning journey continues today</p>
        </div>
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
          <Activity className="w-4 h-4 text-nature animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            {currentTime.toLocaleTimeString()}
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
        <StatCard 
          icon={User} 
          label="Status" 
          value={studentData.attendanceStatus} 
          color="bg-nature/20 text-nature"
          delay={0}
        />
        <StatCard 
          icon={Target} 
          label="Focus Score" 
          value={`${studentData.focusScore}%`} 
          color="bg-secondary/20 text-secondary"
          delay={0.1}
        />
        <StatCard 
          icon={Flame} 
          label="Streak" 
          value={`${studentData.learningStreak} Days`} 
          color="bg-accent/20 text-accent"
          delay={0.2}
        />
        <StatCard 
          icon={Award} 
          label="Badges" 
          value={achievements.filter(a => a.unlocked).length.toString()} 
          color="bg-support/20 text-support"
          delay={0.3}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Experiment */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5 text-secondary" />
                Current Experiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{studentData.currentExperiment}</h3>
                    <p className="text-muted-foreground mt-1">Step {studentData.currentStep} of {studentData.totalSteps}</p>
                  </div>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/30">
                    In Progress
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-medium text-foreground">{studentData.completionPercent}%</span>
                  </div>
                  <Progress value={studentData.completionPercent} className="h-3" />
                </div>

                {/* Experiment Steps */}
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: studentData.totalSteps }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full ${
                        index < studentData.currentStep 
                          ? 'bg-nature' 
                          : index === studentData.currentStep 
                            ? 'bg-secondary animate-pulse' 
                            : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                {/* Expected Outcome */}
                <div className="bg-muted/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-accent" />
                    <span className="font-medium text-foreground">Expected Outcome</span>
                  </div>
                  <p className="text-muted-foreground">{studentData.expectedOutcome}</p>
                </div>

                {/* AI Suggestions */}
                <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-secondary" />
                    <span className="font-medium text-secondary">AI Suggestion</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Double-check your multimeter connections before taking the final reading. 
                    Ensure the resistor is properly seated in the breadboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Focus Score Radial */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Focus Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="60%" 
                    outerRadius="90%" 
                    data={focusRadialData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center -mt-8">
                <p className="text-4xl font-bold text-foreground">{studentData.focusScore}%</p>
                <p className="text-sm text-muted-foreground">Excellent Focus</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Guidance History & Timesheet */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Guidance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-support" />
                AI Guidance History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiGuidance.map((guidance) => (
                <GuidanceCard key={guidance.id} guidance={guidance} />
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Timesheet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Today&apos;s Timesheet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timesheet.map((entry, index) => (
                <TimesheetCard key={index} entry={entry} />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Learning Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-nature" />
              Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Progress Chart */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Weekly Progress</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyProgressData}>
                      <defs>
                        <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.65 0.15 185)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="oklch(0.65 0.15 185)" stopOpacity={0}/>
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
                        dataKey="progress" 
                        stroke="oklch(0.65 0.15 185)" 
                        fill="url(#progressGradient)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Experiment Progress */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Experiment Completion</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={experimentProgressData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 240)" />
                      <XAxis type="number" stroke="oklch(0.45 0.02 240)" fontSize={12} domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" stroke="oklch(0.45 0.02 240)" fontSize={10} width={80} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'oklch(0.99 0.002 240 / 0.9)', 
                          border: '1px solid oklch(0.90 0.01 240)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="completed" fill="oklch(0.65 0.15 185)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color, 
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string; 
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card className="glass border-border/50 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Guidance Card Component
function GuidanceCard({ guidance }: { guidance: AIGuidance }) {
  const icons = {
    voice: Mic,
    video: Video,
    hint: Lightbulb,
    correction: AlertCircle,
  };
  const colors = {
    voice: 'bg-secondary/20 text-secondary',
    video: 'bg-support/20 text-support',
    hint: 'bg-accent/20 text-accent',
    correction: 'bg-destructive/20 text-destructive',
  };
  const Icon = icons[guidance.type];

  return (
    <div className="bg-muted/30 rounded-xl p-3">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg ${colors[guidance.type]} flex items-center justify-center shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-sm text-foreground">{guidance.title}</span>
            <span className="text-xs text-muted-foreground">{guidance.time}</span>
          </div>
          <p className="text-xs text-muted-foreground">{guidance.description}</p>
        </div>
        {guidance.resolved && (
          <CheckCircle className="w-4 h-4 text-nature shrink-0" />
        )}
      </div>
    </div>
  );
}

// Timesheet Card Component
function TimesheetCard({ entry }: { entry: TimesheetEntry }) {
  const typeColors = {
    login: 'bg-nature/20 text-nature',
    study: 'bg-secondary/20 text-secondary',
    experiment: 'bg-support/20 text-support',
    break: 'bg-accent/20 text-accent',
    logout: 'bg-muted/50 text-muted-foreground',
  };

  return (
    <div className="flex items-center gap-3 bg-muted/30 rounded-xl p-3">
      <div className={`w-8 h-8 rounded-lg ${typeColors[entry.type]} flex items-center justify-center shrink-0`}>
        <Clock className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground truncate">{entry.label}</p>
        <p className="text-xs text-muted-foreground">
          {entry.startTime} - {entry.endTime}
        </p>
      </div>
      <Badge variant="outline" className="text-xs">
        {entry.duration}
      </Badge>
    </div>
  );
}

// Achievement Card Component
function AchievementCard({ achievement }: { achievement: typeof achievements[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`text-center p-4 rounded-xl transition-all ${
        achievement.unlocked 
          ? 'bg-accent/10 border border-accent/30' 
          : 'bg-muted/30 opacity-50'
      }`}
    >
      <div className="text-3xl mb-2">{achievement.icon}</div>
      <p className="font-medium text-sm text-foreground">{achievement.name}</p>
      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
      {achievement.unlocked && achievement.date && (
        <p className="text-xs text-accent mt-2">{achievement.date}</p>
      )}
    </motion.div>
  );
}
