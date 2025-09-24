import type { Statement, User, DashboardData, AnalyticsData } from '@/types';

export const analyticsData: AnalyticsData = {
  period: "september_2025",
  state: "Bihar",
  
  priorityDistribution: {
    critical: { count: 8, percentage: 18, color: "hsl(var(--status-critical))" },
    high: { count: 15, percentage: 33, color: "hsl(var(--status-in-progress))" },
    medium: { count: 18, percentage: 40, color: "hsl(var(--primary))" },
    low: { count: 4, percentage: 9, color: "hsl(var(--muted))" }
  },
  
  statusDistribution: {
    pending: { count: 12, percentage: 27, color: "hsl(var(--status-pending))" },
    in_progress: { count: 25, percentage: 56, color: "hsl(var(--status-in-progress))" },
    completed: { count: 6, percentage: 13, color: "hsl(var(--status-completed))" },
    cancelled: { count: 2, percentage: 4, color: "hsl(var(--muted))" }
  },
  
  departmentPerformance: [
    {
      department: "Ministry of Health",
      totalStatements: 12,
      completed: 8,
      completionRate: 67,
      averageTime: 180,
      rating: 4.2
    },
    {
      department: "Ministry of Education", 
      totalStatements: 10,
      completed: 5,
      completionRate: 50,
      averageTime: 240,
      rating: 3.8
    },
    {
      department: "Ministry of New & Renewable Energy",
      totalStatements: 6,
      completed: 2,
      completionRate: 33,
      averageTime: 365,
      rating: 4.0
    }
  ],
  
  districtWiseData: [
    {
      district: "Patna",
      totalStatements: 25,
      completed: 8,
      completionRate: 32,
      activeUsers: 2847,
      engagement: 4.1
    },
    {
      district: "Muzaffarpur", 
      totalStatements: 18,
      completed: 6,
      completionRate: 33,
      activeUsers: 1934,
      engagement: 3.9
    },
    {
      district: "Darbhanga",
      totalStatements: 12,
      completed: 5,
      completionRate: 42,
      activeUsers: 1456,
      engagement: 4.3
    }
  ],
  
  trendsOverTime: [
    {
      month: "January 2024",
      statementsAdded: 15,
      completed: 5,
      userGrowth: 234
    },
    {
      month: "February 2024", 
      statementsAdded: 18,
      completed: 8,
      userGrowth: 456
    },
    {
      month: "March 2024",
      statementsAdded: 22,
      completed: 12,
      userGrowth: 678
    }
  ]
};

export const dashboardData: DashboardData = {
  userId: "himanshu_goyal_001",
  dashboardStats: {
    totalStatementsTracked: 5,
    completedThisMonth: 1,
    criticalPriorityItems: 1,
    averageCompletionTime: 128,
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


export const mockStatements: Statement[] = [
  {
    id: "stmt-005",
    title: "Solar Energy Program",
    titleHindi: "सौर ऊर्जा कार्यक्रम",
    content: "We will install solar panels in 1000 rural villages across Bihar by December 2024. This initiative will provide clean energy to over 500,000 families and create 2000 direct employment opportunities.",
    contentHindi: "हम दिसंबर 2024 तक बिहार के 1000 ग्रामीण गांवों में सोलर पैनल लगाएंगे।",
    official: {
      name: "Shri Vikash Singh",
      nameHindi: "श्री विकाश सिंह",
      designation: "Minister",
      designationHindi: "मंत्री",
      ministry: "Ministry of New & Renewable Energy",
      ministryHindi: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
      photoUrl: "https://picsum.photos/seed/105/100/100",
      contactEmail: "minister.nre@gov.in"
    },
    location: {
      district: "Multiple Districts",
      state: "Bihar", 
      constituency: "State-wide",
      geographicScope: "Rural Bihar",
      targetVillages: 1000,
      coordinates: {
        lat: 25.0961,
        lng: 85.3131
      }
    },
    classification: {
      department: "New & Renewable Energy",
      category: "Energy & Environment",
      subCategory: "Solar Power",
      priority: "critical",
      status: "in_progress",
      tags: ["solar", "renewable", "rural", "employment", "clean energy"]
    },
    timeline: {
      dateCreated: new Date("2024-01-10T00:00:00Z"),
      dateAnnounced: new Date("2024-01-15T00:00:00Z"), 
      datePromised: new Date("2024-12-31T23:59:59Z"),
      dateStarted: new Date("2024-02-01T00:00:00Z"),
      dateLastUpdated: new Date("2024-07-01T11:00:00Z"),
      dateCompleted: null,
      estimatedCompletion: new Date("2024-12-31T23:59:59Z")
    },
    progress: {
      percentage: 60,
      milestones: [
        {
          title: "Project Planning Complete",
          date: new Date("2024-02-15T00:00:00Z"),
          status: "completed",
          description: "Site surveys and technical planning finished"
        },
        {
          title: "First 300 Villages Connected", 
          date: new Date("2024-05-30T00:00:00Z"),
          status: "completed",
          description: "Solar installation completed in first batch"
        },
        {
          title: "600 Villages Target",
          date: new Date("2024-09-30T00:00:00Z"), 
          status: "in_progress",
          description: "Currently working on second batch"
        }
      ]
    },
    budget: {
      allocated: 50000000000,
      spent: 30000000000,
      currency: "INR",
      budgetSource: "Central Government",
      financialYear: "2024-25"
    },
    impact: {
      beneficiaries: 500000,
      beneficiaryType: "Families",
      employmentCreated: 1200,
      targetEmployment: 2000,
      environmentalImpact: "Reduction of 50,000 tons CO2 annually",
      economicImpact: "₹100 crore savings in electricity costs"
    },
    publicEngagement: {
      views: 15420,
      uniqueViews: 12330,
      likes: 892,
      dislikes: 45,
      comments: 156,
      bookmarks: 234,
      shares: 67,
      citizenRating: 4.2,
      totalVotes: 445,
      supportPercent: 85
    },
    updates: [
      {
        id: "update_001", 
        content: "600 villages covered. Work is progressing at a good pace.",
        contentHindi: "600 गांव कवर हो गए। काम अच्छी गति से प्रगति कर रहा है।",
        author: {
          name: "Shri Vikash Singh",
          role: "official",
          userId: "vikash_singh_official"
        },
        timestamp: new Date("2024-07-01T11:00:00Z"),
        type: "progress_update",
        attachments: [
          {
            type: "image",
            url: "/images/updates/solar-progress-july.jpg",
            caption: "Solar panel installation in Muzaffarpur village"
          }
        ],
        metrics: {
          villagesCompleted: 600,
          panelsInstalled: 12000,
          familiesBenefited: 300000
        }
      }
    ],
    evidence: [
      {
        id: "evidence_001",
        type: "photo",
        url: "/images/evidence/solar-installation-patna.jpg",
        uploadedBy: "himanshu_goyal_001",
        uploadDate: new Date("2024-07-15T00:00:00Z"),
        location: "Patna District",
        description: "Solar panels installed in village school",
        verified: true,
        verifiedBy: "district_admin_patna",
        verificationDate: new Date("2024-07-16T00:00:00Z")
      }
    ],
    relatedStatements: [
      "statement_002",
      "statement_003"
    ]
  }
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