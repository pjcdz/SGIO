'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/ui/header-nav';
import { usePersistentState } from '@/lib/hooks/usePersistentState';

interface Factura {
  id: number;
  obra: string;
  proveedor: string;
  monto: number;
  fecha: string;
  estado: 'pendiente' | 'procesada';
}

export default function ContadorDashboard() {
  // Usar persistencia para facturas y transacciones
  const [facturasPendientes, setFacturasPendientes] = usePersistentState<Factura[]>('facturas-pendientes', [
    { id: 1, obra: 'Casa López', proveedor: 'Corralón Los Andes', monto: 18500, fecha: '2024-10-01', estado: 'pendiente' },
    { id: 2, obra: 'Casa Fernández', proveedor: 'Sanitarios del Sur', monto: 12400, fecha: '2024-09-30', estado: 'pendiente' },
    { id: 3, obra: 'Casa Martínez', proveedor: 'Ladrillos San Martín', monto: 8900, fecha: '2024-09-29', estado: 'pendiente' },
    { id: 4, obra: 'Casa López', proveedor: 'Pinturas Premium', monto: 6200, fecha: '2024-09-28', estado: 'pendiente' },
  ]);

  const [ultimasTransacciones, setUltimasTransacciones] = usePersistentState('ultimas-transacciones', [
    { id: 1, obra: 'Casa López', concepto: 'Cemento Portland x 50 bolsas', monto: 18500, fecha: '2024-10-01' },
    { id: 2, obra: 'Casa López', concepto: 'Hierro estructural 8mm y 12mm', monto: 32500, fecha: '2024-09-30' },
    { id: 3, obra: 'Casa Fernández', concepto: 'Instalación eléctrica - materiales', monto: 15200, fecha: '2024-09-30' },
    { id: 4, obra: 'Casa López', concepto: 'Pago quincenal cuadrilla', monto: 28000, fecha: '2024-09-29' },
    { id: 5, obra: 'Casa Martínez', concepto: 'Alquiler retroexcavadora 3 días', monto: 8500, fecha: '2024-09-28' },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [archivoSubido, setArchivoSubido] = useState<File | null>(null);
  const [mostrarModalProcesar, setMostrarModalProcesar] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null);
  
  // Estados para el formulario de registro
  const [obraSeleccionada, setObraSeleccionada] = useState('');
  const [hitoSeleccionado, setHitoSeleccionado] = useState('');
  const [partidaSeleccionada, setPartidaSeleccionada] = useState('');
  const [errorValidacion, setErrorValidacion] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoSubido(e.target.files[0]);
    }
  };

  const handleProcesarFactura = (factura: Factura) => {
    setFacturaSeleccionada(factura);
    setMostrarModalProcesar(true);
  };

  const handleGuardarProcesamiento = () => {
    // Validaciones
    if (!obraSeleccionada || !hitoSeleccionado || !partidaSeleccionada) {
      setErrorValidacion('⚠️ Debes seleccionar Obra, Hito y Partida antes de procesar la factura.');
      return;
    }
    
    if (facturaSeleccionada) {
      // Marcar factura como procesada y moverla a transacciones
      setFacturasPendientes(facturasPendientes.filter(f => f.id !== facturaSeleccionada.id));
      
      // Agregar a transacciones
      const nuevaTransaccion = {
        id: Date.now(),
        obra: obraSeleccionada,
        concepto: `Factura ${facturaSeleccionada.proveedor}`,
        monto: facturaSeleccionada.monto,
        fecha: facturaSeleccionada.fecha
      };
      setUltimasTransacciones([nuevaTransaccion, ...ultimasTransacciones]);
      
      alert(`✅ Factura de ${facturaSeleccionada.proveedor} procesada correctamente`);
      
      // Resetear estados
      setMostrarModalProcesar(false);
      setFacturaSeleccionada(null);
      setObraSeleccionada('');
      setHitoSeleccionado('');
      setPartidaSeleccionada('');
      setErrorValidacion('');
    }
  };

  const handleAbrirModalProcesar = (factura: Factura) => {
    setFacturaSeleccionada(factura);
    // Pre-seleccionar obra de la factura
    setObraSeleccionada(factura.obra);
    setHitoSeleccionado('Estructura y Mampostería'); // Default
    setPartidaSeleccionada('Cemento y Áridos'); // Default
    setErrorValidacion('');
    setMostrarModalProcesar(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <HeaderNav rol="contador" nombre="Contador" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Botón Registrar Gasto */}
        <div className="mb-8">
          <button
            onClick={() => setMostrarModal(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition shadow-lg shadow-green-500/30 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Registrar Gasto</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Facturas Pendientes */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Facturas Pendientes</h2>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                {facturasPendientes.length}
              </span>
            </div>

            <div className="space-y-3">
              {facturasPendientes.map((factura) => (
                <div key={factura.id} className="p-4 border border-slate-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 transition cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-900">{factura.proveedor}</p>
                      <p className="text-sm text-slate-500">{factura.obra}</p>
                    </div>
                    <p className="text-lg font-semibold text-slate-900">${factura.monto.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{factura.fecha}</span>
                    <button 
                      onClick={() => handleAbrirModalProcesar(factura)}
                      className="text-xs text-green-600 hover:text-green-700 font-medium"
                    >
                      Procesar →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Últimas Transacciones */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Últimas Transacciones</h2>

            <div className="space-y-3">
              {ultimasTransacciones.map((trans) => (
                <div key={trans.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">{trans.concepto}</p>
                    <p className="text-sm text-slate-500">{trans.obra}</p>
                    <p className="text-xs text-slate-400 mt-1">{trans.fecha}</p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">${trans.monto.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition font-medium">
              Ver todas las transacciones
            </button>
          </div>
        </div>

        {/* Resumen Mensual */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">Total Gastado (Mes)</p>
            <p className="text-3xl font-semibold text-slate-900">$186,400</p>
            <p className="text-sm text-green-600 mt-2">↑ 18% vs mes anterior</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">Facturas Procesadas</p>
            <p className="text-3xl font-semibold text-slate-900">64</p>
            <p className="text-sm text-slate-500 mt-2">Este mes</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">Obras Activas</p>
            <p className="text-3xl font-semibold text-slate-900">3</p>
            <p className="text-sm text-slate-500 mt-2">Con movimientos</p>
          </div>
        </div>
      </div>

      {/* Modal de Registro de Gasto */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Registrar Nuevo Gasto</h3>
                <button
                  onClick={() => setMostrarModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Upload de Factura */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  1. Subir Factura o Remito
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-green-500 transition">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*,application/pdf"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-slate-600 font-medium">Click para subir archivo</p>
                    <p className="text-sm text-slate-500 mt-1">PDF, JPG, PNG hasta 10MB</p>
                  </label>
                  {archivoSubido && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm">✓ {archivoSubido.name}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Datos extraídos por IA */}
              {archivoSubido && (
                <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="text-sm font-medium text-blue-900">AURA detectó automáticamente:</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Proveedor</label>
                      <input
                        type="text"
                        defaultValue="Corralón Los Andes"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Fecha</label>
                      <input
                        type="date"
                        defaultValue="2024-10-01"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Monto Total</label>
                      <input
                        type="number"
                        defaultValue="18500"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Asignación */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  2. Asignar a Obra y Partida
                </label>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Obra</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Seleccionar obra...</option>
                    <option>Casa Familia López - Barrio Los Robles</option>
                    <option>Casa Familia Fernández - Country Club</option>
                    <option>Casa Familia Martínez - Zona Norte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Hito</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Seleccionar hito...</option>
                    <option>Estructura y Mampostería</option>
                    <option>Cubierta de Techo</option>
                    <option>Instalación Eléctrica</option>
                    <option>Instalación Sanitaria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Partida</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Seleccionar partida...</option>
                    <option>Cemento y Áridos</option>
                    <option>Hierro y Acero</option>
                    <option>Ladrillos y Bloques</option>
                    <option>Mano de Obra - Oficial</option>
                    <option>Mano de Obra - Ayudante</option>
                    <option>Equipamiento</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-6 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition font-medium"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                Guardar Gasto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Procesar Factura */}
      {mostrarModalProcesar && facturaSeleccionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Procesar Factura</h3>
                <button
                  onClick={() => {
                    setMostrarModalProcesar(false);
                    setFacturaSeleccionada(null);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Datos de la factura */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-sm font-medium text-blue-900">AURA detectó automáticamente:</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Proveedor</label>
                    <input
                      type="text"
                      defaultValue={facturaSeleccionada.proveedor}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Fecha</label>
                    <input
                      type="date"
                      defaultValue={facturaSeleccionada.fecha}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Monto Total</label>
                    <input
                      type="number"
                      defaultValue={facturaSeleccionada.monto}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Asignación */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Asignar a Obra y Partida
                </label>
                
                {errorValidacion && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{errorValidacion}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Obra</label>
                  <select 
                    value={obraSeleccionada}
                    onChange={(e) => {
                      setObraSeleccionada(e.target.value);
                      setErrorValidacion('');
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Seleccionar obra...</option>
                    <option selected={facturaSeleccionada.obra === 'Casa López'}>Casa Familia López - Barrio Los Robles</option>
                    <option selected={facturaSeleccionada.obra === 'Casa Fernández'}>Casa Familia Fernández - Country Club</option>
                    <option selected={facturaSeleccionada.obra === 'Casa Martínez'}>Casa Familia Martínez - Zona Norte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Hito</label>
                  <select 
                    value={hitoSeleccionado}
                    onChange={(e) => {
                      setHitoSeleccionado(e.target.value);
                      setErrorValidacion('');
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Seleccionar hito...</option>
                    <option>Replanteo y Excavación</option>
                    <option>Cimientos y Fundación</option>
                    <option selected>Estructura y Mampostería</option>
                    <option>Cubierta de Techo</option>
                    <option>Instalación Eléctrica</option>
                    <option>Instalación Sanitaria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Partida</label>
                  <select 
                    value={partidaSeleccionada}
                    onChange={(e) => {
                      setPartidaSeleccionada(e.target.value);
                      setErrorValidacion('');
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Seleccionar partida...</option>
                    <option selected>Cemento y Áridos</option>
                    <option>Hierro y Acero</option>
                    <option>Ladrillos y Bloques</option>
                    <option>Mano de Obra - Oficial</option>
                    <option>Mano de Obra - Ayudante</option>
                    <option>Equipamiento</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setMostrarModalProcesar(false);
                  setFacturaSeleccionada(null);
                }}
                className="px-6 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition font-medium"
              >
                Cancelar
              </button>
              <button 
                onClick={handleGuardarProcesamiento}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Procesar Factura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
