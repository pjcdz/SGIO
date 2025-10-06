import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">SGIO - Documentación</h1>
                <p className="text-sm text-slate-500">Guía rápida del sistema</p>
              </div>
            </div>
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Ir al Login
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Sistema de Gestión Integral de Obras
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Una aplicación web moderna diseñada bajo la filosofía de <strong>"Claridad Proactiva"</strong> 
            para gestionar proyectos de construcción de forma eficiente e inteligente.
          </p>
        </div>

        {/* Credenciales */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
            🔑 Credenciales de Acceso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">D</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Director</h4>
                  <p className="text-sm text-slate-500">Administrador</p>
                </div>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Usuario:</span>
                  <span className="font-semibold">director</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Contraseña:</span>
                  <span className="font-semibold">director123</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">C</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Contador</h4>
                  <p className="text-sm text-slate-500">Finanzas</p>
                </div>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Usuario:</span>
                  <span className="font-semibold">contador</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Contraseña:</span>
                  <span className="font-semibold">contador123</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">C</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Capataz</h4>
                  <p className="text-sm text-slate-500">Campo</p>
                </div>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Usuario:</span>
                  <span className="font-semibold">capataz</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Contraseña:</span>
                  <span className="font-semibold">capataz123</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Características Principales */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6">✨ Características Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Claridad Absoluta</h4>
              <p className="text-slate-600">Diseño minimalista estilo Apple con tipografía clara y espacios generosos para una experiencia intuitiva.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Inteligencia AURA</h4>
              <p className="text-slate-600">Sistema de IA con OCR para facturas y motor de alertas que notifica automáticamente situaciones críticas.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Arquitectura Guiada</h4>
              <p className="text-slate-600">Plantillas predefinidas que generan automáticamente hitos, partidas y estructura de archivos.</p>
            </div>
          </div>
        </div>

        {/* Módulos por Rol */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6">📱 Módulos por Rol</h3>
          
          {/* Director */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-slate-900">Director / Administrador</h4>
                <p className="text-slate-500">Control total del proyecto</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Dashboard General</p>
                  <p className="text-sm text-slate-600">Vista de todas las obras con KPIs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Línea de Tiempo</p>
                  <p className="text-sm text-slate-600">Gestión de hitos y tareas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Archivo Central</p>
                  <p className="text-sm text-slate-600">3 paneles con versionado automático</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Gestión de Costos</p>
                  <p className="text-sm text-slate-600">Partidas y transacciones detalladas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contador */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-slate-900">Contador / Finanzas</h4>
                <p className="text-slate-500">Gestión financiera y administrativa</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Dashboard Financiero</p>
                  <p className="text-sm text-slate-600">Facturas pendientes y transacciones</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Registro de Gastos</p>
                  <p className="text-sm text-slate-600">Con IA-OCR para facturas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Asignación de Costos</p>
                  <p className="text-sm text-slate-600">A obras, hitos y partidas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Archivo de Documentos</p>
                  <p className="text-sm text-slate-600">Facturas, remitos y contratos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Capataz */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-slate-900">Capataz / Campo</h4>
                <p className="text-slate-500">Interfaz móvil simplificada</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-orange-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Parte Diario</p>
                  <p className="text-sm text-slate-600">Optimizado para uso móvil</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Registro de Personal</p>
                  <p className="text-sm text-slate-600">Control de asistencia con toggles</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Estado de Tareas</p>
                  <p className="text-sm text-slate-600">No iniciado / En progreso / Finalizado</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-600 mt-1">✓</span>
                <div>
                  <p className="font-medium text-slate-900">Evidencia Fotográfica</p>
                  <p className="text-sm text-slate-600">Captura desde cámara del móvil</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stack Tecnológico */}
        <div className="mt-12 bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6">🚀 Stack Tecnológico</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl text-center">
              <p className="font-semibold text-slate-900">Next.js 14</p>
              <p className="text-sm text-slate-600">Framework</p>
            </div>
            <div className="bg-white p-4 rounded-xl text-center">
              <p className="font-semibold text-slate-900">TypeScript</p>
              <p className="text-sm text-slate-600">Lenguaje</p>
            </div>
            <div className="bg-white p-4 rounded-xl text-center">
              <p className="font-semibold text-slate-900">Tailwind CSS</p>
              <p className="text-sm text-slate-600">Estilos</p>
            </div>
            <div className="bg-white p-4 rounded-xl text-center">
              <p className="font-semibold text-slate-900">React</p>
              <p className="text-sm text-slate-600">UI Library</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/login"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition shadow-2xl shadow-blue-500/50"
          >
            <span>Comenzar a Usar SGIO</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
