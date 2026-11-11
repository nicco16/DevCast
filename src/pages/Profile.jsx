import { useState } from "react";
import { Check } from "lucide-react";
import PageShell from "../components/layout/PageShell.jsx";
import { getUserName, setUserName } from "../lib/api.js";

// Página de perfil con detalles de la cuenta y preferencias del usuario.
export default function Profile() {
  const [name, setName] = useState(getUserName());
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("El nombre no puede estar vacío.");
      setSaved(false);
      return;
    }

    try {
      setUserName(trimmedName);
      setName(trimmedName);
      setSaved(true);
      setError("");
    } catch {
      setError("No pudimos guardar los cambios. Inténtalo otra vez.");
      setSaved(false);
    }
  }

  return (
    <PageShell
      title="Perfil"
      description="Tu cuenta y preferencias de escucha."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl rounded-2xl border border-outline-variant/20 bg-surface-container-high p-6 md:p-8"
      >
        <h2 className="text-lg font-semibold text-on-surface">Tu nombre</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Así te saludaremos cuando vuelvas a DevCast.
        </p>
        <label htmlFor="profile-name" className="mt-6 block text-sm font-medium text-on-surface">
          Nombre
        </label>
        <input
          id="profile-name"
          name="name"
          type="text"
          maxLength={40}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
            setError("");
          }}
          className="mt-2 w-full rounded-xl border border-outline-variant/40 bg-background/70 px-4 py-3 text-on-surface outline-none transition focus:border-primary/70 focus:ring-4 focus:ring-primary/10"
        />
        {error && <p role="alert" className="mt-2 text-sm text-error">{error}</p>}
        {saved && (
          <p role="status" className="mt-2 flex items-center gap-1.5 text-sm text-emerald-400">
            <Check size={16} />
            Cambios guardados.
          </p>
        )}
        <button
          type="submit"
          className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition hover:brightness-110"
        >
          Guardar cambios
        </button>
      </form>
    </PageShell>
  );
}
