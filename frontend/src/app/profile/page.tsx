'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/Loading';
import { mockUsers, mockProjects, mockChallenges } from '@/lib/mockData';
import Image from 'next/image';
import { 
  UserIcon,
  TrophyIcon,
  StarIcon,
  CalendarIcon,
  MapPinIcon,
  PencilIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  UserGroupIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/outline';

const tabs = [
  { id: 'overview', name: 'Visão Geral', icon: ChartBarIcon },
  { id: 'projects', name: 'Meus Projetos', icon: UserGroupIcon },
  { id: 'challenges', name: 'Desafios', icon: TrophyIcon },
  { id: 'activity', name: 'Atividade', icon: HeartIcon },
  { id: 'settings', name: 'Configurações', icon: Cog6ToothIcon },
];

const achievements = [
  { id: '1', name: 'Primeiro Projeto', icon: '🎯', description: 'Criou seu primeiro projeto', date: '2024-01-15', rarity: 'common' },
  { id: '2', name: 'Colaborador Ativo', icon: '🗳️', description: 'Votou em 50 projetos', date: '2024-02-20', rarity: 'rare' },
  { id: '3', name: 'Líder Comunitário', icon: '👑', description: 'Completou 10 desafios', date: '2024-03-10', rarity: 'epic' },
  { id: '4', name: 'Mentor', icon: '🎓', description: 'Ajudou 5 novos membros', date: '2024-03-25', rarity: 'legendary' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = mockUsers[0];
  const userProjects = mockProjects.filter(p => p.authorId === currentUser.id);
  const userChallenges = mockChallenges.filter(c => c.completedBy.includes(currentUser.id));

  const stats = {
    totalProjects: userProjects.length,
    totalVotes: mockProjects.reduce((sum, p) => sum + p.votes, 0),
    challengesCompleted: userChallenges.length,
    forumPosts: 8,
    totalContributions: 24,
    communityRank: 5,
  };

  const getLevelProgress = (level: number, points: number) => {
    const pointsForCurrentLevel = level * 200;
    const pointsForNextLevel = (level + 1) * 200;
    const progress = ((points - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const getNextLevelPoints = (level: number, points: number) => {
    const pointsForNextLevel = (level + 1) * 200;
    return pointsForNextLevel - points;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const progress = getLevelProgress(currentUser.level, currentUser.points);
  const pointsToNext = getNextLevelPoints(currentUser.level, currentUser.points);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.totalProjects}</div>
                <div className="text-sm text-gray-600">Projetos</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-green-600">{stats.challengesCompleted}</div>
                <div className="text-sm text-gray-600">Desafios</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-purple-600">{stats.totalVotes}</div>
                <div className="text-sm text-gray-600">Votos</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-orange-600">{stats.forumPosts}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
            </div>

            {/* Conquistas Recentes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <StarIcon className="w-5 h-5 mr-2 text-yellow-500" />
                Conquistas Recentes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.slice(0, 4).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm opacity-75">{achievement.description}</p>
                      </div>
                    </div>
                    <p className="text-xs opacity-60">
                      Conquistado em {new Date(achievement.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Atividade Recente */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ChatBubbleOvalLeftIcon className="w-5 h-5 mr-2 text-blue-500" />
                Atividade Recente
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-blue-500 text-xl mr-3">🗳️</div>
                  <div>
                    <p className="font-medium">Votou no projeto "Revitalização da Praça Central"</p>
                    <p className="text-sm text-gray-500">2 horas atrás</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="text-green-500 text-xl mr-3">🏆</div>
                  <div>
                    <p className="font-medium">Completou o desafio "Mutirão de Limpeza"</p>
                    <p className="text-sm text-gray-500">1 dia atrás</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-purple-500 text-xl mr-3">💬</div>
                  <div>
                    <p className="font-medium">Comentou na discussão "Transporte Público"</p>
                    <p className="text-sm text-gray-500">3 dias atrás</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meus Projetos</h3>
            {userProjects.length > 0 ? (
              <div className="space-y-4">
                {userProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{project.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'approved' ? 'bg-green-100 text-green-800' :
                        project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status === 'proposed' ? 'Proposto' :
                         project.status === 'approved' ? 'Aprovado' :
                         project.status === 'in_progress' ? 'Em Andamento' :
                         'Concluído'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <HeartIcon className="w-4 h-4 mr-1" />
                      <span className="mr-4">{project.votes} votos</span>
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>{new Date(project.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Você ainda não criou nenhum projeto.</p>
              </div>
            )}
          </div>
        );

      case 'challenges':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Desafios Concluídos</h3>
            {userChallenges.length > 0 ? (
              <div className="space-y-4">
                {userChallenges.map((challenge) => (
                  <div key={challenge.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                      <div className="flex items-center text-yellow-600">
                        <TrophyIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{challenge.points} pontos</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">{challenge.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>Concluído em {new Date(challenge.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrophyIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Você ainda não completou nenhum desafio.</p>
              </div>
            )}
          </div>
        );

      case 'activity':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Atividades</h3>
            <div className="text-center py-8">
              <ChatBubbleOvalLeftIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Histórico detalhado será implementado em breve.</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações</h3>
            <div className="text-center py-8">
              <Cog6ToothIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Configurações serão implementadas em breve.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header do Perfil */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar e Info Básica */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={currentUser.avatar || '/avatars/maria.svg'}
                  alt={currentUser.name}
                  className="rounded-full object-cover border-4 border-blue-100"
                  width={120}
                  height={120}
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {/* Nome e Nível */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentUser.name}</h1>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      São Paulo, SP
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      Membro desde {new Date(currentUser.joinedAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-2 md:mt-0 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Editar Perfil
                </button>
              </div>

              {/* Progresso de Nível */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <TrophyIcon className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="font-semibold text-gray-900">Nível {currentUser.level}</span>
                  </div>
                  <span className="text-sm text-gray-600">{currentUser.points.toLocaleString()} pontos</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  {pointsToNext > 0 ? `${pointsToNext} pontos para o próximo nível` : 'Nível máximo atual!'}
                </p>
              </div>

              {/* Bio */}
              {currentUser.bio && (
                <p className="text-gray-600 italic">"{currentUser.bio}"</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo da Tab */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          renderTabContent()
        )}
      </main>
    </div>
  );
}
