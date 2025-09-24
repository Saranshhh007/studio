export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type UserRole = 'citizen' | 'official' | 'admin' | 'auditor';

export interface Official {
  name: string;
  nameHindi?: string;
  designation: string;
  ministry: string;
  photoUrl: string;
}

export interface Update {
  id: string;
  content: string;
  author: string;
  authorRole: UserRole;
  timestamp: Date;
  type: 'progress_update' | 'status_change' | 'priority_change';
}

export interface PublicEngagement {
  views: number;
  comments: number;
  bookmarks: number;
  citizenRating: number;
}

export interface PriorityHistory {
  oldPriority: Priority;
  newPriority: Priority;
  changedBy: string;
  timestamp: Date;
  reason: string;
}

export interface Statement {
  id: string;
  title: string;
  titleHindi?: string;
  content: string;
  contentHindi?: string;
  official: Official;
  department: string;
  category: string;
  priority: Priority;
  status: Status;
  dateCreated: Date;
  datePromised: Date;
  dateCompleted: Date | null;
  updates: Update[];
  attachments: string[];
  tags: string[];
  geographicScope: string;
  publicEngagement: PublicEngagement;
  priorityHistory: PriorityHistory[];
}

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  gamification?: UserGamification;
  nameHindi?: string;
  phone?: string;
  district?: string;
  state?: string;
  constituency?: string;
  address?: string;
  joinDate?: string;
  lastLogin?: string;
  isVerified?: boolean;
}

// Gamification Types
export type CivicLevel = 'Civic Rookie' | 'Active Citizen' | 'Democracy Defender' | 'Democracy Champion' | 'Transparency Guardian';

export interface BadgeInfo {
  name: string;
  icon: string;
  description: string;
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
  criticalPriorityPending: number;
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
