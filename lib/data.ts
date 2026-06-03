// Motivational messages
export const motivationalMessages = [
  "Curiosity unlocked. Ready for today's adventure?",
  "Your next discovery is waiting.",
  "Learning level activated.",
  "Brain loading... 98%",
  "Today's experiment may change tomorrow.",
  "Warning: Excessive curiosity detected.",
  "Ready to break something and learn why?",
  "Future inventor detected.",
  "Science is curiosity with evidence.",
  "Achievement unlocked: Showing up.",
  "Exploration mode enabled.",
  "Let's build the future together.",
];

export type UserRole = 'teacher' | 'student' | 'admin';

export interface User {
  username: string;
  password: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

export const demoUsers: User[] = [
  { username: 'bhagya', password: 'demo123', role: 'teacher', name: 'Bhagya' },
  { username: 'aravind', password: 'demo123', role: 'admin', name: 'Aravind' },
  { username: 'indu', password: 'demo123', role: 'student', name: 'Indu' },
];

export type AttendanceStatus = 'present' | 'absent' | 'away' | 'late';
export type ExperimentStatus = 'not-started' | 'in-progress' | 'completed' | 'paused';
export type FocusStatus = 'focused' | 'distracted' | 'away' | 'needs-help';
export type AIStatus = 'idle' | 'assisting' | 'monitoring' | 'correcting';

export interface Student {
  id: string;
  name: string;
  deskNumber: string;
  attendanceStatus: AttendanceStatus;
  experimentStatus: ExperimentStatus;
  focusStatus: FocusStatus;
  aiStatus: AIStatus;
  loginTime?: string;
  focusScore: number;
  learningStreak: number;
  currentExperiment?: string;
  currentStep?: number;
  totalSteps?: number;
}

// Generate 30 student names as requested
export const studentNames = [
  'Indu', 'Sameer', 'Nikhil', 'Ria', 'Aarav',
  'Priya', 'Rohan', 'Ananya', 'Arjun', 'Diya',
  'Vivaan', 'Saanvi', 'Aditya', 'Ishaan', 'Kavya',
  'Krishna', 'Meera', 'Yash', 'Tanvi', 'Reyansh',
  'Aisha', 'Vihaan', 'Nisha', 'Dev', 'Pooja',
  'Arnav', 'Siya', 'Karan', 'Sneha', 'Dhruv'
];

// Generate desk numbers (A1-A10, B1-B10, C1-C10)
const generateDeskNumbers = (): string[] => {
  const desks: string[] = [];
  ['A', 'B', 'C'].forEach(row => {
    for (let i = 1; i <= 10; i++) {
      desks.push(`${row}${i}`);
    }
  });
  return desks;
};

const deskNumbers = generateDeskNumbers();

// Generate realistic mock student data
export const generateStudents = (): Student[] => {
  return studentNames.map((name, index) => {
    const statuses: AttendanceStatus[] = ['present', 'present', 'present', 'present', 'away', 'late'];
    const expStatuses: ExperimentStatus[] = ['in-progress', 'in-progress', 'completed', 'not-started', 'paused'];
    const focusStatuses: FocusStatus[] = ['focused', 'focused', 'focused', 'distracted', 'needs-help', 'away'];
    const aiStatuses: AIStatus[] = ['idle', 'idle', 'monitoring', 'assisting', 'correcting'];
    
    const experiments = [
      "Ohm's Law Verification",
      "Pendulum Period",
      "Acid-Base Titration",
      "Plant Cell Observation",
      "Electric Circuit",
      "Light Refraction",
      "Magnetism Study"
    ];
    
    return {
      id: `student-${index + 1}`,
      name,
      deskNumber: deskNumbers[index],
      attendanceStatus: statuses[Math.floor(Math.random() * statuses.length)],
      experimentStatus: expStatuses[Math.floor(Math.random() * expStatuses.length)],
      focusStatus: focusStatuses[Math.floor(Math.random() * focusStatuses.length)],
      aiStatus: aiStatuses[Math.floor(Math.random() * aiStatuses.length)],
      loginTime: `${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM`,
      focusScore: 70 + Math.floor(Math.random() * 30),
      learningStreak: Math.floor(Math.random() * 15) + 1,
      currentExperiment: experiments[Math.floor(Math.random() * experiments.length)],
      currentStep: Math.floor(Math.random() * 5) + 1,
      totalSteps: 6,
    };
  });
};

export interface DeskAlert {
  id: string;
  studentName: string;
  deskNumber: string;
  timeLeft: string;
  duration: string;
  attendanceImpact: string;
}

export interface ExperimentMistake {
  id: string;
  studentName: string;
  experiment: string;
  issue: string;
  aiResponse: string;
  status: 'detected' | 'corrected' | 'resolved';
  time: string;
}

export interface VoiceAssistance {
  id: string;
  studentName: string;
  helpType: 'voice' | 'video' | 'hint';
  description: string;
  resolved: boolean;
  time: string;
}

// Generate mock alerts
export const generateAlerts = (): DeskAlert[] => [
  {
    id: 'alert-1',
    studentName: 'Indu',
    deskNumber: 'A1',
    timeLeft: '10:24 AM',
    duration: '3m 24s',
    attendanceImpact: 'Present but Inactive'
  },
  {
    id: 'alert-2',
    studentName: 'Sameer',
    deskNumber: 'A2',
    timeLeft: '10:15 AM',
    duration: '8m 12s',
    attendanceImpact: 'Marked Away'
  }
];

// Generate mock experiment mistakes
export const generateMistakes = (): ExperimentMistake[] => [
  {
    id: 'mistake-1',
    studentName: 'Nikhil',
    experiment: "Ohm's Law Verification",
    issue: 'Incorrect resistor connection - polarity reversed',
    aiResponse: 'Voice Hint Sent',
    status: 'resolved',
    time: '10:12 AM'
  },
  {
    id: 'mistake-2',
    studentName: 'Ria',
    experiment: 'Acid-Base Titration',
    issue: 'Wrong indicator used',
    aiResponse: 'Video Tutorial Played',
    status: 'corrected',
    time: '10:18 AM'
  },
  {
    id: 'mistake-3',
    studentName: 'Aarav',
    experiment: 'Electric Circuit',
    issue: 'Missing ground connection',
    aiResponse: 'Hint Card Shown',
    status: 'detected',
    time: '10:22 AM'
  },
  {
    id: 'mistake-4',
    studentName: 'Priya',
    experiment: 'Light Refraction',
    issue: 'Incorrect angle measurement',
    aiResponse: 'Voice Correction',
    status: 'resolved',
    time: '10:05 AM'
  }
];

// Generate mock voice assistance logs
export const generateVoiceAssistance = (): VoiceAssistance[] => [
  {
    id: 'voice-1',
    studentName: 'Diya',
    helpType: 'voice',
    description: 'Explained circuit diagram symbols',
    resolved: true,
    time: '9:45 AM'
  },
  {
    id: 'voice-2',
    studentName: 'Vivaan',
    helpType: 'video',
    description: 'Titration procedure walkthrough',
    resolved: true,
    time: '9:52 AM'
  },
  {
    id: 'voice-3',
    studentName: 'Rohan',
    helpType: 'hint',
    description: 'Formula reminder for resistance calculation',
    resolved: false,
    time: '10:08 AM'
  },
  {
    id: 'voice-4',
    studentName: 'Ananya',
    helpType: 'voice',
    description: 'Step-by-step pendulum setup',
    resolved: true,
    time: '10:15 AM'
  }
];

// Student achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export const achievements: Achievement[] = [
  { id: '1', name: 'Perfect Attendance', description: 'Attend 30 consecutive days', icon: '🎯', unlocked: true, date: 'May 15, 2026' },
  { id: '2', name: 'Fast Learner', description: 'Complete 5 experiments ahead of schedule', icon: '⚡', unlocked: true, date: 'May 20, 2026' },
  { id: '3', name: 'Experiment Master', description: 'Complete 20 experiments with 90%+ accuracy', icon: '🔬', unlocked: true, date: 'May 28, 2026' },
  { id: '4', name: 'AI Explorer', description: 'Use AI assistance 50 times effectively', icon: '🤖', unlocked: false },
  { id: '5', name: 'Top Performer', description: 'Rank #1 in class for a week', icon: '🏆', unlocked: false },
  { id: '6', name: 'Curiosity Champion', description: 'Ask 100 questions to AI', icon: '💡', unlocked: true, date: 'June 1, 2026' },
];

