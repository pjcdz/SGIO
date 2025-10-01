# PARTE 3: ANÁLISIS Y ESPECIFICACIÓN

**Trabajo Práctico Obligatorio - Ingeniería de Requerimientos**  
**Sistema:** SGIO - Sistema de Gestión Integral de Obras  
**Grupo:** 5  
**Fecha:** Octubre 2025

---

## 3.1 ALCANCE DE LA SOLUCIÓN

### 3.1.1 Stakeholders

| Stakeholder | Rol | Interés en el Sistema | Influencia |
|-------------|-----|----------------------|------------|
| **Director de Obra** | Usuario Principal | Control total de la obra, toma de decisiones estratégicas | Alta |
| **Contador/Administrador** | Usuario Principal | Gestión financiera, control de gastos y presupuestos | Alta |
| **Capataz de Obra** | Usuario Principal | Coordinación diaria del trabajo en campo | Alta |
| **Propietario del Inmueble** | Cliente Final | Seguimiento del avance de su obra | Media |
| **Proveedores** | Externos | Facturación y entregas de materiales | Baja |
| **Trabajadores/Operarios** | Indirectos | Registrados en partes diarios | Baja |
| **Inspectores Municipales** | Externos | Auditoría de documentación y permisos | Media |
| **Arquitecto/Ingeniero** | Externos | Responsables técnicos del proyecto | Media |
| **Equipo de Desarrollo SGIO** | Proveedor | Implementación y mantenimiento del sistema | Alta |

### 3.1.2 Requerimientos de Negocio

#### RN-001: Digitalización de Procesos
**Descripción:** Eliminar el uso de papel y planillas Excel en la gestión de obras de construcción de viviendas unifamiliares.

**Justificación:** Actualmente el 80% de las empresas constructoras pequeñas y medianas utilizan métodos manuales, lo que genera:
- Pérdida de información crítica
- Duplicación de trabajo
- Falta de trazabilidad
- Errores en presupuestos (hasta 30% de desvío)

**Indicadores de Éxito:**
- Reducción del 90% en uso de papel
- 95% de transacciones digitalizadas
- 100% de documentos almacenados en sistema

#### RN-002: Reducción de Tiempos Operativos
**Descripción:** Automatizar tareas repetitivas y reducir tiempo de gestión administrativa.

**Objetivo Cuantificable:**
- Reducir 60 minutos/día en registro de partes diarios
- Reducir 80% tiempo de carga de facturas (de 10 min a 2 min con IA)
- Búsqueda de documentos en <30 segundos vs 15 minutos manual

#### RN-003: Control Presupuestario en Tiempo Real
**Descripción:** Visibilidad inmediata del estado financiero de cada obra para prevenir sobrecostos.

**Justificación:** El 65% de las obras residenciales exceden el presupuesto inicial en un 15-25% por falta de control.

**Meta:** Mantener desviación presupuestaria <5%

#### RN-004: Especialización en Viviendas Unifamiliares
**Descripción:** El sistema debe estar optimizado exclusivamente para construcción de casas residenciales, no obras civiles grandes.

**Alcance:**
- 11 fases típicas de construcción residencial
- 17 partidas presupuestarias del rubro
- Templates específicos de documentación

#### RN-005: Facilidad de Uso Superior
**Descripción:** El sistema debe ser más fácil y rápido que lápiz y papel.

**Filosofía:** "Claridad Proactiva"
- Interfaz minimalista
- Pre-llenado automático de datos
- Validaciones proactivas
- Sin curva de aprendizaje (onboarding <5 minutos)

### 3.1.3 Requerimientos Funcionales

#### **MÓDULO: SISTEMA**

##### RF-SIS-001: Autenticación por Roles
**Prioridad:** Crítica  
**Descripción:** El sistema debe permitir login diferenciado para 3 roles: Director, Contador y Capataz.

**Criterios de Aceptación:**
- Login con usuario y contraseña
- Redirección automática al dashboard según rol
- Sesión persistente en localStorage
- Logout manual disponible

**Estado:** ✅ Implementado

##### RF-SIS-002: Persistencia de Estado
**Prioridad:** Crítica  
**Descripción:** Todo formulario con datos parciales debe auto-guardarse cada 30 segundos para evitar pérdida de información.

**Criterios de Aceptación:**
- Auto-guardado cada 30 segundos
- Al reabrir formulario, ofrecer recuperar borrador
- Borrador válido por 24 horas
- Aplicable a: Parte diario, Registro de gastos, Agregado de tareas

**Estado:** ⚠️ Parcial (solo Capataz implementado)

##### RF-SIS-003: Validaciones Proactivas
**Prioridad:** Crítica  
**Descripción:** Los formularios deben validar datos en tiempo real y prevenir envíos incompletos.

**Criterios de Aceptación:**
- Campos obligatorios marcados con (*)
- Validación en tiempo real con mensajes claros
- Botón de envío deshabilitado si falta info crítica
- Resumen de errores al intentar enviar

**Estado:** ❌ No implementado

#### **MÓDULO: DIRECTOR**

##### RF-DIR-001: Dashboard de Obras
**Prioridad:** Crítica  
**Descripción:** Vista general de todas las obras activas con indicadores clave de desempeño.

**Criterios de Aceptación:**
- Tarjetas de obras con: nombre, ubicación, avance (%), presupuesto usado (%)
- Indicador de estado: "En tiempo" (verde), "En riesgo" (amarillo), "Atrasado" (rojo)
- KPIs globales: Total obras activas, Presupuesto total, Hitos en progreso
- Centro de notificaciones con alertas priorizadas
- Click en obra lleva al detalle

**Estado:** ✅ Implementado (95%)

##### RF-DIR-002: Línea de Tiempo de Hitos
**Prioridad:** Crítica  
**Descripción:** Visualización de las 11 fases de construcción de la obra con progreso de cada una.

**Criterios de Aceptación:**
- Lista de 11 hitos predefinidos con fechas inicio/fin
- Barra de progreso visual (0-100%)
- Estados: Completado, En progreso, Pendiente
- Expandir hito muestra: progreso detallado, tareas, presupuesto
- Actualizar avance manualmente

**Estado:** ✅ Implementado (75%)

##### RF-DIR-003: Archivo Central con Templates
**Prioridad:** Crítica  
**Descripción:** Repositorio de documentos organizado en carpetas con 24 templates predefinidos para construcción de viviendas.

**Criterios de Aceptación:**
- Estructura de carpetas: Planos, Permisos, Contratos, Facturas, Remitos, Fotos
- 24 templates predefinidos con formularios:
  - 6 Permisos y Habilitaciones
  - 7 Planos y Diseños
  - 3 Contratos
- Al subir documento, elegir: Completar formulario o Subir archivo existente
- Sistema de versionado automático (v1, v2, v3...)
- Búsqueda por nombre de documento
- Vista previa de PDFs e imágenes

**Estado:** ✅ Implementado (100%)

##### RF-DIR-004: Gestión de Costos
**Prioridad:** Crítica  
**Descripción:** Control de presupuesto por partida con visualización de gastos, comprometidos y disponibles.

**Criterios de Aceptación:**
- Vista de resumen con KPIs: Presupuesto total, Gastado, Disponible, % Uso
- Lista de 17 partidas presupuestarias con indicadores:
  - Hierro y Acero, Cemento, Ladrillos, Madera, Aberturas
  - Instalaciones (Eléctrica, Sanitaria), Pisos, Pintura
  - Mano de Obra (Oficial, Ayudantes, Electricista, Plomero, Carpintero)
  - Equipamiento, Logística
- Cada partida muestra: Presupuestado, Gastado, Comprometido, Disponible
- Filtros por categoría: Materiales, Mano de Obra, Otros
- Tab de transacciones con historial de gastos

**Estado:** ✅ Implementado (70%)

##### RF-DIR-005: Gestión de Tareas por Hito
**Prioridad:** Alta  
**Descripción:** Agregar tareas específicas a cada hito para asignar al capataz.

**Criterios de Aceptación:**
- Botón "Agregar tarea" en cada hito
- Modal con campo de texto para descripción de tarea
- Opción: Sugerir tareas con IA (RF-IA-002)
- Tareas aparecen en parte diario del capataz
- Marcar tarea como completada actualiza progreso del hito

**Estado:** ❌ No implementado (UI presente, lógica pendiente)

#### **MÓDULO: CONTADOR**

##### RF-CON-001: Dashboard Financiero
**Prioridad:** Crítica  
**Descripción:** Vista de facturas pendientes de procesar y últimas transacciones registradas.

**Criterios de Aceptación:**
- KPIs: Total facturado mes, Gastos del mes, Balance
- Lista de facturas pendientes con prioridad (alta/media/baja)
- Últimas 10 transacciones con: fecha, proveedor, monto, obra, partida
- Botón "Registrar nuevo gasto"

**Estado:** ✅ Implementado (70%)

##### RF-CON-002: Registro Manual de Gastos
**Prioridad:** Crítica  
**Descripción:** Formulario para cargar gastos manualmente con asignación a obra y partida.

**Criterios de Aceptación:**
- Campos: Descripción, Monto, Proveedor, Fecha, Método de pago
- Selector de Obra (dropdown)
- Selector de Hito (opcional)
- Selector de Partida (17 opciones)
- Subir foto/PDF de factura
- Validación: Obra y Partida son obligatorios

**Estado:** ⚠️ Implementado (60% - sin validaciones)

##### RF-CON-003: Procesamiento de Facturas con OCR
**Prioridad:** Alta  
**Descripción:** Extraer automáticamente datos de facturas usando IA (Gemini 1.5 Flash).

**Criterios de Aceptación:**
- Subir imagen o PDF de factura
- Sistema extrae: Proveedor, CUIT, N° factura, Fecha, Monto, Items
- Pre-llena formulario con datos extraídos
- Usuario verifica y corrige si necesario
- Fallback: Si OCR falla, permitir carga manual
- Tiempo de procesamiento: <5 segundos

**Estado:** ⏳ Planificado (Fase v1.0)

#### **MÓDULO: CAPATAZ**

##### RF-CAP-001: Parte Diario Digital
**Prioridad:** Crítica  
**Descripción:** Registro diario de asistencia de personal y estado de tareas del día.

**Criterios de Aceptación:**
- Interfaz mobile-first (optimizada para smartphone)
- Fecha actual destacada
- Lista de trabajadores con toggle "Presente/Ausente"
- Lista de tareas del día con 3 estados: No iniciado, En progreso, Finalizado
- Campo de notas/observaciones (opcional)
- Indicadores climáticos: Clima (iconos), Temperatura (°C)
- Botón "Enviar parte diario" al finalizar

**Estado:** ✅ Implementado (85%)

##### RF-CAP-002: Registro de Asistencia
**Prioridad:** Crítica  
**Descripción:** Marcar trabajadores presentes/ausentes con toggles.

**Criterios de Aceptación:**
- Lista de 5-10 trabajadores predefinidos
- Toggle visual grande para marcar presente
- Pre-marcar trabajadores que vinieron ayer (sugerencia inteligente)
- Contador: "X de Y presentes"

**Estado:** ✅ Implementado (100%)

##### RF-CAP-003: Captura de Evidencias Fotográficas
**Prioridad:** Alta  
**Descripción:** Tomar foto al completar una tarea como evidencia del trabajo realizado.

**Criterios de Aceptación:**
- Botón "Capturar foto" al marcar tarea como "Finalizada"
- Acceso a cámara del dispositivo
- Preview de foto antes de guardar
- Foto asociada a la tarea específica
- Almacenamiento local (futuro: S3)

**Estado:** ✅ Implementado (90%)

#### **MÓDULO: INTELIGENCIA ARTIFICIAL (Futuro)**

##### RF-IA-001: OCR de Facturas
**Prioridad:** Alta  
**Descripción:** Ver RF-CON-003

**Estado:** ⏳ Planificado (v1.0)

##### RF-IA-002: Sugerencias Inteligentes de Tareas
**Prioridad:** Alta  
**Descripción:** Al expandir un hito, el sistema sugiere 8-10 tareas típicas de esa fase usando IA.

**Criterios de Aceptación:**
- Botón "🤖 Sugerir tareas con IA"
- Sistema envía nombre del hito a Gemini
- Recibe 8 tareas específicas y detalladas
- Tareas pre-seleccionadas con checkboxes
- Usuario puede editar, agregar o quitar tareas
- Click en "Agregar tareas seleccionadas" las guarda

**Ejemplo para "Cimientos y Fundación":**
1. Replanteo de fundaciones con estacas y nivel
2. Excavación de zanjas según plano (60cm profundidad)
3. Compactación de base con pisón mecánico
4. Armado de parrilla de hierro 8mm c/20cm
5. Colocación de cañerías sanitarias previas
6. Vaciado de hormigón H17 para zapatas
7. Curado de hormigón (7 días mínimo)
8. Inspección estructural y aprobación

**Estado:** ⏳ Planificado (v1.0)

##### RF-IA-003: Detección Automática de Partida
**Prioridad:** Media  
**Descripción:** Al registrar un gasto, el sistema sugiere automáticamente la partida según la descripción.

**Criterios de Aceptación:**
- Analizar descripción del gasto con IA
- Sugerir partida más probable
- Ejemplos:
  - "Cemento x 50 bolsas" → "Cemento y Áridos"
  - "Jornal oficial albañil" → "Mano de Obra - Oficial Albañil"
  - "Alquiler mezcladora" → "Equipamiento"
- Usuario puede aceptar o cambiar
- Aprendizaje: Sistema mejora con historial

**Estado:** ⏳ Planificado (v1.0)

##### RF-IA-004: Búsqueda Semántica de Documentos
**Prioridad:** Media  
**Descripción:** Búsqueda inteligente que entiende contexto, no solo palabras exactas.

**Criterios de Aceptación:**
- Barra de búsqueda en Archivo Central
- Ejemplos de búsquedas:
  - "donde está la habilitacion?" → Encuentra "Habilitación Eléctrica", "Habilitación de Gas"
  - "plano de luz" → Encuentra "Plano de Instalación Eléctrica"
  - "permiso del municipio" → Encuentra "Permiso Municipal de Construcción"
- Resultados ordenados por relevancia
- Highlight del término en resultados

**Estado:** ⏳ Planificado (v1.5)

##### RF-IA-005: Predicción de Retrasos
**Prioridad:** Media  
**Descripción:** Analizar avance de hitos y predecir potenciales retrasos.

**Criterios de Aceptación:**
- Ejecutar análisis cada 24 horas
- Calcular avance esperado vs avance real
- Estados:
  - "En tiempo" (verde): Diferencia <5%
  - "En riesgo" (amarillo): Diferencia 5-15%
  - "Atrasado" (rojo): Diferencia >15%
