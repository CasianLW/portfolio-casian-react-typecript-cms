import { AdminNavLinkEnum } from '@/components/nav/admin'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { text } from 'stream/consumers'

const ListWorkComponent: FC = () => {
  const [worksList, setWorksList] = useState([])
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState()

  useEffect(() => {
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
          setWorksList(data.works)
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

    getWorksList()
    // console.log(worksList)
  }, [setSubmitStatus, setMessageText, setWorksList])

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
            return <WorkItem key={i} checkboxValue={work.published} title={work.title} id={work._id} slug={work.slug} />
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
}
const WorkItem: FC<WorkItemInterface> = ({ checkboxValue, title, id, slug }) => {
  // const { navIsClosed, setNavIsClosed, activeNavLink } = useAdminNavSettingsContext()
  function editWork(slugEdit: string) {
    console.log(slugEdit)
  }
  function deleteWork(slugDelete: string) {
    console.log(slugDelete)
  }

  return (
    <div className="flex w-full max-w-md justify-between pr-3">
      <label htmlFor="">
        <input type="checkbox" checked={checkboxValue} onChange={() => deleteWork(slug)} />
        <span>{checkboxValue ? 'Public' : 'Private'}</span>
      </label>
      <p>
        {title} <br /> <span className="text-cas-white-300 text-xs">id:{id}</span>
      </p>
      <div>
        <Link href={AdminNavLinkEnum.Works} className={'text-green-300'} onClick={() => editWork(slug)}>
          Edit
        </Link>
        <button onClick={() => deleteWork(slug)}>Delete</button>
      </div>
    </div>
  )
}
