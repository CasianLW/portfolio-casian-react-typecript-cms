import { Seo } from '@/cas-types'
import AddWorkComponent from '@/components/admin/works/addWorkComponent'
import AdminNavComponent, { AdminNavLinkEnum } from '@/components/nav/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useAdminNavSettingsContext } from '@/context/admin-nav-settings-context'
import AdminLayoutComponent from '@/layout/admin'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

interface Props {
  seo: Seo
}
const AdminPage: NextPage<Props> = () => {
  const { setActiveNavLink } = useAdminNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(AdminNavLinkEnum.Dashboard)
  }, [setActiveNavLink])

  return (
    <AdminLayoutComponent>
      <>
        <SeoComponent seo={{ title: 'Admin Dashboard', description: 'Admin dashboard' }} />
        <header className="top-header-admin lateral-space">
          <h1 className="main-title ">Admin CMS</h1>
        </header>
        <main className="admin-content">
          <section>
            <div>list of projects</div>
            <div>
              <AddWorkComponent />
            </div>
          </section>
        </main>
      </>
    </AdminLayoutComponent>
  )
}
export default AdminPage
