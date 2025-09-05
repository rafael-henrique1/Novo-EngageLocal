'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';
import LoadingSpinner from '@/components/Loading';
import { mockChallenges, mockUsers } from '@/lib/mockData';
import { 
  TrophyIcon,
  PlusIcon,
  FunnelIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const challengeTypes = [
  { id: 'all', name: 'Todos', icon: '🏆' },
  { id: 'individual', name: 'Individual', icon: '👤' },
  { id: 'team', name: 'Equipe', icon: '👥' },
  { id: 'community', name: 'Comunidade', icon: '🏘️' },
];

const timeFilters = [
  { id: 'all', name: 'Todos' },
  { id: 'active', name: 'Ativos' },
  { id: 'ending_soon', name: 'Terminando em breve' },
  { id: 'completed', name: 'Concluídos' },
];

export default function ChallengesPage() {
  const [challenges] = useState(mockChallenges);
  const [filteredChallenges, setFilteredChallenges] = useState(mockChallenges);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [userChallenges, setUserChallenges] = useState<string[]>([]);
  
  const currentUser = mockUsers[0];

  // Função de filtro
  const filterChallenges = (type: string, time: string) => {
    let filtered = challenges;

    // Filtro por tipo
    if (type !== 'all') {
      filtered = filtered.filter(challenge => challenge.type === type);
    }

    // Filtro por tempo
    if (time !== 'all') {
      const now = new Date();
      
      filtered = filtered.filter(challenge => {
        if (time === 'active') {
          return challenge.isActive && (!challenge.deadline || new Date(challenge.deadline) > now);
        }
        if (time === 'ending_soon') {
          if (!challenge.deadline) return false;
          const deadline = new Date(challenge.deadline);
          const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          return daysLeft <= 7 && daysLeft > 0;
        }
        if (time === 'completed') {
          return !challenge.isActive || (challenge.deadline && new Date(challenge.deadline) <= now);
        }
        return true;
      });
    }

    setFilteredChallenges(filtered);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterChallenges(type, selectedTime);
  };

  const handleTimeFilter = (time: string) => {
    setSelectedTime(time);
    filterChallenges(selectedType, time);
  };

  const handleJoinChallenge = (challengeId: string) => {
    if (userChallenges.includes(challengeId)) {
      setUserChallenges(prev => prev.filter(id => id !== challengeId));
    } else {
      setUserChallenges(prev => [...prev, challengeId]);
    }
  };

  const handleCreateChallenge = () => {
    // TODO: Implementar modal de criação de desafio
    alert('Funcionalidade de criar desafio será implementada em breve!');
  };

  // Estatísticas rápidas
  const activeCount = challenges.filter(c => c.isActive).length;
  const participatingCount = userChallenges.length;
  const completedCount = challenges.filter(c => c.completedBy.includes(currentUser.id)).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <TrophyIcon className="w-8 h-8 mr-3 text-yellow-500" />
              Desafios da Comunidade
            </h1>
            <p className="text-gray-600">Participe dos desafios e ganhe pontos para subir de nível!</p>
          </div>
          <button
            onClick={handleCreateChallenge}
            className="mt-4 sm:mt-0 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Criar Desafio
          </button>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrophyIcon className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Desafios Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Participando</p>
                <p className="text-2xl font-bold text-gray-900">{participatingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarIcon className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">⭐</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Pontos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {challenges.filter(c => c.completedBy.includes(currentUser.id))
                    .reduce((sum, c) => sum + c.points, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tipo de Desafio */}
            <div className="flex flex-wrap gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500 mt-2 mr-2" />
              <span className="text-sm font-medium text-gray-700 mt-2 mr-2">Tipo:</span>
              {challengeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeFilter(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                    selectedType === type.id
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>

            {/* Filtro de Tempo */}
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <select
                value={selectedTime}
                onChange={(e) => handleTimeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              >
                {timeFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredChallenges.length} desafio{filteredChallenges.length !== 1 ? 's' : ''} encontrado{filteredChallenges.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Lista de Desafios */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onJoin={handleJoinChallenge}
                hasUserJoined={userChallenges.includes(challenge.id)}
                isCompleted={challenge.completedBy.includes(currentUser.id)}
              />
            ))}
          </div>
        )}

        {/* Estado Vazio */}
        {!isLoading && filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum desafio encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou criar um novo desafio.
            </p>
            <button
              onClick={handleCreateChallenge}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center mx-auto"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Criar Desafio
            </button>
          </div>
        )}

        {/* Dicas para Desafios */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            💡 Dicas para Desafios
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="mb-2">
                <strong>Individual:</strong> Desafios que você pode completar sozinho
              </p>
              <p className="mb-2">
                <strong>Equipe:</strong> Forme um grupo pequeno (3-10 pessoas)
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Comunidade:</strong> Toda a comunidade participa junto
              </p>
              <p className="mb-2">
                <strong>Pontos:</strong> Ganhe pontos para subir de nível e desbloquear rewards
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
