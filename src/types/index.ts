export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';
export type UserRole = 'citizen' | 'official' | 'admin' | 'auditor';

// New detailed Statement structure
export interface Official {
  name: string;
  nameHindi?: string;
  designation: string;
  designationHindi?: string;
  ministry: string;
  ministryHindi?: string;
  photoUrl: string; // Changed from photoURL
  contactEmail?: string;
}

export interface StatementLocation {
  district: string;
  state: string;
  constituency: string;
  geographicScope: string;
  targetVillages?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Classification {
  department: string;
  category: string;
  subCategory?: string;
  priority: Priority;
  status: Status;
  tags: string[];
}

export interface Timeline {
  dateCreated: Date;
  dateAnnounced?: Date;
  datePromised: Date;
  dateStarted?: Date;
  dateLastUpdated?: Date;
  dateCompleted: Date | null;
  estimatedCompletion?: Date;
}

export interface Milestone {
  title: string;
  date: Date;
  status: 'completed' | 'in_progress' | 'pending';
  description: string;
}

export interface Progress {
  percentage: number;
  milestones: Milestone[];
}

export interface Budget {
  allocated: number;
  spent: number;
  currency: string;
  budgetSource: string;
  financialYear: string;
}

export interface Impact {
  beneficiaries: number;
  beneficiaryType: string;
  employmentCreated: number;
  targetEmployment: number;
  environmentalImpact: string;
  economicImpact: string;
}

export interface PublicEngagement {
  views: number;
  uniqueViews?: number;
  likes?: number;
  dislikes?: number;
  comments: number;
  bookmarks: number;
  shares?: number;
  citizenRating: number;
  totalVotes?: number;
  supportPercent?: number;
}

export interface UpdateAttachment {
  type: 'image' | 'document';
  url: string;
  caption: string;
}

export interface Update {
  id: string;
  content: string;
  contentHindi?: string;
  author: {
    name: string;
    role: UserRole;
    userId: string;
  };
  timestamp: Date;
  type: 'progress_update' | 'status_change' | 'priority_change';
  attachments?: UpdateAttachment[];
  metrics?: Record<string, any>;
}


export interface Evidence {
  id: string;
  type: 'photo' | 'document' | 'video';
  url: string;
  uploadedBy: string;
  uploadDate: Date;
  location: string;
  description: string;
  verified: boolean;
  verifiedBy?: string;
  verificationDate?: Date;
}

export interface Statement {
  id: string;
  title: string;
  titleHindi?: string;
  content: string;
  contentHindi?: string;
  official: Official;
  location: StatementLocation;
  classification: Classification;
  timeline: Timeline;
  progress: Progress;
  budget: Budget;
  impact: Impact;
  publicEngagement: PublicEngagement;
  updates: Update[];
  evidence?: Evidence[];
  relatedStatements?: string[];
}


// --- User & Gamification Types ---

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  nameHindi?: string;
  phone?: string;
  district?: string;
  state?: string;
  constituency?: string;
  address?: string;
  joinDate?: string;
  lastLogin?: string;
  isVerified?: boolean;
  gamification?: UserGamification;
}


// Gamification Types
export type CivicLevel = 'Civic Rookie' | 'Active Citizen' | 'Democracy Defender' | 'Democracy Champion' | 'Transparency Guardian';

export interface BadgeInfo {
  name: string;
  icon: string;
  description: string;
  nameHindi?: string;
  earnedDate?: string;
  points?: number;
}

export interface Achievement {
  name: string;
  description: string;
  pointsEarned: number;
  dateEarned: string;
}

export interface UserGamificationProfile {
    name: string;
    district: string;
    state: string;
    civicLevel: CivicLevel;
    totalPoints: number;
    currentBadges: BadgeInfo[];
    achievements: Achievement[];
    avatarUrl?: string;
}

export interface UserActivities {
  statementsTracked: number;
  commentsPosted: number;
  evidenceUploaded: number;
  reportsGenerated: number;
  referralsComplete: number;
}

export interface UserGamification {
    userId: string;
    profile: UserGamificationProfile;
    activities: UserActivities;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  level: CivicLevel;
  badges: BadgeInfo[];
  activeStatements: number;
  district: string;
}

export interface StateLeaderboardEntry {
  district: string;
  topCitizen: string;
  totalPoints: number;
  activeUsers: number;
  statementsTracked: number;
}

export interface ChallengeTask {
  task: string;
  points: number;
  completed: boolean;
}

export interface MonthlyChallenge {
  name: string;
  description: string;
  duration: string;
  tasks: ChallengeTask[];
  rewards: {
    completion: string;
    topPerformer: string;
  };
}

// New Dashboard Data Types
export interface DashboardStats {
  totalStatementsTracked: number;
  completedThisMonth: number;
  criticalPriorityItems: number;
  averageCompletionTime: number;
  lastUpdated: string;
}

export interface PriorityStatement {
  id: string;
  title: string;
  ministry: string;
  priority: Priority;
  status: Status;
  progress: number;
  lastUpdate: string;
  official: string;
}

export interface RecentActivityItem {
  id: string;
  type: string;
  actor: {
    name: string;
    role: UserRole;
    avatar: string;
  };
  action: string;
  target: string;
  content: string;
  timestamp: string;
  badge: {
    text: string;
    color: string;
  };
}

export interface ChartData {
  statementsByCategory: {
    category: string;
    count: number;
    color: string;
  }[];
  completionTrends: {
    month: string;
    completed: number;
    total: number;
  }[];
}

export interface DashboardData {
  userId: string;
  dashboardStats: DashboardStats;
  priorityStatements: PriorityStatement[];
  recentActivity: RecentActivityItem[];
  chartData: ChartData;
}

// Analytics Page Data Types
export interface Distribution {
  count: number;
  percentage: number;
  color: string;
}

export interface DepartmentPerformance {
  department: string;
  totalStatements: number;
  completed: number;
  completionRate: number;
  averageTime: number;
  rating: number;
}

export interface DistrictData {
  district: string;
  totalStatements: number;
  completed: number;
  completionRate: number;
  activeUsers: number;
  engagement: number;
}

export interface Trend {
  month: string;
  statementsAdded: number;
  completed: number;
  userGrowth: number;
}

export interface AnalyticsData {
  period: string;
  state: string;
  priorityDistribution: Record<string, Distribution>;
  statusDistribution: Record<string, Distribution>;
  departmentPerformance: DepartmentPerformance[];
  districtWiseData: DistrictData[];
  trendsOverTime: Trend[];
}