// Admin system health data
export interface SystemHealth {
  name: string;
  status: 'online' | 'offline' | 'warning';
  uptime: string;
  load: number;
}

export const systemHealthData: SystemHealth[] = [
  { name: 'AI Engine', status: 'online', uptime: '99.99%', load: 45 },
  { name: 'Database', status: 'online', uptime: '99.95%', load: 32 },
  { name: 'Server', status: 'online', uptime: '99.98%', load: 58 },
  { name: 'Network', status: 'online', uptime: '99.90%', load: 28 },
  { name: 'Camera Systems', status: 'online', uptime: '99.85%', load: 67 },
  { name: 'Voice Assistant', status: 'online', uptime: '99.92%', load: 41 },
  { name: 'Analytics Engine', status: 'warning', uptime: '98.50%', load: 89 },
  { name: 'Storage', status: 'online', uptime: '99.99%', load: 52 },
  { name: 'API Gateway', status: 'online', uptime: '99.97%', load: 38 },
];

// Admin classroom analytics
export interface ClassroomAnalytics {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  attendancePercent: number;
  experimentsRunning: number;
  experimentsCompleted: number;
  aiCorrectionsIssued: number;
  voiceAssistanceSessions: number;
  learningEngagement: number;
}

export const classroomAnalytics: ClassroomAnalytics = {
  totalStudents: 30,
  activeStudents: 27,
  inactiveStudents: 3,
  attendancePercent: 92,
  experimentsRunning: 18,
  experimentsCompleted: 45,
  aiCorrectionsIssued: 23,
  voiceAssistanceSessions: 56,
  learningEngagement: 87,
};

