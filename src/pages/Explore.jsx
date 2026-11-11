import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import PageShell from "../components/layout/PageShell.jsx";
import EpisodeCard from "../components/home/EpisodeCard.jsx";
import * as api from "../lib/api.js";

// Extrae los parámetros de búsqueda de la URL para filtrar contenido.
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

// Página de exploración con listado de episodios y categorías filtrables.
export default function Explore() {
  const [episodes, setEpisodes] = useState([]);
  const query = useQuery();
  const q = query.get("q") || "";

  // Carga episodios y categorías al montar la vista.
  useEffect(() => {
    let mounted = true;
    api.getEpisodes().then((e) => mounted && setEpisodes(e));
    return () => (mounted = false);
  }, []);

  // Filtra episodios según el texto de búsqueda introducido.
  const filteredEpisodes = useMemo(() => {
    if (!q) return episodes;
    const t = q.toLowerCase();
    return episodes.filter(
      (e) =>       (e.title || "").toLowerCase().includes(t) ||
      (e.description || "").toLowerCase().includes(t) ||
      (e.learningPathTitle || "").toLowerCase().includes(t)
    );
  }, [episodes, q]);

  const episodesByTheme = useMemo(() => {
    const grouped = new Map();

    filteredEpisodes.forEach((ep) => {
      const theme = ep.learningPathTitle || "Otros temas";
      if (!grouped.has(theme)) grouped.set(theme, []);
      grouped.get(theme).push(ep);
    });

    const themeOrder = ["Fundamentos de HTML", "Fundamentos de CSS", "Fundamentos de JavaScript"];
    return Array.from(grouped.entries())
      .map(([theme, list]) => ({ theme, list }))
      .sort((a, b) => {
        const indexA = themeOrder.indexOf(a.theme);
        const indexB = themeOrder.indexOf(b.theme);
        return (indexA === -1 ? themeOrder.length : indexA) - (indexB === -1 ? themeOrder.length : indexB);
      });
  }, [filteredEpisodes]);

  return (
    <PageShell title="Explorar" description="Sigue los fundamentos esenciales de HTML, CSS y JavaScript.">
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-bold">Resultados de Episodios</h2>
          <div className="mt-4 space-y-6">
            {episodesByTheme.length > 0 ? (
              episodesByTheme.map(({ theme, list }) => (
                <div key={theme}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{theme}</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {list.map((ep) => (
                      <EpisodeCard key={ep.id} episode={ep} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">No hay episodios para esta búsqueda.</p>
            )}
          </div>
        </section>

      </div>
    </PageShell>
  );
}
