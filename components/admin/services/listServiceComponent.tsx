import { AdminNavLinkEnum } from '@/components/nav/admin'
import Link from 'next/link'
import { FC, useState } from 'react'
import DeleteConfirmComponent from '../shared/deleteConfirmComponent'

interface ListServiceInterface {
  getServicesList: () => void
  servicesList: never[] | []
}
const ListServiceComponent: FC<ListServiceInterface> = ({ getServicesList, servicesList }) => {
  function getServicePass() {
    // console.log('test reload')
    getServicesList()
  }

  return (
    <>
      <h2 className="secondary-title">Services List</h2>

      {/* <button onClick={() => getServicePass()}> test</button> */}

      <div className="mt-10">
        {Array.isArray(servicesList) &&
          servicesList.map((service: any, i) => {
            return (
              <ServiceItem
                key={i}
                checkboxValue={service.published}
                title={service.title}
                id={service._id}
                getServicesList={getServicesList}
              />
            )
          })}
      </div>
    </>
  )
}

export default ListServiceComponent

interface ServiceItemInterface {
  checkboxValue: boolean
  title: string
  id: number
  getServicesList: () => void
}
const ServiceItem: FC<ServiceItemInterface> = ({ getServicesList, checkboxValue, title, id }) => {
  const [activeDelete, setActiveDelete] = useState(false)
  function editService(slugEdit: number) {
    console.log(slugEdit)
  }
  function deleteService() {
    setActiveDelete(true)
  }
  function cancelDelete() {
    setActiveDelete(false)
  }

  const deleteConfirm = async (id: number) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        getServicesList()
        setActiveDelete(false)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full max-w-md justify-between pr-3">
      <label htmlFor="">
        <input type="checkbox" checked={checkboxValue} onChange={() => deleteService()} />
        <span>{checkboxValue ? 'Public' : 'Private'}</span>
      </label>
      <p>
        {title} <br /> <span className="text-cas-white-300 text-xs">id:{id}</span>
      </p>
      <div>
        <Link href={`services/${id}`} className={'text-green-300'}>
          Edit
        </Link>
        <button onClick={() => deleteService()}>Delete</button>
      </div>
      <DeleteConfirmComponent
        active={activeDelete}
        deleteFunction={() => deleteConfirm(id)}
        cancelDelete={() => cancelDelete()}
        itemName={title}
      />
    </div>
  )
}
