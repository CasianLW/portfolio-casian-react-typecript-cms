import { FC } from 'react'

import { AdminNavSettingsProvider } from '@/context/admin-nav-settings-context'
import AdminNavComponent from '@/components/nav/admin'

interface Props {
  children: JSX.Element
}

const AdminLayoutComponent: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="block lg:flex top-header lateral-space ">
        <AdminNavSettingsProvider>
          <div className="w-full md:w-[20%]">
            <AdminNavComponent />
          </div>
          <div className="w-full">{children}</div>
        </AdminNavSettingsProvider>
      </div>
    </>
  )
}

export default AdminLayoutComponent
