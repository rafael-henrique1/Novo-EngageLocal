'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  PlusIcon, 
  TrophyIcon, 
  ChatBubbleLeftRightIcon,
  UserIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Início', href: '/', icon: HomeIcon },
  { name: 'Projetos', href: '/projects', icon: PlusIcon },
  { name: 'Desafios', href: '/challenges', icon: TrophyIcon },
  { name: 'Fórum', href: '/forum', icon: ChatBubbleLeftRightIcon },
  { name: 'Perfil', href: '/profile', icon: UserIcon },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo e nome */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <TrophyIcon className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">Engage Local</span>
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Notificações e perfil */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Maria Silva</p>
                <p className="text-xs text-gray-500">Nível 5 • 1.250 pts</p>
              </div>
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="/api/placeholder/32/32"
                alt="Avatar"
              />
            </div>
          </div>

          {/* Botão menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center px-3 py-2">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="/api/placeholder/40/40"
                  alt="Avatar"
                />
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-900">Maria Silva</p>
                  <p className="text-sm text-gray-500">Nível 5 • 1.250 pts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
