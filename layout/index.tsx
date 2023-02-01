import { FC } from 'react'
// import FooterComponent from '../footer'
// import NavComponent from '../nav'

import { NavSettingsProvider } from '@/context/nav-settings-context'
import NavComponent from '@/components/nav'

interface Props {
  children: JSX.Element
}

const LayoutComponent: FC<Props> = ({ children }) => {
  return (
    <>
      <NavSettingsProvider>
        <NavComponent />
        {children}
      </NavSettingsProvider>
      {/* <FooterComponent /> */}
    </>
  )
}

export default LayoutComponent
