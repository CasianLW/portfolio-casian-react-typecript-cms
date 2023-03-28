import { IPageInfo } from '@/pages/admin/pages/[id]'
import { FC, useState } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary'

interface EditPageInterface {
  editPageMethod: () => void
  dataPage: IPageInfo
}
const EditPageComponent: FC<EditPageInterface> = ({ dataPage, editPageMethod }) => {
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
    title: dataPage.title,
    seoTitle: dataPage.seo.title,
    seoDescription: dataPage.seo.description,
    searchImage: dataPage.seo.searchImage,
  })
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle' | 'changed'>('idle')
  const [messageText, setMessageText] = useState()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitStatus('submitting')
    const response = await fetch(`/api/pages/${dataPage._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.title,
        seo: {
          title: formData.seoTitle,
          description: formData.seoDescription,
          searchImage: formData.searchImage,
        },
      }),
    })
    const data = await response.json()

    if (response.ok) {
      // Handle success
      setSubmitStatus('success')
      setMessageText(data.message)
      editPageMethod()
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    } else {
      setSubmitStatus('error')
      setMessageText(data.message)
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSubmitStatus('changed')

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

  const uploadedCloudinarySecondary = (result: ICloudinaryUploadResult, widget: ICloudinaryWidget) => {
    console.log('cloudinary working')
    if (result.info) {
      result.info &&
        setFormData((prevFormData) => ({
          ...prevFormData,
          secondaryImage: result.info.public_id,
        }))
    }
  }
  return (
    <>
      <h2 className="secondary-title">Edit Page</h2>
      <form className="mt-10 " onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="title">Titre</label>
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
          <label htmlFor="searchImage">Lien image</label>
          <input
            disabled
            placeholder="Primary Image link will display here..."
            required
            name="searchImage"
            value={formData.searchImage}
            onChange={handleInputChange}
          />
          {formData.searchImage && (
            <CldImage width="600" height="600" src={formData.searchImage} alt="Description of my image" />
          )}
          <CldUploadButton
            onUpload={uploadedCloudinarySecondary}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          />
        </div>

        <button
          className={
            'text-cas-white-100 ' + submitStatus === 'idle'
              ? ' bg-opacity-50'
              : submitStatus === 'submitting'
              ? ' bg-opacity-100 bg-cas-gradient-purple'
              : submitStatus === 'changed'
              ? ' bg-opacity-100 bg-cas-white-100'
              : ''
          }
          type="submit"
        >
          Update page
        </button>
      </form>
      {alertComponent()}
    </>
  )
}

export default EditPageComponent
