import { Seo } from '@/cas-types'
import AddPageComponent from '@/components/admin/pages/addPageComponent'
import ListPageComponent from '@/components/admin/pages/listPageComponent'
import AdminNavComponent, { AdminNavLinkEnum } from '@/components/nav/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useAdminNavSettingsContext } from '@/context/admin-nav-settings-context'
import AdminLayoutComponent from '@/layout/admin'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

interface Props {
  seo: Seo
}

const PagesCMS: NextPage<Props> = () => {
  const { setActiveNavLink } = useAdminNavSettingsContext()

  useEffect(() => {
    setActiveNavLink(AdminNavLinkEnum.Pages)
  }, [setActiveNavLink])

  const [loading, setLoading] = useState(true)
  const [pagesList, setPagesList] = useState([])
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState(String)
  const getPagesList = async () => {
    // console.log('test du transfer')
    try {
      setSubmitStatus('submitting')
      const response = await fetch('/api/pages/', {
        method: 'GET',
      })
      const data = await response.json()
      // console.log(data)
      if (response.ok) {
        // Handle success
        setSubmitStatus('success')
        setPagesList(data.pages.reverse())
        setLoading(false)

        setMessageText(data.message)
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 4000)
      }
    } catch (error: any) {
      // Handle error
      // console.log(data.message)
      setSubmitStatus('error')
      setMessageText(`${error}`)
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }
  useEffect(() => {
    getPagesList()
  }, [setSubmitStatus, setMessageText, setPagesList])

  const alertComponent = () => {
    switch (submitStatus) {
      case 'submitting':
        return <div className="alert alert-info text-cas-white-100">Loading pages ...</div>
      case 'success':
        return <div className="alert alert-success text-cas-white-100">Page list successfully imported!</div>
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
        <SeoComponent seo={{ title: 'Pages SEO ', description: 'Pages SEO: Ajouter, modifier ' }} />
        <header>
          <h1 className="main-title">Pages SEO</h1>
        </header>
        <main className="admin-content">
          <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="col-span-1">
              {loading ? ( // Conditional rendering based on the loading state
                <div>Loading pages...</div>
              ) : (
                <ListPageComponent getPagesList={() => getPagesList()} pagesList={pagesList} />
              )}
            </div>
            <div className="col-span-1">
              <AddPageComponent getPagesList={() => getPagesList()} />
            </div>
          </section>
          {alertComponent()}
        </main>
      </>
    </AdminLayoutComponent>
  )
}

export default PagesCMS
