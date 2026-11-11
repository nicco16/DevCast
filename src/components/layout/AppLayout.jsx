import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import AudioPlayer from "../AudioPlayer.jsx";

// Define el layout general de la app con barra lateral, contenido dinámico y reproductor.
export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Sidebar />

      {/* Botón de menú para móviles que abre la barra lateral. */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center"
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0" width="18" height="2" rx="1" fill="currentColor" />
          <rect y="5" width="18" height="2" rx="1" fill="currentColor" />
          <rect y="10" width="18" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>

      {mobileOpen && <Sidebar mobile onClose={() => setMobileOpen(false)} />}

      <main className="relative z-10 flex min-h-screen flex-1 flex-col pb-24 md:pb-28 md:pl-60">
        <Outlet />
      </main>
      <AudioPlayer />
    </div>
  );
}