- Estimar días de retraso proyectados
- Generar recomendaciones automáticas:
  - "Aumentar cuadrilla de trabajadores"
  - "Revisar disponibilidad de materiales"
  - "Considerar horas extra"

**Estado:** ⏳ Planificado (v1.5)

##### RF-IA-006: Chatbot Conversacional AURA
**Prioridad:** Baja  
**Descripción:** Asistente de IA que responde consultas sobre la obra.

**Criterios de Aceptación:**
- Botón flotante "🤖 AURA - Asistente IA"
- Chat interface con historial
- Ejemplos de consultas:
  - "¿Cuánto llevamos gastado en Casa López?"
  - "¿Dónde está la habilitación eléctrica?"
  - "¿Vamos atrasados?"
- Respuestas basadas en datos del sistema
- Contexto de todas las obras, documentos, gastos, partes diarios

**Estado:** ⏳ Planificado (v1.5)

### 3.1.4 Requerimientos No Funcionales

#### RNF-001: Usabilidad
**Categoría:** Experiencia de Usuario  
**Descripción:** El sistema debe seguir la filosofía "Claridad Proactiva" con diseño minimalista estilo Apple.

**Criterios Medibles:**
- Onboarding <5 minutos sin capacitación
- Tasa de error de usuario <5%
- Satisfacción del usuario >4.5/5
- Puntuación Nielsen: >8/10

**Implementación:**
- Espaciado generoso (padding 4-8)
- Tipografía clara (16px base)
- Colores por rol (azul/verde/naranja)
- Iconografía consistente (Lucide React)
- Bordes redondeados suaves (rounded-xl)
- Sin curvas de aprendizaje

**Estado:** ✅ Implementado (90%)

#### RNF-002: Performance
**Categoría:** Rendimiento  
**Descripción:** El sistema debe cargar rápido en conexiones 3G/4G.

**Criterios Medibles:**
- Carga inicial <3 segundos (4G)
- Carga inicial <5 segundos (3G)
- Lighthouse Performance >90/100
- Time to Interactive <2 segundos
- Bundle size <200KB (gzipped)

**Estrategias:**
- Lazy loading de componentes
- Code splitting por ruta
- Image optimization (next/image)
- Server-side rendering para páginas estáticas

**Estado:** ⚠️ 85/100 (estimado)

#### RNF-003: Compatibilidad
**Categoría:** Plataformas  
**Descripción:** El sistema debe funcionar en navegadores modernos y dispositivos móviles.

**Soporte:**
- ✅ Chrome 100+ (principal)
- ✅ Edge 100+
- ✅ Firefox 100+
- ✅ Safari 15+
- ✅ Mobile iOS Safari 15+
- ✅ Mobile Chrome Android

**Responsive:**
- Desktop: 1920x1080 (óptimo)
- Tablet: 768x1024 (adaptado)
- Mobile: 375x667 (optimizado para Capataz)

**Estado:** ✅ Implementado

#### RNF-004: Disponibilidad (Futuro)
**Categoría:** Confiabilidad  
**Descripción:** El sistema debe estar disponible 24/7 con mínimo downtime.

**SLA (Service Level Agreement):**
- Uptime: 99.5% mensual (máx 3.6 horas downtime/mes)
- RTO (Recovery Time Objective): 4 horas
- RPO (Recovery Point Objective): 1 hora
- Backup automático: Diario a las 3 AM

**Monitoreo:**
- Health checks cada 1 minuto
- Alertas automáticas si >5xx errors
- Dashboard de status público

**Estado:** ⏳ Planificado (v1.0)

#### RNF-005: Seguridad
**Categoría:** Protección de Datos  
**Descripción:** Proteger información sensible de obras y datos financieros.

**Medidas:**
- Autenticación con contraseñas hasheadas (bcrypt)
- Tokens JWT con expiración 24 horas
- HTTPS obligatorio (TLS 1.3)
- Encriptación de datos sensibles en DB (AES-256)
- Logs de auditoría de acciones críticas
- 2FA opcional para Director

**Cumplimiento:**
- LGPD (Ley General de Protección de Datos - Argentina)
- Política de privacidad clara
- Consentimiento explícito para datos personales

**Estado:** ⏳ Planificado (v1.0)

#### RNF-006: Escalabilidad (Futuro)
**Categoría:** Crecimiento  
**Descripción:** Soportar crecimiento de usuarios y datos sin degradación de performance.

**Capacidad:**
- 1,000 empresas simultáneas
- 10,000 usuarios activos
- 100,000 requests/hora en picos
- 1TB de archivos en storage
- 10 millones de transacciones/año

**Arquitectura:**
- Load balancer (AWS ELB)
- Auto-scaling de instancias
- CDN para archivos estáticos (CloudFront)
- Database read replicas (PostgreSQL)
- Cache distribuido (Redis)

**Estado:** ⏳ Planificado (v2.0)

#### RNF-007: Mantenibilidad
**Categoría:** Calidad de Código  
**Descripción:** Código limpio, documentado y fácil de mantener.

**Prácticas:**
- TypeScript para type safety
- Componentes reutilizables <300 líneas
- Separación de lógica y presentación
- Nombres descriptivos (no x, y, z)
- JSDoc en funciones complejas
- Tests automatizados >80% coverage

**Métricas:**
- Complejidad ciclomática <15 por función
- Duplicación de código <5%
- Índice de mantenibilidad >70/100

**Estado:** ✅ Bueno (75/100)

#### RNF-008: Portabilidad (Futuro)
**Categoría:** Multiplataforma  
**Descripción:** Progressive Web App instalable en dispositivos.

**Características PWA:**
- Manifest.json con iconos y colores
- Service Worker para modo offline
- Instalable en home screen (iOS/Android)
- Push notifications
- Acceso a hardware (cámara, GPS)

**Estado:** ⏳ Planificado (v1.0)

### 3.1.5 Limitaciones y Exclusiones

#### Limitaciones Actuales (MVP - v0.1.0)

**L-001: Sin Backend Real**
- **Descripción:** Datos almacenados en localStorage del navegador
- **Impacto:** No hay persistencia entre dispositivos, no hay colaboración multi-usuario
- **Solución:** Implementar backend en v1.0

**L-002: Sin Autenticación Robusta**
- **Descripción:** Login simulado sin validación de servidor
- **Impacto:** Cualquiera puede acceder con credenciales conocidas
- **Solución:** NextAuth.js en v1.0

**L-003: Sin IA Real**
- **Descripción:** OCR y sugerencias son simulaciones
- **Impacto:** No hay beneficio de automatización real
- **Solución:** Integrar Gemini 1.5 Flash en v1.0

**L-004: Datos Mock Hardcodeados**
- **Descripción:** Obras, hitos, gastos son datos de ejemplo fijos
- **Impacto:** No se pueden crear nuevas obras reales
- **Solución:** CRUD completo en v1.0

**L-005: Sin Modo Offline**
- **Descripción:** Requiere conexión a internet constante
- **Impacto:** Capataz en obra sin señal no puede trabajar
- **Solución:** PWA con Service Worker en v1.0

#### Exclusiones de Alcance

**E-001: Gestión de RR.HH. Completa**
- **Fuera de alcance:** Contratos laborales, nómina, liquidaciones, ART
- **Razón:** Foco en gestión de obra, no administración de personal
- **Alternativa:** Integración futura con software de RR.HH.

**E-002: Contabilidad Completa**
- **Fuera de alcance:** Libro diario, balance, estados contables, impuestos
- **Razón:** SGIO es para gestión de obra, no contabilidad general
- **Alternativa:** Integración con Xero, QuickBooks, AFIP

**E-003: Diseño de Planos**
- **Fuera de alcance:** Editor de planos, CAD, modelado 3D
- **Razón:** Existen herramientas especializadas (AutoCAD, Revit)
- **Alternativa:** Subir planos diseñados externamente

**E-004: Gestión de Proveedores**
- **Fuera de alcance:** Portal de proveedores, licitaciones, comparación de precios
- **Razón:** Complejidad no justificada para viviendas unifamiliares
- **Alternativa:** Registro manual de proveedores en facturas

**E-005: Obras Grandes (>500m²)**
- **Fuera de alcance:** Edificios, obras civiles, infraestructura
- **Razón:** Especialización en viviendas unifamiliares (50-300m²)
- **Justificación:** Mercado objetivo es construcción residencial pequeña/mediana

**E-006: Múltiples Idiomas (v1.0)**
- **Fuera de alcance:** Interfaz en inglés, portugués
- **Razón:** Mercado inicial es Argentina (español)
- **Futuro:** Internacionalización en v2.0

---

## 3.2 MODELO DE CASOS DE USO

### 3.2.1 Diagrama de Casos de Uso - General

```
                    ┌─────────────────────────────────────┐
                    │   SISTEMA SGIO                      │
                    │   (Gestión Integral de Obras)       │
                    └─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
   ┌─────────┐                ┌──────────┐                ┌─────────┐
   │DIRECTOR │                │ CONTADOR │                │CAPATAZ  │
   │(Admin)  │                │(Finance) │                │(Field)  │
   └─────────┘                └──────────┘                └─────────┘
        │                           │                           │
        │                           │                           │
   ┌────┴────────────────────┐     │    ┌──────────────────────┴──────┐
   │                         │     │    │                             │
   ▼                         ▼     ▼    ▼                             ▼
[CU-DIR-001]            [CU-DIR-002] [CU-CON-001]                [CU-CAP-001]
Ver Dashboard           Gestionar    Registrar                   Enviar Parte
de Obras                Hitos        Gasto                       Diario
   │                         │            │                           │
   │                         │            │                           │
[CU-DIR-003]            [CU-DIR-004]  [CU-CON-002]                [CU-CAP-002]
Buscar Documento        Agregar       Procesar Factura            Registrar
en Archivo              Tarea         con OCR (Futuro)            Asistencia
   │                         │            │                           │
   │                         │            │                           │
[CU-DIR-005]            [CU-DIR-006]                              [CU-CAP-003]
Subir Documento         Ver Estado                                Capturar
con Template            de Costos                                 Evidencia
   │                                                                   │
   │                                                                   │
[CU-DIR-007]                                                           
Ver Estado
de Obra
```

### 3.2.2 Lista de Casos de Uso

| ID | Caso de Uso | Actor | Prioridad | Estado |
|----|-------------|-------|-----------|--------|
| **DIRECTOR** |
| CU-DIR-001 | Ver Dashboard de Obras | Director | Crítica | ✅ Implementado |
| CU-DIR-002 | Gestionar Hitos de Obra | Director | Crítica | ⚠️ Parcial (75%) |
| CU-DIR-003 | Buscar Documento en Archivo | Director | Alta | ⚠️ Parcial (50%) |
| CU-DIR-004 | Agregar Tarea a Hito | Director | Alta | ❌ Pendiente |
| CU-DIR-005 | Subir Documento con Template | Director | Crítica | ✅ Implementado |
| CU-DIR-006 | Ver Estado de Costos | Director | Crítica | ⚠️ Parcial (70%) |
| CU-DIR-007 | Ver Estado Detallado de Obra | Director | Crítica | ✅ Implementado |
| **CONTADOR** |
| CU-CON-001 | Registrar Gasto Manualmente | Contador | Crítica | ⚠️ Parcial (60%) |
| CU-CON-002 | Procesar Factura con OCR | Contador | Alta | ⏳ Planificado |
| CU-CON-003 | Ver Dashboard Financiero | Contador | Crítica | ✅ Implementado |
| CU-CON-004 | Consultar Historial de Gastos | Contador | Media | ❌ Pendiente |
| **CAPATAZ** |
| CU-CAP-001 | Enviar Parte Diario | Capataz | Crítica | ⚠️ Parcial (85%) |
| CU-CAP-002 | Registrar Asistencia Personal | Capataz | Crítica | ✅ Implementado |
| CU-CAP-003 | Capturar Evidencia Fotográfica | Capataz | Alta | ✅ Implementado |
| CU-CAP-004 | Actualizar Estado de Tarea | Capataz | Crítica | ✅ Implementado |
| **SISTEMA** |
| CU-SIS-001 | Login por Rol | Todos | Crítica | ✅ Implementado |
| CU-SIS-002 | Logout | Todos | Alta | ❌ Pendiente |
| CU-SIS-003 | Recuperar Borrador | Todos | Alta | ❌ Pendiente |

---

## 3.3 MATRIZ DE TRAZABILIDAD (RF ↔ CU)

### 3.3.1 Requerimientos Funcionales → Casos de Uso

| Requerimiento Funcional | Casos de Uso Relacionados | Prioridad | Estado |
|------------------------|---------------------------|-----------|--------|
| **SISTEMA** |
| RF-SIS-001: Autenticación | CU-SIS-001 | Crítica | ✅ |
| RF-SIS-002: Persistencia | CU-CAP-001, CU-CON-001, CU-DIR-004 | Crítica | ⚠️ |
| RF-SIS-003: Validaciones | CU-CON-001, CU-CAP-001, CU-DIR-004 | Crítica | ❌ |
| **DIRECTOR** |
| RF-DIR-001: Dashboard Obras | CU-DIR-001 | Crítica | ✅ |
| RF-DIR-002: Línea de Tiempo | CU-DIR-002, CU-DIR-007 | Crítica | ✅ |
| RF-DIR-003: Archivo Central | CU-DIR-003, CU-DIR-005 | Crítica | ✅ |
| RF-DIR-004: Gestión Costos | CU-DIR-006 | Crítica | ⚠️ |
| RF-DIR-005: Gestión Tareas | CU-DIR-004 | Alta | ❌ |
| **CONTADOR** |
| RF-CON-001: Dashboard Financiero | CU-CON-003 | Crítica | ✅ |
| RF-CON-002: Registro Manual | CU-CON-001 | Crítica | ⚠️ |
| RF-CON-003: OCR Facturas | CU-CON-002 | Alta | ⏳ |
| **CAPATAZ** |
| RF-CAP-001: Parte Diario | CU-CAP-001 | Crítica | ✅ |
| RF-CAP-002: Registro Asistencia | CU-CAP-002 | Crítica | ✅ |
| RF-CAP-003: Evidencias Foto | CU-CAP-003 | Alta | ✅ |
| **IA (Futuro)** |
| RF-IA-001: OCR Facturas | CU-CON-002 | Alta | ⏳ |
| RF-IA-002: Sugerir Tareas | CU-DIR-004 | Alta | ⏳ |
| RF-IA-003: Detectar Partida | CU-CON-001 | Media | ⏳ |
| RF-IA-004: Búsqueda Semántica | CU-DIR-003 | Media | ⏳ |
| RF-IA-005: Predicción Retrasos | CU-DIR-002, CU-DIR-007 | Media | ⏳ |
| RF-IA-006: Chatbot AURA | Todos | Baja | ⏳ |

