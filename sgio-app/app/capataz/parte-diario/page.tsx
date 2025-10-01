'use client';

import { useState, useEffect } from 'react';
import HeaderNav from '@/components/ui/header-nav';
import { useAutoSave, useRecoverDraft, clearDraft } from '@/lib/hooks/usePersistentState';

interface Trabajador {
  id: number;
  nombre: string;
  presente: boolean;
}

interface Tarea {
  id: number;
  descripcion: string;
  estado: 'no-iniciado' | 'en-progreso' | 'finalizado';
  evidencia: File | null;
}

export default function ParteCapataz() {
  const [fecha] = useState(new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([
    { id: 1, nombre: 'Juan Pérez', presente: false },
    { id: 2, nombre: 'Carlos Gómez', presente: false },
    { id: 3, nombre: 'Roberto Díaz', presente: false },
    { id: 4, nombre: 'Miguel Fernández', presente: false },
    { id: 5, nombre: 'Luis Martínez', presente: false },
  ]);

  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, descripcion: 'Levantar muros perimetrales planta baja', estado: 'finalizado', evidencia: null },
    { id: 2, descripcion: 'Instalar columnas de hormigón armado', estado: 'finalizado', evidencia: null },
    { id: 3, descripcion: 'Verificar nivel y aplomado de paredes', estado: 'en-progreso', evidencia: null },
    { id: 4, descripcion: 'Preparar mezcla para revoque grueso', estado: 'no-iniciado', evidencia: null },
  ]);

  const [mostrarCamara, setMostrarCamara] = useState<number | null>(null);
  const [mostrarRecuperarBorrador, setMostrarRecuperarBorrador] = useState(false);

  // Auto-guardado cada 30 segundos
  useAutoSave('parte-diario', { trabajadores, tareas }, 30000);

  // Recuperar borrador al cargar
  const borrador = useRecoverDraft<{ trabajadores: Trabajador[]; tareas: Tarea[] }>('parte-diario');

  useEffect(() => {
    if (borrador) {
      setMostrarRecuperarBorrador(true);
    }
  }, [borrador]);

  const recuperarBorrador = () => {
    if (borrador) {
      setTrabajadores(borrador.trabajadores);
      setTareas(borrador.tareas);
      setMostrarRecuperarBorrador(false);
    }
  };

  const descartarBorrador = () => {
    clearDraft('parte-diario');
    setMostrarRecuperarBorrador(false);
  };

  const togglePresencia = (id: number) => {
    setTrabajadores(trabajadores.map(t => 
      t.id === id ? { ...t, presente: !t.presente } : t
    ));
  };

  const cambiarEstadoTarea = (id: number, nuevoEstado: 'no-iniciado' | 'en-progreso' | 'finalizado') => {
    if (nuevoEstado === 'finalizado') {
      setMostrarCamara(id);
    } else {
      setTareas(tareas.map(t => 
        t.id === id ? { ...t, estado: nuevoEstado } : t
      ));
    }
  };

  const handleCapturarFoto = (tareaId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTareas(tareas.map(t => 
        t.id === tareaId ? { ...t, estado: 'finalizado' as const, evidencia: e.target.files![0] } : t
      ));
      setMostrarCamara(null);
    }
  };

  const handleEnviarParte = () => {
    // Validaciones proactivas
    const presentesCount = trabajadores.filter(t => t.presente).length;
    
    if (presentesCount === 0) {
      alert('⚠️ Debes marcar al menos un trabajador presente para enviar el parte diario.');
      return;
    }
    
    setEnviando(true);
    
    // Preparar datos para guardar
    const parteDiario = {
      fecha: new Date().toISOString(),
      fechaLegible: fecha,
      obra: 'Casa Familia López - Barrio Los Robles',
      hito: 'Estructura y Mampostería',
      trabajadores: trabajadores.map(t => ({
        id: t.id,
        nombre: t.nombre,
        presente: t.presente
      })),
      tareas: tareas.map(t => ({
        id: t.id,
        descripcion: t.descripcion,
        estado: t.estado,
        tieneEvidencia: t.evidencia !== null
      })),
      presentesCount: trabajadores.filter(t => t.presente).length,
      tareasCompletadas: tareas.filter(t => t.estado === 'finalizado').length,
      tareasEnProgreso: tareas.filter(t => t.estado === 'en-progreso').length
    };

    // Guardar en localStorage
    const partesAnteriores = JSON.parse(localStorage.getItem('partes-diarios') || '[]');
    partesAnteriores.push(parteDiario);
    localStorage.setItem('partes-diarios', JSON.stringify(partesAnteriores));

    // Simular envío
    setTimeout(() => {
      setEnviando(false);
      setMostrarConfirmacion(true);
      
      // Limpiar borrador después de enviar exitosamente
      clearDraft('parte-diario');
      
      // Ocultar confirmación después de 3 segundos
      setTimeout(() => {
        setMostrarConfirmacion(false);
      }, 3000);
    }, 1500);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'no-iniciado':
        return 'bg-slate-100 text-slate-700';
      case 'en-progreso':
        return 'bg-blue-500 text-white';
      case 'finalizado':
        return 'bg-green-500 text-white';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'no-iniciado':
        return 'No Iniciado';
      case 'en-progreso':
        return 'En Progreso';
      case 'finalizado':
        return 'Finalizado';
      default:
        return estado;
    }
  };

  const presentesCount = trabajadores.filter(t => t.presente).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header Mobile */}
      <HeaderNav rol="capataz" nombre="Capataz" />

      {/* Info Banner */}
      <div className="px-4 pt-4">
        <div className="flex flex-col gap-2 p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-base text-orange-900 font-semibold capitalize">{fecha}</span>
          </div>
          <div className="text-sm font-semibold text-orange-800 px-3 py-2 bg-orange-100 rounded-lg text-center">
            Casa Familia López - Estructura y Mampostería
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Registro de Personal */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Registro de Personal</h2>
            <p className="text-base text-slate-600">
              Presentes: <span className="font-bold text-green-600 text-lg">{presentesCount}</span> de {trabajadores.length}
            </p>
          </div>
          
          <div className="p-4 space-y-3">
            {trabajadores.map((trabajador) => (
              <div
                key={trabajador.id}
                className={`flex items-center justify-between p-5 rounded-xl border-2 transition ${
                  trabajador.presente
                    ? 'bg-green-50 border-green-400'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                    trabajador.presente ? 'bg-green-500 text-white' : 'bg-slate-300 text-slate-700'
                  }`}>
                    {trabajador.nombre.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-900 text-lg">{trabajador.nombre}</span>
                </div>
                
                <button
                  onClick={() => togglePresencia(trabajador.id)}
                  className={`w-16 h-8 rounded-full relative transition ${
                    trabajador.presente ? 'bg-green-500' : 'bg-slate-300'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    trabajador.presente ? 'translate-x-9' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tareas del Día */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Tareas del Día</h2>
            <p className="text-base text-slate-600 font-medium">Hito: Estructura y Mampostería</p>
          </div>
          
          <div className="p-4 space-y-4">
            {tareas.map((tarea) => (
              <div key={tarea.id} className="border-2 border-slate-200 rounded-xl overflow-hidden">
                <div className="p-5 bg-slate-50">
                  <p className="font-semibold text-slate-900 mb-4 text-base leading-relaxed">{tarea.descripcion}</p>
                  
                  {/* Estado de la Tarea */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => cambiarEstadoTarea(tarea.id, 'no-iniciado')}
                      className={`py-4 rounded-lg font-bold text-sm transition ${
                        tarea.estado === 'no-iniciado'
                          ? getEstadoColor(tarea.estado)
                          : 'bg-white text-slate-700 border-2 border-slate-300'
                      }`}
                    >
                      Sin Iniciar
                    </button>
                    <button
                      onClick={() => cambiarEstadoTarea(tarea.id, 'en-progreso')}
                      className={`py-4 rounded-lg font-bold text-sm transition ${
                        tarea.estado === 'en-progreso'
                          ? getEstadoColor(tarea.estado)
                          : 'bg-white text-slate-700 border-2 border-slate-300'
                      }`}
                    >
                      En Progreso
                    </button>
                    <button
                      onClick={() => cambiarEstadoTarea(tarea.id, 'finalizado')}
                      className={`py-4 rounded-lg font-bold text-sm transition ${
                        tarea.estado === 'finalizado'
                          ? getEstadoColor(tarea.estado)
                          : 'bg-white text-slate-700 border-2 border-slate-300'
                      }`}
                    >
                      Finalizado
                    </button>
                  </div>
                </div>

                {/* Evidencia */}
                {tarea.evidencia && (
                  <div className="p-4 bg-green-50 border-t-2 border-green-300">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-base text-green-800 font-bold">
                        ✓ Foto de evidencia capturada
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón Flotante de Envío */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <button 
          onClick={handleEnviarParte}
          disabled={enviando}
          className={`w-full py-5 bg-orange-600 text-white rounded-xl font-bold text-xl shadow-2xl shadow-orange-500/50 active:scale-95 transition flex items-center justify-center ${
            enviando ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {enviando ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            'Enviar Parte Diario'
          )}
        </button>
      </div>

      {/* Modal de Confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">¡Parte Diario Enviado!</h3>
            <p className="text-slate-700 mb-5 text-lg font-medium">
              El parte ha sido registrado correctamente
            </p>
            <div className="text-base text-slate-700 bg-slate-50 rounded-lg p-5 space-y-2">
              <p className="font-semibold"><strong className="text-slate-900">Presentes:</strong> {trabajadores.filter(t => t.presente).length} de {trabajadores.length}</p>
              <p className="font-semibold"><strong className="text-slate-900">Tareas completadas:</strong> {tareas.filter(t => t.estado === 'finalizado').length}</p>
              <p className="font-semibold"><strong className="text-slate-900">Tareas en progreso:</strong> {tareas.filter(t => t.estado === 'en-progreso').length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Recuperar Borrador */}
      {mostrarRecuperarBorrador && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Borrador Encontrado</h3>
            <p className="text-slate-700 mb-5 text-base">
              Detectamos que dejaste un parte diario sin completar. ¿Deseas recuperarlo?
            </p>
            <div className="flex gap-3">
              <button
                onClick={descartarBorrador}
                className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition"
              >
                Descartar
              </button>
              <button
                onClick={recuperarBorrador}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Recuperar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cámara */}
      {mostrarCamara !== null && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Capturar Evidencia</h3>
            <p className="text-slate-300">Toma una foto de la tarea completada</p>
          </div>

          <div className="w-full max-w-md p-4">
            <div className="bg-slate-800 rounded-2xl p-8 text-center mb-4">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleCapturarFoto(mostrarCamara, e)}
                className="hidden"
                id="camera-input"
              />
              <label htmlFor="camera-input" className="cursor-pointer">
                <svg className="w-24 h-24 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-white font-medium text-lg mb-2">Abrir Cámara</p>
                <p className="text-slate-400 text-sm">Toca para capturar foto</p>
              </label>
            </div>

            <button
              onClick={() => setMostrarCamara(null)}
              className="w-full py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
