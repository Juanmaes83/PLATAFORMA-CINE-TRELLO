# Plan de Desarrollo: Plataforma SaaS de Gestión de Producción Cinematográfica
## Departamento de Arte & Producción

---

## Resumen Ejecutivo
Crear un documento técnico completo (Bloque 1 + Bloque 2) para una plataforma web colaborativa tipo Trello especializada en la gestión del Departamento de Arte y su interacción con Producción en rodajes de alto nivel (Netflix/Disney/HBO).

---

## Contexto de Entrada (Proporcionado por el Cliente)
El usuario ha proporcionado una especificación funcional y arquitectónica detallada que incluye:
- Dominio específico: 4 subdepartamentos (Graphics, Props, Set Decoration, Construction)
- Requisitos funcionales: Costes, Responsables, Dashboards por rol, Calendarios/Tiempos, Informes descargables
- Arquitectura de referencia: Microservicios, PostgreSQL+JSONB, React SPA, WebSockets, CQRS
- Flujos de trabajo colaborativos: Desglose de guión → tarjetas, coordinación entre subdepartamentos, continuidad en rodaje, control presupuestario
- Motor de automatización estilo Butler
- Integraciones: Frame.io, AutoCAD, Adobe CC, Slack/Teams, ERP
- Seguridad RBAC

## Etapas de Ejecución

### Stage 1 — Investigación de Referencias
**Objetivo:** Analizar Trello.com públicamente y recopilar estándares de la industria cinematográfica.
**Skill:** deep-research-swarm (investigación web especializada)
**Subagentes:**
1. `Investigador_Trello`: Analizar trello.com — estructura de tableros/listas/tarjetas, bandeja de entrada, vistas calendario/planificador, reverso de tarjetas, Power-Ups, automatización Butler.
2. `Investigador_Industria`: Investigar estándares Netflix/Disney/HBO para gestión de producción, flujos de trabajo del departamento de arte, herramientas existentes (Movie Magic, SyncOnSet, etc.).
**Output:** `stage1_research_brief.md` con hallazgos validados y cruzados.

### Stage 2 — Diseño Arquitectónico y Funcional (Bloque 1)
**Objetivo:** Desarrollar la Visión Arquitectónica y Funcional completa.
**Skill:** report-writing (para estructuración del documento técnico)
**Subagentes:**
1. `Arquitecto_Datos`: Diseñar modelo de datos extendido (PostgreSQL+JSONB), entidades, relaciones, índices GIN, esquema de cards con art_metadata.
2. `Arquitecto_Frontend`: Proponer estructura de front-end React, módulos de navegación, vistas Kanban específicas por subdepartamento, tarjeta extendida.
3. `Arquitecto_Flujos`: Diseñar conexión visual Desglose de Guión → tarjetas automáticas, flujos colaborativos Arte-Producción.
**Input:** Stage 1 research + contexto completo del usuario.
**Output:** `stage2_bloque1_arquitectura.md` — sección completa del Bloque 1.

### Stage 3 — Plan de Desarrollo por Fases (Bloque 2)
**Objetivo:** Crear el Roadmap técnico secuencial (MVP, Fase 2, Fase 3).
**Skill:** report-writing
**Subagentes:**
1. `Planificador_Roadmap`: Definir fases, objetivos, funcionalidades core, stack tecnológico recomendado, tiempos estimados (3-4 devs Full Stack), entregables clave.
**Input:** Stage 2 arquitectura + research inicial.
**Output:** `stage3_bloque2_roadmap.md` — sección completa del Bloque 2.

### Stage 4 — Ensamblaje y Redacción Final
**Objetivo:** Combinar Bloque 1 + Bloque 2 en un documento markdown cohesivo, profesional y con criterio cinematográfico.
**Skill:** report-writing
**Subagente:** `Editor_Final`
**Input:** Stage 2 + Stage 3 outputs.
**Output:** `/mnt/agents/output/plataforma_gestion_arte_cine.md`

### Stage 5 — Conversión a DOCX y Entrega
**Objetivo:** Convertir el documento final markdown a formato Word (.docx) profesional.
**Skill:** docx
**Subagente:** `Productor_DOCX`
**Input:** Markdown final.
**Output:** `/mnt/agents/output/plataforma_gestion_arte_cine.docx`

---

## Reglas de Ejecución
- Progresive loading: Solo cargar skills cuando cada stage comience.
- File propagation: Todos los outputs de una etapa se pasan explícitamente a la siguiente.
- Validación: Cada stage debe completarse y validarse antes de iniciar el siguiente.
- Lenguaje: Español (todos los subagentes deben operar en español).

## Criterios de Calidad
- Nivel de detalle: Arquitectura de software senior, no genérica.
- Criterio cinematográfico: Jerga correcta del departamento de arte ("hero prop", "dressing", "breakaway", "scenic painting", "attrezzista").
- Referencias a Trello: Deben ser específicas y demostrar análisis real de la interfaz.
- Stack tecnológico: Justificado y realista para un equipo de 3-4 devs.
- Tiempos: Estimaciones realistas con buffer para complejidad del dominio.
