'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { 
  generateLiveData,
  StudentRecord
} from '@/lib/data';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Activity,
  AlertCircle,
  Beaker,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TeacherDashboard() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Fetch data function
  const fetchData = useCallback(() => {
    // In production, this would fetch from /api/live
    const data = generateLiveData();
    // Sort by timestamp descending (newest first)
    data.sort((a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime());
    setStudents(data);
    setLastRefresh(new Date());
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Update time every second
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Auto refresh every 5 seconds
    const refreshTimer = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(refreshTimer);
    };
  }, [fetchData]);

  // Calculate statistics
  const totalStudents = students.length;
  const presentStudents = students.filter(s => s.StudentPresent).length;
  const absentStudents = students.filter(s => !s.StudentPresent).length;
  const activeExperiments = new Set(students.filter(s => s.StudentPresent).map(s => s.CurrentExperiment)).size;
  const mistakesDetected = students.filter(s => s.MistakeDetected).length;

  // Get alerts
  const absentAlerts = students.filter(s => !s.StudentPresent);
  const mistakeAlerts = students.filter(s => s.MistakeDetected);
  const longAwayAlerts = students.filter(s => s.AwayDurationSeconds > 300);

  const stats = [
    { label: 'Total Students', value: totalStudents, icon: Users, color: 'bg-primary/10 text-primary border-primary/20' },
    { label: 'Present Students', value: presentStudents, icon: CheckCircle, color: 'bg-nature/10 text-nature border-nature/20' },
    { label: 'Absent Students', value: absentStudents, icon: AlertTriangle, color: 'bg-destructive/10 text-destructive border-destructive/20' },
    { label: 'Active Experiments', value: activeExperiments, icon: Beaker, color: 'bg-secondary/10 text-secondary border-secondary/20' },
    { label: 'Mistakes Detected', value: mistakesDetected, icon: AlertCircle, color: 'bg-support/10 text-support border-support/20' },
  ];

  const formatDuration = (seconds: number): string => {
    if (seconds === 0) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTimestamp = (isoString: string): string => {
    return new Date(isoString).toLocaleTimeString();
  };

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
          <p className="text-muted-foreground">Real-time classroom monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
            <Activity className="w-4 h-4 text-nature animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              Live • {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="w-3 h-3" />
            <span>Auto-refresh: 5s</span>
          </div>
        </div>
      </motion.div>

      {/* Top Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`border ${stat.color.split(' ')[2]} bg-card card-shadow`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${stat.color.split(' ').slice(0, 2).join(' ')} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Student Activity Table - Spans 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-card card-shadow border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Activity className="w-5 h-5 text-primary" />
                Live Student Activity
              </CardTitle>
              <Badge variant="outline" className="bg-nature/10 text-nature border-nature/30">
                {presentStudents} Active
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="max-h-[500px] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-xs font-semibold">Student ID</TableHead>
                        <TableHead className="text-xs font-semibold">Name</TableHead>
                        <TableHead className="text-xs font-semibold">Desk</TableHead>
                        <TableHead className="text-xs font-semibold">Experiment</TableHead>
                        <TableHead className="text-xs font-semibold">Learning Style</TableHead>
                        <TableHead className="text-xs font-semibold">Present</TableHead>
                        <TableHead className="text-xs font-semibold">Mistake</TableHead>
                        <TableHead className="text-xs font-semibold min-w-[150px]">Error</TableHead>
                        <TableHead className="text-xs font-semibold min-w-[150px]">Fix</TableHead>
                        <TableHead className="text-xs font-semibold">Away</TableHead>
                        <TableHead className="text-xs font-semibold">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow 
                          key={student.StudentID}
                          className={`${
                            student.MistakeDetected 
                              ? 'bg-destructive/5' 
                              : !student.StudentPresent 
                                ? 'bg-support/5' 
                                : ''
                          }`}
                        >
                          <TableCell className="text-xs font-mono">{student.StudentID}</TableCell>
                          <TableCell className="text-xs font-medium">{student.StudentName}</TableCell>
                          <TableCell className="text-xs">{student.DeskID}</TableCell>
                          <TableCell className="text-xs max-w-[120px] truncate" title={student.CurrentExperiment}>
                            {student.CurrentExperiment}
                          </TableCell>
                          <TableCell className="text-xs">
                            <Badge variant="outline" className="text-[10px] bg-accent/10 text-accent border-accent/30">
                              {student.PreferredLearningStyle}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`text-[10px] ${
                                student.StudentPresent 
                                  ? 'bg-nature/10 text-nature border-nature/30' 
                                  : 'bg-destructive/10 text-destructive border-destructive/30'
                              }`}
                            >
                              {student.StudentPresent ? 'Yes' : 'No'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`text-[10px] ${
                                student.MistakeDetected 
                                  ? 'bg-destructive/10 text-destructive border-destructive/30' 
                                  : 'bg-nature/10 text-nature border-nature/30'
                              }`}
                            >
                              {student.MistakeDetected ? 'Yes' : 'No'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate" title={student.ErrorDescription}>
                            {student.ErrorDescription || '-'}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate" title={student.SuggestedFix}>
                            {student.SuggestedFix || '-'}
                          </TableCell>
                          <TableCell className="text-xs">
                            {student.AwayDurationSeconds > 0 ? (
                              <span className="text-support font-medium">{formatDuration(student.AwayDurationSeconds)}</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatTimestamp(student.Timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Real-Time Alerts Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card card-shadow border-border h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="w-5 h-5 text-support" />
                Real-Time Alerts
              </CardTitle>
              <p className="text-xs text-muted-foreground">Refreshes every 5 seconds</p>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[450px] overflow-auto">
              {/* Absent Students */}
              {absentAlerts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-destructive" />
                    Students Absent ({absentAlerts.length})
                  </h4>
                  {absentAlerts.map((student) => (
                    <AlertCard 
                      key={student.StudentID}
                      type="absent"
                      student={student}
                      formatDuration={formatDuration}
                    />
                  ))}
                </div>
              )}

              {/* Mistakes Detected */}
              {mistakeAlerts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-destructive" />
                    Mistakes Detected ({mistakeAlerts.length})
                  </h4>
                  {mistakeAlerts.map((student) => (
                    <AlertCard 
                      key={student.StudentID}
                      type="mistake"
                      student={student}
                      formatDuration={formatDuration}
                    />
                  ))}
                </div>
              )}

              {/* Long Away Duration */}
              {longAwayAlerts.filter(s => s.StudentPresent).length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3 h-3 text-support" />
                    Long Away Duration
                  </h4>
                  {longAwayAlerts.filter(s => s.StudentPresent).map((student) => (
                    <AlertCard 
                      key={student.StudentID}
                      type="away"
                      student={student}
                      formatDuration={formatDuration}
                    />
                  ))}
                </div>
              )}

              {/* No Alerts */}
              {absentAlerts.length === 0 && mistakeAlerts.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-nature" />
                  <p className="text-sm font-medium text-foreground">All Clear</p>
                  <p className="text-xs text-muted-foreground">No alerts at this time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Last refresh indicator */}
      <div className="text-center text-xs text-muted-foreground">
        Last updated: {lastRefresh.toLocaleTimeString()}
      </div>
    </div>
  );
}

