import { AdminNavLinkEnum } from '@/components/nav/admin'
import { limitTitle } from '@/utils/toolbox'
import Link from 'next/link'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { text } from 'stream/consumers'
import DeleteConfirmComponent from '../shared/deleteConfirmComponent'

interface ListPageInterface {
  getPagesList: () => void
  pagesList: never[] | []
}
const ListPageComponent: FC<ListPageInterface> = ({ getPagesList, pagesList }) => {
  function getPagePass() {
    console.log('test reload')
    getPagesList()
  }

  return (
    <>
      <h2 className="secondary-title">Pages List</h2>

      {/* <button onClick={() => getPagePass()}> refresh pages (testing)</button> */}

      <div className="mt-10">
        {Array.isArray(pagesList) &&
          pagesList.map((page: any, i) => {
            // const { navLink, supplementaryClasses } = link
            // const href = getPathFromNavLink(navLink)
            return (
              <PageItem
                key={i}
                title={page.title}
                id={page._id}
                // getWorksList={() => getWorksList()}
                getPagesList={getPagesList}
              />
            )
          })}
      </div>

      {/* {alertComponent()} */}
    </>
  )
}

export default ListPageComponent

interface PageItemInterface {
  title: string
  id: number
  getPagesList: () => void
}
const PageItem: FC<PageItemInterface> = ({ getPagesList, title, id }) => {
  return (
    <div className="flex  w-full max-w-md justify-between pr-3 cms-list-item">
      <p className="px-1">
        {limitTitle(title, 14)} <br /> <span className="text-cas-white-300 text-xs">id:{id}</span>
      </p>
      <div className="grid">
        <Link href={`pages/${id}`} className={'text-green-300 py-1'}>
          Edit
        </Link>
      </div>
    </div>
  )
}
