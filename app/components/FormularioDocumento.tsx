'use client';

import { useState } from 'react';
import { DocumentTemplate } from '@/lib/constants/templates';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      const nuevosErrores = { ...errores };
      delete nuevosErrores[id];
      setErrores(nuevosErrores);
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
        fase: template.fase || 'Otros',
        fechaCreacion: new Date().toISOString()
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{template.nombre}</CardTitle>
            <CardDescription>{template.descripcion}</CardDescription>
          </div>
          {template.requerido && (
            <Badge variant="destructive">Requerido</Badge>
          )}
        </div>
        {template.fase && (
          <div className="mt-2">
            <Badge variant="outline">Fase: {template.fase}</Badge>
          </div>
        )}
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                />
              )}
              
              {campo.tipo === 'date' && (
                <input
                  type="date"
                  value={datos[campo.id] || ''}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                />
              )}
              
              {campo.tipo === 'select' && (
                <select
                  value={datos[campo.id] || ''}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errores[campo.id] ? 'border-red-500' : 'border-input'
                  }`}
                />
              )}
              
              {campo.tipo === 'file' && (
                <input
                  type="file"
                  onChange={(e) => handleChange(campo.id, e.target.files?.[0])}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
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
