export default function LoadingState({ label = 'Cargando datos...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20" role="status" aria-live="polite">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"
        aria-hidden="true"
      />
      <p className="text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}
