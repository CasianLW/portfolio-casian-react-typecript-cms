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
                showPrice={service.showPrice}
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
  showPrice: boolean
  title: string
  id: number
  getServicesList: () => void
}
const ServiceItem: FC<ServiceItemInterface> = ({ getServicesList, checkboxValue, title, id, showPrice }) => {
  const [activeDelete, setActiveDelete] = useState(false)
  const [isChecked, setIsChecked] = useState<boolean>(checkboxValue)
  const [isPriceChecked, setIsPriceChecked] = useState<boolean>(showPrice)

  const checkboxUpdate = async (id: number, priceMethod: boolean = false) => {
    try {
      const key = priceMethod ? 'showPrice' : 'published'
      console.log(key)
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [key]: priceMethod ? !isPriceChecked : !isChecked }),
      })
      if (response.ok) {
        priceMethod ? setIsPriceChecked(!isPriceChecked) : setIsChecked(!isChecked)
      }
    } catch (error: any) {
      console.log(error)
    }
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
    <div className="flex w-full max-w-md justify-between pr-3 cms-list-item">
      <div className="grid">
        <label className="items-center flex self-start" htmlFor={`s-published-${id}`}>
          <input
            className="accent-cas-gradient-purple"
            id={`s-published-${id}`}
            type="checkbox"
            checked={isChecked}
            onChange={() => checkboxUpdate(id)}
          />
          <span>{isChecked ? 'Public' : 'Private'}</span>
        </label>
        <label className="items-center flex self-start" htmlFor={`price-${id}`}>
          <input
            className="accent-cas-gradient-purple"
            id={`price-${id}`}
            type="checkbox"
            checked={isPriceChecked}
            onChange={() => checkboxUpdate(id, true)}
          />
          <span>{isPriceChecked ? 'ON' : 'OFF'}</span>
        </label>
      </div>
      <p className="px-1">
        {title} <br /> <span className="text-cas-white-300 text-xs">id:{id}</span>
      </p>
      <div className="grid">
        <Link href={`services/${id}`} className={'text-green-300 py-1'}>
          Edit
        </Link>
        <a className="text-red-400 py-1" onClick={() => deleteService()}>
          Delete
        </a>
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
