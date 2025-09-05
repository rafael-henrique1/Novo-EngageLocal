import { User } from '@/types';
import Image from 'next/image';
import { 
  TrophyIcon,
  StarIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

interface UserStatsProps {
  user: User;
  stats?: {
    totalProjects: number;
    totalVotes: number;
    challengesCompleted: number;
    forumPosts: number;
  };
}

export default function UserStats({ user, stats }: UserStatsProps) {
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

  const getUserTypeText = (type: string) => {
    switch (type) {
      case 'resident':
        return 'Morador';
      case 'ngo':
        return 'ONG';
      case 'company':
        return 'Empresa';
      case 'government':
        return 'Governo';
      default:
        return type;
    }
  };

  const progress = getLevelProgress(user.level, user.points);
  const pointsToNext = getNextLevelPoints(user.level, user.points);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header do perfil */}
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={user.avatar || '/avatars/maria.svg'}
          alt={user.name}
          className="rounded-full object-cover border-4 border-blue-100"
          width={80}
          height={80}
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600 mb-1">{getUserTypeText(user.type)}</p>
          {user.bio && (
            <p className="text-sm text-gray-700">{user.bio}</p>
          )}
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-1" />
            Membro desde {new Date(user.joinedAt).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Nível e progresso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <TrophyIcon className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-lg font-semibold text-gray-900">Nível {user.level}</span>
          </div>
          <span className="text-sm text-gray-600">{user.points.toLocaleString()} pontos</span>
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

      {/* Badges */}
      {user.badges.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <StarIcon className="w-4 h-4 mr-2 text-yellow-500" />
            Conquistas Recentes
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {user.badges.slice(0, 6).map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                title={badge.description}
              >
                <span className="text-2xl mb-1">{badge.icon}</span>
                <span className="text-xs text-center text-gray-700 line-clamp-2">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
          {user.badges.length > 6 && (
            <p className="text-xs text-gray-500 text-center mt-2">
              +{user.badges.length - 6} conquista(s) adicional(is)
            </p>
          )}
        </div>
      )}

      {/* Estatísticas */}
      {stats && (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalProjects}</div>
            <div className="text-xs text-blue-700">Projetos</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.challengesCompleted}</div>
            <div className="text-xs text-green-700">Desafios</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.totalVotes}</div>
            <div className="text-xs text-purple-700">Votos</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.forumPosts}</div>
            <div className="text-xs text-orange-700">Posts</div>
          </div>
        </div>
      )}
    </div>
  );
}
