# Migración a shadcn/ui - SGIO

## ✅ Cambios Completados

### 1. **Configuración del Sistema de Diseño**

#### Archivos Creados/Modificados:
- ✅ `app/globals.css` - Actualizado con variables CSS del tema Claymorphism
- ✅ `app/layout.tsx` - Agregadas fuentes Plus Jakarta Sans, Lora y Roboto Mono
- ✅ `lib/utils.ts` - Función `cn()` para merge de clases Tailwind
- ✅ `components.json` - Configuración de shadcn/ui
- ✅ `package.json` - Agregadas dependencias de Radix UI

#### Variables CSS Implementadas:
```css
:root {
  /* Colores principales */
  --primary: oklch(0.5854 0.2041 277.1173);    /* Violeta */
  --secondary: oklch(0.8687 0.0043 56.3660);   /* Gris claro */
  --accent: oklch(0.9376 0.0260 321.9388);     /* Rosa suave */
  --destructive: oklch(0.6368 0.2078 25.3313); /* Rojo */
  
  /* Fuentes */
  --font-sans: Plus Jakarta Sans, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Roboto Mono, monospace;
  
  /* Radios */
  --radius: 1.25rem;
  
  /* Sombras personalizadas */
  --shadow-sm, --shadow, --shadow-md, --shadow-lg, --shadow-xl, --shadow-2xl
}
```

### 2. **Componentes UI de shadcn Creados**

#### `components/ui/button.tsx`
- Variantes: default, destructive, outline, secondary, ghost, link
- Tamaños: sm, default, lg, icon
- Soporte para `asChild` con Radix Slot

#### `components/ui/card.tsx`
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Estilo consistente con bordes redondeados y sombras

#### `components/ui/badge.tsx`
- Variantes: default, secondary, destructive, outline
- Para etiquetas y estados

#### `components/ui/progress.tsx`
- Barra de progreso con animaciones suaves
- Basado en Radix UI Progress

### 3. **Componentes Personalizados Mejorados**

#### `components/ui/header-nav.tsx`
- Header unificado para los 3 roles
- Usa iconos de Lucide React
- Botón de logout integrado
- Responsive y adaptable

#### `components/ui/kpi-card.tsx`
- Tarjetas para métricas con:
  - Icono opcional
  - Trend indicator (↑/↓)
  - Variantes de color
  - Hover effects

#### `components/ui/progress-bar.tsx`
- Barra de progreso mejorada con:
  - Auto-detección de variante según porcentaje
  - Variantes: success, warning, danger
  - Label opcional
  - Animaciones suaves

### 4. **Páginas Actualizadas**

#### `app/login/page.tsx` ✅
- Diseño completamente renovado
- Grid 2 columnas (branding + formulario)
- Estadísticas visuales (11 fases, 17 partidas, etc.)
- Credenciales clickeables
- Usa Card, Button, Badge de shadcn

## 🔄 Páginas Pendientes de Migración

### Director
- [ ] `app/director/dashboard/page.tsx`
- [ ] `app/director/obra/[id]/page.tsx`
- [ ] `app/director/archivo/page.tsx`
- [ ] `app/director/costos/page.tsx`

### Contador
- [ ] `app/contador/dashboard/page.tsx`

### Capataz
- [ ] `app/capataz/parte-diario/page.tsx`

### Documentación
- [ ] `app/docs/page.tsx`

## 📦 Dependencias Instaladas

```json
{
  "dependencies": {
    "@radix-ui/react-progress": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.544.0",
    "recharts": "^3.2.1",
    "tailwind-merge": "^3.3.1"
  }
}
```

## 🎨 Paleta de Colores

### Modo Claro
- **Primary**: Violeta vibrante (#7C3AED aprox)
- **Secondary**: Gris neutro claro
- **Accent**: Rosa suave
- **Background**: Blanco cálido
- **Muted**: Gris muy claro

### Modo Oscuro
- **Primary**: Violeta más claro
- **Background**: Gris oscuro
- **Card**: Gris medio oscuro
- Auto-ajuste de todas las variables

## 🚀 Próximos Pasos

### 1. Migrar Dashboard del Director
```tsx
import HeaderNav from '@/components/ui/header-nav';
import KPICard from '@/components/ui/kpi-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import { Building, DollarSign, Clock, AlertTriangle } from 'lucide-react';

// Reemplazar header actual con:
<HeaderNav rol="director" nombre="Director" />

// Reemplazar KPIs actuales con:
<KPICard 
  title="Obras Activas" 
  value={3}
  icon={Building}
  variant="primary"
/>
```

### 2. Agregar Componentes Adicionales de shadcn

#### Componentes Recomendados:
```bash
# Dialog para modales
npx shadcn@latest add dialog

# Tabs para navegación
npx shadcn@latest add tabs

# Select para dropdowns
npx shadcn@latest add select

# Input para formularios
npx shadcn@latest add input

# Avatar para usuarios
npx shadcn@latest add avatar

# Alert para notificaciones
npx shadcn@latest add alert
```

### 3. Crear Componentes Específicos de SGIO

#### `components/sgio/obra-card.tsx`
```tsx
import { Card } from '@/components/ui/card';
import ProgressBar from '@/components/ui/progress-bar';
import { Badge } from '@/components/ui/badge';

interface ObraCardProps {
  titulo: string;
  progreso: number;
  presupuesto: number;
  gastado: number;
  estado: 'activa' | 'pausada' | 'finalizada';
}
```

#### `components/sgio/milestone-timeline.tsx`
```tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface MilestoneProps {
  hitos: Array<{
    id: number;
    nombre: string;
    estado: 'completado' | 'en-progreso' | 'pendiente';
    fechaInicio: string;
    fechaFin: string;
  }>;
}
```

### 4. Implementar Modo Oscuro

```tsx
// En app/layout.tsx agregar:
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="light">
  {children}
</ThemeProvider>
```

### 5. Optimizar Performance

- Lazy loading de componentes pesados
- Memoización de cálculos complejos
- Code splitting por ruta
- Optimización de imágenes con next/image

## 🎯 Beneficios de la Migración

### Antes (Custom Components)
- ❌ Inconsistencia en estilos
- ❌ Sin accesibilidad (a11y)
- ❌ Código duplicado
- ❌ Sin soporte de teclado
- ❌ Hard-coded colors

### Después (shadcn/ui)
- ✅ Diseño consistente
- ✅ Accesibilidad completa (ARIA)
- ✅ Componentes reutilizables
- ✅ Navegación por teclado
- ✅ Sistema de tokens de diseño
- ✅ Modo oscuro listo
- ✅ TypeScript completo
- ✅ Mantenimiento más fácil

## 📚 Recursos

- [shadcn/ui Docs](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)
- [Recharts](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com)

## 💡 Tips

1. **Usa `cn()` siempre**: Para combinar clases de Tailwind de forma segura
2. **Variantes consistentes**: Usa las variantes predefinidas (default, primary, secondary)
3. **Spacing system**: Usa la escala de spacing de Tailwind (4, 6, 8, 12, 16)
4. **Icons de Lucide**: Reemplaza todos los SVG custom con iconos de Lucide
5. **Theme tokens**: Usa las variables CSS (bg-primary, text-foreground) en lugar de colores directos

## 🐛 Notas de Migración

- Los errores de linting en `globals.css` son normales (CSS linter no reconoce `@theme` de Tailwind v4)
- Las fuentes Plus Jakarta Sans se cargan automáticamente desde Google Fonts
- El modo oscuro está configurado pero no activado (agregar toggle en HeaderNav)
- Los componentes viejos están en `app/components/` - migrar gradualmente
