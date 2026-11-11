function escapeXml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character];
  });
}

export function createEpisodeCover(category, symbol, accent) {
  const safeCategory = escapeXml(category.toUpperCase());
  const safeSymbol = escapeXml(symbol);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#101820"/>
          <stop offset="1" stop-color="#202a36"/>
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stop-color="${accent}" stop-opacity=".42"/>
          <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="#fff" stroke-opacity=".06"/>
        </pattern>
      </defs>
      <rect width="900" height="500" fill="url(#background)"/>
      <rect width="900" height="500" fill="url(#grid)"/>
      <circle cx="650" cy="210" r="290" fill="url(#glow)"/>
      <rect x="52" y="52" width="796" height="396" rx="28" fill="#0b1017" fill-opacity=".4" stroke="${accent}" stroke-opacity=".38"/>
      <text x="92" y="112" fill="${accent}" font-family="Segoe UI, sans-serif" font-size="18" font-weight="700" letter-spacing="5">${safeCategory} / DEVCAST</text>
      <path d="M92 145H808" stroke="#fff" stroke-opacity=".16"/>
      <text x="92" y="286" fill="#f3f6fb" font-family="Consolas, monospace" font-size="${safeSymbol.length > 12 ? 48 : 68}" font-weight="700">${safeSymbol}</text>
      <circle cx="760" cy="354" r="34" fill="${accent}" fill-opacity=".18" stroke="${accent}" stroke-opacity=".75"/>
      <path d="M754 337L776 354L754 371Z" fill="${accent}"/>
      <text x="92" y="390" fill="#aab7c6" font-family="Segoe UI, sans-serif" font-size="17" letter-spacing="3">AUDIO LESSON</text>
    </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
