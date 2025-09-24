import type { UserGamification, LeaderboardUser, StateLeaderboardEntry, MonthlyChallenge, BadgeInfo } from '@/types';

export const badges: Record<string, BadgeInfo> = {
  satyagrahi: {
    name: "Satyagrahi",
    icon: "🕯️",
    description: "Posted 50 verified facts about government statements",
  },
  jagrukNagrik: {
    name: "Jagruk Nagrik",
    icon: "👁️",
    description: "Viewed statements from all departments in your district",
  },
  gramSevak: {
    name: "Gram Sevak",
    icon: "🏘️",
    description: "Actively tracking rural development statements",
  },
  digitalBharatWarrior: {
    name: "Digital Bharat Warrior",
    icon: "💻",
    description: "Champion of digital governance initiatives",
  },
  transparencyTiger: {
    name: "Transparency Tiger",
    icon: "🐅",
    description: "Top contributor in Bihar state for transparency",
  },
  truthSeeker: {
    name: "Truth Seeker",
    icon: "🔍",
    description: "Fact-checked 10 statements.",
  },
  voiceOfBihar: {
    name: "Voice of Bihar",
    icon: "📢",
    description: "Posted 25 constructive comments.",
  },
};


export const mockUser: UserGamification = {
  userId: "himanshu_goyal_001",
  profile: {
    name: "Himanshu Goyal",
    district: "Patna",
    state: "Bihar",
    civicLevel: "Democracy Defender",
    totalPoints: 2850,
    currentBadges: [badges.jagrukNagrik, badges.truthSeeker, badges.voiceOfBihar],
    achievements: [
      {
        name: "First Comment",
        description: "Made your first comment on a government statement",
        pointsEarned: 50,
        dateEarned: "2024-01-20"
      },
      {
        name: "Evidence Provider",
        description: "Uploaded first photo evidence for a statement",
        pointsEarned: 100,
        dateEarned: "2024-02-05T00:00:00Z"
      }
    ],
    avatarUrl: 'https://picsum.photos/seed/himanshu/100/100',
  },
  activities: {
    statementsTracked: 45,
    commentsPosted: 23,
    evidenceUploaded: 8,
    reportsGenerated: 5,
    referralsComplete: 3,
  }
};

export const mockDistrictLeaderboard: LeaderboardUser[] = [
    {
      rank: 1,
      name: "Priya Sharma",
      avatar: "PS",
      points: 4850,
      level: "Democracy Champion",
      badges: [badges.satyagrahi, badges.digitalBharatWarrior, badges.transparencyTiger],
      activeStatements: 67,
      district: "Patna"
    },
    {
      rank: 2, 
      name: "Himanshu Goyal",
      avatar: "HG",
      points: 2850,
      level: "Democracy Defender", 
      badges: [badges.jagrukNagrik, badges.truthSeeker, badges.voiceOfBihar],
      activeStatements: 45,
      district: "Patna"
    },
    {
      rank: 3, 
      name: "Vikram Singh",
      avatar: "VS",
      points: 1920,
      level: "Active Citizen", 
      badges: [badges.jagrukNagrik],
      activeStatements: 32,
      district: "Patna"
    }
];

export const mockStateLeaderboard: StateLeaderboardEntry[] = [
  {
    district: "Patna",
    topCitizen: "Priya Sharma",
    totalPoints: 4850,
    activeUsers: 2847,
    statementsTracked: 156
  },
  {
    district: "Muzaffarpur", 
    topCitizen: "Amit Singh",
    totalPoints: 4200,
    activeUsers: 1934,
    statementsTracked: 134
  },
  {
    district: "Darbhanga", 
    topCitizen: "Sunita Devi",
    totalPoints: 3500,
    activeUsers: 1567,
    statementsTracked: 112
  }
];

export const mockMonthlyChallenge: MonthlyChallenge = {
  name: "Bihar Vikas Month",
  description: "Track progress on infrastructure development in your district",
  duration: "July 2024",
  tasks: [
    {
      task: "Track 10 infrastructure statements",
      points: 200,
      completed: true
    },
    {
      task: "Upload 5 progress photos", 
      points: 300,
      completed: false
    },
    {
      task: "Get 3 friends to join CivicSamadhaan",
      points: 400,
      completed: false
    }
  ],
  rewards: {
    completion: "Bihar Vikas Champion Badge + 1000 bonus points",
    topPerformer: "Meeting with District Magistrate + Special Recognition"
  }
};
