'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import LoadingSpinner, { LoadingCard } from '@/components/Loading';
import { mockProjects } from '@/lib/mockData';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline';

const categories = [
  { id: 'all', name: 'Todos', color: 'bg-gray-100 text-gray-800' },
  { id: 'environment', name: 'Meio Ambiente', color: 'bg-green-100 text-green-800' },
  { id: 'infrastructure', name: 'Infraestrutura', color: 'bg-blue-100 text-blue-800' },
  { id: 'social', name: 'Social', color: 'bg-pink-100 text-pink-800' },
  { id: 'education', name: 'Educação', color: 'bg-purple-100 text-purple-800' },
  { id: 'health', name: 'Saúde', color: 'bg-red-100 text-red-800' },
  { id: 'culture', name: 'Cultura', color: 'bg-indigo-100 text-indigo-800' },
];

const statusOptions = [
  { id: 'all', name: 'Todos' },
  { id: 'proposed', name: 'Propostos' },
  { id: 'approved', name: 'Aprovados' },
  { id: 'in_progress', name: 'Em Andamento' },
  { id: 'completed', name: 'Concluídos' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [userVotes, setUserVotes] = useState<string[]>([]);

  // Função de busca e filtro
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProjects(term, selectedCategory, selectedStatus);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProjects(searchTerm, category, selectedStatus);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    filterProjects(searchTerm, selectedCategory, status);
  };

  const filterProjects = (search: string, category: string, status: string) => {
    let filtered = projects;

    // Filtro por busca
    if (search) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Filtro por categoria
    if (category !== 'all') {
      filtered = filtered.filter(project => project.category === category);
    }

    // Filtro por status
    if (status !== 'all') {
      filtered = filtered.filter(project => project.status === status);
    }

    setFilteredProjects(filtered);
  };

  const handleVote = (projectId: string) => {
    if (userVotes.includes(projectId)) {
      setUserVotes(prev => prev.filter(id => id !== projectId));
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, votes: project.votes - 1 }
          : project
      ));
    } else {
      setUserVotes(prev => [...prev, projectId]);
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, votes: project.votes + 1 }
          : project
      ));
    }
    // Reaplica os filtros após a alteração
    filterProjects(searchTerm, selectedCategory, selectedStatus);
  };

  const handleCreateProject = () => {
    // TODO: Implementar modal de criação de projeto
    alert('Funcionalidade de criar projeto será implementada em breve!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Projetos da Comunidade</h1>
            <p className="text-gray-600">Descubra e vote nos projetos que podem transformar nossa comunidade</p>
          </div>
          <button
            onClick={handleCreateProject}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Criar Projeto
          </button>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Barra de Busca */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar projetos por nome, descrição ou tags..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Categorias */}
              <div className="flex flex-wrap gap-2">
                <FunnelIcon className="h-5 w-5 text-gray-500 mt-2 mr-2" />
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? category.color
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Status */}
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Modo de Visualização */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Lista de Projetos */}
        {!isLoading && (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onVote={handleVote}
                hasUserVoted={userVotes.includes(project.id)}
              />
            ))}
          </div>
        )}

        {/* Estado Vazio */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou criar um novo projeto.
            </p>
            <button
              onClick={handleCreateProject}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Criar Projeto
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
