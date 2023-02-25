import { Seo } from '@/cas-types'
import AdminNavComponent, { AdminNavLinkEnum } from '@/components/nav/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useAdminNavSettingsContext } from '@/context/admin-nav-settings-context'
import AdminLayoutComponent from '@/layout/admin'
import { NextPage } from 'next'
import { useEffect } from 'react'

interface Props {
  seo: Seo
}

const GeneralCMS: NextPage<Props> = () => {
  const { setActiveNavLink } = useAdminNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(AdminNavLinkEnum.General)
  }, [setActiveNavLink])

  return (
    <AdminLayoutComponent>
      <>
        <SeoComponent seo={{ title: 'General CMS', description: 'General: Settings and other infos' }} />
        <header className="top-header-admin lateral-space">
          <h1 className="main-title">GeneralCMS Page</h1>
        </header>
        <section className="admin-content"></section>
      </>
    </AdminLayoutComponent>
  )
}

export default GeneralCMS
