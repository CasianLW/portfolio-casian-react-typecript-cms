import type { NextPage } from 'next'

import { useEffect, useState } from 'react'

import AdminLayoutComponent from '@/layout/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useRouter } from 'next/router'
import { Seo } from '@/cas-types'
import EditServiceComponent from '@/components/admin/services/editServiceComponent'

interface Props {
  seo: Seo
}
export interface IServiceInfo {
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
  slug: string
  description: string
  coverImage: string
  secondaryImage: string
  published: boolean
}
const ServiceInfoPage: NextPage<Props> = () => {
  // const [loading, setLoading] = useState(true)

  const [serviceInfos, setServiceInfos] = useState<IServiceInfo | undefined>(undefined)
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')

  const router = useRouter()
  const { id } = router.query

  // console.log('Infos: ' + id)
  const getServiceInfos = async () => {
    try {
      setSubmitStatus('submitting')

      const response = await fetch(`/api/services/${id}`, {
        method: 'GET',
      })
      const data = await response.json()
      // console.log(data.data)
      if (response.ok) {
        // Handle success
        setSubmitStatus('success')
        setServiceInfos(data.data)
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
      getServiceInfos()
    }
  }, [router.query.id])

  return (
    <>
      <AdminLayoutComponent>
        <>
          <SeoComponent seo={{ title: 'Services CMS', description: 'Services: Ajouter, modifier et supprimer' }} />
          <header>
            <h1 className="main-title">
              ServicesCMS /
              <span className="text-xl custom-gradient-primary bg-clip-text text-transparent">
                {serviceInfos?.title}
              </span>
            </h1>
          </header>
          {/* {alertComponent()} */}
          <main className="admin-content">
            {serviceInfos ? (
              <section className="grid gap-4 grid-cols-1 md:grid-cols-1">
                {/* <h1>{serviceInfos.description}</h1> */}
                <EditServiceComponent dataService={serviceInfos} editServiceMethod={() => getServiceInfos()} />
              </section>
            ) : (
              <div>Loading service page ...</div>
            )}
          </main>
        </>
      </AdminLayoutComponent>
    </>
  )
}

export default ServiceInfoPage
