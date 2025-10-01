# 🚀 Guía de Implementación - Mejoras Prioritarias SGIO

**Objetivo:** Código listo para copiar y pegar en las mejoras más críticas  
**Fecha:** 1 de Octubre, 2025

---

## 📦 MEJORA #1: Hook de Persistencia Universal

**Archivo:** `sgio-app/lib/hooks/usePersistentState.ts`

```typescript
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * Hook personalizado para estado persistente en localStorage
 * Guarda automáticamente en localStorage cada vez que cambia el estado
 * 
 * @param key - Clave única para localStorage
 * @param initialValue - Valor inicial si no existe en localStorage
 * @returns [value, setValue] - Como useState pero con persistencia
 */
export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // Estado inicial desde localStorage o valor por defecto
  const [value, setValue] = useState<T>(() => {
    // Solo en el cliente (no en SSR)
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error(`Error leyendo ${key} de localStorage:`, error);
    }
    
    return initialValue;
  });

  // Efecto para guardar en localStorage cuando cambia el valor
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando ${key} en localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

/**
 * Hook para auto-guardado periódico
 * Útil para formularios largos o datos críticos
 */
export function useAutoSave<T>(
  key: string,
  data: T,
  intervalMs: number = 30000 // 30 segundos por defecto
) {
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(`${key}-autosave`, JSON.stringify({
          data,
          timestamp: new Date().toISOString()
        }));
        console.log(`✅ Auto-guardado: ${key}`);
      } catch (error) {
        console.error(`Error en auto-guardado de ${key}:`, error);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [key, data, intervalMs]);
}

/**
 * Hook para recuperar borrador auto-guardado
 */
export function useRecoverDraft<T>(key: string): T | null {
  const [draft, setDraft] = useState<T | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${key}-autosave`);
      if (saved) {
        const { data, timestamp } = JSON.parse(saved);
        const savedDate = new Date(timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60);
        
        // Solo recuperar si es del mismo día (menos de 24 horas)
        if (hoursDiff < 24) {
          setDraft(data);
        } else {
          // Limpiar borradores viejos
          localStorage.removeItem(`${key}-autosave`);
        }
      }
    } catch (error) {
      console.error(`Error recuperando borrador de ${key}:`, error);
    }
  }, [key]);

  return draft;
}
```

### **Uso en componentes:**

```typescript
// Antes (sin persistencia)
const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);

// Después (con persistencia automática)
import { usePersistentState } from '@/lib/hooks/usePersistentState';
const [trabajadores, setTrabajadores] = usePersistentState<Trabajador[]>('trabajadores', []);

// Para auto-guardado periódico
import { useAutoSave } from '@/lib/hooks/usePersistentState';
useAutoSave('parte-diario-borrador', { trabajadores, tareas, notas }, 30000);

// Para recuperar borrador
import { useRecoverDraft } from '@/lib/hooks/usePersistentState';
const borrador = useRecoverDraft('parte-diario-borrador');
```

---

## 📋 MEJORA #2: Templates de Documentación

**Archivo:** `sgio-app/lib/constants/templates.ts`

```typescript
export interface DocumentTemplate {
  nombre: string;
  descripcion: string;
  campos: CampoTemplate[];
  requerido: boolean;
  fase?: string; // En qué fase de construcción se necesita
}

export interface CampoTemplate {
  id: string;
  label: string;
  tipo: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'file';
  requerido: boolean;
  opciones?: string[]; // Para tipo 'select'
  placeholder?: string;
  validacion?: string; // Regex para validación
}

