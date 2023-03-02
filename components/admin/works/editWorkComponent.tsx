import { IWorkInfo } from '@/pages/admin/works/[id]'
import { FC, useState } from 'react'

interface EditWorkInterface {
  editWorkMethod: () => void
  dataWork: IWorkInfo
}
const EditWorkComponent: FC<EditWorkInterface> = ({ dataWork, editWorkMethod }) => {
  const [formData, setFormData] = useState({
    seoTitle: dataWork.seo.title,
    seoDescription: dataWork.seo.description,
    title: dataWork.title,
    slug: dataWork.slug,
    description: dataWork.description,
    imgLink: dataWork.coverImage,
    secondaryImage: dataWork.secondaryImage,
    category: {
      dev: dataWork.category.dev,
      uxui: dataWork.category.uxui,
      graphic: dataWork.category.graphic,
    },
    published: dataWork.published,
  })
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitStatus('submitting')
    const response = await fetch(`/api/works/${dataWork._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seo: {
          title: formData.seoTitle,
          description: formData.seoDescription,
        },
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        coverImage: formData.imgLink,
        category: {
          dev: formData.category.dev,
          uxui: formData.category.uxui,
          graphic: formData.category.graphic,
        },

        secondaryImage: formData.secondaryImage,
        published: formData.published,
      }),
    })
    const data = await response.json()

    if (response.ok) {
      // Handle success
      setSubmitStatus('success')
      setMessageText(data.message)
      editWorkMethod()
      setFormData({
        seoTitle: '',
        seoDescription: '',
        title: '',
        slug: '',
        description: '',
        imgLink: '',
        secondaryImage: '',
        category: {
          dev: false,
          uxui: false,
          graphic: false,
        },
        published: false,
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
  return (
    <>
      {/* <h2 className="secondary-title">Edit Work</h2> */}
      <form className="mt-10 " onSubmit={handleSubmit}>
        {/* <h3>Ajouter un projet</h3> */}
        <div className="grid">
          <label htmlFor="title">Title</label>
          <input required type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="grid">
          <label htmlFor="slug">Slug</label>
          <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} />
        </div>
        <div className="grid">
          <label htmlFor="description">Description</label>
          <textarea
            className="text-cas-black-600"
            required
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="imgLink">Lien image</label>
          <input required name="imgLink" value={formData.imgLink} onChange={handleInputChange} />
        </div>

        <div className="grid">
          <label htmlFor="secondaryImage">Secondary Image</label>
          <input required name="secondaryImage" value={formData.secondaryImage} onChange={handleInputChange} />
        </div>

        <div className="grid">
          <label>Category</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="dev"
                checked={formData.category.dev}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    category: { ...prev.category, dev: !prev.category.dev },
                  }))
                }
              />
              Dev
            </label>
            <label>
              <input
                type="checkbox"
                name="uxui"
                checked={formData.category.uxui}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    category: { ...prev.category, uxui: !prev.category.uxui },
                  }))
                }
              />
              UX/UI
            </label>
            <label>
              <input
                type="checkbox"
                name="graphic"
                checked={formData.category.graphic}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    category: { ...prev.category, graphic: !prev.category.graphic },
                  }))
                }
              />
              Graphic
            </label>
          </div>
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
          <div className="grid">
            <label htmlFor="published">Published:</label>
            <div>
              <input
                type={'checkbox'}
                name="published"
                checked={formData.published}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    published: event.target.checked,
                  })
                }
              />
              <span className="text-cas-white-100">{formData.published ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
        <button className="text-cas-white-100" type="submit">
          Update project
        </button>
      </form>
      {alertComponent()}
    </>
  )
}

export default EditWorkComponent
