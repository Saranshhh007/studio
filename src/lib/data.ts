import type { Statement, User, Official, DashboardData } from '@/types';

export const dashboardData: DashboardData = {
  userId: "himanshu_goyal_001",
  dashboardStats: {
    totalStatementsTracked: 5,
    completedThisMonth: 1, // updated from 0 to show some activity
    criticalPriorityPending: 1, // updated to match priorityStatements
    averageCompletionTime: 375, // days
    lastUpdated: "2025-09-24T06:30:00Z"
  },
  
  priorityStatements: [
    {
      id: "stmt-005",
      title: "Solar Energy Program", 
      ministry: "Ministry of New & Renewable Energy",
      priority: "critical",
      status: "in_progress",
      progress: 60,
      lastUpdate: "2024-07-01T11:00:00Z",
      official: "Shri Vikash Singh"
    }
  ],
  
  recentActivity: [
    {
      id: "activity_001",
      type: "statement_update",
      actor: {
        name: "Shri Vikash Singh",
        role: "official",
        avatar: "https://picsum.photos/seed/105/100/100"
      },
      action: "made an update on",
      target: "Solar Energy Program", 
      content: "600 villages covered. Work is progressing at a good pace.",
      timestamp: "2024-07-01T11:00:00Z",
      badge: {
        text: "Official",
        color: "orange"
      }
    },
    {
      id: "activity_002", 
      type: "citizen_comment",
      actor: {
        name: "Priya Sharma",
        role: "citizen",
        avatar: "https://picsum.photos/seed/priya/100/100"
      },
      action: "commented on",
      target: "Rural Healthcare Centers",
      content: "Great progress! When will this reach our village?",
      timestamp: "2024-06-28T14:30:00Z",
      badge: {
        text: "Citizen",
        color: "blue"
      }
    },
    {
      id: "activity_003",
      type: "evidence_upload", 
      actor: {
        name: "Himanshu Goyal",
        role: "citizen",
        avatar: "https://picsum.photos/seed/himanshu/100/100"
      },
      action: "uploaded evidence for",
      target: "Digital India Expansion",
      content: "Photo of new fiber cable installation in my area",
      timestamp: "2024-06-25T09:15:00Z",
      badge: {
        text: "Evidence",
        color: "green"
      }
    }
  ],
  
  chartData: {
    statementsByCategory: [
      { category: "Energy", count: 1, color: "hsl(var(--status-critical))" },
      { category: "Health", count: 1, color: "hsl(var(--status-in-progress))" },
      { category: "Environment", count: 1, color: "hsl(var(--status-completed))" },
      { category: "Education", count: 1, color: "hsl(var(--status-pending))" },
      { category: "Technology", count: 1, color: "hsl(var(--primary))" }
    ],
    
    completionTrends: [
      { month: "Jan", completed: 0, total: 1 },
      { month: "Feb", completed: 0, total: 1 },
      { month: "Mar", completed: 1, total: 2 },
      { month: "Apr", completed: 1, total: 3 },
      { month: "May", completed: 1, total: 4 },
      { month: "Jun", completed: 1, total: 5 }
    ]
  }
};


const officials: Record<string, Official> = {
  rajeshKumar: {
    name: 'Shri Rajesh Kumar',
    designation: 'Secretary',
    ministry: 'Ministry of Electronics & IT',
    photoUrl: 'https://picsum.photos/seed/101/100/100',
  },
  priyaSharma: {
    name: 'Dr. Priya Sharma',
    designation: 'Joint Secretary',
    ministry: 'Ministry of Health',
    photoUrl: 'https://picsum.photos/seed/102/100/100',
  },
  anitaVerma: {
    name: 'Smt. Anita Verma',
    designation: 'Director',
    ministry: 'Ministry of Jal Shakti',
    photoUrl: 'https://picsum.photos/seed/103/100/100',
  },
  sureshGupta: {
    name: 'Prof. Suresh Gupta',
    designation: 'Advisor',
    ministry: 'Ministry of Education',
    photoUrl: 'https://picsum.photos/seed/104/100/100',
  },
  vikashSingh: {
    name: 'Shri Vikash Singh',
    designation: 'Mission Director',
    ministry: 'Ministry of New & Renewable Energy',
    photoUrl: 'https://picsum.photos/seed/105/100/100',
  },
};

