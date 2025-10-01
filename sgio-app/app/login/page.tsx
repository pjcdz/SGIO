'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Lock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const usuarios = {
  director: { password: 'director123', role: 'director', redirect: '/director/dashboard' },
  contador: { password: 'contador123', role: 'contador', redirect: '/contador/dashboard' },
  capataz: { password: 'capataz123', role: 'capataz', redirect: '/capataz/parte-diario' },
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!username.trim() || !password.trim()) {
      setError('Por favor complete todos los campos');
      return;
    }

    setCargando(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const user = usuarios[username as keyof typeof usuarios];
      
      if (user && user.password === password) {
        localStorage.setItem('sgio-user', JSON.stringify({ username, role: user.role }));
        router.push(user.redirect);
      } else {
        setError('Usuario o contraseña incorrectos');
        setCargando(false);
      }
    }, 800);
  };

  const credenciales = [
    { user: 'director', pass: 'director123', role: 'Director', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { user: 'contador', pass: 'contador123', role: 'Contador', color: 'bg-green-50 text-green-700 border-green-200' },
    { user: 'capataz', pass: 'capataz123', role: 'Capataz', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Lado izquierdo - Branding */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">SGIO</h1>
              <p className="text-muted-foreground">Sistema de Gestión Integral de Obras</p>
            </div>
          </div>
          
          <div className="space-y-4 pt-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Gestión completa de construcción de viviendas
            </h2>
            <p className="text-muted-foreground text-lg">
              Desde el replanteo hasta la entrega final. Control total de presupuestos, 
              documentos y avance en tiempo real.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">11</div>
                <p className="text-sm text-muted-foreground">Fases de construcción</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">17</div>
                <p className="text-sm text-muted-foreground">Partidas presupuestarias</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">3</div>
                <p className="text-sm text-muted-foreground">Roles especializados</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100%</div>
                <p className="text-sm text-muted-foreground">Control y trazabilidad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho - Formulario de Login */}
        <div className="space-y-6">
          <Card className="shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
              <CardDescription>
                Ingrese sus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Usuario
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Ingrese su usuario"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type={mostrarPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Ingrese su contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {mostrarPassword ? (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={cargando}>
                  {cargando ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      Ingresar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Credenciales de prueba */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Credenciales de prueba
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {credenciales.map((cred) => (
                <div 
                  key={cred.user}
                  className={`p-3 rounded-lg border ${cred.color} cursor-pointer hover:shadow-md transition-all`}
                  onClick={() => {
                    setUsername(cred.user);
                    setPassword(cred.pass);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{cred.role}</p>
                      <p className="text-sm opacity-75">
                        Usuario: <span className="font-mono">{cred.user}</span>
                      </p>
                    </div>
                    <Badge variant="outline">{cred.pass}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/docs">
              <Button variant="link" size="sm">
                Ver documentación completa
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
