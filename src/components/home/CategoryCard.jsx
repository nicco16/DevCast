import React from "react";
import { Atom, Code2, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Devuelve el icono visual según la categoría seleccionada.
function renderIcon(category) {
  const iconSize = 22;

  switch (category.slug) {
    case "javascript":
      return (
        <span className="font-sans font-black text-sm tracking-tighter text-[#101418]">JS</span>
      );
    case "html":
      return <Code2 size={iconSize} className={category.textClass} />;
    case "css":
      return <Palette size={iconSize} className={category.textClass} />;
    default:
      return <Atom size={iconSize} className={category.textClass} />;
  }
}

// Asigna un color visual según el tipo de categoría.
function getProgressColor(slug) {
  switch (slug) {
    case "javascript":
      return "bg-[#f7df1e]";
    case "html":
      return "bg-[#6ee7f9]";
    case "css":
      return "bg-[#8b5cf6]";
    default:
      return "bg-primary";
  }
}

// Muestra una tarjeta con información de una categoría y su progreso.
export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/explore?q=${encodeURIComponent(category.title)}`)}
      className="w-full text-left bg-[#14171C]/60 backdrop-blur-md border border-outline-variant/20 p-6 rounded-2xl transition-all duration-300 hover:bg-surface-bright/40 cursor-pointer hover:border-primary/30 hover:scale-[1.01]"
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${category.slug === "javascript" ? "bg-[#f7df1e]" : category.bgClass} flex items-center justify-center font-bold`}
        >
          {renderIcon(category)}
        </div>
        <span className="font-mono text-xs text-on-surface-variant">
          {category.totalEpisodes} episodios
        </span>
      </div>

      <h4 className="font-sans text-lg font-bold text-on-surface mb-4">{category.title}</h4>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs font-medium text-on-surface-variant">
          <span>Progreso</span>
          <span>{category.progressPercent}%</span>
        </div>
        <div className="w-full h-1 bg-surface-bright rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor(category.slug)} rounded-full transition-all duration-500`}
            style={{ width: `${category.progressPercent}%` }}
          />
        </div>
      </div>
    </button>
  );
}