export const mockStatements: Statement[] = [
  {
    id: 'stmt-001',
    title: 'Digital India Expansion',
    content: 'Expand digital services to 500 million citizens by December 2024, focusing on rural and remote areas.',
    official: officials.rajeshKumar,
    department: 'Digital Infrastructure',
    category: 'Technology',
    priority: 'critical',
    status: 'in_progress',
    dateCreated: new Date('2023-01-15T09:00:00Z'),
    datePromised: new Date('2024-12-31T23:59:59Z'),
    dateCompleted: null,
    updates: [
      { id: 'upd-1-1', content: 'Phase 1 launched, covering 100 districts.', author: 'Shri Rajesh Kumar', authorRole: 'official', timestamp: new Date('2024-06-20T14:30:00Z'), type: 'progress_update' },
      { id: 'upd-1-2', content: 'Public feedback portal is now live.', author: 'Citizen Voice', authorRole: 'citizen', timestamp: new Date('2024-05-10T10:00:00Z'), type: 'progress_update' },
    ],
    attachments: [],
    tags: ['digital-india', 'rural-development', 'technology'],
    geographicScope: 'National',
    publicEngagement: { views: 15234, comments: 2356, bookmarks: 5123, citizenRating: 4.5 },
    priorityHistory: [],
  },
  {
    id: 'stmt-002',
    title: 'Rural Healthcare Centers',
    content: 'Establish 200 new primary healthcare centers in 18 months in underserved rural regions.',
    official: officials.priyaSharma,
    department: 'Healthcare Infrastructure',
    category: 'Health',
    priority: 'high',
    status: 'in_progress',
    dateCreated: new Date('2023-03-01T11:00:00Z'),
    datePromised: new Date('2024-09-01T23:59:59Z'),
    dateCompleted: null,
    updates: [
       { id: 'upd-2-1', content: 'Land acquisition completed for 50 centers.', author: 'Dr. Priya Sharma', authorRole: 'official', timestamp: new Date('2024-04-15T11:00:00Z'), type: 'progress_update' },
    ],
    attachments: [],
    tags: ['healthcare', 'rural', 'infrastructure'],
    geographicScope: 'National',
    publicEngagement: { views: 8976, comments: 1245, bookmarks: 2345, citizenRating: 4.2 },
    priorityHistory: [],
  },
  {
    id: 'stmt-003',
    title: 'Clean Water Initiative',
    content: 'Provide clean and safe drinking water to 100 villages in the Bundelkhand region.',
    official: officials.anitaVerma,
    department: 'Water Resources',
    category: 'Environment',
    priority: 'medium',
    status: 'completed',
    dateCreated: new Date('2022-09-10T10:00:00Z'),
    datePromised: new Date('2024-03-31T23:59:59Z'),
    dateCompleted: new Date('2024-03-25T16:00:00Z'),
    updates: [
       { id: 'upd-3-1', content: 'Project completed ahead of schedule. All 100 villages now have access to clean water.', author: 'Smt. Anita Verma', authorRole: 'official', timestamp: new Date('2024-03-25T16:00:00Z'), type: 'status_change' },
    ],
    attachments: [],
    tags: ['water', 'clean-energy', 'jal-shakti'],
    geographicScope: 'Bundelkhand Region',
    publicEngagement: { views: 25432, comments: 4876, bookmarks: 8765, citizenRating: 4.8 },
    priorityHistory: [],
  },
  {
    id: 'stmt-004',
    title: 'Education Infrastructure',
    content: 'Build 50 new schools in tribal areas to improve access to education.',
    official: officials.sureshGupta,
    department: 'School Education',
    category: 'Education',
    priority: 'high',
    status: 'pending',
    dateCreated: new Date('2023-08-20T12:00:00Z'),
    datePromised: new Date('2025-06-30T23:59:59Z'),
    dateCompleted: null,
    updates: [
       { id: 'upd-4-1', content: 'Budget allocated and tenders invited.', author: 'Admin', authorRole: 'admin', timestamp: new Date('2024-02-01T09:00:00Z'), type: 'progress_update' },
    ],
    attachments: [],
    tags: ['education', 'tribal-development', 'schools'],
    geographicScope: 'National Tribal Areas',
    publicEngagement: { views: 4567, comments: 654, bookmarks: 1234, citizenRating: 4.0 },
    priorityHistory: [],
  },
  {
    id: 'stmt-005',
    title: 'Solar Energy Program',
    content: 'Install solar panels in 1000 rural villages to provide clean and reliable electricity.',
    official: officials.vikashSingh,
    department: 'Renewable Energy',
    category: 'Energy',
    priority: 'critical',
    status: 'in_progress',
    dateCreated: new Date('2022-11-01T09:00:00Z'),
    datePromised: new Date('2024-12-31T23:59:59Z'),
    dateCompleted: null,
    updates: [
      { id: 'upd-5-1', content: '600 villages covered. Work is progressing at a good pace.', author: 'Shri Vikash Singh', authorRole: 'official', timestamp: new Date('2024-07-01T11:00:00Z'), type: 'progress_update' },
      { id: 'upd-5-2', content: 'The solar panels in my village are working great!', author: 'Ravi Verma', authorRole: 'citizen', timestamp: new Date('2024-06-15T18:00:00Z'), type: 'progress_update' },
    ],
    attachments: [],
    tags: ['solar-energy', 'renewable', 'rural-electrification'],
    geographicScope: 'National',
    publicEngagement: { views: 19876, comments: 3456, bookmarks: 7890, citizenRating: 4.7 },
    priorityHistory: [],
  },
];

