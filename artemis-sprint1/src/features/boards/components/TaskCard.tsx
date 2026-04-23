'use client';

import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KanbanCard } from "../types";
import { Star, Film, DollarSign, Clock, AlertTriangle } from "lucide-react";

interface TaskCardProps {
  card: KanbanCard;
  index: number;
}

export function TaskCard({ card, index }: TaskCardProps) {
  const isHeroProp =
    card.artMetadata.department === "props" &&
    (card.artMetadata as Record<string, unknown>).heroProp === true;

  const isWeapon =
    card.artMetadata.department === "props" &&
    (card.artMetadata as Record<string, unknown>).weaponType !== undefined;

  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return null;
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const approvalBadge: Record<string, string> = {
    draft: "bg-gray-100 text-gray-600",
    submitted: "bg-blue-100 text-blue-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    on_hold: "bg-yellow-100 text-yellow-700",
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            left: "auto",
            top: "auto",
          }}
          className={snapshot.isDragging ? "opacity-90 rotate-1" : ""}
        >
          <Card
            className={`
              cursor-grab active:cursor-grabbing border-l-4
              ${isHeroProp ? "border-l-yellow-400 ring-1 ring-yellow-400/40" : "border-l-red-700"}
              ${snapshot.isDragging ? "shadow-xl ring-2 ring-slate-900/10" : "shadow-sm hover:shadow-md"}
              transition-shadow
            `}
          >
            <CardHeader className="pb-1 pt-3 px-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm leading-tight font-medium">
                  {card.title}
                </CardTitle>
                <div className="flex shrink-0 gap-1">
                  {isHeroProp && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                  {isWeapon && (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 pt-1 px-3 pb-3">
              {card.scriptReference && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Film className="h-3 w-3 shrink-0" />
                  <span className="font-medium">{card.scriptReference}</span>
                  {card.sceneNumbers && (
                    <span className="text-slate-400">
                      · Escenas {card.sceneNumbers.join(", ")}
                    </span>
                  )}
                </div>
              )}

              {card.estimatedCost !== undefined && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <DollarSign className="h-3 w-3 text-slate-400" />
                    <span className="font-semibold text-slate-700">
                      {formatCurrency(card.estimatedCost)}
                    </span>
                    {card.actualCost !== undefined && (
                      <span className="text-slate-400">
                        / {formatCurrency(card.actualCost)}
                      </span>
                    )}
                  </div>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      approvalBadge[card.approvalStatus || "draft"]
                    }`}
                  >
                    {card.approvalStatus || "draft"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-0.5">
                {card.dueDate && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(card.dueDate).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                )}
                {card.assignedTo && (
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                      {card.assignedTo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {card.assignedTo.name}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
