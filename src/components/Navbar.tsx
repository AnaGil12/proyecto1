import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-brand-600 dark:text-brand-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <nav
        className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between"
        role="navigation"
        aria-label="Navegación principal"
      >
        <NavLink to="/" className="flex items-center gap-2 font-bold text-lg" aria-label="Ir al inicio">
          <span aria-hidden="true">🏢</span>
          Explorador
        </NavLink>

        <button
          type="button"
          className="sm:hidden p-2 rounded-md border border-slate-300 dark:border-slate-700"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>

        <ul className="hidden sm:flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <ul className="sm:hidden flex flex-col px-4 pb-3 gap-1">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClass} end={link.to === '/'} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
