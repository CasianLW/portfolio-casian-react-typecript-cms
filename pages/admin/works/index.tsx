import { Seo } from '@/cas-types'
import AddWorkComponent from '@/components/admin/works/addWorkComponent'
import ListWorkComponent from '@/components/admin/works/listWorkComponent'
import AdminNavComponent, { AdminNavLinkEnum } from '@/components/nav/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useAdminNavSettingsContext } from '@/context/admin-nav-settings-context'
import AdminLayoutComponent from '@/layout/admin'
import { NextPage } from 'next'
import { useEffect } from 'react'

interface Props {
  seo: Seo
}

const WorksCMS: NextPage<Props> = () => {
  const { setActiveNavLink } = useAdminNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(AdminNavLinkEnum.Works)
  }, [setActiveNavLink])

  return (
    <AdminLayoutComponent>
      <>
        <SeoComponent seo={{ title: 'Works CMS', description: 'Works: Ajouter, modifier et supprimer' }} />
        <header>
          <h1 className="main-title">WorksCMS</h1>
        </header>
        <main className="admin-content">
          <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="col-span-1">
              <ListWorkComponent />
            </div>
            <div className="col-span-1">
              <AddWorkComponent />
            </div>
          </section>
        </main>
      </>
    </AdminLayoutComponent>
  )
}

export default WorksCMS
