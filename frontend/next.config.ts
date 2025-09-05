import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Configuração para resolver warning sobre múltiplos lockfiles
  outputFileTracingRoot: path.join(__dirname, '../'),
  
  // Removendo Turbopack por instabilidade
  images: {
    // Permitir imagens de domínios externos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.placeholder.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    // Formatos de imagem suportados
    formats: ['image/webp', 'image/avif'],
  },
  // Configuração de ESLint
  eslint: {
    // Permitir build mesmo com warnings de ESLint
    ignoreDuringBuilds: false,
  },
  // Configuração de TypeScript
  typescript: {
    // Não parar o build por erros de TypeScript em desenvolvimento
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
