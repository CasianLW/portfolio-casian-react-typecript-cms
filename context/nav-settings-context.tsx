import { FC, createContext, useContext, useState } from 'react'
import { NavLinkEnum } from '@/components/nav'

export type NavSettings = {
  navIsClosed: boolean
  setNavIsClosed: (b: boolean) => void
  activeNavLink: NavLinkEnum | null
  setActiveNavLink: (nl: NavLinkEnum | null) => void
  closing: boolean
  setClosing: (b: boolean) => void
}

export const NavSettingsContext = createContext<NavSettings>({
  navIsClosed: true,
  setNavIsClosed: () => undefined,
  activeNavLink: null,
  setActiveNavLink: () => undefined,
  closing: true,
  setClosing: () => undefined,
})

export const useNavSettingsContext = () => useContext(NavSettingsContext)
interface NavSettingsProviderProps {
  children: JSX.Element[]
}
export const NavSettingsProvider: FC<NavSettingsProviderProps> = ({ children }) => {
  const [navIsClosed, setNavIsClosed] = useState(true)
  const [activeNavLink, setActiveNavLink] = useState<NavLinkEnum | null>(null)
  const [closing, setClosing] = useState(false)

  return (
    <NavSettingsContext.Provider
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
    </NavSettingsContext.Provider>
  )
}
