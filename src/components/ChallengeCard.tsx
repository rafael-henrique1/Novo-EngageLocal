import { Challenge } from '@/types';
import { 
  TrophyIcon, 
  CalendarIcon, 
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
  hasUserJoined?: boolean;
  isCompleted?: boolean;
}

export default function ChallengeCard({ 
  challenge, 
  onJoin, 
  hasUserJoined = false,
  isCompleted = false 
}: ChallengeCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'individual':
        return 'bg-blue-100 text-blue-800';
      case 'team':
        return 'bg-green-100 text-green-800';
      case 'community':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'individual':
        return 'Individual';
      case 'team':
        return 'Equipe';
      case 'community':
        return 'Comunidade';
      default:
        return type;
    }
  };

  const isExpired = challenge.deadline && new Date(challenge.deadline) < new Date();
  const daysLeft = challenge.deadline 
    ? Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border ${
      isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="p-6">
        {/* Header com tipo e status */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(challenge.type)}`}>
            {getTypeText(challenge.type)}
          </span>
          
          {isCompleted && (
            <div className="flex items-center text-green-600">
              <CheckCircleIcon className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Concluído</span>
            </div>
          )}
          
          {isExpired && !isCompleted && (
            <span className="text-red-600 text-sm font-medium">Expirado</span>
          )}
        </div>

        {/* Título e descrição */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <TrophyIcon className="w-5 h-5 mr-2 text-yellow-500" />
          {challenge.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {challenge.description}
        </p>

        {/* Pontos */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
          <TrophyIcon className="w-4 h-4 mr-1" />
          {challenge.points} pontos
        </div>

        {/* Deadline */}
        {challenge.deadline && (
          <div className="flex items-center mb-4">
            <CalendarIcon className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">
              Prazo: {new Date(challenge.deadline).toLocaleDateString('pt-BR')}
            </span>
            {daysLeft !== null && daysLeft > 0 && (
              <span className={`ml-2 text-xs ${daysLeft <= 3 ? 'text-red-600' : 'text-gray-500'}`}>
                ({daysLeft} dia{daysLeft !== 1 ? 's' : ''} restante{daysLeft !== 1 ? 's' : ''})
              </span>
            )}
          </div>
        )}

        {/* Requisitos */}
        {challenge.requirements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Requisitos:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {challenge.requirements.slice(0, 2).map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {requirement}
                </li>
              ))}
              {challenge.requirements.length > 2 && (
                <li className="text-xs text-gray-500">
                  +{challenge.requirements.length - 2} requisito(s) adicional(is)
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Participantes */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <UserGroupIcon className="w-4 h-4 mr-1" />
            {challenge.completedBy.length} participante{challenge.completedBy.length !== 1 ? 's' : ''}
          </div>
          
          {challenge.type === 'team' && (
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="w-4 h-4 mr-1" />
              Equipe necessária
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          {!isCompleted && !isExpired && (
            <>
              {hasUserJoined ? (
                <button className="flex-1 bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm font-medium cursor-default">
                  Participando
                </button>
              ) : (
                <button
                  onClick={() => onJoin?.(challenge.id)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Participar
                </button>
              )}
            </>
          )}
          
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
