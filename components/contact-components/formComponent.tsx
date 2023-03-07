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
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target
    let selectedValues = formValues.sujet.split(' / ')
    if (checked) {
      selectedValues.push(name)
    } else {
      selectedValues = selectedValues.filter((value) => value !== name)
    }
    setFormValues({ ...formValues, sujet: selectedValues.join(' / ') })
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
        <div>Comment puis-je vous aider?</div>

        <div className="flex flex-wrap w-fit  py-2 gap-y-4 gap-x-6">
          <Checkbox
            name={'UX/UI Design'}
            checked={formValues.sujet.split(' / ').includes('UX/UI Design')}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            name={'Fullstack Dev'}
            checked={formValues.sujet.split(' / ').includes('Fullstack Dev')}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            name={'Création site internet'}
            checked={formValues.sujet.split(' / ').includes('Création site internet')}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            name={'Strategy & consulting'}
            checked={formValues.sujet.split(' / ').includes('Strategy & consulting')}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            name={'Autre'}
            checked={formValues.sujet.split(' / ').includes('Autre')}
            onChange={handleCheckboxChange}
          />
        </div>
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

interface CheckboxProps {
  name: string
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FC<CheckboxProps> = ({ name, checked, onChange }) => {
  return (
    <label
      className={`w-fit custom-checkbox-shadow font-semibold text-sm sm:text-base cursor-pointer ${
        checked ? ' underline underline-offset-2' : ''
      }`}
    >
      <input
        className="px-2  mr-2 pt-1 pb-1 border-2 rounded-md cursor-pointer border-cas-black-600"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {name}
    </label>
  )
}
