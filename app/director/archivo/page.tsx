'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FolderOpen, FileText, Image as ImageIcon, File, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TEMPLATES_CASA_UNIFAMILIAR, DocumentTemplate } from '@/lib/constants/templates';

interface Documento {
  id: number;
  nombre: string;
  tipo: 'pdf' | 'image' | 'doc' | 'excel';
  tamano: string;
  fecha: string;
  version?: number;
  carpeta: string;
}

interface Carpeta {
  id: string;
  nombre: string;
  icono: string;
  cantidad: number;
}

export default function ArchivoCentral() {
  const [carpetaActual, setCarpetaActual] = useState<string>('root');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [templateSeleccionado, setTemplateSeleccionado] = useState<DocumentTemplate | null>(null);

  const [documentos] = useState<Documento[]>([
    { id: 1, nombre: 'Plano_Arquitectonico_General_v3.pdf', tipo: 'pdf', tamano: '3.2 MB', fecha: '2024-08-01', version: 3, carpeta: 'planos' },
    { id: 2, nombre: 'Plano_Estructural_Fundaciones.pdf', tipo: 'pdf', tamano: '2.8 MB', fecha: '2024-08-01', version: 2, carpeta: 'planos' },
    { id: 3, nombre: 'Permiso_Municipal_Construccion.pdf', tipo: 'pdf', tamano: '1.5 MB', fecha: '2024-07-15', carpeta: 'permisos' },
    { id: 4, nombre: 'Aptitud_Ambiental.pdf', tipo: 'pdf', tamano: '890 KB', fecha: '2024-07-10', carpeta: 'permisos' },
    { id: 5, nombre: 'Contrato_Capataz_Ramirez.pdf', tipo: 'doc', tamano: '425 KB', fecha: '2024-07-20', carpeta: 'contratos' },
    { id: 6, nombre: 'FAC-0045_Corralon_Los_Andes.pdf', tipo: 'pdf', tamano: '220 KB', fecha: '2024-10-01', carpeta: 'facturas' },
    { id: 7, nombre: 'Parte_Diario_01OCT2024.pdf', tipo: 'pdf', tamano: '850 KB', fecha: '2024-10-01', carpeta: 'informes' },
    { id: 8, nombre: 'Foto_Cimientos_Finalizados.jpg', tipo: 'image', tamano: '5.2 MB', fecha: '2024-09-10', carpeta: 'fotos' },
  ]);

  // Función para calcular cantidad de documentos por carpeta
  const getCantidadDocumentos = (carpetaId: string): number => {
    return documentos.filter(doc => doc.carpeta === carpetaId).length;
  };

  const [estructuraCarpetas] = useState<Carpeta[]>([
    { id: 'planos', nombre: 'Planos y Diseños', icono: '📐', cantidad: 0 },
    { id: 'permisos', nombre: 'Permisos y Habilitaciones', icono: '📄', cantidad: 0 },
    { id: 'contratos', nombre: 'Contratos', icono: '📑', cantidad: 0 },
    { id: 'facturas', nombre: 'Facturas', icono: '💼', cantidad: 45 },
    { id: 'remitos', nombre: 'Remitos', icono: '📦', cantidad: 38 },
    { id: 'informes', nombre: 'Partes Diarios', icono: '🗓️', cantidad: 42 },
    { id: 'fotos', nombre: 'Registro Fotográfico', icono: '📸', cantidad: 124 },
    { id: 'otros', nombre: 'Documentos Varios', icono: '🗂️', cantidad: 12 },
  ]);

  // Mapeo de carpetas a categorías de templates
  const mapaCarpetasTemplates: Record<string, string> = {
    'permisos': 'Permisos y Habilitaciones',
    'planos': 'Planos y Diseños',
    'contratos': 'Contratos',
  };

  // Obtener templates para la carpeta actual
  const getTemplatesPorCarpeta = (carpetaId: string): DocumentTemplate[] => {
    const categoria = mapaCarpetasTemplates[carpetaId];
    if (!categoria || !TEMPLATES_CASA_UNIFAMILIAR[categoria]) return [];
    
    return TEMPLATES_CASA_UNIFAMILIAR[categoria];
  };

  // Función para normalizar nombres de documentos (eliminar caracteres especiales, espacios, etc.)
  const normalizarNombre = (nombre: string): string => {
    return nombre
      .toLowerCase()
      .replace(/[áàäâ]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöô]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/[^a-z0-9]/g, '');
  };

  // Verificar si un template ya fue subido comparando con documentos existentes
  const estaDocumentoSubido = (templateNombre: string, carpetaId: string): boolean => {
    const nombreNormalizado = normalizarNombre(templateNombre);
    const docsEnCarpeta = documentos.filter(doc => doc.carpeta === carpetaId);
    
    return docsEnCarpeta.some(doc => {
      const docNormalizado = normalizarNombre(doc.nombre);
      // Verificar si el nombre del documento contiene palabras clave del template
      return nombreNormalizado.split(' ').some(palabra => 
        palabra.length > 3 && docNormalizado.includes(palabra)
      );
    });
  };

  const handleAbrirFormulario = (template: DocumentTemplate) => {
    setTemplateSeleccionado(template);
    setMostrarFormulario(true);
  };

  const handleGuardarDocumento = (datos: any) => {
    console.log('Documento guardado:', datos);
    setMostrarFormulario(false);
    setTemplateSeleccionado(null);
    // TODO: Aquí se guardaría en la base de datos
  };

  const getCarpetaData = (id: string): Carpeta | undefined => {
    return estructuraCarpetas.find(c => c.id === id);
  };

  const getDocumentosPorCarpeta = (carpetaId: string) => {
    return documentos.filter(doc => doc.carpeta === carpetaId);
  };

  const getTipoIcono = (tipo: string) => {
    switch (tipo) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'doc': return <File className="h-4 w-4" />;
      case 'excel': return <File className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const carpetaActualData = getCarpetaData(carpetaActual);
  const documentosActuales = carpetaActual !== 'root' ? getDocumentosPorCarpeta(carpetaActual) : [];

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
                <h1 className="text-xl font-semibold text-foreground">Archivo Central</h1>
                <p className="text-sm text-muted-foreground">Casa Familia López - Barrio Los Robles</p>
              </div>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Subir Archivo
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-muted-foreground">
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setCarpetaActual('root')}
          >
            📁 Archivo Central
          </Button>
          {carpetaActualData && (
            <>
              <span>/</span>
              <span className="font-medium text-foreground">
                {carpetaActualData.icono} {carpetaActualData.nombre}
              </span>
            </>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Panel Izquierdo - Navegación de Carpetas */}
          <div className="col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Estructura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                {estructuraCarpetas.map((carpeta) => {
                  // Usar cantidad dinámica para carpetas con templates, estática para otras
                  const cantidad = mapaCarpetasTemplates[carpeta.id] 
                    ? getCantidadDocumentos(carpeta.id)
                    : carpeta.cantidad;
                  
                  return (
                    <Button
                      key={carpeta.id}
                      variant="ghost"
                      className={cn(
                        'w-full justify-start h-auto py-3 px-3 hover:bg-muted/80',
                        carpetaActual === carpeta.id && 'bg-primary/10 text-foreground hover:bg-primary/10 border border-primary/20'
                      )}
                      onClick={() => setCarpetaActual(carpeta.id)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-xl flex-shrink-0">{carpeta.icono}</span>
                        <span className="text-sm font-medium text-left flex-1 truncate">{carpeta.nombre}</span>
                        <Badge 
                          variant={carpetaActual === carpeta.id ? "default" : "secondary"} 
                          className="ml-2 flex-shrink-0 min-w-[2rem] justify-center"
                        >
                          {cantidad}
                        </Badge>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Panel Central - Lista de Documentos */}
          <div className="col-span-9">
            {carpetaActual === 'root' ? (
              <Card className="py-16">
                <CardContent className="text-center">
                  <FolderOpen className="mx-auto mb-4 h-20 w-20 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">Selecciona una carpeta</h3>
                  <p className="text-muted-foreground">Elige una carpeta de la izquierda para ver su contenido</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Sección Unificada de Templates y Documentos */}
                {getTemplatesPorCarpeta(carpetaActual).length > 0 ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Documentos para {carpetaActualData?.nombre}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Documentos esperados para una casa unifamiliar • Subidos y pendientes
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {getTemplatesPorCarpeta(carpetaActual).filter(t => estaDocumentoSubido(t.nombre, carpetaActual)).length} / {getTemplatesPorCarpeta(carpetaActual).length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {getTemplatesPorCarpeta(carpetaActual).map((template, index) => {
                        const yaSubido = estaDocumentoSubido(template.nombre, carpetaActual);
                        // Buscar el documento real si está subido
                        const docReal = yaSubido ? documentosActuales.find(doc => {
                          const docNormalizado = normalizarNombre(doc.nombre);
                          const templateNormalizado = normalizarNombre(template.nombre);
                          return templateNormalizado.split(' ').some(palabra => 
                            palabra.length > 3 && docNormalizado.includes(palabra)
                          );
                        }) : null;

                        return (
                          <div
                            key={index}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-lg border transition",
                              yaSubido ? "bg-green-50 border-green-200" : "bg-background hover:bg-muted/50"
                            )}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {yaSubido ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className={cn(
                                    "font-medium",
                                    yaSubido ? "text-green-900" : "text-foreground"
                                  )}>
                                    {template.nombre}
                                  </p>
                                  {template.requerido && (
                                    <Badge variant="destructive" className="text-xs">Obligatorio</Badge>
                                  )}
                                  {docReal?.version && (
                                    <Badge variant="outline" className="text-xs">v{docReal.version}</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{template.descripcion}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                                  {template.fase && (
                                    <span>🗓️ {template.fase}</span>
                                  )}
                                  {docReal && (
                                    <>
                                      <span>•</span>
                                      <span>📄 {docReal.nombre}</span>
                                      <span>•</span>
                                      <span>{docReal.tamano}</span>
                                      <span>•</span>
                                      <span>{docReal.fecha}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            {!yaSubido && (
                              <Button
                                size="sm"
                                onClick={() => handleAbrirFormulario(template)}
                              >
                                <Plus className="mr-1 h-4 w-4" />
                                Agregar
                              </Button>
                            )}
                            {yaSubido && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                >
                                  Ver
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                >
                                  Descargar
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Botón para agregar documento no esperado */}
                      <div className="pt-4 border-t">
                        <Button variant="outline" size="sm" className="w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          Subir Documento No Listado (Personalizado)
                        </Button>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          ¿Necesitas subir un documento que no está en la lista? Usa este botón
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // Para carpetas sin templates (Facturas, Remitos, etc.)
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Documentos en {carpetaActualData?.nombre}</CardTitle>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Subir Documento
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {documentosActuales.length > 0 ? (
                          documentosActuales.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                  {getTipoIcono(doc.tipo)}
                                </div>
                                <div>
                                  <p className="font-medium">{doc.nombre}</p>
                                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <span>{doc.tamano}</span>
                                    <span>•</span>
                                    <span>{doc.fecha}</span>
                                    {doc.version && (
                                      <>
                                        <span>•</span>
                                        <Badge variant="outline" className="text-xs">v{doc.version}</Badge>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  Ver
                                </Button>
                                <Button variant="outline" size="sm">
                                  Descargar
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <FileText className="mx-auto h-12 w-12 mb-3 opacity-50" />
                            <p>No hay documentos subidos aún</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Formulario de Documento */}
      {mostrarFormulario && templateSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 p-6 border-b border-slate-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{templateSeleccionado.nombre}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{templateSeleccionado.descripcion}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setMostrarFormulario(false);
                    setTemplateSeleccionado(null);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="p-6">
              {/* Formulario Dinámico */}
              <div className="space-y-4">
                {templateSeleccionado.campos.map((campo) => (
                  <div key={campo.id}>
                    <label className="block text-sm font-medium mb-2">
                      {campo.label}
                      {campo.requerido && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {campo.tipo === 'text' && (
                      <input
                        type="text"
                        placeholder={campo.placeholder}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                    
                    {campo.tipo === 'number' && (
                      <input
                        type="number"
                        placeholder={campo.placeholder}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                    
                    {campo.tipo === 'date' && (
                      <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                    
                    {campo.tipo === 'select' && campo.opciones && (
                      <select className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option value="">Seleccionar...</option>
                        {campo.opciones.map((opcion, idx) => (
                          <option key={idx} value={opcion}>{opcion}</option>
                        ))}
                      </select>
                    )}
                    
                    {campo.tipo === 'textarea' && (
                      <textarea
                        placeholder={campo.placeholder}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px]"
                      />
                    )}
                    
                    {campo.tipo === 'file' && (
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary transition">
                        <input
                          type="file"
                          className="hidden"
                          id={`file-${campo.id}`}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label htmlFor={`file-${campo.id}`} className="cursor-pointer">
                          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-600 font-medium">Click para subir archivo</p>
                          <p className="text-sm text-slate-500 mt-1">PDF, JPG, PNG hasta 10MB</p>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setMostrarFormulario(false);
                  setTemplateSeleccionado(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={() => handleGuardarDocumento({})}>
                Guardar Documento
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}