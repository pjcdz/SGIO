# SGIO - Sistema de Gestión Integral de Obras

Una aplicación web progresiva (PWA) desarrollada con Next.js 14 para la gestión integral de proyectos de construcción de **viviendas unifamiliares**.

## 🏡 Enfoque Especializado

SGIO está diseñado específicamente para la **construcción de casas unifamiliares**, optimizando el proceso completo desde el replanteo hasta la entrega final. El sistema maneja las 11 fases típicas de construcción residencial con presupuestos detallados y seguimiento en tiempo real.

## 🎯 Características Principales

### Filosofía "Claridad Proactiva"
- **Diseño Minimalista:** Interfaz limpia estilo Apple con espacios generosos y tipografía clara
- **Inteligencia Asistida:** Sistema AURA con OCR para facturas y motor de alertas inteligentes
- **Arquitectura Guiada:** Plantillas de proyecto con estructura predefinida

## 👥 Roles y Accesos

### Director (Admin)
- **Usuario:** `director` / **Contraseña:** `director123`
- Dashboard con vista general de todas las obras
- Gestión de línea de tiempo de hitos
- Archivo central de documentos
- Control total del sistema

### Contador (Finance)
- **Usuario:** `contador` / **Contraseña:** `contador123`
- Dashboard financiero
- Registro de gastos con IA-OCR
- Gestión de facturas y remitos
- Vista de transacciones

