# 🏗️ SGIO - Sistema de Gestión Integral de Obras

**Sistema interno para Construcciones Cardozo & Asociados**  
**Especialización:** Viviendas unifamiliares 50-300m²  
**Ubicación:** Salta Capital, Argentina

---

## 📁 Estructura del Proyecto

```
SGIO/
├── tp/                                    # Trabajo Práctico Académico
│   └── Sistemas de Información II...md   # TP OFICIAL (fuente de verdad)
│
├── sgio-app/                              # Aplicación Next.js
│   ├── app/                               # App Router (páginas y componentes)
│   ├── components/                        # Componentes UI reutilizables
│   ├── lib/                               # Utilidades y hooks
│   ├── README.md                          # Instrucciones de desarrollo
│   ├── ROADMAP.md                         # Planificación técnica
│   └── MIGRATION.md                       # Guía migración a PostgreSQL
│
├── DOCUMENTACION_REFERENCIA_SGIO.md       # Documentación técnica consolidada
└── README.md                              # Este archivo
```

---

## 📚 Documentación

### Documentos Principales

1. **TP Oficial** (`tp/Sistemas de Información II...md`)
   - Trabajo Práctico completo para la universidad
   - Incluye Partes 1, 2 y 3
   - **Fuente de verdad** para todos los datos del proyecto

2. **Documentación de Referencia** (`DOCUMENTACION_REFERENCIA_SGIO.md`)
   - Guía técnica consolidada
   - Quick reference de datos clave
   - Checklist de coherencia entre partes del TP
   - Especificaciones técnicas completas

3. **README de la App** (`sgio-app/README.md`)
   - Instrucciones de instalación y desarrollo
   - Scripts disponibles
   - Estructura de carpetas

---

## 🎯 Datos Clave del Sistema

### La Empresa
- **Nombre:** Construcciones Cardozo & Asociados
- **Fundación:** 2021
- **Ubicación:** Salta Capital, Argentina
- **Especialización:** Viviendas unifamiliares 50-300m²
- **Capacidad:** 6-7 obras simultáneas
- **Estructura:** Empresa familiar

### El Sistema
- **Naturaleza:** Sistema interno (NO producto comercial)
- **Estado:** v0.1 MVP funcional (85%)
- **Tecnología:** Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend:** localStorage (temporal) → PostgreSQL (v1.0)

### Números Importantes
- ✅ **23 hitos constructivos** (de la entrevista real)
- ✅ **17 partidas presupuestarias**
- ✅ **24 templates de documentos**
- ✅ **3 roles de usuario** (Director, Contador, Capataz)
- ✅ **6-7 obras simultáneas** (capacidad real de la empresa)

---

## 🚀 Quick Start

### Desarrollo Local

```bash
# Ir a la carpeta de la app
cd sgio-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

### Usuarios de Prueba

```
Director:
- Email: director@construcciones.com
- Password: cualquier contraseña (auth mock)

Contador:
- Email: contador@construcciones.com  
- Password: cualquier contraseña

Capataz:
- Email: capataz@construcciones.com
- Password: cualquier contraseña
```

---

## 📊 Estado de Implementación

### ✅ Completado (v0.1 MVP)

- ✅ Autenticación mock por roles
- ✅ Dashboard Director (95%)
- ✅ Archivo Central con 24 templates (100%)
- ✅ Parte Diario Capataz mobile-first (85%)
- ✅ Registro de asistencia (100%)
- ✅ Captura de fotos (90%)
- ✅ Diseño responsive
- ✅ Persistencia en localStorage

### ⏳ En Desarrollo (v1.0)

- ⏳ Backend con PostgreSQL
- ⏳ Autenticación real (NextAuth)
- ⏳ OCR de facturas con IA
- ⏳ Sugerencias inteligentes
- ⏳ PWA con modo offline

### 🔮 Futuro (v1.5 - v2.0)

- 🔮 Búsqueda semántica de documentos
- 🔮 Chatbot conversacional AURA
- 🔮 Predicción de sobrecostos con ML
- 🔮 Portal para propietarios

---

## 🛠️ Stack Tecnológico

### Frontend (Actual)
- **Framework:** Next.js 15.0.3 (App Router)
- **UI Library:** React 19 RC
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 4 (alpha)
- **Icons:** Lucide React
- **Components:** Radix UI

### Backend (Planificado v1.0)
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **API:** Next.js API Routes

### IA (Planificado v1.0+)
- **LLM:** Google Gemini 1.5 Flash
- **Orchestration:** Langchain

### Infraestructura
- **Hosting:** Vercel
- **Database:** Supabase (PostgreSQL managed)
- **Storage:** AWS S3 / Cloudinary
- **Analytics:** Vercel Analytics

---

## 📋 Roadmap

| Versión | Fecha Estimada | Estado |
|---------|----------------|--------|
| **v0.1 (MVP)** | Sep 2025 | ✅ Completado |
| **v1.0 (Release)** | Q4 2025 | 🔄 En progreso |
| **v1.5 (Mejoras)** | Q1 2026 | 📅 Planificado |
| **v2.0 (Futuro)** | Q3 2026 | 💭 Conceptual |

Ver detalles completos en `sgio-app/ROADMAP.md`

---

## 👥 Equipo

**Grupo 5 - Sistemas de Información II**  
Universidad Argentina de la Empresa (UADE)

---

## 📄 Licencia

Proyecto académico - Uso educativo  
© 2025 - Construcciones Cardozo & Asociados

---

## 📞 Contacto

Para consultas sobre el proyecto:
- 📧 Ver documentación en `tp/` para información académica
- 💻 Ver `sgio-app/README.md` para información técnica

---

**Última actualización:** Octubre 2025
