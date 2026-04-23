/**
 * Interfaz genérica base para art_metadata de cualquier subdepartamento.
 * Cada departamento extenderá esta interfaz con sus campos específicos.
 */
export interface ArtMetadataBase {
  department: "graphics" | "props" | "set_decoration" | "construction";
  [key: string]: unknown;
}

/** Metadatos específicos del subdepartamento de Props (Utilería) */
export interface PropsMetadata extends ArtMetadataBase {
  department: "props";
  material?: string;
  era?: string;
  functional?: boolean;
  heroProp?: boolean;
  inventoryNumber?: string;
  propType?: "hand_prop" | "hero_prop" | "breakaway" | "soft_replica";
  safetyNotes?: string;
  weaponType?: string;
  armorerCheck?: boolean;
  safetyBriefingRequired?: boolean;
  quantity?: number;
}

/** Metadatos específicos del subdepartamento de Set Decoration */
export interface SetDecMetadata extends ArtMetadataBase {
  department: "set_decoration";
  style?: string;
  dimensions?: { width_cm: number; height_cm: number; depth_cm: number };
  supplier?: string;
  rentalDurationDays?: number;
  furnitureType?: "sofa" | "table" | "lamp" | "rug" | "curtain" | "other";
  era?: string;
}

/** Metadatos específicos del subdepartamento de Graphics */
export interface GraphicsMetadata extends ArtMetadataBase {
  department: "graphics";
  elementType?: "screen_graphic" | "printed_prop" | "signage" | "logo" | "texture";
  dimensionsCm?: { width: number; height: number };
  colorMode?: string;
  resolutionDpi?: number;
  clearanceStatus?: "pending" | "cleared" | "rejected";
  revisionRound?: number;
}

/** Metadatos específicos del subdepartamento de Construction */
export interface ConstructionMetadata extends ArtMetadataBase {
  department: "construction";
  structureType?: "wall" | "platform" | "ceiling" | "floor";
  material?: string;
  hoursEstimated?: number;
  hoursActual?: number;
  cadFileUrl?: string;
  scenicPaintCode?: string;
}

/** Usuario del sistema con rol cinematográfico */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role:
    | "ART_DIRECTOR"
    | "PROP_MASTER"
    | "SET_DECORATOR"
    | "CONSTRUCTION_COORDINATOR"
    | "LINE_PRODUCER"
    | "CREW";
}
