import type { ToastItem } from '../types'

interface Props {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}

const STYLES: Record<ToastItem['type'], string> = {
  success: 'bg-emerald-600 border-emerald-700',
  error: 'bg-red-600 border-red-700',
  info: 'bg-slate-700 border-slate-800',
}

const ICONS: Record<ToastItem['type'], string> = {
  success: '✅',
  error: '⚠️',
  info: 'ℹ️',
}

export default function ToastContainer({ toasts, onDismiss }: Props) {
  return (
    // aria-live permite que lectores de pantalla anuncien los toasts
    // a medida que aparecen, sin robar el foco del usuario.
    <div
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[90vw] max-w-sm"
      aria-live="polite"
      role="status"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-toast-in flex items-start gap-2 rounded-lg border px-4 py-3 text-sm text-white shadow-lg ${STYLES[toast.type]}`}
        >
          <span aria-hidden="true">{ICONS[toast.type]}</span>
          <p className="flex-1">{toast.message}</p>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Cerrar notificación"
            className="shrink-0 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
