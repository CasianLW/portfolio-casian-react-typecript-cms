import { FC, useState } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary'

interface AddWorkInterface {
  getWorksList: () => void
}
const AddWorkComponent: FC<AddWorkInterface> = ({ getWorksList }) => {
  interface ICloudinaryUploadResult {
    event: boolean
    info: {
      public_id: string
    }
  }
  interface ICloudinaryWidget {
    close: () => void
  }
  interface FormDataType {
    seoTitle: string
    seoDescription: string
    title: string
    secondaryTitle: string
    slug: string
    description: string
    imgLink: string
    secondaryImage: string
    category: {
      dev: boolean
      uxui: boolean
      graphic: boolean
    }
    published: boolean
    order: number
    pointText: string
    pointList: string[]
    links: {
      website: { published: boolean; link: string }
      otherResource: { published: boolean; link: string }
    }
  }

  const [formData, setFormData] = useState<FormDataType>({
    seoTitle: '',
    seoDescription: '',
    title: '',
    secondaryTitle: '',
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
    order: 50,
    pointText: '',
    pointList: [],
    links: {
      website: { published: false, link: '' },
      otherResource: { published: false, link: '' },
    },
  })
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitStatus('submitting')
    const response = await fetch('/api/works/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seo: {
          title: formData.seoTitle,
          description: formData.seoDescription,
        },
        title: formData.title,
        secondaryTitle: formData.secondaryTitle,
        slug: formData.slug,
        description: formData.description,
        coverImage: formData.imgLink,
        category: {
          dev: formData.category.dev,
          uxui: formData.category.uxui,
          graphic: formData.category.graphic,
        },
        links: {
          website: { published: formData.links.website.published, link: formData.links.website.link },

          otherRessource: {
            published: formData.links.otherResource.published,
            link: formData.links.otherResource.link,
          },
        },
        skillPoints: formData.pointList,

        secondaryImage: formData.secondaryImage,
        published: formData.published,
      }),
    })
    const data = await response.json()

    if (response.ok) {
      // Handle success
      setSubmitStatus('success')
      setMessageText(data.message)
      getWorksList()
      setFormData({
        seoTitle: '',
        seoDescription: '',
        title: '',
        secondaryTitle: '',
        slug: '',
        description: '',
        imgLink: '',
        secondaryImage: '',
        order: 50,
        category: {
          dev: false,
          uxui: false,
          graphic: false,
        },
        published: false,
        pointText: '',
        pointList: [],
        links: {
          website: { published: false, link: '' },
          otherResource: { published: false, link: '' },
        },
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
    console.log('cloudinary working')
    if (result.info) {
      result.info &&
        setFormData((prevFormData) => ({
          ...prevFormData,
          imgLink: result.info.public_id,
        }))
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
  const addPointToList = (event: any) => {
    event.preventDefault()
    setFormData({
      ...formData,
      pointText: '',
      pointList: [...formData.pointList, formData.pointText],
    })
  }
  const deletePoint = (index: number) => {
    const newPoints = [...formData.pointList]
    newPoints.splice(index, 1)
    setFormData({ ...formData, pointList: newPoints })
  }
  return (
    <>
      <h2 className="secondary-title">Add new Work</h2>
      <form className="mt-10 " onSubmit={handleSubmit}>
        <h3>*Complétez le formulaire pour ajouter un projet</h3>
        <div className="grid  mt-6">
          <label htmlFor="title">Title</label>
          <input required type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="grid">
          <label htmlFor="secondaryTitle">Secondary title</label>
          <input
            required
            type="text"
            name="secondaryTitle"
            value={formData.secondaryTitle}
            onChange={handleInputChange}
          />
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
        <div className="mt-16">
          <h3>Tech & methods:</h3>
          <div className="grid">
            <label htmlFor="pointText">Point text:</label>
            <input name="pointText" value={formData.pointText} onChange={handleInputChange} />
            <button onClick={addPointToList}>Add point to list</button>
          </div>
          <div>
            <p>Point List:</p>
            <ul>
              {formData.pointList.map((point, index) => (
                <li className="flex justify-between" key={index}>
                  <p>{point}</p>{' '}
                  <button className="deleteBtn" onClick={() => deletePoint(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid  mt-16">
          <label htmlFor="websiteBox">Website link ?</label>
          <div>
            <input
              type={'checkbox'}
              name="websiteBox"
              checked={formData.links.website.published}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  links: {
                    ...formData.links,
                    website: {
                      ...formData.links.website,
                      published: event.target.checked,
                    },
                  },
                })
              }
            />
            <span className="text-cas-white-100">{formData.links.website.published ? 'Yes' : 'No'}</span>
          </div>
          <input
            disabled={!formData.links.website.published}
            required
            placeholder={formData.links.website.published ? 'https://....' : 'Check the box to enter link'}
            type="text"
            name="websiteLink"
            value={formData.links.website.link}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="otherResourceBox">Other link ?</label>
          <div>
            <input
              type={'checkbox'}
              name="otherResourceBox"
              checked={formData.links.otherResource.published}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  links: {
                    ...formData.links,
                    otherResource: {
                      ...formData.links.otherResource,
                      published: event.target.checked,
                    },
                  },
                })
              }
            />
            <span className="text-cas-white-100">{formData.links.otherResource.published ? 'Yes' : 'No'}</span>
          </div>
          <input
            disabled={!formData.links.otherResource.published}
            required
            placeholder={formData.links.otherResource.published ? 'https://....' : 'Check the box to enter link'}
            type="text"
            name="otherResourceLink"
            value={formData.links.otherResource.link}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid mt-16">
          <label htmlFor="imgLink">Lien image</label>
          {/* <input required name="imgLink" value={formData.imgLink} onChange={handleInputChange} /> */}
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

        <div className="grid">
          <label htmlFor="secondaryImage">Secondary Image</label>
          {/* <input required name="secondaryImage" value={formData.secondaryImage} onChange={handleInputChange} /> */}
          <input
            disabled
            placeholder="Image link will display here..."
            required
            name="secondaryImage"
            value={formData.secondaryImage}
            onChange={handleInputChange}
          />
          {formData.secondaryImage && (
            <CldImage width="600" height="600" src={formData.secondaryImage} alt="Description of my image" />
          )}
          <CldUploadButton
            onUpload={uploadedCloudinarySecondary}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          />
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
        <div className="grid">
          <label htmlFor="order">Ordre dans la liste</label>
          <input required name="order" type="number" value={formData.order} onChange={handleInputChange} />
          *50 étant la valeur défault de tous les projets
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
          Enregistrer projet
        </button>
      </form>
      {alertComponent()}
    </>
  )
}

export default AddWorkComponent
