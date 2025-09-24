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
}
