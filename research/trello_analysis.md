# Analisis Tecnico Arquitectonico de la Interfaz de Trello (trello.com)

> **Fecha de analisis:** Junio 2025
> **Proposito:** Documentacion base para el diseno de una plataforma vertical de produccion cinematografica con mecanica tipo Trello
> **Metodologia:** Inspeccion directa de la interfaz publica, navegacion de flujos, y recopilacion de documentacion oficial de Atlassian

---

## 1. RESUMEN EJECUTIVO DEL ANALISIS

Trello es una plataforma de gestion de proyectos basada en el paradigma **Kanban digital**, propiedad de Atlassian, que organiza el trabajo en tres niveles jerarquicos: **Workspaces > Boards > Lists > Cards**. Su interfaz publica (trello.com) presenta una arquitectura de producto madura, con una landing page orientada a la conversion, un sistema de navegacion global con header fijo, y un modelo freemium bien definido con cuatro planes (Free, Standard, Premium, Enterprise).

Los pilares arquitectonicos identificados son:
1. **Simplicidad visual**: Tableros con fondos personalizables, listas verticales, tarjetas blancas con sombras sutiles.
2. **Flexibilidad estructural**: El usuario define sus propios flujos de trabajo mediante la disposicion horizontal de listas y la movilidad de tarjetas via drag-and-drop.
3. **Extensibilidad via Power-Ups**: Marketplace de +200 integraciones que transforman tableros basicos en hubs de trabajo especializados.
4. **Automatizacion no-code integrada**: Butler, el motor de reglas, botones y comandos programados que elimina tareas repetitivas.
5. **Sistema de captura unificado (Inbox)**: Novedad de 2024-2025 que permite capturar tareas desde email, Slack, Microsoft Teams y mensajes de voz hacia un inbox personal antes de organizarlas en tableros.
6. **Multiples vistas de datos**: Board (Kanban), Calendar, Timeline, Table, Dashboard, Map — disponibles segun el plan de pago.

Para una plataforma cinematografica, los componentes mas replicables son: la estructura Board/List/Card adaptada a Escenas/Secuencias/Tomas, el sistema de Inbox para capturar notas de set, el sistema de etiquetas para clasificar por locacion/personaje/hora del dia, las Custom Fields para metadatos tecnicos (lente, ISO, duracion), y las vistas Timeline/Calendar para planificar rodajes.

---

## 2. ANALISIS DE LA LANDING PAGE (trello.com) Y VALUE PROPOSITION

### 2.1 Estructura Visual de la Landing Page

