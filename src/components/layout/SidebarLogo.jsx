import Logo from "./Logo.jsx";

// Muestra el encabezado visual de la barra lateral con el logo y el nombre del producto.
export default function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 px-2 mb-8">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Logo size={24} />
      </div>
      <div>
        <h1 className="font-sans text-lg font-bold text-primary leading-none tracking-tight">
          DevCast
        </h1>
        <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
          Audio for Devs
        </p>
      </div>
    </div>
  );
}
