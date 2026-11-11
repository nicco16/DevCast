import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/home/HomeHeader.jsx";
import { usePlayer } from "../context/PlayerContext.jsx";
import * as api from "../lib/api.js";

// Página principal orientada a guiar al usuario desde el primer paso del aprendizaje.
export default function Home() {
  const navigate = useNavigate();
  const player = usePlayer();
  const playEpisode = player?.playEpisode;
  const userName = api.getUserName();

  const [episodes, setEpisodes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [developerNews, setDeveloperNews] = useState([]);

  // Carga los datos iniciales de episodios, categorías, rutas y novedades.
  useEffect(() => {
    let mounted = true;
    api.getEpisodes().then((e) => mounted && setEpisodes(e));
    api.getCategories().then((c) => mounted && setCategories(c));
    api.getLearningPaths().then((p) => mounted && setLearningPaths(p));
    api.getDeveloperNews().then((news) => mounted && setDeveloperNews(news));
    return () => (mounted = false);
  }, []);

  // Busca la ruta de aprendizaje activa y el episodio principal para mostrar.
  const activePath = learningPaths.find((p) => p.id === "html-fundamentals") || learningPaths[0];
  const activeEpisode = episodes.find((e) => e.id === "html-structure") || episodes[0];
  const recommendedEpisodes = episodes.filter((episode) => episode.learningPathTitle === activePath?.title).slice(0, 3);

  const roadmapSteps = [
    {
      title: "HTML Fundamentals",
      description: "Estructura y semántica del contenido web",
      state: activePath?.id === "html-fundamentals" ? "current" : "completed",
    },
    {
      title: "CSS Fundamentals",
      description: "Estilos, diseño y organización visual",
      state: activePath?.id === "css-fundamentals" ? "current" : "upcoming",
    },
    {
      title: "JavaScript Fundamentals",
      description: "Lógica, interacción y comportamiento",
      state: activePath?.id === "js-fundamentals" ? "current" : "upcoming",
    },
    {
      title: "Git & GitHub",
      description: "Control de cambios y colaboración",
      state: "upcoming",
    },
    {
      title: "React Fundamentals",
      description: "Componentes y interfaces modernas",
      state: "upcoming",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <HomeHeader showMobileSearch />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop py-8 max-w-[1200px] mx-auto space-y-10">
        <section className="rounded-[28px] border border-outline-variant/20 bg-[#14171C]/70 p-6 md:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-md">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Continuar tu viaje de aprendizaje
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
                {userName ? (
                  <>Bienvenido de nuevo, <span className="text-primary">{userName}</span> 👋</>
                ) : (
                  <>¡A seguir aprendiendo! 👋</>
                )}
              </h1>
              <p className="mt-3 text-lg font-semibold text-on-surface">Frontend Developer Path</p>
              <p className="mt-2 text-sm text-on-surface-variant">
                Estás aprendiendo desde cero con una ruta clara, paso a paso.
              </p>

              <div className="mt-6 rounded-2xl border border-outline-variant/20 bg-surface-container-high/70 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
                  Actualmente estás en
                </p>
                <h2 className="mt-2 text-xl font-semibold text-on-surface">{activePath?.title || "Fundamentos de HTML"}</h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Episodio {activeEpisode?.lessonNumber || 1} de {activePath?.totalLessons || 10}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-primary">{activeEpisode?.title || "Estructura del documento HTML"}</h3>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-on-surface-variant">
                  <span>Progreso</span>
                  <span>{activePath?.progressPercent ?? 0}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-bright">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${activePath?.progressPercent ?? 0}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/explore")}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-all duration-200 hover:scale-[1.01]"
                >
                  ▶ Continuar aprendiendo
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/explore?q=html")}
                  className="inline-flex items-center justify-center rounded-full border border-outline-variant/30 bg-transparent px-5 py-3 text-sm font-semibold text-on-surface transition-all duration-200 hover:border-primary/40 hover:text-primary"
                >
                  Ver ruta de aprendizaje
                </button>
              </div>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-outline-variant/20 bg-surface-container-high/60 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
                Tu siguiente paso
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-outline-variant/20 bg-surface-container/70 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Inicio</p>
                  <p className="mt-1 text-sm font-semibold text-on-surface">HTML Fundamentals</p>
                </div>
                <div className="rounded-xl border border-outline-variant/20 bg-surface-container/70 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Próximo</p>
                  <p className="mt-1 text-sm font-semibold text-on-surface">CSS Fundamentals</p>
                </div>
                <div className="rounded-xl border border-outline-variant/20 bg-surface-container/70 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Meta</p>
                  <p className="mt-1 text-sm font-semibold text-on-surface">React Fundamentals</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-outline-variant/20 bg-surface-container-high/60 p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">Ruta guiada</p>
              <h3 className="mt-1 text-xl font-bold text-on-surface">Frontend Developer Journey</h3>
            </div>
            <span className="text-sm font-semibold text-primary">Paso a paso</span>
          </div>

          <div className="mt-6 space-y-3">
            {roadmapSteps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-outline-variant/15 bg-surface-container/70 p-4">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    step.state === "current"
                      ? "border-primary/40 bg-primary/15 text-primary shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                      : step.state === "completed"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-outline-variant/20 bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {step.state === "completed" ? "✓" : step.state === "current" ? "●" : index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`font-semibold ${step.state === "current" ? "text-primary" : "text-on-surface"}`}>
                      {step.title}
                    </p>
                    {step.state === "upcoming" && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-on-surface-variant">
                        Próximamente
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-on-surface-variant">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-outline-variant/20 bg-surface-container-high/60 p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">Empieza aquí</p>
              <h3 className="mt-1 text-xl font-bold text-on-surface">Recommended Episodes</h3>
            </div>
            <span className="text-sm font-semibold text-primary">Ruta recomendada</span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {recommendedEpisodes.map((episode) => (
              <article key={episode.id} className="rounded-2xl border border-outline-variant/15 bg-surface-container/70 p-4">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-on-surface-variant">
                  <span>{episode.learningPathTitle || "Fundamentos"}</span>
                  <span>{episode.duration}</span>
                </div>
                <h4 className="mt-3 text-base font-semibold text-on-surface">{episode.title}</h4>
                <p className="mt-2 text-sm text-on-surface-variant">{episode.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                    Principiante
                  </span>
                  <button
                    type="button"
                    disabled={!episode.audioUrl}
                    aria-label={
                      episode.audioUrl
                        ? `Reproducir ${episode.title}`
                        : `${episode.title} (audio no disponible)`
                    }
                    onClick={() => {
                      if (!episode.audioUrl) return;
                      playEpisode?.(episode);
                      navigate("/explore");
                    }}
                    className="rounded-full bg-surface-container-high px-3 py-2 text-sm font-semibold text-on-surface transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {episode.audioUrl ? "▶" : "Sin audio"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-outline-variant/20 bg-surface-container-high/60 p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">Mantente al día</p>
              <h3 className="mt-1 text-xl font-bold text-on-surface">Developer News</h3>
            </div>
            <span className="text-sm font-semibold text-primary">Lo más reciente</span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {developerNews.slice(0, 3).map((item) => (
              <article key={item.title} className="rounded-2xl border border-outline-variant/15 bg-surface-container/70 p-4">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-on-surface-variant">
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold text-on-surface">{item.title}</h4>
                <p className="mt-2 text-sm text-on-surface-variant">{item.description}</p>
                <button type="button" className="mt-4 text-sm font-semibold text-primary hover:underline">
                  Leer más
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6" id="categories">
          <div className="flex flex-col gap-5 rounded-[24px] border border-outline-variant/20 bg-surface-container-high/60 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
                Explora lo esencial
              </p>
              <h3 className="mt-1 text-xl font-bold text-on-surface">Aprende por temas</h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                {categories.length} categorías y {categories.reduce((total, category) => total + category.totalEpisodes, 0)} episodios para seguir creciendo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-primary/30 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Ver todas las categorías
              <span className="ml-2" aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
