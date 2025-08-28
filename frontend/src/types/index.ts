// Tipos para usuários
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  level: number;
  points: number;
  badges: Badge[];
  joinedAt: Date;
  type: 'resident' | 'ngo' | 'company' | 'government';
}

// Tipos para projetos
export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  authorId: string;
  author: User;
  votes: number;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  images?: string[];
  tags: string[];
  participants: User[];
  requiredPoints?: number;
}

export type ProjectCategory = 
  | 'environment'
  | 'infrastructure'
  | 'social'
  | 'education'
  | 'health'
  | 'culture'
  | 'sports'
  | 'technology';

export type ProjectStatus = 
  | 'proposed'
  | 'approved'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

// Tipos para votação
export interface Vote {
  id: string;
  projectId: string;
  userId: string;
  createdAt: Date;
}

// Tipos para desafios/missões
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  points: number;
  deadline?: Date;
  requirements: string[];
  completedBy: string[];
  createdAt: Date;
  isActive: boolean;
}

export type ChallengeType = 
  | 'individual'
  | 'team'
  | 'community';

// Tipos para badges/conquistas
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: string;
  rarity: BadgeRarity;
  unlockedAt?: Date;
}

export type BadgeRarity = 
  | 'common'
  | 'rare'
  | 'epic'
  | 'legendary';

// Tipos para recompensas
export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  type: RewardType;
  isAvailable: boolean;
  provider?: string;
  expiresAt?: Date;
}

export type RewardType = 
  | 'badge'
  | 'discount'
  | 'event_ticket'
  | 'recognition'
  | 'premium_feature';

// Tipos para postagens do fórum
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  category: ForumCategory;
  replies: ForumReply[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isPinned: boolean;
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  parentReplyId?: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ForumCategory = 
  | 'general'
  | 'project_discussion'
  | 'help'
  | 'announcements'
  | 'feedback';

// Tipos para notificações
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  relatedId?: string;
}

export type NotificationType = 
  | 'project_vote'
  | 'challenge_completed'
  | 'badge_earned'
  | 'level_up'
  | 'forum_reply'
  | 'project_approved'
  | 'reward_available';

// Tipos para estatísticas
export interface UserStats {
  userId: string;
  totalProjects: number;
  totalVotes: number;
  challengesCompleted: number;
  forumPosts: number;
  joinedChallenges: number;
  contributionScore: number;
}

export interface CommunityStats {
  totalUsers: number;
  totalProjects: number;
  completedProjects: number;
  activeChallenges: number;
  totalPoints: number;
}
