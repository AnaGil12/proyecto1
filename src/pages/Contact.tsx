import { useRef } from 'react'
import ContactForm from '../components/ContactForm'
import ConfirmModal, { type ConfirmModalHandle } from '../components/ConfirmModal'
import { useToast } from '../context/ToastContext'
import type { ContactFormData } from '../types'

export default function Contact() {
  const modalRef = useRef<ConfirmModalHandle>(null)
  const pendingDataRef = useRef<ContactFormData | null>(null)
  const { showToast } = useToast()

  const handleValidSubmit = (data: ContactFormData) => {
    pendingDataRef.current = data
    modalRef.current?.open()
  }

  const handleConfirmSend = () => {
    // Aquí iría la llamada real a un backend / servicio de email.
    showToast(`¡Gracias ${pendingDataRef.current?.name}! Tu mensaje fue enviado.`, 'success')
    pendingDataRef.current = null
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Contacto</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">¿Tienes preguntas o sugerencias? Envíanos un mensaje.</p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <ContactForm onValidSubmit={handleValidSubmit} />
      </div>

      <ConfirmModal
        ref={modalRef}
        title="Confirmar envío"
        description="¿Confirmas que quieres enviar este mensaje? Revisa que los datos sean correctos."
        confirmLabel="Enviar"
        cancelLabel="Revisar de nuevo"
        onConfirm={handleConfirmSend}
      />
    </section>
  )
}