export const mockUser: User = {
  uid: 'himanshu_goyal_001',
  name: 'Himanshu Goyal',
  nameHindi: 'हिमांशु गोयल',
  email: 'himanshu.goyal@gmail.com',
  phone: '+91-9876543210',
  district: 'Patna',
  state: 'Bihar',
  constituency: 'Patna Lok Sabha',
  address: 'Boring Road, Patna, Bihar - 800001',
  role: 'citizen',
  joinDate: '2024-01-15T00:00:00Z',
  lastLogin: '2025-09-24T06:30:00Z',
  isVerified: true,
  avatarUrl: 'https://picsum.photos/seed/himanshu/100/100',
  gamification: {
    userId: 'himanshu_goyal_001',
    profile: {
      name: 'Himanshu Goyal',
      district: 'Patna',
      state: 'Bihar',
      civicLevel: 'Democracy Defender',
      totalPoints: 2850,
      currentBadges: [
        { name: 'Jagruk Nagrik', icon: '👁️', description: 'Aware Citizen' },
        { name: 'Truth Seeker', icon: '🔍', description: 'Fact-checker' },
        { name: 'Voice of Bihar', icon: '📢', description: 'Active Commenter' },
      ],
      achievements: [
        { name: 'First Comment', description: 'Made your first comment', pointsEarned: 50, dateEarned: '2024-01-20' },
        { name: 'Evidence Provider', description: 'Uploaded first evidence', pointsEarned: 100, dateEarned: '2024-02-05' },
      ],
      avatarUrl: 'https://picsum.photos/seed/himanshu/100/100',
    },
    activities: {
      statementsTracked: 45,
      commentsPosted: 23,
      evidenceUploaded: 8,
      reportsGenerated: 5,
      referralsComplete: 3,
    },
  }
};
