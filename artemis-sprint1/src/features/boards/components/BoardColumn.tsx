'use client';

import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import type { KanbanList } from "../types";
import { TaskCard } from "./TaskCard";

interface BoardColumnProps {
  list: KanbanList;
}

export function BoardColumn({ list }: BoardColumnProps) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col rounded-xl bg-slate-100/80 border border-slate-200/60">
      {/* Header de columna */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-200/50">
        <h3 className="text-sm font-bold text-slate-700 tracking-tight">
          {list.title}
        </h3>
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-200/80 px-1.5 text-[11px] font-bold text-slate-600 tabular-nums">
          {list.cards.length}
        </span>
      </div>

      {/* Área droppable */}
      <Droppable droppableId={list.id} type="CARD">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 min-h-[120px] rounded-b-xl p-2.5
              transition-colors duration-150
              ${snapshot.isDraggingOver ? "bg-blue-50/60 ring-inset ring-2 ring-blue-200/50" : ""}
            `}
          >
            <div className="flex flex-col gap-2.5">
              {list.cards.map((card, index) => (
                <TaskCard key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}
