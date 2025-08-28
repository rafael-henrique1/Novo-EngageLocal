import { Project } from '@/types';
import { 
  HeartIcon, 
  UserGroupIcon, 
  CalendarIcon,
  TagIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface ProjectCardProps {
  project: Project;
  onVote?: (projectId: string) => void;
  hasUserVoted?: boolean;
}

export default function ProjectCard({ project, onVote, hasUserVoted = false }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposed':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'proposed':
        return 'Proposto';
      case 'approved':
        return 'Aprovado';
      case 'in_progress':
        return 'Em Andamento';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environment':
        return 'bg-green-500';
      case 'infrastructure':
        return 'bg-blue-500';
      case 'social':
        return 'bg-pink-500';
      case 'education':
        return 'bg-indigo-500';
      case 'health':
        return 'bg-red-500';
      case 'culture':
        return 'bg-purple-500';
      case 'sports':
        return 'bg-orange-500';
      case 'technology':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        {/* Header com status e categoria */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </span>
          <div className={`w-3 h-3 rounded-full ${getCategoryColor(project.category)}`} title={project.category}></div>
        </div>

        {/* Título e descrição */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{project.tags.length - 3} mais</span>
            )}
          </div>
        )}

        {/* Autor e data */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={project.author.avatar || '/api/placeholder/24/24'}
              alt={project.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700">{project.author.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {new Date(project.createdAt).toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Participantes */}
        {project.participants.length > 0 && (
          <div className="flex items-center mb-4">
            <UserGroupIcon className="w-4 h-4 text-gray-500 mr-2" />
            <div className="flex -space-x-2">
              {project.participants.slice(0, 3).map((participant, index) => (
                <img
                  key={participant.id}
                  src={participant.avatar || '/api/placeholder/24/24'}
                  alt={participant.name}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  title={participant.name}
                />
              ))}
              {project.participants.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600">+{project.participants.length - 3}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {project.participants.length} participante{project.participants.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Footer com votos e ações */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => onVote?.(project.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              hasUserVoted
                ? 'text-red-600 bg-red-50 hover:bg-red-100'
                : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {hasUserVoted ? (
              <HeartSolidIcon className="w-4 h-4" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )}
            <span>{project.votes}</span>
          </button>

          <div className="flex space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Ver Detalhes
            </button>
            {project.status === 'approved' && (
              <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                Participar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
