import { Seo } from '@/cas-types'
import AddServiceComponent from '@/components/admin/services/addServiceComponent'
import ListServiceComponent from '@/components/admin/services/listServiceComponent'
import AdminNavComponent, { AdminNavLinkEnum } from '@/components/nav/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useAdminNavSettingsContext } from '@/context/admin-nav-settings-context'
import AdminLayoutComponent from '@/layout/admin'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

interface Props {
  seo: Seo
}

const ServicesCMS: NextPage<Props> = () => {
  const { setActiveNavLink } = useAdminNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(AdminNavLinkEnum.Services)
  }, [setActiveNavLink])

  const [loading, setLoading] = useState(true)
  const [servicesList, setServicesList] = useState([])
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState()
  const getServicesList = async () => {
    console.log('test du transfer')
    try {
      setSubmitStatus('submitting')
      const response = await fetch('/api/services/', {
        method: 'GET',
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        // Handle success
        setSubmitStatus('success')
        setServicesList(data.services.reverse())
        setLoading(false)
        // console.log(Array.isArray(worksList) + 'ies it is')

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
    getServicesList()
  }, [setSubmitStatus, setMessageText, setServicesList])

  const alertComponent = () => {
    switch (submitStatus) {
      case 'submitting':
        return <div className="alert alert-info text-cas-white-100">Loading services ...</div>
      case 'success':
        return <div className="alert alert-success text-cas-white-100">Service list successfully imported!</div>
      case 'error':
        return <div className="alert alert-danger text-cas-white-100">{messageText}</div>
      case 'idle':
        return <div className="alert alert-danger text-cas-white-100"></div>
      default:
        return null
    }
  }

  return (
    <AdminLayoutComponent>
      <>
        <SeoComponent seo={{ title: 'Service CMS', description: 'Service: Ajouter, modifier et supprimer' }} />
        <header>
          <h1 className="main-title">ServicesCMS</h1>
        </header>
        {alertComponent()}
        <main className="admin-content">
          {loading ? ( // Conditional rendering based on the loading state
            <div>Loading Services ...</div>
          ) : (
            <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="col-span-1">
                <ListServiceComponent getServicesList={() => getServicesList()} servicesList={servicesList} />
              </div>
              <div className="col-span-1">
                <AddServiceComponent getServicesList={() => getServicesList()} />
              </div>
            </section>
          )}
        </main>
      </>
    </AdminLayoutComponent>
  )
}

export default ServicesCMS
