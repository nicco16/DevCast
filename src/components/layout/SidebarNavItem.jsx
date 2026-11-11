import React from "react";
import { NavLink } from "react-router-dom";

// Crea un elemento de navegación con estilo activo según la ruta actual.
export default function SidebarNavItem({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 group",
          isActive
            ? "text-primary font-semibold bg-primary/10 border border-primary/10"
            : "text-on-surface-variant hover:text-on-surface hover:bg-white/5 border border-transparent",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            className={
              isActive
                ? "text-primary"
                : "text-on-surface-variant group-hover:text-primary transition-colors duration-200"
            }
          />
          <span className="font-sans text-sm">{label}</span>
        </>
      )}
    </NavLink>
  );
}
