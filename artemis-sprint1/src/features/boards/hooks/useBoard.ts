"use client";

import { useState, useCallback, useRef } from "react";
import type { KanbanList, KanbanCard, BoardState } from "../types";
import { MOCK_PROPS_LISTS } from "../data/mockData";

/**
 * Hook useBoard: Gestor de estado del tablero Kanban.
 *
 * Arquitectura: Este hook actúa como un "mock" temporal de un futuro
 * gestor de estado (Zustand/Redux) o de llamadas a Server Actions.
 * En la Fase 2, este hook será reemplazado por:
 *   - useSWR + Server Actions (Next.js)
 *   - O un store Zustand con persistencia optimista
 *
 * Principios:
 *   1. Optimistic UI: el estado local se actualiza INMEDIATAMENTE.
 *   2. Rollback automático: si la operación falla, revierte al snapshot.
 *   3. Posicionamiento fraccionario: evita colisiones en drag concurrente.
 */
export function useBoard(boardId: string) {
  const [state, setState] = useState<BoardState>({
    board: {
      id: boardId,
      title: "Props — La Sombra del Viento",
      projectId: "proj-lsv-001",
      lists: MOCK_PROPS_LISTS,
    },
    isLoading: false,
    error: null,
    isDragging: false,
  });

  // Snapshot para rollback en caso de error (simula "previousState")
  const snapshotRef = useRef<BoardState | null>(null);

  const saveSnapshot = useCallback(() => {
    snapshotRef.current = JSON.parse(JSON.stringify(state));
  }, [state]);

  const rollback = useCallback(() => {
    if (snapshotRef.current) {
      setState(snapshotRef.current);
      snapshotRef.current = null;
    }
  }, []);

  /**
   * Mueve una tarjeta entre listas o dentro de la misma lista.
   * Implementa optimistic update + posicionamiento fraccionario.
   */
  const moveCard = useCallback(
    (
      cardId: string,
      sourceListId: string,
      destListId: string,
      sourceIndex: number,
      destIndex: number
    ): boolean => {
      saveSnapshot();

      setState((prev) => {
        const newLists = prev.board.lists.map((l) => ({
          ...l,
          cards: [...l.cards],
        }));

        const sList = newLists.find((l) => l.id === sourceListId);
        const dList = newLists.find((l) => l.id === destListId);

        if (!sList || !dList) return prev;

        const [movedCard] = sList.cards.splice(sourceIndex, 1);
        if (!movedCard) return prev;

        movedCard.listId = destListId;

        // Cálculo de posición fraccionaria (patrón Trello)
        const dCards = dList.cards;
        let newPosition: number;

        if (destIndex === 0) {
          newPosition = dCards.length > 0 ? dCards[0].position / 2 : 65536;
        } else if (destIndex >= dCards.length) {
          const lastPos = dCards[dCards.length - 1]?.position ?? 0;
          newPosition = lastPos + 65536;
        } else {
          const prevPos = dCards[destIndex - 1].position;
          const nextPos = dCards[destIndex].position;
          newPosition = (prevPos + nextPos) / 2;
        }

        // Si la posición es demasiado cercana, rebalancear toda la lista destino
        const MIN_GAP = 1;
        const needsRebalance =
          destIndex > 0 &&
          destIndex < dCards.length &&
          Math.abs(newPosition - dCards[destIndex - 1].position) < MIN_GAP;

        if (needsRebalance) {
          const allDestCards = [...dCards];
          allDestCards.splice(destIndex, 0, movedCard);
          allDestCards.forEach((c, i) => {
            c.position = (i + 1) * 65536;
          });
        } else {
          movedCard.position = newPosition;
          dCards.splice(destIndex, 0, movedCard);
        }

        // Simular async: marcar loading brevemente
        return {
          ...prev,
          board: { ...prev.board, lists: newLists },
          isDragging: false,
        };
      });

      // Simular "llamada a Server Action" (Fase 2)
      // En este mock, siempre tiene éxito. En Fase 2:
      // const result = await serverMoveCard({ cardId, newListId, newPosition });
      // if (!result.success) rollback();

      return true;
    },
    [saveSnapshot]
  );

  const setDragging = useCallback((isDragging: boolean) => {
    setState((prev) => ({ ...prev, isDragging }));
  }, []);

  return {
    board: state.board,
    lists: state.board.lists,
    isLoading: state.isLoading,
    error: state.error,
    isDragging: state.isDragging,
    moveCard,
    setDragging,
    rollback,
  };
}
