'use client';

import React, { useCallback } from "react";
import { DragDropContext, type DropResult, type DragStart } from "@hello-pangea/dnd";
import { useBoard } from "../hooks/useBoard";
import { BoardColumn } from "./BoardColumn";

interface KanbanBoardProps {
  boardId: string;
}

export function KanbanBoard({ boardId }: KanbanBoardProps) {
  const { board, lists, moveCard, setDragging } = useBoard(boardId);

  const handleDragStart = useCallback(
    (start: DragStart) => {
      setDragging(true);
      console.log("[KanbanBoard] Drag start:", start.draggableId);
    },
    [setDragging]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      setDragging(false);
      const { destination, source, draggableId } = result;

      // Drop fuera de zona válida
      if (!destination) {
        console.log("[KanbanBoard] Dropped outside — no change");
        return;
      }

      // Misma posición exacta
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const success = moveCard(
        draggableId,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );

      if (success) {
        console.log(
          `[KanbanBoard] Card ${draggableId} moved from ${source.droppableId}[${source.index}] → ${destination.droppableId}[${destination.index}]`
        );
      }
    },
    [moveCard, setDragging]
  );

  const totalCards = lists.reduce((acc, list) => acc + list.cards.length, 0);
  const totalEstimated = lists.reduce(
    (acc, list) =>
      acc + list.cards.reduce((c, card) => c + (card.estimatedCost ?? 0), 0),
    0
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col bg-slate-50">
      {/* Header del tablero */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            {board.title}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Subdepartamento de Utilería · {totalCards} props ·{" "}
            {new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "EUR",
            }).format(totalEstimated)}{" "}
            estimados
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-200">
            <span className="text-xs font-medium text-slate-500">Presupuesto:</span>
            <span className="text-sm font-bold text-slate-700">
              €14,230 / €18,500
            </span>
            <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${Math.min((14230 / 18500) * 100, 100)}%` }}
              />
            </div>
          </div>
          <button className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 transition-colors shadow-sm">
            + Nueva Tarjeta
          </button>
        </div>
      </header>

      {/* Área Kanban scrollable */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <DragDropContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex h-full min-w-fit gap-4 p-4 items-start">
            {lists.map((list) => (
              <BoardColumn key={list.id} list={list} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
