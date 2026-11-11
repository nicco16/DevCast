# DevCast

DevCast es una aplicación web de aprendizaje de desarrollo frontend mediante episodios de audio. Incluye rutas y categorías de HTML, CSS y JavaScript, búsqueda, una bienvenida personalizada y un reproductor persistente entre páginas.

> La aplicación es una demo: los datos se sirven desde archivos locales de ejemplo por defecto. Guardados y progreso tienen persistencia local, pero las páginas de Guardados y Progreso todavía muestran contenido pendiente de implementar.

## Requisitos

- Node.js y npm.
- Un navegador moderno.

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Vite muestra en la terminal la dirección local para abrir la aplicación.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente el build de producción. |
| `npm run test` | Ejecuta las pruebas con Vitest. |
| `npm run test:watch` | Ejecuta Vitest en modo de observación. |
| `npm run lint` | Analiza los archivos JavaScript y JSX con ESLint. |
| `npm run format` | Formatea los archivos del proyecto con Prettier. |

## Recorrido de la aplicación

1. En la primera visita, `/welcome` pide el nombre y lo guarda en `localStorage` como `devcast:user-name`.
2. Las rutas principales están protegidas: sin un nombre guardado, redirigen a la bienvenida.
3. Inicio presenta la ruta recomendada, episodios, novedades y un resumen que enlaza al catálogo de Categorías.
4. Categorías lleva a Explorar con el tema seleccionado. Explorar también acepta el parámetro `?q=` para filtrar episodios.
5. El reproductor inferior comparte el estado de audio entre las páginas.

| Ruta | Página | Función |
| --- | --- | --- |
| `/welcome` | Bienvenida | Solicita y guarda el nombre localmente. |
| `/` | Inicio | Muestra la ruta guiada, recomendaciones y novedades. |
| `/explore` | Explorar | Lista episodios, agrupados por ruta, y permite filtrarlos con `?q=`. |
| `/categories` | Categorías | Muestra el catálogo de temas y enlaces a sus episodios. |
| `/bookmarks` | Guardados | Vista preparada; la lista todavía no está implementada. |
| `/progress` | Progreso | Vista preparada; las estadísticas todavía no están implementadas. |
| `/profile` | Perfil | Permite cambiar el nombre guardado en este dispositivo. |

## Componentes

### Reproductor y contenido

| Archivo | Responsabilidad y comportamiento |
| --- | --- |
| [`src/components/AudioPlayer.jsx`](./src/components/AudioPlayer.jsx) | Barra de reproducción fija. Muestra portada, episodio, tema, posición y duración; permite cambiar la posición, pausar/reanudar y pasar al siguiente episodio. `formatTime(seconds)` convierte segundos al formato `m:ss`. |
| [`src/components/home/CategoryCard.jsx`](./src/components/home/CategoryCard.jsx) | Tarjeta de categoría con cantidad de episodios y progreso. Al seleccionarla, navega a Explorar filtrando por el nombre del tema. `renderIcon(category)` y `getProgressColor(slug)` seleccionan el icono y color según la categoría. |
| [`src/components/home/EpisodeCard.jsx`](./src/components/home/EpisodeCard.jsx) | Tarjeta reutilizable de episodio; muestra portada, metadatos y disponibilidad de audio. `handlePlay()` inicia episodios con audio y abre Explorar; deshabilita la acción si el audio no está disponible. |
| [`src/components/home/LearningPathCard.jsx`](./src/components/home/LearningPathCard.jsx) | Tarjeta visual para una ruta y su episodio actual, con progreso y acción para continuar en Explorar. Es un componente reutilizable que actualmente no está conectado a una página. |
| [`src/components/home/HomeHeader.jsx`](./src/components/home/HomeHeader.jsx) | Encabezado adaptable de escritorio/móvil con búsqueda, notificaciones visuales y avatar. En móvil puede mostrar una segunda barra de búsqueda mediante `showMobileSearch`. |
| [`src/components/home/SearchBar.jsx`](./src/components/home/SearchBar.jsx) | Campo de búsqueda. `onSubmit(event)` limpia el texto y navega a `/explore?q=...`; si está vacío, abre Explorar sin filtro. |

### Estructura y navegación