### 3.3.2 Casos de Uso → Pantallas/Componentes

| Caso de Uso | Pantallas Involucradas | Componentes Clave | Archivo |
|-------------|------------------------|-------------------|---------|
| CU-DIR-001 | Director/Dashboard | KPICard, Badge, ProgressBar | `app/director/dashboard/page.tsx` |
| CU-DIR-002 | Director/Obra/[id] | Línea de tiempo, Modal tareas | `app/director/obra/[id]/page.tsx` |
| CU-DIR-003 | Director/Archivo | Búsqueda, Lista docs | `app/director/archivo/page.tsx` |
| CU-DIR-004 | Director/Obra/[id] | Modal agregar tarea | `app/director/obra/[id]/page.tsx` |
| CU-DIR-005 | Director/Archivo | FormularioDocumento | `app/components/FormularioDocumento.tsx` |
| CU-DIR-006 | Director/Costos | Tabs, Partidas | `app/director/costos/page.tsx` |
| CU-CON-001 | Contador/Dashboard | Modal registro gasto | `app/contador/dashboard/page.tsx` |
| CU-CON-002 | Contador/Dashboard | Modal OCR (futuro) | `app/contador/dashboard/page.tsx` |
| CU-CAP-001 | Capataz/Parte-Diario | Toggles, Botón enviar | `app/capataz/parte-diario/page.tsx` |
| CU-CAP-002 | Capataz/Parte-Diario | Lista trabajadores | `app/capataz/parte-diario/page.tsx` |
| CU-CAP-003 | Capataz/Parte-Diario | Modal cámara | `app/capataz/parte-diario/page.tsx` |
| CU-SIS-001 | Login | Formulario login | `app/login/page.tsx` |

### 3.3.3 Resumen de Cobertura

| Métrica | Valor | Estado |
|---------|-------|--------|
| **Total Requerimientos Funcionales** | 23 | - |
| RF Implementados Completos | 12 | 52% |
| RF Implementados Parciales | 6 | 26% |
| RF No Implementados | 5 | 22% |
| **Total Casos de Uso** | 18 | - |
| CU Implementados Completos | 10 | 56% |
| CU Implementados Parciales | 5 | 28% |
| CU No Implementados | 3 | 17% |
| **Cobertura RF → CU** | 100% | ✅ |
| **Trazabilidad CU → Pantallas** | 100% | ✅ |

---

## 3.4 ESPECIFICACIONES DE CASOS DE USO

### 3.4.1 MÓDULO DIRECTOR

#### CU-DIR-001: Ver Dashboard de Obras

**Descripción:** El Director accede al dashboard principal para visualizar un resumen ejecutivo de todas las obras activas con KPIs globales y estado de cada proyecto.

**Actor Principal:** Director de Obra

**Precondiciones:**
- El Director ha iniciado sesión exitosamente
- Existen obras cargadas en el sistema

**Flujo Principal:**
1. El sistema muestra la pantalla principal del Director
2. El sistema calcula KPIs globales:
   - Total de obras activas
   - Presupuesto total (suma de todas las obras)
   - Total de hitos en progreso
3. El sistema muestra tarjetas de obras con:
   - Nombre de la obra
   - Ubicación (dirección)
   - Progreso general (%)
   - Uso de presupuesto (%)
   - Estado visual: "En tiempo" (verde), "En riesgo" (amarillo), "Atrasado" (rojo)
4. El sistema muestra centro de notificaciones con:
   - Alertas de presupuesto excedido
   - Hitos próximos a vencer
   - Documentos pendientes
5. El Director visualiza la información

**Flujos Alternativos:**

**FA1: No hay obras cargadas**
- 1a. El sistema muestra estado vacío con mensaje "No hay obras activas"
- 1b. El sistema muestra botón "Crear nueva obra" (futuro)
- 1c. Fin del caso de uso

**FA2: Clic en tarjeta de obra**
- 5a. El Director hace clic en una tarjeta de obra
- 5b. El sistema redirige a [CU-DIR-007: Ver Estado Detallado de Obra]
- 5c. Fin del caso de uso

**Postcondiciones:**
- El Director tiene visión completa del estado de todas las obras
- Los KPIs están actualizados al momento del acceso

**Excepciones:**
- E1: Error al cargar datos → Mostrar mensaje "Error al cargar obras. Reintente."

**Datos Involucrados:**
- Entrada: ID del Director (token de sesión)
- Salida: Lista de obras con estado, KPIs globales, notificaciones

**Interfaz:**
- Pantalla: `/director/dashboard`
- Componentes: KPICard, Badge (estado), ProgressBar, Header

**Criterios de Aceptación:**
- ✅ Los KPIs se calculan dinámicamente
- ✅ El estado de obra se determina por comparación de avance vs tiempo
- ✅ Las notificaciones se priorizan por urgencia
- ✅ La carga de la página es <2 segundos

**Estado de Implementación:** ✅ Implementado (95%)

---

#### CU-DIR-002: Gestionar Hitos de Obra

**Descripción:** El Director visualiza y actualiza el estado de las 11 fases de construcción de una obra específica.

**Actor Principal:** Director de Obra

**Precondiciones:**
- El Director está autenticado
- Existe una obra seleccionada
- La obra tiene los 11 hitos predefinidos

**Flujo Principal:**
1. El Director accede a la página de detalle de la obra [CU-DIR-007]
2. El sistema muestra la línea de tiempo con 11 hitos:
   - Planificación y Diseño
   - Preparación del Terreno
   - Cimientos y Fundación
   - Estructura Principal
   - Instalaciones Básicas
   - Cerramientos
   - Instalaciones Completas
   - Terminaciones
   - Pintura y Acabados
   - Limpieza Final
   - Entrega de Obra
3. Cada hito muestra:
   - Nombre del hito
   - Fecha de inicio planificada
   - Fecha de fin planificada
   - Progreso actual (0-100%)
   - Estado: Completado ✅, En progreso 🔄, Pendiente ⏳
   - Presupuesto asignado y gastado
4. El Director hace clic en "Expandir" de un hito
5. El sistema muestra detalles del hito:
   - Descripción detallada
   - Lista de tareas asociadas
   - Progreso desglosado
   - Opción "Agregar tarea" [CU-DIR-004]
6. El Director puede actualizar manualmente el progreso mediante un slider
7. El sistema guarda el cambio y actualiza el % general de la obra
8. El sistema recalcula el estado de la obra (en tiempo/riesgo/atrasado)

**Flujos Alternativos:**

**FA1: Expandir hito sin tareas**
- 5a. El hito no tiene tareas asociadas
- 5b. El sistema muestra mensaje "Sin tareas. Agregue tareas para mejor control"
- 5c. El sistema muestra botón "🤖 Sugerir tareas con IA" (futuro)
- 5d. Continúa en paso 6

**FA2: Actualizar progreso a 100%**
- 6a. El Director mueve el slider a 100%
- 6b. El sistema marca el hito como "Completado" ✅
- 6c. El sistema solicita confirmación: "¿Desea marcar este hito como completado?"
- 6d. Si acepta, actualiza estado y sugiere iniciar siguiente hito
- 6e. Si cancela, vuelve al valor anterior

**FA3: Hito con progreso pero sin fecha de inicio**
- 6a. El sistema detecta incongruencia
- 6b. El sistema solicita ingresar fecha de inicio real
- 6c. El Director ingresa fecha
- 6d. Continúa en paso 7

**Postcondiciones:**
- El progreso del hito está actualizado
- El progreso general de la obra se recalculó
- El estado de la obra (en tiempo/riesgo/atrasado) está actualizado

**Excepciones:**
- E1: Progreso inválido (fuera de 0-100) → Mostrar error "Ingrese un valor entre 0 y 100"
- E2: Fecha de fin anterior a fecha de inicio → Mostrar error "La fecha de fin debe ser posterior"

**Datos Involucrados:**
- Entrada: ID obra, ID hito, nuevo % de progreso
- Salida: Hito actualizado, % obra actualizado

**Interfaz:**
- Pantalla: `/director/obra/[id]`
- Componentes: Línea de tiempo, Modal de hito, Slider de progreso

**Criterios de Aceptación:**
- ✅ Los 11 hitos están predefinidos al crear la obra
- ⚠️ El progreso se puede actualizar manualmente
- ❌ El progreso NO se actualiza automáticamente con tareas (pendiente)
- ✅ El estado visual es claro (colores y iconos)

**Estado de Implementación:** ⚠️ Parcial (75%) - Falta auto-actualización por tareas

---

#### CU-DIR-003: Buscar Documento en Archivo

**Descripción:** El Director busca un documento específico en el Archivo Central mediante búsqueda por nombre.

**Actor Principal:** Director de Obra

**Precondiciones:**
- El Director está autenticado
- Existen documentos cargados en el archivo

**Flujo Principal:**
1. El Director accede a `/director/archivo`
2. El sistema muestra la estructura de carpetas:
   - Planos (7 tipos)
   - Permisos (6 tipos)
   - Contratos (3 tipos)
   - Facturas
   - Remitos
   - Fotos de Obra
3. El Director ingresa un término de búsqueda en la barra superior
4. El sistema filtra documentos en tiempo real mientras escribe
5. El sistema muestra resultados ordenados por relevancia:
   - Nombre del documento (resaltando el término)
   - Tipo de documento
   - Fecha de creación
   - Versión
   - Obra asociada
6. El Director hace clic en un documento
7. El sistema muestra vista previa del documento o descarga el archivo

**Flujos Alternativos:**

**FA1: Búsqueda sin resultados**
- 5a. No hay documentos que coincidan con el término
- 5b. El sistema muestra mensaje "No se encontraron documentos con ese nombre"
- 5c. El sistema sugiere: "Intente con otros términos o navegue por carpetas"
- 5d. Fin del caso de uso

**FA2: Búsqueda con IA (Futuro - RF-IA-004)**
- 3a. El Director ingresa búsqueda semántica (ej: "donde está la habilitacion?")
- 3b. El sistema interpreta la intención con IA
- 3c. El sistema muestra resultados relacionados aunque no coincidan exactamente
- 3d. Continúa en paso 5

**FA3: Filtrar por carpeta**
- 3a. El Director hace clic en una carpeta antes de buscar
- 3b. El sistema filtra búsqueda solo dentro de esa carpeta
- 3c. Continúa en paso 4

**Postcondiciones:**
- El Director encuentra el documento buscado
- El documento está disponible para visualización o descarga

**Excepciones:**
- E1: Error al cargar documento → Mostrar "No se pudo cargar el documento. Intente nuevamente"

**Datos Involucrados:**
- Entrada: Término de búsqueda (string)
- Salida: Lista de documentos coincidentes

**Interfaz:**
- Pantalla: `/director/archivo`
- Componentes: Barra de búsqueda, Lista de documentos, Modal de vista previa

**Criterios de Aceptación:**
- ⚠️ Búsqueda por nombre funciona (case-insensitive)
- ❌ NO busca en contenido del documento (futuro)
- ❌ NO es búsqueda semántica (futuro con IA)
- ✅ Resultados en tiempo real mientras escribe

**Estado de Implementación:** ⚠️ Parcial (50%) - Solo búsqueda básica por nombre

---

#### CU-DIR-004: Agregar Tarea a Hito

**Descripción:** El Director crea tareas específicas dentro de un hito para asignar al capataz.

**Actor Principal:** Director de Obra

**Precondiciones:**
- El Director está en la vista detallada de un hito [CU-DIR-002]
- El hito está en estado "Pendiente" o "En progreso"

**Flujo Principal:**
1. El Director hace clic en "Agregar tarea" dentro del hito expandido
2. El sistema muestra un modal con formulario:
   - Campo "Descripción de la tarea" (texto, obligatorio)
   - Selector "Asignado a" (lista de capataces)
   - Campo "Fecha límite" (date picker, opcional)
   - Toggle "Tarea crítica" (opcional)
3. El Director completa la descripción de la tarea
4. El Director opcionalmente asigna capataz y fecha límite
5. El Director hace clic en "Guardar tarea"
6. El sistema valida que la descripción no esté vacía
7. El sistema guarda la tarea asociada al hito
8. El sistema cierra el modal
9. El sistema muestra la nueva tarea en la lista del hito
10. El sistema envía notificación al capataz asignado (futuro)

**Flujos Alternativos:**

**FA1: Sugerir tareas con IA (Futuro - RF-IA-002)**
- 2a. El Director hace clic en "🤖 Sugerir tareas con IA"
- 2b. El sistema envía el nombre del hito a Gemini API
- 2c. El sistema recibe 8 tareas sugeridas específicas del hito
- 2d. El sistema muestra las tareas con checkboxes pre-seleccionados
- 2e. El Director revisa, edita o deselecciona tareas
- 2f. El Director hace clic en "Agregar tareas seleccionadas"
- 2g. El sistema guarda todas las tareas marcadas
- 2h. Continúa en paso 8

**FA2: Cancelar creación**
- 5a. El Director hace clic en "Cancelar"
- 5b. Si hay texto en el formulario, el sistema pregunta "¿Descartar cambios?"
- 5c. Si confirma, cierra modal sin guardar
- 5d. Si cancela, vuelve al formulario
- 5e. Fin del caso de uso

**FA3: Auto-guardado de borrador (RF-SIS-002)**
- 3a. El Director escribe pero no envía
- 3b. Cada 30 segundos, el sistema guarda borrador en localStorage
- 3c. Si el Director cierra el modal y vuelve a entrar, el sistema pregunta:
     "¿Desea recuperar el borrador guardado?"
- 3d. Si acepta, pre-llena el formulario
- 3e. Si rechaza, muestra formulario vacío

**Postcondiciones:**
- La tarea está creada y asociada al hito
- La tarea aparece en el parte diario del capataz [CU-CAP-001]
- El contador de tareas del hito se actualiza

**Excepciones:**
- E1: Descripción vacía → Mostrar error "La descripción es obligatoria"
- E2: Error al guardar → Mostrar "No se pudo guardar la tarea. Intente nuevamente"

**Datos Involucrados:**
- Entrada: ID hito, Descripción, ID capataz (opcional), Fecha límite (opcional), Crítica (bool)
- Salida: Tarea creada con ID único

**Interfaz:**
- Pantalla: `/director/obra/[id]` - Modal "Agregar tarea"
- Componentes: Modal, Input text, Date picker, Toggle

**Criterios de Aceptación:**
- ❌ NO se puede crear tarea vacía
- ⏳ Las tareas sugeridas con IA son específicas del hito (futuro)
- ⏳ El borrador se guarda cada 30 segundos (futuro)
- ❌ La tarea aparece automáticamente en el parte diario del capataz (pendiente)

