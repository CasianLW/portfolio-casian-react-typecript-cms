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

const HomepageCMS: NextPage<Props> = () => {
  const { setActiveNavLink } = useAdminNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(AdminNavLinkEnum.Homepage)
  }, [setActiveNavLink])

  return (
    <AdminLayoutComponent>
      <>
        <SeoComponent seo={{ title: 'Homepage CMS', description: 'Homepage: Slider and other settings' }} />
        <header className="top-header-admin lateral-space">
          <h1 className="main-title">Homepage Page</h1>
        </header>
        <section className="admin-content"></section>
      </>
    </AdminLayoutComponent>
  )
}

export default HomepageCMS
