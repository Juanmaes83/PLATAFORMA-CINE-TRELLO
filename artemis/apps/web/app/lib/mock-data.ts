// Mock data para Sprint 1 (sin conexión a BD aún)
// Basado en el schema Prisma y los flujos Kanban del documento arquitectónico

export interface MockCard {
  id: string;
  listId: string;
  title: string;
  description?: string;
  position: number;
  coverImageUrl?: string;
  dueDate?: string;
  department?: "graphics" | "props" | "set_decoration" | "construction";
  scriptReference?: string;
  sceneNumbers?: number[];
  estimatedCost?: number;
  actualCost?: number;
  approvalStatus?: "draft" | "submitted" | "approved" | "rejected" | "on_hold";
  artMetadata?: Record<string, unknown>;
  assignedTo?: { name: string; avatar?: string };
  heroProp?: boolean;
  continuityPhotos?: string[];
}

export interface MockList {
  id: string;
  boardId: string;
  title: string;
  position: number;
  workflowType?: string;
  cards: MockCard[];
}

export const MOCK_LISTS: MockList[] = [
  {
    id: "list-props-1",
    boardId: "board-props-main",
    title: "🔍 Necesidad Detectada",
    position: 1000,
    workflowType: "props_pipeline",
    cards: [
      {
        id: "card-hero-zippo",
        listId: "list-props-1",
        title: "Encendedor Zippo de plata (Hero Prop)",
        description:
          'El detective saca un encendedor Zippo de plata y lo hace girar sobre la mesa. ESC 42 - INT. OFICINA - DÍA. Material: plata. Época: años 40.',
        position: 1000,
        department: "props",
        scriptReference: "ESC 42 - INT. OFICINA - DÍA",
        sceneNumbers: [42],
        estimatedCost: 350.0,
        approvalStatus: "draft",
        heroProp: true,
        assignedTo: { name: "Carlos Pérez", avatar: "/avatars/carlos.jpg" },
        artMetadata: {
          material: "plata",
          era: "1940s",
          functional: true,
          heroProp: true,
          inventoryNumber: "PR-234",
          propType: "hand_prop",
          safetyNotes: "No flame - decorative mechanism only",
        },
      },
      {
        id: "card-file-folder",
        listId: "list-props-1",
        title: "Carpeta de expediente manila",
        description: "Expediente que sostiene el protagonista. 5 unidades para rotura.",
        position: 2000,
        department: "props",
        scriptReference: "ESC 42-43",
        sceneNumbers: [42, 43],
        estimatedCost: 45.0,
        approvalStatus: "draft",
        heroProp: false,
        artMetadata: {
          quantity: 5,
          propType: "breakaway",
          material: "paper_mache",
          notes: "Pre-weathered, coffee stain marks",
        },
      },
    ],
  },
  {
    id: "list-props-2",
    boardId: "board-props-main",
    title: "🔎 Búsqueda / Alquiler",
    position: 2000,
    workflowType: "props_pipeline",
    cards: [
      {
        id: "card-typewriter",
        listId: "list-props-2",
        title: "Máquina de escribir Underwood No. 5",
        description: "Funcional para primeros planos de dedos tecleando. Alquiler 3 semanas.",
        position: 1000,
        department: "props",
        scriptReference: "ESC 42",
        sceneNumbers: [42],
        estimatedCost: 420.0,
        approvalStatus: "submitted",
        heroProp: false,
        assignedTo: { name: "María González", avatar: "/avatars/maria.jpg" },
        artMetadata: {
          supplier: "Vintage Props Madrid",
          rentalDurationDays: 21,
          functional: true,
          era: "1930s",
          inventoryNumber: "PR-198",
        },
      },
    ],
  },
  {
    id: "list-props-3",
    boardId: "board-props-main",
    title: "📦 Adquirido / Reservado",
    position: 3000,
    workflowType: "props_pipeline",
    cards: [
      {
        id: "card-whiskey-bottle",
        listId: "list-props-3",
        title: "Botella whisky medio vacía + etiqueta custom",
        description: "Botella de cristal con etiqueta diseñada por Graphics. Contenido: té frío.",
        position: 1000,
        department: "props",
        scriptReference: "ESC 45",
        sceneNumbers: [45],
        estimatedCost: 120.0,
        actualCost: 135.0,
        approvalStatus: "approved",
        heroProp: false,
        artMetadata: {
          graphicsRef: "GFX-77",
          labelApproved: true,
          contents: "cold_tea",
          bottleType: "crystal",
          quantity: 3,
        },
      },
    ],
  },
  {
    id: "list-props-4",
    boardId: "board-props-main",
    title: "🛠️ En Taller (Preparación)",
    position: 4000,
    workflowType: "props_pipeline",
    cards: [
      {
        id: "card-fake-gun",
        listId: "list-props-4",
        title: "Revolver Colt 1911 (réplica soft)",
        description: "Para escena de forcejeo. Material: goma EVA pintada. Safety briefing obligatorio.",
        position: 1000,
        department: "props",
        scriptReference: "ESC 38",
        sceneNumbers: [38],
        estimatedCost: 85.0,
        approvalStatus: "approved",
        heroProp: false,
        artMetadata: {
          weaponType: "soft_replica",
          material: "eva_foam",
          safetyStatus: "cold_gun",
          armorerCheck: true,
          safetyBriefingRequired: true,
        },
      },
    ],
  },
  {
    id: "list-props-5",
    boardId: "board-props-main",
    title: "🎬 En Set (Rodaje)",
    position: 5000,
    workflowType: "props_pipeline",
    cards: [],
  },
  {
    id: "list-props-6",
    boardId: "board-props-main",
    title: "🏠 Devuelto / Almacén",
    position: 6000,
    workflowType: "props_pipeline",
    cards: [],
  },
];
