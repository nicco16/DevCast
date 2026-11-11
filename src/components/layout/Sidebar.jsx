import SidebarLogo from "./SidebarLogo.jsx";
import SidebarNav from "./SidebarNav.jsx";
import SidebarFooter from "./SidebarFooter.jsx";

// Renderiza la barra lateral para escritorio o para versión móvil.
export default function Sidebar({ mobile = false, onClose }) {
  if (mobile) {
    return (
      <div className="fixed inset-0 z-60 md:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <aside className="absolute left-0 top-0 h-full w-64 bg-surface-container p-6 border-r border-outline-variant/20">
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <SidebarLogo />
            </div>
            <div className="flex-1 overflow-auto">
              <SidebarNav />
            </div>
            <div className="mt-6">
              <SidebarFooter />
            </div>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <aside className="hidden md:flex flex-col py-8 px-4 gap-4 fixed left-0 top-0 h-full w-60 bg-surface-container border-r border-outline-variant/20 z-50">
      <SidebarLogo />
      <SidebarNav />
      <SidebarFooter />
    </aside>
  );
}
