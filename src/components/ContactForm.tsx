import { useState, type FormEvent } from 'react'
import type { ContactFormData } from '../types'

interface Props {
  onValidSubmit: (data: ContactFormData) => void
}

interface Errors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data: ContactFormData): Errors {
  const errors: Errors = {}
  if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.'
  }
  if (!EMAIL_RE.test(data.email)) {
    errors.email = 'Ingresa un email válido (debe contener @ y .).'
  }
  if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  }
  return errors
}

export default function ContactForm({ onValidSubmit }: Props) {
  const [data, setData] = useState<ContactFormData>({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>({
    name: false,
    email: false,
    message: false,
  })

  const errors = validate(data)
  const isValid = Object.keys(errors).length === 0
  // Solo marcamos "con error" visualmente los campos que ya fueron
  // tocados, para no bombardear al usuario con errores al cargar el form.
  const showError = (field: keyof ContactFormData) => touched[field] && Boolean(errors[field])

  const handleChange = (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleBlur = (field: keyof ContactFormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!isValid) return
    onValidSubmit(data)
    setData({ name: '', email: '', message: '' })
    setTouched({ name: false, email: false, message: false })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          aria-invalid={showError('name')}
          aria-describedby={showError('name') ? 'contact-name-error' : undefined}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        {showError('name') && (
          <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          aria-invalid={showError('email')}
          aria-describedby={showError('email') ? 'contact-email-error' : undefined}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        {showError('email') && (
          <p id="contact-email-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={data.message}
          onChange={handleChange('message')}
          onBlur={handleBlur('message')}
          aria-invalid={showError('message')}
          aria-describedby={showError('message') ? 'contact-message-error' : undefined}
          placeholder="Escribe tu mensaje aquí..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        {showError('message') && (
          <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="rounded-md bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
      >
        Enviar mensaje
      </button>
    </form>
  )
}
