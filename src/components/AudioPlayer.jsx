import React from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import { usePlayer } from "../context/PlayerContext.jsx";

function formatTime(seconds) {
  const totalSeconds = Math.max(0, Math.floor(seconds || 0));
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

// Muestra el reproductor de audio inferior con la información del episodio actual.
export default function AudioPlayer() {
  const {
    current,
    isPlaying,
    toggle,
    playNextEpisode,
    progress,
    currentTime,
    duration,
    seek,
  } = usePlayer();

  if (!current) return null;

  const progressValue = Math.min(100, Math.max(0, progress));
  const durationLabel = duration > 0 ? formatTime(duration) : current.duration || "0:00";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/20 bg-surface-container/95 px-4 py-3 md:left-60 md:px-6 md:py-4 md:pr-6 backdrop-blur-xl glass-card"
      role="region"
      aria-label="Reproductor de audio"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 md:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl md:h-16 md:w-16">
            <img src={current.coverUrl} alt="cover" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="truncate font-semibold text-on-surface" aria-live="polite">
              {current.title}
            </div>
            <div className="truncate text-xs text-on-surface-variant">
              {current.learningPathTitle || current.category}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progressValue}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Posición de reproducción"
            title="Arrastra para cambiar la posición de reproducción"
            className="w-full min-w-0 cursor-pointer accent-primary"
          />
          <div
            className="mt-1 flex justify-between text-[10px] leading-none tabular-nums text-on-surface-variant"
            aria-label="Tiempo de reproducción"
          >
            <span>{formatTime(currentTime)}</span>
            <span>{durationLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={playNextEpisode}
            aria-label="Siguiente capítulo"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-primary/10 hover:text-primary md:h-11 md:w-11"
          >
            <SkipForward size={18} />
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            aria-pressed={isPlaying}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-200 md:h-12 md:w-12 ${
              isPlaying
                ? "border-primary/40 bg-primary/15 text-primary shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                : "border-outline-variant/30 bg-surface-container-high text-on-surface hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
