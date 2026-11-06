import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchEpisodeById, stripHtml } from '../api/theOffice'
import type { Episode } from '../types'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'

export default function Detail() {
  // Ruta dinámica: /explorar/:id
  const { id } = useParams<{ id: string }>()
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchEpisodeById(id)
      .then((data) => {
        if (!cancelled) setEpisode(data)
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          showToast('No se pudo cargar el episodio', 'error')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, reloadToken])

  const handleToggleFavorite = () => {
    if (!episode) return
    const wasFavorite = isFavorite(episode.id)
    toggleFavorite(episode)
    showToast(
      wasFavorite ? `"${episode.name}" se quitó de favoritos` : `"${episode.name}" se agregó a favoritos`,
      'success',
    )
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/explorar" className="mb-6 inline-block text-sm text-brand-600 hover:underline dark:text-brand-400">
        ← Volver a explorar
      </Link>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={() => setReloadToken((t) => t + 1)} />}

      {!loading && !error && episode && (
        <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {episode.image && (
            <img
              src={episode.image.original}
              alt={`Escena del episodio ${episode.name}`}
              className="h-64 w-full object-cover"
            />
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400">
              <span aria-hidden="true">🏢</span>
              Temporada {episode.season} · Episodio {episode.number}
            </div>
            <h1 className="mt-1 text-2xl font-bold">{episode.name}</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{stripHtml(episode.summary)}</p>

            <dl className="mt-6 grid grid-cols-[auto,1fr] gap-x-3 gap-y-2 text-sm">
              <dt className="font-medium text-slate-500 dark:text-slate-400">Fecha de emisión:</dt>
              <dd>{episode.airdate}</dd>

              <dt className="font-medium text-slate-500 dark:text-slate-400">Rating:</dt>
              <dd>⭐ {episode.rating.average ?? 'N/A'}</dd>

              <dt className="font-medium text-slate-500 dark:text-slate-400">Duración:</dt>
              <dd>{episode.runtime ? `${episode.runtime} min` : 'N/A'}</dd>
            </dl>

            <button
              type="button"
              onClick={handleToggleFavorite}
              aria-pressed={isFavorite(episode.id)}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <span aria-hidden="true">{isFavorite(episode.id) ? '⭐' : '☆'}</span>
              {isFavorite(episode.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
          </div>
        </article>
      )}
    </section>
  )
}
