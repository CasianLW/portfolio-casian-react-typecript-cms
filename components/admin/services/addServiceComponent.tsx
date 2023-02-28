import { FC, useState } from 'react'

interface AddServiceInterface {
  getServicesList: () => void
  // seoTitle: string
  // title: string
  // priceDetails: string
  // description: string
  // imgLink: string
  // published: boolean
  // showPrice: boolean
  // pointText: string
  // pointList: string[]
}
const AddServiceComponent: FC<AddServiceInterface> = ({ getServicesList }) => {
  interface FormDataType {
    title: string
    priceDetails: string
    description: string
    imgLink: string
    published: boolean
    showPrice: boolean
    category: string
    pointText: string
    pointList: string[]
  }
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    priceDetails: '',
    description: '',
    imgLink: '',
    published: false,
    showPrice: false,
    category: '',
    pointText: '',
    pointList: [],
  })
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitStatus('submitting')
    const response = await fetch('/api/services/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.title,
        priceDetails: formData.priceDetails,
        description: formData.description,
        coverImage: formData.imgLink,
        published: formData.published,
        showPrice: formData.showPrice,
        category: formData.category,
        points: formData.pointList,
      }),
    })
    const data = await response.json()

    if (response.ok) {
      // Handle success
      setSubmitStatus('success')
      setMessageText(data.message)
      getServicesList()
      setFormData({
        title: '',
        priceDetails: '',
        description: '',
        imgLink: '',
        published: false,
        showPrice: false,
        pointText: '',
        category: '',
        pointList: [],
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
  const addPointToList = (event: any) => {
    // console.log(
    //   JSON.stringify({
    //     title: formData.title,
    //     priceDetails: formData.priceDetails,
    //     description: formData.description,
    //     coverImage: formData.imgLink,
    //     published: formData.published,
    //     showPrice: formData.showPrice,
    //     points: formData.pointList,
    //   })
    // )
    event.preventDefault()
    setFormData({
      ...formData,
      pointText: '',
      pointList: [...formData.pointList, formData.pointText],
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
        return <div className="alert alert-danger text-cas-white-100">No error here</div>
      default:
        return null
    }
  }
  return (
    <>
      <h2 className="secondary-title">Add new Service</h2>
      <form className="mt-10 " onSubmit={handleSubmit}>
        <h3>Ajouter un projet</h3>
        <div className="grid">
          <label htmlFor="title">Title</label>
          <input required type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="grid">
          <label htmlFor="priceDetails">Price details</label>
          <input required type="text" name="priceDetails" value={formData.priceDetails} onChange={handleInputChange} />
        </div>
        <div className="grid">
          <label htmlFor="showPrice">Show price:</label>
          <div>
            <input
              type={'checkbox'}
              name="showPrice"
              checked={formData.showPrice}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  showPrice: event.target.checked,
                })
              }
            />
            <span className="text-cas-white-100">{formData.showPrice ? 'Yes' : 'No'}</span>
          </div>
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
          <label htmlFor="category">Category:</label>
          <div>
            <input
              type="radio"
              id="complets"
              name="category"
              value="complets"
              checked={formData.category === 'complets'}
              onChange={handleInputChange}
            />
            <label htmlFor="complets">Complets</label>
          </div>
          <div>
            <input
              type="radio"
              id="specifics"
              name="category"
              value="specifics"
              checked={formData.category === 'specifics'}
              onChange={handleInputChange}
            />
            <label htmlFor="specifics">Specifics</label>
          </div>
          <div>
            <input
              type="radio"
              id="autre"
              name="category"
              value="autre"
              checked={formData.category === 'autre'}
              onChange={handleInputChange}
            />
            <label htmlFor="autre">Autre</label>
          </div>
        </div>
        <div className="my-10">
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
        <div className="mt-10">
          <h3>Point List:</h3>
          <div className="grid">
            <label htmlFor="pointText">Point text:</label>
            <input name="pointText" value={formData.pointText} onChange={handleInputChange} />
            <button onClick={addPointToList}>Add point to list</button>
          </div>
          <div>
            <p>Point List:</p>
            <ul>
              {formData.pointList.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
        <button className="text-cas-white-100" type="submit">
          Enregistrer service
        </button>
      </form>
      {alertComponent()}
    </>
  )
}

export default AddServiceComponent
