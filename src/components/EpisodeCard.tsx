import { Link } from 'react-router-dom'
import type { Episode } from '../types'
import { stripHtml } from '../api/theOffice'

interface Props {
  episode: Episode
  isFavorite: boolean
  onToggleFavorite: (episode: Episode) => void
}

const FALLBACK_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%23cbd5e1"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" dominant-baseline="middle"%3E%F0%9F%8F%A2%3C/text%3E%3C/svg%3E'

export default function EpisodeCard({ episode, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => onToggleFavorite(episode)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Quitar "${episode.name}" de favoritos` : `Agregar "${episode.name}" a favoritos`}
        className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 text-lg shadow dark:bg-slate-800/90"
      >
        <span aria-hidden="true">{isFavorite ? '⭐' : '☆'}</span>
      </button>

      <Link to={`/explorar/${episode.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
        <img
          src={episode.image?.medium ?? FALLBACK_IMAGE}
          alt={`Escena del episodio ${episode.name}`}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-brand-600 dark:text-brand-400">
            <span aria-hidden="true">🏢</span>
            Temporada {episode.season} · Episodio {episode.number}
          </div>
          <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">{episode.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{stripHtml(episode.summary)}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{episode.airdate}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700 dark:bg-brand-700/20 dark:text-brand-400">
              ⭐ {episode.rating.average ?? 'N/A'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
