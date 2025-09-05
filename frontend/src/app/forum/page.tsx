'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/Loading';
import { mockForumPosts, mockUsers } from '@/lib/mockData';
import { 
  ChatBubbleLeftRightIcon,
  PlusIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const categories = [
  { id: 'all', name: 'Todos', color: 'bg-gray-100 text-gray-800' },
  { id: 'general', name: 'Geral', color: 'bg-blue-100 text-blue-800' },
  { id: 'project_discussion', name: 'Projetos', color: 'bg-green-100 text-green-800' },
  { id: 'help', name: 'Ajuda', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'announcements', name: 'Anúncios', color: 'bg-purple-100 text-purple-800' },
  { id: 'feedback', name: 'Feedback', color: 'bg-pink-100 text-pink-800' },
];

export default function ForumPage() {
  const [posts, setPosts] = useState(mockForumPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockForumPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const currentUser = mockUsers[0];

  // Função de busca e filtro
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterPosts(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterPosts(searchTerm, category);
  };

  const filterPosts = (search: string, category: string) => {
    let filtered = posts;

    // Filtro por busca
    if (search) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
        post.author.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro por categoria
    if (category !== 'all') {
      filtered = filtered.filter(post => post.category === category);
    }

    // Ordenar: posts fixados primeiro, depois por data
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredPosts(filtered);
  };

  const handleLikePost = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes - 1 }
          : post
      ));
    } else {
      setLikedPosts(prev => [...prev, postId]);
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
    }
    // Reaplica os filtros após a alteração
    filterPosts(searchTerm, selectedCategory);
  };

  const handleCreatePost = () => {
    // TODO: Implementar modal de criação de post
    alert('Funcionalidade de criar post será implementada em breve!');
  };

  const getCategoryColor = (category: string) => {
    const found = categories.find(cat => cat.id === category);
    return found ? found.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryName = (category: string) => {
    const found = categories.find(cat => cat.id === category);
    return found ? found.name : category;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora há pouco';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <ChatBubbleLeftRightIcon className="w-8 h-8 mr-3 text-blue-500" />
              Fórum da Comunidade
            </h1>
            <p className="text-gray-600">Compartilhe ideias, tire dúvidas e participe das discussões</p>
          </div>
          <button
            onClick={handleCreatePost}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Nova Discussão
          </button>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Posts</p>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HeartIcon className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Likes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {posts.reduce((sum, post) => sum + post.likes, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChatBubbleOvalLeftIcon className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Respostas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {posts.reduce((sum, post) => sum + post.replies.length, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">👥</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Membros Ativos</p>
                <p className="text-2xl font-bold text-gray-900">128</p>
              </div>
            </div>
          </div>
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
              placeholder="Buscar discussões por título, conteúdo, tags ou autor..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
        </div>

        {/* Resultados */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredPosts.length} discussão{filteredPosts.length !== 1 ? 'ões' : ''} encontrada{filteredPosts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Lista de Posts */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header do Post */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author.avatar || '/avatars/maria.svg'}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{post.author.name}</p>
                        <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {post.isPinned && (
                        <div className="flex items-center text-yellow-500">
                          <BookmarkIcon className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">Fixado</span>
                        </div>
                      )}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {getCategoryName(post.category)}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center space-x-2 text-sm ${
                          likedPosts.includes(post.id)
                            ? 'text-red-600'
                            : 'text-gray-500 hover:text-red-600'
                        }`}
                      >
                        {likedPosts.includes(post.id) ? (
                          <HeartSolidIcon className="w-4 h-4" />
                        ) : (
                          <HeartIcon className="w-4 h-4" />
                        )}
                        <span>{post.likes}</span>
                      </button>

                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                        <span>{post.replies.length} respostas</span>
                      </div>
                    </div>

                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Ver discussão completa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado Vazio */}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma discussão encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou inicie uma nova discussão.
            </p>
            <button
              onClick={handleCreatePost}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Nova Discussão
            </button>
          </div>
        )}

        {/* Regras do Fórum */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            📋 Regras do Fórum
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="mb-2">• Seja respeitoso com todos os membros</p>
              <p className="mb-2">• Mantenha as discussões relacionadas à comunidade</p>
              <p className="mb-2">• Use as categorias apropriadas</p>
            </div>
            <div>
              <p className="mb-2">• Não compartilhe informações pessoais</p>
              <p className="mb-2">• Evite spam e conteúdo irrelevante</p>
              <p className="mb-2">• Reporte conteúdo inadequado</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
