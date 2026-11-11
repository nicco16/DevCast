import React from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Muestra la ruta de aprendizaje activa con un botón para continuar escuchando.
export default function LearningPathCard({ path, episode }) {
  const navigate = useNavigate();

  // Redirige a la vista de explorar para seguir la ruta de aprendizaje.
  const handleResume = () => {
    navigate("/explore");
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-surface-container-high border border-outline-variant/30 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
        <div className="p-8 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary font-mono text-[10px] font-semibold mb-4 w-fit border border-secondary-container/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            REPRODUCIENDO AHORA
          </div>

          <h4 className="font-mono text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">
            {path.title} • Episodio {episode.lessonNumber} de {path.totalLessons}
          </h4>
          <h2 className="font-sans text-2xl font-bold text-on-surface mb-2 leading-tight group-hover:text-primary transition-colors">
            {episode.title}
          </h2>
          <p className="font-sans text-sm text-on-surface-variant mb-6 leading-relaxed max-w-md">
            {episode.description}
          </p>

          <div className="mb-6 max-w-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-sans text-xs font-semibold text-primary">
                Progreso: {path.progressPercent}%
              </span>
              <span className="font-mono text-xs text-on-surface-variant">
                {episode.currentTime} / {episode.duration}
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-bright rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(173,198,255,0.5)] transition-all duration-500"
                style={{ width: `${path.progressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleResume}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-[#adc6ff]/90 text-on-primary rounded-xl font-sans text-sm font-bold transition-all duration-200 active:scale-95 hover:scale-[1.02] shadow-lg shadow-primary/20 w-fit cursor-pointer"
          >
            <Play size={16} className="fill-current" />
            Reanudar episodio
          </button>
        </div>

        <div className="relative min-h-[260px] lg:min-h-full overflow-hidden">
          <img
            src={episode.coverUrl}
            alt={episode.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 lg:opacity-80 group-hover:scale-[1.03] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-surface-container-high/40 to-transparent lg:bg-gradient-to-r lg:from-surface-container-high lg:via-surface-container-high/40 lg:to-transparent" />
        </div>
      </div>
    </div>
  );
}
