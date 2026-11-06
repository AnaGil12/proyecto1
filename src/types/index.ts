// Tipado de la respuesta de TVMaze API (uno de los endpoints sugeridos en
// el enunciado), aplicado al show "The Office" (US) — id 526.
// Docs: https://www.tvmaze.com/api

export interface Episode {
  id: number
  name: string
  season: number
  number: number
  type: string
  airdate: string
  runtime: number | null
  rating: { average: number | null }
  image: { medium: string; original: string } | null
  summary: string | null
}

export type SeasonFilterValue = 'all' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type ToastType = 'success' | 'error' | 'info'

export interface ToastItem {
  id: string
  type: ToastType
  message: string
}
