import type { ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  action?: ReactNode
  icon?: string
}

export default function EmptyState({ title, description, action, icon = '📭' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
      <span className="text-4xl" aria-hidden="true">
        {icon}
      </span>
      <p className="font-medium text-slate-700 dark:text-slate-200">{title}</p>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
