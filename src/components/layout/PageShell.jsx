import React from 'react'

// Plantilla reutilizable para las páginas con encabezado y contenido principal.
export default function PageShell({ title, description, children }) {
  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <header className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-primary mb-2">{title}</h1>
        {description && (
          <p className="font-sans text-sm text-on-surface-variant max-w-2xl">{description}</p>
        )}
      </header>
      {children}
    </div>
  );
}
