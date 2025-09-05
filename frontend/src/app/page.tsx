'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import ChallengeCard from '@/components/ChallengeCard';
import UserStats from '@/components/UserStats';
import CreateProjectModal from '@/components/CreateProjectModal';
import { useToastActions } from '@/components/Toast';
import { mockUsers, mockProjects, mockChallenges } from '@/lib/mockData';
import { 
  PlusIcon, 
  TrophyIcon, 
  UserGroupIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const router = useRouter();
  const toast = useToastActions();
  const [projects, setProjects] = useState(mockProjects);
  const [userVotes, setUserVotes] = useState<string[]>([]);
  const [userChallenges, setUserChallenges] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const currentUser = mockUsers[0]; // Simulando usuário logado
  const userStats = {
    totalProjects: 3,
    totalVotes: 15,
    challengesCompleted: 2,
    forumPosts: 8
  };

  const handleVote = (projectId: string) => {
    if (userVotes.includes(projectId)) {
      // Remove vote
      setUserVotes(prev => prev.filter(id => id !== projectId));
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, votes: project.votes - 1 }
          : project
      ));
    } else {
      // Add vote
      setUserVotes(prev => [...prev, projectId]);
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, votes: project.votes + 1 }
          : project
      ));
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    setUserChallenges(prev => [...prev, challengeId]);
  };

  // Handlers para os botões
  const handleCreateProject = () => {
    setIsCreateModalOpen(true);
  };

  const handleViewChallenges = () => {
    toast.success('Navegando', 'Redirecionando para a página de desafios!');
    router.push('/challenges');
  };

  const handleViewAllProjects = () => {
    router.push('/projects');
  };

  const handleViewAllChallenges = () => {
    router.push('/challenges');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Bem-vindo ao Engage Local! 🏙️
              </h1>
              <p className="text-xl mb-6 opacity-90">
                Transforme sua comunidade através da colaboração e gamificação. 
                Participe de projetos, complete desafios e ganhe recompensas!
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={handleCreateProject}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Criar Projeto
                </button>
                <button 
                  onClick={handleViewChallenges}
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center"
                >
                  <TrophyIcon className="w-5 h-5 mr-2" />
                  Ver Desafios
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <SparklesIcon className="w-32 h-32 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com estatísticas do usuário */}
          <div className="lg:col-span-1">
            <UserStats user={currentUser} stats={userStats} />

            {/* Estatísticas da comunidade */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ChartBarIcon className="w-5 h-5 mr-2 text-blue-500" />
                Comunidade
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Membros Ativos</span>
                  <span className="font-semibold">1.234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projetos Ativos</span>
                  <span className="font-semibold">56</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Concluídos</span>
                  <span className="font-semibold text-green-600">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pontos Distribuídos</span>
                  <span className="font-semibold">1.2M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-3">
            {/* Projetos em destaque */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <UserGroupIcon className="w-6 h-6 mr-2 text-blue-500" />
                  Projetos em Destaque
                </h2>
                <button 
                  onClick={handleViewAllProjects}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver todos
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.slice(0, 4).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onVote={handleVote}
                    hasUserVoted={userVotes.includes(project.id)}
                  />
                ))}
              </div>
            </div>

            {/* Desafios ativos */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <TrophyIcon className="w-6 h-6 mr-2 text-yellow-500" />
                  Desafios Ativos
                </h2>
                <button 
                  onClick={handleViewAllChallenges}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver todos
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onJoin={handleJoinChallenge}
                    hasUserJoined={userChallenges.includes(challenge.id)}
                    isCompleted={challenge.completedBy.includes(currentUser.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Criação de Projeto */}
      <CreateProjectModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
