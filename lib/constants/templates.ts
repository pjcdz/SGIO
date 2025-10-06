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
    },
    {
      nombre: 'Plano de Instalación de Gas',
      descripcion: 'Recorrido de cañerías de gas y ubicación de artefactos',
      requerido: true,
      fase: 'Instalaciones',
      campos: [
        { id: 'escala', label: 'Escala', tipo: 'select', requerido: true, opciones: ['1:50', '1:100'] },
        { id: 'version', label: 'Versión', tipo: 'number', requerido: true },
        { id: 'fecha', label: 'Fecha', tipo: 'date', requerido: true },
        { id: 'gasista', label: 'Gasista Matriculado', tipo: 'text', requerido: true },
        { id: 'matricula', label: 'Matrícula', tipo: 'text', requerido: true },
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
    },
    {
      nombre: 'Contrato Oficial Albañil',
      descripcion: 'Contrato de trabajo del oficial albañil',
      requerido: true,
      fase: 'Pre-construcción',
      campos: [
        { id: 'nombreCompleto', label: 'Nombre Completo', tipo: 'text', requerido: true },
        { id: 'dni', label: 'DNI', tipo: 'text', requerido: true },
        { id: 'fechaInicio', label: 'Fecha de Inicio', tipo: 'date', requerido: true },
        { id: 'salario', label: 'Salario ($)', tipo: 'number', requerido: true },
        { id: 'especialidad', label: 'Especialidad', tipo: 'text', requerido: false, placeholder: 'Ej: Mampostería, revoques' },
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

/**
 * Obtener todos los templates disponibles
 */
export function obtenerTodosLosTemplates(): DocumentTemplate[] {
  const todos: DocumentTemplate[] = [];
  Object.values(TEMPLATES_CASA_UNIFAMILIAR).forEach(templates => {
    todos.push(...templates);
  });
  return todos;
}

/**
 * Buscar template por nombre
 */
export function buscarTemplate(nombre: string): DocumentTemplate | undefined {
  for (const templates of Object.values(TEMPLATES_CASA_UNIFAMILIAR)) {
    const found = templates.find(t => t.nombre === nombre);
    if (found) return found;
  }
  return undefined;
}
