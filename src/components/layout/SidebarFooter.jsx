import { Flame } from "lucide-react";
import { useLocation } from "react-router-dom";

// Muestra un resumen de racha cuando la ruta activa es la página de progreso.
export default function SidebarFooter() {
  const { pathname } = useLocation();
  const isProgressPage = pathname === "/progress";

  if (isProgressPage) {
    return (
      <div className="mt-auto px-2">
        <div className="p-4 rounded-2xl bg-surface-container-highest border border-outline-variant/30 text-center overflow-hidden relative group">
          <div className="absolute inset-0 bg-primary/5 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
          <p className="font-mono text-[10px] text-primary font-medium tracking-wider mb-2 relative z-10 uppercase">
            Current Streak
          </p>
          <div className="flex items-center justify-center gap-2 relative z-10">
            <Flame size={20} className="text-tertiary fill-tertiary" />
            <span className="font-sans text-lg font-bold text-on-surface">12 Days</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
