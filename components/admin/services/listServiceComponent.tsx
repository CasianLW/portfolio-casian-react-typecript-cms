import { AdminNavLinkEnum } from '@/components/nav/admin'
import Link from 'next/link'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { text } from 'stream/consumers'
import DeleteConfirmComponent from '../shared/deleteConfirmComponent'

interface ListWorkInterface {
  getWorksList: () => void
  worksList: never[] | []
}
const ListWorkComponent: FC<ListWorkInterface> = ({ getWorksList, worksList }) => {
  function getWorkPass() {
    console.log('test reload')
    getWorksList()
  }

  return (
    <>
      <h2 className="secondary-title">Works List</h2>

      <button onClick={() => getWorkPass()}> test</button>

      <div className="mt-10">
        {Array.isArray(worksList) &&
          worksList.map((work: any, i) => {
            return (
              <WorkItem
                key={i}
                checkboxValue={work.published}
                title={work.title}
                id={work._id}
                slug={work.slug}
                getWorksList={getWorksList}
              />
            )
          })}
      </div>
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
  const [activeDelete, setActiveDelete] = useState(false)
  function editWork(slugEdit: string) {
    console.log(slugEdit)
  }
  function deleteWork() {
    setActiveDelete(true)
  }
  function cancelDelete() {
    setActiveDelete(false)
  }

  const deleteConfirm = async (slug: string) => {
    try {
      const response = await fetch(`/api/works/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        getWorksList()
        setActiveDelete(false)
      }
    } catch (error: any) {
      console.log(error)
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
        <Link href={`${AdminNavLinkEnum.Works}/${slug}`} className={'text-green-300'} onClick={() => editWork(slug)}>
          Edit
        </Link>
        <button onClick={() => deleteWork()}>Delete</button>
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
