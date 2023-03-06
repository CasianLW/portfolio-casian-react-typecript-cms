import { FC, useState, ChangeEvent, FormEvent } from 'react'

interface FormValues {
  name: string
  email: string
  sujet: string
  message: string
}

const initialFormValues: FormValues = {
  name: '',
  email: '',
  sujet: '',
  message: '',
}

const ContactComponent: FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const resetMessage = () => {
    setMessage('')
    setMessageType('')
  }
  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          sujet: formValues.sujet,
          message: formValues.message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setMessage(data.message)
      setMessageType('success')
      setTimeout(resetMessage, 3000)

      if (response.ok) {
        setFormValues(initialFormValues)
      }
    } catch (error) {
      setMessage('Une erreur est survenue. Veuillez réessayer plus tard.')
      setMessageType('error')
    }

    setIsLoading(false)
  }

  const isFormComplete = formValues.name && formValues.email && formValues.sujet && formValues.message

  return (
    <form id="contact" onSubmit={sendEmail}>
      <fieldset>
        <input
          required
          type="text"
          placeholder="Nom* "
          name="name"
          autoFocus
          value={formValues.name}
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <input
          required
          type="email"
          placeholder="Adresse mail*"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <input
          required
          type="text"
          placeholder="Sujet*"
          name="sujet"
          value={formValues.sujet}
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <textarea
          required
          placeholder="Message..."
          name="message"
          value={formValues.message}
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        {/* <button type="submit" id="contact-submit">
          Envoyer
        </button> */}
        <button type="submit" id="contact-submit" disabled={!isFormComplete || isLoading}>
          {isLoading ? 'En cours...' : 'Envoyer'}
        </button>
      </fieldset>
      {message && <div className={`message ${messageType}`}>{message}</div>}
    </form>
  )
}

export default ContactComponent