export const TEMPLATES_CASA_UNIFAMILIAR: Record<string, DocumentTemplate[]> = {
  'Permisos y Habilitaciones': [
    {
      nombre: 'Permiso Municipal de Construcción',
      descripcion: 'Autorización del municipio para iniciar construcción',
      requerido: true,
      fase: 'Pre-construcción',
      campos: [
        { id: 'numero', label: 'Número de Expediente', tipo: 'text', requerido: true, placeholder: 'Ej: 12345/2024' },
        { id: 'organismo', label: 'Organismo Emisor', tipo: 'text', requerido: true, placeholder: 'Ej: Municipalidad de...' },
        { id: 'fechaEmision', label: 'Fecha de Emisión', tipo: 'date', requerido: true },
        { id: 'fechaVencimiento', label: 'Fecha de Vencimiento', tipo: 'date', requerido: true },
        { id: 'superficieCubierta', label: 'Superficie Cubierta (m²)', tipo: 'number', requerido: true },
        { id: 'observaciones', label: 'Observaciones', tipo: 'textarea', requerido: false }
      ]
    },
    {
      nombre: 'Aptitud Ambiental',
      descripcion: 'Certificado de impacto ambiental de la construcción',
      requerido: true,
      fase: 'Pre-construcción',
      campos: [
        { id: 'numero', label: 'Número de Certificado', tipo: 'text', requerido: true },
        { id: 'organismo', label: 'Organismo Ambiental', tipo: 'text', requerido: true },
        { id: 'fechaEmision', label: 'Fecha de Emisión', tipo: 'date', requerido: true },
        { id: 'restricciones', label: 'Restricciones', tipo: 'textarea', requerido: false },
        { id: 'archivo', label: 'Subir PDF', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Habilitación Eléctrica',
      descripcion: 'Aprobación de instalación eléctrica por inspector habilitado',
      requerido: true,
      fase: 'Instalaciones',
      campos: [
        { id: 'inspector', label: 'Inspector Habilitado', tipo: 'text', requerido: true },
        { id: 'matricula', label: 'Matrícula del Inspector', tipo: 'text', requerido: true },
        { id: 'fechaInspeccion', label: 'Fecha de Inspección', tipo: 'date', requerido: true },
        { id: 'resultado', label: 'Resultado', tipo: 'select', requerido: true, opciones: ['Aprobado', 'Aprobado con observaciones', 'Rechazado'] },
        { id: 'observaciones', label: 'Observaciones', tipo: 'textarea', requerido: false },
        { id: 'archivo', label: 'Subir Certificado', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Habilitación de Gas',
      descripcion: 'Aprobación de instalación de gas por gasista matriculado',
      requerido: true,
      fase: 'Instalaciones',
      campos: [
        { id: 'gasista', label: 'Gasista Matriculado', tipo: 'text', requerido: true },
        { id: 'matricula', label: 'Matrícula del Gasista', tipo: 'text', requerido: true },
        { id: 'fechaInspeccion', label: 'Fecha de Inspección', tipo: 'date', requerido: true },
        { id: 'resultado', label: 'Resultado', tipo: 'select', requerido: true, opciones: ['Aprobado', 'Aprobado con observaciones', 'Rechazado'] },
        { id: 'observaciones', label: 'Observaciones', tipo: 'textarea', requerido: false },
        { id: 'archivo', label: 'Subir Certificado', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Certificado de Línea Municipal',
      descripcion: 'Define línea de frente y retiros obligatorios',
      requerido: true,
      fase: 'Pre-construcción',
      campos: [
        { id: 'numero', label: 'Número de Certificado', tipo: 'text', requerido: true },
        { id: 'fechaEmision', label: 'Fecha de Emisión', tipo: 'date', requerido: true },
        { id: 'metrosLineales', label: 'Metros Lineales de Frente', tipo: 'number', requerido: true },
        { id: 'retiroFrente', label: 'Retiro de Frente (m)', tipo: 'number', requerido: true },
        { id: 'retiroLaterales', label: 'Retiros Laterales (m)', tipo: 'number', requerido: true },
        { id: 'retiroContrafrente', label: 'Retiro de Contrafrente (m)', tipo: 'number', requerido: true },
        { id: 'archivo', label: 'Subir Certificado', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Estudio de Suelos',
      descripcion: 'Análisis geotécnico del terreno',
      requerido: true,
      fase: 'Pre-construcción',
      campos: [
        { id: 'laboratorio', label: 'Laboratorio', tipo: 'text', requerido: true },
        { id: 'fechaEstudio', label: 'Fecha del Estudio', tipo: 'date', requerido: true },
        { id: 'resistencia', label: 'Resistencia del Suelo (kg/cm²)', tipo: 'number', requerido: true },
        { id: 'tipoSuelo', label: 'Tipo de Suelo', tipo: 'select', requerido: true, opciones: ['Arcilloso', 'Arenoso', 'Limoso', 'Rocoso', 'Mixto'] },
        { id: 'nivelFreatico', label: 'Nivel Freático (m)', tipo: 'number', requerido: false },
        { id: 'fundacionRecomendada', label: 'Fundación Recomendada', tipo: 'textarea', requerido: true },
        { id: 'archivo', label: 'Subir Informe Completo', tipo: 'file', requerido: true }
      ]
    }
  ],
  
  'Planos y Diseños': [
    {
      nombre: 'Plano Arquitectónico General',
      descripcion: 'Plano completo de la vivienda con distribución de ambientes',
      requerido: true,
      fase: 'Pre-construcción',
      campos: [
        { id: 'escala', label: 'Escala', tipo: 'select', requerido: true, opciones: ['1:50', '1:100', '1:200'] },
        { id: 'version', label: 'Versión', tipo: 'number', requerido: true, placeholder: 'Ej: 3' },
        { id: 'fecha', label: 'Fecha', tipo: 'date', requerido: true },
        { id: 'arquitecto', label: 'Arquitecto Responsable', tipo: 'text', requerido: true },
        { id: 'matricula', label: 'Matrícula', tipo: 'text', requerido: true },
        { id: 'superficieTotal', label: 'Superficie Total (m²)', tipo: 'number', requerido: true },
        { id: 'archivo', label: 'Subir Plano (PDF/DWG)', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Plano Estructural - Fundaciones',
      descripcion: 'Detalle de cimientos, vigas de fundación y armaduras',
      requerido: true,
      fase: 'Cimientos',
      campos: [
        { id: 'escala', label: 'Escala', tipo: 'select', requerido: true, opciones: ['1:25', '1:50', '1:100'] },
        { id: 'version', label: 'Versión', tipo: 'number', requerido: true },
        { id: 'fecha', label: 'Fecha', tipo: 'date', requerido: true },
        { id: 'ingeniero', label: 'Ingeniero Estructural', tipo: 'text', requerido: true },
        { id: 'matricula', label: 'Matrícula', tipo: 'text', requerido: true },
        { id: 'tipoFundacion', label: 'Tipo de Fundación', tipo: 'select', requerido: true, opciones: ['Zapatas aisladas', 'Zapatas corridas', 'Platea', 'Pilotes'] },
        { id: 'archivo', label: 'Subir Plano', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Plano Estructural - Columnas y Vigas',
      descripcion: 'Estructura de hormigón armado: columnas, vigas y encadenados',
      requerido: true,
      fase: 'Estructura',
      campos: [
        { id: 'escala', label: 'Escala', tipo: 'select', requerido: true, opciones: ['1:25', '1:50'] },
        { id: 'version', label: 'Versión', tipo: 'number', requerido: true },
        { id: 'fecha', label: 'Fecha', tipo: 'date', requerido: true },
        { id: 'ingeniero', label: 'Ingeniero Estructural', tipo: 'text', requerido: true },
        { id: 'matricula', label: 'Matrícula', tipo: 'text', requerido: true },
        { id: 'archivo', label: 'Subir Plano', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Plano de Instalación Eléctrica',
      descripcion: 'Recorrido de cañerías, tablero y puntos de luz/tomas',
      requerido: true,
      fase: 'Instalaciones',
      campos: [
        { id: 'escala', label: 'Escala', tipo: 'select', requerido: true, opciones: ['1:50', '1:100'] },
        { id: 'version', label: 'Versión', tipo: 'number', requerido: true },
        { id: 'fecha', label: 'Fecha', tipo: 'date', requerido: true },
        { id: 'electricista', label: 'Electricista Responsable', tipo: 'text', requerido: true },
        { id: 'matricula', label: 'Matrícula', tipo: 'text', requerido: true },
        { id: 'potenciaContratada', label: 'Potencia Contratada (kW)', tipo: 'number', requerido: true },
        { id: 'archivo', label: 'Subir Plano', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Plano de Instalación Sanitaria',
      descripcion: 'Desagües cloacales, pluviales y agua potable',
      requerido: true,
      fase: 'Instalaciones',
      campos: [
        { id: 'escala', label: 'Escala', tipo: 'select', requerido: true, opciones: ['1:50', '1:100'] },
        { id: 'version', label: 'Versión', tipo: 'number', requerido: true },
        { id: 'fecha', label: 'Fecha', tipo: 'date', requerido: true },
        { id: 'plomero', label: 'Plomero Responsable', tipo: 'text', requerido: true },
        { id: 'matricula', label: 'Matrícula', tipo: 'text', requerido: false },
        { id: 'archivo', label: 'Subir Plano', tipo: 'file', requerido: true }
      ]
    }
  ],
  
  'Contratos': [
    {
      nombre: 'Contrato con Propietario',
      descripcion: 'Acuerdo entre constructor y propietario',
      requerido: true,
      fase: 'Pre-construcción',
      campos: [
        { id: 'nombrePropietario', label: 'Nombre del Propietario', tipo: 'text', requerido: true },
        { id: 'dniPropietario', label: 'DNI/CUIT', tipo: 'text', requerido: true },
        { id: 'fechaFirma', label: 'Fecha de Firma', tipo: 'date', requerido: true },
        { id: 'montoTotal', label: 'Monto Total ($)', tipo: 'number', requerido: true },
        { id: 'planPagos', label: 'Plan de Pagos', tipo: 'textarea', requerido: true, placeholder: 'Ej: 30% al inicio, 40% avance de obra, 30% entrega' },
        { id: 'plazoObra', label: 'Plazo de Obra (días)', tipo: 'number', requerido: true },
        { id: 'archivo', label: 'Subir Contrato Firmado', tipo: 'file', requerido: true }
      ]
    },
    {
      nombre: 'Contrato Capataz',
      descripcion: 'Contrato de trabajo del encargado de obra',
      requerido: true,
      fase: 'Pre-construcción',
      campos: [
        { id: 'nombreCompleto', label: 'Nombre Completo', tipo: 'text', requerido: true },
        { id: 'dni', label: 'DNI', tipo: 'text', requerido: true },
        { id: 'fechaInicio', label: 'Fecha de Inicio', tipo: 'date', requerido: true },
        { id: 'fechaFin', label: 'Fecha de Fin', tipo: 'date', requerido: false },
        { id: 'salarioMensual', label: 'Salario Mensual ($)', tipo: 'number', requerido: true },
        { id: 'horario', label: 'Horario de Trabajo', tipo: 'text', requerido: true, placeholder: 'Ej: Lun-Vie 7-17hs, Sáb 7-13hs' },
        { id: 'archivo', label: 'Subir Contrato Firmado', tipo: 'file', requerido: true }
      ]
    }
  ]
};

/**
 * Obtener documentos faltantes para una obra
 */
export function obtenerDocumentosFaltantes(
  carpeta: string,
  documentosExistentes: string[]
): DocumentTemplate[] {
  const templates = TEMPLATES_CASA_UNIFAMILIAR[carpeta] || [];
  return templates.filter(template => 
    template.requerido && !documentosExistentes.includes(template.nombre)
  );
}

/**
 * Calcular progreso de documentación
 */
export function calcularProgresoDocumentacion(
  documentosExistentes: Array<{ carpeta: string; nombre: string }>
): { porcentaje: number; faltantes: number; total: number } {
  let totalRequeridos = 0;
  let completados = 0;
  
  Object.entries(TEMPLATES_CASA_UNIFAMILIAR).forEach(([carpeta, templates]) => {
    templates.forEach(template => {
      if (template.requerido) {
        totalRequeridos++;
        const existe = documentosExistentes.some(
          doc => doc.carpeta === carpeta && doc.nombre === template.nombre
        );
        if (existe) completados++;
      }
    });
  });
  
  return {
    porcentaje: totalRequeridos > 0 ? (completados / totalRequeridos) * 100 : 0,
    faltantes: totalRequeridos - completados,
    total: totalRequeridos
  };
}
```

### **Componente para usar templates:**

**Archivo:** `sgio-app/app/components/FormularioDocumento.tsx`

```typescript
'use client';

import { useState } from 'react';
import { DocumentTemplate } from '@/lib/constants/templates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  template: DocumentTemplate;
  onGuardar: (datos: Record<string, any>) => void;
  onCancelar: () => void;
}

export function FormularioDocumento({ template, onGuardar, onCancelar }: Props) {
  const [datos, setDatos] = useState<Record<string, any>>({});
  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: any) => {
    setDatos({ ...datos, [id]: value });
    // Limpiar error al editar
    if (errores[id]) {
      setErrores({ ...errores, [id]: '' });
    }
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {};
    
    template.campos.forEach(campo => {
      if (campo.requerido && !datos[campo.id]) {
        nuevosErrores[campo.id] = 'Este campo es obligatorio';
      }
      
      // Validación custom si existe
      if (campo.validacion && datos[campo.id]) {
        const regex = new RegExp(campo.validacion);
        if (!regex.test(datos[campo.id])) {
          nuevosErrores[campo.id] = 'Formato inválido';
        }
      }
    });
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) {
      onGuardar({
        ...datos,
        templateNombre: template.nombre,
        carpeta: template.fase || 'Otros',
        fechaCreacion: new Date().toISOString()
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{template.nombre}</CardTitle>
        <p className="text-sm text-muted-foreground">{template.descripcion}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {template.campos.map(campo => (
            <div key={campo.id} className="space-y-2">
              <label className="block text-sm font-medium">
                {campo.label}
                {campo.requerido && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {campo.tipo === 'text' && (
                <input
                  type="text"
                  value={datos[campo.id] || ''}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  placeholder={campo.placeholder}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                />
              )}
              
              {campo.tipo === 'number' && (
                <input
                  type="number"
                  value={datos[campo.id] || ''}
                  onChange={(e) => handleChange(campo.id, parseFloat(e.target.value))}
                  placeholder={campo.placeholder}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                />
              )}
              
              {campo.tipo === 'date' && (
                <input
                  type="date"
                  value={datos[campo.id] || ''}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                />
              )}
              
              {campo.tipo === 'select' && (
                <select
                  value={datos[campo.id] || ''}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                >
                  <option value="">Seleccionar...</option>
                  {campo.opciones?.map(opcion => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              )}
              
              {campo.tipo === 'textarea' && (
                <textarea
                  value={datos[campo.id] || ''}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  placeholder={campo.placeholder}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                />
              )}
              
              {campo.tipo === 'file' && (
                <input
                  type="file"
                  onChange={(e) => handleChange(campo.id, e.target.files?.[0])}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                  accept=".pdf,.jpg,.jpeg,.png,.dwg"
                />
              )}
              
              {errores[campo.id] && (
                <p className="text-sm text-red-500">{errores[campo.id]}</p>
              )}
            </div>
          ))}
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancelar}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar Documento
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

---

## ⚙️ MEJORA #3: Integración con Gemini 1.5 Flash

**Archivo:** `sgio-app/lib/ai/gemini.ts`

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Extraer datos de factura/remito usando OCR
 */
export async function extraerDatosFactura(archivo: File): Promise<{
  proveedor: string;
  cuit: string;
  numeroFactura: string;
  fecha: string;
  montoTotal: number;
  items: Array<{ descripcion: string; cantidad: number; precio: number }>;
}> {
  try {
    // Convertir archivo a base64
    const base64 = await archivoABase64(archivo);
    
    const prompt = `
Analiza esta factura y extrae la siguiente información en formato JSON:
{
  "proveedor": "nombre completo del proveedor",
  "cuit": "CUIT/CUIL",
  "numeroFactura": "número de factura",
  "fecha": "fecha en formato YYYY-MM-DD",
  "montoTotal": número total,
  "items": [
    {
      "descripcion": "descripción del item",
      "cantidad": número,
      "precio": número
    }
  ]
}

IMPORTANTE: 
- Devuelve SOLO el JSON, sin texto adicional
- Si algún campo no está visible, usa null
- Las fechas deben estar en formato YYYY-MM-DD
- Los números sin símbolos de moneda
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: archivo.type,
          data: base64
        }
      }
    ]);

    const response = result.response.text();
    const json = JSON.parse(response.replace(/```json\n?|\n?```/g, ''));
    
    return json;
  } catch (error) {
    console.error('Error extrayendo datos de factura:', error);
    throw new Error('No se pudo procesar la factura. Por favor, ingresa los datos manualmente.');
  }
}

/**
 * Detectar partida presupuestaria según descripción
 */
export async function detectarPartida(descripcion: string): Promise<string> {
  const prompt = `
Analiza esta descripción de gasto y determina a qué partida presupuestaria de construcción corresponde:

Descripción: "${descripcion}"

Partidas disponibles:
1. Cemento y Áridos
2. Hierro y Acero
3. Ladrillos y Bloques
4. Madera para Encofrado
5. Mano de Obra - Oficial Albañil
6. Mano de Obra - Ayudantes
7. Equipamiento (alquiler de maquinaria)
8. Herramientas
9. Instalación Eléctrica
10. Instalación Sanitaria
11. Pintura y Revestimientos
12. Carpintería y Aberturas
13. Otros

Responde SOLO con el nombre de la partida más apropiada.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Error detectando partida:', error);
    return 'Otros';
  }
}

/**
 * Sugerir tareas para un hito
 */
export async function sugerirTareas(hitoNombre: string): Promise<string[]> {
  const prompt = `
Eres un experto en construcción de viviendas unifamiliares.

Hito de construcción: "${hitoNombre}"

Lista 8 tareas específicas, detalladas y prácticas que deben realizarse en este hito.
Formato: Una tarea por línea, sin numeración, sin guiones.

Ejemplos de tareas bien escritas:
- Replanteo del terreno con estacas y nivel topográfico
- Excavación de zanjas para fundaciones con 60cm de profundidad
- Armado de parrilla de hierro 8mm con separación de 20cm
- Vaciado de hormigón H17 para base de cimientos

Ahora genera las tareas para: ${hitoNombre}
  `;

  try {
    const result = await model.generateContent(prompt);
    const tareas = result.response.text()
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .slice(0, 8);
    
    return tareas;
  } catch (error) {
    console.error('Error sugiriendo tareas:', error);
    return [];
  }
}

/**
 * Búsqueda semántica en documentos
 */
export async function buscarDocumentoSemantico(
  query: string,
  documentos: Array<{ id: number; nombre: string; carpeta: string }>
): Promise<number[]> {
  const prompt = `
Usuario busca: "${query}"

Documentos disponibles:
${documentos.map((d, i) => `${i}. ${d.nombre} (${d.carpeta})`).join('\n')}

¿Cuáles documentos coinciden con la búsqueda?
Responde SOLO con los números de los documentos relevantes, separados por comas.
Ejemplo: 0,3,7

Si no hay coincidencias, responde: ninguno
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text().trim().toLowerCase();
    
    if (response === 'ninguno') return [];
    
    const indices = response.split(',').map(n => parseInt(n.trim()));
    return indices.map(i => documentos[i]?.id).filter(id => id !== undefined);
  } catch (error) {
    console.error('Error en búsqueda semántica:', error);
    return [];
  }
}

/**
 * Chatbot conversacional
 */
export async function chatbot(
  mensaje: string,
  contexto: {
    obras: any[];
    documentos: any[];
    gastos: any[];
    partesDiarios: any[];
  }
): Promise<string> {
  const prompt = `
Eres AURA, el asistente inteligente de SGIO (Sistema de Gestión Integral de Obras).

CONTEXTO DEL SISTEMA:
Obras: ${JSON.stringify(contexto.obras, null, 2)}
Documentos: ${JSON.stringify(contexto.documentos, null, 2)}
Gastos: ${JSON.stringify(contexto.gastos, null, 2)}
Partes Diarios: ${JSON.stringify(contexto.partesDiarios, null, 2)}

MENSAJE DEL USUARIO:
${mensaje}

INSTRUCCIONES:
- Responde basándote SOLO en los datos del contexto
- Si preguntan por un documento, búscalo en la lista
- Si preguntan por gastos, calcula y muestra resumen
- Si preguntan por avance, analiza los hitos
- Sé conciso, práctico y directo
- Usa emojis para hacer la respuesta más amigable
- Si no tienes la información, dilo claramente

RESPUESTA:
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error en chatbot:', error);
    return '❌ Lo siento, hubo un error procesando tu consulta. Por favor, intenta nuevamente.';
  }
}

// Utilidad: convertir archivo a base64
async function archivoABase64(archivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(archivo);
  });
}
```

### **Instalación de dependencias:**

```powershell
cd sgio-app
npm install @google/generative-ai
```

### **Variables de entorno:**

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_GEMINI_API_KEY=tu-api-key-aquí
```

---

## 📊 MEJORA #4: Predicción de Retrasos

**Archivo:** `sgio-app/lib/utils/predicciones.ts`

```typescript
interface Hito {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  avance: number;
  presupuestado: number;
  gastado: number;
}

interface Prediccion {
  estado: 'en-tiempo' | 'en-riesgo' | 'atrasado';
  mensaje: string;
  diasRetraso?: number;
  recomendaciones: string[];
}

/**
 * Calcular diferencia en días entre dos fechas
 */
function diasEntre(fecha1: string | Date, fecha2: string | Date): number {
  const d1 = new Date(fecha1);
  const d2 = new Date(fecha2);
  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Predecir retrasos en un hito
 */
export function predecirRetraso(hito: Hito): Prediccion {
  const hoy = new Date();
  const diasTranscurridos = diasEntre(hito.fechaInicio, hoy);
  const diasTotales = diasEntre(hito.fechaInicio, hito.fechaFin);
  
  // Avance esperado según cronograma
  const avanceEsperado = (diasTranscurridos / diasTotales) * 100;
  const avanceReal = hito.avance;
  
  const diferencia = avanceEsperado - avanceReal;
  
  // Calcular días de retraso proyectado
  const diasRetraso = Math.ceil((diferencia / 100) * diasTotales);
  
  // Análisis de presupuesto
  const usoPresupuesto = (hito.gastado / hito.presupuestado) * 100;
  const desviacionPresupuesto = usoPresupuesto - avanceReal;
  
  // Generar recomendaciones
  const recomendaciones: string[] = [];
  
  if (diferencia > 15) {
    return {
      estado: 'atrasado',
      mensaje: `⚠️ ALERTA: Este hito está ${diferencia.toFixed(0)}% atrasado. Riesgo de retraso de ${diasRetraso} días en la fecha de entrega.`,
      diasRetraso,
      recomendaciones: [
        'Aumentar cuadrilla de trabajadores',
        'Revisar disponibilidad de materiales',
        'Considerar horas extra o trabajo en sábados',
        'Reunión urgente con capataz'
      ]
    };
  } else if (diferencia > 8) {
    if (desviacionPresupuesto > 10) {
      recomendaciones.push('⚠️ Presupuesto elevado para el avance. Revisar gastos.');
    }
    recomendaciones.push('Monitorear de cerca el avance diario');
    recomendaciones.push('Verificar disponibilidad de materiales críticos');
    
    return {
      estado: 'en-riesgo',
      mensaje: `⚠️ Este hito muestra signos de retraso (${diferencia.toFixed(0)}% de desfase). Monitoreo cercano requerido.`,
      diasRetraso: Math.ceil(diasRetraso / 2),
      recomendaciones
    };
  }
  
  // Todo bien
  if (avanceReal > avanceEsperado + 5) {
    recomendaciones.push('✅ El hito avanza mejor de lo esperado. ¡Excelente!');
  } else {
    recomendaciones.push('✅ El hito avanza según lo planificado.');
  }
  
  if (desviacionPresupuesto < -5) {
    recomendaciones.push('💰 Presupuesto por debajo de lo esperado. Buen control de costos.');
  }
  
  return {
    estado: 'en-tiempo',
    mensaje: `✅ El hito avanza según lo planificado.`,
    recomendaciones
  };
}

/**
 * Predecir fecha de finalización real
 */
export function predecirFechaFinalizacion(hito: Hito): Date {
  const prediccion = predecirRetraso(hito);
  const fechaFin = new Date(hito.fechaFin);
  
  if (prediccion.diasRetraso) {
    fechaFin.setDate(fechaFin.getDate() + prediccion.diasRetraso);
  }
  
  return fechaFin;
}

/**
 * Calcular índice de salud del proyecto (0-100)
 */
export function calcularIndiceSalud(obra: { hitos: Hito[] }): {
  indice: number;
  estado: 'excelente' | 'bueno' | 'regular' | 'critico';
  factores: Array<{ nombre: string; impacto: number; descripcion: string }>;
} {
  const factores: Array<{ nombre: string; impacto: number; descripcion: string }> = [];
  
  // Factor 1: Cumplimiento de cronograma (40%)
  let cumplimientoPromedio = 0;
  obra.hitos.forEach(hito => {
    const prediccion = predecirRetraso(hito);
    if (prediccion.estado === 'en-tiempo') cumplimientoPromedio += 100;
    else if (prediccion.estado === 'en-riesgo') cumplimientoPromedio += 60;
    else cumplimientoPromedio += 20;
  });
  cumplimientoPromedio /= obra.hitos.length;
  factores.push({
    nombre: 'Cronograma',
    impacto: 0.4,
    descripcion: cumplimientoPromedio > 80 ? 'En tiempo' : cumplimientoPromedio > 50 ? 'Con retrasos menores' : 'Retrasos significativos'
  });
  
  // Factor 2: Control de presupuesto (35%)
  let controlPresupuesto = 0;
  obra.hitos.forEach(hito => {
    const usoPresupuesto = (hito.gastado / hito.presupuestado) * 100;
    const avance = hito.avance;
    const desviacion = Math.abs(usoPresupuesto - avance);
    
    if (desviacion < 5) controlPresupuesto += 100;
    else if (desviacion < 15) controlPresupuesto += 70;
    else controlPresupuesto += 30;
  });
  controlPresupuesto /= obra.hitos.length;
  factores.push({
    nombre: 'Presupuesto',
    impacto: 0.35,
    descripcion: controlPresupuesto > 80 ? 'Bajo control' : controlPresupuesto > 50 ? 'Desviaciones moderadas' : 'Sobrecoste significativo'
  });
  
  // Factor 3: Avance general (25%)
  const hitosCompletados = obra.hitos.filter(h => h.avance === 100).length;
  const avanceGeneral = (hitosCompletados / obra.hitos.length) * 100;
  factores.push({
    nombre: 'Avance',
    impacto: 0.25,
    descripcion: `${hitosCompletados} de ${obra.hitos.length} hitos completados`
  });
  
  // Calcular índice total
  const indice = Math.round(
    cumplimientoPromedio * 0.4 +
    controlPresupuesto * 0.35 +
    avanceGeneral * 0.25
  );
  
  // Determinar estado
  let estado: 'excelente' | 'bueno' | 'regular' | 'critico';
  if (indice >= 85) estado = 'excelente';
  else if (indice >= 70) estado = 'bueno';
  else if (indice >= 50) estado = 'regular';
  else estado = 'critico';
  
  return { indice, estado, factores };
}
```

---

## 🎨 COMPONENTE: Dashboard de Salud del Proyecto

**Archivo:** `sgio-app/app/components/IndiceSalud.tsx`

```typescript
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calcularIndiceSalud } from '@/lib/utils/predicciones';

interface Props {
  obra: {
    hitos: Array<{
      id: number;
      nombre: string;
      fechaInicio: string;
      fechaFin: string;
      avance: number;
      presupuestado: number;
      gastado: number;
    }>;
  };
}

export function IndiceSalud({ obra }: Props) {
  const { indice, estado, factores } = calcularIndiceSalud(obra);
  
  const getColorByEstado = (estado: string) => {
    switch (estado) {
      case 'excelente': return 'bg-green-500';
      case 'bueno': return 'bg-blue-500';
      case 'regular': return 'bg-yellow-500';
      case 'critico': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getTextByEstado = (estado: string) => {
    switch (estado) {
      case 'excelente': return '🎉 Excelente';
      case 'bueno': return '👍 Bueno';
      case 'regular': return '⚠️ Regular';
      case 'critico': return '🚨 Crítico';
      default: return 'Desconocido';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Índice de Salud del Proyecto</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Indicador principal */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-5xl font-bold">{indice}</p>
            <p className="text-sm text-muted-foreground">de 100</p>
          </div>
          <Badge className={getColorByEstado(estado)}>
            {getTextByEstado(estado)}
          </Badge>
        </div>
        
        {/* Barra de progreso visual */}
        <div className="mb-6">
          <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full ${getColorByEstado(estado)} transition-all`}
              style={{ width: `${indice}%` }}
            />
          </div>
        </div>
        
        {/* Factores */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Factores evaluados:</h4>
          {factores.map(factor => (
            <div key={factor.nombre} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{factor.nombre}</span>
                <span className="text-sm text-muted-foreground">
                  {(factor.impacto * 100).toFixed(0)}% peso
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{factor.descripcion}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### **Fase 1: Fundamentos (Semana 1)**
- [ ] Crear `usePersistentState` hook
- [ ] Crear `useAutoSave` hook
- [ ] Crear `useRecoverDraft` hook
- [ ] Integrar persistencia en Parte Diario
- [ ] Integrar persistencia en Contador
- [ ] Integrar persistencia en Director
- [ ] Crear TEMPLATES_CASA_UNIFAMILIAR
- [ ] Crear FormularioDocumento component
- [ ] Agregar templates a Archivo Central
- [ ] Testing de persistencia

### **Fase 2: IA Básica (Semana 2)**
- [ ] Configurar Gemini API
- [ ] Implementar `extraerDatosFactura`
- [ ] Implementar `detectarPartida`
- [ ] Integrar OCR en modal de Contador
- [ ] Testing de OCR con facturas reales
- [ ] Implementar auto-guardado cada 30s
- [ ] Modal de recuperación de borradores
- [ ] Testing de auto-guardado

### **Fase 3: IA Avanzada (Semana 3)**
- [ ] Implementar `sugerirTareas`
- [ ] Botón "Sugerir con IA" en modal de tareas
- [ ] Implementar `buscarDocumentoSemantico`
- [ ] Barra de búsqueda inteligente en Archivo
- [ ] Implementar `predecirRetraso`
- [ ] Implementar `predecirFechaFinalizacion`
- [ ] Implementar `calcularIndiceSalud`
- [ ] Componente IndiceSalud
- [ ] Testing de predicciones

### **Fase 4: Experiencia Premium (Semana 4)**
- [ ] Implementar función `chatbot`
- [ ] Componente ChatObraIA
- [ ] Botón flotante del chatbot
- [ ] Testing de chatbot con consultas variadas
- [ ] Implementar extracción de info de PDFs
- [ ] Modal "Pregunta sobre este documento"
- [ ] Pulir UX de todas las features IA
- [ ] Documentación completa

---

## 📝 NOTAS FINALES

1. **Prioriza según tu necesidad:** No es necesario implementar todo. Empieza por lo más crítico para tu demo.

2. **Testing es fundamental:** Cada feature de IA debe testearse con casos reales antes de producción.

3. **API Keys:** Mantén las API keys seguras. Nunca las commits al repositorio.

4. **Costos de IA:** Monitorea el uso de Gemini. Con 50k requests/mes el costo es ~$30/mes.

5. **Fallbacks:** Siempre ten un plan B si la IA falla. Ejemplo: permitir carga manual de facturas si OCR falla.

¿Por dónde quieres empezar? 🚀
