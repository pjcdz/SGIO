'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Circle, 
  Clock,
  FileText,
  Receipt,
  Plus,
  ArrowLeft
} from 'lucide-react';
import HeaderNav from '@/components/ui/header-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';

interface Hito {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'completado' | 'en-progreso' | 'pendiente';
  avance: number;
  presupuesto: number;
  gastado: number;
  tareas: string[];
}

export default function ObraDetalle() {
  const params = useParams();
  const [hitoExpandido, setHitoExpandido] = useState<number | null>(2);
  const [tabActiva, setTabActiva] = useState<'progreso' | 'documentos' | 'costos'>('progreso');
  const [mostrarModalTarea, setMostrarModalTarea] = useState(false);
  const [hitoSeleccionado, setHitoSeleccionado] = useState<number | null>(null);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [errorTarea, setErrorTarea] = useState('');

  const [hitos] = useState<Hito[]>([
    {
      id: 1,
      nombre: 'Replanteo y Excavación',
      fechaInicio: '2024-08-01',
      fechaFin: '2024-08-15',
      estado: 'completado',
      avance: 100,
      presupuesto: 25000,
      gastado: 24500,
      tareas: ['Replanteo del terreno', 'Excavación completada', 'Nivelación finalizada']
    },
    {
      id: 2,
      nombre: 'Cimientos y Fundación',
      fechaInicio: '2024-08-16',
      fechaFin: '2024-09-10',
      estado: 'completado',
      avance: 100,
      presupuesto: 45000,
      gastado: 43200,
      tareas: ['Armado de hierro', 'Vaciado de hormigón', 'Inspección estructural aprobada']
    },
    {
      id: 3,
      nombre: 'Estructura y Mampostería',
      fechaInicio: '2024-09-11',
      fechaFin: '2024-10-25',
      estado: 'en-progreso',
      avance: 45,
      presupuesto: 85000,
      gastado: 38250,
      tareas: [
        'Levantar muros perimetrales planta baja ✓',
        'Instalar columnas de hormigón armado ✓', 
        'Verificar nivel y aplomado de paredes (En progreso)',
        'Preparar mezcla para revoque grueso (Pendiente)'
      ]
    },
    {
      id: 4,
      nombre: 'Cubierta de Techo',
      fechaInicio: '2024-10-26',
      fechaFin: '2024-11-15',
      estado: 'pendiente',
      avance: 0,
      presupuesto: 38000,
      gastado: 0,
      tareas: []
    },
    {
      id: 5,
      nombre: 'Instalación Eléctrica',
      fechaInicio: '2024-11-16',
      fechaFin: '2024-12-05',
      estado: 'pendiente',
      avance: 0,
      presupuesto: 32000,
      gastado: 0,
      tareas: []
    },
    {
      id: 6,
      nombre: 'Instalación Sanitaria',
      fechaInicio: '2024-12-06',
      fechaFin: '2024-12-22',
      estado: 'pendiente',
      avance: 0,
      presupuesto: 28000,
      gastado: 0,
      tareas: []
    },
    {
      id: 7,
      nombre: 'Revoques y Revestimientos',
      fechaInicio: '2024-12-23',
      fechaFin: '2025-01-20',
      estado: 'pendiente',
      avance: 0,
      presupuesto: 42000,
      gastado: 0,
      tareas: []
    },
    {
      id: 8,
      nombre: 'Carpintería y Aberturas',
      fechaInicio: '2025-01-21',
      fechaFin: '2025-02-10',
      estado: 'pendiente',
      avance: 0,
      presupuesto: 55000,
      gastado: 0,
      tareas: []
    },
    {
      id: 9,
      nombre: 'Pintura y Terminaciones',
      fechaInicio: '2025-02-11',
      fechaFin: '2025-03-05',
      estado: 'pendiente',
      avance: 0,
      presupuesto: 35000,
      gastado: 0,
      tareas: []
    },
    {
      id: 10,
      nombre: 'Instalación de Pisos',
      fechaInicio: '2025-03-06',
      fechaFin: '2025-03-20',
      estado: 'pendiente',
      avance: 0,
      presupuesto: 48000,
      gastado: 0,
      tareas: []
    },
    {
      id: 11,
      nombre: 'Limpieza Final y Entrega',
      fechaInicio: '2025-03-21',
      fechaFin: '2025-03-28',
      estado: 'pendiente',
      avance: 0,
      presupuesto: 8000,
      gastado: 0,
      tareas: []
    }
  ]);

  const toggleHito = (id: number) => {
    setHitoExpandido(hitoExpandido === id ? null : id);
  };

  const getTareaIcon = (tarea: string) => {
    if (tarea.includes('✓')) {
      return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
    } else if (tarea.includes('(En progreso)')) {
      return (
        <div className="relative h-5 w-5 flex-shrink-0">
          <Circle className="h-5 w-5 text-blue-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>
        </div>
      );
    } else if (tarea.includes('(Pendiente)')) {
      return <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />;
    }
    return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
  };

  const getTareaBgColor = (tarea: string) => {
    if (tarea.includes('✓')) {
      return 'bg-green-50 border border-green-200';
    } else if (tarea.includes('(En progreso)')) {
      return 'bg-blue-50 border border-blue-200';
    } else if (tarea.includes('(Pendiente)')) {
      return 'bg-muted/50 border border-muted';
    }
    return 'bg-green-50 border border-green-200';
  };

  const handleAgregarTarea = (hitoId: number) => {
    setHitoSeleccionado(hitoId);
    setMostrarModalTarea(true);
  };

  const handleGuardarTarea = () => {
    if (!nuevaTarea.trim()) {
      setErrorTarea('⚠️ Debes ingresar una descripción para la tarea.');
      return;
    }

    if (nuevaTarea.trim().length < 5) {
      setErrorTarea('⚠️ La descripción debe tener al menos 5 caracteres.');
      return;
    }

    // TODO: Aquí se agregaría la tarea al hito correspondiente
    alert(`Tarea "${nuevaTarea}" agregada al hito`);
    
    // Cerrar modal y limpiar
    setNuevaTarea('');
    setMostrarModalTarea(false);
    setHitoSeleccionado(null);
    setErrorTarea('');
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'completado':
        return <Badge className="bg-green-500 hover:bg-green-600">Completado</Badge>;
      case 'en-progreso':
        return <Badge className="bg-blue-500 hover:bg-blue-600">En Progreso</Badge>;
      case 'pendiente':
        return <Badge variant="secondary">Pendiente</Badge>;
      default:
        return null;
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'completado':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'en-progreso':
        return <Clock className="h-6 w-6 text-blue-500" />;
      case 'pendiente':
        return <Circle className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const totalPresupuesto = hitos.reduce((sum, h) => sum + h.presupuesto, 0);
  const totalGastado = hitos.reduce((sum, h) => sum + h.gastado, 0);
  const avanceGeneral = Math.round((totalGastado / totalPresupuesto) * 100);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav rol="director" nombre="Director" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb y Header */}
        <div className="mb-6">
          <Link href="/director/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Casa Familia López - Barrio Los Robles
              </h1>
              <p className="text-muted-foreground mt-2">
                Seguimiento detallado de hitos y tareas de construcción
              </p>
            </div>
          </div>
        </div>

        {/* Resumen General */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Presupuesto Total */}
          <Card className="relative overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                    Presupuesto Total
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    ${totalPresupuesto.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">
                    Monto total planificado
                  </p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <DollarSign className="h-32 w-32 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Total Gastado */}
          <Card className="relative overflow-hidden border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
                    Total Gastado
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    ${totalGastado.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-500">
                      {((totalGastado / totalPresupuesto) * 100).toFixed(1)}% del presupuesto
                    </p>
                    {totalGastado / totalPresupuesto < 0.9 ? (
                      <span className="text-xs text-green-600 font-medium">✓ En rango</span>
                    ) : (
                      <span className="text-xs text-amber-600 font-medium">⚠ Cerca del límite</span>
                    )}
                  </div>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <Receipt className="h-6 w-6 text-green-600" />
                </div>
              </div>
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <Receipt className="h-32 w-32 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Avance General */}
          <Card className="relative overflow-hidden border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                    Avance General
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    {avanceGeneral}%
                  </p>
                  <p className="text-xs text-slate-500">
                    Progreso de la obra
                  </p>
                </div>
                <div className="rounded-full bg-emerald-100 p-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              
              {/* Barra de progreso mejorada */}
              <div className="relative">
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div 
                    className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-emerald-500 to-emerald-400 relative"
                    style={{ width: `${avanceGeneral}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1 text-right">
                  {avanceGeneral < 25 ? 'Iniciando' : avanceGeneral < 50 ? 'En desarrollo' : avanceGeneral < 75 ? 'Avanzado' : 'Próximo a finalizar'}
                </p>
              </div>
              
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <CheckCircle2 className="h-32 w-32 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Línea de Tiempo */}
        <div className="space-y-4">
          {hitos.map((hito, index) => {
            const isExpanded = hitoExpandido === hito.id;
            const isLast = index === hitos.length - 1;

            return (
              <div key={hito.id} className="relative">
                {/* Línea conectora */}
                {!isLast && (
                  <div 
                    className={cn(
                      "absolute left-[30px] top-[60px] w-0.5 h-[calc(100%+16px)] -z-10",
                      hito.estado === 'completado' ? 'bg-green-200' : 'bg-border'
                    )}
                  />
                )}

                <Card 
                  className={cn(
                    "transition-all hover:shadow-md cursor-pointer",
                    isExpanded && "ring-2 ring-primary",
                    hito.estado === 'completado' && "bg-green-50/50"
                  )}
                  onClick={() => toggleHito(hito.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      {/* Icono de estado */}
                      <div className="flex-shrink-0 mt-1">
                        {getEstadoIcon(hito.estado)}
                      </div>

                      {/* Contenido principal */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <CardTitle className="text-xl">{hito.nombre}</CardTitle>
                          {getEstadoBadge(hito.estado)}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{hito.fechaInicio} → {hito.fechaFin}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${hito.gastado.toLocaleString()} / ${hito.presupuesto.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Barra de progreso */}
                        <div className="mt-4 flex items-center gap-3">
                          <ProgressBar value={hito.avance} className="flex-1" />
                          <span className="text-sm font-semibold text-foreground w-12 text-right">
                            {hito.avance}%
                          </span>
                        </div>
                      </div>

                      {/* Botón expandir */}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleHito(hito.id);
                        }}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  {/* Contenido expandido */}
                  {isExpanded && (
                    <CardContent className="pt-0">
                      <div className="border-t pt-4">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-4">
                          <Button
                            variant={tabActiva === 'progreso' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTabActiva('progreso');
                            }}
                          >
                            Progreso
                          </Button>
                          <Button
                            variant={tabActiva === 'documentos' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTabActiva('documentos');
                            }}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Documentos
                          </Button>
                          <Button
                            variant={tabActiva === 'costos' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTabActiva('costos');
                            }}
                          >
                            <Receipt className="h-4 w-4 mr-1" />
                            Costos
                          </Button>
                        </div>

                        {/* Contenido de tabs */}
                        {tabActiva === 'progreso' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm text-foreground">Tareas del Día</h4>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAgregarTarea(hito.id);
                                }}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Agregar tarea
                              </Button>
                            </div>
                            {hito.tareas.length > 0 ? (
                              <div className="space-y-2">
                                {hito.tareas.map((tarea, idx) => (
                                  <div 
                                    key={idx}
                                    className={`flex items-center gap-3 p-3 rounded-lg ${getTareaBgColor(tarea)}`}
                                  >
                                    {getTareaIcon(tarea)}
                                    <span className="text-sm font-medium">{tarea.replace(' ✓', '').replace(' (En progreso)', '').replace(' (Pendiente)', '')}</span>
                                    {tarea.includes('✓') && (
                                      <span className="ml-auto text-xs font-semibold text-green-600">Completada</span>
                                    )}
                                    {tarea.includes('(En progreso)') && (
                                      <span className="ml-auto text-xs font-semibold text-blue-600">En Progreso</span>
                                    )}
                                    {tarea.includes('(Pendiente)') && (
                                      <span className="ml-auto text-xs font-semibold text-muted-foreground">Pendiente</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground py-4 text-center">
                                No hay tareas registradas para este hito
                              </p>
                            )}
                          </div>
                        )}

                        {tabActiva === 'documentos' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm text-foreground">Documentos del Hito</h4>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-1" />
                                Subir documento
                              </Button>
                            </div>
                            
                            {/* Documentos de ejemplo */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Plano de {hito.nombre}</p>
                                    <p className="text-xs text-muted-foreground">PDF • 2.4 MB • v1</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">Ver</Button>
                                  <Button variant="ghost" size="sm">Descargar</Button>
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Informe de avance</p>
                                    <p className="text-xs text-muted-foreground">DOCX • 856 KB</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">Ver</Button>
                                  <Button variant="ghost" size="sm">Descargar</Button>
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Fotos de obra - {hito.nombre}</p>
                                    <p className="text-xs text-muted-foreground">ZIP • 15.2 MB • 24 fotos</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">Ver</Button>
                                  <Button variant="ghost" size="sm">Descargar</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {tabActiva === 'costos' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Presupuestado</p>
                                <p className="text-lg font-bold">${hito.presupuesto.toLocaleString()}</p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Gastado</p>
                                <p className="text-lg font-bold">${hito.gastado.toLocaleString()}</p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Restante</p>
                                <p className="text-lg font-bold text-green-600">
                                  ${(hito.presupuesto - hito.gastado).toLocaleString()}
                                </p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Uso del presupuesto</p>
                                <p className="text-lg font-bold">
                                  {Math.round((hito.gastado / hito.presupuesto) * 100)}%
                                </p>
                              </div>
                            </div>

                            {/* Gastos del hito */}
                            <div className="border-t pt-4">
                              <h4 className="font-semibold text-sm mb-3">Gastos Registrados</h4>
                              <div className="space-y-2">
                                {hito.gastado > 0 && (
                                  <>
                                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                      <div>
                                        <p className="text-sm font-medium">Materiales de construcción</p>
                                        <p className="text-xs text-muted-foreground">Cemento, áridos, ladrillos</p>
                                      </div>
                                      <p className="font-semibold">${(hito.gastado * 0.45).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                      <div>
                                        <p className="text-sm font-medium">Mano de obra</p>
                                        <p className="text-xs text-muted-foreground">Cuadrilla de 5 trabajadores</p>
                                      </div>
                                      <p className="font-semibold">${(hito.gastado * 0.35).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                      <div>
                                        <p className="text-sm font-medium">Equipamiento</p>
                                        <p className="text-xs text-muted-foreground">Alquiler de maquinaria</p>
                                      </div>
                                      <p className="font-semibold">${(hito.gastado * 0.20).toLocaleString()}</p>
                                    </div>
                                  </>
                                )}
                                {hito.gastado === 0 && (
                                  <p className="text-sm text-muted-foreground text-center py-4">
                                    No hay gastos registrados para este hito
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para agregar tarea */}
      {mostrarModalTarea && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Agregar Nueva Tarea</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setMostrarModalTarea(false);
                    setNuevaTarea('');
                    setErrorTarea('');
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {errorTarea && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{errorTarea}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descripción de la tarea
                  </label>
                  <textarea
                    value={nuevaTarea}
                    onChange={(e) => {
                      setNuevaTarea(e.target.value);
                      setErrorTarea('');
                    }}
                    placeholder="Ej: Instalar vigas de hormigón armado"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px]"
                  />
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Esta tarea se agregará al hito actualmente expandido
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setMostrarModalTarea(false);
                  setNuevaTarea('');
                  setErrorTarea('');
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGuardarTarea}
              >
                Agregar Tarea
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
