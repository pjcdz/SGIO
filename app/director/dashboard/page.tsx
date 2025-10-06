'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/ui/header-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bell, Plus } from 'lucide-react';

interface Obra {
  id: number;
  titulo: string;
  avance: number;
  estadoAvance: 'en-tiempo' | 'en-riesgo' | 'atrasado';
  presupuestoUsado: number;
  hitoActual: string;
}

interface Alerta {
  id: number;
  tipo: 'warning' | 'danger' | 'info';
  mensaje: string;
  obra: string;
  fecha: string;
}

export default function DirectorDashboard() {
  const [obras] = useState<Obra[]>([
    { id: 1, titulo: 'Casa Familia López - Barrio Los Robles', avance: 45, estadoAvance: 'en-tiempo', presupuestoUsado: 42, hitoActual: 'Estructura y Mampostería' },
    { id: 2, titulo: 'Casa Familia Fernández - Country Club', avance: 75, estadoAvance: 'en-riesgo', presupuestoUsado: 78, hitoActual: 'Instalaciones' },
    { id: 3, titulo: 'Casa Familia Martínez - Zona Norte', avance: 15, estadoAvance: 'en-tiempo', presupuestoUsado: 18, hitoActual: 'Cimientos' },
  ]);

  const [alertas] = useState<Alerta[]>([
    { id: 1, tipo: 'warning', mensaje: 'Casa Fernández: Presupuesto al 78% en hito "Instalaciones"', obra: 'Casa Familia Fernández', fecha: 'Hace 2 horas' },
    { id: 2, tipo: 'info', mensaje: 'Nuevo parte diario recibido de Casa López', obra: 'Casa Familia López', fecha: 'Hace 1 hora' },
    { id: 3, tipo: 'warning', mensaje: 'Casa Fernández: Hito "Instalaciones" puede retrasarse 3 días', obra: 'Casa Familia Fernández', fecha: 'Hace 4 horas' },
    { id: 4, tipo: 'info', mensaje: 'Factura de materiales procesada para Casa Martínez', obra: 'Casa Familia Martínez', fecha: 'Ayer' },
  ]);

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'en-tiempo':
        return 'default'; // Verde
      case 'en-riesgo':
        return 'secondary'; // Amarillo
      case 'atrasado':
        return 'destructive'; // Rojo
      default:
        return 'outline';
    }
  };

  const getBadgeClass = (estado: string) => {
    switch (estado) {
      case 'en-tiempo':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'en-riesgo':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'atrasado':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return '';
    }
  };

  const getProgressColor = (valor: number, tipo: 'avance' | 'presupuesto') => {
    if (tipo === 'avance') {
      // Avance: Verde es bueno
      if (valor >= 75) return 'bg-green-500';
      if (valor >= 50) return 'bg-blue-500';
      if (valor >= 25) return 'bg-blue-400';
      return 'bg-blue-300';
    } else {
      // Presupuesto: Amarillo/Rojo si se pasa
      if (valor >= 90) return 'bg-red-500';
      if (valor >= 75) return 'bg-yellow-500';
      if (valor >= 50) return 'bg-blue-500';
      return 'bg-green-500';
    }
  };

  const getAlertaStyles = (tipo: string) => {
    switch (tipo) {
      case 'danger':
        return {
          badge: 'bg-red-100 text-red-800 hover:bg-red-200',
          icon: '🔴',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          border: 'border-l-4 border-l-red-500'
        };
      case 'warning':
        return {
          badge: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
          icon: '⚠️',
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          border: 'border-l-4 border-l-amber-500'
        };
      case 'info':
        return {
          badge: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
          icon: '✓',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          border: 'border-l-4 border-l-blue-500'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-800',
          icon: '•',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          border: 'border-l-4 border-l-gray-300'
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav rol="director" />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Centro de Notificaciones */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Centro de Notificaciones</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
              Marcar todas como leídas
            </Button>
          </div>
          <div className="grid gap-3">
            {alertas.map((alerta) => {
              const styles = getAlertaStyles(alerta.tipo);
              return (
                <Card key={alerta.id} className={`transition hover:shadow-lg cursor-pointer ${styles.border}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${styles.iconBg}`}>
                        <span className="text-xl">{styles.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="mb-2 font-semibold text-foreground leading-snug">{alerta.mensaje}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="font-medium">{alerta.obra}</span>
                          <span className="text-muted-foreground/50">•</span>
                          <span>{alerta.fecha}</span>
                        </div>
                      </div>
                      <Badge className={`${styles.badge} font-semibold px-3 py-1`}>
                        {alerta.tipo === 'warning' ? 'Advertencia' : alerta.tipo === 'info' ? 'Info' : 'Crítico'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Obras */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Obras en Curso</h2>
            <Button className="shadow-lg hover:shadow-xl transition-shadow">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Obra
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {obras.map((obra) => {
              // Determinar color del borde según estado
              const borderColor = 
                obra.estadoAvance === 'en-tiempo' ? 'border-l-green-500' :
                obra.estadoAvance === 'en-riesgo' ? 'border-l-amber-500' :
                'border-l-red-500';
              
              return (
                <Link key={obra.id} href={`/director/obra/${obra.id}`}>
                  <Card className={`group cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1 border-l-4 ${borderColor} overflow-hidden relative`}>
                    {/* Decoración de fondo */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                        <path d="M50 10 L90 90 L10 90 Z" fill="currentColor" />
                      </svg>
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {obra.titulo}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-5">
                      {/* Hito Actual con estilo mejorado */}
                      <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-3 border-l-2 border-blue-500">
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                          Hito Actual
                        </p>
                        <p className="font-semibold text-foreground text-sm">{obra.hitoActual}</p>
                      </div>

                      {/* KPI de Avance mejorado */}
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            Avance del Hito
                          </span>
                          <span className="text-lg font-bold text-foreground">{obra.avance}%</span>
                        </div>
                        <div className="relative">
                          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                            <div 
                              className={`h-full transition-all duration-500 ease-out ${getProgressColor(obra.avance, 'avance')} relative`}
                              style={{ width: `${obra.avance}%` }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge className={`text-xs font-semibold ${getBadgeClass(obra.estadoAvance)}`}>
                            {obra.estadoAvance === 'en-tiempo' ? '✓ En Tiempo' : 
                             obra.estadoAvance === 'en-riesgo' ? '⚠ En Riesgo' : 
                             '⚠ Atrasado'}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {obra.avance < 25 ? 'Inicio' : 
                             obra.avance < 50 ? 'En desarrollo' : 
                             obra.avance < 75 ? 'Avanzado' : 
                             'Por finalizar'}
                          </span>
                        </div>
                      </div>

                      {/* KPI de Presupuesto mejorado */}
                      <div className="pt-3 border-t">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            Presupuesto Consumido
                          </span>
                          <span className="text-lg font-bold text-foreground">{obra.presupuestoUsado}%</span>
                        </div>
                        <div className="relative">
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                            <div 
                              className={`h-full transition-all duration-500 ${getProgressColor(obra.presupuestoUsado, 'presupuesto')}`}
                              style={{ width: `${obra.presupuestoUsado}%` }}
                            />
                          </div>
                          {/* Indicador de estado presupuestario */}
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className={
                              obra.presupuestoUsado > 90 ? 'text-red-600 font-semibold' :
                              obra.presupuestoUsado > 75 ? 'text-amber-600 font-semibold' :
                              'text-green-600 font-semibold'
                            }>
                              {obra.presupuestoUsado > 90 ? '⚠ Crítico' :
                               obra.presupuestoUsado > 75 ? '⚠ Alerta' :
                               '✓ Controlado'}
                            </span>
                            <span className="text-slate-500">
                              {obra.presupuestoUsado > obra.avance + 5 ? 
                                'Gasto superior al avance' : 
                                'Gasto controlado'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