### Capataz (Field Worker)
- **Usuario:** `capataz` / **Contraseña:** `capataz123`
- Interfaz móvil optimizada
- Parte diario simplificado
- Registro de asistencia de personal
- Captura de evidencias fotográficas

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000` y te redirigirá automáticamente al login.

## 📱 Estructura de la Aplicación

```
sgio-app/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.tsx       # Header con navegación por rol
│   │   ├── KPICard.tsx      # Tarjeta de métricas
│   │   ├── ProgressBar.tsx  # Barra de progreso
│   │   ├── Badge.tsx        # Etiquetas/badges
│   │   ├── Button.tsx       # Botones con variantes
│   │   ├── EmptyState.tsx   # Estado vacío
│   │   └── LoadingSpinner.tsx # Spinner de carga
│   ├── login/               # Página de inicio de sesión
│   ├── director/            # Interfaz del Director
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── obra/[id]/       # Detalle de obra con línea de tiempo
│   │   ├── archivo/         # Archivo Central (3 paneles)
│   │   └── costos/          # Gestión de Costos detallada
│   ├── contador/            # Interfaz del Contador
│   │   └── dashboard/       # Dashboard financiero
│   └── capataz/             # Interfaz del Capataz
│       └── parte-diario/    # Registro diario móvil
```

## 🎨 Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Arquitectura:** Responsive Web App (adaptable a todos los dispositivos)

## 📊 Módulos Implementados

### Director
- ✅ Dashboard con tarjetas de obras
- ✅ KPIs de avance y presupuesto
- ✅ Centro de notificaciones con alertas
- ✅ Línea de tiempo de hitos interactiva
- ✅ Gestión de tareas del día
- ✅ Vista de documentos y costos por hito
- ✅ **Archivo Central completo** con navegación en 3 paneles
- ✅ **Gestión de Costos detallada** con partidas y transacciones
- ✅ Control de versiones automático de documentos

### Contador
- ✅ Dashboard con facturas pendientes
- ✅ Registro de gastos con simulación de IA-OCR
- ✅ Últimas transacciones
- ✅ Resumen mensual
- ✅ Asignación de gastos a obras y partidas

### Capataz
- ✅ Interfaz mobile-first
- ✅ Registro de asistencia de personal
- ✅ Tareas del día con estados
- ✅ Captura de evidencias fotográficas
- ✅ Envío de parte diario

### Componentes Reutilizables
- ✅ Header con navegación
- ✅ KPICard para métricas
- ✅ ProgressBar con colores automáticos
- ✅ Badge para etiquetas
- ✅ Button con variantes
- ✅ EmptyState para estados vacíos
- ✅ LoadingSpinner para carga

## �️ Fases de Construcción Residencial

El sistema gestiona las 11 fases típicas de una construcción de vivienda unifamiliar:

1. **Replanteo y Excavación** - Demarcación del terreno y movimiento de suelos
2. **Cimientos y Fundación** - Zapatas, vigas de fundación y losa de base
3. **Estructura y Mampostería** - Columnas, vigas y levantamiento de muros
4. **Cubierta de Techo** - Estructura de techo, membrana y tejas
5. **Instalación Eléctrica** - Cableado, tablero y puntos de luz
6. **Instalación Sanitaria** - Cañerías de agua, desagües y cloacas
7. **Revoques y Revestimientos** - Revoque grueso, fino y cerámicos
8. **Carpintería y Aberturas** - Puertas, ventanas y marcos
9. **Pintura y Terminaciones** - Pintura interior/exterior y detalles finales
10. **Instalación de Pisos** - Colocación de pisos y zócalos
11. **Limpieza Final y Entrega** - Limpieza profunda y lista de pendientes

## 💰 Partidas Presupuestarias

El sistema gestiona 17 categorías de costos específicas para construcción residencial:

**Materiales:**
- Hierro y Acero
- Cemento y Áridos
- Ladrillos y Bloques
- Madera para Encofrado
- Aberturas (puertas y ventanas)
- Instalaciones Eléctricas
- Instalaciones Sanitarias
- Pisos y Revestimientos
- Pintura y Terminaciones

**Mano de Obra:**
- Oficial Albañil
- Ayudantes
- Electricista Matriculado
- Plomero Gasista
- Carpintero

**Otros:**
- Equipamiento y Herramientas
- Logística y Transporte

## �🎯 Flujos de Trabajo

### Director
1. Login → Dashboard con vista general
2. Seleccionar obra → Ver línea de tiempo de hitos
3. Expandir hito → Gestionar progreso, documentos y costos
4. Definir tareas del día para el capataz
5. **Archivo Central** → Navegar carpetas, subir documentos, ver versiones
6. **Gestión de Costos** → Ver resumen, partidas y transacciones detalladas

### Contador
1. Login → Dashboard financiero
2. Registrar nuevo gasto → Subir factura
3. Sistema extrae datos automáticamente (simulado)
4. Asignar a obra, hito y partida
5. Guardar transacción

### Capataz
1. Login desde móvil → Vista de parte diario
2. Registrar asistencia de personal (toggles)
3. Actualizar estado de tareas (No iniciado/En progreso/Finalizado)
4. Capturar foto de evidencia al finalizar tarea
5. Enviar parte diario completo

## 🎨 Guía de Diseño

### Paleta de Colores por Rol
- **Director:** Azul (`blue-600`) - Autoridad y confianza
- **Contador:** Verde (`green-600`) - Finanzas y crecimiento
- **Capataz:** Naranja (`orange-600`) - Acción y trabajo de campo

### Principios de UI/UX
- Espaciado generoso (padding y margins amplios)
- Bordes redondeados suaves (`rounded-xl`, `rounded-2xl`)
- Sombras sutiles para profundidad
- Transiciones suaves en interacciones
- Feedback visual inmediato
- Tipografía clara y jerarquizada

## 📝 Notas de Implementación

Esta es una **demostración funcional** del sistema SGIO especializado en **construcción de viviendas unifamiliares**. Incluye:

- ✅ Interfaces completas para los 3 roles
- ✅ 11 fases de construcción residencial
- ✅ 17 partidas presupuestarias específicas
- ✅ Navegación y flujos de trabajo
- ✅ Datos de ejemplo realistas de construcción de casas (mock data)
- ✅ Simulación de funcionalidades de IA
- ⚠️ Sin backend real (próxima fase)
- ⚠️ Autenticación simulada con localStorage
- ⚠️ Sin persistencia de datos

## 💡 Ejemplos de Uso

### Proyectos de Ejemplo
El sistema incluye datos de muestra para tres proyectos residenciales:
- **Casa Familia López** - Barrio Los Robles (130m², 2 dormitorios)
- **Casa Familia Fernández** - Country Club (180m², 3 dormitorios)
- **Casa Familia Martínez** - Zona Norte (220m², 4 dormitorios)

### Presupuesto Típico
Una casa de 150m² puede tener un presupuesto de ejemplo de $441,000 ARS distribuido en:
- Materiales (60%): Cemento, hierro, ladrillos, aberturas, etc.
- Mano de Obra (30%): Oficial, ayudantes, especialistas
- Equipamiento y Logística (10%): Alquiler, transporte

## 🔜 Próximos Pasos

Para convertir esto en una aplicación completa de producción:

1. **Backend:** Implementar API con Node.js/Express o usar servicios como Supabase
2. **Base de Datos:** PostgreSQL para datos estructurados
3. **Autenticación:** NextAuth.js o Auth0
4. **Storage:** S3 o similar para documentos y fotos
5. **IA Real:** Integrar OCR (Tesseract.js, Google Vision API)
6. **PWA:** Configurar service workers y manifest
7. **Testing:** Jest y React Testing Library
8. **Deploy:** Vercel o similar

---

Desarrollado con ❤️ usando Next.js 14 y Tailwind CSS
