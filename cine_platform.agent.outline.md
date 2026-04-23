# Plataforma SaaS de Gestión de Producción Cinematográfica: Arquitectura y Roadmap de Desarrollo

## Executive Summary
### Alcance del documento
#### Propuesta de plataforma web colaborativa especializada en el Departamento de Arte y su interacción con Producción
#### Análisis de referencia Trello adaptado al dominio cinematográfico de alto nivel (Netflix/Disney/HBO)
#### Estructura en dos bloques: Visión Arquitectónica (Bloque 1) y Roadmap de Desarrollo (Bloque 2)

## 1. Bloque 1: Visión Arquitectónica y Funcional (~5000 palabras, 4 tablas, 2 diagramas)
### 1.1 Personalización de la Mecánica Trello para el Nicho Cinematográfico
#### 1.1.1 Análisis de la arquitectura visual de Trello: tableros, listas, tarjetas, drag-and-drop, y por qué funciona para equipos creativos
#### 1.1.2 Adaptación del paradigma Kanban a los flujos de trabajo de los cuatro subdepartamentos de Arte (Graphics, Props, Set Decoration, Construction)
#### 1.1.3 Identificación de las extensiones obligatorias que Trello genérico no cubre: metadatos de escena, continuidad, aprobación presupuestaria, y trazabilidad de props
#### 1.1.4 Lecciones extraídas del análisis de Trello: simplicidad visual, Power-Ups como modelo de extensibilidad, Butler como motor de automatización

### 1.2 Modelo de Datos Extendido para los 4 Subdepartamentos
#### 1.2.1 Diseño de la tabla principal `cards` en PostgreSQL con soporte JSONB para campos dinámicos de arte
#### 1.2.2 Especificación de `art_metadata` por subdepartamento: estructuras JSONB para Graphics, Props, Set Decoration y Construction
#### 1.2.3 Entidades complementarias clave: `lists` (con `workflow_type`), `script_scenes`, `suppliers`, `locations`, y relaciones de cardinalidad
#### 1.2.4 Estrategia de indexación GIN sobre JSONB para búsquedas rápidas por metadatos cinematográficos
#### 1.2.5 Gestión de campos financieros controlados por rol: `estimated_cost`, `actual_cost`, `approval_status`, y flujo de aprobación Arte-Producción

### 1.3 Conexión Visual: Desglose de Guión y Creación Automática de Tarjetas
#### 1.3.1 Arquitectura del módulo "Desglose de Guión": visor interactivo con OCR/NLP para resaltado de entidades
#### 1.3.2 Flujo de generación automática: selección de texto en guión → POST `/api/breakdown/create-{resource}` → tarjeta en tablero destino
#### 1.3.3 Vinculación bidireccional entre `script_scenes` y `cards` mediante tabla puente `scene_cards`
#### 1.3.4 Sincronización automática de referencias de escena (`script_reference`, `scene_numbers[]`) en tarjetas generadas

### 1.4 Estructura del Front-End y Vistas Kanban Especializadas
#### 1.4.1 Arquitectura de navegación global: Dashboard de Proyectos → Desglose de Guión → Departamento de Arte → Producción → Archivos
#### 1.4.2 Diseño de vistas Kanban específicas por subdepartamento: columnas predefinidas, campos visibles en tarjeta, y color coding
#### 1.4.3 Tablero de GRAPHICS: flujo Briefing → En Diseño → Revisión → Aprobado → Archivo Entregado
#### 1.4.4 Tablero de PROPS: flujo Necesidad → Búsqueda → Adquirido → Taller → En Set → Devuelto, con soporte para Hero Props
#### 1.4.5 Tablero de SET DECORATION: flujo Concepto → Selección → Reservado → Montaje → Desmontaje, con planos de dressing
#### 1.4.6 Tablero de CONSTRUCTION: flujo Planos → Despiece → En Construcción → Acabados → Montaje → Desmontado, con visor CAD
#### 1.4.7 Diseño del "Reverso de Tarjeta Extendida": panel lateral no modal con Ficha Técnica, Checklist de Rodaje, Adjuntos, Panel Financiero (RBAC), e Historial

