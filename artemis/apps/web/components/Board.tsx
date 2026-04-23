'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
  DragUpdate,
} from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@artemis/ui/components/Card';
import { Avatar } from '@artemis/ui/components/Avatar';
import { moveCard } from '@/app/actions/move-card';
import type { MockList, MockCard } from '@/app/lib/mock-data';
import { Star, Clock, DollarSign, Film } from 'lucide-react';

interface BoardProps {
  initialLists: MockList[];
  projectId: string;
}

interface BoardState {
  lists: MockList[];
  isDragging: boolean;
  dragSource: { listId: string; cardId: string } | null;
}

export default function Board({ initialLists, projectId }: BoardProps) {
  const [state, setState] = useState<BoardState>({
    lists: initialLists,
    isDragging: false,
    dragSource: null,
  });

  // Estado previo para rollback en caso de error de server action
  const [previousState, setPreviousState] = useState<BoardState | null>(null);

  // Guardar estado antes de iniciar drag
  const handleDragStart = useCallback((start: DragStart) => {
    setPreviousState({ ...state });
    setState((prev) => ({
      ...prev,
      isDragging: true,
      dragSource: {
        listId: start.source.droppableId,
        cardId: start.draggableId,
      },
    }));
  }, [state]);

  // Reordenar visualmente durante drag
  const handleDragUpdate = useCallback((update: DragUpdate) => {
    if (!update.destination) return;

    const sourceListId = update.source.droppableId;
    const destListId = update.destination.droppableId;
    const sourceIndex = update.source.index;
    const destIndex = update.destination.index;

    setState((prev) => {
      const newLists = [...prev.lists];
      const sourceListIdx = newLists.findIndex((l) => l.id === sourceListId);
      const destListIdx = newLists.findIndex((l) => l.id === destListId);

      if (sourceListIdx === -1 || destListIdx === -1) return prev;

      const sourceList = { ...newLists[sourceListIdx] };
      const destList =
        sourceListId === destListId
          ? sourceList
          : { ...newLists[destListIdx] };

      const [movedCard] = sourceList.cards.splice(sourceIndex, 1);

      // Calcular nueva posición fraccionaria
      const destCards = destList.cards;
      let newPosition: number;

      if (destIndex === 0) {
        newPosition = destCards.length > 0 ? destCards[0].position / 2 : 1000;
      } else if (destIndex >= destCards.length) {
        newPosition =
          destCards.length > 0
            ? destCards[destCards.length - 1].position + 1000
            : 1000;
      } else {
        const prevPos = destCards[destIndex - 1].position;
        const nextPos = destCards[destIndex].position;
        newPosition = (prevPos + nextPos) / 2;
      }

      movedCard.position = newPosition;
      movedCard.listId = destListId;

      destList.cards.splice(destIndex, 0, movedCard);
      newLists[sourceListIdx] = sourceList;
      if (sourceListId !== destListId) {
        newLists[destListIdx] = destList;
      }

      return { ...prev, lists: newLists };
    });
  }, []);

  // Finalizar drag y persistir
  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source, draggableId } = result;

      setState((prev) => ({ ...prev, isDragging: false, dragSource: null }));

      // Drop fuera de zona válida → revertir
      if (!destination) {
        if (previousState) {
          setState(previousState);
        }
        return;
      }

      // Posición sin cambio → nada que hacer
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // Obtener la tarjeta movida con su nueva posición
      const destList = state.lists.find((l) => l.id === destination.droppableId);
      const movedCard = destList?.cards.find((c) => c.id === draggableId);

      if (!movedCard) {
        if (previousState) {
          setState(previousState);
        }
        return;
      }

      // Llamar Server Action con optimistic update ya aplicado
      try {
        const response = await moveCard({
          cardId: draggableId,
          newListId: destination.droppableId,
          newPosition: movedCard.position,
        });

        if (!response.success) {
          // Rollback: restaurar estado previo al drag
          console.error('[Board] Server action failed:', response.error);
          if (previousState) {
            setState(previousState);
          }
        }
      } catch (error) {
        console.error('[Board] Network/server error during move:', error);
        if (previousState) {
          setState(previousState);
        }
      }
    },
    [state.lists, previousState]
  );

  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return null;
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getApprovalBadge = (status?: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-600',
      submitted: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      on_hold: 'bg-yellow-100 text-yellow-700',
    };
    return styles[status || 'draft'] || styles.draft;
  };

  return (
    <div className="h-full w-full overflow-x-auto">
      <DragDropContext
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-full min-w-fit gap-4 p-4">
          {state.lists.map((list) => (
            <div
              key={list.id}
              className="flex w-[300px] shrink-0 flex-col rounded-lg bg-gray-100/80"
            >
              {/* Header de lista */}
              <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-700">
                  {list.title}
                </h3>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {list.cards.length}
                </span>
              </div>

              {/* Área droppable */}
              <Droppable droppableId={list.id} type="CARD">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 rounded-b-lg px-2 pb-2 ${
                      snapshot.isDraggingOver ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      {list.cards.map((card, index) => (
                        <Draggable
                          key={card.id}
                          draggableId={card.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                left: 'auto',
                                top: 'auto',
                              }}
                            >
                              <Card
                                isDragging={snapshot.isDragging}
                                heroProp={card.heroProp}
                                department={card.department}
                                className="cursor-grab active:cursor-grabbing"
                              >
                                {card.coverImageUrl && (
                                  <div className="relative h-24 w-full overflow-hidden rounded-t-lg">
                                    <img
                                      src={card.coverImageUrl}
                                      alt={card.title}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                )}
                                <CardHeader className="pb-1 pt-3">
                                  <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-sm leading-tight">
                                      {card.title}
                                    </CardTitle>
                                    {card.heroProp && (
                                      <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-2 pt-1">
                                  {card.scriptReference && (
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <Film className="h-3 w-3" />
                                      <span>{card.scriptReference}</span>
                                    </div>
                                  )}

                                  {card.estimatedCost !== undefined && (
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-1 text-xs">
                                        <DollarSign className="h-3 w-3 text-gray-400" />
                                        <span className="font-medium text-gray-700">
                                          {formatCurrency(card.estimatedCost)}
                                        </span>
                                        {card.actualCost !== undefined && (
                                          <span className="text-gray-400">
                                            / {formatCurrency(card.actualCost)}
                                          </span>
                                        )}
                                      </div>
                                      <span
                                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                                          getApprovalBadge(card.approvalStatus)
                                        }`}
                                      >
                                        {card.approvalStatus || 'draft'}
                                      </span>
                                    </div>
                                  )}

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                      {card.dueDate && (
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                          <Clock className="h-3 w-3" />
                                          <span>
                                            {new Date(
                                              card.dueDate
                                            ).toLocaleDateString('es-ES', {
                                              day: 'numeric',
                                              month: 'short',
                                            })}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    {card.assignedTo && (
                                      <Avatar
                                        src={card.assignedTo.avatar}
                                        fallback={card.assignedTo.name}
                                        size="sm"
                                      />
                                    )}
                                  </div>

                                  {card.continuityPhotos &&
                                    card.continuityPhotos.length > 0 && (
                                      <div className="flex -space-x-1">
                                        {card.continuityPhotos
                                          .slice(0, 3)
                                          .map((photo, i) => (
                                            <div
                                              key={i}
                                              className="h-6 w-6 overflow-hidden rounded border-2 border-white"
                                            >
                                              <img
                                                src={photo}
                                                alt={`Continuidad ${i + 1}`}
                                                className="h-full w-full object-cover"
                                              />
                                            </div>
                                          ))}
                                        {card.continuityPhotos.length > 3 && (
                                          <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-white bg-gray-100 text-[10px] font-medium text-gray-500">
                                            +{card.continuityPhotos.length - 3}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
