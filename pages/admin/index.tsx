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
    <AdminLayoutComponent session={null}>
      <>
        <SeoComponent seo={{ title: 'Admin Dashboard', description: 'Admin dashboard' }} />
        <header className="">
          <h1 className="main-title ">Dashboard</h1>
        </header>
        <main className="admin-content">
          <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="col-span-1">
              <div className="w-full h-[200px] rounded-2xl bg-cas-gradient-rose">
                Welcome to Admin pannel <br /> Visitors nr this week/month/year/ :{' '}
              </div>
            </div>
            <div className="col-span-1">
              <div className="w-full h-[200px] rounded-2xl bg-cas-gradient-rose">
                Other stats: <br /> Works number : <br /> Services number: <br /> Build status/remaining/counter
              </div>
            </div>
            <div className="col-span-1">how to use Works</div>
            <div className="col-span-1">how to use Services</div>
            <div className="col-span-1">how to use General</div>
            <div className="col-span-1">how to use General</div>
          </section>
        </main>
      </>
    </AdminLayoutComponent>
  )
}
export default AdminPage