// Chart data for analytics
export const attendanceChartData = [
  { day: 'Mon', attendance: 95, engagement: 88 },
  { day: 'Tue', attendance: 92, engagement: 91 },
  { day: 'Wed', attendance: 88, engagement: 85 },
  { day: 'Thu', attendance: 94, engagement: 92 },
  { day: 'Fri', attendance: 90, engagement: 89 },
];

export const focusTrendData = [
  { time: '9:00', focused: 28, distracted: 2 },
  { time: '9:30', focused: 26, distracted: 4 },
  { time: '10:00', focused: 24, distracted: 6 },
  { time: '10:30', focused: 27, distracted: 3 },
  { time: '11:00', focused: 25, distracted: 5 },
];

export const experimentProgressData = [
  { name: "Ohm's Law", completed: 85 },
  { name: 'Titration', completed: 72 },
  { name: 'Pendulum', completed: 90 },
  { name: 'Circuits', completed: 65 },
  { name: 'Refraction', completed: 78 },
];

// Timesheet data for students
export interface TimesheetEntry {
  label: string;
  startTime: string;
  endTime: string;
  duration: string;
  type: 'login' | 'study' | 'experiment' | 'break' | 'logout';
}

export const generateTimesheet = (): TimesheetEntry[] => [
  { label: 'Login', startTime: '8:45 AM', endTime: '8:45 AM', duration: '-', type: 'login' },
  { label: 'Study Session', startTime: '8:45 AM', endTime: '9:30 AM', duration: '45m', type: 'study' },
  { label: 'Experiment: Ohm\'s Law', startTime: '9:30 AM', endTime: '10:15 AM', duration: '45m', type: 'experiment' },
  { label: 'Short Break', startTime: '10:15 AM', endTime: '10:30 AM', duration: '15m', type: 'break' },
  { label: 'Experiment: Titration', startTime: '10:30 AM', endTime: '11:15 AM', duration: '45m', type: 'experiment' },
  { label: 'Desk Presence', startTime: '8:45 AM', endTime: 'Now', duration: '2h 45m', type: 'study' },
];

// AI Guidance history for students
export interface AIGuidance {
  id: string;
  type: 'voice' | 'hint' | 'video' | 'correction';
  title: string;
  description: string;
  time: string;
  resolved: boolean;
}

export const generateAIGuidance = (): AIGuidance[] => [
  { id: '1', type: 'voice', title: 'Circuit Setup Help', description: 'Guided through proper resistor placement', time: '9:35 AM', resolved: true },
  { id: '2', type: 'hint', title: 'Formula Reminder', description: 'V = IR formula displayed', time: '9:42 AM', resolved: true },
  { id: '3', type: 'correction', title: 'Polarity Error', description: 'Corrected battery connection orientation', time: '9:55 AM', resolved: true },
  { id: '4', type: 'video', title: 'Titration Technique', description: 'Watched proper pipette handling', time: '10:35 AM', resolved: true },
  { id: '5', type: 'hint', title: 'Safety Reminder', description: 'Goggles required for acid handling', time: '10:40 AM', resolved: false },
];
