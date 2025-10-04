**TRABAJO PRÁCTICO**

**INGENIERÍA DE REQUERIMIENTOS**  
**REQUERIMIENTOS Y NEGOCIOS**  
**SISTEMAS DE INFORMACIÓN II**

**"SGIO - Sistema de Gestión Integral de Obras (MVP v0.1)"**

**Integrantes del Grupo Nro: 5**  
*Cabrera, Paulina Dolores – LU1214899*  
*Carballo, Martin Pablo – LU1175190*  
*Cardozo, Pablo Joaquin – LU1224798*  
*Encinas Saavedra, Paula Marcela – LU1115471*  
*Sanchez Salgado, Isabella – LU1221947*  
*Saravia Moreira, Jonathan Max – LU1211804*  
*Tolaba, Nicolás Enrique – LU1213922*

**Profesor/as:**  
*Nombre y Apellido (completar)*  
*Nombre y Apellido (completar)*

**Cuatrimestre: 1 – Año: 2025**

**UNIVERSIDAD NACIONAL DE SALTA**  
**FACULTAD DE CIENCIAS EXACTAS**

---

## **NOTA IMPORTANTE - ALCANCE DE ESTE DOCUMENTO**

Este documento presenta **exclusivamente el MVP v0.1 (Mínimo Producto Viable)** del Sistema de Gestión Integral de Obras, implementado y validado en Octubre 2024.

**Objetivo del MVP:** Validar hipótesis de usabilidad y flujos de trabajo con usuarios reales de la empresa mediante un prototipo funcional con datos simulados.

**Limitaciones técnicas aceptadas para MVP:**
- Autenticación simulada (mock)
- Persistencia en localStorage (sin backend)
- Datos de ejemplo pre-cargados
- Sin sincronización multi-dispositivo
- IA simulada (sin integración real)

**Este documento NO incluye:**
- Especificaciones de versiones futuras (v1.0, v1.5, v2.0)
- Requisitos de sistema productivo
- Arquitectura de backend
- Integraciones con servicios externos

---

# Tabla de contenido

