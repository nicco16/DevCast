import React from "react";
import {
  Home,
  Compass,
  LayoutGrid,
  Bookmark,
  BarChart3,
  User,
} from "lucide-react";
import SidebarNavItem from "./SidebarNavItem.jsx";

// Define los enlaces principales de navegación de la app.
const navItems = [
  { to: "/", label: "Inicio", icon: Home, end: true },
  { to: "/explore", label: "Explorar", icon: Compass },
  { to: "/categories", label: "Categorías", icon: LayoutGrid },
  { to: "/bookmarks", label: "Guardados", icon: Bookmark },
  { to: "/progress", label: "Progreso", icon: BarChart3 },
  { to: "/profile", label: "Perfil", icon: User },
];

// Renderiza el menú de navegación lateral.
export default function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => (
        <SidebarNavItem
          key={item.to}
          to={item.to}
          label={item.label}
          icon={item.icon}
          end={item.end}
        />
      ))}
    </nav>
  );
}
