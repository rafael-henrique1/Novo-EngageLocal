# 🏙️ Engage Local - Plataforma de Gamificação Comunitária

Uma plataforma web interativa que transforma a participação comunitária em uma experiência envolvente e divertida, incentivando mais pessoas a contribuir para o bem-estar e melhoria de suas comunidades através de elementos de gamificação.

## 🎯 Objetivo

Desenvolver uma plataforma que promova o engajamento comunitário através de:
- Submissão e votação de projetos de melhoria local
- Sistema de desafios e missões comunitárias
- Pontuação, níveis e recompensas
- Fórum para discussão e colaboração

## 🏗️ Arquitetura do Projeto

Este é um **monorepo** organizado com frontend e backend separados:

```
📁 engage-local/
├── 📁 frontend/          # Aplicação Next.js (React + TypeScript)
│   ├── 📁 src/
│   │   ├── � app/       # App Router do Next.js
│   │   ├── 📁 components/ # Componentes React
│   │   ├── 📁 types/     # Tipos TypeScript
│   │   └── � lib/       # Utilitários e dados mock
│   ├── 📁 public/        # Arquivos estáticos
│   └── package.json      # Dependências do frontend
├── � backend/           # API RESTful (Node.js + Express)
│   ├── 📁 src/
│   │   ├── 📁 routes/    # Endpoints da API
│   │   ├── 📁 controllers/ # Lógica de negócio
│   │   ├── 📁 models/    # Modelos de dados
│   │   ├── 📁 middleware/ # Middlewares
│   │   └── 📁 utils/     # Utilitários
│   └── package.json      # Dependências do backend
├── package.json          # Scripts do monorepo
└── README.md            # Esta documentação
```

## 🛠️ Tecnologias

### Frontend
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS
- **Heroicons** - Biblioteca de ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados (a ser implementado)
- **JWT** - Autenticação (a ser implementado)
- **Helmet** - Segurança

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm

### Instalação Completa

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rafael-henrique1/Novo-EngageLocal.git
   cd Novo-EngageLocal
   ```

2. **Instale todas as dependências:**
   ```bash
   npm run install:all
   ```

3. **Configure o backend:**
   ```bash
   cd backend
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   cd ..
   ```

### Executando o Projeto

**Opção 1: Executar tudo junto (Recomendado)**
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

**Opção 2: Executar separadamente**
```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend  
npm run dev:backend
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Executa frontend + backend
npm run dev:frontend     # Apenas frontend
npm run dev:backend      # Apenas backend

# Build
npm run build           # Build completo
npm run build:frontend  # Build do frontend
npm run build:backend   # Build do backend

# Produção
npm start              # Executa ambos em produção
npm run start:frontend # Frontend em produção
npm run start:backend  # Backend em produção

# Utilitários
npm run install:all    # Instala todas as dependências
npm run clean         # Remove node_modules
npm run lint          # Verifica código
npm run test          # Executa testes
```

## 📱 Funcionalidades Implementadas

### ✅ V1.0 - MVP (Atual)
- [x] Interface principal responsiva
- [x] Sistema de navegação
- [x] Cards de projetos com votação
- [x] Cards de desafios com participação
- [x] Perfil de usuário com estatísticas
- [x] Sistema de pontuação e níveis
- [x] Dados mock para demonstração

### 🔄 Próximas Versões

#### V2.0 - Backend e Autenticação
- [ ] API RESTful com Node.js
- [ ] Sistema de autenticação
- [ ] Banco de dados (PostgreSQL/MongoDB)
- [ ] CRUD completo para projetos e desafios

#### V3.0 - Funcionalidades Avançadas
- [ ] Sistema de notificações
- [ ] Upload de imagens
- [ ] Chat em tempo real
- [ ] Dashboard administrativo

#### V4.0 - Mobile e Integrações
- [ ] Aplicativo móvel (React Native)
- [ ] Integração com redes sociais
- [ ] APIs para parceiros
- [ ] Sistema de recompensas reais

## 🎨 Design e UX

### Princípios de Design
- **Gamificação**: Elementos visuais que motivam engajamento
- **Acessibilidade**: Interface inclusiva para todos os usuários
- **Responsividade**: Funciona em todos os dispositivos
- **Intuitividade**: Navegação simples e clara

### Cores e Tema
- **Primária**: Azul (#2563eb) - Confiança e estabilidade
- **Secundária**: Roxo (#7c3aed) - Criatividade e inovação
- **Sucesso**: Verde (#10b981) - Conquistas e progresso
- **Aviso**: Amarelo (#f59e0b) - Atenção e urgência

## 🏗️ Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
│   ├── globals.css     # Estilos globais
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página inicial
├── components/          # Componentes React
│   ├── Navbar.tsx      # Navegação principal
│   ├── ProjectCard.tsx # Card de projeto
│   ├── ChallengeCard.tsx # Card de desafio
│   └── UserStats.tsx   # Estatísticas do usuário
├── types/              # Definições TypeScript
│   └── index.ts        # Tipos principais
└── lib/                # Utilitários
    └── mockData.ts     # Dados de demonstração
```

## 👥 Público-Alvo

- **Faixa Etária**: 16-60 anos
- **Perfil**: Moradores interessados em melhorias locais
- **Organizações**: ONGs, empresas, governo
- **Local**: Áreas urbanas e suburbanas

## 🎯 Objetivos de Impacto

### Primários
- Aumentar o engajamento comunitário
- Facilitar a realização de projetos locais
- Fortalecer o senso de comunidade

### Secundários
- Melhorar a qualidade de vida local
- Promover a colaboração cidadã
- Criar uma rede de apoio comunitário

## 📈 Métricas de Sucesso

- Número de usuários ativos
- Projetos submetidos e concluídos
- Taxa de participação em desafios
- Engajamento no fórum
- Impacto real na comunidade

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através dos canais da equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para fortalecer comunidades locais**
