import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Explora <span className="text-brand-600 dark:text-brand-400">The Office</span>
      </h1>
      <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
        Recorre cada temporada y episodio de Dunder Mifflin. Busca, filtra y guarda tus favoritos.
      </p>
      <Link
        to="/explorar"
        className="rounded-md bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
      >
        Explorar ahora
      </Link>
    </section>
  )
}
