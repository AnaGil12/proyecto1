import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-600 dark:text-brand-400" aria-hidden="true">
        404
      </p>
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="text-slate-500 dark:text-slate-400">La ruta que buscas no existe en esta aplicación.</p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