[1. Presentación de Empresa/organización](#1-presentación-de-empresaorganización)  
[1.1 Identificación de la organización](#11-identificación-de-la-organización)  
[1.2 Productos/Servicios](#12-productosservicios)  
[1.3 Tipo de Empresa](#13-tipo-de-empresa)  
[1.4 Problemática del negocio a analizar](#14-problemática-del-negocio-a-analizar)  
[1.5 Objetivos preliminares de la solución propuesta](#15-objetivos-preliminares-de-la-solución-propuesta)  
[1.6 Integrantes del grupo](#16-integrantes-del-grupo)

[2. Elicitación](#2-elicitación)  
[2.1 Resultado de Entrevistas](#21-resultado-de-entrevistas)  
[2.2 Resultados de (Encuestas, Brainstorming, Cuestionarios etc)](#22-resultados-de-encuestas-brainstorming-cuestionarios-etc)  
[2.3 Resultados de Análisis de Formularios](#23-resultados-de-análisis-de-formularios)  
[2.4 Consolidación - Descripción del dominio](#24-consolidación---descripción-del-dominio)

[3. Análisis y Especificación](#3-análisis-y-especificación)  
[3.1 Alcance de la solución](#31-alcance-de-la-solución)  
[3.2 Modelo de Casos de Uso](#32-modelo-de-casos-de-uso)  
[3.3 Matriz de Trazabilidad (RF y CU)](#33-matriz-de-trazabilidad-rf-y-cu)  
[3.4 Especificaciones de Casos de Uso](#34-especificaciones-de-casos-de-uso)  
[3.5 Historias de Usuario](#35-historias-de-usuario)

[4. Validación](#4-validación)  
[4.1 Técnica prototipo](#41-técnica-prototipo)  
[4.2 Pantallas del prototipo](#42-pantallas-del-prototipo)

---

# **1. Presentación de Empresa/organización**

## **1.1 Identificación de la organización**

**NOMBRE:** Construcciones Cardozo & Asociados

**UBICACIÓN GEOGRÁFICA:** Ciudad de Salta, Argentina. Las obras se ejecutan en Salta Capital y zonas aledañas.

**AÑO DE FUNDACIÓN:** 2021

**CONTEXTO OPERATIVO:** La empresa opera actualmente **6–7 obras en paralelo**, cada una con un capataz responsable del día a día y un contador (hermano del director) que centraliza gastos, pagos y documentación de todas las obras.

---

## **1.2 Productos/Servicios**

**PRODUCCIÓN** ~~COMERCIALIZACIÓN~~

**NATURALEZA DE LA ACTIVIDAD:** Comercialización de servicios profesionales de construcción

### **DESCRIPCIÓN DE LA ACTIVIDAD PRINCIPAL**

Construcciones Cardozo & Asociados es una empresa constructora que ejecuta obras por contrato, gestiona **cuadrillas** y **subcontratos por rubro** (albañilería, instalaciones, terminaciones), y administra **costos, plazos y calidad** en múltiples frentes de obra simultáneos.

**Servicios principales:**

1. **Dirección y ejecución de obras civiles**  
   Flujo de trabajo completo: compra de terrenos → compra de materiales → construcción de viviendas (dúplex, casas unifamiliares, casas de campo) → **venta posterior**

2. **Remodelaciones y ampliaciones**  
   Reformas integrales y ampliaciones de viviendas existentes

3. **Gerenciamiento de obra, cómputo y presupuesto**  
   Servicios profesionales de dirección técnica para terceros

4. **Inspección / dirección técnica**  
   Supervisión y control de calidad de obras ejecutadas por terceros

**Características distintivas:**

- **Las instalaciones (agua/cloaca, electricidad, gas) se ejecutan con profesionales matriculados y certificaciones habilitantes**, dejando un legajo técnico completo por vivienda que respalda la venta y cumple normativas municipales.

- Metodología de trabajo basada en **Control P** (plazo y presupuesto) y **UCyG** (Unidad de Control y Gestión) para organizar y dar visibilidad a la operación de cuadrillas en múltiples frentes.

---

## **1.3 Tipo de Empresa**

| TAMAÑO: |
|---------|
| ~~CHICA~~ ~~MEDIANA~~ ~~GRANDE~~ ~~MULTINACIONAL~~ **FAMILIAR** |

| CANTIDAD DE EMPLEADOS: |
|------------------------|
| Estructura variable según obras activas: 1 Director (Arquitecto), 1 Contador/Administrador, 6-7 Capataces (uno por obra), más cuadrillas de trabajadores por obra (oficiales, ayudantes, especialistas). Total aproximado: 3 personal permanente + 30-50 trabajadores en campo según carga de trabajo. |

| EXISTE DEPTO. O ÁREA DE SISTEMAS? | SI | NO |
|-----------------------------------|----|----|
|                                   |    | X  |

**Nota:** No cuenta con área formal de sistemas. El soporte IT se terceriza en casos puntuales.

---

## **1.4 Problemática del negocio a analizar**

### **Contexto del sistema de información actual**

La empresa Construcciones Cardozo & Asociados administra múltiples obras en paralelo utilizando métodos **manuales y dispersos**: anotaciones en papel, planillas Excel, fotos por WhatsApp y documentos físicos en carpetas. Esta dispersión genera:

### **Problemáticas operativas identificadas**

**1. Seguimiento fragmentado de obras**

El seguimiento de una obra se realiza a través de múltiples agendas y registros dispersos (papel del capataz, Excel del contador, fotos en WhatsApp del director), lo que dificulta su revisión consolidada. Para analizar el estado real de una obra, es necesario acceder a todas estas fuentes, y de lo contrario, se debe esperar a contar con la totalidad de los documentos correspondientes en su última versión.

**2. Visibilidad tardía de desvíos**

La dispersión de información (múltiples versiones para un mismo documento) genera visibilidad tardía de desvíos en plazos y costos. No existen **alertas tempranas** que permitan una intervención oportuna. La demora en el análisis del avance de obra provoca que las desviaciones se identifiquen cuando ya han generado retrasos y sobrecostos significativos.

**3. Trazabilidad incompleta**

Los partes diarios pueden no registrarse adecuadamente o perderse, lo que posteriormente dificulta la trazabilidad de la obra. La valorización y certificación de subcontratos a veces se documenta de manera informal (por ejemplo en chats de WhatsApp) debido a olvidos u omisiones. Esta información no se registra formalmente, comprometiendo la trazabilidad y el control del proyecto.

**4. Ausencia de tablero de control consolidado**

No existe un **tablero de control UCyG** que consolide los indicadores clave de desempeño (KPI) por obra, como:
- Avance porcentual real vs. planificado
- Costo real versus presupuestado por partida
- Productividad en hitos/tiempo
- Retrabajos e incidentes

Esto implica que cualquier análisis requiere mucho tiempo de consolidación manual y dificulta determinar si la obra se encuentra alineada con los objetivos esperados.

**5. Falta de registro histórico estructurado**

Falta de documentación formal de los desvíos ocurridos en obras anteriores, por lo que las correcciones o estimaciones se basan principalmente en la experiencia individual. Si algún detalle se omite, la precisión de estas decisiones se ve comprometida.

### **Circuito administrativo en análisis**

El circuito de **gestión de avance de obra y control financiero** que abarca:

- **Planificación semanal** (director + capataz por obra)
- **Asignación diaria de tareas** (capataz)
- **Registro de parte diario** (personal, horas, materiales, avances)
- **Consolidación de avances** (director verifica contra planos)
- **Validación de gastos/pagos** (contador autoriza compras)
- **Control P** (seguimiento de plazo y presupuesto)
- **Informes UCyG** (indicadores de gestión)

### **Necesidades de información no satisfechas**

Los stakeholders requieren:

- **Director:** Vista consolidada en tiempo real del estado de las 6-7 obras, identificación temprana de hitos atrasados, acceso rápido a documentación técnica.

- **Contador:** Visibilidad inmediata de desvíos presupuestarios (alertas cuando una partida supera el 85% del presupuesto), consolidación automática de gastos por obra, trazabilidad de autorizaciones.

- **Capataz:** Herramienta móvil para registrar parte diario desde obra sin depender de papel/WhatsApp, que funcione sin señal y sincronice después, registro fotográfico asociado a hitos.

---

## **1.5 Objetivos preliminares de la solución propuesta**

### **Objetivo general del MVP v0.1**

**Validar hipótesis de usabilidad y flujos de trabajo** del Sistema de Gestión Integral de Obras (SGIO) mediante un **prototipo funcional** que permita a usuarios reales de la empresa probar las interfaces propuestas y confirmar que la solución digital aporta valor tangible antes de invertir en infraestructura de backend completa.

### **Objetivos específicos desde Ingeniería de Requerimientos**

**1. Objetivos de Elicitación y Validación de Requisitos**

- Identificar y documentar los **requisitos funcionales críticos** para los 3 roles principales (Director, Contador, Capataz) mediante entrevistas semiestructuradas y análisis de formularios actuales.

- Validar con **usuarios reales** que los requisitos elicitados reflejan correctamente sus necesidades mediante prueba del prototipo durante 2 semanas.

- Confirmar que el sistema cumple con el requerimiento **RN-005**: "Facilidad de uso superior al método actual" (meta: calificación ≥4.0/5).

**2. Objetivos de Especificación y Modelado**

- Definir **casos de uso** detallados que cubran los flujos de trabajo de los tres roles en el MVP, con especificación completa de flujos normales, alternativos y excepciones.

- Producir **especificación de requisitos** clara y sin ambigüedades que sirva de base documentada para evolución futura del sistema.

- Establecer **trazabilidad bidireccional** entre problemas identificados (sección 1.4), requisitos de usuario, requisitos funcionales y casos de uso implementados.

**3. Objetivos de Validación mediante Prototipado**

- Implementar un **prototipo funcional navegable** (no solo mockups estáticos) que permita a los usuarios interactuar con el sistema como si fuera real.

- Obtener **feedback cuantitativo y cualitativo** mediante métricas de usabilidad (escala 1-5), tiempo de tareas y comentarios abiertos.

- Identificar **mejoras prioritarias** para versiones futuras basadas en evidencia empírica de uso real.

**4. Objetivos de Análisis del Dominio**

- Validar que la estructura de **23 hitos constructivos** refleja correctamente el proceso real de construcción de viviendas de la empresa.

- Confirmar que las **17 partidas presupuestarias** definidas cubren completamente la contabilidad de obra sin omisiones ni redundancias.

- Verificar que los **24 templates de documentos** organizados en 6 categorías son suficientes y están correctamente clasificados.

### **Resultados esperados del MVP (alcanzados)**

✅ **Sistema prototipo funcional** con 3 módulos completos (Director, Contador, Capataz)  
✅ **Validación de usabilidad** con calificación promedio ≥4.0/5 (logrado: 4.5/5)  
✅ **Confirmación de estructura de datos** (23 hitos, 17 partidas, 24 templates)  
✅ **Lista priorizada de mejoras** para siguientes iteraciones (identificadas 8 mejoras)  
✅ **Evidencia empírica** de que centralización digital aporta valor (reducción 47-98% en tiempos)

### **Exclusiones del MVP (fuera de alcance)**

❌ Backend real con base de datos persistente  
❌ Autenticación y control de acceso robusto  
❌ Carga y almacenamiento de fotos de obra  
❌ Modo offline/PWA  
❌ Integración con IA (OCR, procesamiento de lenguaje natural)  
❌ Exportación de reportes a PDF/Excel  
❌ Sincronización multi-dispositivo

---

## **1.6 Integrantes del grupo**

### **1. Cabrera, Paulina Dolores**
- **Nro. De Legajo y Plan:** 1214899 - Ingeniería en Informática
- **Regular / Asignatura Individual:** Regular
- **Trabaja:** Sí - Developer
- **Lenguajes de programación que conoce:** Python

### **2. Carballo, Martin Pablo**
- **Nro. De Legajo y Plan:** 1175190 - Lic. en Gestión de Tecnología de Información
- **Regular / Asignatura Individual:** Regular
- **Trabaja:** No
- **Lenguajes de programación que conoce:** HTML, CSS, Python, Java, SQL

### **3. Cardozo, Pablo Joaquin**
- **Nro. De Legajo y Plan:** 1224798 - Ingeniería en Informática
- **Regular / Asignatura Individual:** Regular
- **Trabaja:** Sí - Freelancer (Desarrollo de software)
- **Lenguajes de programación que conoce:** Python, JavaScript, PHP, C, Java, TypeScript

### **4. Encinas Saavedra, Paula Marcela**
- **Nro. De Legajo y Plan:** 1115471 - Lic. en Gestión de Tecnología de Información
- **Regular / Asignatura Individual:** Regular
- **Trabaja:** Sí - Analista de Producto
- **Lenguajes de programación que conoce:** Python, Java

### **5. Sanchez Salgado, Isabella**
- **Nro. De Legajo y Plan:** 1221947 - Ingeniería en Informática
- **Regular / Asignatura Individual:** Regular
- **Trabaja:** No
- **Lenguajes de programación que conoce:** Python

### **6. Saravia Moreira, Jonathan Max**
- **Nro. De Legajo y Plan:** 1211804 - Ingeniería en Informática
- **Regular / Asignatura Individual:** Regular
- **Trabaja:** Sí - Developer
- **Lenguajes de programación que conoce:** JavaScript, TypeScript, Java, Python

### **7. Tolaba, Nicolás Enrique**
- **Nro. De Legajo y Plan:** 1213922 - Ingeniería en Informática
- **Regular / Asignatura Individual:** Regular
- **Trabaja:** Sí - Ingeniero de datos
- **Lenguajes de programación que conoce:** Python

---

# **2. Elicitación**

## **2.1 Resultado de Entrevistas**

### **Entrevista 1 - Arquitecto Director de Obra**

| **Técnica de relevamiento:** Entrevista semiestructurada 1 |
|-------------------------------------------------------------|
| **Lugar:** Llamada virtual (Zoom) |
| **Fecha:** 09/09/2024 |
| **Duración prevista:** 90 minutos (Duración real: 1 hora 45 minutos) |
| **Entrevistado:** Arquitecto (Fundador y Director de Obra) - Construcciones Cardozo & Asociados |
| **Entrevistador:** Pablo Cardozo (Integrante del Grupo 5) |
| **Modo:** Virtual sincrónica |

### **Objetivo de la entrevista**

Comprender el proceso actual de gestión de obras, identificar roles y responsabilidades, validar la estructura de hitos constructivos y detectar dolores operativos que motiven el desarrollo del sistema.

### **Preguntas y respuestas (selección relevante para MVP)**

**P1: ¿Quién arma lo que se hace cada día en obra?**

R1: El **capataz** de cada obra. Él reparte las tareas a la mañana y coordina al equipo. Yo paso por la obra a revisar que se esté haciendo lo que se dijo y, si algo no me convence, lo acomodo ahí mismo con el capataz.

**P2: ¿Cómo planificas la semana de trabajo?**

R2: Muy simple. El fin de semana o el domingo a la tarde hablo con **cada capataz**. Vemos qué frente sigue y lo anotamos de forma simple: en papel y, cuando hace falta, en una planilla básica. Después, el capataz se lo baja al equipo cada mañana.

**P3: ¿Qué es el "parte diario" y quién lo completa?**

R3: El **capataz**. Anota quién vino, cuántas horas y qué se hizo (metros de pared, metros de cable, revoque, etc.). Saca fotos y me las manda. Yo lo reviso contra los planos y lo que habíamos previsto.

**P4: ¿Cómo sabés si venís al día con los tiempos?**

R4: Cuento cosas **fáciles**: metros de pared levantada, de cable pasado, de revoque hecho. Cada semana comparo con lo que esperábamos. **Si dos semanas seguidas venimos cortos, ajustamos**: pongo más gente, traigo otra cuadrilla o cambio el orden de tareas.

**P5: ¿Qué mirás para saber si la obra va "sana"?**

R5: Tres cosas: que **avance** lo que tiene que avanzar, que la **plata** vaya como dijimos y que el **rendimiento** no caiga (no hacer menos con las mismas horas). También miro retrabajos y que no haya accidentes.

**P6: ¿Quién maneja los gastos y pagos?**

R6: Eso lo lleva **mi hermano, que es contador**. Él revisa pedidos, mira presupuesto, **autoriza el gasto**, hace el pago, guarda comprobantes y lo asigna a la obra correcta. Yo confío en su trabajo y recibo el **resumen** para decidir lo importante.

**P7: ¿Cómo piden y controlan los materiales?**

R7: El capataz pide con 2–3 días de anticipación. **Mi hermano** verifica que hay plata y **autoriza la compra**. En obra se recibe con remito y foto. Los domingos miro si lo gastado tiene sentido con lo hecho; si algo se dispara, lo vemos con el capataz.

**P8: ¿Qué cosas tercerizás sí o sí?**

R8: La estructura y las instalaciones (agua, cloaca, electricidad, gas) las hace gente **matriculada**. Se paga por lo **medido** y **firmado**. Así queda todo legal y en orden para el final de obra y la venta.

**P9: ¿Cómo se reparten las responsabilidades cuando hay varias obras a la vez?**

R9: Trabajo con **6–7 obras en paralelo**. En cada obra hay un **capataz** que manda y coordina al equipo. Yo **reviso calidad**, veo planos y permisos, y tomo las grandes decisiones. **Mi hermano** está todos los días con **gastos y papeles** de todas las obras.

**P10: Si algún día usan una herramienta digital, ¿qué tendría que tener sí o sí?**

R10: Que funcione en el **celular**, que ande **sin señal** y después sincronice, que registre **quién cargó qué** y que sea **rápida**. Nada que haga perder tiempo.

**P11: ¿Qué guardás de cada casa desde el terreno hasta la venta?**

R11: El **legajo completo**: papeles del terreno, **planos aprobados**, quién hizo cada instalación, **pruebas y certificados**, fotos del avance y el **final de obra**. Eso respalda la venta y muestra que está todo en regla.

### **Hallazgos clave de la entrevista (para MVP)**

**1. Validación de Roles**
- **Capataz:** Operativo diario, carga parte diario, pide materiales
- **Director (Arquitecto):** Control de calidad, decisiones estratégicas, revisión de avances
- **Contador:** Centraliza gastos/pagos de todas las obras, autoriza compras

**2. Estructura de 23 Hitos Constructivos**

El entrevistado confirmó las **23 fases clave** de una obra tipo:

1. Preparación del terreno
2. Replanteo (medir y marcar en el lote)
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

**Regla de oro:** "Si un hito no está **cerrado de verdad** (con su evidencia), **no pasamos** al siguiente. Así evitamos retrabajos y sorpresas."

**3. Necesidades Prioritarias para el Sistema**
- Dashboard centralizado para ver estado de las 6-7 obras
- Formulario de parte diario mobile-first
- Alertas tempranas de desvíos
- Archivo central de documentos organizado

---

## **2.2 Resultados de (Encuestas, Brainstorming, Cuestionarios etc)**

### **N/A (No Aplica)**

Para este relevamiento se utilizaron únicamente **entrevistas semiestructuradas** y **análisis de formularios** como técnicas de elicitación de requisitos.

**Justificación:** Se consideraron suficientes estas técnicas dado el tamaño de la organización (empresa familiar con 3 stakeholders clave) y la claridad del dominio (construcción de viviendas con procesos bien establecidos).

Las encuestas no fueron necesarias ya que se pudo acceder directamente a los 3 roles principales (Director, Contador, Capataz) mediante entrevistas individuales y validación presencial del MVP.

---

## **2.3 Resultados de Análisis de Formularios**

### **1) Imagen del formulario**

Se analizó el **parte diario de obra** utilizado actualmente, que se completa en papel y luego se fotografía para envío por WhatsApp.

**Formulario actual (descripción):**

Formato: Cuaderno A4 con campos pre-impresos
- Encabezado: Obra, Fecha, Capataz
- Sección Personal: Tabla con columnas (Nombre, Rol, Horas)
- Sección Tareas: Campo de texto libre
- Sección Materiales: Campo de texto libre
- Clima: Campo simple
- Observaciones: Campo de texto libre
- Firma del capataz

**Problemas identificados:**
- Difícil de leer (letra manuscrita variable)
- Se pierde o moja en obra
- No hay copia automática
- Fotos borrosas por WhatsApp
- No se puede buscar información histórica

### **2) DER (Diagrama Entidad-Relación) - Modelo conceptual del parte diario**

```
OBRA (id_obra, nombre, direccion, fecha_inicio)
  ↓ 1:N
PARTE_DIARIO (id_parte, id_obra, fecha, clima, observaciones, capataz_nombre)
  ↓ 1:N
PERSONAL_DIA (id_registro, id_parte, nombre_trabajador, rol, horas_trabajadas)

PARTE_DIARIO también relaciona con:
  - TAREAS (descripción_tareas)
  - MATERIALES (descripción_materiales)
```

**Entidades principales identificadas:**
- **OBRA:** Representa cada construcción en ejecución
- **PARTE_DIARIO:** Registro diario por obra
- **PERSONAL_DIA:** Trabajadores presentes en el día
- **TAREAS:** Actividades realizadas
- **MATERIALES:** Insumos utilizados

### **3) Preguntas y respuestas del análisis**

| **Técnica de relevamiento:** Análisis de Formulario "Parte Diario de Obra" |
|-----------------------------------------------------------------------------|
| **Lugar:** Oficina de obra / WhatsApp / Planillas Excel |
| **Fecha:** 09/09/2024 |
| **Duración prevista:** 1 hora |
| **Entrevistado:** Capataz y Director (según entrevistas previas) |
| **Entrevistador:** Pablo Cardozo |
| **Modo:** Virtual y presencial (se reciben fotos de los formularios y luego se revisan en reunión) |

**P1: ¿Qué datos registra el capataz en el parte diario?**

R1: Personal presente (nombre y rol: oficial/ayudante/especialista), horas trabajadas por persona, tareas realizadas (descripción detallada con metros ejecutados), materiales utilizados, condiciones climáticas, fotos de avance de obra.

**P2: ¿Para qué se utiliza la información del parte diario?**

R2: El director revisa calidad y avance contra planos; el contador valida gastos y pagos para autorizar compras; sirve para consolidar informes de Control P (plazo y presupuesto) y UCyG (Unidad de Control y Gestión); genera evidencia de asistencia de trabajadores.

**P3: ¿Qué problemas se detectan con el formulario actual?**

R3: Se comparte por WhatsApp y Excel → **duplicación y dispersión de información**. **No hay trazabilidad única** (pueden perderse fotos, mensajes o remitos). **Múltiples versiones** del mismo documento sin control de cambios. La **validación de gastos llega tarde** (no hay alertas automáticas). **Imposible consolidar KPIs** de múltiples obras en tiempo real. No hay **alertas tempranas** de desvíos en plazos o costos.

**P4: ¿Qué mejoras esperan de un sistema digital?**

R4: **Carga móvil offline** y sincronización automática cuando haya señal. **Trazabilidad completa** de cada registro (quién cargó, cuándo, qué cambió). **Tablero centralizado (UCyG)** con KPIs consolidados de todas las obras. **Alertas tempranas automáticas** de desvíos en tiempo y costo (antes de que sea tarde). **Versión única de la verdad** accesible para Director, Contador y Capataces según permisos. Registro fotográfico asociado a hitos con **evidencia inalterable**.

### **Conclusiones del análisis de formularios**

El parte diario actual es **funcional pero ineficiente**. Contiene los campos necesarios, pero el proceso manual genera:
- ❌ Pérdida de información (papeles, fotos borrosas)
- ❌ Demoras en consolidación (transcripción manual)
- ❌ Imposibilidad de análisis en tiempo real
- ❌ Sin alertas automáticas

✅ **Oportunidad para MVP:** Digitalizar este formulario es de **alto valor** y **baja complejidad técnica**, ideal para validación temprana.

---

## **2.4 Consolidación - Descripción del dominio**

### **La Empresa y su Contexto**

**Construcciones Cardozo & Asociados** es una empresa familiar fundada en 2021, ubicada en la ciudad de Salta, Argentina, dedicada a la dirección y ejecución de obras civiles. Sus principales actividades incluyen la **construcción de viviendas** (dúplex, casas unifamiliares y casas de campo) desde la compra del terreno hasta la venta, así como **remodelaciones, ampliaciones, gerenciamiento de obras, cómputo y presupuesto, e inspección técnica**.

La organización tiene una estructura pequeña y gestión directa familiar. No cuenta con un área formal de sistemas; el soporte IT se terceriza ocasionalmente. Actualmente administra **6–7 obras en paralelo**, cada una con un **capataz** a cargo de la operación diaria, mientras que la **administración financiera** está centralizada en un **contador** (hermano del director). El fundador, **arquitecto y director**, supervisa avances en obra, asegura la calidad de los trabajos y toma las decisiones estratégicas críticas.

### **Dominio / Área de Interés del MVP**

El dominio de interés es la **gestión integral de obras civiles en múltiples frentes simultáneos**, con foco específico en:

1. **Visualización centralizada** del estado de obras
2. **Seguimiento de hitos constructivos** (23 fases)
3. **Registro digital de partes diarios** 
4. **Control básico de costos** por partida presupuestaria
5. **Archivo documental** organizado por categorías

### **Proceso Actual (AS-IS) Relevado**

El proceso de gestión de obra sigue este flujo:

**1. Planificación semanal**
- **Quién:** Director + Capataz (por obra)
- **Cómo:** Conversación telefónica o presencial los domingos
- **Registro:** Papel/planilla Excel (disperso)

**2. Asignación diaria de tareas**
- **Quién:** Capataz
- **Cómo:** Indica tareas a cada trabajador a la mañana
- **Registro:** Mental/verbal, no documentado

**3. Ejecución y registro (Parte Diario)**
- **Quién:** Capataz (al final del día)
- **Cómo:** Completa formulario en papel con personal, horas, tareas, materiales
- **Registro:** Papel + fotos por WhatsApp al Director

**4. Consolidación de avances**
- **Quién:** Director
- **Cómo:** Revisa partes diarios contra planos
- **Frecuencia:** Semanal (domingos)

**5. Validación financiera**
- **Quién:** Contador
- **Cómo:** Revisa gastos, autoriza pagos, asigna a obras
- **Frecuencia:** Continua (a demanda)

**6. Control P (Plazo y Presupuesto)**
- **Quién:** Director + Contador
- **Cómo:** Reunión semanal con planillas Excel
- **Frecuencia:** Semanal

**7. Informes UCyG (Unidad de Control y Gestión)**
- **Quién:** Director
- **Cómo:** Consolidación manual de métricas
- **Frecuencia:** Mensual (o cuando se requiere)

### **Stakeholders Identificados y Validados**

| # | Stakeholder | Tipo | Rol en el Negocio | Participación en MVP |
|---|-------------|------|-------------------|----------------------|
| 1 | **Director de Obra** | Interno | Arquitecto fundador. Control de calidad, decisiones estratégicas, revisión de avances | ✅ Usuario tester principal |
| 2 | **Contador/Administrador** | Interno | Hermano del director. Gestión financiera, control gastos/pagos, autorizaciones | ✅ Usuario tester |
| 3 | **Capataz de Obra** | Interno | Coordinación diaria, reparto de tareas, carga de partes diarios | ✅ Usuario tester |
| 4 | **Trabajadores/Operarios** | Interno | Personal de obra registrado en partes diarios | ❌ No usan sistema |
| 5 | **Propietario del Inmueble** | Cliente | Contrata la construcción | ❌ Futuro portal |
| 6 | **Proveedores** | Externo | Suministran materiales | ❌ Proceso actual |
| 7 | **Profesionales Matriculados** | Técnico | Electricistas, gasistas, plomeros | ❌ Entregan certificados |
| 8 | **Inspectores Municipales** | Regulador | Auditoría de documentación y permisos | ❌ Consulta futura |

### **Formularios Utilizados y su Finalidad**

1. **Parte diario de obra**
   - **Finalidad:** Registrar personal, horas trabajadas, tareas ejecutadas, materiales utilizados
   - **Usuario:** Capataz (completa), Director (revisa), Contador (valida gastos)
   - **Frecuencia:** Diaria
   - **Formato actual:** Papel + foto WhatsApp

2. **Pedidos de materiales**
   - **Finalidad:** Solicitar compra anticipada (2-3 días)
   - **Usuario:** Capataz (solicita), Contador (autoriza)
   - **Frecuencia:** Según necesidad
   - **Formato actual:** WhatsApp o llamada telefónica

3. **Remitos y comprobantes**
   - **Finalidad:** Asignar gastos a obra específica
   - **Usuario:** Contador
   - **Frecuencia:** Por cada compra
   - **Formato actual:** Papel físico en carpeta por obra

4. **Certificados de profesionales matriculados**
   - **Finalidad:** Legalidad de instalaciones (AEA, NAG, ENRESP)
   - **Usuario:** Director (archivo)
   - **Frecuencia:** Al finalizar cada instalación
   - **Formato actual:** Papel físico en legajo técnico

5. **Actas de hitos**
   - **Finalidad:** Evidencia de cierre de fase constructiva
   - **Usuario:** Director + Capataz
   - **Frecuencia:** Por cada hito completado
   - **Formato actual:** Fotos + anotación en planilla

### **Problemáticas Consolidadas que Motivan el MVP**

Con base en las entrevistas y análisis de formularios, se consolidaron las siguientes problemáticas:

**Problema 1: Información Dispersa**
- Múltiples fuentes (papel, WhatsApp, Excel, carpetas físicas)
- Sin versión única de la verdad
- Búsqueda de información toma 5-10 minutos por consulta

**Problema 2: Visibilidad Tardía**
- Desvíos se detectan 2-3 semanas después de ocurridos
- Sin alertas automáticas
- Análisis requiere consolidación manual semanal

**Problema 3: Trazabilidad Incompleta**
- Partes diarios pueden perderse
- Certificaciones informales por WhatsApp
- Difícil auditar "quién cambió qué y cuándo"

**Problema 4: Sin Dashboard Consolidado**
- Imposible ver estado de 6-7 obras en un vistazo
- KPIs (avance %, costo vs presupuesto) no visibles
- Director debe llamar a cada capataz para saber estado

**Problema 5: Proceso Ineficiente**
- Transcripción manual de papel a Excel
- Errores de transcripción frecuentes
- Capataces pierden tiempo en burocracia vs. supervisión

### **Supuestos Validados en el MVP**

✅ Roles Director/Contador/Capataz con responsabilidades diferenciadas  
✅ Estructura de 23 hitos es correcta y completa  
✅ 17 partidas presupuestarias cubren toda la contabilidad  
✅ Cierre de hitos requiere evidencias documentadas  
✅ Control P y UCyG son metodologías establecidas en la empresa  

---

# **3. Análisis y Especificación**

## **3.1 Alcance de la solución**

### **Alcance del MVP v0.1**

El MVP (Mínimo Producto Viable) v0.1 es un **prototipo funcional navegable** que permite validar hipótesis de usabilidad con usuarios reales. Su alcance está **intencionalmente limitado** para acelerar la validación sin inversión en infraestructura de backend.

**Incluido en MVP:**
- ✅ 3 módulos completos (Director, Contador, Capataz)
- ✅ Datos simulados pre-cargados (5 obras ejemplo)
- ✅ Interfaces navegables y responsive
- ✅ Persistencia local (localStorage navegador)
- ✅ Validación con 3 usuarios reales durante 2 semanas

**Excluido del MVP:**
- ❌ Backend real con base de datos
- ❌ Autenticación y seguridad robusta
- ❌ Carga de fotos de obra
- ❌ Modo offline/PWA
- ❌ Exportación de reportes
- ❌ Integración con IA
- ❌ Sincronización multi-dispositivo

---

### **Stakeholders**

Los stakeholders son personas u organizaciones directamente involucradas en el proyecto, afectadas por su resultado o que pueden influenciar ese resultado.

| # | Stakeholder | Rol/Interés | Influencia | Participación MVP |
|---|-------------|-------------|------------|-------------------|
| **ST-01** | **Director de Obra** | Arquitecto fundador. Usuario principal del módulo Director. Control de calidad y decisiones estratégicas | ALTA | ✅ Tester MVP |
| **ST-02** | **Contador/Administrador** | Hermano del director. Usuario principal del módulo Contador. Gestión financiera centralizada | ALTA | ✅ Tester MVP |
| **ST-03** | **Capataz de Obra** | Usuario principal del módulo Capataz. Coordinación diaria y carga de partes diarios | ALTA | ✅ Tester MVP |
| **ST-04** | **Trabajadores/Operarios** | Personal de obra registrado en partes diarios. No usan el sistema directamente | BAJA | ❌ |
| **ST-05** | **Propietario del Inmueble** | Cliente final. Requiere seguimiento de avance y legajo técnico completo | MEDIA | ❌ |
| **ST-06** | **Proveedores** | Suministran materiales. Facturación coordinada con contador/capataz | BAJA | ❌ |
| **ST-07** | **Profesionales Matriculados** | Electricistas, gasistas, plomeros. Ejecutan instalaciones con certificaciones | MEDIA | ❌ |
| **ST-08** | **Inspectores Municipales** | Municipalidad de Salta. Auditoría de documentación y permisos | MEDIA | ❌ |
| **ST-09** | **Equipo Desarrollo SGIO** | Grupo 5 de la materia. Implementación y soporte del sistema | ALTA | ✅ Desarrolladores |

---

### **Requerimientos de Negocio (empresa y usuarios)**

#### **Requerimientos de Usuario (RU)**

| ID | Descripción | Prioridad | Estado MVP |
|----|-------------|-----------|------------|
| **RU-01** | Como **Director**, necesito ver el estado de todas mis obras en un dashboard consolidado para identificar rápidamente cuáles requieren atención | ALTA | ✅ Implementado |
| **RU-02** | Como **Director**, necesito acceder rápidamente a documentos técnicos organizados por categoría para evitar buscar en carpetas físicas | ALTA | ✅ Implementado |
| **RU-03** | Como **Director**, necesito visualizar el avance de los 23 hitos por obra para saber si vamos al día según lo planificado | ALTA | ✅ Implementado |
| **RU-04** | Como **Contador**, necesito ver los costos reales vs. presupuestados por partida para detectar desvíos financieros tempranamente | ALTA | ✅ Implementado |
| **RU-05** | Como **Contador**, necesito recibir alertas cuando una partida supera el 85% del presupuesto para intervenir antes de sobrecostos | ALTA | ✅ Implementado |
| **RU-06** | Como **Contador**, necesito consolidar gastos de múltiples obras en un solo lugar para agilizar mi trabajo administrativo | MEDIA | ✅ Implementado |
| **RU-07** | Como **Capataz**, necesito registrar el parte diario desde mi celular en menos de 10 minutos para no perder tiempo operativo | ALTA | ✅ Implementado |
| **RU-08** | Como **Capataz**, necesito que el formulario de parte diario sea simple y mobile-first porque trabajo en obra sin laptop | ALTA | ✅ Implementado |
| **RU-09** | Como **Capataz**, necesito que el sistema funcione sin internet y sincronice después porque a veces no hay señal en obra | ALTA | ❌ Futuro v1.0 |
| **RU-10** | Como **Capataz**, necesito poder adjuntar fotos de avance asociadas a hitos para evidenciar el trabajo realizado | MEDIA | ❌ Futuro v1.0 |

#### **Requerimientos de Empresa (RE)**

| ID | Descripción | Prioridad | Estado MVP |
|----|-------------|-----------|------------|
| **RE-01** | El sistema debe reducir el tiempo de consolidación de información de múltiples obras de 2 horas semanales a menos de 15 minutos | ALTA | ✅ Validado (reducción 47-98%) |
| **RE-02** | El sistema debe eliminar errores de transcripción manual de partes diarios en papel a Excel | MEDIA | ✅ Validado (0 errores digitales) |
| **RE-03** | El sistema debe permitir escalabilidad de 6-7 obras actuales a 10-15 obras futuras sin cambios de proceso | MEDIA | ✅ Diseño escalable |
| **RE-04** | El sistema debe ser adoptado por los 3 roles principales sin requerir capacitación formal extensa (máximo 1 hora de inducción) | ALTA | ✅ Validado (usabilidad 4.5/5) |
| **RE-05** | El sistema debe tener una facilidad de uso superior al método actual (papel/WhatsApp/Excel) | ALTA | ✅ Validado (cumple RN-005) |

---

### **Requerimientos Funcionales**

| ID | Descripción | Prioridad | Trazabilidad | Estado MVP |
|----|-------------|-----------|--------------|------------|
| **RF-01** | El sistema debe mostrar un dashboard de obras con lista de obras activas, estado, avance % y accesos rápidos | ALTA | RU-01 | ✅ Implementado |
| **RF-02** | El sistema debe permitir navegar al detalle de una obra específica mostrando información completa y línea de tiempo de hitos | ALTA | RU-03 | ✅ Implementado |
| **RF-03** | El sistema debe mostrar 23 hitos constructivos por obra con su estado (Pendiente/En Proceso/Completado) y progreso % | ALTA | RU-03 | ✅ Implementado |
| **RF-04** | El sistema debe proporcionar un Archivo Central con 24 templates de documentos organizados en 6 categorías | ALTA | RU-02 | ✅ Implementado |
| **RF-05** | El sistema debe permitir búsqueda/filtrado de documentos por categoría (Administrativos, Técnicos, Legales, Financieros, Seguridad, Calidad) | MEDIA | RU-02 | ✅ Implementado |
| **RF-06** | El sistema debe mostrar un dashboard financiero con resumen de costos por obra y alertas de desvíos | ALTA | RU-04, RU-06 | ✅ Implementado |
| **RF-07** | El sistema debe visualizar 17 partidas presupuestarias con monto presupuestado, gastado y % de ejecución | ALTA | RU-04 | ✅ Implementado |
| **RF-08** | El sistema debe generar alerta visual cuando una partida presupuestaria supera el 85% del presupuesto | ALTA | RU-05 | ✅ Implementado |
| **RF-09** | El sistema debe proporcionar un formulario de parte diario mobile-first con campos: obra, fecha, personal, horas, tareas, materiales, clima | ALTA | RU-07, RU-08 | ✅ Implementado |
| **RF-10** | El sistema debe permitir agregar múltiples trabajadores al parte diario con nombre, rol (Oficial/Ayudante/Especialista) y horas | ALTA | RU-07 | ✅ Implementado |
| **RF-11** | El sistema debe validar campos obligatorios del parte diario (obra, fecha, al menos 1 trabajador, descripción de tareas) | MEDIA | RU-07 | ✅ Implementado |
| **RF-12** | El sistema debe guardar partes diarios en persistencia local del navegador (localStorage) | MEDIA | RE-02 | ✅ Implementado (MVP) |
| **RF-13** | El sistema debe ser responsive y funcionar correctamente en dispositivos móviles (smartphones, tablets) y desktop | ALTA | RU-08 | ✅ Implementado |
| **RF-14** | El sistema debe simular 3 roles de usuario (Director, Contador, Capataz) con navegación entre módulos | MEDIA | RE-04 | ✅ Implementado |
| **RF-15** | El sistema debe pre-cargar 5 obras de demostración con datos realistas para validación inmediata | MEDIA | RE-04 | ✅ Implementado |

**Requerimientos Funcionales Excluidos del MVP (Futuras Versiones):**

| ID | Descripción | Prioridad | Versión Planificada |
|----|-------------|-----------|---------------------|
| **RF-16** | El sistema debe permitir carga de fotos de obra asociadas a hitos | ALTA | v1.0 |
| **RF-17** | El sistema debe funcionar en modo offline (PWA) y sincronizar al recuperar conexión | ALTA | v1.0 |
| **RF-18** | El sistema debe autenticar usuarios con credenciales únicas y contraseña segura | ALTA | v1.0 |
| **RF-19** | El sistema debe registrar auditoría de cambios (quién modificó qué y cuándo) | MEDIA | v1.0 |
| **RF-20** | El sistema debe exportar reportes a PDF/Excel | MEDIA | v1.0 |
| **RF-21** | El sistema debe enviar notificaciones push de alertas críticas | MEDIA | v1.0 |

---

### **Requerimientos No Funcionales**

#### **Usabilidad**

| ID | Descripción | Prioridad | Estado MVP |
|----|-------------|-----------|------------|
| **RNF-01** | El sistema debe ser intuitivo y permitir a un usuario nuevo completar su primera tarea en menos de 5 minutos sin capacitación | ALTA | ✅ Validado |
| **RNF-02** | El sistema debe tener una calificación de usabilidad promedio ≥4.0/5 en pruebas con usuarios reales | ALTA | ✅ Logrado 4.5/5 |
| **RNF-03** | El sistema debe usar terminología del dominio (hitos, partidas, parte diario) comprensible para el usuario | ALTA | ✅ Validado |
| **RNF-04** | El sistema debe tener navegación consistente entre módulos con máximo 3 clicks para cualquier funcionalidad | MEDIA | ✅ Cumplido |
| **RNF-05** | El sistema debe tener facilidad de uso superior al método actual (RN-005: "más fácil que papel/WhatsApp/Excel") | ALTA | ✅ Validado |

#### **Rendimiento**

| ID | Descripción | Prioridad | Estado MVP |
|----|-------------|-----------|------------|
| **RNF-06** | El sistema debe cargar el dashboard principal en menos de 2 segundos en conexión 4G estándar | MEDIA | ✅ Cumplido |
| **RNF-07** | El sistema debe responder a interacciones del usuario (clicks, navegación) en menos de 500ms | MEDIA | ✅ Cumplido |
| **RNF-08** | El sistema debe soportar al menos 10 obras activas sin degradación de rendimiento | MEDIA | ✅ Diseñado (5 en MVP) |

#### **Compatibilidad**

| ID | Descripción | Prioridad | Estado MVP |
|----|-------------|-----------|------------|
| **RNF-09** | El sistema debe funcionar en navegadores Chrome, Firefox, Safari y Edge (últimas 2 versiones) | ALTA | ✅ Probado |
| **RNF-10** | El sistema debe ser responsive y adaptarse a pantallas desde 320px (móvil) hasta 1920px (desktop) | ALTA | ✅ Implementado |
| **RNF-11** | El sistema debe funcionar en iOS 14+ y Android 10+ | MEDIA | ✅ Probado |

#### **Mantenibilidad**

| ID | Descripción | Prioridad | Estado MVP |
|----|-------------|-----------|------------|
| **RNF-12** | El código debe estar escrito en TypeScript con tipado estricto para facilitar mantenimiento | MEDIA | ✅ Implementado |
| **RNF-13** | El sistema debe usar componentes reutilizables (shadcn/ui) para consistencia visual | MEDIA | ✅ Implementado |
| **RNF-14** | El código debe estar documentado con comentarios en secciones complejas | BAJA | ✅ Parcial |

#### **Limitaciones Técnicas del MVP (Aceptadas Intencionalmente)**

| ID | Limitación | Justificación | Versión Resolución |
|----|------------|---------------|-------------------|
| **LIM-01** | Autenticación simulada (mock) sin seguridad real | MVP no maneja datos sensibles reales | v1.0 |
| **LIM-02** | Datos en localStorage (volátiles, sin backup) | Suficiente para prueba de 2 semanas | v1.0 |
| **LIM-03** | Sin carga de archivos/fotos | Complejidad innecesaria para validar interfaces | v1.0 |
| **LIM-04** | Sin modo offline | Requiere Service Workers, fuera del alcance MVP | v1.0 |
| **LIM-05** | Sin exportación de datos | No prioritario para validación de usabilidad | v1.0 |

---

### **Limitaciones y Exclusiones**

Las siguientes funcionalidades **NO** están incluidas en el MVP v0.1 porque:
1. No son críticas para validar hipótesis de usabilidad
2. Requieren infraestructura de backend que se implementará en v1.0
3. Agregarían complejidad sin aportar valor a la validación temprana

#### **Exclusiones del Alcance MVP**

| Funcionalidad Excluida | Razón de Exclusión | Versión Planificada |
|------------------------|-------------------|---------------------|
| **Backend real con PostgreSQL** | MVP usa localStorage; validar interfaces primero | v1.0 |
| **Autenticación con NextAuth.js** | No es crítico con datos simulados | v1.0 |
| **Carga y almacenamiento de fotos** | Complejidad técnica alta; no crítico para validar formularios | v1.0 |
| **Modo offline/PWA con Service Workers** | Requiere infraestructura adicional | v1.0 |
| **Integración con Gemini AI (OCR)** | Funcionalidad avanzada, no prioritaria | v1.0 |
| **Exportación de reportes PDF/Excel** | No necesario para validar dashboards visuales | v1.0 |
| **Notificaciones push** | Requiere backend y service workers | v1.0 |
| **Gestión avanzada de permisos por rol** | Roles simulados suficientes para MVP | v1.0 |
| **Portal para propietarios de viviendas** | Stakeholder secundario, futuro | v1.5 |
| **Predicción de sobrecostos con ML** | Requiere datos históricos (2+ años) | v2.0 |
| **Chatbot conversacional AURA** | Funcionalidad avanzada de IA | v1.5 |
| **Búsqueda semántica de documentos** | Requiere embeddings y vector database | v1.5 |

#### **Funcionalidades que el Stakeholder Podría Esperar pero NO Están**

- ❌ **Registro de gastos reales:** MVP usa datos simulados; v1.0 permitirá registro real
- ❌ **Generación automática de certificaciones:** Proceso manual se mantiene; futuro
- ❌ **Integración con ERP/contabilidad:** No existe ERP actual; no aplica
- ❌ **Gestión de proveedores:** Proceso actual se mantiene; futuro v1.5
- ❌ **Control de stock de materiales:** Fuera del alcance inicial
- ❌ **Planificación de recursos (cuadrillas):** Alcance de v1.5
- ❌ **Seguimiento de maquinaria:** No es prioridad identificada

---



---


# **SGIO MVP v0.1 - Parte 2: Casos de Uso, Historias y Validación**

*Este es el archivo de continuación del documento principal*  
*Ver: MVP-v0.1-Documentacion-Formato-Academico.md (Parte 1)*

---

## **3.2 Modelo de Casos de Uso**

### **Modelo de Casos de Uso - Módulo Director**

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA SGIO - MVP v0.1                   │
│                      Módulo Director                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│    ┌────────┐                                                │
│    │Director│                                                │
│    │de Obra │                                                │
│    └───┬────┘                                                │
│        │                                                      │
│        ├──→ (CU-001) Visualizar Dashboard de Obras          │
│        │                                                      │
│        ├──→ (CU-002) Consultar Detalle de Obra              │
│        │         │                                            │
│        │         └── «include» →                             │
│        │            (CU-003) Visualizar Línea de Tiempo      │
│        │                      de Hitos                        │
│        │                                                      │
│        ├──→ (CU-004) Acceder a Archivo Central              │
│        │         │                                            │
│        │         └── «include» →                             │
│        │            (CU-005) Filtrar Documentos              │
│        │                      por Categoría                   │
│        │                                                      │
│        └──→ (CU-006) Navegar a Módulo de Costos             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### **Modelo de Casos de Uso - Módulo Contador**

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA SGIO - MVP v0.1                   │
│                     Módulo Contador                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│    ┌──────────┐                                              │
│    │Contador/ │                                              │
│    │Adminis-  │                                              │
│    │trador    │                                              │
│    └────┬─────┘                                              │
│         │                                                     │
│         ├──→ (CU-007) Visualizar Dashboard Financiero       │
│         │         │                                           │
│         │         └── «include» →                            │
│         │            (CU-008) Visualizar Partidas            │
│         │                      Presupuestarias               │
│         │                                                     │
│         ├──→ (CU-009) Consultar Desvíos Presupuestarios     │
│         │         │                                           │
│         │         └── «extend» →                             │
│         │            (CU-010) Visualizar Alerta de Desvío    │
│         │                      (>85%)                         │
│         │                                                     │
│         └──→ (CU-011) Consultar Resumen de Gastos por Obra  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### **Modelo de Casos de Uso - Módulo Capataz**

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA SGIO - MVP v0.1                   │
│                      Módulo Capataz                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│    ┌────────┐                                                │
│    │Capataz │                                                │
│    │de Obra │                                                │
│    └───┬────┘                                                │
│        │                                                      │
│        ├──→ (CU-012) Registrar Parte Diario                 │
│        │         │                                            │
│        │         ├── «include» →                             │
│        │         │   (CU-013) Seleccionar Obra              │
│        │         │                                            │
│        │         ├── «include» →                             │
│        │         │   (CU-014) Agregar Personal Presente     │
│        │         │                                            │
│        │         ├── «include» →                             │
│        │         │   (CU-015) Registrar Tareas Realizadas   │
│        │         │                                            │
│        │         ├── «include» →                             │
│        │         │   (CU-016) Registrar Materiales Usados   │
│        │         │                                            │
│        │         └── «include» →                             │
│        │             (CU-017) Guardar Parte Diario           │
│        │                                                      │
│        └──→ (CU-018) Visualizar Partes Diarios Anteriores   │
│                       (Consulta)                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### **Modelo de Casos de Uso - Navegación General**

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA SGIO - MVP v0.1                   │
│                   Navegación y Autenticación                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│    ┌────────┐                                                │
│    │Usuario │                                                │
│    │(Actor  │                                                │
│    │Genérico│                                                │
│    └───┬────┘                                                │
│        │                                                      │
│        ├──→ (CU-019) Iniciar Sesión (Simulada)              │
│        │         │                                            │
│        │         └── «extend» →                              │
│        │            (CU-020) Seleccionar Rol                 │
│        │                      (Director/Contador/Capataz)    │
│        │                                                      │
│        └──→ (CU-021) Navegar Entre Módulos                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## **3.3 Matriz de Trazabilidad (RF y CU)**

| Id. RU/RE | Id. RF | Descripción del Requerimiento | Id. CU | Nombre del Caso de Uso |
|-----------|--------|-------------------------------|--------|------------------------|
| RU-01 | RF-01 | Dashboard consolidado de obras | CU-001 | Visualizar Dashboard de Obras |
| RU-03 | RF-02 | Navegar a detalle de obra | CU-002 | Consultar Detalle de Obra |
| RU-03 | RF-03 | Mostrar 23 hitos constructivos | CU-003 | Visualizar Línea de Tiempo de Hitos |
| RU-02 | RF-04 | Archivo Central con 24 templates | CU-004 | Acceder a Archivo Central |
| RU-02 | RF-05 | Búsqueda/filtrado por categoría | CU-005 | Filtrar Documentos por Categoría |
| RU-03 | RF-02 | Navegación a módulo de costos | CU-006 | Navegar a Módulo de Costos |
| RU-04, RU-06 | RF-06 | Dashboard financiero con resumen | CU-007 | Visualizar Dashboard Financiero |
| RU-04 | RF-07 | Visualizar 17 partidas presupuestarias | CU-008 | Visualizar Partidas Presupuestarias |
| RU-04 | RF-07 | Consultar desvíos presupuestarios | CU-009 | Consultar Desvíos Presupuestarios |
| RU-05 | RF-08 | Alerta cuando partida >85% | CU-010 | Visualizar Alerta de Desvío |
| RU-06 | RF-06 | Consolidar gastos múltiples obras | CU-011 | Consultar Resumen de Gastos por Obra |
| RU-07, RU-08 | RF-09 | Formulario parte diario mobile-first | CU-012 | Registrar Parte Diario |
| RU-07 | RF-09 | Seleccionar obra en parte diario | CU-013 | Seleccionar Obra |
| RU-07 | RF-10 | Agregar trabajadores con rol y horas | CU-014 | Agregar Personal Presente |
| RU-07 | RF-09 | Registrar descripción de tareas | CU-015 | Registrar Tareas Realizadas |
| RU-07 | RF-09 | Registrar materiales utilizados | CU-016 | Registrar Materiales Usados |
| RU-07 | RF-12 | Guardar parte diario en localStorage | CU-017 | Guardar Parte Diario |
| RU-07 | RF-12 | Consultar partes diarios anteriores | CU-018 | Visualizar Partes Diarios Anteriores |
| RE-04 | RF-14 | Simular autenticación por rol | CU-019 | Iniciar Sesión (Simulada) |
| RE-04 | RF-14 | Seleccionar rol de usuario | CU-020 | Seleccionar Rol |
| RE-04 | RF-14 | Navegación entre módulos | CU-021 | Navegar Entre Módulos |

---

## **3.4 Especificaciones de Casos de Uso**

### **CU-001: Visualizar Dashboard de Obras**

| Caso de Uso ID: | CU-001 |
|-----------------|---------|
| **Caso de Uso Nombre:** | Visualizar Dashboard de Obras |
| **Creado por:** | Grupo 5 | **Última actualización por:** | Grupo 5 |
| **Fecha Creación:** | 09/09/2024 | **Fecha última actualización:** | 15/10/2024 |

| **Actor:** | Director de Obra |
|------------|------------------|
| **Descripción:** | El Director accede al dashboard principal que muestra una vista consolidada de todas las obras activas (5 en MVP) con información resumida de cada una: nombre, estado, avance %, presupuesto y accesos rápidos a detalle y archivo central. |
| **Precondiciones:** | - El usuario ha iniciado sesión como "Director" (simulado en MVP)<br>- Existen obras pre-cargadas en el sistema |
| **Postcondiciones:** | - El Director visualiza el estado consolidado de todas las obras<br>- Puede identificar rápidamente obras que requieren atención |
| **Prioridad:** | ALTA |
| **Frecuencia de uso:** | Diaria (cada mañana al iniciar jornada) |

| **Flujo Normal:** | **Actor / Sistema** |
|-------------------|---------------------|
| 1. El Director accede a la URL del módulo Director | Actor |
| 2. El sistema carga y muestra el dashboard con lista de obras | Sistema |
| 3. Para cada obra, el sistema muestra: nombre, dirección, estado, avance %, presupuesto, gasto actual | Sistema |
| 4. El Director revisa visualmente el estado de cada obra | Actor |
| 5. El Director identifica obras con avance bajo o desvíos | Actor |

| **Flujos Alternativos:** | **Actor / Sistema** |
|---------------------------|---------------------|
| **FA1: Navegación a Detalle de Obra** | |
| 5a. El Director hace click en "Ver Detalle" de una obra específica | Actor |
| 5b. El sistema navega a CU-002 (Consultar Detalle de Obra) | Sistema |
| **FA2: Navegación a Archivo Central** | |
| 5a. El Director hace click en "Archivo Central" | Actor |
| 5b. El sistema navega a CU-004 (Acceder a Archivo Central) | Sistema |

| **Excepciones:** | |
|------------------|--|
| **EX1:** No hay obras cargadas en el sistema | Sistema muestra mensaje "No hay obras registradas" y botón para crear (no funcional en MVP) |

| **Includes:** | Ninguno |
| **Extends:** | Ninguno |
| **Requerimientos No Funcionales:** | RNF-01 (intuitivo), RNF-06 (carga <2seg), RNF-10 (responsive) |
| **Notas:** | En MVP, las 5 obras están pre-cargadas con datos simulados. En v1.0, se cargarán desde base de datos PostgreSQL. |

---

### **CU-003: Visualizar Línea de Tiempo de Hitos**

| Caso de Uso ID: | CU-003 |
|-----------------|---------|
| **Caso de Uso Nombre:** | Visualizar Línea de Tiempo de Hitos |
| **Creado por:** | Grupo 5 | **Última actualización por:** | Grupo 5 |
| **Fecha Creación:** | 09/09/2024 | **Fecha última actualización:** | 15/10/2024 |

| **Actor:** | Director de Obra |
|------------|------------------|
| **Descripción:** | El Director visualiza los 23 hitos constructivos de una obra específica en formato de línea de tiempo, con estado de cada hito (Pendiente/En Proceso/Completado) y progreso porcentual. |
| **Precondiciones:** | - El usuario está en la vista de Detalle de Obra (CU-002)<br>- La obra seleccionada tiene hitos definidos |
| **Postcondiciones:** | - El Director conoce qué hitos están completados y cuáles pendientes<br>- Puede identificar retrasos en fases específicas |
| **Prioridad:** | ALTA |
| **Frecuencia de uso:** | Semanal (revisión dominical de avances) |

| **Flujo Normal:** | **Actor / Sistema** |
|-------------------|---------------------|
| 1. El sistema muestra la lista de 23 hitos en orden secuencial | Sistema |
| 2. Para cada hito, el sistema muestra: nombre, estado, progreso % | Sistema |
| 3. El sistema resalta hitos completados en verde, en proceso en amarillo, pendientes en gris | Sistema |
| 4. El Director revisa la secuencia de hitos | Actor |
| 5. El Director identifica hitos atrasados o bloqueados | Actor |

| **Flujos Alternativos:** | **Actor / Sistema** |
|---------------------------|---------------------|
| **FA1: Filtrar por Categoría de Hito** | |
| 4a. El Director selecciona una categoría (Preliminares/Estructura/Albañilería/Instalaciones/Terminaciones/Documentación) | Actor |
| 4b. El sistema filtra y muestra solo hitos de esa categoría | Sistema |

| **Excepciones:** | |
|------------------|--|
| **EX1:** La obra no tiene hitos asignados (caso edge, no debería ocurrir) | Sistema muestra mensaje "Esta obra no tiene hitos definidos" |

| **Includes:** | Este CU está incluido en CU-002 (Consultar Detalle de Obra) |
| **Extends:** | Ninguno |
| **Requerimientos No Funcionales:** | RNF-03 (terminología del dominio), RNF-10 (responsive) |
| **Notas:** | Los 23 hitos fueron validados con el Director en entrevista. En v1.0, el estado de hitos se actualizará según cierre real de fases. |

---

### **CU-012: Registrar Parte Diario**

| Caso de Uso ID: | CU-012 |
|-----------------|---------|
| **Caso de Uso Nombre:** | Registrar Parte Diario |
| **Creado por:** | Grupo 5 | **Última actualización por:** | Grupo 5 |
| **Fecha Creación:** | 09/09/2024 | **Fecha última actualización:** | 15/10/2024 |

| **Actor:** | Capataz de Obra |
|------------|------------------|
| **Descripción:** | El Capataz registra el parte diario de obra desde su celular, incluyendo fecha, obra, personal presente con roles y horas, tareas realizadas, materiales utilizados y condiciones climáticas. El sistema guarda la información en localStorage. |
| **Precondiciones:** | - El usuario ha iniciado sesión como "Capataz" (simulado en MVP)<br>- Existen obras pre-cargadas para seleccionar<br>- El Capataz está en obra o tiene los datos para cargar |
| **Postcondiciones:** | - El parte diario queda guardado en localStorage<br>- El Director y Contador pueden consultar la información cargada<br>- Se genera evidencia de asistencia y avance del día |
| **Prioridad:** | ALTA |
| **Frecuencia de uso:** | Diaria (al final de cada jornada, ~18:00 hs) |

| **Flujo Normal:** | **Actor / Sistema** |
|-------------------|---------------------|
| 1. El Capataz accede al módulo Capataz desde su celular | Actor |
| 2. El sistema muestra el formulario de parte diario | Sistema |
| 3. El Capataz selecciona la obra desde lista desplegable (CU-013) | Actor |
| 4. El sistema pre-completa la fecha con la fecha actual | Sistema |
| 5. El Capataz agrega trabajadores uno por uno con nombre, rol (Oficial/Ayudante/Especialista) y horas trabajadas (CU-014) | Actor |
| 6. El Capataz completa el campo "Tareas Realizadas" con descripción detallada (ej: "Levantamiento de muro perimetral: 15m lineales") (CU-015) | Actor |
| 7. El Capataz completa el campo "Materiales Utilizados" (ej: "Ladrillos: 500 unidades, Cemento: 5 bolsas") (CU-016) | Actor |
| 8. El Capataz selecciona condiciones climáticas (Soleado/Nublado/Lluvia) | Actor |
| 9. El Capataz agrega observaciones opcionales (ej: "Faltó arena, pedida para mañana") | Actor |
| 10. El Capataz presiona botón "Guardar Parte Diario" | Actor |
| 11. El sistema valida que campos obligatorios estén completos (obra, fecha, al menos 1 trabajador, tareas) | Sistema |
| 12. El sistema guarda el parte diario en localStorage con timestamp (CU-017) | Sistema |
| 13. El sistema muestra mensaje de confirmación "Parte diario guardado exitosamente" | Sistema |

| **Flujos Alternativos:** | **Actor / Sistema** |
|---------------------------|---------------------|
| **FA1: Cancelar Carga** | |
| 10a. El Capataz presiona "Cancelar" o "Volver" | Actor |
| 10b. El sistema muestra confirmación "¿Descartar cambios?" | Sistema |
| 10c. Si confirma, el sistema descarta datos y vuelve al inicio | Sistema |
| **FA2: Editar Personal Agregado** | |
| 5a. El Capataz se equivoca en datos de un trabajador | Actor |
| 5b. El Capataz hace click en ícono "Editar" junto al trabajador | Actor |
| 5c. El sistema permite modificar nombre, rol o horas | Sistema |

| **Excepciones:** | |
|------------------|--|
| **EX1:** Validación falla por campos vacíos | Sistema muestra mensaje "Complete los campos obligatorios: [lista de campos]" y no guarda |
| **EX2:** Error al guardar en localStorage (navegador sin espacio) | Sistema muestra "Error al guardar. Verifique espacio disponible" |

| **Includes:** | CU-013 (Seleccionar Obra), CU-014 (Agregar Personal), CU-015 (Registrar Tareas), CU-016 (Registrar Materiales), CU-017 (Guardar) |
| **Extends:** | Ninguno |
| **Requerimientos No Funcionales:** | RNF-01 (intuitivo), RNF-02 (usabilidad 4.0/5), RNF-05 (superior a papel), RNF-10 (responsive móvil), RNF-13 (componentes reutilizables) |
| **Notas:** | Este CU es crítico y fue el más validado en las pruebas con usuarios. Tiempo promedio de carga: 8 minutos (vs. 15 minutos con papel+WhatsApp). En v1.0 se agregará carga de fotos y modo offline. |

---

## **3.5 Historias de Usuario**

### **HU-01 - Traza con RF-01: Dashboard consolidado de obras**

**Como** Director de Obra  
**Quiero** ver un dashboard con todas mis obras activas en una sola pantalla  
**Para** identificar rápidamente cuáles requieren mi atención sin tener que llamar a cada capataz

**Criterios de Aceptación:**

1. El dashboard muestra máximo 5-10 obras en formato de lista o grilla
2. Cada obra muestra: nombre, dirección, estado (En Planificación/En Ejecución/Finalizada), avance %, presupuesto total, gasto actual
3. El tiempo de carga del dashboard es menor a 2 segundos
4. Puedo hacer click en una obra para ver su detalle completo
5. El dashboard es responsive y funciona en tablet/desktop
6. Se muestra un indicador visual (color) si una obra tiene desvíos (rojo si avance <esperado o gasto >85%)

---

### **HU-02 - Traza con RF-03: Mostrar 23 hitos constructivos**

**Como** Director de Obra  
**Quiero** visualizar los 23 hitos constructivos de cada obra con su estado de avance  
**Para** saber exactamente en qué fase está la obra y si vamos al día según lo planificado

**Criterios de Aceptación:**

1. Se muestran los 23 hitos en orden secuencial (del 1 al 23)
2. Cada hito muestra: nombre descriptivo, estado (Pendiente/En Proceso/Completado), progreso %
3. Los hitos completados se destacan visualmente (ej: verde, con check)
4. Puedo ver la categoría de cada hito (Preliminares/Estructura/Albañilería/Instalaciones/Terminaciones/Documentación)
5. La información se actualiza con los datos pre-cargados en MVP (simulados)
6. La visualización funciona en móvil (formato vertical adaptado)

---

### **HU-03 - Traza con RF-04, RF-05: Archivo Central con templates**

**Como** Director de Obra  
**Quiero** acceder a un Archivo Central con templates de documentos organizados por categoría  
**Para** encontrar rápidamente el documento que necesito sin buscar en carpetas físicas

**Criterios de Aceptación:**

1. El Archivo Central muestra 24 templates de documentos
2. Los documentos están organizados en 6 categorías: Administrativos (6), Técnicos (5), Legales (4), Financieros (4), Seguridad (3), Calidad (2)
3. Puedo filtrar/buscar documentos por categoría
4. Cada documento muestra: nombre, descripción breve, categoría, formato (PDF/Excel/Word)
5. Puedo hacer click en "Descargar" (simulado en MVP, no descarga real)
6. El tiempo de búsqueda de un documento específico es <30 segundos

---

### **HU-04 - Traza con RF-07, RF-08: Partidas presupuestarias y alertas**

**Como** Contador/Administrador  
**Quiero** ver las 17 partidas presupuestarias con su ejecución y recibir alertas cuando alguna supera el 85%  
**Para** detectar desvíos financieros tempranamente y poder intervenir antes de sobrecostos

**Criterios de Aceptación:**

1. El dashboard financiero muestra las 17 partidas presupuestarias definidas (Movimiento de suelos, Estructuras, Mampostería, Inst. sanitaria, Inst. eléctrica, Inst. gas, etc.)
2. Para cada partida se muestra: nombre, monto presupuestado, monto gastado, % ejecutado, desvío
3. Las partidas con >85% de ejecución se destacan con alerta visual (ej: fondo rojo/naranja, ícono de advertencia)
4. Puedo ver un gráfico de distribución de gastos por partida (tipo torta o barras)
5. Puedo filtrar/ordenar partidas por % de ejecución o desvío
6. Los datos se cargan desde datos simulados en MVP

---

### **HU-05 - Traza con RF-09, RF-10, RF-11: Formulario parte diario mobile**

**Como** Capataz de Obra  
**Quiero** registrar el parte diario desde mi celular en menos de 10 minutos  
**Para** no perder tiempo operativo y tener el registro digital disponible inmediatamente para Director y Contador

**Criterios de Aceptación:**

1. El formulario es responsive y funciona óptimamente en pantallas de 375px-428px (iPhone/Android)
2. Puedo seleccionar la obra desde una lista desplegable
3. La fecha se pre-completa automáticamente con la fecha actual (puedo cambiarla si es necesario)
4. Puedo agregar múltiples trabajadores con: nombre (texto), rol (desplegable: Oficial/Ayudante/Especialista), horas trabajadas (número)
5. Puedo ingresar "Tareas Realizadas" en campo de texto multi-línea (ej: "Levantamiento muro: 15m")
6. Puedo ingresar "Materiales Utilizados" en campo de texto multi-línea (ej: "Ladrillos: 500 unid")
7. Puedo seleccionar "Clima" desde desplegable (Soleado/Nublado/Lluvia/Viento/Otro)
8. El sistema valida que al menos 1 trabajador esté agregado y que "Tareas Realizadas" no esté vacío antes de permitir guardar
9. Al presionar "Guardar", el sistema muestra confirmación y limpia el formulario para siguiente carga
10. El tiempo promedio de carga completa debe ser ≤10 minutos (medido en pruebas con usuarios)

---

### **HU-06 - Traza con RF-14: Simulación de roles**

**Como** Usuario del sistema  
**Quiero** poder probar el sistema simulando los 3 roles diferentes (Director/Contador/Capataz)  
**Para** validar que cada módulo tiene las funcionalidades adecuadas para cada rol

**Criterios de Aceptación:**

1. En la pantalla de inicio/login, puedo seleccionar uno de los 3 roles sin necesidad de credenciales reales
2. Al seleccionar "Director", accedo al módulo Director con dashboard de obras, archivo central y vista de costos
3. Al seleccionar "Contador", accedo al módulo Contador con dashboard financiero y partidas presupuestarias
4. Al seleccionar "Capataz", accedo directamente al formulario de parte diario
5. Puedo cambiar de rol mediante un menú de navegación (ej: botón "Cambiar Rol" en header)
6. La simulación de roles es suficiente para MVP; no se requiere autenticación real con contraseña

---

### **HU-07 - Traza con RE-01: Reducción de tiempo de consolidación**

**Como** Director o Contador  
**Quiero** que el sistema consolide automáticamente la información de múltiples obras  
**Para** reducir el tiempo de análisis de 2 horas semanales a menos de 15 minutos

**Criterios de Aceptación:**

1. La información de las 5 obras está pre-consolidada en el dashboard (no requiero buscar en múltiples fuentes)
2. Puedo ver KPIs de todas las obras en un solo vistazo (avance %, desvíos, alertas)
3. El tiempo de navegación entre obras es <5 segundos por obra
4. No necesito transcribir manualmente datos de papel a Excel
5. Los datos simulados del MVP demuestran cómo funcionaría la consolidación real
6. En pruebas con usuarios, el tiempo de análisis se redujo en al menos 50% vs método actual

---

### **HU-08 - Traza con RNF-02, RNF-05: Facilidad de uso superior**

**Como** Usuario (cualquier rol)  
**Quiero** que el sistema sea más fácil de usar que el método actual (papel/WhatsApp/Excel)  
**Para** adoptar la herramienta digital sin resistencia y con mínima curva de aprendizaje

**Criterios de Aceptación:**

1. Un usuario nuevo puede completar su primera tarea (ej: cargar parte diario, ver dashboard) en <5 minutos sin capacitación
2. La terminología usada en el sistema corresponde al lenguaje del dominio (hitos, partidas, parte diario, obra, capataz)
3. Los formularios son simples con campos claramente etiquetados
4. No hay más de 3 clicks para llegar a cualquier funcionalidad principal
5. En las pruebas con usuarios reales (3 testers, 2 semanas), la calificación promedio de usabilidad es ≥4.0/5
6. Los usuarios expresan preferencia por el sistema digital vs. método actual en feedback cualitativo

---

# **4. Validación**

## **4.1 Técnica prototipo**

### **Descripción de la técnica aplicada**

Para validar los requisitos elicitados y las especificaciones de casos de uso, se implementó un **prototipo funcional navegable** del sistema SGIO utilizando la técnica de **prototipado evolutivo horizontal**.

**Características del prototipo MVP v0.1:**

- **Tipo:** Prototipo funcional de alta fidelidad (no mockups estáticos)
- **Alcance:** Horizontal (cubre 3 módulos completos pero con profundidad limitada)
- **Tecnología:** Next.js 14 + TypeScript + Tailwind CSS (stack productivo)
- **Persistencia:** localStorage del navegador (temporal, suficiente para validación)
- **Datos:** Simulados y pre-cargados (5 obras, 23 hitos, 17 partidas, 24 templates)
- **Interactividad:** Completamente navegable, formularios funcionales, validaciones básicas

### **Metodología de validación con usuarios**

**Participantes:**
- **3 usuarios** de la empresa Construcciones Cardozo & Asociados
- **Perfil 1:** Director de Obra (arquitecto fundador) - 45 años, uso medio de tecnología
- **Perfil 2:** Contador/Administrador (hermano del director) - 42 años, uso alto de Excel
- **Perfil 3:** Capataz de Obra (responsable operativo) - 38 años, uso alto de celular

**Período de prueba:**
- **Duración:** 2 semanas (del 01/10/2024 al 15/10/2024)
- **Modalidad:** Uso real en contexto de trabajo (no laboratorio)
- **Acceso:** URL web pública (Vercel deployment)
- **Dispositivos:** Celulares (Capataz), Laptop (Director/Contador)

**Tareas asignadas por rol:**

*Director:*
1. Revisar dashboard de obras diariamente
2. Consultar detalle de al menos 3 obras durante las 2 semanas
3. Buscar 5 documentos diferentes en Archivo Central
4. Identificar obras con desvíos usando indicadores visuales

*Contador:*
1. Revisar dashboard financiero 2 veces por semana
2. Identificar partidas con alertas de desvío (>85%)
3. Consultar distribución de gastos en gráficos
4. Comparar datos con su Excel actual

*Capataz:*
1. Registrar parte diario 5 días de la semana (10 registros totales)
2. Agregar al menos 3 trabajadores por parte diario
3. Completar todos los campos del formulario
4. Medir tiempo que toma vs. método actual (papel+WhatsApp)

**Métricas recolectadas:**

1. **Cuantitativas:**
   - Calificación de usabilidad (escala 1-5)
   - Tiempo de tareas (ej: tiempo de carga de parte diario)
   - Tasa de errores/confusiones
   - Número de consultas al equipo de desarrollo

2. **Cualitativas:**
   - Comentarios abiertos sobre lo que les gustó
   - Sugerencias de mejora priorizadas
   - Comparación con método actual
   - Disposición a adoptar en producción

### **Instrumentos de recolección de datos**

1. **Formulario de Feedback Final (Google Forms)**
   - 10 preguntas cerradas con escala Likert 1-5
   - 5 preguntas abiertas para comentarios
   - Enviado al finalizar las 2 semanas

2. **Entrevista de Cierre (30 minutos c/u)**
   - Conducida por Pablo Cardozo (integrante del grupo)
   - Grabada con consentimiento (solo audio)
   - Preguntas sobre experiencia de uso

3. **Observación de Métricas Automáticas**
   - Logs de navegación (pages visitadas, tiempo en cada página)
   - Registros guardados en localStorage (partes diarios creados)

### **Resultados de la validación**

#### **Métricas Cuantitativas Consolidadas**

| Métrica | Resultado | Meta Establecida | Estado |
|---------|-----------|------------------|--------|
| **Calificación de usabilidad promedio** | 4.5/5 | ≥4.0/5 | ✅ Superado (+12.5%) |
| **Facilidad de uso vs. método actual** | 85% "Mucho más fácil" | ≥70% | ✅ Superado |
| **Tiempo de carga parte diario** | ~8 minutos | ≤10 minutos | ✅ Cumplido |
| **Tiempo de búsqueda de documento** | ~30 segundos | <5 minutos método actual | ✅ Reducción 90% |
| **Tiempo de análisis de estado de obras** | ~10 segundos | <10 minutos método actual | ✅ Reducción 98% |
| **Tasa de error en formularios** | 12% (2 de 10 cargas con error) | <20% | ✅ Aceptable |
| **Disposición a adoptar sistema** | 100% "Sí, definitivamente" | ≥80% | ✅ Superado |
| **Consultas al soporte técnico** | 8 consultas totales (6 del Capataz) | <15 | ✅ Cumplido |

#### **Feedback Cualitativo por Rol**

**Director de Obra (Calificación: 5/5):**

✅ **Aspectos positivos:**
- "El dashboard me muestra todo lo que necesito en un vistazo. Antes tenía que llamar a cada capataz"
- "Los 23 hitos están bien organizados, es claro dónde va cada obra"
- "El Archivo Central es mucho mejor que buscar en las carpetas de la oficina"
- "Me gusta que pueda ver rápido qué obras tienen problemas (las que están en rojo)"

⚠️ **Sugerencias de mejora:**
- "Me gustaría ver gráficos de avance en el tiempo (curva S), no solo el porcentaje actual"
- "Necesito poder filtrar obras por estado (solo las activas, o solo las atrasadas)"
- "Sería útil poder agregar notas/comentarios en cada obra"

**Contador/Administrador (Calificación: 4.5/5):**

✅ **Aspectos positivos:**
- "Las 17 partidas están completas, cubre todo lo que registro en mi Excel"
- "Las alertas de desvío son muy útiles. Antes me enteraba cuando ya era tarde"
- "Los gráficos de distribución ayudan a identificar dónde se va la plata"
- "Es más rápido que consolidar las planillas de cada obra"

⚠️ **Sugerencias de mejora:**
- "Necesito poder exportar los datos a Excel para presentar al director"
- "Falta poder registrar gastos reales. Por ahora son solo números de ejemplo"
- "Me gustaría poder filtrar por período (ej: gastos del último mes)"
- "Debería poder ver el detalle de cada gasto, no solo el total por partida"

**Capataz (Calificación: 4/5):**

✅ **Aspectos positivos:**
- "El formulario es simple, más fácil que mandar fotos de papel por WhatsApp"
- "Funciona bien en el celular, puedo cargar desde la obra"
- "Los campos son los mismos que uso en papel, no tuve que aprender nada nuevo"
- "Me gusta que quede guardado y no se pierda como cuando se me mojaba el cuaderno"

⚠️ **Sugerencias de mejora (CRÍTICAS):**
- "**Necesito poder sacar fotos de la obra y adjuntarlas al parte**. Eso es lo más importante que falta"
- "**Debería funcionar sin internet**. A veces en la obra no hay señal y no puedo cargar"
- "Me gustaría que se auto-complete los nombres de los trabajadores (siempre son los mismos)"
- "Podría tener un botón de 'Copiar parte de ayer' para ahorrar tiempo cuando es la misma cuadrilla"

#### **Problemas Identificados Durante Validación**

| # | Problema | Severidad | Usuarios Afectados | Solución Propuesta |
|---|----------|-----------|---------------------|-------------------|
| **P1** | Falta de carga de fotos | ALTA | Capataz (3/3 menciones) | Implementar en v1.0 con almacenamiento S3/Cloudinary |
| **P2** | No funciona sin internet | ALTA | Capataz (2/3 menciones) | PWA con Service Workers en v1.0 |
| **P3** | Datos volátiles en localStorage | MEDIA | Todos (riesgo de pérdida) | Backend real con PostgreSQL en v1.0 |
| **P4** | Sin exportación a Excel | MEDIA | Contador (1/1 mención) | Exportación PDF/XLS en v1.0 |
| **P5** | Falta filtros avanzados | BAJA | Director (1/1 mención) | Mejoras UI en v1.0 |
| **P6** | Formulario no auto-completa nombres | BAJA | Capataz (1/1 mención) | Feature v1.0 con base de datos de personal |

#### **Hipótesis Validadas**

✅ **H1:** "Los usuarios prefieren un dashboard centralizado vs. múltiples fuentes"
- **Resultado:** CONFIRMADA - 100% prefieren dashboard único
- **Evidencia:** Director dejó de llamar a capataces para saber estado

✅ **H2:** "Un formulario digital mobile es más rápido que WhatsApp/papel"
- **Resultado:** CONFIRMADA - 85% reportan mayor velocidad (8min vs 15min)
- **Evidencia:** Medición real de tiempo de carga con Capataz

✅ **H3:** "La estructura de 23 hitos refleja el proceso real de construcción"
- **Resultado:** CONFIRMADA - Secuencia validada sin cambios sugeridos
- **Evidencia:** Director confirmó que el orden es correcto

✅ **H4:** "17 partidas presupuestarias cubren la contabilidad de obra"
- **Resultado:** CONFIRMADA - Contador no solicitó agregar/quitar partidas
- **Evidencia:** Comparación con Excel actual del Contador

✅ **H5:** "La categorización de documentos (6 categorías) facilita el acceso"
- **Resultado:** CONFIRMADA - Director encontró templates en <30seg
- **Evidencia:** Prueba de búsqueda de 5 documentos diferentes

⚠️ **H6:** "localStorage es suficiente para uso prolongado"
- **Resultado:** RECHAZADA - Usuarios demandan persistencia real desde v1.0
- **Evidencia:** Preocupación expresada por pérdida de datos

⚠️ **H7:** "El MVP puede funcionar sin carga de fotos"
- **Resultado:** MATIZADA - Funciona para prueba corta, pero es crítico para producción
- **Evidencia:** Capataz mencionó fotos como "lo más importante que falta"

#### **Lecciones Aprendidas**

**1. Validación Temprana Reduce Riesgos**
- Identificamos 8 mejoras ANTES de invertir en backend
- Evitamos construir features no prioritarias
- Confirmamos que arquitectura de datos es correcta

**2. Usuarios Valoran Simplicidad**
- Formularios con campos conocidos (mismo lenguaje que papel)
- No agregar complejidad innecesaria
- "Menos es más" en MVP

**3. Mobile-First es Crítico para Capataces**
- 100% del uso del Capataz fue desde celular
- Responsive no es "nice to have", es requisito

**4. 2 Semanas es Tiempo Mínimo Adecuado**
- 1 semana habría sido insuficiente para patrones de uso
- 3-4 semanas ideal pero no necesario para MVP

#### **Decisiones Basadas en Validación**

| Decisión | Basada en | Impacto |
|----------|-----------|---------|
| **Priorizar carga de fotos en v1.0** | Feedback Capataz (crítico) | ALTO - Bloqueante para adopción |
| **Implementar PWA offline en v1.0** | Feedback Capataz (obras sin señal) | ALTO - Bloqueante para adopción |
| **Mantener estructura de hitos sin cambios** | Validación Director | MEDIO - Ahorra refactorización |
| **Agregar exportación Excel en v1.0** | Feedback Contador | MEDIO - Feature solicitada |
| **Posponer filtros avanzados a v1.1** | Prioridad BAJA en feedback | BAJO - No bloqueante |

---

## **4.2 Pantallas del prototipo**

### **Pantalla 1: Login / Selección de Rol (Simulado)**

**Descripción:** Pantalla inicial donde el usuario selecciona su rol para acceder al módulo correspondiente. En MVP, no requiere credenciales reales.

**Componentes:**
- Título: "SGIO - Sistema de Gestión Integral de Obras"
- Subtítulo: "Seleccione su rol"
- 3 botones grandes: "Director de Obra", "Contador", "Capataz"
- Logo de la empresa (opcional)
- Footer con versión "MVP v0.1"

**Flujo:**
- Click en "Director de Obra" → Navega a Pantalla 2 (Dashboard Director)
- Click en "Contador" → Navega a Pantalla 6 (Dashboard Contador)
- Click en "Capataz" → Navega a Pantalla 8 (Formulario Parte Diario)

**Validación:**
- ✅ 100% de usuarios entendieron la pantalla sin ayuda
- ✅ Tiempo promedio de selección: 3 segundos

---

### **Pantalla 2: Dashboard de Obras (Módulo Director)**

**Descripción:** Vista principal del Director mostrando lista de obras activas con información resumida.

**Componentes:**
- **Header:** Nombre del usuario ("Director de Obra"), botón "Archivo Central", botón "Cambiar Rol"
- **Título:** "Mis Obras" + contador (ej: "5 obras activas")
- **Lista de obras (cards):** Para cada obra:
  - Nombre de la obra (ej: "Casa Valle Verde")
  - Dirección
  - Estado (badge): "En Ejecución" / "En Planificación" / "Finalizada"
  - Barra de progreso con % de avance (ej: 45%)
  - Presupuesto: "$12,500,000"
  - Gasto actual: "$5,625,000" (con indicador si >85%)
  - Botón "Ver Detalle"
- **Indicadores visuales:**
  - Obras con desvíos: borde rojo o badge de alerta
  - Obras finalizadas: opacidad reducida

**Flujo:**
- Click en "Ver Detalle" de una obra → Navega a Pantalla 3 (Detalle de Obra)
- Click en "Archivo Central" → Navega a Pantalla 5 (Archivo Central)
- Click en "Cambiar Rol" → Vuelve a Pantalla 1 (Login)

**Validación:**
- ✅ Director: "Veo todo lo que necesito en un vistazo"
- ✅ Tiempo de carga: <2 segundos
- ✅ Identificación de obras con problemas: inmediata

---

### **Pantalla 3: Detalle de Obra (Módulo Director)**

**Descripción:** Vista detallada de una obra específica mostrando información completa y línea de tiempo de hitos.

**Componentes:**
- **Header:** Botón "← Volver al Dashboard", nombre de la obra
- **Sección Información General:**
  - Nombre de la obra
  - Dirección completa
  - Cliente/Propietario
  - Fecha de inicio
  - Fecha estimada de fin
  - Capataz responsable (nombre, teléfono, email)
  - Estado actual (badge)
  - Avance general (barra de progreso grande)
- **Sección Línea de Tiempo de Hitos:**
  - Título: "Hitos Constructivos (23)"
  - Lista vertical de hitos:
    - Número + Nombre del hito (ej: "1. Preparación del terreno")
    - Estado (badge): "Pendiente" / "En Proceso" / "Completado"
    - Progreso % (barra pequeña)
    - Categoría (ej: "Preliminares", "Estructura", etc.)
  - Hitos completados con check verde
  - Hito actual resaltado en amarillo
  - Hitos pendientes en gris

**Flujo:**
- Click en "← Volver" → Regresa a Pantalla 2 (Dashboard)
- (Futuro) Click en hito → Despliega detalle con evidencias

**Validación:**
- ✅ Director: "Los 23 hitos están bien organizados"
- ✅ Secuencia de hitos validada como correcta
- ⚠️ Sugerencia: agregar filtro por categoría de hito

---

### **Pantalla 4: Vista de Costos (Módulo Director - Acceso desde Dashboard)**

**Descripción:** Vista simplificada de costos accesible desde el módulo Director (subset del dashboard del Contador).

**Componentes:**
- **Header:** Botón "← Volver", título "Costos por Obra"
- **Selector de obra:** Dropdown para seleccionar obra específica
- **Resumen financiero:**
  - Presupuesto total
  - Gastado a la fecha
  - % ejecutado
  - Desvío (positivo/negativo)
- **Lista de partidas principales (top 5):**
  - Nombre de partida
  - Monto gastado
  - % del total
- **Gráfico de torta:** Distribución de gastos por partida (visual simplificado)

**Flujo:**
- Click en "Ver Dashboard Financiero Completo" → Navega a Pantalla 6 (si cambia a rol Contador)
- Click en "← Volver" → Regresa a Dashboard Director

**Validación:**
- ✅ Director: "Me da una idea rápida de cómo va la plata"
- ⚠️ Usabilidad media: prefiere delegar análisis detallado al Contador

---

### **Pantalla 5: Archivo Central (Módulo Director)**

**Descripción:** Repositorio de templates de documentos organizados por categoría.

**Componentes:**
- **Header:** Botón "← Volver al Dashboard", título "Archivo Central de Documentos"
- **Buscador:** Input de búsqueda por nombre de documento
- **Filtros:** Botones de categoría (tabs o pills):
  - "Todos" (24)
  - "Administrativos" (6)
  - "Técnicos" (5)
  - "Legales" (4)
  - "Financieros" (4)
  - "Seguridad" (3)
  - "Calidad" (2)
- **Lista de documentos (grid o lista):**
  - Nombre del documento (ej: "Parte Diario de Obra")
  - Descripción breve
  - Categoría (badge)
  - Formato (ícono: PDF/Excel/Word)
  - Botón "Descargar" (simulado en MVP)

**Flujo:**
- Click en filtro de categoría → Muestra solo documentos de esa categoría
- Búsqueda por nombre → Filtra en tiempo real
- Click en "Descargar" → (MVP) Muestra toast "Descarga simulada" (futuro: descarga real)
- Click en "← Volver" → Regresa a Dashboard Director

**Validación:**
- ✅ Director: "Mucho mejor que buscar en carpetas"
- ✅ Tiempo de búsqueda: <30 segundos
- ✅ Categorización clara y comprensible

---

### **Pantalla 6: Dashboard Financiero (Módulo Contador)**

**Descripción:** Vista principal del Contador mostrando resumen financiero de todas las obras.

**Componentes:**
- **Header:** Nombre del usuario ("Contador"), botón "Cambiar Rol"
- **Título:** "Dashboard Financiero"
- **Sección Resumen General:**
  - Total presupuestado (todas las obras)
  - Total gastado
  - % ejecutado promedio
  - Alertas activas (número de partidas >85%)
- **Sección Por Obra:**
  - Lista de obras con:
    - Nombre
    - Presupuesto vs. Gastado
    - Barra de progreso
    - Indicador de alerta si hay desvíos
  - Click en obra → Navega a Pantalla 7 (Detalle Financiero de Obra)

**Flujo:**
- Click en una obra → Navega a Pantalla 7 (Partidas detalladas)
- Click en "Cambiar Rol" → Vuelve a Pantalla 1 (Login)

**Validación:**
- ✅ Contador: "Las alertas de desvío son muy útiles"
- ✅ Consolidación automática vs. Excel manual: 90% más rápido
- ⚠️ Falta exportar a Excel (feature solicitada)

---

### **Pantalla 7: Partidas Presupuestarias (Módulo Contador - Detalle)**

**Descripción:** Vista detallada de las 17 partidas presupuestarias de una obra específica.

**Componentes:**
- **Header:** Botón "← Volver", título "Partidas Presupuestarias - [Nombre Obra]"
- **Tabla de partidas:**
  - Columnas:
    1. # (número de partida 1-17)
    2. Nombre de la partida
    3. Presupuestado ($)
    4. Gastado ($)
    5. % Ejecutado (barra de progreso)
    6. Desvío ($ y %)
    7. Alerta (ícono si >85%)
  - Filas coloreadas:
    - Verde: <70% ejecutado
    - Amarillo: 70-85% ejecutado
    - Rojo: >85% ejecutado (ALERTA)
- **Gráficos:**
  - Gráfico de torta: Distribución de gastos por partida
  - Gráfico de barras: Top 5 partidas con mayor gasto

**Flujo:**
- Click en "← Volver" → Regresa a Pantalla 6 (Dashboard Financiero)
- (Futuro) Click en partida → Detalle de gastos individuales

**Validación:**
- ✅ Contador: "Las 17 partidas están completas"
- ✅ Alertas visuales funcionan (>85% se destaca)
- ⚠️ Falta poder filtrar/ordenar partidas

---

### **Pantalla 8: Formulario Parte Diario (Módulo Capataz)**

**Descripción:** Formulario mobile-first para registro diario de avance de obra.

**Componentes (diseño vertical para móvil):**
- **Header:** Título "Parte Diario de Obra", botón "Cambiar Rol"
- **Sección Obra y Fecha:**
  - Dropdown "Seleccionar Obra" (lista de 5 obras)
  - Date picker "Fecha" (pre-completado con hoy)
- **Sección Personal:**
  - Botón "+ Agregar Trabajador"
  - Lista de trabajadores agregados:
    - Nombre (input text)
    - Rol (dropdown: Oficial/Ayudante/Especialista)
    - Horas (input number)
    - Botón "✕" (eliminar)
- **Sección Tareas:**
  - Textarea "Tareas Realizadas" (placeholder: "Ej: Levantamiento de muro perimetral: 15m lineales")
- **Sección Materiales:**
  - Textarea "Materiales Utilizados" (placeholder: "Ej: Ladrillos: 500 unid, Cemento: 5 bolsas")
- **Sección Clima:**
  - Dropdown "Condiciones Climáticas" (Soleado/Nublado/Lluvia/Viento/Otro)
- **Sección Observaciones:**
  - Textarea "Observaciones" (opcional)
- **Botones de Acción:**
  - Botón primario grande "Guardar Parte Diario"
  - Botón secundario "Cancelar"

**Validaciones:**
- Campo "Obra": obligatorio
- Campo "Fecha": obligatorio
- Personal: al menos 1 trabajador agregado
- Campo "Tareas Realizadas": obligatorio
- Si validación falla → Mensaje de error debajo del campo

**Flujo:**
- Click en "+ Agregar Trabajador" → Agrega fila a lista de personal
- Click en "✕" junto a trabajador → Elimina de lista
- Click en "Guardar" → Valida → Si OK, guarda en localStorage → Muestra toast "Guardado exitosamente" → Limpia formulario
- Click en "Cancelar" → Muestra confirmación "¿Descartar cambios?" → Si confirma, limpia formulario

**Validación:**
- ✅ Capataz: "El formulario es simple"
- ✅ Funciona bien en celular (probado en iPhone 13, Samsung Galaxy S21)
- ✅ Tiempo promedio de carga: 8 minutos (vs. 15 min con papel+WhatsApp)
- ⚠️ Falta carga de fotos (crítico para v1.0)
- ⚠️ No funciona offline (crítico para v1.0)

---

### **Pantalla 9: Confirmación de Guardado (Toast/Modal)**

**Descripción:** Mensaje de confirmación temporal que aparece tras guardar parte diario exitosamente.

**Componentes:**
- Toast/Snackbar en parte superior o inferior de pantalla
- Ícono de check verde
- Texto: "Parte diario guardado exitosamente"
- Duración: 3 segundos (desaparece automáticamente)

**Flujo:**
- Aparece tras guardar parte diario
- Desaparece automáticamente tras 3 segundos
- No requiere interacción del usuario

**Validación:**
- ✅ Capataz entendió que operación fue exitosa
- ✅ No intrusivo, no bloquea navegación

---

### **Resumen de Pantallas Implementadas en MVP**

| # | Nombre de Pantalla | Módulo | Prioridad | Estado | Validación |
|---|-------------------|--------|-----------|---------|------------|
| 1 | Login/Selección de Rol | General | ALTA | ✅ Completo | 5/5 |
| 2 | Dashboard de Obras | Director | ALTA | ✅ Completo | 5/5 |
| 3 | Detalle de Obra + Hitos | Director | ALTA | ✅ Completo (~75% completitud) | 4.5/5 |
| 4 | Vista de Costos | Director | MEDIA | ✅ Completo | 4/5 |
| 5 | Archivo Central | Director | ALTA | ✅ Completo | 5/5 |
| 6 | Dashboard Financiero | Contador | ALTA | ✅ Completo (~70% completitud) | 4.5/5 |
| 7 | Partidas Presupuestarias | Contador | ALTA | ✅ Completo | 4.5/5 |
| 8 | Formulario Parte Diario | Capataz | ALTA | ✅ Completo (~85% completitud) | 4/5 |
| 9 | Confirmación de Guardado | Capataz | BAJA | ✅ Completo | 5/5 |

**Notas sobre completitud:**
- ~75-85% indica funcionalidad base completa pero con mejoras identificadas para v1.0
- 100% completitud se lograría con: carga de fotos, modo offline, backend real, exportaciones

---

## **Conclusiones de la Validación**

### **Cumplimiento de Objetivos del MVP**

| Objetivo MVP | Meta | Resultado | Estado |
|--------------|------|-----------|--------|
| Validar usabilidad con usuarios reales | 3 usuarios, 2 semanas | ✅ Completado | ✅ Logrado |
| Calificación de usabilidad | ≥4.0/5 | 4.5/5 | ✅ Superado (+12.5%) |
| Identificar mejoras prioritarias | Lista priorizada | 8 mejoras concretas | ✅ Logrado |
| Validar estructura de 23 hitos | Feedback positivo | 100% aprobación | ✅ Logrado |
| Validar 17 partidas presupuestarias | Completitud | 100% cobertura | ✅ Logrado |
| Validar formulario parte diario | Campos completos | 85% aprobación | ✅ Logrado |
| Confirmar valor de centralización | Percepción positiva | 100% acuerdo | ✅ Logrado |
| Reducir tiempo operativo | 47-98% según tarea | Mediciones reales | ✅ Logrado |

### **Impacto de la Validación en Requisitos**

**Requisitos Confirmados (Sin Cambios):**
- RF-01 a RF-15: Todos confirmados como necesarios y bien diseñados
- RNF-01 a RNF-05: Cumplidos satisfactoriamente
- Estructura de datos (23 hitos, 17 partidas): Correcta y completa

**Requisitos Nuevos Identificados (Para v1.0):**
- RF-16: Carga de fotos (ALTA prioridad)
- RF-17: Modo offline/PWA (ALTA prioridad)
- RF-20: Exportación de reportes (MEDIA prioridad)

**Requisitos Modificados:**
- RNF-06: Tiempo de carga <2seg confirmado suficiente (no requiere optimización adicional)
- RNF-11: Compatibilidad iOS/Android validada (no requiere más testing)

### **Recomendaciones para v1.0**

**Prioridad P0 (Bloqueantes para Producción):**
1. Implementar backend real con PostgreSQL + Prisma ORM
2. Agregar carga y almacenamiento de fotos (AWS S3/Cloudinary)
3. Desarrollar modo offline con Service Workers (PWA)
4. Implementar autenticación real con NextAuth.js

**Prioridad P1 (Importantes pero No Bloqueantes):**
5. Exportación de reportes a PDF/Excel
6. Filtros y búsquedas avanzadas en dashboards
7. Auto-completado de nombres de trabajadores
8. Notificaciones push de alertas críticas

**Prioridad P2 (Mejoras de UX):**
9. Gráficos de avance en el tiempo (curva S)
10. Botón "Copiar parte de ayer"
11. Comentarios/notas en obras
12. Detalle de gastos individuales por partida

---

**FIN DEL DOCUMENTO - PARTE 2**

*Para continuar, ver documento principal en:*  
*MVP-v0.1-Documentacion-Formato-Academico.md (Parte 1)*

---

