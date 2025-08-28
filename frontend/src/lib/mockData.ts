import { User, Project, Challenge, Badge, ForumPost, Notification } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@email.com',
    avatar: '/avatars/maria.svg',
    bio: 'Moradora local interessada em projetos ambientais',
    level: 5,
    points: 1250,
    badges: [],
    joinedAt: new Date('2024-01-15'),
    type: 'resident'
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao@email.com',
    avatar: '/avatars/joao.svg',
    bio: 'Engenheiro civil voluntário',
    level: 7,
    points: 2100,
    badges: [],
    joinedAt: new Date('2023-11-20'),
    type: 'resident'
  },
  {
    id: '3',
    name: 'ONG Verde Cidade',
    email: 'contato@verdecidade.org',
    avatar: '/avatars/ong.svg',
    bio: 'Organização focada em sustentabilidade urbana',
    level: 10,
    points: 4500,
    badges: [],
    joinedAt: new Date('2023-08-10'),
    type: 'ngo'
  }
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Primeiro Projeto',
    description: 'Submeteu seu primeiro projeto',
    icon: '🎯',
    requirements: 'Submeta 1 projeto',
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Colaborador Ativo',
    description: 'Votou em 50 projetos',
    icon: '🗳️',
    requirements: 'Vote em 50 projetos',
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Líder Comunitário',
    description: 'Completou 10 desafios',
    icon: '👑',
    requirements: 'Complete 10 desafios',
    rarity: 'epic'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Revitalização da Praça Central',
    description: 'Projeto para renovar a praça central com novos equipamentos de ginástica, área para crianças e mais iluminação.',
    category: 'infrastructure',
    authorId: '1',
    author: mockUsers[0],
    votes: 45,
    status: 'proposed',
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-08-25'),
    tags: ['praça', 'exercícios', 'família'],
    participants: [mockUsers[0], mockUsers[1]],
    requiredPoints: 100
  },
  {
    id: '2',
    title: 'Programa de Reciclagem Comunitária',
    description: 'Implementar pontos de coleta seletiva e campanhas educativas sobre reciclagem no bairro.',
    category: 'environment',
    authorId: '3',
    author: mockUsers[2],
    votes: 67,
    status: 'approved',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-08-26'),
    tags: ['reciclagem', 'meio ambiente', 'educação'],
    participants: [mockUsers[2], mockUsers[0]],
    requiredPoints: 50
  },
  {
    id: '3',
    title: 'Horta Comunitária Escolar',
    description: 'Criar uma horta na escola local para ensinar as crianças sobre agricultura sustentável.',
    category: 'education',
    authorId: '2',
    author: mockUsers[1],
    votes: 23,
    status: 'in_progress',
    createdAt: new Date('2024-08-10'),
    updatedAt: new Date('2024-08-28'),
    tags: ['educação', 'agricultura', 'crianças'],
    participants: [mockUsers[1]],
    requiredPoints: 75
  }
];

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Plantar 100 Mudas',
    description: 'Organize uma equipe para plantar 100 mudas de árvores nativas no parque municipal.',
    type: 'team',
    points: 500,
    deadline: new Date('2024-09-30'),
    requirements: ['Mínimo 5 participantes', 'Autorização da prefeitura'],
    completedBy: [],
    createdAt: new Date('2024-08-20'),
    isActive: true
  },
  {
    id: '2',
    title: 'Mutirão de Limpeza',
    description: 'Participe de um mutirão de limpeza na margem do rio.',
    type: 'community',
    points: 200,
    deadline: new Date('2024-09-15'),
    requirements: ['Trazer equipamentos de proteção'],
    completedBy: ['1'],
    createdAt: new Date('2024-08-18'),
    isActive: true
  },
  {
    id: '3',
    title: 'Crie um Projeto Inovador',
    description: 'Submeta um projeto que use tecnologia para resolver problemas locais.',
    type: 'individual',
    points: 300,
    requirements: ['Projeto deve incluir componente tecnológico'],
    completedBy: [],
    createdAt: new Date('2024-08-25'),
    isActive: true
  }
];

// Mock Forum Posts
export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Como podemos melhorar o transporte público?',
    content: 'Gostaria de discutir ideias para melhorar o transporte público na nossa cidade. Quais são os principais problemas que vocês enfrentam?',
    authorId: '1',
    author: mockUsers[0],
    category: 'general',
    replies: [],
    likes: 12,
    createdAt: new Date('2024-08-26'),
    updatedAt: new Date('2024-08-26'),
    tags: ['transporte', 'mobilidade'],
    isPinned: false
  },
  {
    id: '2',
    title: 'Sucesso na Campanha de Reciclagem!',
    content: 'Quero compartilhar o sucesso da nossa campanha de reciclagem. Conseguimos coletar 2 toneladas de material reciclável!',
    authorId: '3',
    author: mockUsers[2],
    category: 'announcements',
    replies: [],
    likes: 25,
    createdAt: new Date('2024-08-25'),
    updatedAt: new Date('2024-08-25'),
    tags: ['reciclagem', 'sucesso'],
    isPinned: true
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'project_vote',
    title: 'Seu projeto recebeu um voto!',
    message: 'O projeto "Revitalização da Praça Central" recebeu um novo voto.',
    isRead: false,
    createdAt: new Date('2024-08-28'),
    relatedId: '1'
  },
  {
    id: '2',
    userId: '1',
    type: 'badge_earned',
    title: 'Nova conquista desbloqueada!',
    message: 'Você ganhou o badge "Primeiro Projeto".',
    isRead: false,
    createdAt: new Date('2024-08-27'),
    relatedId: '1'
  }
];
