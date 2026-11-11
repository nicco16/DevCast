import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import SearchBar from "./SearchBar.jsx";
import { getUserAvatar } from "../../lib/api.js";

// Muestra la cabecera principal con búsqueda, notificaciones y avatar del usuario.
export default function HomeHeader({ showMobileSearch = false }) {
  const [avatar, setAvatar] = useState(null);

  // Carga la imagen de perfil al montar el componente.
  useEffect(() => {
    setAvatar(getUserAvatar());
  }, []);
  return (
    <>
      <header className="hidden md:flex justify-between items-center px-margin-desktop w-full h-16 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-30">
        <SearchBar />
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="text-on-surface-variant hover:text-primary transition-colors relative"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border border-background" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/50">
            <img src={avatar} alt="Perfil de usuario" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <header className="md:hidden flex justify-between items-center px-margin-mobile pl-16 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-30">
        <div className="text-lg font-bold text-primary font-sans">DevCast</div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/50">
            <img src={avatar} alt="Perfil de usuario" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {showMobileSearch && (
        <div className="md:hidden px-margin-mobile pt-4 pb-2">
          <SearchBar />
        </div>
      )}
    </>
  );
}