**Estado de Implementación:** ❌ No implementado (UI presente, lógica pendiente)

---

#### CU-DIR-005: Subir Documento con Template

**Descripción:** El Director crea un nuevo documento en el Archivo Central usando uno de los 24 templates predefinidos.

**Actor Principal:** Director de Obra

**Precondiciones:**
- El Director está autenticado
- El Director está en la vista de Archivo Central

**Flujo Principal:**
1. El Director hace clic en "Nuevo Documento" en una carpeta
2. El sistema muestra modal con dos opciones:
   - "Completar formulario con template"
   - "Subir archivo existente"
3. El Director selecciona "Completar formulario con template"
4. El sistema muestra lista de templates disponibles para esa carpeta:
   - **Permisos:** Habilitación Eléctrica, Habilitación de Gas, Permiso Municipal, etc.
   - **Planos:** Plano de Arquitectura, Plano Eléctrico, Plano Sanitario, etc.
   - **Contratos:** Contrato de Obra, Contrato con Proveedor, etc.
5. El Director selecciona un template
6. El sistema carga el FormularioDocumento con campos dinámicos según el template
7. El Director completa los campos obligatorios (marcados con *)
8. El sistema valida en tiempo real cada campo (RF-SIS-003, futuro)
9. El Director hace clic en "Guardar documento"
10. El sistema valida que todos los campos obligatorios estén completos
11. El sistema genera un ID único para el documento
12. El sistema asigna versión v1
13. El sistema guarda el documento en la carpeta seleccionada
14. El sistema cierra el modal
15. El sistema muestra el documento en la lista de la carpeta

**Flujos Alternativos:**

**FA1: Subir archivo existente**
- 3a. El Director selecciona "Subir archivo existente"
- 3b. El sistema muestra diálogo de selección de archivo
- 3c. El Director selecciona un PDF, imagen o documento
- 3d. El sistema sube el archivo
- 3e. El sistema solicita: Nombre del documento, Obra asociada
- 3f. El Director completa los datos
- 3g. Continúa en paso 11

**FA2: Cancelar formulario**
- 9a. El Director hace clic en "Cancelar"
- 9b. Si hay campos completados, el sistema pregunta "¿Descartar cambios?"
- 9c. Si confirma, cierra sin guardar
- 9d. Si cancela, vuelve al formulario

**FA3: Validación en tiempo real (Futuro - RF-SIS-003)**
- 8a. El Director completa un campo requerido
- 8b. El sistema valida el formato (ej: email, fecha, número)
- 8c. Si es inválido, muestra mensaje de error debajo del campo
- 8d. El botón "Guardar" permanece deshabilitado hasta que todo sea válido

**FA4: Nueva versión de documento existente**
- 1a. El Director hace clic en "Editar" de un documento existente
- 1b. El sistema carga el formulario con datos actuales
- 1c. El Director modifica los campos
- 1d. Al guardar, el sistema incrementa la versión (v1 → v2)
- 1e. El sistema guarda historial de versiones
- 1f. Continúa en paso 14

**Postcondiciones:**
- El documento está creado en el Archivo Central
- El documento tiene versión v1 (o versión incrementada)
- El documento está asociado a la obra correcta
- El documento aparece en búsquedas [CU-DIR-003]

**Excepciones:**
- E1: Campos obligatorios vacíos → Mostrar "Complete todos los campos obligatorios (*)"
- E2: Error al guardar → Mostrar "No se pudo guardar el documento. Intente nuevamente"
- E3: Archivo muy grande (>10MB) → Mostrar "El archivo excede el tamaño máximo de 10MB"

**Datos Involucrados:**
- Entrada: ID template, Valores de campos, ID obra
- Salida: Documento creado con ID único y versión

**Interfaz:**
- Pantalla: `/director/archivo` - Modal "Nuevo Documento"
- Componentes: FormularioDocumento (dinámico), Selector de templates

**Criterios de Aceptación:**
- ✅ Existen 24 templates predefinidos
- ✅ Los formularios se generan dinámicamente según el template
- ✅ El sistema de versionado funciona (v1, v2, v3...)
- ❌ NO hay validación en tiempo real (futuro)
- ✅ Se pueden subir archivos externos

**Estado de Implementación:** ✅ Implementado (100%)

---

#### CU-DIR-006: Ver Estado de Costos

**Descripción:** El Director visualiza el estado presupuestario de una obra con desglose por las 17 partidas.

**Actor Principal:** Director de Obra

**Precondiciones:**
- El Director está autenticado
- Existe una obra con presupuesto cargado

**Flujo Principal:**
1. El Director accede a `/director/costos`
2. El sistema muestra KPIs del resumen financiero:
   - Presupuesto Total (AR$)
   - Total Gastado (AR$ y %)
   - Comprometido (pedidos pendientes)
   - Disponible (AR$ y %)
   - Indicador visual: Verde (<80%), Amarillo (80-95%), Rojo (>95%)
3. El sistema muestra lista de 17 partidas presupuestarias:
   - **Materiales:** Hierro y Acero, Cemento y Áridos, Ladrillos y Bloques, Madera, Aberturas
   - **Instalaciones:** Eléctrica, Sanitaria
   - **Terminaciones:** Pisos y Revestimientos, Pintura, Cielorrasos
   - **Mano de Obra:** Oficial Albañil, Ayudantes, Electricista, Plomero, Carpintero
   - **Otros:** Equipamiento, Logística y Transporte
4. Cada partida muestra:
   - Nombre de la partida
   - Presupuestado (AR$)
   - Gastado (AR$ y %)
   - Comprometido (AR$)
   - Disponible (AR$)
   - Barra de progreso visual
   - Estado: Verde/Amarillo/Rojo
5. El Director puede filtrar por categoría: Materiales, Mano de Obra, Otros
6. El Director puede cambiar a la pestaña "Transacciones"
7. El sistema muestra historial de gastos:
   - Fecha
   - Descripción
   - Proveedor
   - Monto
   - Partida asignada
   - Hito asociado
8. El Director visualiza la información

**Flujos Alternativos:**

**FA1: Partida excedida**
- 4a. Una partida tiene % gastado > 100%
- 4b. El sistema resalta la partida en rojo intenso
- 4c. El sistema muestra ícono de alerta ⚠️
- 4d. Al hacer clic, muestra detalle: "Exceso de $X (Y%)"
- 4e. Continúa en paso 5

**FA2: Sin gastos registrados**
- 7a. No hay transacciones en el historial
- 7b. El sistema muestra estado vacío "No hay gastos registrados"
- 7c. El sistema muestra botón "Ir al módulo Contador"
- 7d. Fin del caso de uso

**FA3: Filtrar transacciones por partida**
- 4a. El Director hace clic en una partida específica
- 4b. El sistema cambia a pestaña "Transacciones"
- 4c. El sistema filtra solo gastos de esa partida
- 4d. Continúa en paso 7

**Postcondiciones:**
- El Director tiene visibilidad completa del estado financiero
- Identifica partidas con riesgo de exceder presupuesto

**Excepciones:**
- E1: Error al calcular totales → Mostrar "Error al cargar datos de costos"

**Datos Involucrados:**
- Entrada: ID obra
- Salida: Resumen financiero, Lista de partidas con estado, Historial de transacciones

**Interfaz:**
- Pantalla: `/director/costos`
- Componentes: KPICard, Tabs (Resumen/Transacciones), ProgressBar, Badge

**Criterios de Aceptación:**
- ✅ Las 17 partidas están predefinidas
- ⚠️ Los cálculos se hacen en tiempo real (parcial)
- ⚠️ El historial muestra últimas 50 transacciones (no implementado filtro)
- ❌ NO hay exportación a Excel (futuro)

**Estado de Implementación:** ⚠️ Parcial (70%) - Falta filtros avanzados y exportación

---

#### CU-DIR-007: Ver Estado Detallado de Obra

**Descripción:** El Director accede a la vista completa de una obra específica con todos sus detalles.

**Actor Principal:** Director de Obra

**Precondiciones:**
- El Director está autenticado
- La obra existe en el sistema

**Flujo Principal:**
1. El Director hace clic en una tarjeta de obra desde [CU-DIR-001]
2. El sistema redirige a `/director/obra/[id]`
3. El sistema muestra encabezado de la obra:
   - Nombre de la obra
   - Ubicación completa
   - Estado general (en tiempo/riesgo/atrasado)
   - Progreso general (%)
   - Fecha de inicio
   - Fecha estimada de finalización
4. El sistema muestra tabs de navegación:
   - Hitos (vista por defecto)
   - Costos
   - Documentos
   - Equipo
5. Tab "Hitos" muestra la línea de tiempo [CU-DIR-002]
6. El Director puede cambiar de tab para ver otra información
7. El Director visualiza la información

**Flujos Alternativos:**

**FA1: Acceder a Costos**
- 6a. El Director hace clic en tab "Costos"
- 6b. El sistema carga vista de costos de esa obra específica [CU-DIR-006]
- 6c. Continúa en paso 7

**FA2: Acceder a Documentos**
- 6a. El Director hace clic en tab "Documentos"
- 6b. El sistema muestra documentos filtrados de esa obra
- 6c. Funcionalidad similar a [CU-DIR-003] pero solo de la obra actual
- 6d. Continúa en paso 7

**FA3: Acceder a Equipo (Futuro)**
- 6a. El Director hace clic en tab "Equipo"
- 6b. El sistema muestra:
   - Lista de trabajadores asignados
   - Capataz responsable
   - Proveedores principales
   - Historial de asistencia
- 6c. Continúa en paso 7

**Postcondiciones:**
- El Director tiene vista completa de la obra seleccionada
- Puede navegar entre diferentes aspectos de la obra

**Excepciones:**
- E1: Obra no encontrada → Redirigir a dashboard con mensaje "Obra no encontrada"

**Datos Involucrados:**
- Entrada: ID obra
- Salida: Toda la información de la obra (hitos, costos, docs, equipo)

**Interfaz:**
- Pantalla: `/director/obra/[id]`
- Componentes: Tabs, Header de obra, Línea de tiempo, Listas

**Criterios de Aceptación:**
- ✅ La navegación entre tabs es fluida
- ✅ El progreso general se calcula del promedio de hitos
- ✅ El estado se determina comparando avance vs tiempo
- ❌ El tab "Equipo" no está implementado (futuro)

**Estado de Implementación:** ✅ Implementado (80%)

---

### 3.4.2 MÓDULO CONTADOR

#### CU-CON-001: Registrar Gasto Manualmente

**Descripción:** El Contador carga un nuevo gasto asociándolo a una obra, hito y partida presupuestaria.

**Actor Principal:** Contador/Administrador

**Precondiciones:**
- El Contador está autenticado
- Existen obras y partidas cargadas en el sistema

**Flujo Principal:**
1. El Contador accede a `/contador/dashboard`
2. El Contador hace clic en "Registrar nuevo gasto"
3. El sistema muestra modal con formulario:
   - Descripción del gasto (texto, obligatorio)
   - Monto (número, obligatorio)
   - Proveedor (texto, opcional)
   - Fecha (date picker, por defecto hoy)
   - Método de pago (dropdown: Efectivo, Transferencia, Cheque)
   - Obra (dropdown, obligatorio)
   - Hito (dropdown basado en la obra, opcional)
   - Partida (dropdown con 17 opciones, obligatorio)
   - Subir factura (archivo PDF/imagen, opcional)
4. El Contador completa los campos obligatorios
5. El Contador selecciona la obra
6. El sistema carga los hitos de esa obra en el dropdown
7. El Contador selecciona la partida presupuestaria
8. Opcionalmente, sube foto/PDF de la factura
9. El Contador hace clic en "Guardar gasto"
10. El sistema valida que descripción, monto, obra y partida no estén vacíos
11. El sistema guarda el gasto con timestamp actual
12. El sistema actualiza los totales de la partida seleccionada
13. El sistema actualiza el monto gastado de la obra
14. El sistema cierra el modal
15. El sistema muestra el gasto en el dashboard con mensaje "Gasto registrado exitosamente"

**Flujos Alternativos:**

**FA1: Sugerencia automática de partida con IA (Futuro - RF-IA-003)**
- 7a. El Contador completa la descripción
- 7b. El sistema analiza el texto con IA
- 7c. El sistema sugiere la partida más probable
- 7d. El sistema muestra: "¿Es esto 'Cemento y Áridos'?" con opción de aceptar
- 7e. Si acepta, selecciona automáticamente
- 7f. Si rechaza, el Contador selecciona manualmente
- 7g. Continúa en paso 8

**FA2: Cancelar registro**
- 9a. El Contador hace clic en "Cancelar"
- 9b. Si hay datos ingresados, el sistema pregunta "¿Descartar cambios?"
- 9c. Si confirma, cierra sin guardar
- 9d. Si cancela, vuelve al formulario
- 9e. Fin del caso de uso

**FA3: Auto-guardado de borrador (RF-SIS-002)**
- 4a. El Contador completa campos pero no envía
- 4b. Cada 30 segundos, el sistema guarda borrador en localStorage
- 4c. Si cierra el modal y vuelve, pregunta "¿Recuperar borrador?"
- 4d. Si acepta, pre-llena el formulario
- 4e. Si rechaza, formulario vacío

**FA4: Monto inválido**
- 10a. El monto ingresado es negativo o 0
- 10b. El sistema muestra error "Ingrese un monto válido mayor a 0"
- 10c. El botón "Guardar" permanece deshabilitado
- 10d. Vuelve a paso 4

**Postcondiciones:**
- El gasto está registrado en el sistema
- Los totales de la partida están actualizados
- El gasto aparece en el historial del Director [CU-DIR-006]
- El presupuesto disponible de la partida se redujo

**Excepciones:**
- E1: Campos obligatorios vacíos → "Complete los campos: Descripción, Monto, Obra y Partida"
- E2: Error al guardar → "No se pudo registrar el gasto. Intente nuevamente"
- E3: Archivo muy grande → "El archivo excede 10MB. Comprima o use otro formato"

**Datos Involucrados:**
- Entrada: Descripción, Monto, Proveedor, Fecha, Método pago, ID obra, ID hito, ID partida, Archivo
- Salida: Gasto registrado con ID único y timestamp

**Interfaz:**
- Pantalla: `/contador/dashboard` - Modal "Registrar gasto"
- Componentes: Form, Dropdowns, Date picker, File upload

**Criterios de Aceptación:**
- ⚠️ Obra y Partida son obligatorios (validación pendiente)
- ❌ NO hay validación en tiempo real (futuro)
- ❌ NO sugiere partida con IA (futuro)
- ⚠️ El borrador no se guarda automáticamente (futuro)
- ✅ El gasto actualiza los totales de la partida