| Archivo | Responsabilidad y comportamiento |
| --- | --- |
| [`src/components/layout/AppLayout.jsx`](./src/components/layout/AppLayout.jsx) | Layout de las páginas protegidas: barra lateral, contenido de la ruta, menú móvil y reproductor. Mantiene el estado `mobileOpen` y abre/cierra la navegación móvil. |
| [`src/components/layout/PageShell.jsx`](./src/components/layout/PageShell.jsx) | Plantilla visual para páginas internas: título, descripción opcional y contenido recibido en `children`. |
| [`src/components/layout/Sidebar.jsx`](./src/components/layout/Sidebar.jsx) | Renderiza la barra lateral fija en escritorio o como panel superpuesto en móvil. Acepta `mobile` y `onClose`. |
| [`src/components/layout/SidebarLogo.jsx`](./src/components/layout/SidebarLogo.jsx) | Combina el logo con el nombre y subtítulo de DevCast. |
| [`src/components/layout/SidebarNav.jsx`](./src/components/layout/SidebarNav.jsx) | Define los enlaces a Inicio, Explorar, Categorías, Guardados, Progreso y Perfil, delegando su presentación en `SidebarNavItem`. |
| [`src/components/layout/SidebarNavItem.jsx`](./src/components/layout/SidebarNavItem.jsx) | Enlace de navegación que aplica el estilo activo de acuerdo con la ruta actual. |
| [`src/components/layout/SidebarFooter.jsx`](./src/components/layout/SidebarFooter.jsx) | Muestra un indicador de racha en la página de Progreso. El valor actual, “12 Days”, es contenido de ejemplo fijo. |
| [`src/components/layout/Logo.jsx`](./src/components/layout/Logo.jsx) | Dibuja el logo de DevCast en SVG. Acepta `size` y `className`. |

## Páginas y rutas

| Archivo | Funcionalidad |
| --- | --- |
| [`src/pages/Welcome.jsx`](./src/pages/Welcome.jsx) | Formulario de bienvenida. `handleSubmit(event)` valida el nombre, lo persiste y navega al Inicio; muestra un mensaje si está vacío o falla el guardado. |
| [`src/pages/Home.jsx`](./src/pages/Home.jsx) | Carga episodios, categorías, rutas y noticias; muestra el saludo con el nombre local, la ruta guiada, los episodios recomendados y accesos al catálogo. Los botones navegan a Explorar y reproducen episodios cuando hay audio disponible. |
| [`src/pages/Explore.jsx`](./src/pages/Explore.jsx) | Carga episodios, lee `q` desde la URL, filtra por título, descripción o ruta y agrupa los resultados por tema. `useQuery()` convierte los parámetros de búsqueda de la URL en `URLSearchParams`. |
| [`src/pages/Categories.jsx`](./src/pages/Categories.jsx) | Carga y muestra todas las categorías en tarjetas seleccionables. |
| [`src/pages/Bookmarks.jsx`](./src/pages/Bookmarks.jsx) | Presenta el encabezado de Guardados; el listado de favoritos es un placeholder por implementar. |
| [`src/pages/Progress.jsx`](./src/pages/Progress.jsx) | Presenta el encabezado de Progreso; las estadísticas y el roadmap de esta página son placeholders por implementar. |
| [`src/pages/Profile.jsx`](./src/pages/Profile.jsx) | Permite editar el nombre local. `handleSubmit(event)` valida que no esté vacío, guarda el cambio y muestra confirmación o error. |
| [`src/App.jsx`](./src/App.jsx) | Declara las rutas. `RequireUser` redirige a la bienvenida si no hay nombre; `WelcomeRoute` impide volver a la bienvenida cuando el usuario ya configuró su nombre. |

## Estado global y datos

### Reproductor

[`src/context/PlayerContext.jsx`](./src/context/PlayerContext.jsx) centraliza el elemento de audio HTML y el estado compartido:

- `PlayerProvider({ children })` mantiene el episodio actual, el estado de reproducción, el tiempo, la duración y el porcentaje; escucha eventos del elemento de audio y guarda periódicamente la posición.
- `usePlayer()` permite a los componentes consumir el reproductor y sus acciones.
- `playEpisode(episode)` resuelve la fuente y reproduce el episodio.
- `pause()` pausa el audio; `toggle()` alterna entre pausa y reproducción.
- `playNextEpisode()` busca el siguiente episodio reproducible de la misma ruta.
- `seek(percent)` cambia la posición a un porcentaje de la duración.
- `getBookmarks()` y `toggleBookmark(id)` consultan o alternan un identificador de favorito en la persistencia local.
- `resolveAudioSource(episode)` usa la URL declarada en los datos o construye una ruta de audio local para episodios sin URL explícita.

El proveedor se monta desde [`src/main.jsx`](./src/main.jsx), que también inicializa React, React Router y los estilos globales.

### API y persistencia local

