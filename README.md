# Explorador — Proyecto 01 (React Integradora)

SPA construida con **Vite + React + TypeScript + React Router + Tailwind CSS**
que consume **[TVMaze API](https://www.tvmaze.com/api)** — una de las APIs
sugeridas en el enunciado (pública, gratuita, sin API key) — filtrada al show
*The Office (US)* (`show id 526`).

## Cómo correrlo

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Vistas implementadas

| Ruta | Vista |
|---|---|
| `/` | Inicio (landing/hero) |
| `/explorar` | Exploración — grid de episodios, fetch de lista completa |
| `/explorar/:id` | Detalle — fetch individual por ID (único, de TVMaze), ruta dinámica |
| `/favoritos` | Favoritos — episodios guardados en estado |
| `/contacto` | Contacto — formulario controlado |
| `*` | 404 |

## Requisitos técnicos cubiertos

- **Dos fetches**: lista completa de episodios (`fetchEpisodes`, `GET /shows/526/episodes`) y detalle por ID (`fetchEpisodeById`, `GET /episodes/:id`), en `src/api/theOffice.ts`.
- **Estados visibles**: Loading, Error (con botón "Reintentar") y Empty, en `Explore` y `Detail`.
- **Búsqueda y filtrado en tiempo real**: `SearchBar` (título/descripción) + `SeasonFilter` (temporada 1–9 o "todas"), ambos 100% en el cliente sobre la lista ya cargada — por eso no hace falta debounce.
- **Favoritos en estado**: `FavoritesContext` vive por encima del `BrowserRouter` (ver `main.tsx`), así que persiste entre rutas; además se respalda en `localStorage`. Se identifican por el `id` único que entrega TVMaze por episodio.
- **Formulario controlado con validación**: `ContactForm.tsx` — nombre, email, mensaje, botón `disabled` hasta que el formulario sea válido.
- **Toasts** de éxito, error e info con auto-dismiss (3.5s): `ToastContext` + `ToastContainer`.
- **Modal de confirmación nativo**: `ConfirmModal.tsx` usa `<dialog>` + `useRef` + `showModal()`/`close()`, usado en Favoritos (quitar favorito) y Contacto (confirmar envío).
- **Dark pattern intencional**: en `ConfirmModal.tsx`, prop `darkPattern` (activada en Favoritos) invierte el peso visual de los botones para que el ojo se vaya al botón destructivo. Comentario explicativo en el propio componente.
- **Imágenes reales** de cada episodio (`image.medium`/`image.original` de TVMaze), con un placeholder SVG si el episodio no trae imagen.
- **Tailwind CSS** para todo el styling, con clases responsive (`sm:`, `lg:`) y **dark mode** (`darkMode: 'class'`, toggle flotante en `DarkModeToggle.tsx`).
- **Accesibilidad**: `alt` en imágenes, `role` (`search`, `alert`, `status`, `navigation`), `aria-label`/`aria-pressed`/`aria-expanded`, `htmlFor` en todos los labels, HTML semántico (`header`, `nav`, `main`, `article`, `dl`).
- **11 componentes** en archivos `.tsx` separados dentro de `src/components/`, más 6 páginas en `src/pages/`.

## Estructura

```
src/
  api/              fetch a TVMaze
  components/        componentes reutilizables
  context/            FavoritesContext, ToastContext
  pages/               las 6 vistas
  types/                tipos compartidos
```

## Nota sobre la API

TVMaze devuelve el resumen de cada episodio como HTML (`<p>...</p>`); se
limpia con `stripHtml()` en `src/api/theOffice.ts` antes de mostrarlo.