**Estado de Implementación:** ⚠️ Parcial (60%) - Faltan validaciones y auto-guardado

---

#### CU-CON-002: Procesar Factura con OCR

**Descripción:** El Contador sube una foto/PDF de una factura y el sistema extrae automáticamente los datos usando IA (Gemini 1.5 Flash).

**Actor Principal:** Contador/Administrador

**Precondiciones:**
- El Contador está autenticado
- La API de Gemini está configurada y funcionando
- El Contador tiene una factura en formato digital

**Flujo Principal:**
1. El Contador accede a `/contador/dashboard`
2. El Contador hace clic en "Procesar factura con IA"
3. El sistema muestra modal con zona de arrastrar archivo
4. El Contador arrastra o selecciona un archivo (PDF, JPG, PNG)
5. El sistema muestra spinner "Procesando factura con IA..."
6. El sistema envía la imagen a Gemini 1.5 Flash API
7. Gemini extrae:
   - Razón social del proveedor
   - CUIT
   - Número de factura
   - Fecha de emisión
   - Monto total
   - Items facturados (opcional)
8. El sistema recibe la respuesta en <5 segundos
9. El sistema pre-llena el formulario de [CU-CON-001] con datos extraídos
10. El sistema muestra mensaje "Datos extraídos. Verifique y corrija si es necesario"
11. El Contador revisa los datos extraídos
12. El Contador corrige campos si hay errores
13. El Contador completa campos faltantes: Obra, Hito, Partida
14. El Contador hace clic en "Guardar gasto"
15. Continúa con paso 10 de [CU-CON-001]

**Flujos Alternativos:**

**FA1: OCR falla o no puede extraer datos**
- 8a. Gemini no puede procesar la imagen (mala calidad, formato inválido)
- 8b. El sistema muestra mensaje "No se pudieron extraer datos. Cargue manualmente"
- 8c. El sistema muestra formulario vacío
- 8d. El Contador continúa con carga manual [CU-CON-001]

**FA2: Datos parciales extraídos**
- 9a. Solo se extrajeron algunos campos (ej: proveedor y monto, pero no fecha)
- 9b. El sistema pre-llena lo que pudo
- 9c. El sistema resalta campos vacíos con mensaje "Completar manualmente"
- 9d. Continúa en paso 11

**FA3: Sugerencia de partida con IA**
- 7a. Gemini también analiza los items de la factura
- 7b. Detecta palabras clave (ej: "cemento", "electricista", "madera")
- 7c. Sugiere automáticamente la partida: "Detectamos: Cemento y Áridos"
- 7d. Pre-selecciona la partida sugerida
- 7e. El Contador puede aceptar o cambiar
- 7f. Continúa en paso 11

**FA4: Cancelar procesamiento**
- 11a. El Contador hace clic en "Cancelar"
- 11b. El sistema descarta los datos extraídos
- 11c. Cierra el modal
- 11d. Fin del caso de uso

**Postcondiciones:**
- Los datos de la factura están en el sistema (si se guardó)
- El tiempo de carga se redujo de 10 minutos a 2 minutos
- La factura está asociada al gasto para trazabilidad

**Excepciones:**
- E1: API de Gemini no responde → "Servicio de IA temporalmente no disponible. Intente más tarde"
- E2: Imagen ilegible → "La imagen tiene muy baja calidad. Suba una foto más nítida"
- E3: Formato no soportado → "Formato no válido. Use PDF, JPG o PNG"
- E4: Archivo muy grande → "El archivo excede 10MB. Comprima la imagen"

**Datos Involucrados:**
- Entrada: Archivo de factura (imagen o PDF)
- Procesamiento: API Gemini 1.5 Flash
- Salida: Datos extraídos (proveedor, CUIT, monto, fecha, items)

**Interfaz:**
- Pantalla: `/contador/dashboard` - Modal "Procesar factura con IA"
- Componentes: Drag & drop zone, Spinner, Formulario pre-llenado

**Criterios de Aceptación:**
- ⏳ El procesamiento toma <5 segundos
- ⏳ La precisión de extracción es >85%
- ⏳ Si falla, permite carga manual sin perder tiempo
- ⏳ La factura original se adjunta al gasto para auditoría

**Estado de Implementación:** ⏳ Planificado (v1.0) - Prioridad alta

---

#### CU-CON-003: Ver Dashboard Financiero

**Descripción:** El Contador visualiza un resumen de facturas pendientes y últimas transacciones.

**Actor Principal:** Contador/Administrador

**Precondiciones:**
- El Contador está autenticado
- Existen gastos y facturas registrados

**Flujo Principal:**
1. El Contador accede a `/contador/dashboard`
2. El sistema muestra KPIs financieros globales:
   - Total facturado del mes (AR$)
   - Total gastos del mes (AR$)
   - Balance mensual (AR$)
   - Indicador: Verde (positivo), Rojo (negativo)
3. El sistema muestra sección "Facturas Pendientes":
   - Lista de facturas por procesar
   - Prioridad: Alta (rojo), Media (amarillo), Baja (verde)
   - Fecha de recepción
   - Proveedor (si se conoce)
   - Monto estimado
4. El sistema muestra sección "Últimas Transacciones":
   - Últimos 10 gastos registrados
   - Fecha, Descripción, Proveedor, Monto, Obra, Partida
   - Ordenados por fecha descendente
5. El Contador visualiza la información
6. El Contador puede hacer clic en "Ver todas" para historial completo

**Flujos Alternativos:**

**FA1: Sin facturas pendientes**
- 3a. No hay facturas en la cola de procesamiento
- 3b. El sistema muestra mensaje "¡Todo al día! No hay facturas pendientes"
- 3c. El sistema muestra ícono de check ✅
- 3d. Continúa en paso 4

**FA2: Sin transacciones**
- 4a. No hay gastos registrados aún
- 4b. El sistema muestra estado vacío "No hay transacciones"
- 4c. El sistema muestra botón "Registrar primer gasto"
- 4d. Continúa en paso 5

**FA3: Clic en factura pendiente**
- 5a. El Contador hace clic en una factura pendiente
- 5b. El sistema abre modal para procesarla con OCR [CU-CON-002]
- 5c. Fin del caso de uso

**FA4: Filtrar transacciones por obra**
- 6a. El Contador selecciona un filtro "Obra: Casa López"
- 6b. El sistema muestra solo gastos de esa obra
- 6c. Los KPIs se recalculan para esa obra específica
- 6d. Continúa en paso 5

**Postcondiciones:**
- El Contador tiene visibilidad de la situación financiera actual
- Identifica facturas que requieren acción inmediata

**Excepciones:**
- E1: Error al cargar datos → "Error al cargar dashboard. Recargue la página"

**Datos Involucrados:**
- Entrada: Ninguna (carga automática)
- Salida: KPIs, Lista de facturas pendientes, Últimas transacciones

**Interfaz:**
- Pantalla: `/contador/dashboard`
- Componentes: KPICard, Lista de facturas, Tabla de transacciones, Badge (prioridad)

**Criterios de Aceptación:**
- ✅ Los KPIs se calculan dinámicamente
- ⚠️ Las facturas pendientes son datos mock (futuro con backend)
- ✅ Las transacciones están ordenadas por fecha
- ❌ NO hay filtros implementados (futuro)

**Estado de Implementación:** ✅ Implementado (70%) - Falta filtros avanzados

---

### 3.4.3 MÓDULO CAPATAZ

#### CU-CAP-001: Enviar Parte Diario

**Descripción:** El Capataz registra diariamente la asistencia de trabajadores y el estado de las tareas del día desde su smartphone.

**Actor Principal:** Capataz de Obra

**Precondiciones:**
- El Capataz está autenticado
- Existe una obra asignada al Capataz
- Es un día laborable (lunes a sábado)

**Flujo Principal:**
1. El Capataz accede a `/capataz/parte-diario` desde su celular
2. El sistema muestra la fecha actual destacada
3. El sistema muestra indicadores climáticos:
   - Iconos de clima (soleado, nublado, lluvia)
   - Temperatura actual (°C)
4. El sistema muestra lista de trabajadores con toggles:
   - Nombre del trabajador
   - Rol (Oficial, Ayudante, Electricista, etc.)
   - Toggle "Presente" / "Ausente" (por defecto: Ausente)
5. El sistema pre-marca trabajadores que asistieron ayer (sugerencia inteligente)
6. El Capataz marca presentes/ausentes según corresponda [CU-CAP-002]
7. El sistema actualiza contador "X de Y presentes"
8. El sistema muestra lista de tareas del día con 3 estados:
   - ⏳ No iniciado (gris)
   - 🔄 En progreso (amarillo)
   - ✅ Finalizado (verde)
9. El Capataz actualiza el estado de cada tarea [CU-CAP-004]
10. Para tareas finalizadas, opcionalmente captura foto [CU-CAP-003]
11. El Capataz ingresa notas/observaciones (opcional)
12. El Capataz hace clic en "Enviar parte diario"
13. El sistema valida que al menos 1 trabajador esté marcado
14. El sistema guarda el parte diario con timestamp
15. El sistema muestra confirmación "Parte diario enviado exitosamente"
16. El sistema envía notificación al Director (futuro)
17. El sistema actualiza el progreso de los hitos según tareas completadas (futuro)

**Flujos Alternativos:**

**FA1: Ningún trabajador presente**
- 13a. Todos los trabajadores están marcados como "Ausente"
- 13b. El sistema pregunta "¿Seguro que nadie asistió hoy?"
- 13c. Si confirma, guarda el parte con asistencia 0
- 13d. Si cancela, vuelve al formulario
- 13e. Continúa en paso 14

**FA2: Sin tareas asignadas**
- 8a. No hay tareas para el día
- 8b. El sistema muestra mensaje "Sin tareas asignadas para hoy"
- 8c. El sistema permite enviar parte solo con asistencia
- 8d. Continúa en paso 11

**FA3: Auto-guardado de borrador (RF-SIS-002)**
- 6a. El Capataz marca asistencia pero no envía
- 6b. Cada 30 segundos, el sistema guarda borrador en localStorage
- 6c. Si recarga la página, pregunta "¿Recuperar borrador del parte?"
- 6d. Si acepta, restaura los estados guardados
- 6e. Si rechaza, comienza desde cero

**FA4: Parte ya enviado hoy**
- 2a. El sistema detecta que ya se envió un parte para hoy
- 2b. El sistema muestra mensaje "Ya enviaste el parte de hoy. ¿Deseas modificarlo?"
- 2c. Si acepta, carga el parte enviado para edición
- 2d. Si rechaza, no permite enviar otro
- 2e. Fin del caso de uso

**Postcondiciones:**
- El parte diario está registrado en el sistema
- La asistencia de trabajadores queda documentada
- Las tareas completadas actualizan el progreso de hitos (futuro)
- El Director visualiza el parte en su dashboard (futuro)

**Excepciones:**
- E1: Error al guardar → "No se pudo enviar el parte. Intente nuevamente"
- E2: Sin conexión a internet → "Sin conexión. El parte se guardará localmente" (futuro PWA)

**Datos Involucrados:**
- Entrada: Fecha, Lista de asistencia, Estados de tareas, Clima, Notas, Fotos
- Salida: Parte diario registrado con ID único y timestamp

**Interfaz:**
- Pantalla: `/capataz/parte-diario`
- Componentes: Toggles (asistencia), Select (estado tarea), TextArea (notas), Modal cámara

**Criterios de Aceptación:**
- ✅ La interfaz es mobile-first (optimizada para celular)
- ✅ Los toggles son grandes y fáciles de usar con el pulgar
- ⚠️ Pre-marca trabajadores de ayer (sugerencia inteligente implementada parcialmente)
- ❌ NO actualiza automáticamente el progreso de hitos (futuro)
- ❌ NO envía notificación al Director (futuro)
- ⚠️ Auto-guardado cada 30 segundos (implementado parcialmente)

**Estado de Implementación:** ⚠️ Parcial (85%) - Falta integración con backend y notificaciones

---

#### CU-CAP-002: Registrar Asistencia de Personal

**Descripción:** El Capataz marca la asistencia de cada trabajador del equipo usando toggles visuales.

**Actor Principal:** Capataz de Obra

**Precondiciones:**
- El Capataz está en la pantalla del Parte Diario [CU-CAP-001]
- Existe una lista de trabajadores asignados a la obra

**Flujo Principal:**
1. El sistema muestra lista de 5-10 trabajadores predefinidos
2. Cada trabajador tiene:
   - Foto de perfil (avatar)
   - Nombre completo
   - Rol/Especialidad (Oficial Albañil, Ayudante, Electricista, Plomero, Carpintero)
   - Toggle grande "Presente" / "Ausente"
3. El sistema pre-marca como "Presente" a trabajadores que asistieron ayer (sugerencia)
4. El Capataz revisa cada trabajador
5. Para marcar presente:
   - 5a. El Capataz toca el toggle del trabajador
   - 5b. El toggle cambia a verde con texto "Presente" ✅
   - 5c. El contador "X de Y presentes" se incrementa
6. Para marcar ausente:
   - 6a. El Capataz toca nuevamente el toggle (si estaba presente)
   - 6b. El toggle cambia a gris con texto "Ausente" ⏸️
   - 6c. El contador se decrementa
7. El sistema muestra contador dinámico: "7 de 10 presentes"
8. El Capataz finaliza la marcación
9. La asistencia queda guardada en el estado del formulario

**Flujos Alternativos:**

**FA1: Trabajador llegó tarde**
- 5a. El trabajador llegó después de la marcación inicial
- 5b. El Capataz puede volver a la lista de asistencia
- 5c. El Capataz marca al trabajador como presente
- 5d. El sistema guarda el cambio
- 5e. Continúa en paso 8

**FA2: Todos ausentes (día sin trabajo)**
- 4a. El Capataz deja todos en "Ausente"
- 4b. El contador muestra "0 de 10 presentes"
- 4c. Al enviar parte [CU-CAP-001], el sistema pregunta confirmación
- 4d. Continúa en paso 8

**FA3: Agregar trabajador nuevo (Futuro)**
- 4a. El Capataz hace clic en "+ Agregar trabajador"
- 4b. El sistema muestra formulario: Nombre, Rol, Foto
- 4c. El Capataz completa los datos
- 4d. El sistema agrega el trabajador a la lista
- 4e. El trabajador aparece con toggle "Ausente" por defecto
- 4f. Continúa en paso 5

**FA4: Ver historial de asistencia (Futuro)**
- 4a. El Capataz hace clic en un trabajador
- 4b. El sistema muestra modal con:
   - Asistencias del mes: X días
   - Ausencias del mes: Y días
   - Tasa de asistencia: Z%
   - Calendario con días marcados
- 4c. El Capataz cierra el modal
- 4d. Continúa en paso 5

