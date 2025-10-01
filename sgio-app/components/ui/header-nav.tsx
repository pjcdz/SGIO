'use client';

import Link from 'next/link';
import { Building2, Home, LogOut, FolderOpen, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  rol: 'director' | 'contador' | 'capataz';
  nombre?: string;
}

const roleConfig = {
  director: {
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    icon: Building2,
    title: 'Director',
    subtitle: 'Administración',
    links: [
      { href: '/director/archivo', label: 'Archivo', icon: FolderOpen },
      { href: '/director/costos', label: 'Costos', icon: DollarSign }
    ]
  },
  contador: {
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    icon: Building2,
    title: 'Contador',
    subtitle: 'Finanzas',
    links: []
  },
  capataz: {
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    icon: Building2,
    title: 'Capataz',
    subtitle: 'Obra',
    links: []
  }
};

export default function HeaderNav({ rol, nombre = 'Usuario' }: HeaderProps) {
  const config = roleConfig[rol];
  const Icon = config.icon;

  const handleLogout = () => {
    localStorage.removeItem('sgio-user');
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={`/${rol}/dashboard`} className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.bgColor}`}>
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">SGIO</h1>
            <p className="text-xs text-muted-foreground">
              Sistema de Gestión Integral de Obras
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {config.links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" size="sm">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}

          <div className="flex items-center gap-3 border-l pl-4">
            <div className="text-right">
              <p className="text-sm font-medium">{config.title}</p>
              <p className="text-xs text-muted-foreground">{config.subtitle}</p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${config.bgColor}`}>
              <span className={`text-sm font-semibold ${config.color}`}>
                {nombre.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
