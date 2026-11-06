import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import EpisodeCard from '../components/EpisodeCard'
import EmptyState from '../components/EmptyState'
import ConfirmModal, { type ConfirmModalHandle } from '../components/ConfirmModal'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import type { Episode } from '../types'

export default function Favorites() {
  const { favorites, isFavorite, removeFavorite } = useFavorites()
  const { showToast } = useToast()
  const modalRef = useRef<ConfirmModalHandle>(null)
  const [pendingRemoval, setPendingRemoval] = useState<Episode | null>(null)

  const requestRemoval = (episode: Episode) => {
    setPendingRemoval(episode)
    modalRef.current?.open()
  }

  const confirmRemoval = () => {
    if (!pendingRemoval) return
    removeFavorite(pendingRemoval.id)
    showToast(`"${pendingRemoval.name}" se quitó de favoritos`, 'info')
    setPendingRemoval(null)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Mis Favoritos</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">{favorites.length} items guardados</p>
      </header>

      {favorites.length === 0 ? (
        <EmptyState
          title="No tienes favoritos guardados"
          icon="⭐"
          action={
            <Link to="/explorar" className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400">
              Explorar y agregar algunos
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              isFavorite={isFavorite(episode.id)}
              onToggleFavorite={() => requestRemoval(episode)}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        ref={modalRef}
        title="¿Quitar de favoritos?"
        description={`Estás seguro de que quieres quitar "${pendingRemoval?.name ?? ''}" de tus favoritos?`}
        confirmLabel="Quitar"
        cancelLabel="Cancelar"
        onConfirm={confirmRemoval}
        darkPattern
      />
    </section>
  )
}
