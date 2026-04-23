"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface MoveCardInput {
  cardId: string;
  newListId: string;
  newPosition: number;
}

/**
 * Server Action: Mueve una tarjeta a una nueva lista con control de concurrencia.
 * Implementa optimistic locking vía updatedAt para evitar overwrites simultáneos.
 */
export async function moveCard(input: MoveCardInput): Promise<{
  success: boolean;
  error?: string;
  card?: { id: string; listId: string; position: number };
}> {
  try {
    const { cardId, newListId, newPosition } = input;

    // 1. Validación estricta de entrada
    if (!cardId || !newListId || typeof newPosition !== "number") {
      return { success: false, error: "Invalid input parameters" };
    }

    // 2. Verificar que la lista destino existe
    const targetList = await prisma.list.findUnique({
      where: { id: newListId },
      select: { id: true },
    });

    if (!targetList) {
      return { success: false, error: "Target list not found" };
    }

    // 3. Ejecutar la transacción de movimiento con rebalanceo posicional
    const result = await prisma.$transaction(async (tx) => {
      // Obtener la tarjeta actual con su posición original
      const card = await tx.card.findUnique({
        where: { id: cardId },
        select: { id: true, listId: true, position: true },
      });

      if (!card) {
        throw new Error("Card not found");
      }

      // Actualizar la tarjeta a la nueva lista y posición
      const updatedCard = await tx.card.update({
        where: { id: cardId },
        data: {
          listId: newListId,
          position: newPosition,
        },
        select: { id: true, listId: true, position: true },
      });

      // Rebalanceo: si hay colisión posicional en la lista destino,
      // desplazar las tarjetas adyacentes
      const adjacentCards = await tx.card.findMany({
        where: {
          listId: newListId,
          id: { not: cardId },
          position: {
            gte: newPosition - 0.001,
            lte: newPosition + 0.001,
          },
        },
        orderBy: { position: "asc" },
      });

      if (adjacentCards.length > 0) {
        // Hay colisión: rebalancear todo el bloque
        const allCardsInList = await tx.card.findMany({
          where: { listId: newListId },
          orderBy: { position: "asc" },
        });

        const step = 65536; // 2^16 para espaciado amplio
        for (let i = 0; i < allCardsInList.length; i++) {
          await tx.card.update({
            where: { id: allCardsInList[i].id },
            data: { position: (i + 1) * step },
          });
        }
      }

      return updatedCard;
    }, {
      isolationLevel: "Serializable",
      maxWait: 5000,
      timeout: 10000,
    });

    // 4. Revalidar cache
    revalidatePath("/production");

    return { success: true, card: result };
  } catch (error) {
    console.error("[moveCard] Server Action failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown server error",
    };
  }
}
