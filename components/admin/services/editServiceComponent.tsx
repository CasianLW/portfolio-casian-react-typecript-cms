import ServicesComponent from '@/components/services/servicesComponent'
import { IServiceInfo } from '@/pages/admin/services/[id]'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import { FC, useState } from 'react'

interface EditServiceInterface {
  editServiceMethod: () => void
  dataService: IServiceInfo
}
const EditServiceComponent: FC<EditServiceInterface> = ({ dataService, editServiceMethod }) => {
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
    title: dataService.title,
    priceDetails: dataService.priceDetails,
    showPrice: dataService.showPrice,
    category: dataService.category,
    pointList: dataService.points,
    description: dataService.description,
    imgLink: dataService.coverImage,
    published: dataService.published,
    pointText: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle' | 'changed'>('idle')
  const [messageText, setMessageText] = useState()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitStatus('submitting')
    const response = await fetch(`/api/services/${dataService._id}`, {
      method: 'PUT',
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
      editServiceMethod()
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
    setSubmitStatus('changed')

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
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
      {/* <style>{`
        form input, form textarea {
          background-color: red;
        }
      `}</style> */}
      <h2 className="secondary-title">Edit Service</h2>
      <section className="grid sm:grid-cols-2">
        <div className="w-[200%]">
          <ServicesComponent
            title={formData.title}
            description={formData.description}
            activePrice={formData.showPrice}
            coverImage={formData.imgLink}
            price={formData.priceDetails}
            pointList={formData.pointList}
          />
        </div>
        <form className="mt-10 " onSubmit={handleSubmit}>
          {/* <h3>Ajouter un projet</h3> */}
          <div className="grid">
            <label htmlFor="title">Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </div>
          <div className="grid">
            <label htmlFor="priceDetails">Price details</label>
            <input
              required
              type="text"
              name="priceDetails"
              value={formData.priceDetails}
              onChange={handleInputChange}
            />
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
            {/* <input required name="imgLink" value={formData.imgLink} onChange={handleInputChange} /> */}
            <input required name="imgLink" value={formData.imgLink} onChange={handleInputChange} />
            {formData.imgLink && <CldImage width="600" height="600" src={formData.imgLink} alt="Image du service" />}
            <CldUploadButton
              onUpload={uploadedCloudinary}
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            />
          </div>
          <div className="my-10 grid grid-cols-2">
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
            Update project
          </button>
        </form>
      </section>

      {alertComponent()}
    </>
  )
}

export default EditServiceComponent
