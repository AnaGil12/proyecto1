interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  label?: string
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Buscar...',
  label = 'Buscar',
}: Props) {
  return (
    <form
      role="search"
      className="flex flex-1 gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
    >
      <label htmlFor="search-input" className="sr-only">
        {label}
      </label>
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
      <button
        type="submit"
        className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
      >
        Buscar
      </button>
    </form>
  )
}
