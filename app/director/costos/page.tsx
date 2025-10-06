'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, DollarSign, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Partida {
  id: number;
  nombre: string;
  categoria: string;
  presupuestado: number;
  gastado: number;
  comprometido: number;
  disponible: number;
}

export default function GestionCostos() {
  const [vistaActiva, setVistaActiva] = useState<'resumen' | 'partidas' | 'transacciones'>('resumen');

  const [partidas] = useState<Partida[]>([
    { id: 1, nombre: 'Hierro y Acero', categoria: 'Materiales', presupuestado: 65000, gastado: 32500, comprometido: 15000, disponible: 17500 },
    { id: 2, nombre: 'Cemento y Áridos', categoria: 'Materiales', presupuestado: 48000, gastado: 35000, comprometido: 8000, disponible: 5000 },
    { id: 3, nombre: 'Ladrillos y Bloques', categoria: 'Materiales', presupuestado: 38000, gastado: 28500, comprometido: 6000, disponible: 3500 },
    { id: 4, nombre: 'Madera para Encofrado', categoria: 'Materiales', presupuestado: 22000, gastado: 18000, comprometido: 0, disponible: 4000 },
    { id: 9, nombre: 'Oficial Albañil', categoria: 'Mano de Obra', presupuestado: 45000, gastado: 28000, comprometido: 10000, disponible: 7000 },
    { id: 10, nombre: 'Ayudantes', categoria: 'Mano de Obra', presupuestado: 32000, gastado: 18500, comprometido: 8000, disponible: 5500 },
    { id: 14, nombre: 'Alquiler de Maquinaria', categoria: 'Equipamiento', presupuestado: 18000, gastado: 12500, comprometido: 3000, disponible: 2500 },
    { id: 15, nombre: 'Herramientas', categoria: 'Equipamiento', presupuestado: 8000, gastado: 5500, comprometido: 1500, disponible: 1000 },
  ]);

  const totalPresupuestado = partidas.reduce((sum, p) => sum + p.presupuestado, 0);
  const totalGastado = partidas.reduce((sum, p) => sum + p.gastado, 0);
  const totalComprometido = partidas.reduce((sum, p) => sum + p.comprometido, 0);
  const totalDisponible = partidas.reduce((sum, p) => sum + p.disponible, 0);

  const porcentajeGastado = (totalGastado / totalPresupuestado) * 100;
  const porcentajeComprometido = (totalComprometido / totalPresupuestado) * 100;
  const porcentajeDisponible = (totalDisponible / totalPresupuestado) * 100;

  const categorias = ['Materiales', 'Mano de Obra', 'Equipamiento', 'Logística'];

  const getCategoriaTotales = (categoria: string) => {
    const partidasCategoria = partidas.filter(p => p.categoria === categoria);
    const presupuestado = partidasCategoria.reduce((sum, p) => sum + p.presupuestado, 0);
    const gastado = partidasCategoria.reduce((sum, p) => sum + p.gastado, 0);
    const porcentaje = presupuestado > 0 ? (gastado / presupuestado) * 100 : 0;
    return { presupuestado, gastado, porcentaje };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/director/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Gestión de Costos</h1>
                <p className="text-sm text-muted-foreground">Casa Familia López - Barrio Los Robles</p>
              </div>
            </div>
            <Link href="/director/dashboard">
              <Button>Volver al Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={vistaActiva === 'resumen' ? 'default' : 'outline'}
            onClick={() => setVistaActiva('resumen')}
          >
            📊 Resumen
          </Button>
          <Button
            variant={vistaActiva === 'partidas' ? 'default' : 'outline'}
            onClick={() => setVistaActiva('partidas')}
          >
            💰 Partidas
          </Button>
          <Button
            variant={vistaActiva === 'transacciones' ? 'default' : 'outline'}
            onClick={() => setVistaActiva('transacciones')}
          >
            📝 Transacciones
          </Button>
        </div>

        {vistaActiva === 'resumen' && (
          <div className="space-y-6">
            {/* KPIs Principales */}
            <div className="grid gap-6 md:grid-cols-4">
              {/* Presupuesto Total */}
              <Card className="relative overflow-hidden border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    Presupuesto Total
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    ${totalPresupuestado.toLocaleString()}
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-1">Monto total asignado</p>
                </CardHeader>
                <div className="absolute top-2 right-2 rounded-full bg-blue-100 p-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </Card>

              {/* Gastado */}
              <Card className="relative overflow-hidden border-t-4 border-t-green-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                    Gastado
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    ${totalGastado.toLocaleString()}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                        style={{ width: `${porcentajeGastado}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-green-600">
                      {porcentajeGastado.toFixed(1)}%
                    </span>
                  </div>
                </CardHeader>
                <div className="absolute top-2 right-2 rounded-full bg-green-100 p-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </Card>

              {/* Comprometido */}
              <Card className="relative overflow-hidden border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                    Comprometido
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    ${totalComprometido.toLocaleString()}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                        style={{ width: `${porcentajeComprometido}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-amber-600">
                      {porcentajeComprometido.toFixed(1)}%
                    </span>
                  </div>
                </CardHeader>
                <div className="absolute top-2 right-2 rounded-full bg-amber-100 p-2">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </Card>

              {/* Disponible */}
              <Card className="relative overflow-hidden border-t-4 border-t-emerald-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                    Disponible
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    ${totalDisponible.toLocaleString()}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${porcentajeDisponible}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">
                      {porcentajeDisponible.toFixed(1)}%
                    </span>
                  </div>
                </CardHeader>
                <div className="absolute top-2 right-2 rounded-full bg-emerald-100 p-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </Card>
            </div>

            {/* Distribución del Presupuesto */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución del Presupuesto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-primary" />
                      <span>Gastado</span>
                    </div>
                    <span className="font-medium">
                      ${totalGastado.toLocaleString()} ({porcentajeGastado.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={porcentajeGastado} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-primary/50" />
                      <span>Comprometido</span>
                    </div>
                    <span className="font-medium">
                      ${totalComprometido.toLocaleString()} ({porcentajeComprometido.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={porcentajeComprometido} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-primary/20" />
                      <span>Disponible</span>
                    </div>
                    <span className="font-medium">
                      ${totalDisponible.toLocaleString()} ({porcentajeDisponible.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={porcentajeDisponible} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Gastos por Categoría */}
            <Card>
              <CardHeader>
                <CardTitle>Gastos por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {categorias.map((categoria) => {
                    const totales = getCategoriaTotales(categoria);
                    return (
                      <Card key={categoria}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{categoria}</CardTitle>
                            <Badge variant="outline">{totales.porcentaje.toFixed(0)}%</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Progress value={totales.porcentaje} className="mb-2" />
                          <p className="text-sm text-muted-foreground">
                            ${totales.gastado.toLocaleString()} / ${totales.presupuestado.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {vistaActiva === 'partidas' && (
          <div className="space-y-3">
            {partidas.map((partida) => {
              const porcentaje = (partida.gastado / partida.presupuestado) * 100;
              return (
                <Card key={partida.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{partida.nombre}</CardTitle>
                        <CardDescription>{partida.categoria}</CardDescription>
                      </div>
                      <Badge variant="outline">{porcentaje.toFixed(0)}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={porcentaje} />
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Presupuestado</p>
                        <p className="font-medium">${partida.presupuestado.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Gastado</p>
                        <p className="font-medium text-primary">${partida.gastado.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Comprometido</p>
                        <p className="font-medium">${partida.comprometido.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Disponible</p>
                        <p className="font-medium">${partida.disponible.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {vistaActiva === 'transacciones' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Transacciones</CardTitle>
                <CardDescription>Registro completo de gastos de la obra</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Transacción 1 */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Cemento y Áridos</Badge>
                        <span className="text-sm text-muted-foreground">01/10/2024</span>
                      </div>
                      <p className="font-medium">Cemento Portland x 50 bolsas</p>
                      <p className="text-sm text-muted-foreground">Proveedor: Corralón Los Andes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$18,500</p>
                      <p className="text-sm text-muted-foreground">Estructura y Mampostería</p>
                    </div>
                  </div>

                  {/* Transacción 2 */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Hierro y Acero</Badge>
                        <span className="text-sm text-muted-foreground">30/09/2024</span>
                      </div>
                      <p className="font-medium">Hierro estructural 8mm y 12mm</p>
                      <p className="text-sm text-muted-foreground">Proveedor: Hierros del Norte</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$32,500</p>
                      <p className="text-sm text-muted-foreground">Cimientos y Fundación</p>
                    </div>
                  </div>

                  {/* Transacción 3 */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Mano de Obra</Badge>
                        <span className="text-sm text-muted-foreground">29/09/2024</span>
                      </div>
                      <p className="font-medium">Pago quincenal cuadrilla</p>
                      <p className="text-sm text-muted-foreground">5 trabajadores - 2da quincena</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$28,000</p>
                      <p className="text-sm text-muted-foreground">Estructura y Mampostería</p>
                    </div>
                  </div>

                  {/* Transacción 4 */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Ladrillos y Bloques</Badge>
                        <span className="text-sm text-muted-foreground">28/09/2024</span>
                      </div>
                      <p className="font-medium">Ladrillos cerámicos huecos x 1000</p>
                      <p className="text-sm text-muted-foreground">Proveedor: Ladrillos San Martín</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$8,900</p>
                      <p className="text-sm text-muted-foreground">Estructura y Mampostería</p>
                    </div>
                  </div>

                  {/* Transacción 5 */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Equipamiento</Badge>
                        <span className="text-sm text-muted-foreground">25/09/2024</span>
                      </div>
                      <p className="font-medium">Alquiler retroexcavadora 3 días</p>
                      <p className="text-sm text-muted-foreground">Proveedor: Maquinarias del Sur</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$12,500</p>
                      <p className="text-sm text-muted-foreground">Replanteo y Excavación</p>
                    </div>
                  </div>

                  {/* Transacción 6 */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Madera</Badge>
                        <span className="text-sm text-muted-foreground">20/09/2024</span>
                      </div>
                      <p className="font-medium">Madera para encofrado - pino</p>
                      <p className="text-sm text-muted-foreground">Proveedor: Maderería El Bosque</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$18,000</p>
                      <p className="text-sm text-muted-foreground">Cimientos y Fundación</p>
                    </div>
                  </div>

                  {/* Transacción 7 */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Cemento y Áridos</Badge>
                        <span className="text-sm text-muted-foreground">15/09/2024</span>
                      </div>
                      <p className="font-medium">Arena gruesa 10m³ + piedra partida 8m³</p>
                      <p className="text-sm text-muted-foreground">Proveedor: Corralón Los Andes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$15,000</p>
                      <p className="text-sm text-muted-foreground">Cimientos y Fundación</p>
                    </div>
                  </div>

                  {/* Transacción 8 */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Mano de Obra</Badge>
                        <span className="text-sm text-muted-foreground">14/09/2024</span>
                      </div>
                      <p className="font-medium">Pago quincenal cuadrilla</p>
                      <p className="text-sm text-muted-foreground">5 trabajadores - 1ra quincena</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$18,500</p>
                      <p className="text-sm text-muted-foreground">Cimientos y Fundación</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Mostrando 8 de 64 transacciones totales
                    </p>
                    <Button variant="outline">Ver más transacciones</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
