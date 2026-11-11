import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Barra de búsqueda para filtrar contenido y navegar a explorar.
export default function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  // Envía la búsqueda a la ruta de explorar con el término ingresado.
  function onSubmit(e) {
    e.preventDefault();
    const trimmed = q.trim();
    navigate(`/explore${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ""}`);
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-sm">
      <div className="flex items-center gap-3 bg-surface-container-low border border-outline-variant/30 px-4 py-2 rounded-full w-full focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-200">
        <Search size={18} className="text-on-surface-variant/70 shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          placeholder="Buscar episodios, rutas..."
          className="bg-transparent border-none outline-none text-sm text-on-surface w-full placeholder:text-on-surface-variant/40"
          aria-label="Buscar"
        />
        <button type="submit" className="sr-only">
          Buscar
        </button>
      </div>
    </form>
  );
}
