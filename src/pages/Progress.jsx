import PageShell from "../components/layout/PageShell.jsx";

// Página de progreso para mostrar el avance y métricas de aprendizaje.
export default function Progress() {
  return (
    <PageShell
      title="Mi Progreso de Aprendizaje"
      description="Seguimiento de tu avance en el audio-first curriculum."
    >
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-high p-8 text-on-surface-variant text-sm">
        Próximamente: stats, gráficos circulares y roadmap de aprendizaje.
      </div>
    </PageShell>
  );
}
