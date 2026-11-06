import { useEffect, useMemo, useState } from 'react'
import { fetchEpisodes, stripHtml } from '../api/theOffice'
import type { Episode, SeasonFilterValue } from '../types'
import EpisodeCard from '../components/EpisodeCard'
import SearchBar from '../components/SearchBar'
import SeasonFilter from '../components/SeasonFilter'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'

export default function Explore() {
  const [season, setSeason] = useState<SeasonFilterValue>('all')
  const [search, setSearch] = useState('')
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()

  // Un único fetch trae TODA la serie. El filtro por temporada y la
  // búsqueda por título ocurren después, en memoria, por eso no hace
  // falta debounce: se sienten instantáneos ("en tiempo real").
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchEpisodes()
      .then((data) => {
        if (!cancelled) setEpisodes(data)
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          showToast('No se pudo cargar la lista de episodios', 'error')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadToken])

  const filteredEpisodes = useMemo(() => {
    return episodes.filter((ep) => {
      const matchesSeason = season === 'all' || ep.season === season
      const matchesSearch = `${ep.name} ${stripHtml(ep.summary)}`.toLowerCase().includes(search.toLowerCase())
      return matchesSeason && matchesSearch
    })
  }, [episodes, season, search])

  const handleToggleFavorite = (episode: Episode) => {
    const wasFavorite = isFavorite(episode.id)
    toggleFavorite(episode)
    showToast(
      wasFavorite ? `"${episode.name}" se quitó de favoritos` : `"${episode.name}" se agregó a favoritos`,
      'success',
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          Explorar <span className="text-brand-600 dark:text-brand-400">Episodios</span>
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Datos obtenidos en tiempo real desde TVMaze (The Office)</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar episodio..." label="Buscar episodio por título" />
        <SeasonFilter value={season} onChange={setSeason} />
      </div>

      {!loading && !error && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Resultados</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mostrando {filteredEpisodes.length} de {episodes.length} episodios
          </p>
        </div>
      )}

      {loading && <LoadingState label="Cargando episodios..." />}

      {!loading && error && <ErrorState message={error} onRetry={() => setReloadToken((t) => t + 1)} />}

      {!loading && !error && filteredEpisodes.length === 0 && (
        <EmptyState
          title="Sin resultados"
          description="No encontramos episodios que coincidan con tu búsqueda."
          icon="🔍"
        />
      )}

      {!loading && !error && filteredEpisodes.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              isFavorite={isFavorite(episode.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}
