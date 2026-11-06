import { forwardRef, useImperativeHandle, useRef } from 'react'

export interface ConfirmModalHandle {
  open: () => void
  close: () => void
}

interface Props {
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  /**
   * Activa el "dark pattern" pedido por la consigna: invierte el peso
   * visual de los botones para que el ojo se vaya al botón destructivo
   * en vez de al de cancelar. Es mala práctica de UX a propósito —
   * ver el comentario dentro del componente.
   */
  darkPattern?: boolean
}

/**
 * Modal de confirmación construido con el elemento <dialog> nativo del
 * navegador (no una librería), controlado vía useRef + showModal()/close().
 * Se expone un handle imperativo (open/close) para que las páginas que
 * lo usan puedan abrirlo desde un manejador de evento (ej. click en
 * "Quitar de favoritos").
 */
const ConfirmModal = forwardRef<ConfirmModalHandle, Props>(function ConfirmModal(
  { title, description, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', onConfirm, darkPattern = false },
  ref,
) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }))

  const handleConfirm = () => {
    onConfirm()
    dialogRef.current?.close()
  }

  /*
   * ⚠️ DARK PATTERN INTENCIONAL (requisito de la consigna):
   * Cuando `darkPattern` es true, el botón "Cancelar" (la opción segura,
   * no destructiva) se estiliza como un simple link apagado, mientras
   * que el botón destructivo ("Quitar") recibe el color, tamaño y foco
   * visual del botón "primario". Esto explota el sesgo de que el botón
   * más llamativo suele ser el recomendado/seguro, empujando al usuario
   * a confirmar una acción destructiva por error. En un producto real
   * esto NO debería hacerse: el botón más prominente debería ser
   * siempre la opción segura o neutra (ej. "Cancelar"), y la acción
   * destructiva debería requerir una confirmación deliberada.
   */
  const confirmBtnClass = darkPattern
    ? 'w-full sm:w-auto rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 order-1'
    : 'w-full sm:w-auto rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 order-2'

  const cancelBtnClass = darkPattern
    ? 'w-full sm:w-auto rounded-md px-3 py-1.5 text-xs text-slate-400 hover:text-slate-500 underline-offset-2 hover:underline order-2'
    : 'w-full sm:w-auto rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 order-1'

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
      className="rounded-xl bg-white p-0 shadow-xl dark:bg-slate-900 backdrop:bg-slate-950/60"
    >
      <div className="w-[90vw] max-w-sm p-6">
        <span className="text-3xl" aria-hidden="true">
          ⚠️
        </span>
        <h2 id="confirm-modal-title" className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p id="confirm-modal-description" className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button type="button" className={cancelBtnClass} onClick={() => dialogRef.current?.close()}>
            {cancelLabel}
          </button>
          <button type="button" className={confirmBtnClass} onClick={handleConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
})

export default ConfirmModal