[`src/lib/api.js`](./src/lib/api.js) abstrae la carga de datos y el almacenamiento del navegador:

| Función | Qué hace |
| --- | --- |
| `getEpisodes()` | Devuelve episodios locales o consulta `/api/episodes`. |
| `getCategories()` | Devuelve categorías locales o consulta `/api/categories`. |
| `getLearningPaths()` | Devuelve rutas locales o consulta `/api/learning-paths`. |
| `getDeveloperNews()` | Devuelve novedades locales o consulta `/api/news`. |
| `getUserAvatar()` | Devuelve el avatar configurado en los datos de ejemplo. |
| `getUserName()` / `setUserName(name)` | Lee y guarda el nombre del usuario en `localStorage`. |
| `getBookmarks()` / `setBookmarks(list)` | Lee y guarda identificadores de episodios favoritos. |
| `getProgress()` / `setProgress(obj)` | Lee y guarda posiciones de reproducción por episodio. |

La carga remota se activa únicamente cuando `VITE_USE_REMOTE=true`. `fetchJson(path)` comprueba que la respuesta HTTP sea exitosa antes de convertirla a JSON. Sin esa variable, la aplicación utiliza datos locales.

### Datos y recursos

| Archivo o carpeta | Contenido |
| --- | --- |
| [`src/data/mockData.js`](./src/data/mockData.js) | Datos de ejemplo exportados: `categories`, `learningPaths`, `episodes`, `developerNews` y `USER_AVATAR`. |
| [`src/data/episodeCovers.js`](./src/data/episodeCovers.js) | `createEpisodeCover(category, symbol, accent)` genera una portada SVG como data URL; `escapeXml(value)` escapa texto antes de insertarlo en el SVG. |
| [`public/audios/`](./public/audios/) | Audios estáticos organizados por categoría. Deben coincidir con las URLs de los episodios. |
| [`public/logo.svg`](./public/logo.svg) | Favicon usado por el documento HTML. |
| [`src/index.css`](./src/index.css) | Importa Tailwind, define colores y tipografías de tema y contiene estilos globales y de tarjetas. |
| [`index.html`](./index.html) | Documento base, idioma, favicon, fuentes externas y punto de montaje de React. |
| [`vite.config.js`](./vite.config.js) | Configura Vite con los plugins de React y Tailwind CSS. |

## Organización del código

```text
src/
  App.jsx                    Rutas y control de acceso por nombre
  main.jsx                   Punto de entrada de React
  components/
    AudioPlayer.jsx          Reproductor global
    home/                    Tarjetas, encabezado y búsqueda
    layout/                  Layout, sidebar, navegación y elementos comunes
  context/
    PlayerContext.jsx        Estado y controles globales del reproductor
  data/
    mockData.js              Datos de demostración
    episodeCovers.js         Generador de portadas de episodio
  lib/
    api.js                   Carga de datos y persistencia local
  pages/                     Bienvenida y vistas de la aplicación
  tests/                     Pruebas de recursos de audio
```

## Pruebas

Las pruebas usan Vitest, Testing Library y jsdom. Se ejecutan con:

```bash
npm run test -- --run
```

| Prueba | Cobertura principal |
| --- | --- |
| `src/pages/Welcome.test.jsx` | Validación del nombre y navegación tras guardarlo. |
| `src/pages/Home.test.jsx` | Presentación de la experiencia guiada en Inicio. |
| `src/pages/Explore.test.jsx` | Filtrado, agrupación y disponibilidad de reproducción de episodios. |
| `src/pages/Categories.test.jsx` | Catálogo de categorías y navegación al tema seleccionado. |
| `src/components/layout/SidebarNav.test.jsx` | Selección correcta del elemento activo del menú. |
| `src/components/home/SearchBar.test.jsx` | Envío de búsquedas. |
| `src/components/AudioPlayer.test.jsx` | Presentación y controles del reproductor. |
| `src/context/PlayerContext.test.jsx` | Estado y acciones de reproducción. |
| `src/tests/audio-validation.test.js` | Validación de archivos y rutas de audio. |

## Integración continua

El workflow de [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) ejecuta lint, pruebas y build en los eventos configurados en GitHub Actions.

## Accesibilidad

La interfaz incluye etiquetas para controles, nombres accesibles para acciones de audio y estados semánticos para errores y confirmaciones. Al añadir interacciones, conserva etiquetas asociadas a los campos, estados de foco y controles utilizables con teclado.

## Contribuir

Antes de abrir un PR, ejecuta las pruebas y el lint:

```bash
npm run test -- --run
npm run lint
npm run build
```
