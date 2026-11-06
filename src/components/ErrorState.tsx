interface Props {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({ message = 'No se pudo cargar la información.', onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center" role="alert">
      <span className="text-4xl" aria-hidden="true">
        ⚠️
      </span>
      <p className="font-medium text-red-600 dark:text-red-400">{message}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">Verifica tu conexión e intenta de nuevo.</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
