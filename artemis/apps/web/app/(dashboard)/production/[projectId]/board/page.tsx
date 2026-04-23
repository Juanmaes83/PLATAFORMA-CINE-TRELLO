import Board from "@/components/Board";
import { MOCK_LISTS } from "@/app/lib/mock-data";

interface BoardPageProps {
  params: {
    projectId: string;
  };
}

export default function BoardPage({ params }: BoardPageProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header del tablero */}
      <div className="flex items-center justify-between border-b bg-white px-6 py-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Props — La Sombra del Viento
          </h1>
          <p className="text-sm text-gray-500">
            Subdepartamento de Utilería · Día 12 de rodaje
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5">
            <span className="text-xs font-medium text-gray-500">Presupuesto:</span>
            <span className="text-sm font-semibold text-gray-700">€14,230 / €18,500</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[77%] rounded-full bg-green-500" />
            </div>
          </div>
          <button className="rounded-md bg-props px-4 py-2 text-sm font-medium text-white hover:bg-props-dark">
            + Nueva Tarjeta
          </button>
        </div>
      </div>

      {/* Área Kanban */}
      <div className="flex-1 overflow-hidden">
        <Board initialLists={MOCK_LISTS} projectId={params.projectId} />
      </div>
    </div>
  );
}
