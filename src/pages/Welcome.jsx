import React, { useState } from "react";
import { ArrowRight, Headphones, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/layout/Logo.jsx";
import { setUserName } from "../lib/api.js";

export default function Welcome() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Escribe tu nombre para continuar.");
      return;
    }

    try {
      setUserName(trimmedName);
      navigate("/", { replace: true });
    } catch {
      setError("No pudimos guardar tu nombre. Revisa la configuración del navegador e inténtalo otra vez.");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12">
      <div className="pointer-events-none absolute -left-32 top-[-8rem] h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-outline-variant/25 bg-surface-container-low/90 shadow-[0_30px_100px_rgba(0,0,0,0.4)] md:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-between bg-gradient-to-br from-primary/10 via-surface-container-low to-secondary/10 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Logo size={26} />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-primary">DevCast</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                Audio for devs
              </p>
            </div>
          </div>

          <div className="my-12 max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles size={14} />
              Aprende a tu ritmo
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-on-surface sm:text-5xl">
              Tus próximos pasos en desarrollo,{" "}
              <span className="text-primary">en tus oídos.</span>
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-on-surface-variant">
              Rutas claras, episodios cortos y nuevas ideas para acompañar tu camino como developer.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-on-surface-variant">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-primary">
              <Headphones size={18} />
            </span>
            Un buen momento para aprender puede empezar ahora.
          </div>
        </section>

        <section className="flex items-center bg-surface-container-high/40 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Empecemos
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-on-surface">
              ¿Cómo te llamas?
            </h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              Personalizamos tu espacio para que cada visita se sienta tuya.
            </p>

            <label htmlFor="user-name" className="mt-8 block text-sm font-medium text-on-surface">
              Tu nombre
            </label>
            <input
              autoFocus
              autoComplete="given-name"
              id="user-name"
              name="name"
              type="text"
              maxLength={40}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) setError("");
              }}
              placeholder="Por ejemplo, Alex"
              aria-describedby={error ? "name-error" : "name-note"}
              aria-invalid={Boolean(error)}
              className="mt-2 w-full rounded-2xl border border-outline-variant/40 bg-background/70 px-4 py-3.5 text-base text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary/70 focus:ring-4 focus:ring-primary/10"
            />
            {error ? (
              <p id="name-error" role="alert" className="mt-2 text-sm text-error">
                {error}
              </p>
            ) : (
              <p id="name-note" className="mt-2 text-xs text-on-surface-variant">
                Tu nombre se guarda solo en este dispositivo.
              </p>
            )}

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-on-primary transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-primary/25"
            >
              Entrar a DevCast
              <ArrowRight size={18} />
            </button>
           
          </form>
        </section>
      </div>
    </main>
  );
}
