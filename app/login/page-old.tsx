'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de autenticación
    const users = {
      'director': { role: 'admin', password: 'director123' },
      'contador': { role: 'finance', password: 'contador123' },
      'capataz': { role: 'field_worker', password: 'capataz123' }
    };

    const user = users[username as keyof typeof users];
    
    if (user && user.password === password) {
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('username', username);
      
      // Redirección según rol
      switch (user.role) {
        case 'admin':
          router.push('/director/dashboard');
          break;
        case 'finance':
          router.push('/contador/dashboard');
          break;
        case 'field_worker':
          router.push('/capataz/parte-diario');
          break;
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">SGIO</h1>
          <p className="text-slate-500">Sistema de Gestión Integral de Obras</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Credenciales de prueba */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-500">Usuarios de prueba:</p>
            <Link 
              href="/docs"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              📖 Ver documentación
            </Link>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between px-3 py-2 bg-slate-50 rounded-lg">
              <span className="font-medium">Director:</span>
              <span className="font-mono">director / director123</span>
            </div>
            <div className="flex justify-between px-3 py-2 bg-slate-50 rounded-lg">
              <span className="font-medium">Contador:</span>
              <span className="font-mono">contador / contador123</span>
            </div>
            <div className="flex justify-between px-3 py-2 bg-slate-50 rounded-lg">
              <span className="font-medium">Capataz:</span>
              <span className="font-mono">capataz / capataz123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