// Alert Card Component
interface AlertCardProps {
  type: 'absent' | 'mistake' | 'away';
  student: StudentRecord;
  formatDuration: (seconds: number) => string;
}

function AlertCard({ type, student, formatDuration }: AlertCardProps) {
  const configs = {
    absent: {
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
      iconColor: 'text-destructive',
      icon: AlertTriangle,
    },
    mistake: {
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
      iconColor: 'text-destructive',
      icon: AlertCircle,
    },
    away: {
      bgColor: 'bg-support/10',
      borderColor: 'border-support/30',
      iconColor: 'text-support',
      icon: Clock,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-xl p-3`}>
      <div className="flex items-start gap-2">
        <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-sm text-foreground">{student.StudentName}</span>
            <Badge variant="outline" className="text-[10px]">Desk {student.DeskID}</Badge>
          </div>
          {type === 'absent' && (
            <p className="text-xs text-muted-foreground">
              Away for {formatDuration(student.AwayDurationSeconds)}
            </p>
          )}
          {type === 'mistake' && (
            <p className="text-xs text-muted-foreground truncate" title={student.ErrorDescription}>
              {student.ErrorDescription}
            </p>
          )}
          {type === 'away' && (
            <p className="text-xs text-muted-foreground">
              Away for {formatDuration(student.AwayDurationSeconds)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
