import { FC, useState } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary'

interface AddPageInterface {
  getPagesList: () => void
}
const AddPageComponent: FC<AddPageInterface> = ({ getPagesList }) => {
  interface ICloudinaryUploadResult {
    event: boolean
    info: {
      public_id: string
    }
  }
  interface ICloudinaryWidget {
    close: () => void
  }

  const [formData, setFormData] = useState({
    title: '',
    seoTitle: '',
    seoDescription: '',
    imgLink: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitStatus('submitting')
    const response = await fetch('/api/pages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.title,
        seo: {
          title: formData.seoTitle,
          description: formData.seoDescription,
          searchImage: formData.imgLink,
        },
      }),
    })
    const data = await response.json()

    if (response.ok) {
      // Handle success
      setSubmitStatus('success')
      setMessageText(data.message)
      getPagesList()
      setFormData({
        title: '',
        seoTitle: '',
        seoDescription: '',
        imgLink: '',
      })
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    } else {
      // Handle error
      // console.log(data.message)

      setSubmitStatus('error')
      setMessageText(data.message)
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }
  const alertComponent = () => {
    switch (submitStatus) {
      case 'submitting':
        return <div className="alert alert-info text-cas-white-100">Submitting form...</div>
      case 'success':
        return <div className="alert alert-success text-cas-white-100">Form submitted successfully!</div>
      case 'error':
        return <div className="alert alert-danger text-cas-white-100">{messageText}</div>
      case 'idle':
        return <div className="alert alert-danger text-cas-white-100"></div>
      default:
        return null
    }
  }

  const uploadedCloudinary = (result: ICloudinaryUploadResult, widget: ICloudinaryWidget) => {
    // console.log('cloudinary working')
    if (result.info) {
      result.info &&
        setFormData((prevFormData) => ({
          ...prevFormData,
          imgLink: result.info.public_id,
        }))
    }
  }
  return (
    <>
      <h2 className="secondary-title">Add new Page SEO</h2>
      <form className="mt-10 " onSubmit={handleSubmit}>
        <h3>Ajouter nouveau SEO page</h3>
        <div className="grid">
          <label htmlFor="title">Nom page</label>
          <input required name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="my-10">
          <h3>Seo settings:</h3>
          <div className="grid">
            <label htmlFor="seoTitle">Titre seo</label>
            <input required name="seoTitle" value={formData.seoTitle} onChange={handleInputChange} />
          </div>
          <div className="grid">
            <label htmlFor="seoDescription">Description seo</label>
            <input required name="seoDescription" value={formData.seoDescription} onChange={handleInputChange} />
          </div>
        </div>
        <div className="grid">
          <label htmlFor="imgLink">Lien image</label>

          <input
            disabled
            placeholder="Image link will display here..."
            required
            name="imgLink"
            value={formData.imgLink}
            onChange={handleInputChange}
          />
          {formData.imgLink && (
            <CldImage width="600" height="600" src={formData.imgLink} alt="Description of my image" />
          )}
          <CldUploadButton
            onUpload={uploadedCloudinary}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          />
        </div>

        <button className="text-cas-white-100" type="submit">
          Enregistrer page
        </button>
      </form>
      {alertComponent()}
    </>
  )
}

export default AddPageComponent
