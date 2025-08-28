# 🏙️ Engage Local - Plataforma de Gamificação Comunitária

Uma plataforma web interativa que transforma a participação comunitária em uma experiência envolvente e divertida, incentivando mais pessoas a contribuir para o bem-estar e melhoria de suas comunidades através de elementos de gamificação.

## 🎯 Objetivo

Desenvolver uma plataforma que promova o engajamento comunitário através de:
- Submissão e votação de projetos de melhoria local
- Sistema de desafios e missões comunitárias
- Pontuação, níveis e recompensas
- Fórum para discussão e colaboração

## ✨ Funcionalidades Principais

### 🙋‍♀️ Cadastro de Usuários
- Moradores locais, ONGs, empresas e entidades governamentais
- Perfis personalizados com níveis e conquistas
- Sistema de tipos de usuário

### 📋 Submissão de Projetos
- Propostas de melhoria comunitária
- Categorias: meio ambiente, infraestrutura, social, educação, saúde, cultura, esportes, tecnologia
- Imagens, tags e participantes

### 🗳️ Sistema de Votação
- Votação em projetos da comunidade
- Projetos com mais votos ganham destaque
- Sistema anti-manipulação

### 🏆 Desafios e Missões
- Desafios individuais, em equipe e comunitários
- Prazos e requisitos específicos
- Pontuação por completude

### 📊 Sistema de Pontuação e Níveis
- Pontos por ações: submeter projetos, votar, completar desafios
- Sistema de níveis progressivos
- Badges e conquistas

### 🎁 Recompensas
- Reconhecimento na plataforma
- Badges exclusivos
- Descontos em serviços locais
- Ingressos para eventos

### 💬 Fórum e Comunidade
- Discussão de ideias
- Formação de equipes
- Compartilhamento de sucessos
- Categorias organizadas

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Ícones**: Heroicons
- **Build Tool**: Turbopack
- **Linting**: ESLint

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm

### Instalação

1. Clone o repositório
```bash
git clone [repository-url]
cd engage-local
```

2. Instale as dependências
```bash
npm install
```

3. Execute o servidor de desenvolvimento
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
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