## 2. Bloque 2: Plan de Desarrollo por Fases (Roadmap) (~4000 palabras, 3 tablas, 1 diagrama)
### 2.1 Fase 1: MVP — Núcleo Colaborativo y Kanban Especializado (~8-10 semanas)
#### 2.1.1 Objetivo principal: validar la mecánica de tableros Kanban con los cuatro subdepartamentos en un entorno de prueba real
#### 2.1.2 Funcionalidades core: autenticación RBAC, tableros Kanban con drag-and-drop, tarjetas extendidas con JSONB básico, adjuntos S3/MinIO, comentarios en tiempo real
#### 2.1.3 Stack tecnológico recomendado: React + TypeScript (front), Node.js/NestJS o Go (back), PostgreSQL + JSONB, Redis (sesiones), WebSockets (Socket.io)
#### 2.1.4 Tiempo estimado con equipo de 3-4 desarrolladores Full Stack: 8-10 semanas (sprint 0 de arquitectura + 6 sprints de desarrollo)
#### 2.1.5 Entregable clave: MVP funcional con un subdepartamento piloto (Props o Set Dec) operativo end-to-end

### 2.2 Fase 2: Integración y Automatización (~10-12 semanas)
#### 2.2.1 Objetivo principal: conectar Arte con Producción mediante flujos de aprobación presupuestaria y automatización tipo Butler
#### 2.2.2 Funcionalidades core: módulo de Presupuestos y Compras, flujo de aprobación con tarjetas espejo, motor de automatización con reglas de dominio cinematográfico, integración con planificador de rodaje básico
#### 2.2.3 Stack tecnológico adicional: Elasticsearch (búsqueda full-text), colas de trabajos (Bull/Redis), motor de reglas (JSON Rules Engine o n8n embebido)
#### 2.2.4 Tiempo estimado con equipo de 3-4 desarrolladores Full Stack: 10-12 semanas (incluye refinamiento de UX post-MVP)
#### 2.2.5 Entregable clave: plataforma con cuatro subdepartamentos operativos, control presupuestario básico, y automatizaciones críticas activas

### 2.3 Fase 3: Escala, Informes y Enterprise (~12-16 semanas)
#### 2.3.1 Objetivo principal: convertir la plataforma en una solución enterprise lista para estándares Netflix/Disney/HBO
#### 2.3.2 Funcionalidades core: vista Línea de Tiempo/Gantt con dependencias, módulo Desglose de Guión con OCR, generación de informes descargables (PDF/Excel), integraciones con Frame.io, AutoCAD viewer, Adobe CC, Slack/Teams, ERP (SAP/QuickBooks)
#### 2.3.3 Stack tecnológico adicional: MongoDB (para logs y datos no estructurados), microservicios desacoplados (opcional), CDN optimizado para assets pesados, soporte multi-idioma
#### 2.3.4 Tiempo estimado con equipo de 3-4 desarrolladores Full Stack: 12-16 semanas (incluye testing de carga y seguridad TPN)
#### 2.3.5 Entregable clave: versión 1.0 enterprise con compliance de seguridad, integraciones clave, y generación de informes de producción

### 2.4 Resumen del Roadmap y Consideraciones de Equipo
#### 2.4.1 Diagrama de Gantt simplificado del roadmap total: 30-38 semanas de desarrollo activo
#### 2.4.2 Composición óptima del equipo de 3-4 desarrolladores: especialización front/back/DevOps vs. full-stack generalista
#### 2.4.3 Riesgos críticos del roadmap: complejidad del JSONB, rendimiento de WebSockets en sets de rodaje, adopción por equipos no técnicos, compliance de seguridad
#### 2.4.4 Métricas de éxito por fase: DAU, tiempo de creación de tarjeta, tasa de aprobación de gastos, reducción de incidencias de continuidad

# References
## trello_analysis.md
- **Type**: Investigación UX/UI
- **Description**: Análisis arquitectónico detallado de Trello.com
- **Path**: /mnt/agents/output/research/trello_analysis.md

## industria_cine_analysis.md
- **Type**: Investigación de dominio
- **Description**: Análisis de herramientas, estándares y flujos de la industria cinematográfica
- **Path**: /mnt/agents/output/research/industria_cine_analysis.md
