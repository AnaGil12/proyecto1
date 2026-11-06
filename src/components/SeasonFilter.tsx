import type { SeasonFilterValue } from '../types'

interface Props {
  value: SeasonFilterValue
  onChange: (value: SeasonFilterValue) => void
}

// The Office (US) tiene 9 temporadas.
const SEASONS: SeasonFilterValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function SeasonFilter({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="season-filter" className="sr-only">
        Filtrar por temporada
      </label>
      <select
        id="season-filter"
        value={value}
        onChange={(e) => onChange(e.target.value === 'all' ? 'all' : (Number(e.target.value) as SeasonFilterValue))}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <option value="all">Todas las temporadas</option>
        {SEASONS.map((season) => (
          <option key={season} value={season}>
            Temporada {season}
          </option>
        ))}
      </select>
    </div>
  )
}
