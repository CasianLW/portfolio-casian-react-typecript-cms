import type { NextPage } from 'next'

import { useEffect, useState } from 'react'

import AdminLayoutComponent from '@/layout/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useRouter } from 'next/router'
import { Seo } from '@/cas-types'
import EditPageComponent from '@/components/admin/pages/editPageComponent'

interface Props {
  seo: Seo
}
export interface IPageInfo {
  title: string
  seo: {
    title: string
    description: string
    searchImage: string
  }
  _id: string
}
const PageInfoPage: NextPage<Props> = () => {
  // const [loading, setLoading] = useState(true)

  const [pageInfos, setPageInfos] = useState<IPageInfo | undefined>(undefined)
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')

  const router = useRouter()
  const { id } = router.query

  // console.log('Infos: ' + id)
  const getPageInfos = async () => {
    try {
      setSubmitStatus('submitting')

      const response = await fetch(`/api/pages/${id}`, {
        method: 'GET',
      })
      const data = await response.json()
      // console.log(data.data)
      if (response.ok) {
        // Handle success
        setSubmitStatus('success')
        setPageInfos(data.data)
        // setLoading(false)
        // setMessageText(data.message)
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 4000)
      }
    } catch (error: any) {
      // Handle error
      // console.log(data.message)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      getPageInfos()
    }
  }, [router.query.id])

  return (
    <>
      <AdminLayoutComponent>
        <>
          <SeoComponent seo={{ title: 'Pages SEO ', description: 'Pages SEO: Modifier le seo des pages' }} />
          <header>
            <h1 className="main-title">
              Pages SEO /
              <span className="text-xl custom-gradient-primary bg-clip-text text-transparent">{pageInfos?.title}</span>
            </h1>
          </header>
          {/* {alertComponent()} */}
          <main className="admin-content">
            {pageInfos ? (
              <section className="grid gap-4 grid-cols-1 md:grid-cols-1">
                {/* <h1>{workInfos.description}</h1> */}
                <EditPageComponent dataPage={pageInfos} editPageMethod={() => getPageInfos()} />
              </section>
            ) : (
              <div>Loading page infos ...</div>
            )}
          </main>
        </>
      </AdminLayoutComponent>
    </>
  )
}

export default PageInfoPage
