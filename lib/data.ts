// Motivational messages - rotating every few seconds
export const motivationalMessages = [
  "Every experiment begins with curiosity.",
  "Learning becomes powerful when it is visible.",
  "Mistakes are proof that learning is happening.",
  "Explore. Learn. Grow.",
];

export type UserRole = 'teacher' | 'admin';

export interface User {
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

// Demo credentials as specified
export const demoUsers: User[] = [
  { username: 'teacher', password: 'curious123', role: 'teacher', name: 'Teacher' },
  { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin' },
];

// Data model with exact fields specified
export interface StudentRecord {
  StudentID: string;
  Timestamp: string;
  AwayDurationSeconds: number;
  CurrentExperiment: string;
  DeskID: string;
  ErrorDescription: string;
  MistakeDetected: boolean;
  PreferredLearningStyle: 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic';
  StudentName: string;
  StudentPresent: boolean;
  SuggestedFix: string;
}

// Generate 30 student names
export const studentNames = [
  'Indu', 'Sameer', 'Nikhil', 'Ria', 'Aarav',
  'Priya', 'Rohan', 'Ananya', 'Arjun', 'Diya',
  'Vivaan', 'Saanvi', 'Aditya', 'Ishaan', 'Kavya',
  'Krishna', 'Meera', 'Yash', 'Tanvi', 'Reyansh',
  'Aisha', 'Vihaan', 'Nisha', 'Dev', 'Pooja',
  'Arnav', 'Siya', 'Karan', 'Sneha', 'Dhruv'
];

// Generate desk IDs (A1-A10, B1-B10, C1-C10)
const generateDeskIDs = (): string[] => {
  const desks: string[] = [];
  ['A', 'B', 'C'].forEach(row => {
    for (let i = 1; i <= 10; i++) {
      desks.push(`${row}${i}`);
    }
  });
  return desks;
};

const deskIDs = generateDeskIDs();

const experiments = [
  "Ohm's Law Verification",
  "Pendulum Period",
  "Acid-Base Titration",
  "Plant Cell Observation",
  "Electric Circuit",
  "Light Refraction",
  "Magnetism Study"
];

const learningStyles: StudentRecord['PreferredLearningStyle'][] = [
  'Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'
];

const errorDescriptions = [
  'Incorrect resistor connection - polarity reversed',
  'Wrong indicator used in titration',
  'Missing ground connection',
  'Incorrect angle measurement',
  'Battery connection reversed',
  'Wrong chemical concentration',
  'Improper microscope focus',
  'Circuit not closed properly',
  '',
  '',
  '',
  ''
];

const suggestedFixes = [
  'Reverse the polarity of the resistor connections',
  'Use phenolphthalein indicator for acid-base titration',
  'Connect the ground wire to the negative terminal',
  'Use a protractor to measure the angle accurately',
  'Reverse the battery terminals',
  'Dilute the solution to the correct concentration',
  'Adjust the coarse and fine focus knobs',
  'Ensure all connections are secure and the circuit is closed',
  '',
  '',
  '',
  ''
];

// Generate realistic mock student data
export const generateStudentRecords = (): StudentRecord[] => {
  const now = new Date();
  
  return studentNames.map((name, index) => {
    const isPresent = Math.random() > 0.15; // 85% present
    const hasMistake = isPresent && Math.random() > 0.7; // 30% of present students have mistakes
    const awayDuration = !isPresent ? Math.floor(Math.random() * 600) + 60 : 0;
    const errorIndex = hasMistake ? Math.floor(Math.random() * 8) : Math.floor(Math.random() * 4) + 8;
    
    const timestamp = new Date(now.getTime() - Math.floor(Math.random() * 3600000));
    
    return {
      StudentID: `STU${String(index + 1).padStart(3, '0')}`,
      Timestamp: timestamp.toISOString(),
      AwayDurationSeconds: awayDuration,
      CurrentExperiment: experiments[Math.floor(Math.random() * experiments.length)],
      DeskID: deskIDs[index],
      ErrorDescription: errorDescriptions[errorIndex],
      MistakeDetected: hasMistake,
      PreferredLearningStyle: learningStyles[Math.floor(Math.random() * learningStyles.length)],
      StudentName: name,
      StudentPresent: isPresent,
      SuggestedFix: suggestedFixes[errorIndex],
    };
  });
};

// Generate data with more mistakes for demo
export const generateLiveData = (): StudentRecord[] => {
  const records = generateStudentRecords();
  // Ensure at least a few mistakes for demonstration
  const indicesToMistake = [2, 5, 8, 12, 15];
  indicesToMistake.forEach(idx => {
    if (records[idx]) {
      const errorIdx = Math.floor(Math.random() * 8);
      records[idx].MistakeDetected = true;
      records[idx].StudentPresent = true;
      records[idx].ErrorDescription = errorDescriptions[errorIdx];
      records[idx].SuggestedFix = suggestedFixes[errorIdx];
    }
  });
  
  // Ensure a few absent students
  const absentIndices = [3, 7, 14];
  absentIndices.forEach(idx => {
    if (records[idx]) {
      records[idx].StudentPresent = false;
      records[idx].AwayDurationSeconds = Math.floor(Math.random() * 600) + 120;
      records[idx].MistakeDetected = false;
      records[idx].ErrorDescription = '';
      records[idx].SuggestedFix = '';
    }
  });
  
  return records;
};

// Admin system health data
export interface SystemHealth {
  name: string;
  status: 'online' | 'offline' | 'warning';
  description: string;
}

export const systemHealthData: SystemHealth[] = [
  { name: 'DynamoDB Connected', status: 'online', description: 'Database operational' },
  { name: 'API Running', status: 'online', description: 'All endpoints responding' },
  { name: 'Dashboard Online', status: 'online', description: 'UI services active' },
];

// Learning style analytics for donut chart
export interface LearningStyleData {
  name: string;
  value: number;
  color: string;
}

export const learningStyleAnalytics: LearningStyleData[] = [
  { name: 'Visual', value: 8, color: 'oklch(0.55 0.12 185)' },
  { name: 'Auditory', value: 7, color: 'oklch(0.70 0.12 230)' },
  { name: 'Reading/Writing', value: 6, color: 'oklch(0.75 0.10 290)' },
  { name: 'Kinesthetic', value: 9, color: 'oklch(0.75 0.12 160)' },
];

// Experiment analytics
export interface ExperimentData {
  name: string;
  students: number;
}

export const experimentAnalytics: ExperimentData[] = [
  { name: "Ohm's Law", students: 6 },
  { name: 'Titration', students: 5 },
  { name: 'Pendulum', students: 4 },
  { name: 'Circuits', students: 5 },
  { name: 'Refraction', students: 4 },
  { name: 'Cell Study', students: 3 },
  { name: 'Magnetism', students: 3 },
];

// Recent errors for admin dashboard
export interface RecentError {
  id: string;
  studentName: string;
  errorDescription: string;
  timestamp: string;
}

export const generateRecentErrors = (): RecentError[] => {
  const now = new Date();
  return [
    {
      id: 'err-1',
      studentName: 'Nikhil',
      errorDescription: 'Incorrect resistor connection - polarity reversed',
      timestamp: new Date(now.getTime() - 120000).toLocaleTimeString(),
    },
    {
      id: 'err-2',
      studentName: 'Ria',
      errorDescription: 'Wrong indicator used in titration',
      timestamp: new Date(now.getTime() - 300000).toLocaleTimeString(),
    },
    {
      id: 'err-3',
      studentName: 'Aarav',
      errorDescription: 'Missing ground connection',
      timestamp: new Date(now.getTime() - 480000).toLocaleTimeString(),
    },
    {
      id: 'err-4',
      studentName: 'Priya',
      errorDescription: 'Incorrect angle measurement',
      timestamp: new Date(now.getTime() - 720000).toLocaleTimeString(),
    },
  ];
};

// System status for admin
export interface SystemStatus {
  lastUpdateTime: string;
  dataRefreshInterval: string;
  totalActiveSessions: number;
}

export const getSystemStatus = (): SystemStatus => {
  return {
    lastUpdateTime: new Date().toLocaleTimeString(),
    dataRefreshInterval: '5 seconds',
    totalActiveSessions: 27,
  };
};
