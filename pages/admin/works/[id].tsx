import type { NextPage } from 'next'

import { useEffect, useState } from 'react'

import AdminLayoutComponent from '@/layout/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useRouter } from 'next/router'
import { Seo } from '@/cas-types'
import EditWorkComponent from '@/components/admin/works/editWorkComponent'

interface Props {
  seo: Seo
}
export interface IWorkInfo {
  seo: {
    title: string
    description: string
  }
  category: {
    dev: boolean
    uxui: boolean
    graphic: boolean
    all: boolean
  }
  _id: string
  title: string
  secondaryTitle: string
  slug: string
  description: string
  coverImage: string
  secondaryImage: string
  published: boolean
  order: number
  pointText: string
  pointList: string[]
  links: {
    website: { published: boolean; link: string }
    otherResource: { published: boolean; link: string }
  }
}
const WorkInfoPage: NextPage<Props> = () => {
  // const [loading, setLoading] = useState(true)

  const [workInfos, setWorkInfos] = useState<IWorkInfo | undefined>(undefined)
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')

  const router = useRouter()
  const { id } = router.query

  // console.log('Infos: ' + id)
  const getWorkInfos = async () => {
    try {
      setSubmitStatus('submitting')

      const response = await fetch(`/api/works/${id}`, {
        method: 'GET',
      })
      const data = await response.json()
      // console.log(data.data)
      if (response.ok) {
        // Handle success
        setSubmitStatus('success')
        setWorkInfos(data.data)
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
      getWorkInfos()
    }
  }, [router.query.id])

  return (
    <>
      <AdminLayoutComponent>
        <>
          <SeoComponent seo={{ title: 'Works CMS', description: 'Works: Ajouter, modifier et supprimer' }} />
          <header>
            <h1 className="main-title">
              WorksCMS /
              <span className="text-xl custom-gradient-primary bg-clip-text text-transparent">{workInfos?.title}</span>
            </h1>
          </header>
          {/* {alertComponent()} */}
          <main className="admin-content">
            {workInfos ? (
              <section className="grid gap-4 grid-cols-1 md:grid-cols-1">
                {/* <h1>{workInfos.description}</h1> */}
                <EditWorkComponent dataWork={workInfos} editWorkMethod={() => getWorkInfos()} />
              </section>
            ) : (
              <div>Loading work page ...</div>
            )}
          </main>
        </>
      </AdminLayoutComponent>
    </>
  )
}

export default WorkInfoPage
