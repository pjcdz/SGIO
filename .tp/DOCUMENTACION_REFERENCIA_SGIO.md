# 📚 DOCUMENTACIÓN DE REFERENCIA - SGIO

**Sistema:** SGIO - Sistema de Gestión Integral de Obras  
**Empresa:** Construcciones Cardozo & Asociados  
**Grupo:** 5  
**Fecha:** Octubre 2025  
**Versión:** 2.0

---

## 📋 ÍNDICE

1. [Guía de Coherencia entre Partes del TP](#guía-de-coherencia)
2. [Especificación Técnica Completa](#especificación-técnica)
3. [Quick Reference](#quick-reference)

---

## 🎯 GUÍA DE COHERENCIA ENTRE PARTES DEL TP

Esta sección documenta cómo mantener coherencia entre las Partes 1, 2 y 3 del Trabajo Práctico.

### Conceptos Clave a Verificar

| Concepto | Valor Correcto | Fuente de Verdad |
|----------|----------------|------------------|
| **Hitos Constructivos** | **23 hitos detallados** | Entrevista real (9-sep-2024) |
| **Obras Simultáneas** | **6-7 obras en paralelo** | Declaración del arquitecto/director |
| **Estructura Empresa** | **Empresa familiar** | Contexto entrevista |
| **Partidas Presupuestarias** | **17 partidas** | Estándar del rubro |
| **Templates Documentales** | **24 templates** | Requerimiento funcional |
| **Roles del Sistema** | **3 roles** (Director, Contador, Capataz) | Estructura organizacional |
| **Especialización** | **Solo viviendas unifamiliares** 50-300m² | Core business |

---

### Checklist de Coherencia Parte 1 (Introducción)

- [ ] ✅ Sistema para **una empresa específica** (no producto comercial)
- [ ] ✅ Especialización en **viviendas unifamiliares** únicamente
- [ ] ✅ Mencionar explícitamente los **3 roles** (Director, Contador, Capataz)
- [ ] ✅ Detallar los **23 hitos constructivos**
- [ ] ✅ Listar las **17 partidas presupuestarias**
- [ ] ✅ Enumerar los **24 templates** de documentos
- [ ] ✅ Estadísticas del problema (80% usa papel, 65% excede presupuesto)
- [ ] ✅ Aclarar estado actual: **MVP con localStorage** (sin backend real)
- [ ] ✅ Separar features por versión (v0.1 vs v1.0 vs v1.5 vs v2.0)
- [ ] ✅ Especificar exclusiones (NO contabilidad, NO RR.HH., NO CAD)

---

### Checklist de Coherencia Parte 2 (Análisis)

- [ ] ✅ Los **9 stakeholders** identificados correctamente
- [ ] ✅ Los **5 Requerimientos de Negocio** (RN-001 a RN-005)
- [ ] ✅ Los **23 Requerimientos Funcionales** listados
- [ ] ✅ Los **8 Requerimientos No Funcionales** con métricas
- [ ] ✅ Los **18 Casos de Uso** con naming CU-XXX-###
- [ ] ✅ Las **5 Limitaciones** actuales (L-001 a L-005)
- [ ] ✅ Las **6 Exclusiones** de alcance (E-001 a E-006)

---

### Tabla de Alineación entre Partes

| Concepto | Parte 1 (Intro) | Parte 2 (Análisis) | Parte 3 (Especificación) |
|----------|-----------------|--------------------|--------------------------| 
| **Especialización** | Viviendas unifamiliares | 23 hitos + 17 partidas | RF-DIR-002, RF-DIR-004, RN-004 |
| **Roles** | 3 roles mencionados | 3 actores principales | 18 CU distribuidos en 3 módulos |
| **Templates** | "Documentación predefinida" | 24 templates listados | RF-DIR-003, HU-DIR-006 |
| **IA** | "Inteligencia Artificial" | OCR + Sugerencias | RF-IA-001 a RF-IA-006 |
| **Estado** | MVP funcional | Limitaciones L-001 a L-005 | Estado por RF/HU |
| **Exclusiones** | Mencionadas | E-001 a E-006 listadas | Sección 3.1.5 |
| **Roadmap** | v1.0, v1.5, v2.0 | Priorización por versión | Estado de cada RF/HU |

---

## 🔧 ESPECIFICACIÓN TÉCNICA COMPLETA

### Contexto del Proyecto

**SGIO** es un **sistema interno** desarrollado específicamente para **Construcciones Cardozo & Asociados**, empresa constructora familiar de Salta, Argentina (fundada en 2021).

**Características de la Empresa:**
- Especialización: Viviendas unifamiliares de 50-300m²
- Capacidad: 6-7 obras simultáneas
- Estructura: Empresa familiar
- Ubicación: Salta Capital, Argentina

**Naturaleza del Sistema:**
- ❌ NO es un producto comercial para venta
- ✅ ES un sistema interno para optimizar operaciones
- ✅ Caso de estudio académico (TP de Sistemas de Información II)

---

### 1. STAKEHOLDERS (9 identificados)

| # | Stakeholder | Tipo | Rol/Interés | Influencia | Uso |
|---|-------------|------|-------------|------------|-----|
| 1 | **Director de Obra** | Interno | Control estratégico total | ALTA | DIARIO |
| 2 | **Contador/Administrador** | Interno | Gestión financiera | ALTA | DIARIO |
| 3 | **Capataz de Obra** | Interno | Coordinación en campo | ALTA | DIARIO |
| 4 | **Propietario del Inmueble** | Cliente | Seguimiento de su inversión | MEDIA | SEMANAL |
| 5 | **Proveedores** | Externo | Facturación y entregas | BAJA | OCASIONAL |
| 6 | **Trabajadores/Operarios** | Interno | Registrados en partes | BAJA | INDIRECTO |
| 7 | **Inspectores Municipales** | Regulador | Auditoría documental | MEDIA | OCASIONAL |
| 8 | **Arquitecto/Ingeniero** | Técnico | Responsables técnicos | MEDIA | OCASIONAL |
| 9 | **Equipo Desarrollo SGIO** | Interno | Implementación/soporte | ALTA | CONTINUO |

---

### 2. REQUERIMIENTOS DE NEGOCIO (5)

#### RN-001: Digitalización de Procesos
- **Meta:** 95% de transacciones digitalizadas
- **ROI:** $500/mes en papel + $2,000/mes en tiempo

#### RN-002: Reducción de Tiempos Operativos  
- **Meta:** Reducir 85 min/día en tareas administrativas
- **ROI:** $4,000/mes ahorrados

#### RN-003: Control Presupuestario en Tiempo Real
- **Meta:** Desviación presupuestaria <5%
- **ROI:** $5,000-7,500 por obra

#### RN-004: Especialización en Viviendas Unifamiliares
- **Entregables:** 23 hitos + 17 partidas + 24 templates
- **Ventaja:** Onboarding <5 min vs 3-6 meses ERPs

#### RN-005: Facilidad de Uso Superior
- **Meta:** "Más fácil que lápiz y papel"
- **KPI:** Onboarding <5 min, adopción >90%

---

### 3. LOS 23 HITOS CONSTRUCTIVOS

Basados en la entrevista real del 9 de septiembre de 2024:

1. Preparación del terreno
2. Replanteo
3. Excavación de cimientos
4. Armaduras de hierro
5. Hormigonado de cimientos
6. Levantamiento de columnas
7. Mampostería
8. Vigas/encadenados
9. Losa
10. Cubierta/impermeabilización
11. Instalaciones sanitarias
12. Instalación eléctrica
13. Instalación de gas
14. Revoques
15. Aberturas
16. Pisos y revestimientos
17. Pintura
18. Artefactos y griferías
19. Terminaciones eléctricas
20. Muebles de cocina/placares/mesadas
21. Limpieza fina y exteriores
22. Documentación y habilitaciones
23. Cierre y comercialización

---

### 4. LAS 17 PARTIDAS PRESUPUESTARIAS

**Materiales (5):**
1. Hierro y Acero
2. Cemento y Áridos
3. Ladrillos y Bloques
4. Madera
5. Aberturas (puertas, ventanas)

**Instalaciones (2):**
6. Instalación Eléctrica
7. Instalación Sanitaria

**Terminaciones (3):**
8. Pisos y Revestimientos
9. Pintura
10. Cielorrasos

**Mano de Obra (5):**
11. Oficial Albañil
12. Ayudantes
13. Electricista
14. Plomero
15. Carpintero

**Otros (2):**
16. Equipamiento (herramientas, alquileres)
17. Logística y Transporte

---

### 5. LOS 24 TEMPLATES DE DOCUMENTOS

**Permisos y Habilitaciones (6):**
- Permiso Municipal de Construcción
- Habilitación Eléctrica
- Habilitación de Gas
- Habilitación Final de Obra
- Certificado Catastral
- Aprobación de Planos

**Planos y Diseños (7):**
- Plano de Arquitectura
- Plano de Instalación Eléctrica
- Plano de Instalación Sanitaria
- Plano de Gas
- Plano Estructural
- Plano de Carpintería
- Plano de Albañilería

**Contratos (3):**
- Contrato de Obra
- Contrato con Proveedor
- Contrato de Servicio

**Documentos Operativos (8):**
- Facturas
- Remitos
- Presupuestos
- Órdenes de Compra
- Partes Diarios
- Actas de Obra
- Certificados de Avance
- Fotos de Progreso

---

### 6. REQUERIMIENTOS FUNCIONALES (23)

#### Módulo Sistema (3 RF)
- **RF-SIS-001:** Autenticación por roles ✅
- **RF-SIS-002:** Persistencia de estado ⚠️
- **RF-SIS-003:** Validaciones proactivas ❌

#### Módulo Director (5 RF)
- **RF-DIR-001:** Dashboard de obras ✅ 95%
- **RF-DIR-002:** Línea de tiempo (23 hitos) ⚠️ 75%
- **RF-DIR-003:** Archivo Central (24 templates) ✅ 100%
- **RF-DIR-004:** Gestión de costos (17 partidas) ⚠️ 70%
- **RF-DIR-005:** Gestión de tareas ❌

#### Módulo Contador (3 RF)
- **RF-CON-001:** Dashboard financiero ✅ 70%
- **RF-CON-002:** Registro de gastos ⚠️ 60%
- **RF-CON-003:** OCR de facturas (IA) ⏳ v1.0

#### Módulo Capataz (3 RF)
- **RF-CAP-001:** Parte diario mobile ⚠️ 85%
- **RF-CAP-002:** Registro de asistencia ✅ 100%
- **RF-CAP-003:** Evidencias fotográficas ✅ 90%

#### Módulo IA (6 RF - Futuro)
- **RF-IA-001:** OCR de facturas ⏳ v1.0
- **RF-IA-002:** Sugerencias de tareas ⏳ v1.0
- **RF-IA-003:** Detección de partida ⏳ v1.0
- **RF-IA-004:** Búsqueda semántica ⏳ v1.5
- **RF-IA-005:** Predicción de retrasos ⏳ v1.5
- **RF-IA-006:** Chatbot AURA ⏳ v1.5

#### Módulo Propietario (3 RF - Futuro)
- **RF-PRO-001:** Dashboard cliente ⏳ v1.5
- **RF-PRO-002:** Notificaciones ⏳ v1.5
- **RF-PRO-003:** Solicitudes/consultas ⏳ v2.0

---

### 7. REQUERIMIENTOS NO FUNCIONALES (8)

| ID | Requerimiento | Métrica | Prioridad |
|----|---------------|---------|-----------|
| RNF-001 | Performance | First Load <2s, TTI <3s | CRÍTICA |
| RNF-002 | Usabilidad | Onboarding <5 min | CRÍTICA |
| RNF-003 | Compatibilidad | Chrome 90+, Safari 15+ | ALTA |
| RNF-004 | Seguridad | NextAuth + RBAC | ALTA |
| RNF-005 | Disponibilidad | 99% uptime | MEDIA |
| RNF-006 | Escalabilidad | 50 usuarios, 500 obras | MEDIA |
| RNF-007 | Mantenibilidad | Code coverage >80% | MEDIA |
| RNF-008 | Accesibilidad | WCAG 2.1 AA | BAJA |

---

### 8. LIMITACIONES ACTUALES (v0.1)

- **L-001:** Sin backend real (localStorage)
- **L-002:** Sin autenticación real (mock)
- **L-003:** Sin IA real (simulada)
- **L-004:** Sin colaboración multi-usuario
- **L-005:** Datos de demostración (mock)

---

### 9. EXCLUSIONES DE ALCANCE

- **E-001:** NO es sistema contable completo
- **E-002:** NO incluye gestión de RR.HH. completa
- **E-003:** NO es software de diseño (CAD)
- **E-004:** NO incluye gestión de proveedores compleja
- **E-005:** NO se expande a otros tipos de obra
- **E-006:** NO es producto para comercialización

---

### 10. ROADMAP DE VERSIONES

| Versión | Fecha | Características Principales |
|---------|-------|----------------------------|
| **v0.1 (MVP)** | ✅ Sep 2025 | Frontend completo, localStorage, auth mock |
| **v1.0 (Release)** | Q4 2025 | Backend PostgreSQL, NextAuth, OCR básico |
| **v1.5 (Mejoras)** | Q1 2026 | IA avanzada, búsqueda semántica, PWA |
| **v2.0 (Futuro)** | Q3 2026 | Predicción ML, portal propietarios |

---

## 🚀 QUICK REFERENCE

### Datos Clave para el TP

```
EMPRESA: Construcciones Cardozo & Asociados
FUNDACIÓN: 2021
UBICACIÓN: Salta Capital, Argentina
ESPECIALIZACIÓN: Viviendas unifamiliares 50-300m²
CAPACIDAD: 6-7 obras simultáneas
ESTRUCTURA: Empresa familiar

SISTEMA: SGIO (Sistema de Gestión Integral de Obras)
NATURALEZA: Sistema interno (NO producto comercial)
TECNOLOGÍA: Next.js 15, TypeScript, Tailwind CSS
ESTADO: v0.1 MVP funcional (85%)

NÚMEROS IMPORTANTES:
- 23 hitos constructivos
- 17 partidas presupuestarias  
- 24 templates documentales
- 3 roles de usuario
- 9 stakeholders
- 5 requerimientos de negocio
- 23 requerimientos funcionales
- 8 requerimientos no funcionales
- 18 casos de uso
- 31 historias de usuario (257 story points)
```

---

### Stack Tecnológico

**Frontend (v0.1 - Actual):**
- Next.js 15.0.3 (App Router)
- React 19 RC
- TypeScript 5.6
- Tailwind CSS 4 alpha
- Lucide React (iconos)
- Radix UI (componentes)

**Backend (v1.0 - Planificado):**
- PostgreSQL 16
- Prisma ORM
- NextAuth.js

**IA (v1.0+ - Planificado):**
- Google Gemini 1.5 Flash
- Langchain

**Infraestructura:**
- Vercel (hosting frontend)
- Supabase (PostgreSQL managed)
- AWS S3 / Cloudinary (archivos)

---

## 📝 NOTAS DE ACTUALIZACIÓN

**Última sincronización:** 2 de octubre de 2025

**Cambios aplicados:**
- ✅ Corregido: 11 fases → 23 hitos constructivos (dato real de entrevista)
- ✅ Corregido: 12-18 obras → 6-7 obras simultáneas (dato real)
- ✅ Corregido: 15 empleados → estructura familiar (dato real)
- ✅ Sincronizados todos los documentos con el TP principal

**Archivos eliminados por obsoletos:**
- ❌ ANALISIS_MEJORAS_INTELIGENTES.md (análisis temporal)
- ❌ IMPLEMENTACION_MEJORAS_PRIORITARIAS.md (guía temporal)
- ❌ CAMBIOS_REALIZADOS_PARTE3.md (log de cambios temporal)
- ❌ RESUMEN_EJECUTIVO_MEJORAS.md (resumen temporal)
- ❌ tp/TPO-IR_1C2025_GrupoN_Empresa_Nombre_de_Sistema_V1.0.md (template vacío)
- ❌ tp/ANALISIS_PARTES_1_Y_2.md (análisis temporal)

**Archivos consolidados:**
- ✅ CORRECCIONES_Y_COHERENCIA_PARTES_1_Y_2.md + PARTE_3_ANALISIS_Y_ESPECIFICACION.md
- ✅ → Este documento: DOCUMENTACION_REFERENCIA_SGIO.md

---

## 📚 ARCHIVOS DEL PROYECTO

**Documentación Principal:**
1. `tp/Sistemas de Información II - Trabajo Practico Integrador - Grupo 5.md` - **TP OFICIAL** (fuente de verdad)
2. `DOCUMENTACION_REFERENCIA_SGIO.md` - **Este documento** (referencia técnica consolidada)

**Código Fuente:**
- `sgio-app/` - Aplicación Next.js completa

**Otros:**
- `sgio-app/README.md` - Instrucciones de desarrollo
- `sgio-app/ROADMAP.md` - Planificación técnica
- `sgio-app/MIGRATION.md` - Guía de migración a PostgreSQL

---

**FIN DEL DOCUMENTO**
