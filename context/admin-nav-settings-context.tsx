import { FC, createContext, useContext, useState } from 'react'
import { AdminNavLinkEnum } from '@/components/nav/admin'

export type AdminNavSettings = {
  navIsClosed: boolean
  setNavIsClosed: (b: boolean) => void
  activeNavLink: AdminNavLinkEnum | null
  setActiveNavLink: (nl: AdminNavLinkEnum | null) => void
  closing: boolean
  setClosing: (b: boolean) => void
}

export const AdminNavSettingsContext = createContext<AdminNavSettings>({
  navIsClosed: true,
  setNavIsClosed: () => undefined,
  activeNavLink: null,
  setActiveNavLink: () => undefined,
  closing: true,
  setClosing: () => undefined,
})

export const useAdminNavSettingsContext = () => useContext(AdminNavSettingsContext)
interface AdminNavSettingsProviderProps {
  children: JSX.Element[]
}
export const AdminNavSettingsProvider: FC<AdminNavSettingsProviderProps> = ({ children }) => {
  const [navIsClosed, setNavIsClosed] = useState(true)
  const [activeNavLink, setActiveNavLink] = useState<AdminNavLinkEnum | null>(null)
  const [closing, setClosing] = useState(false)
  // console.log(navIsClosed)
  // console.log(activeNavLink)

  return (
    <AdminNavSettingsContext.Provider
      value={{
        navIsClosed,
        setNavIsClosed,
        activeNavLink,
        setActiveNavLink,
        closing,
        setClosing,
      }}
    >
      {children}
    </AdminNavSettingsContext.Provider>
  )
}
