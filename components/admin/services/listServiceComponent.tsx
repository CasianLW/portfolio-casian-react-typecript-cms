import { AdminNavLinkEnum } from '@/components/nav/admin'
import Link from 'next/link'
import { FC, MouseEvent, useEffect, useState } from 'react'
import DeleteConfirmComponent from '../shared/deleteConfirmComponent'

interface ListServiceInterface {
  getServicesList: () => void
  servicesList: never[] | []
}
const ListServiceComponent: FC<ListServiceInterface> = ({ getServicesList, servicesList }) => {
  function getServicePass() {
    console.log('test reload')
    getServicesList()
  }

  return (
    <>
      <h2 className="secondary-title">Services List</h2>

      <button onClick={() => getServicePass()}> test</button>

      <div className="mt-10">
        {Array.isArray(servicesList) &&
          servicesList.map((service: any, i) => {
            return (
              <ServiceItem
                key={i}
                checkboxValue={service.published}
                title={service.title}
                id={service._id}
                slug={service.slug}
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
  slug: string
  getServicesList: () => void
}
const ServiceItem: FC<ServiceItemInterface> = ({ getServicesList, checkboxValue, title, id, slug }) => {
  const [activeDelete, setActiveDelete] = useState(false)
  function editService(slugEdit: string) {
    console.log(slugEdit)
  }
  function deleteService() {
    setActiveDelete(true)
  }
  function cancelDelete() {
    setActiveDelete(false)
  }

  const deleteConfirm = async (slug: string) => {
    try {
      const response = await fetch(`/api/services/${slug}`, {
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
        <Link
          href={`${AdminNavLinkEnum.Services}/${slug}`}
          className={'text-green-300'}
          onClick={() => editService(slug)}
        >
          Edit
        </Link>
        <button onClick={() => deleteService()}>Delete</button>
      </div>
      <DeleteConfirmComponent
        active={activeDelete}
        deleteFunction={() => deleteConfirm(slug)}
        cancelDelete={() => cancelDelete()}
        itemName={title}
      />
    </div>
  )
}