**Postcondiciones:**
- La asistencia de todos los trabajadores está registrada
- El contador refleja correctamente cuántos están presentes
- Los datos quedan almacenados al enviar el parte diario

**Excepciones:**
- E1: Lista de trabajadores vacía → Mostrar "No hay trabajadores asignados a esta obra"

**Datos Involucrados:**
- Entrada: ID trabajador, Estado (presente/ausente)
- Salida: Lista de asistencia del día

**Interfaz:**
- Pantalla: `/capataz/parte-diario` - Sección "Asistencia"
- Componentes: Toggle grande (mobile-friendly), Avatar, Badge (rol), Contador

**Criterios de Aceptación:**
- ✅ Los toggles son grandes (min 44x44px) para uso con pulgar
- ✅ El cambio de estado es instantáneo (feedback visual)
- ✅ Pre-marca trabajadores de ayer (sugerencia inteligente)
- ✅ El contador se actualiza en tiempo real
- ❌ NO se puede agregar/eliminar trabajadores (futuro)
- ❌ NO hay historial de asistencia individual (futuro)

**Estado de Implementación:** ✅ Implementado (100%)

---

#### CU-CAP-003: Capturar Evidencia Fotográfica

**Descripción:** El Capataz toma fotos del progreso del trabajo para documentar tareas completadas.

**Actor Principal:** Capataz de Obra

**Precondiciones:**
- El Capataz está en la pantalla del Parte Diario
- El dispositivo tiene cámara funcional
- El navegador tiene permiso para acceder a la cámara

**Flujo Principal:**
1. El Capataz marca una tarea como "Finalizada" ✅
2. El sistema muestra botón "📷 Capturar evidencia"
3. El Capataz hace clic en el botón
4. El sistema solicita permiso de acceso a la cámara (primera vez)
5. El Capataz acepta el permiso
6. El sistema abre la cámara nativa del dispositivo
7. El Capataz encuadra la foto del trabajo realizado
8. El Capataz toma la foto
9. El sistema muestra preview de la foto capturada
10. El Capataz puede:
    - 10a. Aceptar la foto → Continúa en paso 11
    - 10b. Descartar y tomar otra → Vuelve a paso 7
11. El sistema comprime la imagen a <1MB
12. El sistema asocia la foto a la tarea específica
13. El sistema muestra miniatura de la foto junto a la tarea
14. La foto queda almacenada localmente (futuro: sube a S3)

**Flujos Alternativos:**

**FA1: Permisos de cámara denegados**
- 5a. El Capataz rechaza el permiso o el navegador lo bloqueó
- 5b. El sistema muestra mensaje "Necesitamos acceso a la cámara para tomar fotos"
- 5c. El sistema muestra instrucciones para habilitar permisos
- 5d. El Capataz puede:
   - Habilitar permisos y reintentar
   - Continuar sin foto
- 5e. Si continúa sin foto, la tarea se marca completada sin evidencia
- 5f. Fin del caso de uso

**FA2: Seleccionar foto de galería**
- 3a. El Capataz hace clic en "📁 Elegir de galería"
- 3b. El sistema abre el selector de archivos del dispositivo
- 3c. El Capataz selecciona una foto existente
- 3d. Continúa en paso 9

**FA3: Múltiples fotos por tarea (Futuro)**
- 13a. El Capataz hace clic nuevamente en "📷 Capturar evidencia"
- 13b. El sistema permite tomar otra foto
- 13c. El sistema asocia múltiples fotos a la misma tarea
- 13d. El sistema muestra galería de miniaturas (2-5 fotos)
- 13e. Continúa en paso 14

**FA4: Agregar nota a la foto (Futuro)**
- 10a. Antes de aceptar, el Capataz hace clic en "Agregar nota"
- 10b. El sistema muestra campo de texto
- 10c. El Capataz escribe una descripción (ej: "Columnas terminadas, falta curado")
- 10d. La nota se guarda junto con la foto
- 10e. Continúa en paso 11

**FA5: Sin conexión (Modo Offline - Futuro PWA)**
- 14a. El dispositivo no tiene conexión a internet
- 14b. El sistema guarda la foto en IndexedDB local
- 14c. El sistema marca la foto con ícono "Pendiente de subir ⏳"
- 14d. Cuando recupera conexión, sube automáticamente a S3
- 14e. Fin del caso de uso

**Postcondiciones:**
- La foto está capturada y asociada a la tarea
- La evidencia visual queda documentada para auditoría
- El Director puede ver la foto en el detalle del hito (futuro)

**Excepciones:**
- E1: Error de cámara → "No se pudo acceder a la cámara. Verifique permisos"
- E2: Foto muy grande → "La foto es muy grande. Comprimiendo automáticamente..."
- E3: Espacio insuficiente → "No hay espacio disponible en el dispositivo"

**Datos Involucrados:**
- Entrada: Imagen capturada, ID tarea
- Salida: Foto comprimida (<1MB) asociada a tarea

**Interfaz:**
- Pantalla: `/capataz/parte-diario` - Modal de cámara
- Componentes: Camera API (HTML5), Preview, Miniatura, Galería

**Criterios de Aceptación:**
- ✅ Acceso a cámara nativa del dispositivo
- ✅ Preview antes de confirmar
- ✅ Compresión automática a <1MB
- ✅ Miniatura visible junto a la tarea
- ❌ NO sube a servidor (solo localStorage por ahora)
- ❌ NO permite múltiples fotos por tarea (futuro)
- ❌ NO hay modo offline real (futuro PWA)

**Estado de Implementación:** ✅ Implementado (90%) - Falta subida a S3 y múltiples fotos

---

#### CU-CAP-004: Actualizar Estado de Tarea

**Descripción:** El Capataz cambia el estado de las tareas asignadas según el avance del trabajo.

**Actor Principal:** Capataz de Obra

**Precondiciones:**
- El Capataz está en la pantalla del Parte Diario
- Existen tareas asignadas para el día

**Flujo Principal:**
1. El sistema muestra lista de tareas del día con estados:
   - ⏳ **No iniciado** (gris): Tarea no comenzó
   - 🔄 **En progreso** (amarillo): Tarea en ejecución
   - ✅ **Finalizado** (verde): Tarea completada
2. Cada tarea muestra:
   - Descripción de la tarea
   - Hito asociado
   - Estado actual
   - Dropdown para cambiar estado
3. El Capataz selecciona una tarea
4. El Capataz abre el dropdown de estado
5. El Capataz selecciona el nuevo estado
6. El sistema actualiza el estado visualmente
7. Si el estado es "Finalizado":
   - 7a. El sistema muestra botón "📷 Capturar evidencia" [CU-CAP-003]
   - 7b. El Capataz puede opcionalmente tomar foto
8. El sistema guarda el cambio
9. El sistema recalcula el progreso del hito (futuro)
10. El sistema actualiza el % de tareas completadas del día

**Flujos Alternativos:**

**FA1: Cambiar tarea de Finalizada a En Progreso**
- 5a. El Capataz cambia una tarea finalizada a "En progreso"
- 5b. El sistema pregunta "¿Seguro que desea revertir el estado?"
- 5c. Si confirma, cambia el estado y elimina foto asociada (si existe)
- 5d. Si cancela, mantiene el estado anterior
- 5e. Continúa en paso 8

**FA2: Tarea sin iniciar al final del día**
- 1a. Al enviar el parte diario, quedan tareas en "No iniciado"
- 1b. El sistema pregunta "¿Desea mover estas tareas a mañana?"
- 1c. Si acepta, las tareas se reprograman para el día siguiente
- 1d. Si rechaza, las tareas quedan pendientes sin fecha
- 1e. Continúa con [CU-CAP-001]

**FA3: Todas las tareas completadas**
- 6a. El Capataz marca la última tarea como "Finalizado"
- 6b. El sistema detecta que todas las tareas están completas
- 6c. El sistema muestra mensaje de felicitación "¡Excelente! Todas las tareas completadas 🎉"
- 6d. El sistema sugiere enviar el parte diario
- 6e. Continúa en paso 10

**FA4: Agregar nota a la tarea (Futuro)**
- 6a. El Capataz hace clic en ícono "💬" junto a la tarea
- 6b. El sistema muestra campo de texto
- 6c. El Capataz escribe una observación (ej: "Faltó material, continuar mañana")
- 6d. La nota se guarda junto al estado de la tarea
- 6e. La nota es visible para el Director en el detalle del hito
- 6f. Continúa en paso 8

**FA5: Bloqueo por dependencias (Futuro)**
- 5a. El Capataz intenta marcar como "En progreso" una tarea que depende de otra
- 5b. El sistema detecta que la tarea previa no está completada
- 5c. El sistema muestra mensaje "Esta tarea requiere completar: [Tarea X]"
- 5d. El Capataz no puede cambiar el estado hasta completar la dependencia
- 5e. Fin del caso de uso

**Postcondiciones:**
- El estado de la tarea está actualizado
- El progreso del día se refleja correctamente
- El progreso del hito se actualiza (futuro)
- El Director visualiza el avance en su dashboard (futuro)

**Excepciones:**
- E1: Error al guardar → "No se pudo actualizar el estado. Intente nuevamente"

**Datos Involucrados:**
- Entrada: ID tarea, Nuevo estado (no iniciado/en progreso/finalizado)
- Salida: Tarea actualizada con timestamp del cambio

**Interfaz:**
- Pantalla: `/capataz/parte-diario` - Sección "Tareas del día"
- Componentes: Dropdown de estados, Badge de estado, Contador de progreso

**Criterios de Aceptación:**
- ✅ Los 3 estados son claros y diferenciables
- ✅ El cambio de estado es inmediato (feedback visual)
- ✅ Las tareas finalizadas muestran opción de foto
- ❌ NO recalcula automáticamente el progreso del hito (futuro)
- ❌ NO hay sistema de dependencias entre tareas (futuro)
- ❌ NO se pueden agregar notas a las tareas (futuro)

**Estado de Implementación:** ✅ Implementado (100%)

---

#### CU-SIS-001: Login por Rol

**Descripción:** Un usuario accede al sistema ingresando credenciales y es redirigido según su rol.

**Actores:** Director, Contador, Capataz

**Precondiciones:**
- El usuario tiene credenciales válidas
- El sistema está accesible

**Flujo Principal:**
1. El usuario accede a `/login`
2. El sistema muestra formulario de login:
   - Campo "Usuario" (texto)
   - Campo "Contraseña" (password)
   - Botón "Iniciar Sesión"
3. El usuario ingresa usuario y contraseña
4. El usuario hace clic en "Iniciar Sesión"
5. El sistema valida las credenciales (actualmente mock, futuro: backend)
6. El sistema identifica el rol del usuario:
   - director@sgio.com → Director
   - contador@sgio.com → Contador
   - capataz@sgio.com → Capataz
7. El sistema guarda el token de sesión en localStorage
8. El sistema redirige al dashboard según el rol:
   - Director → `/director/dashboard`
   - Contador → `/contador/dashboard`
   - Capataz → `/capataz/parte-diario`
9. El usuario accede a su interfaz personalizada

**Flujos Alternativos:**

**FA1: Credenciales inválidas**
- 6a. El usuario o contraseña no coinciden
- 6b. El sistema muestra mensaje "Usuario o contraseña incorrectos"
- 6c. Los campos se limpian
- 6d. El usuario puede reintentar
- 6e. Vuelve a paso 3

**FA2: Campos vacíos**
- 4a. El usuario no completó usuario o contraseña
- 4b. El sistema muestra error "Complete todos los campos"
- 4c. El botón permanece deshabilitado hasta completar
- 4d. Vuelve a paso 3

**FA3: Sesión existente**
- 1a. El sistema detecta token válido en localStorage
- 1b. El sistema redirige automáticamente al dashboard según rol
- 1c. No muestra la pantalla de login
- 1d. Fin del caso de uso

**FA4: "Recordar usuario" (Futuro)**
- 3a. El usuario marca checkbox "Recordar usuario"
- 3b. Al iniciar sesión, el sistema guarda el usuario en localStorage
- 3c. La próxima vez, el campo "Usuario" viene pre-llenado
- 3d. Continúa en paso 4

**FA5: Recuperar contraseña (Futuro)**
- 4a. El usuario hace clic en "¿Olvidó su contraseña?"
- 4b. El sistema muestra formulario de recuperación
- 4c. El usuario ingresa su email
- 4d. El sistema envía email con link de reseteo
- 4e. Fin del caso de uso

**Postcondiciones:**
- El usuario está autenticado en el sistema
- La sesión está activa y persistente
- El usuario tiene acceso a las funcionalidades de su rol

**Excepciones:**
- E1: Error de conexión → "No se pudo conectar. Verifique su conexión"
- E2: Servidor no responde → "Servicio temporalmente no disponible"

**Datos Involucrados:**
- Entrada: Usuario (email), Contraseña (texto)
- Salida: Token de sesión, Rol del usuario

**Interfaz:**
- Pantalla: `/login`
- Componentes: Form, Input text, Input password, Button

**Criterios de Aceptación:**
- ✅ La redirección es automática según el rol
- ⚠️ La autenticación es mock (sin backend real)
- ✅ El token persiste en localStorage
- ❌ NO hay encriptación real de contraseñas (futuro)
- ❌ NO hay recuperación de contraseña (futuro)
- ❌ NO hay opción "Recordar usuario" (futuro)

**Estado de Implementación:** ✅ Implementado (85%) - Autenticación simulada

---

## 3.5 HISTORIAS DE USUARIO

### 3.5.1 Formato de Historias de Usuario

Todas las historias de usuario siguen el formato estándar:

```
Como [ROL]
Quiero [ACCIÓN/FUNCIONALIDAD]
Para [BENEFICIO/OBJETIVO]

Criterios de Aceptación:
- [Criterio 1]
- [Criterio 2]
- [Criterio n]

Prioridad: [Alta/Media/Baja]
Estimación: [Puntos de historia o tiempo]
Estado: [✅ Implementado / ⚠️ Parcial / ❌ Pendiente / ⏳ Planificado]
```

---

### 3.5.2 ÉPICAS Y HISTORIAS DE USUARIO

#### **ÉPICA 1: GESTIÓN DE OBRAS (Director)**

##### HU-DIR-001: Dashboard de Obras
**Como** Director de Obra  
**Quiero** ver un resumen ejecutivo de todas mis obras activas en un solo lugar  
**Para** tener visibilidad inmediata del estado de cada proyecto y detectar problemas rápidamente

**Criterios de Aceptación:**
- Veo tarjetas de todas las obras con nombre, ubicación, avance % y estado
- Los estados son visuales: Verde (en tiempo), Amarillo (en riesgo), Rojo (atrasado)
- Los KPIs globales (total obras, presupuesto, hitos en progreso) se calculan automáticamente
- Puedo hacer clic en una obra para ver su detalle completo
- La carga de la página es <2 segundos

