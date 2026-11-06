import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Episode } from '../types'

interface FavoritesContextValue {
  favorites: Episode[]
  isFavorite: (id: number) => boolean
  addFavorite: (episode: Episode) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (episode: Episode) => void
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

const STORAGE_KEY = 'explorador:favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Estado "elevado" por encima de las rutas (ver main.tsx) para que
  // favoritos sobreviva a la navegación entre páginas. Se respalda en
  // localStorage para que también sobreviva a un refresh de página.
  const [favorites, setFavorites] = useState<Episode[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as Episode[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // localStorage puede fallar (modo privado, cuota llena, etc.)
      // Lo ignoramos: el estado en memoria sigue funcionando igual.
    }
  }, [favorites])

  const isFavorite = (id: number) => favorites.some((f) => f.id === id)

  const addFavorite = (episode: Episode) => {
    setFavorites((prev) => (prev.some((f) => f.id === episode.id) ? prev : [...prev, episode]))
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  const toggleFavorite = (episode: Episode) => {
    isFavorite(episode.id) ? removeFavorite(episode.id) : addFavorite(episode)
  }

  const value = useMemo(
    () => ({ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }),
    [favorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  return ctx
}
