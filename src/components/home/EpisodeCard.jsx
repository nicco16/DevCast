import React from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext.jsx";

// Muestra una tarjeta de episodio y permite reproducirla al hacer clic.
export default function EpisodeCard({ episode, layout = "horizontal" }) {
  const navigate = useNavigate();
  const player = usePlayer();
  const playEpisode = player?.playEpisode;

  // Inicia la reproducción del episodio y redirige a la vista de explorar.
  const handlePlay = () => {
    if (!episode.audioUrl) return;
    playEpisode?.(episode);
    navigate("/explore");
  };

  const tag = episode.tags?.[0] || episode.category;

  if (layout === "horizontal") {
    return (
      <button
        type="button"
        disabled={!episode.audioUrl}
        aria-label={
          episode.audioUrl
            ? `Reproducir ${episode.title}`
            : `${episode.title} (audio no disponible)`
        }
        onClick={handlePlay}
        className="group w-full min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-outline-variant/30 bg-[#14171C]/60 text-left backdrop-blur-md transition-all duration-300 hover:border-[#adc6ff]/40 hover:shadow-[0_0_20px_rgba(173,198,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="h-40 relative overflow-hidden">
          <img
            src={episode.coverUrl}
            alt={episode.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {episode.audioUrl ? (
              <Play size={48} className="fill-primary text-primary" />
            ) : (
              <span className="rounded-full bg-black/70 px-3 py-2 text-xs font-semibold text-white">
                Audio no disponible
              </span>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="font-mono text-[10px] text-secondary font-semibold uppercase tracking-wider mb-1">
            {tag}
          </p>
          <h4 className="font-sans font-bold text-sm text-on-surface mb-2 truncate group-hover:text-primary transition-colors">
            {episode.title}
          </h4>
          <p className="font-mono text-[10px] text-on-surface-variant leading-none">
            {episode.duration} • {episode.releasedAt}
          </p>
        </div>
      </button>
    );
  }

  return null;
}