**Prioridad:** Crítica  
**Estimación:** 8 puntos  
**Estado:** ✅ Implementado (95%)

---

##### HU-DIR-002: Línea de Tiempo de Hitos
**Como** Director de Obra  
**Quiero** visualizar las 11 fases de construcción en una línea de tiempo  
**Para** controlar el avance de cada etapa y planificar el trabajo futuro

**Criterios de Aceptación:**
- Veo los 11 hitos predefinidos de construcción de viviendas unifamiliares
- Cada hito muestra: nombre, fechas inicio/fin, progreso %, presupuesto
- Puedo expandir un hito para ver tareas, detalles y opciones de gestión
- Los hitos completados se marcan claramente con ✅
- El progreso general de la obra se calcula del promedio de hitos

**Prioridad:** Crítica  
**Estimación:** 13 puntos  
**Estado:** ⚠️ Parcial (75%)

---

##### HU-DIR-003: Actualizar Progreso de Hito
**Como** Director de Obra  
**Quiero** actualizar manualmente el % de avance de un hito  
**Para** reflejar el estado real del trabajo cuando no hay tareas definidas

**Criterios de Aceptación:**
- Al expandir un hito, veo un slider de 0-100%
- Puedo arrastrar el slider para ajustar el progreso
- El cambio se guarda inmediatamente
- El progreso general de la obra se recalcula automáticamente
- Al llegar a 100%, el sistema pregunta si deseo marcar como completado

**Prioridad:** Alta  
**Estimación:** 5 puntos  
**Estado:** ⚠️ Parcial (50%)

---

##### HU-DIR-004: Agregar Tarea a Hito
**Como** Director de Obra  
**Quiero** crear tareas específicas dentro de cada hito  
**Para** asignarlas al capataz y tener control granular del trabajo

**Criterios de Aceptación:**
- Puedo hacer clic en "Agregar tarea" dentro de un hito
- Completo la descripción, capataz asignado y fecha límite (opcional)
- La tarea aparece en la lista del hito inmediatamente
- La tarea se muestra en el parte diario del capataz
- Puedo marcar tareas como críticas con un toggle

**Prioridad:** Alta  
**Estimación:** 8 puntos  
**Estado:** ❌ Pendiente (UI lista, lógica faltante)

---

##### HU-DIR-005: Sugerencias de Tareas con IA
**Como** Director de Obra  
**Quiero** que el sistema me sugiera tareas típicas al expandir un hito  
**Para** ahorrar tiempo y no olvidar actividades importantes de cada fase

**Criterios de Aceptación:**
- Hago clic en "🤖 Sugerir tareas con IA"
- En <5 segundos recibo 8 tareas específicas del hito actual
- Las tareas son relevantes (ej: para "Cimientos" sugiere excavación, armado de hierro, vaciado)
- Puedo seleccionar/deseleccionar tareas con checkboxes
- Puedo editar las descripciones antes de agregar
- Todas las tareas seleccionadas se crean simultáneamente

**Prioridad:** Alta  
**Estimación:** 13 puntos  
**Estado:** ⏳ Planificado (v1.0)

---

##### HU-DIR-006: Archivo Central con Templates
**Como** Director de Obra  
**Quiero** crear documentos usando formularios predefinidos de construcción  
**Para** estandarizar la documentación y evitar errores de formato

**Criterios de Aceptación:**
- Tengo acceso a 24 templates organizados por carpetas (Permisos, Planos, Contratos, etc.)
- Al elegir un template, se abre un formulario con campos específicos
- Los campos obligatorios están marcados con (*)
- El documento se guarda automáticamente en la carpeta correcta
- El sistema asigna versión v1 (o incrementa si ya existe)
- Puedo buscar documentos por nombre

**Prioridad:** Crítica  
**Estimación:** 21 puntos  
**Estado:** ✅ Implementado (100%)

---

##### HU-DIR-007: Subir Archivo Existente
**Como** Director de Obra  
**Quiero** subir PDFs o imágenes de documentos que ya tengo  
**Para** centralizar toda la información sin tener que reingresarla

**Criterios de Aceptación:**
- Puedo elegir "Subir archivo existente" al crear un documento
- Se abre el explorador de archivos de mi computadora
- Acepta PDF, JPG, PNG, DOC (máximo 10MB)
- Debo ingresar: Nombre del documento, Obra asociada, Carpeta destino
- El archivo se guarda y aparece en la lista inmediatamente

**Prioridad:** Alta  
**Estimación:** 5 puntos  
**Estado:** ✅ Implementado (100%)

---

##### HU-DIR-008: Búsqueda de Documentos
**Como** Director de Obra  
**Quiero** buscar documentos por nombre en el Archivo Central  
**Para** encontrar rápidamente lo que necesito sin navegar carpetas

**Criterios de Aceptación:**
- Hay una barra de búsqueda en la parte superior
- Los resultados se filtran en tiempo real mientras escribo
- El término buscado se resalta en los resultados
- Veo: Nombre, Tipo, Fecha, Versión de cada resultado
- La búsqueda es case-insensitive (mayúsculas/minúsculas no importan)
- Puedo hacer clic en un resultado para abrirlo

**Prioridad:** Alta  
**Estimación:** 5 puntos  
**Estado:** ⚠️ Parcial (50%) - Solo búsqueda básica

---

##### HU-DIR-009: Búsqueda Semántica con IA
**Como** Director de Obra  
**Quiero** buscar documentos usando lenguaje natural  
**Para** encontrar lo que necesito aunque no recuerde el nombre exacto

**Criterios de Aceptación:**
- Puedo escribir "donde está la habilitacion?" y encuentra "Habilitación Eléctrica", "Habilitación de Gas"
- Puedo escribir "plano de luz" y encuentra "Plano de Instalación Eléctrica"
- Puedo escribir "permiso del municipio" y encuentra "Permiso Municipal de Construcción"
- Los resultados están ordenados por relevancia (scoring)
- La búsqueda entiende sinónimos y contexto

**Prioridad:** Media  
**Estimación:** 13 puntos  
**Estado:** ⏳ Planificado (v1.5)

---

##### HU-DIR-010: Control de Costos por Partida
**Como** Director de Obra  
**Quiero** ver el estado de las 17 partidas presupuestarias  
**Para** identificar sobrecostos y tomar decisiones correctivas

**Criterios de Aceptación:**
- Veo un resumen con: Presupuesto total, Gastado, Comprometido, Disponible
- Cada partida muestra: Presupuestado, Gastado %, Disponible, Estado (verde/amarillo/rojo)
- Las partidas excedidas (>100%) se resaltan en rojo con alerta
- Puedo filtrar por categoría: Materiales, Mano de Obra, Otros
- Puedo cambiar a tab "Transacciones" para ver el historial de gastos

**Prioridad:** Crítica  
**Estimación:** 13 puntos  
**Estado:** ⚠️ Parcial (70%)

---

##### HU-DIR-011: Historial de Transacciones
**Como** Director de Obra  
**Quiero** ver todas las transacciones financieras de la obra  
**Para** auditar gastos y entender en qué se gastó el presupuesto

**Criterios de Aceptación:**
- Veo una tabla con: Fecha, Descripción, Proveedor, Monto, Partida, Hito
- Las transacciones están ordenadas por fecha (más recientes primero)
- Puedo hacer clic en una partida para filtrar solo sus gastos
- Veo las últimas 50 transacciones (paginación después)

**Prioridad:** Media  
**Estimación:** 8 puntos  
**Estado:** ⚠️ Parcial (60%)

---

##### HU-DIR-012: Detección de Retrasos con IA
**Como** Director de Obra  
**Quiero** que el sistema detecte automáticamente hitos atrasados  
**Para** recibir alertas tempranas y poder tomar acciones preventivas

**Criterios de Aceptación:**
- El sistema compara avance real vs avance esperado según fechas
- Si la diferencia es 5-15%, marca el hito en amarillo "En riesgo"
- Si la diferencia es >15%, marca el hito en rojo "Atrasado"
- Recibo recomendaciones automáticas (ej: "Aumentar cuadrilla", "Verificar materiales")
- El análisis se ejecuta cada 24 horas

**Prioridad:** Media  
**Estimación:** 13 puntos  
**Estado:** ⏳ Planificado (v1.5)

---

#### **ÉPICA 2: GESTIÓN FINANCIERA (Contador)**

##### HU-CON-001: Dashboard Financiero
**Como** Contador  
**Quiero** ver un resumen de facturas pendientes y últimas transacciones  
**Para** priorizar el trabajo de procesamiento de gastos

**Criterios de Aceptación:**
- Veo KPIs: Total facturado del mes, Gastos del mes, Balance mensual
- Veo lista de facturas pendientes con prioridad (alta/media/baja)
- Veo las últimas 10 transacciones con todos sus datos
- Puedo hacer clic en "Registrar nuevo gasto" para abrir el formulario
- Los KPIs se actualizan inmediatamente al registrar un gasto

**Prioridad:** Crítica  
**Estimación:** 8 puntos  
**Estado:** ✅ Implementado (70%)

---

##### HU-CON-002: Registrar Gasto Manualmente
**Como** Contador  
**Quiero** cargar manualmente los datos de una factura  
**Para** mantener el registro financiero actualizado

**Criterios de Aceptación:**
- Completo: Descripción, Monto, Proveedor, Fecha, Método de pago
- Selecciono obligatoriamente: Obra y Partida presupuestaria
- Opcionalmente selecciono: Hito específico
- Puedo subir foto/PDF de la factura
- El sistema valida que monto sea >0 y obra/partida estén seleccionados
- Al guardar, el gasto actualiza los totales de la partida
- Recibo confirmación "Gasto registrado exitosamente"

**Prioridad:** Crítica  
**Estimación:** 8 puntos  
**Estado:** ⚠️ Parcial (60%)

---

##### HU-CON-003: OCR de Facturas con IA
**Como** Contador  
**Quiero** subir una foto de una factura y que el sistema extraiga los datos automáticamente  
**Para** reducir el tiempo de carga de 10 minutos a 2 minutos

**Criterios de Aceptación:**
- Subo una foto/PDF de la factura
- En <5 segundos, el sistema extrae: Proveedor, CUIT, N° factura, Fecha, Monto, Items
- El formulario se pre-llena con los datos extraídos
- Reviso y corrijo si hay errores
- Completo manualmente: Obra, Hito, Partida
- Si el OCR falla, puedo cargar manualmente sin perder tiempo

**Prioridad:** Alta  
**Estimación:** 21 puntos  
**Estado:** ⏳ Planificado (v1.0)

---

##### HU-CON-004: Sugerencia Automática de Partida
**Como** Contador  
**Quiero** que el sistema sugiera la partida presupuestaria según la descripción del gasto  
**Para** agilizar la categorización y reducir errores

**Criterios de Aceptación:**
- Al completar la descripción, el sistema analiza el texto con IA
- Recibo una sugerencia: "Detectamos: Cemento y Áridos. ¿Es correcto?"
- Puedo aceptar (un clic) o cambiar manualmente
- Ejemplos de detección:
  - "Cemento x 50 bolsas" → "Cemento y Áridos"
  - "Jornal oficial albañil" → "Mano de Obra - Oficial Albañil"
  - "Alquiler mezcladora" → "Equipamiento"
- El sistema aprende de mis correcciones (machine learning)

**Prioridad:** Media  
**Estimación:** 13 puntos  
**Estado:** ⏳ Planificado (v1.0)

---

##### HU-CON-005: Auto-Guardado de Formulario
**Como** Contador  
**Quiero** que el sistema guarde automáticamente los datos que voy ingresando  
**Para** no perder información si me interrumpen o cierro accidentalmente

**Criterios de Aceptación:**
- Cada 30 segundos, el sistema guarda un borrador en localStorage
- Si cierro el modal y vuelvo a entrar, el sistema pregunta: "¿Recuperar borrador?"
- Si acepto, el formulario se pre-llena con los datos guardados
- Si rechazo, el formulario aparece vacío
- El borrador expira después de 24 horas

**Prioridad:** Alta  
**Estimación:** 8 puntos  
**Estado:** ❌ Pendiente

---

##### HU-CON-006: Consultar Historial de Gastos
**Como** Contador  
**Quiero** ver el historial completo de gastos registrados  
**Para** auditar, buscar duplicados y generar reportes

**Criterios de Aceptación:**
- Veo una tabla con todas las transacciones
- Puedo filtrar por: Fecha, Obra, Partida, Proveedor
- Puedo ordenar por cualquier columna (fecha, monto, etc.)
- Puedo buscar por texto en la descripción
- Veo paginación (20 registros por página)

**Prioridad:** Media  
**Estimación:** 8 puntos  
**Estado:** ❌ Pendiente

---

#### **ÉPICA 3: GESTIÓN DE CAMPO (Capataz)**

##### HU-CAP-001: Parte Diario Mobile-First
**Como** Capataz  
**Quiero** completar el parte diario desde mi celular de forma rápida y fácil  
**Para** registrar asistencia y tareas sin interrumpir el trabajo en obra

**Criterios de Aceptación:**
- La interfaz está optimizada para pantallas móviles (375px)
- Veo la fecha actual destacada y indicadores climáticos (temperatura, iconos)
- Puedo marcar asistencia con toggles grandes fáciles de tocar
- Puedo actualizar estados de tareas con dropdowns claros
- Puedo agregar notas opcionales
- El botón "Enviar parte" es grande y accesible
- El envío tarda <3 segundos

**Prioridad:** Crítica  
**Estimación:** 13 puntos  
**Estado:** ⚠️ Parcial (85%)

---

##### HU-CAP-002: Registro Rápido de Asistencia
**Como** Capataz  
**Quiero** marcar la asistencia de los trabajadores con un solo toque  
**Para** completar esta tarea en <2 minutos

**Criterios de Aceptación:**
- Veo la lista de 5-10 trabajadores con sus roles
- Los trabajadores que vinieron ayer están pre-marcados como sugerencia
- Toco el toggle para cambiar entre Presente/Ausente
- El cambio es instantáneo con feedback visual (verde/gris)
- Veo un contador dinámico "7 de 10 presentes"
- Los toggles son grandes (44x44px mínimo) para uso con pulgar

**Prioridad:** Crítica  
**Estimación:** 5 puntos  
**Estado:** ✅ Implementado (100%)

---

##### HU-CAP-003: Actualizar Estado de Tareas
**Como** Capataz  
**Quiero** cambiar el estado de las tareas del día  
**Para** informar al director del avance del trabajo

