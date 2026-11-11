// Importa el componente base de la página para mantener el diseño consistente.
import PageShell from "../components/layout/PageShell.jsx";

// Define la vista de episodios guardados o favoritos del usuario.
export default function Bookmarks() {
  return (
    // Envuelve el contenido en el layout general de la página.
    <PageShell
      // Título que aparece en la cabecera de la vista.
      title="Episodios Guardados"
      // Descripción breve de lo que muestra esta sección.
      description="Tus episodios guardados para escuchar cuando quieras."
    >
      {/* Contenedor del estado actual de la vista, con un mensaje temporal. */}
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-high p-8 text-on-surface-variant text-sm">
        {/* Texto informativo mientras la lista de episodios guardados no está implementada. */}
        Próximamente: grid de episodios guardados.
      </div>
    </PageShell>
  );
}