La landing page de Trello (https://trello.com) presenta una arquitectura de pagina unica (single-page) con scroll vertical extenso y secciones bien diferenciadas:

#### Header Global (Sticky)
- **Altura aproximada:** ~60px
- **Background:** Blanco (#FFFFFF) con borde inferior sutil
- **Componentes izquierda:** Logo Atlassian Trello (icono cuadrado azul + wordmark "Trello")
- **Navegacion central (dropdowns):**
  - *Features*: despliega sub-menu con Inbox, Planner, Automation, Power-Ups, Templates, Integrations
  - *Solutions*: despliega casos de uso por tipo de equipo (Marketing, Product, Engineering, Design, Startups, Remote)
  - *Plans*: despliega comparativa de planes
  - *Resources*: guias, webinars, customer stories, developers, help
- **Navegacion derecha:** "Log in" (texto plano) + "Get Trello for free" (boton primario azul relleno, ~#0052CC)
- **Banner superior opcional:** En la visita se observo un banner celeste claro con anuncio de "AI features now available for all Premium and Enterprise" con link "Learn more"

#### Hero Section (Above the fold)
- **Layout:** Dos columnas (~55% texto / ~45% imagen)
- **Background:** Gradiente muy sutil gris-azulado (#F4F5F7 aproximado)
- **Headline principal:** "Capture, organize, and tackle your to-dos from anywhere." — Tipografia grande, sans-serif, peso bold, color oscuro (#172B4D)
- **Subheadline:** "Escape the clutter and chaos--unleash your productivity with Trello." — Tipografia mediana, color gris medio
- **Formulario de captura:** Input de email (~280px ancho) + boton "Sign up - it's free!" azul relleno
- **Disclaimer legal:** "By entering my email, I acknowledge the Atlassian Privacy Policy" — texto pequeno gris
- **Link secundario:** "Watch video" con icono de play
- **Imagen derecha:** Mockup de smartphone mostrando la interfaz de "Inbox" de Trello con tarjetas azules. Acompanado de iconos flotantes de integraciones (Slack, Gmail, Teams). La imagen tiene un fondo con formas geometricas abstractas (triangulos naranja/morado)

#### Seccion "Trello 101" — Producto en accion
- **Background:** Blanco
- **Headline:** "Your productivity powerhouse"
- **Subheadline:** Descripcion de Inbox, Boards y Planner
- **Presentacion en 3 columnas/tabs:**
  1. **Inbox:** "When it's on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime."
  2. **Boards:** "Your to-do list may be long, but it can be manageable! Keep tabs on everything from 'to-dos to tackle' to 'mission accomplished!'"
  3. **Planner:** "Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters."
- **Cada tab incluye:** Titulo, descripcion breve, y mockup visual contextual

#### Seccion "From message to action" — Integraciones
- **Background:** Blanco o gris muy claro
- **Sub-secciones con iconografia:**
  - *EMAIL MAGIC:* "Easily turn your emails into to-dos! Just forward them to your Trello Inbox, and they'll be transformed by AI into organized to-dos with all the links you need."
  - *MESSAGE APP SORCERY:* Captura desde Slack y Microsoft Teams
  - *WORK SMARTER:* Integraciones, Automation, Card mirroring

#### Seccion "Do more with Trello"
- **Tres columnas:**
  1. Integrations — "Connect the apps you are already using"
  2. Automation — "No-code automation is built into every Trello board"
  3. Card mirroring — "View all your to-dos from multiple boards in one place"

#### Seccion Social Proof
- **Citas de clientes:** Con foto, nombre, cargo, testimonio y link "Read the story"
- **Estadisticas:** "75% of organizations report that Trello delivers value within 30 days" — "81% of customers chose Trello for its ease of use"
- **CTA final:** "Join a community of millions of users globally" + formulario de email

#### Footer
- **Background:** Blanco/gris claro
- **Columnas:** About Trello, Jobs, Apps, Contact us
- **Selector de idioma:** 20+ idiomas incluyendo Espanol
- **Links legales:** Privacy Policy, Terms
- **Copyright:** "Copyright 2024 Atlassian"
- **Redes sociales:** Instagram, Facebook, LinkedIn, Twitter/X, YouTube

### 2.2 Value Proposition y Mensaje de Marca

El mensaje central de Trello se articula en tres niveles:
1. **Captura (Capture):** "Capture, organize, and tackle your to-dos from anywhere" — El producto se posiciona como un sistema de captura universal.
2. **Organizacion (Organize):** La metafora visual dominante es el tablero Kanban: listas como columnas, tarjetas como post-its digitales.
3. **Accion (Tackle):** El producto no solo organiza, sino que impulsa la ejecucion via automatizaciones, recordatorios, calendario y notificaciones.

El tono es **amigable, accesible y no intimidante**. Evita jerga tecnica. Usa metaforas cotidianas ("to-dos", "get sh*t done"). La tipografia es sans-serif moderna (probablemente Inter o sistema similar). La paleta de colores es dominada por azules Atlassian (#0052CC), con acentos vibrantes en las ilustraciones.

---

## 3. ESTRUCTURA DE NAVEGACION Y ARQUITECTURA GLOBAL

### 3.1 Jerarquia de Navegacion

Trello opera con una arquitectura de navegacion de tres niveles:

**Nivel 1: Global Header (omnipresente)**
- Logo Trello (vuelve a Home)
- Dropdown Features / Solutions / Plans / Resources
- Link Pricing directo
- Botones Log in / Get Trello for free
- Icono de campana (notificaciones)
- Avatar de usuario

**Nivel 2: Navigation Bar (dentro de un board)**
- Permite switchear entre: Inbox, Planner, Board (vista lado a lado)
- Boton "Switch board" con buscador
- Barra de navegacion puede ser fijada como sidebar izquierdo
- Atajos de teclado: `g+i` (Inbox), `g+p` (Planner), `g+b` (Board), `b` (board switcher)

**Nivel 3: Sidebar Izquierdo (collapsable)**
- Nombre del Workspace actual
- Workspace views (Table, Calendar) — Premium/Enterprise only
- Lista de boards del workspace (con indicador de actividad: punto azul)
- Boards favoritos (starred) al tope
- Seccion "Your boards"
- Link "See all workspace boards"
- Puede expandirse/colapsarse con `[` o click en flechas

### 3.2 Estructura de Workspaces

El **Workspace** es la unidad organizativa superior en Trello. Agrupa boards, miembros y configuraciones.

**Componentes de un Workspace:**
- **Nombre y descripcion:** Identificador del equipo/proyecto
- **Tipo:** Puede ser publico (indexable por buscadores) o privado
- **Members:** Roles definidos — Admin, Member, Observer, Guest
- **Boards:** Todos los tableros pertenecientes al workspace
- **Settings:**
  - Workspace visibility (public/private)
  - Workspace membership restrictions (por dominio de email)
  - Board creation restrictions (quien puede crear tableros)
  - Board deletion restrictions
  - Inviting guests
  - Labels personalizadas
  - Notificaciones
  - Idioma

**Jerarquia de permisos:**
- **Free Workspace:** Todos los miembros son admins por defecto
- **Premium Workspace:** Admins con control granular (quien puede crear/borrar tableros, invitar guests, etc.)
- **Enterprise:** Enterprise Admin Dashboard con control organizacional total, SSO SAML via Atlassian Guard, dominios restringidos, Power-Up administration

### 3.3 Flujo de Creacion de un Board

1. Usuario hace click en "Create" (boton global header) o en el `+` del sidebar
2. Opciones: Create board / Create from template / Create Workspace
3. Al crear un board:
   - Se solicita: Board title, Workspace destino, Visibility (Private / Workspace / Public)
   - Opcional: seleccionar template inicial
4. El board se crea con una lista por defecto: "To Do" (o estructura del template)
5. El usuario es redirigido a la Board view (Kanban)

---

## 4. ESTRUCTURA DE TABLEROS, LISTAS Y TARJETAS (Board/List/Card)

### 4.1 Board View (Vista Kanban por Defecto)

La Board View es la interfaz nuclear de Trello. Presenta un layout horizontal que simula un tablero fisico.

**Estructura Visual de un Board:**
- **Background:** Personalizable. Opciones: colores solidos, imagenes de Unsplash, imagenes propias subidas, GIFs. El fondo cubre toda la pantalla detras de las listas.
- **Header del Board:**
  - Nombre del board (editable inline)
  - Boton de favorito (estrella)
  - Indicador de visibilidad (privado/workspace/publico)
  - Miembros del board (avatares circulares en fila)
  - Boton "Invite" para agregar miembros
  - Boton de filtros (`Q` para filtrar cards por miembro, label, fecha)
  - Boton "..." (more) para menu del board: Settings, Power-Ups, Automations, Stickers, etc.
  - Boton de cambio de vista (Board, Calendar, Timeline, Table, Dashboard, Map) — para Premium
- **Cuerpo del Board:**
  - Disposicion **horizontal** de listas
  - Scroll horizontal nativo + **drag-to-scroll** (arrastrar el fondo para moverse lateralmente)
  - Las listas estan contenidas en un contenedor que ocupa el ancho total de la ventana

**Dimensiones y estilos tipicos (observados y reconstruidos):**
- Ancho de lista: ~272px (constante)
- Margen entre listas: ~8px
- Padding interno de lista: ~10px
- Radio de borde de lista: ~3px
- Color fondo de lista: `#EBECF0` (gris muy claro)
- Color fondo de tarjeta: `#FFFFFF` (blanco)
- Sombra de tarjeta: `0 1px 0 rgba(9, 30, 66, 0.25)`
- Radio de borde de tarjeta: ~3px
- Padding de tarjeta: ~10px-12px
- Gap entre tarjetas: ~8px
- Tipografia: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif`
- Tamano de fuente base: 14px

### 4.2 Listas (Lists)

Las listas son columnas verticales dentro de un board que representan etapas de un flujo de trabajo.

**Anatomia de una Lista:**
- **Header de lista:** Titulo (editable inline) + contador de cards (automatico) + menu "..." (list actions)
- **Cuerpo de lista:** Contenedor scrollable verticalmente que alberga las tarjetas
- **Footer de lista:** Boton "+ Add a card" o "Add another card" (abre formulario rapido)

**List Actions (menu "..."):**
- Add card...
- Copy list...
- Move list...
- Watch (seguir la lista para notificaciones)
- Archive all cards in this list
- Archive this list
- Move all cards in this list...
- List colors (colores de fondo de la lista) — Standard/Premium
- Automation (acceso rapido a Butler para esta lista)

**List Colors (Premium/Standard):**
- 10 colores disponibles para asignar a cada lista
- El color aparece como fondo sutil de la lista
- Casos de uso: codificar por estado (rojo=escalado, verde=resuelto, amarillo=en espera)

### 4.3 Tarjetas (Cards)

Las tarjetas son las unidades atomicas de trabajo en Trello. Son "super post-its digitales".

**Anatomia de una Tarjeta (Card Front):**
- **Cover image/color (opcional):** Puede mostrarse como media altura sobre el titulo, o altura completa ocultando detalles. Soporta imagenes propias, Unsplash, GIFs, colores solidos.
- **Labels:** Cuadrados de color pequenos (o rectangulos con texto si se expanden). Hasta 10 colores predefinidos + modo daltonico con patrones.
- **Titulo:** Texto principal de la tarjeta, editable.
- **Badges/Iconos inferiores:**
  - Fecha de vencimiento (calendario + estado: verde/futuro, amarillo/menos 24h, rojo/vencido)
  - Checklist (cuadrito con contador: 3/5)
  - Comentarios (icono de burbuja con numero)
  - Adjuntos (icono de clip con numero)
  - Descripcion (icono de lineas horizontales)
  - Miembros asignados (avatares circulares pequenos, maximo ~3 visibles en frente)
  - Card mirroring (icono de espejo si la tarjeta esta reflejada)
  - Template badge (si es card template)

**Interacciones de una Tarjeta:**
- Click: Abre el card back (detalle)
- Drag and drop: Mover entre listas y reordenar dentro de una lista
- Hover: Aparece icono de lapiz para edicion rapida (cambiar titulo, label, miembro, fecha)
- Atajo `E`: Edicion rapida
- Atajo `Space`: Asignarse a si mismo
- Atajo `C`: Archivar
- Atajo `D`: Cambiar fecha
- Atajo `L`: Abrir labels
- Atajo `M`: Agregar/quitar miembros
- Atajo `N`: Crear nueva tarjeta debajo
- Click derecho: Menu contextual con copiar, mover, etiquetar, archivar

**Card Templates:**
- Cualquier tarjeta puede convertirse en template via menu "Make template"
- Las template cards tienen un badge especial en el frente
- Desde el back de una template card se puede crear una nueva instancia
- Tambien se pueden crear desde "Create from template" al pie de cualquier lista
- Las templates no copian: fechas de vencimiento (se ocultan), ni estado de completado

---

## 5. BANDEJA DE ENTRADA (INBOX) Y SISTEMA DE NOTIFICACIONES

### 5.1 Trello Inbox (Nueva funcionalidad 2024-2025)

El Inbox es una de las innovaciones mas recientes de Trello. Es un **espacio personal de captura** que funciona como bandeja de entrada antes de la organizacion en tableros.

**Proposito:** Capturar tareas, ideas y to-dos desde multiples fuentes sin necesidad de organizarlas inmediatamente. Luego, el usuario puede arrastrar y soltar los items en los boards correspondientes.

**Fuentes de Captura:**
1. **Email:** Reenviar emails a `inbox@app.trello.com`. La IA de Atlassian Intelligence extrae: titulo sugerido, descripcion, fechas, checklist items, y adjunta el email original.
2. **Slack:** Usar la app de Trello para Slack:
   - "Save for later"
   - Reaccionar con emoji `:inbox_tray:`
   - "Create card from message" en el menu More actions
3. **Microsoft Teams:** Similar integracion nativa
4. **Siri (iOS):** Comandos de voz para agregar tareas
5. **Jira:** Listas de Jira dentro de tableros Trello que filtran issues por JQL
6. **Captura manual:** Jot down directamente en la app movil o web

**Organizacion del Inbox:**
- Lista vertical de items capturados
- Cada item muestra: titulo, fuente (icono de email/Slack/etc.), fecha
- Acciones rapidas: marcar como Done, abrir, organizar en board
- Drag and drop hacia boards para clasificar

**AI Summary (en planes pagos):**
- Resume automaticamente mensajes de Slack
- Extrae due dates y crea checklists
- Genera titulos relevantes

**Disponibilidad:** Inbox esta disponible en Todos los planes (Free, Standard, Premium, Enterprise).

### 5.2 Sistema de Notificaciones (Notification Bell)

El sistema de notificaciones de Trello es el mecanismo de atencion y alerta del producto.

**Ubicacion:** Icono de campana en el header global, esquina superior derecha.

**Principio fundamental:** Solo recibes notificaciones por acciones que ocurren en cards/lists/boards que estas **asignado o viendo (watching)**. No recibes notificaciones por tus propias acciones.

**Tipos de Notificaciones:**
- Menciones directas (@username en comentarios o descripciones)
- Asignacion a una tarjeta o checklist item
- Cambios en cards que observas (movimiento entre listas, nuevos comentarios, adjuntos, fechas modificadas)
- Invitaciones a boards
- Fechas de vencimiento proximas o pasadas
- Replies a emails (via Email for Trello Power-Up)

**Panel de Notificaciones (Notification Drawer):**
- Se abre al clickar la campana
- Muestra notificaciones agrupadas por card (si multiples acciones ocurren en una misma card)
- Cada notificacion muestra: preview del titulo de card, due date, miembros, adjuntos, si fue movida entre listas
- Estados: leida / no leida (circulo a la izquierda)
- Acciones: "Filter by Unread", "Mark All as Read", "Mark as unread" individual
- Desde la notificacion se puede: ajustar due date, marcar card como done, dejar de seguir (stop watching)

**Email Notifications:**
- Configurables desde Account Settings > Email notifications
- Frecuencia: Never, Periodically, Immediately
- No se pueden desactivar: invitaciones, menciones directas, ser agregado a card
- Si ya leiste una notificacion in-app, no llega el email

**Desktop Notifications:**
- Requieren que Trello este abierto en una pestana del navegador
- Se habilitan en Account settings > Email notifications > Allow desktop notifications

**Watching (Seguimiento):**
- Puedes "watch" (seguir) boards, lists o cards individuales
- Icono de ojo indica que estas siguiendo
- Atajo `S`: Agregar item a watched
- Watching un board = notificaciones de nuevos miembros, nuevas listas/cards, archivados
- Watching una list = notificaciones de nuevas cards, movimientos, archivados en esa lista
- Watching una card = notificaciones de comentarios, cambios, movimientos, adjuntos

---

## 6. VISTAS DISPONIBLES (Views)

Trello ofrece multiples vistas para visualizar los mismos datos de tableros desde diferentes angulos. **Solo Board view es gratuita**. Las vistas adicionales requieren Premium o Enterprise.

### 6.1 Board View (Kanban) — Gratuita para todos

- **Layout:** Listas horizontales, tarjetas verticales dentro de cada lista
- **Interaccion:** Drag and drop de tarjetas entre listas para indicar progreso
- **Customizacion:** Fondos de board, colores de lista (Standard+), covers de card
- **Proposito:** Planificar cualquier proyecto, construir pipelines (ventas, contenido, contratacion), crear fuentes de verdad

### 6.2 Timeline View (Premium/Enterprise)

- **Descripcion:** Vista tipo Gantt chart. Muestra tarjetas con fechas de inicio y vencimiento organizadas en lanes horizontales.
- **Features:**
  - **Lanes:** Contenedores para cards. Si dos cards comparten periodo de tiempo, se crea un nuevo lane.
  - **Today and time arrows:** Navegacion rapida a "hoy".
  - **Stretch cards:** Arrastrar los bordes de una tarjeta para ajustar rangos de fecha.
  - **Unscheduled cards drawer:** Cajon inferior con cards sin fecha. Al arrastrarlas al timeline se les asigna fecha.
  - **Group by:** Organizar por list, member, o label.
  - **Zoom:** Granularidad dia/semana/mes/trimestre/ano.
- **Proposito:** Planificar por fases, milestones, tracking hacia goals, ship dates. Reemplaza Gantt charts estaticos.

### 6.3 Calendar View (Premium/Enterprise)

- **Descripcion:** Vista de calendario mensual o semanal que muestra cards con fechas.
- **Features:**
  - Navegacion mensual/semanal
  - Drag and drop de cards a nuevas fechas (auto-actualiza due dates)
  - Stretch cards para rangos de fecha
  - Advanced checklist items con fechas aparecen en el calendario
  - Crear nuevas cards haciendo doble click en una fecha
  - Sync con Google Calendar y Outlook Calendar
- **Proposito:** Planificar calendarios editoriales, eventos, onboarding de empleados, tracking de deadlines.

### 6.4 Table View (Premium/Enterprise)

- **Descripcion:** Vista estilo spreadsheet/lista que muestra todas las cards de un board en formato tabular.
- **Features:**
  - Columnas: titulo, list, labels, members, due date, custom fields
  - Sortable y filterable
  - Crear y editar cards directamente desde la tabla
  - Vista compacta y manejable
- **Proposito:** Revisar todo el trabajo en un board de forma tabular, filtrar y ordenar.

### 6.5 Dashboard View (Premium/Enterprise)

- **Descripcion:** Panel de metricas visuales con graficos tipo barra o pie.
- **Features:**
  - **Default charts:** Cards per list, cards per member, cards per label, cards per due date status
  - **Editing:** Elegir entre grafico de barras o pastel
  - **Deleting:** Agregar/quitar charts personalizados
  - **Historical data:** Ver cards per list en los ultimos 30 dias
  - **Filterable:** Filtrar por label, member, due date
- **Proposito:** Identificar roadblocks (cards estancadas), monitorear progreso, balancear cargas de trabajo.

### 6.6 Map View (Premium/Enterprise)

- **Descripcion:** Mapa interactivo geografico que muestra cards con datos de ubicacion.
- **Features:**
  - Cards con campos de ubicacion aparecen pinnadas en el mapa
  - Interactivo: zoom, pan
- **Proposito:** Planificar off-sites, scouting de locaciones, distribucion de productos, eventos.

### 6.7 Workspace Views (Premium/Enterprise)

- **Workspace Table view:** Tabla que agrega cards de multiples boards del mismo workspace. Spreadsheet-style sortable/filterable.
- **Workspace Calendar view:** Calendario que muestra cards con fechas de inicio/vencimiento a traves de multiples boards.
- **Proposito:** Portfolio tracking, cross-departmental collaboration, gestion de workload a nivel equipo.

---

## 7. REVERSO DE TARJETAS (Card Back) — FUNCIONALIDADES DETALLADAS

El reverso de la tarjeta es el modal/detalle que se abre al hacer click en una card. Es un panel rico en funcionalidades dividido en dos zonas principales: contenido (izquierda) y acciones/menus (derecha).

### 7.1 Estructura del Card Back (Nuevo Diseno 2025)

Trello esta implementando un nuevo card back design mas moderno con nueva iconografia, colores, componentes y tipografia.

**Zona Superior:**
- Titulo de la card (editable inline, grande)
- Badges de lista actual y board
- Menu "Actions" (tres puntos) en esquina superior derecha: Copy, Move, Mirror, Archive, Share, etc.
- Boton "Share feedback" (en nueva version)

**Zona Central — Contenido:**
- **Members:** Avatares de miembros asignados (con posibilidad de agregar/quitar)
- **Description:** Editor de texto enriquecido (WYSIWYG en web, Markdown en apps)
- **Attachments:** Lista de archivos adjuntos con preview
- **Checklists:** Lista de subtareas con checkboxes, progress bar
- **Activity Feed:** Historial cronologico de cambios + comentarios

**Zona Inferior:**
- Barra de navegacion con: Comments/Activity toggle, Power-Ups, Automation buttons

**Sidebar Derecha — Add Menu:**
- Members, Labels, Checklist, Dates, Attachment, Cover, Custom Fields

### 7.2 Description (Descripcion)

- **Editor:** WYSIWYG en navegador web. Markdown en comentarios, checklist items y apps moviles.
- **Soporte de formato:**
  - Headings (# hasta ######)
  - Bold (`**texto**`), Italic (`*texto*`)
  - Strikethrough (`~~texto~~`)
  - Inline code (`` `codigo` ``)
  - Code blocks (triple backtick)
  - Links (`[texto](url)`)
  - Ordered y unordered lists
  - Horizontal rules
  - Blockquotes (`>`)
- **Menciones:** `@username` autocompleta miembros del board. `#labelname` autocompleta labels. `^` autocompleta nombres de lista.
- **Placeholders:** "Add a more detailed description..."

### 7.3 Checklists

- **Basico (todos los planes):** Items con checkbox. Contador en card front.
- **Advanced Checklists (Standard/Premium/Enterprise):**
  - Asignar **miembros** a items individuales
  - Asignar **due dates** a items individuales
  - Items asignados aparecen en "Your Items" (seccion del Home)
  - Items con fecha aparecen en Calendar view
  - **Convertir item a card:** Si un item necesita descripcion, adjuntos, etc., se convierte en card nueva debajo
  - Progress bar en card back (verde cuando 100%)
  - Hide checked items toggle
  - Contador en card front: "3/5" (se vuelve verde al completarse)
  - Notificaciones por email para items asignados con fechas proximas/vencidas

### 7.4 Due Dates (Fechas de Vencimiento)

- **Configuracion:** Fecha + hora opcional
- **Start date:** Fecha de inicio (disponible en todos los planes)
- **Visualizacion en card front:**
  - Futuro: verde/gris con icono de calendario
  - Menos de 24 horas: amarillo
  - Vencido: rojo
  - Completado: tachado con verde
- **Recordatorios:** Notificaciones automaticas cuando se acerca la fecha
- **Calendar integration:** Sync con Google Calendar, Outlook

### 7.5 Attachments (Adjuntos)

- **Fuentes:** Subir archivo local, Google Drive, Dropbox, Box, OneDrive, OneDrive for Business, link URL
- **Limites:**
  - Free: 10MB por archivo
  - Standard/Premium/Enterprise: 250MB por archivo
- **Previews:**
  - Imagenes (.jpg, .png, .gif) se muestran como preview en el card back
  - La primera imagen adjunta se convierte automaticamente en card cover (configurable)
  - Documentos muestran icono segun tipo
- **Acciones:** Descargar, eliminar, copiar link, convertir en cover
- **Enterprise:** Attachment restrictions (admin puede limitar fuentes permitidas)

### 7.6 Comments (Comentarios)

- **Formato:** Soporta Markdown, menciones @user, emojis
- **Adjuntos en comentarios:** Posible adjuntar archivos a comentarios individuales
- **Reacciones con emojis:** Puedes reaccionar a comentarios con emojis (like, celebrate, etc.)
- **Editar/eliminar:** Propios comentarios pueden editarse o borrarse
- **Orden:** Cronologico, mas reciente al final

### 7.7 Activity Feed

- **Registro automatico:** Toda accion sobre la card se loguea
- **Eventos registrados:** Creacion, movimientos entre listas, cambios de miembro, cambios de fecha, adjuntos agregados/eliminados, checklist items completados, comentarios, labels agregadas/quitadas
- **Actor:** Muestra quien realizo la accion y cuando
- **Visibilidad:** Visible para todos los miembros del board

### 7.8 Members (Miembros)

- **Asignacion:** Hasta multiples miembros por card (sin limite estricto)
- **Card front:** Muestra avatares circulares (maximo ~3, el resto con contador +N)
- **Asignarse a si mismo:** Atajo `Space` desde board view, o hover sobre card
- **Subscriptions vs Membership:**
  - *Member:* Asignado a la tarea (debe hacerla)
  - *Subscribe:* Solo recibe notificaciones de cambios sin ser responsable

### 7.9 Labels (Etiquetas)

- **Colores:** 10 colores predefinidos (verde, amarillo, naranja, rojo, purpura, azul, celeste, rosa, negro, gris)
- **Nombres:** Cada label puede tener un nombre personalizado
- **Modo daltonico:** Patrones unicos sobre cada color para accesibilidad
- **Card front:** Se muestran como cuadrados de color. Si se expande el board menu se pueden ver como rectangulos con texto.
- **Filtrado:** Atajo `F` o `L` abre filtro por labels
- **Busqueda:** Operador `label:color` en busqueda global

### 7.10 Custom Fields (Campos Personalizados)

- **Disponibilidad:** Power-Up incluido en Standard, Premium, Enterprise
- **Tipos de campo:**
  1. **Text:** Cualquier texto libre
  2. **Number:** Solo numeros
  3. **Dropdown:** Lista de opciones predefinidas, cada opcion con color asociado
  4. **Date:** Fecha con date picker
  5. **Checkbox:** Estado binario
- **Limite:** Maximo 50 custom fields por board
- **Visibilidad:** Configurable para mostrarse en card front o solo en card back
- **Usos tipicos:** Presupuesto, prioridad, tipo de tarea, cliente, OS, navegador, estado de aprobacion
- **Con automation:** Butler puede leer y escribir custom fields, activar reglas basadas en cambios de valor

### 7.11 Card Cover y Colors

- **Cover button:** En el sidebar derecho del card back
- **Opciones:**
  - Color solido (10 opciones vibrantes)
  - Imagen propia (upload)
  - Imagen de Unsplash (galeria integrada)
  - GIF (via Giphy)
- **Tamanos:**
  - *Half cover:* Color/imagen sobre el titulo, detalles de card visibles debajo
  - *Full cover:* Color/imagen cubre toda la altura de la card en board view, ocultando detalles. Requiere seleccionar color de texto para overlay.
- **Colorblind friendly mode:** Patrones sobre colores para diferenciacion

---

## 8. POWER-UPS E INTEGRACIONES

### 8.1 Concepto de Power-Up

Un **Power-Up** es una extension/add-on que anade funcionalidad adicional a un board de Trello. Es el mecanismo de extensibilidad principal del producto.

**Diferencia entre Power-Ups e Integraciones:**
- **Integraciones:** Traen informacion desde/hacia otros servicios (datos fluyen entre apps)
- **Power-Ups:** Pueden traer datos O simplemente anadir funciones nativas nuevas al board

**Cantidad:** +200 Power-Ups en el marketplace, mas integraciones en el directorio.

### 8.2 Power-Ups Populares y Categorias

**Power-Ups nativos de Trello (Made by Trello):**
- Calendar Power-Up
- Butler (Automation)
- Custom Fields
- Card Repeater
- Map
- Voting
- Card Aging
- Timeline
- Dashboard
- Table View

**Integraciones con herramientas externas:**
- **Comunicacion:** Slack, Microsoft Teams, Discord
- **Almacenamiento:** Google Drive, Dropbox, Box, OneDrive
- **Desarrollo:** GitHub, GitLab, Jira, Bitbucket
- **Diseno:** InVision, Figma, Adobe Creative Cloud
- **CRM/Ventas:** Salesforce, Crmble, HubSpot
- **Productividad:** Zapier, Evernote, Confluence, Google Calendar
- **Analisis:** Blue Cat Reports, Screenful, Planyway
- **Soporte:** Email for Trello (SendBoard), Hipporello Service Desk

### 8.3 Como Funcionan los Power-Ups

**Habilitacion:**
1. Desde un board, click en "Power-Ups" en el menu (esquina superior derecha)
2. Click en "Add Power-Ups"
3. Buscar o browse por categoria (Analytics, Communication, HR, IT, Marketing, etc.)
4. Click "Add" para habilitar en el board actual
5. Si se quiere en multiple boards, repetir proceso para cada uno

**Configuracion:**
- Algunos Power-Ups requieren autenticacion OAuth con el servicio externo
- Enterprise admins pueden aprobar/restringir Power-Ups disponibles para toda la organizacion
- Algunos Power-Ups tienen costo adicional (del tercero desarrollador, no de Atlassian)

**Desarrollo de Power-Ups personalizados:**
- Trello expone una API publica REST
- Cualquier desarrollador puede construir un Power-Up usando la API
- Framework oficial con documentacion en trello.com/developers

### 8.4 Limites por Plan

- **Free:** Unlimited Power-Ups por board
- **Standard/Premium/Enterprise:** Unlimited Power-Ups
- **Enterprise:** Power-Up administration — admins pueden habilitar/deshabilitar Power-Ups por workspace en bulk

---

## 9. AUTOMATIZACION BUTLER — CAPACIDADES DETALLADAS

Butler es el sistema de automatizacion no-code integrado en Trello. No requiere programacion y utiliza un sistema de lenguaje natural simplificado.

### 9.1 Tipos de Automatizacion

Butler ofrece **5 tipos** de automatizaciones:

#### 1. Rules (Reglas)
- **Estructura:** Trigger + Action(s)
- **Trigger:** Evento que dispara la regla (ej: "when a card is moved into list 'Done'")
- **Action:** Lo que ocurre (ej: "archive the card", "add due date 3 days from now")
- **Multiples acciones:** Hasta 20 acciones por automatizacion
- **Ejemplos:**
  - "When team member labels a card 'Urgent', move the card to the top of the list, send Slack message, add due date 3 days from now"
  - "When checklist is completed, mark due date complete, move card to 'Done', @mention team lead"

#### 2. Card Buttons (Botones de Tarjeta)
- **Ubicacion:** Aparecen en el card back
- **Trigger:** Click del usuario
- **Acciones:** Mover card, asignar miembro, establecer fecha, aplicar label, etc.
- **Ejemplo:** Boton "Next Step" que mueve la card a la siguiente lista, agrega responsable y due date

#### 3. Board Buttons (Botones de Tablero)
- **Ubicacion:** En el header del board
- **Trigger:** Click del usuario
- **Acciones:** Aplican a todo el board (sort cards, move groups, archive)
- **Ejemplo:** Boton "Due Date Sort" que ordena todas las cards por fecha dentro de sus listas

#### 4. Calendar Commands (Comandos de Calendario)
- **Trigger:** Intervalo de tiempo ("every Friday at 5pm", "every Monday at 7am")
- **Acciones:** Crear cards recurrentes, archivar cards completadas, mover cards entre listas
- **Ejemplos:**
  - "Every Friday at 5pm, archive all cards in 'Done', move cards from 'Next Sprint' to 'To Do'"
  - "Every Monday at 7am, create card 'Create weekly meeting agenda' in 'To Do'"

#### 5. Due Date Commands (Comandos de Fecha de Vencimiento)
- **Trigger:** Relacionado con la proximidad/paso de una due date
- **Ejemplos:**
  - "1 day before a card is due, move the card to the top of list 'Due Soon' and add red 'Urgent' label"
  - "When a due date is set on a card, sort the list by due date"

### 9.2 Triggers Disponibles (Categorias)

**Card triggers:**
- Card moved to list / board
- Card created / copied
- Label added/removed
- Member added/removed
- Due date added/changed/removed/set/passed
- Checklist completed / item checked/unchecked
- Attachment added/removed
- Comment added
- Card archived/unarchived

**List triggers:**
- Card added to list

**Board triggers:**
- Periodic (calendar-based)
- Due date relative

### 9.3 Acciones Disponibles (Categorias)

**Card actions:**
- Move to list / board / top/bottom
- Add/remove member
- Add/remove label
- Set due date / start date / remove dates
- Add checklist / check/uncheck items
- Add/remove attachment
- Send email
- Post to Slack / Jira / otros
- Copy card / mirror card
- Archive card
- Sort list
- Add/ remove custom field value

**Board actions:**
- Sort list by criteria
- Move list
- Create card
- Archive all cards in list
- Change list color

### 9.4 Integraciones de Butler con Apps Externas

- **Slack:** Postear mensajes en canales especificos
- **Jira:** Crear issues, sincronizar estado
- **Email:** Enviar emails automaticos (internos y externos)
- **Custom Fields:** Leer, escribir, reaccionar a cambios

### 9.5 Cuotas y Limites

| Plan | Workspace Command Runs/mes |
|------|---------------------------|
| Free | 250 |
| Standard | 1,000 |
| Premium | Unlimited |
| Enterprise | Unlimited |

### 9.6 Automation Tips

Butler detecta automaticamente acciones repetitivas que el usuario realiza en un board y sugiere automatizaciones de un solo click. Estas aparecen en la seccion "Automation Tips" del panel de Butler.

---

## 10. TRELLO TEMPLATES Y GALERIA DE PLANTILLAS

### 10.1 Concepto de Template

Un **template** en Trello es una copia primaria de un board o card que sirve como punto de partida estandarizado. Mantiene la estructura (listas, cards, labels, checklists, Power-Ups habilitados) pero sin datos colaborativos (comentarios, activity feed, miembros).

### 10.2 Board Templates

**Creacion:**
1. Crear un board con la estructura deseada
2. Menu del board > More > "Make template"
3. El board se convierte en template con:
   - Banner de template con boton "Create board from template"
   - Badge de template en header
   - Share link
   - Comentarios desactivados y activity feed oculto por defecto
   - Self-joining desactivado

**Tipos de visibilidad:**
- **Public:** Cualquiera puede ver y usar
- **Team-visible:** Solo miembros del workspace
- **Private:** Solo creador (Premium/Enterprise)

**Acceso a templates:**
- Desde Trello Home: Create > Start with a Template
- Desde la galeria publica: trello.com/templates
- Desde el menu de un board existente

### 10.3 Card Templates

- Cualquier card puede convertirse en template
- Badge especial en card front
- Boton "Create card from template" en card back
- Se pueden ocultar de la lista (hide from list) pero seguir disponibles para crear
- No se comparten entre boards (workaround: copiar card a otro board y convertir ahi)

### 10.4 Galeria de Templates (trello.com/templates)

**Estructura de la pagina:**
- Sidebar izquierdo con categorias: Business, Design, Education, Engineering, Marketing, HR & Operations, Personal, Productivity, Product Management, Project Management, Remote Work, Sales, Support, Team Management
- Seccion "Featured" con templates destacados
- Seccion "New and notable templates"
- Grids por categoria con thumbnail, titulo, autor, descripcion breve, stats (likes, views)

**Ejemplos de templates populares:**
- Scrum Board (Robin Warren) — 38.1K views
- Teaching: Weekly Planning (Emma Trentman) — 200.8K views
- New Hire Onboarding (Trello Team) — 18.3K likes
- Lean Canvas (Syarfandi Achmad) — 34.9K views
- Design System Checklist (Rahul JR) — 21.9K views
- Marketing Content Catalog (Nicholas Bouchard) — 8.1K views
- Remote Class Template (Kelly Theisen) — 48.9K views

**Localizacion:** La galeria esta disponible en ingles, frances y portugues.

### 10.5 Usar un Template

1. Navegar a trello.com/templates
2. Buscar o filtrar por categoria
3. Click en template -> Overview page con:
   - Creador y descripcion
   - Preview del board
   - Power-Ups habilitados en el template
4. Click "View template" para ver el board real
5. Click "Create board from template" para copiar:
   - Editar titulo
   - Seleccionar Workspace destino
   - Elegir mantener o descartar cards
6. El nuevo board se crea con la misma estructura

---

## 11. MODELO DE NEGOCIO Y PRICING

Trello opera un modelo **freemium** con cuatro planes bien diferenciados. La segmentacion se basa en: cantidad de tableros, funcionalidades avanzadas (vistas, AI, admin), almacenamiento, y automatizacion.

### 11.1 Comparativa de Planes

| Feature | Free | Standard | Premium | Enterprise |
|---------|------|----------|---------|------------|
| **Precio** | $0 | $5/usuario/mes (anual) / $6 (mensual) | $10/usuario/mes (anual) / $12.50 (mensual) | $17.50/usuario/mes (anual, min 50 users) |
| **Collaborators** | Hasta 10 por Workspace | Ilimitados | Ilimitados | Ilimitados |
| **Boards** | Hasta 10 por Workspace | Ilimitados | Ilimitados | Ilimitados |
| **Workspaces** | - | - | - | Ilimitados |
| **Cards** | Ilimitados | Ilimitados | Ilimitados | Ilimitados |
| **Power-Ups** | Ilimitados por board | Ilimitados | Ilimitados | Ilimitados + admin control |
| **Storage** | Ilimitado (10MB/archivo) | Ilimitado (250MB/archivo) | Ilimitado (250MB/archivo) | Ilimitado (250MB/archivo) |
| **Activity Log** | Ilimitado | Ilimitado | Ilimitado | Ilimitado |
| **Inbox** | Si | Si | Si | Si |
| **Planner** | View-only | Full access | Full access | Full access |
| **Quick Capture AI** | No | Si | Si | Si |
| **Advanced Checklists** | No | Si | Si | Si |
| **Custom Fields** | No | Si | Si | Si |
| **Card Mirroring** | No | Si | Si | Si |
| **List Colors** | No | Si | Si | Si |
| **Collapsible Lists** | No | Si | Si | Si |
| **Saved Searches** | No | Si | Si | Si |
| **Single Board Guests** | No | Si | Si | Si |
| **AI (Atlassian Intelligence)** | No | No | Si | Si |
| **Views** | Solo Board | Solo Board | Calendar, Timeline, Table, Dashboard, Map | Calendar, Timeline, Table, Dashboard, Map |
| **Workspace Views** | No | No | Table + Calendar | Table + Calendar |
| **Workspace Templates** | No | No | Si | Si |
| **Board Collections** | No | No | Si | Si |
| **Observers** | No | No | Si | Si |
| **Admin & Security** | Basico | Basico | Avanzado | Enterprise-grade |
| **Command Runs/mes** | 250 | 1,000 | Ilimitados | Ilimitados |
| **SAML SSO** | No | No | No | Si (via Atlassian Guard) |
| **Organization-wide Permissions** | No | No | No | Si |
| **Public Board Management** | No | No | No | Si |
| **Multi-board Guests** | No | No | No | Si |
| **Attachment Permissions** | No | No | No | Si |
| **Power-Up Administration** | No | No | No | Si |
| **24/7 Support** | Comunidad | Business hours | 24/5 Premium | 24/7 Enterprise Admin |

### 11.2 Descuentos

- **Non-profit:** 75% off Standard y Premium
- **Educacion:** 75% off Standard y Premium; 50% off Enterprise
- **Enterprise volume pricing:** Precio por usuario decrece con volumen (hasta ~$7.38/user para 5,000 personas)
- **Free trial:** 14 dias de Premium sin tarjeta de credito

### 11.3 Estrategia de Upsell

La estrategia de monetizacion de Trello se basa en:
1. **Limitar boards en Free:** Solo 10 por workspace (fuerza upgrade a Standard)
2. **Vistas avanzadas solo en Premium:** Timeline, Dashboard, Calendar son potentes motivadores
3. **Advanced Checklists y Custom Fields en Standard:** Gate para equipos que necesitan granularidad
4. **AI y Admin controls en Premium:** Atractivo para managers
5. **Enterprise-grade security:** SSO, dominios restringidos, Atlassian Guard
6. **Automatization quotas:** Free=250, Standard=1,000, Premium=Unlimited

---

## 12. LECCIONES APLICABLES PARA UNA PLATAFORMA VERTICAL CINEMATOGRAFICA

A continuacion, se presentan las lecciones arquitectonicas mas relevantes para aplicar en una plataforma de gestion de produccion cinematografica (film/TV production management), clonando la mecanica de Trello pero especializandola para el dominio.

### 12.1 Estructura Jerarquica Adaptada al Cine

| Nivel Trello | Equivalente Cinematografico | Casos de uso |
|-------------|----------------------------|--------------|
| Workspace | Production Company / Studio | Warner Bros, A24, equipo independiente |
| Board | Proyecto / Pelicula / Serie | "Proyecto XYZ - Temporada 1" |
| List | Secuencia / Fase / Departamento | "Secuencia 1 - Apertura", "Post-produccion", "VFX" |
| Card | Escena / Toma / Tarea | "Escena 5 - Interior Cafe - Dia", "Toma 3B" |
| Checklist item | Subtarea tecnica | "Colocar dolly", "Ajustar iluminacion key", "Slate" |

### 12.2 Custom Fields Esenciales para Cine

Replicando el concepto de Custom Fields de Trello, una plataforma cinematografica necesita campos nativos como:
- **Location** (Dropdown): Estudio A, Locacion X, Exterior Calle Y
- **Scene Number** (Text/Number): 5, 12A, 12B
- **Page Count** (Number): Paginas del guion
- **Cast Required** (Dropdown multi): Actor 1, Actor 2, Extras
- **Time of Day** (Dropdown): Dawn, Day, Dusk, Night, Magic Hour
- **Camera Setup** (Dropdown): Dolly, Steadicam, Handheld, Drone, Underwater
- **Lens** (Dropdown): 24mm, 35mm, 50mm, 85mm
- **ISO / Exposure** (Number)
- **Estimated Duration** (Number): Minutos estimados de rodaje
- **Shoot Date** (Date): Fecha programada de rodaje
- **VFX Shot** (Checkbox): Si requiere efectos visuales
- **Script Supervisor Notes** (Text)
- **Status** (Dropdown): Not Started, In Progress, Completed, Cut, In VFX, Color Grading

### 12.3 Vistas Criticas para Produccion

- **Board (Kanban):** Pipeline de escenas por estado (Prepping -> Ready to Shoot -> Shooting -> Wrapped -> In Edit -> Completed)
- **Timeline (Gantt):** Plan de rodaje por dias/semanas. Escenas como bloques de tiempo. Identificar superposiciones de locacion o cast.
- **Calendar:** Shooting schedule. Dias de rodaje por locacion. Cast call times.
- **Table:** Lista maestra de escenas con todos los metadatos (location, cast, time, page count, status) — ideal para el Script Supervisor y Production Coordinator.
- **Dashboard:** Metricas de produccion — escenas completadas por dia, dias restantes, escenas con VFX, promedio de tomas por escena.
- **Map:** Locaciones geograficas del rodaje. Pins de cada locacion con escenas asignadas. Ideal para logistica y transporte.

### 12.4 Automatizaciones Clave para Rodajes

Replicando Butler, una plataforma cinematografica necesita reglas como:
- "When a card is moved to 'Shooting', notify the 1st AD and Script Supervisor via Slack"
- "When a scene is marked 'Wrapped', add checklist 'Post-Transfer' and assign to DIT"
- "1 day before shoot date, move card to top of 'Tomorrow's Call Sheet' and notify all assigned cast members"
- "When VFX checkbox is checked, create Jira ticket in VFX board and link back"
- "Every morning at 6am, create card 'Daily Production Report' in 'Admin' list"

### 12.5 Captura desde el Set (Inbox)

El concepto de Trello Inbox es perfecto para produccion:
- **Captura de notas de set:** El director, DP, o script supervisor envia notas de voz/texto desde el set que aterrizan en el Inbox del production coordinator.
- **Fotos de continuidad:** Captura desde app movil al Inbox, luego organizadas en cards de escena.
- **Slack/Teams del crew:** Mensajes de "necesitamos mas cable XLR en locacion B" se capturan como tareas.
- **Email de vendors:** Confirmaciones de equipo, cotizaciones, se capturan y organizan.

### 12.6 Power-Ups Cinematograficos

Inspirados en el modelo de Power-Ups de Trello, una plataforma de produccion podria ofrecer:
- **Integration with budgeting software:** Movie Magic, Showbiz, Celtx
- **Script breakdown import:** Importar escenas desde Final Draft, Celtx, WriterDuet
- **Call sheet generator:** Generar hojas de llamado automaticamente desde las cards del dia
- **Dailies management:** Link a frame.io, Vimeo, o sistema de dailies propio
- **Cast/crew directory:** Integracion con contactos y availabilities
- **Location scouting:** Mapa con fotos y notas de locaciones
- **Equipment inventory:** Tracking de camaras, lentes, luces por numero de serie
- **Union/guild compliance:** Tracking de horas para SAG-AFTRA, IATSE

### 12.7 Notificaciones y Workflow

- **Watching:** Script supervisor "watches" todas las escenas activas. Director solo las de su dia. Productor ejecutivo solo milestones.
- **Mentions:** @director "needs pick-up shot for scene 5" — notificacion directa.
- **Due dates:** Call times, deadlines de entrega de VFX, fechas de screening.
- **Advanced Checklists:** Cada toma puede tener un checklist con: Slate, Mark, Action, Cut, Check gate, Reset.

### 12.8 Modelo de Precios para Produccion

Aprendiendo de Trello:
- **Free:** Para proyectos independientes/estudiantes (1-2 peliculas, equipo reducido)
- **Standard ($5-8/user):** Producciones indie con equipo core. Unlimited boards por proyecto. Custom fields para metadatos tecnicos.
- **Premium ($12-15/user):** Producciones con presupuesto medio. Timeline view para shooting schedule. Dashboard para productores. AI para generar call sheets.
- **Enterprise ($20+/user):** Estudios mayores. SSO, controles de admin, compliance, multi-workspace por departamentos.

### 12.9 UX/UI a Replicar

| Elemento Trello | Adaptacion Cinematografica |
|-----------------|---------------------------|
| Board background | Fondo con still del proyecto, concept art, o color por fase (pre/rodaje/post) |
| List colors | Codigo por locacion (Rojo=Estudio, Azul=Exterior), o por estado |
| Card covers | Thumbnail del storyboard, foto del set, o frame clave |
| Labels | Categorias: INT/EXT, DIA/NOCHE, CON/SIN VFX, CAST principal/secundario |
| Drag and drop | Reordenar escenas en el dia de rodaje en tiempo real |
| Card front badges | Page count, cast count, VFX indicator, storyboard attached |
| Quick edit (tecla E) | Cambiar rapidamente locacion, hora, o cast de una escena |

### 12.10 Diferenciacion Vertical

Para competir, una plataforma cinematografica debe ir mas alla de Trello en:
- **Native script integration:** Importar y sincronizar con guiones
- **Shot list generation:** Crear cards automaticamente desde shot lists
- **Call sheet automation:** Generar PDFs profesionales desde las cards del dia
- **Continuity tracking:** Fotos automaticas linkeadas a escenas y tomas
- **Union hour tracking:** Registro nativo de horas de crew para compliance
- **Budget integration:** Cada escena/tarea con costo asociado
- **AI call sheet optimization:** Sugerir orden de escenas optimo por locacion y luz
- **Native video preview:** Reproducir dailies/videos adjuntos inline en cards
- **Multi-camera support:** Tracking de multiples camaras por toma (A cam, B cam, C cam)

---

## 13. REFERENCIAS Y CITAS

- **Landing page Trello:** https://trello.com/ (visitada directamente)
- **Pricing oficial:** https://trello.com/pricing (visitada directamente)
- **Templates gallery:** https://trello.com/templates (visitada directamente)
- **Inbox feature:** https://trello.com/inbox (visitada directamente)
- **Vistas:** https://trello.com/views y https://trello.com/guide/activate-views
- **Power-Ups:** https://trello.com/power-ups y https://support.atlassian.com/trello/docs/what-are-power-ups/
- **Butler Automation:** https://trello.com/butler-automation y https://trello.com/guide/automate-anything
- **Custom Fields:** https://support.atlassian.com/trello/docs/using-custom-fields/
- **Advanced Checklists:** https://support.atlassian.com/trello/docs/how-to-use-advanced-checklists-to-set-due-dates/
- **Card Back nuevo:** https://support.atlassian.com/trello/docs/new-card-back/
- **Notifications:** https://www.atlassian.com/blog/trello/trello-notifications-mark-as-read
- **Workspace management:** https://www.hipporello.com/blog/managing-your-trello-workspace-and-users
- **Trello Navigation:** https://support.atlassian.com/trello/docs/navigation-in-trello/
- **Trello labels guide:** https://www.atlassian.com/blog/trello/taco-tuesdays-learning-to-love-labels
- **Card covers:** https://support.atlassian.com/trello/docs/what-is-a-card-cover/
- **Community template gallery:** https://support.atlassian.com/trello/docs/community-template-gallery/
- **Card templates:** https://support.atlassian.com/trello/docs/creating-template-cards/
- **Trello Enterprise permissions:** https://trello.com/guide/enterprise/manage-permissions
- **Trello Inbox Slack integration:** https://support.atlassian.com/trello/docs/save-slack-messages-to-inbox/

---

*Documento generado como base arquitectonica para el desarrollo de una plataforma vertical de produccion cinematografica. Toda la informacion proviene de la interfaz publica de Trello y documentacion oficial de Atlassian, analizada en profundidad durante sesion de inspeccion directa.*