**Criterios de Aceptación:**
- Veo todas las tareas asignadas para hoy
- Cada tarea tiene un dropdown con 3 estados: No iniciado, En progreso, Finalizado
- Los estados tienen colores claros: Gris, Amarillo, Verde
- Al cambiar a "Finalizado", aparece opción de capturar foto
- Veo el % de tareas completadas del día
- Al completar todas, recibo mensaje de felicitación

**Prioridad:** Crítica  
**Estimación:** 8 puntos  
**Estado:** ✅ Implementado (100%)

---

##### HU-CAP-004: Capturar Evidencia Fotográfica
**Como** Capataz  
**Quiero** tomar fotos del trabajo terminado  
**Para** documentar visualmente el avance y calidad del trabajo

**Criterios de Aceptación:**
- Al marcar tarea como "Finalizada", veo botón "📷 Capturar evidencia"
- Hago clic y se abre la cámara de mi celular
- Tomo la foto y veo un preview
- Puedo aceptar o descartar y tomar otra
- La foto se comprime automáticamente a <1MB
- Veo una miniatura de la foto junto a la tarea
- Puedo tomar múltiples fotos por tarea (futuro)

**Prioridad:** Alta  
**Estimación:** 8 puntos  
**Estado:** ✅ Implementado (90%)

---

##### HU-CAP-005: Auto-Guardado del Parte
**Como** Capataz  
**Quiero** que el parte diario se guarde automáticamente mientras trabajo  
**Para** no perder datos si me interrumpen o se corta la señal

**Criterios de Aceptación:**
- Cada 30 segundos, el sistema guarda borrador en localStorage
- Si recargo la página, el sistema pregunta: "¿Recuperar borrador?"
- Si acepto, se restauran asistencia, estados de tareas y notas
- Si rechazo, empiezo desde cero
- El borrador es válido por 24 horas

**Prioridad:** Alta  
**Estimación:** 8 puntos  
**Estado:** ⚠️ Parcial (50%)

---

##### HU-CAP-006: Visualizar Historial de Partes
**Como** Capataz  
**Quiero** ver los partes diarios que envié en días anteriores  
**Para** recordar qué tareas se completaron y quiénes asistieron

**Criterios de Aceptación:**
- Hay un botón "Ver historial" en la pantalla principal
- Veo un calendario con días marcados (verde: parte enviado, gris: sin parte)
- Hago clic en un día y veo el parte completo de ese día
- Puedo ver: Asistencia, Tareas completadas, Notas, Fotos
- No puedo editar partes de días pasados (solo lectura)

**Prioridad:** Media  
**Estimación:** 13 puntos  
**Estado:** ❌ Pendiente

---

#### **ÉPICA 4: SISTEMA Y ADMINISTRACIÓN**

##### HU-SIS-001: Login por Rol
**Como** Usuario del sistema  
**Quiero** iniciar sesión con mi usuario y contraseña  
**Para** acceder a las funcionalidades de mi rol

**Criterios de Aceptación:**
- Ingreso usuario (email) y contraseña
- Si las credenciales son válidas, me redirige automáticamente:
  - Director → `/director/dashboard`
  - Contador → `/contador/dashboard`
  - Capataz → `/capataz/parte-diario`
- Si son inválidas, veo mensaje "Usuario o contraseña incorrectos"
- La sesión persiste hasta que haga logout (localStorage)

**Prioridad:** Crítica  
**Estimación:** 5 puntos  
**Estado:** ✅ Implementado (85%) - Autenticación mock

---

##### HU-SIS-002: Logout Manual
**Como** Usuario del sistema  
**Quiero** cerrar sesión manualmente  
**Para** proteger mi cuenta en computadoras compartidas

**Criterios de Aceptación:**
- Hay un botón "Cerrar sesión" en el header
- Al hacer clic, el sistema elimina el token de localStorage
- Me redirige a `/login`
- No puedo volver a las páginas protegidas sin iniciar sesión nuevamente

**Prioridad:** Alta  
**Estimación:** 3 puntos  
**Estado:** ❌ Pendiente

---

##### HU-SIS-003: Validaciones Proactivas
**Como** Usuario del sistema  
**Quiero** que los formularios validen datos en tiempo real  
**Para** corregir errores inmediatamente y no al enviar

**Criterios de Aceptación:**
- Los campos obligatorios están marcados con (*)
- Al completar un campo, el sistema valida el formato inmediatamente
- Si es inválido, veo mensaje de error debajo del campo (ej: "Email inválido")
- El botón de envío está deshabilitado si faltan campos obligatorios
- Al intentar enviar con errores, veo resumen de campos faltantes

**Prioridad:** Alta  
**Estimación:** 13 puntos  
**Estado:** ❌ Pendiente

---

##### HU-SIS-004: Modo Offline (PWA)
**Como** Usuario en obra sin señal  
**Quiero** usar el sistema sin conexión a internet  
**Para** no depender de la cobertura móvil

**Criterios de Aceptación:**
- Puedo instalar SGIO como app en mi celular
- Sin conexión, puedo:
  - Marcar asistencia
  - Actualizar tareas
  - Tomar fotos
  - Completar formularios
- Los datos se guardan localmente en IndexedDB
- Cuando recupero conexión, el sistema sincroniza automáticamente
- Veo indicador visual "Modo offline" cuando no hay conexión

**Prioridad:** Alta  
**Estimación:** 21 puntos  
**Estado:** ⏳ Planificado (v1.0)

---

##### HU-SIS-005: Notificaciones Push
**Como** Director o Contador  
**Quiero** recibir notificaciones en mi celular de eventos importantes  
**Para** estar al tanto aunque no esté usando la app

**Criterios de Aceptación:**
- Recibo notificaciones push cuando:
  - El capataz envía el parte diario
  - Se excede el presupuesto de una partida
  - Un hito se atrasa >15%
  - Se sube un documento crítico (permisos)
- Puedo configurar qué notificaciones quiero recibir
- Puedo silenciar notificaciones (no molestar)
- Al tocar la notificación, me lleva directamente a esa sección

**Prioridad:** Media  
**Estimación:** 13 puntos  
**Estado:** ⏳ Planificado (v1.0)

---

#### **ÉPICA 5: INTELIGENCIA ARTIFICIAL (Futuro)**

##### HU-IA-001: Chatbot Conversacional AURA
**Como** Usuario del sistema  
**Quiero** hacer preguntas en lenguaje natural sobre mis obras  
**Para** obtener información rápida sin navegar por el sistema

**Criterios de Aceptación:**
- Hay un botón flotante "🤖 AURA - Asistente IA"
- Puedo hacer preguntas como:
  - "¿Cuánto llevamos gastado en Casa López?"
  - "¿Dónde está la habilitación eléctrica?"
  - "¿Vamos atrasados en alguna obra?"
- AURA responde en <3 segundos con datos del sistema
- AURA puede mostrar links a secciones relevantes
- El historial de chat se guarda durante la sesión

**Prioridad:** Baja  
**Estimación:** 21 puntos  
**Estado:** ⏳ Planificado (v1.5)

---

##### HU-IA-002: Predicción de Sobrecostos
**Como** Director de Obra  
**Quiero** que el sistema prediga si una partida excederá su presupuesto  
**Para** tomar medidas preventivas antes de que sea tarde

**Criterios de Aceptación:**
- El sistema analiza el ritmo de gasto de cada partida
- Si proyecta que se excederá el presupuesto, muestra alerta amarilla
- Veo mensaje: "Esta partida excederá en $X (Y%) si continúa al ritmo actual"
- Recibo recomendaciones: "Reducir gastos en Z", "Solicitar ampliación de presupuesto"
- El análisis se actualiza semanalmente

**Prioridad:** Media  
**Estimación:** 21 puntos  
**Estado:** ⏳ Planificado (v2.0)

---

### 3.5.3 RESUMEN DE HISTORIAS DE USUARIO

| Épica | Cantidad HU | Implementadas | Parciales | Pendientes | Planificadas |
|-------|-------------|---------------|-----------|------------|--------------|
| **Gestión de Obras (Director)** | 12 | 3 | 5 | 1 | 3 |
| **Gestión Financiera (Contador)** | 6 | 1 | 2 | 2 | 1 |
| **Gestión de Campo (Capataz)** | 6 | 3 | 2 | 1 | 0 |
| **Sistema y Administración** | 5 | 1 | 0 | 2 | 2 |
| **Inteligencia Artificial** | 2 | 0 | 0 | 0 | 2 |
| **TOTAL** | **31** | **8 (26%)** | **9 (29%)** | **6 (19%)** | **8 (26%)** |

---

### 3.5.4 PRIORIZACIÓN POR VALOR DE NEGOCIO

#### Prioridad CRÍTICA (v0.1 - MVP Actual)
- ✅ HU-DIR-001: Dashboard de Obras
- ⚠️ HU-DIR-002: Línea de Tiempo de Hitos
- ✅ HU-DIR-006: Archivo Central con Templates
- ⚠️ HU-DIR-010: Control de Costos por Partida
- ⚠️ HU-CON-001: Dashboard Financiero
- ⚠️ HU-CON-002: Registrar Gasto Manualmente
- ⚠️ HU-CAP-001: Parte Diario Mobile-First
- ✅ HU-CAP-002: Registro Rápido de Asistencia
- ✅ HU-CAP-003: Actualizar Estado de Tareas
- ✅ HU-SIS-001: Login por Rol

**Estado Actual: 85% del MVP implementado**

#### Prioridad ALTA (v1.0 - Release)
- ❌ HU-DIR-003: Actualizar Progreso de Hito
- ❌ HU-DIR-004: Agregar Tarea a Hito
- ⏳ HU-DIR-005: Sugerencias de Tareas con IA
- ✅ HU-DIR-007: Subir Archivo Existente
- ⚠️ HU-DIR-008: Búsqueda de Documentos
- ⏳ HU-CON-003: OCR de Facturas con IA
- ❌ HU-CON-005: Auto-Guardado de Formulario
- ✅ HU-CAP-004: Capturar Evidencia Fotográfica
- ⚠️ HU-CAP-005: Auto-Guardado del Parte
- ❌ HU-SIS-002: Logout Manual
- ❌ HU-SIS-003: Validaciones Proactivas
- ⏳ HU-SIS-004: Modo Offline (PWA)

**Objetivo: 100% funcional con backend real e IA básica**

#### Prioridad MEDIA (v1.5 - Mejoras)
- ⏳ HU-DIR-009: Búsqueda Semántica con IA
- ⚠️ HU-DIR-011: Historial de Transacciones
- ⏳ HU-DIR-012: Detección de Retrasos con IA
- ⏳ HU-CON-004: Sugerencia Automática de Partida
- ❌ HU-CON-006: Consultar Historial de Gastos
- ❌ HU-CAP-006: Visualizar Historial de Partes
- ⏳ HU-SIS-005: Notificaciones Push
- ⏳ HU-IA-001: Chatbot Conversacional AURA

**Objetivo: Experiencia mejorada con IA avanzada**

#### Prioridad BAJA (v2.0 - Futuro)
- ⏳ HU-IA-002: Predicción de Sobrecostos

**Objetivo: Análisis predictivo y machine learning**

---

## 3.6 CONCLUSIONES

### 3.6.1 Cobertura del Análisis

Este documento de Análisis y Especificación (Parte 3) ha cubierto exhaustivamente:

✅ **Sección 3.1 - Alcance de la Solución:**
- 9 Stakeholders identificados y clasificados
- 5 Requerimientos de Negocio con justificación y métricas
- 23 Requerimientos Funcionales organizados por módulos (Sistema, Director, Contador, Capataz, IA)
- 8 Requerimientos No Funcionales (Usabilidad, Performance, Compatibilidad, Disponibilidad, Seguridad, Escalabilidad, Mantenibilidad, Portabilidad)
- 5 Limitaciones actuales del MVP
- 6 Exclusiones de alcance definidas

✅ **Sección 3.2 - Modelo de Casos de Uso:**
- Diagrama conceptual con 3 actores principales
- 18 Casos de Uso identificados y categorizados
- Matriz de cobertura: 100% de RF mapeados a CU

✅ **Sección 3.3 - Matriz de Trazabilidad:**
- RF → CU: 100% de cobertura
- CU → Pantallas/Componentes: 100% de trazabilidad
- Métricas de implementación: 56% completado

✅ **Sección 3.4 - Especificaciones de Casos de Uso:**
- 14 Casos de Uso especificados en detalle
- Flujos principales, alternativos y de excepción
- Precondiciones, postcondiciones, datos involucrados
- Criterios de aceptación y estado de implementación

✅ **Sección 3.5 - Historias de Usuario:**
- 31 Historias de Usuario redactadas en formato estándar
- Organizadas en 5 épicas temáticas
- Priorización por valor de negocio (Crítica/Alta/Media/Baja)
- Roadmap de implementación (v0.1 → v2.0)

### 3.6.2 Estado Actual del Proyecto

**MVP (v0.1.0) - 85% Implementado:**
- ✅ Sistema de roles funcional
- ✅ Dashboard de obras con KPIs
- ✅ Archivo Central con 24 templates
- ✅ Gestión de costos por partida
- ✅ Parte diario mobile-first
- ⚠️ Persistencia solo en localStorage (sin backend)
- ⚠️ IA simulada (sin integración real)

**Próximas Etapas:**

**v1.0 (Release Production):**
- Backend con PostgreSQL + Prisma
- Autenticación robusta con NextAuth.js
- OCR de facturas con Gemini 1.5 Flash
- Sugerencias de tareas con IA
- PWA con modo offline
- Deploy en Vercel + Supabase

**v1.5 (Mejoras con IA):**
- Búsqueda semántica de documentos
- Detección automática de retrasos
- Chatbot conversacional AURA
- Notificaciones push

**v2.0 (Análisis Predictivo):**
- Predicción de sobrecostos
- Machine learning de patrones de obra
- Integración con APIs externas (AFIP, proveedores)

### 3.6.3 Coherencia con Partes Anteriores

Este documento (Parte 3) se alinea con:

**Parte 1 - Introducción y Contexto:**
- Especialización en viviendas unifamiliares ✅
- Filosofía "Claridad Proactiva" ✅
- Target: Constructoras pequeñas/medianas ✅

**Parte 2 - Análisis del Problema:**
- Soluciona problemas identificados (papel, Excel, falta de control) ✅
- Cubre necesidades de 3 roles ✅
- Reduce tiempos operativos (60 min/día → <10 min) ✅

---

**FIN DE PARTE 3: ANÁLISIS Y ESPECIFICACIÓN**

---

*Documento generado para el Trabajo Práctico Obligatorio de Ingeniería de Requerimientos - Grupo 5*  
*Sistema: SGIO (Sistema de Gestión Integral de Obras)*  
*Fecha: Octubre 2025*  
*Versión: 1.0*
