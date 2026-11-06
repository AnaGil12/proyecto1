import type { Episode } from '../types'

// TVMaze API — pública, gratuita, sin API key. Docs: https://www.tvmaze.com/api
const BASE_URL = 'https://api.tvmaze.com'

// The Office (US) en TVMaze: https://www.tvmaze.com/shows/526/the-office
const SHOW_ID = 526

/**
 * Trae TODOS los episodios de la serie en un solo fetch.
 * GET /shows/:id/episodes -> Episode[]
 * El filtrado por temporada y la búsqueda por título se hacen después
 * en el cliente (ver Explore.tsx), por eso se sienten "en tiempo real".
 */
export async function fetchEpisodes(): Promise<Episode[]> {
  const res = await fetch(`${BASE_URL}/shows/${SHOW_ID}/episodes`)

  if (!res.ok) {
    throw new Error(`Error ${res.status} al consultar los episodios`)
  }

  return res.json()
}

/**
 * Trae un episodio puntual por su ID (único, lo asigna TVMaze).
 * GET /episodes/:id -> Episode
 */
export async function fetchEpisodeById(id: string): Promise<Episode> {
  const res = await fetch(`${BASE_URL}/episodes/${id}`)

  if (!res.ok) {
    throw new Error(`Error ${res.status} al consultar el episodio ${id}`)
  }

  return res.json()
}

/** TVMaze devuelve el resumen como HTML (<p>...</p>); lo pasamos a texto plano. */
export function stripHtml(html: string | null): string {
  if (!html) return 'Sin descripción disponible.'
  return html.replace(/<[^>]+>/g, '').trim()
}
