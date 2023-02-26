import { AdminNavLinkEnum } from '@/components/nav/admin'
import Link from 'next/link'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { text } from 'stream/consumers'
import DeleteConfirmComponent from '../shared/deleteConfirmComponent'

const ListWorkComponent: FC = () => {
  const [worksList, setWorksList] = useState([])
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState()
  const getWorksList = async () => {
    try {
      setSubmitStatus('submitting')
      const response = await fetch('/api/works/', {
        method: 'GET',
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        // Handle success
        setSubmitStatus('success')
        setWorksList(data.works.reverse())
        setMessageText(data.message)
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 4000)
      }
    } catch (error: any) {
      // Handle error
      // console.log(data.message)
      setSubmitStatus('error')
      setMessageText(error)
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }
  useEffect(() => {
    getWorksList()
    // console.log(worksList)
  }, [setSubmitStatus, setMessageText])

  const alertComponent = () => {
    switch (submitStatus) {
      case 'submitting':
        return <div className="alert alert-info text-cas-white-100">Loading works ...</div>
      case 'success':
        return <div className="alert alert-success text-cas-white-100">Work list successfully imported!</div>
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
      <h2 className="secondary-title">Works List</h2>
      <div className="mt-10">
        {Array.isArray(worksList) &&
          worksList.map((work: any, i) => {
            // const { navLink, supplementaryClasses } = link
            // const href = getPathFromNavLink(navLink)
            return (
              <WorkItem
                key={i}
                checkboxValue={work.published}
                title={work.title}
                id={work._id}
                slug={work.slug}
                getWorksList={() => getWorksList()}
              />
            )
          })}
      </div>

      {alertComponent()}
    </>
  )
}

export default ListWorkComponent

interface WorkItemInterface {
  checkboxValue: boolean
  title: string
  id: number
  slug: string
  getWorksList: () => void
}
const WorkItem: FC<WorkItemInterface> = ({ getWorksList, checkboxValue, title, id, slug }) => {
  const [aciveDelete, setAciveDelete] = useState(false)
  // const { navIsClosed, setNavIsClosed, activeNavLink } = useAdminNavSettingsContext()
  function editWork(slugEdit: string) {
    console.log(slugEdit)
  }
  function deleteWork() {
    setAciveDelete(true)
  }
  function cancelDelete() {
    setAciveDelete(false)
  }

  const deleteConfirm = async (slug: string) => {
    try {
      const response = await fetch(`/api/works/${slug}`, {
        method: 'DELETE',
      })
      // const data = await response.json()
      // console.log(data)
      if (response.ok) {
        getWorksList()
        setAciveDelete(false)

        // Handle success
        // setWorksList(data.works)
        // setMessageText(data.message)
        // setTimeout(() => {
        //   setSubmitStatus('idle')
        // }, 4000)
      }
    } catch (error: any) {
      // Handle error
      console.log(error)
      // setSubmitStatus('error')
      // setMessageText(error)
      // setTimeout(() => {
      //   setSubmitStatus('idle')
      // }, 4000)
    }
  }

  return (
    <div className="flex w-full max-w-md justify-between pr-3">
      <label htmlFor="">
        <input type="checkbox" checked={checkboxValue} onChange={() => deleteWork()} />
        <span>{checkboxValue ? 'Public' : 'Private'}</span>
      </label>
      <p>
        {title} <br /> <span className="text-cas-white-300 text-xs">id:{id}</span>
      </p>
      <div>
        <Link href={AdminNavLinkEnum.Works} className={'text-green-300'} onClick={() => editWork(slug)}>
          Edit
        </Link>
        <button onClick={() => deleteWork()}>Delete</button>
      </div>
      <DeleteConfirmComponent
        active={aciveDelete}
        deleteFunction={() => deleteConfirm(slug)}
        cancelDelete={() => cancelDelete()}
        itemName={title}
      />
    </div>
  )
}
