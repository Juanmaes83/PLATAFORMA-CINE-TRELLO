import type {
  ArtMetadataBase,
  PropsMetadata,
  SetDecMetadata,
  GraphicsMetadata,
  ConstructionMetadata,
  User,
} from "@/types/card";

/** Tipo unión de todos los metadatos posibles */
export type AnyArtMetadata =
  | PropsMetadata
  | SetDecMetadata
  | GraphicsMetadata
  | ConstructionMetadata;

/** Tarjeta Kanban genérica - lista para extender por subdepartamento */
export interface KanbanCard {
  id: string;
  listId: string;
  title: string;
  description?: string;
  position: number;
  coverImageUrl?: string;
  dueDate?: string;
  scriptReference?: string;
  sceneNumbers?: number[];
  estimatedCost?: number;
  actualCost?: number;
  approvalStatus?: "draft" | "submitted" | "approved" | "rejected" | "on_hold";
  artMetadata: AnyArtMetadata;
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
}

/** Columna del tablero Kanban */
export interface KanbanList {
  id: string;
  boardId: string;
  title: string;
  position: number;
  workflowType?:
    | "graphics_pipeline"
    | "props_pipeline"
    | "set_dec_pipeline"
    | "construction_pipeline";
  cards: KanbanCard[];
}

/** Tablero completo */
export interface KanbanBoard {
  id: string;
  title: string;
  projectId: string;
  lists: KanbanList[];
}

/** Estado interno del hook useBoard */
export interface BoardState {
  board: KanbanBoard;
  isLoading: boolean;
  error: string | null;
  isDragging: boolean;
}
