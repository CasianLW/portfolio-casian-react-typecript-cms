import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { useAdminNavSettingsContext } from '@/context/admin-nav-settings-context'

import { logoCasianBlanc } from '@/assets/shared'
import Image from 'next/image'
import BurgerComponent from './burger-component'

export enum AdminNavLinkEnum {
  Dashboard = 'Dashboard',
  Works = 'Works',
  Services = 'Services',
  General = 'General',
  Homepage = 'Homepage',
}
export const getPathFromNavLink: (navLink: AdminNavLinkEnum) => string = (navLink: AdminNavLinkEnum) => {
  switch (navLink) {
    case AdminNavLinkEnum.Dashboard:
      return '/admin/'
    case AdminNavLinkEnum.Works:
      return '/admin/works/'
    case AdminNavLinkEnum.Services:
      return '/admin/services/'
    case AdminNavLinkEnum.General:
      return '/admin/general/'
    case AdminNavLinkEnum.Homepage:
      return '/admin/homepage/'
  }
}

const AdminNavComponent: FC = () => {
  const { navIsClosed, setNavIsClosed, closing } = useAdminNavSettingsContext()
  const navRef = useRef<HTMLDetailsElement>(null)

  const [linksAreVisible, setLinksAreVisible] = useState(true)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const mediaQuery = 'screen and (min-width: 1024px)'
    const handleMatchMedia = () => {
      setNavIsClosed(true)

      setLinksAreVisible(false)

      window.setTimeout(() => setLinksAreVisible(true), 800)
    }

    try {
      window.matchMedia(mediaQuery).addEventListener('change', handleMatchMedia)
    } catch (error) {
      window.matchMedia(mediaQuery).addListener(handleMatchMedia)
    }
  }, [setNavIsClosed])

  useEffect(() => {
    if (!navRef.current || window === undefined) return
    const nav = navRef.current

    let timeOut
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1000)
    }
    handleResize()
    // Add event listener to resize
    window.addEventListener('resize', handleResize)

    if (navIsClosed && !closing) {
      timeOut = window.setTimeout(() => {
        nav.style.height = isLargeScreen ? '50vh' : '80px'
      }, 800)
    }

    if (closing || !navIsClosed) {
      nav.style.height = 'auto'
      window.clearTimeout(timeOut)
    }
  }, [closing, navIsClosed, isLargeScreen])

  return (
    <nav
      className={
        'lg:border-r lg:h-[50vh] mb-20 overflow-x-clip  z-50 inline-grid content-start justify-items-start gap-4   before:bg-cas-black-400 before:transition-all lg:bottom-[initial] lg:gap-10 lg:pr-14 lg:mr-14 lg:before:hidden ' +
        `${navIsClosed ? '  before:translate-x-full before:delay-[500ms] before:rounded-l-[48%]' : ' '}`
      }
      ref={navRef}
    >
      <AdminNavLinkComponent
        img={'Admin CMS'}
        href={'/admin'}
        navLink={AdminNavLinkEnum.Dashboard}
        supplentaryClasses={'before:!content-[""] block  lg:static lg:my-auto lg:mr-auto lg:w-[200%]'}
      />

      <BurgerComponent />

      {linksAreVisible &&
        navLinks.map((link, i) => {
          const { navLink, supplementaryClasses } = link
          const href = getPathFromNavLink(navLink)

          return (
            <AdminNavLinkComponent key={i} navLink={navLink} href={href} supplentaryClasses={supplementaryClasses} />
          )
        })}
    </nav>
  )
}

export default AdminNavComponent

const navLinks = [
  {
    navLink: AdminNavLinkEnum.General,
    supplementaryClasses: 'lg:ml-auto delay-[100ms]',
  },
  {
    navLink: AdminNavLinkEnum.Homepage,
    supplementaryClasses: 'delay-[200ms]',
  },
  {
    navLink: AdminNavLinkEnum.Works,
    supplementaryClasses: 'delay-[300ms]',
  },
  {
    navLink: AdminNavLinkEnum.Services,
    supplementaryClasses: 'delay-[400ms]',
  },
  {
    navLink: AdminNavLinkEnum.Dashboard,
    supplementaryClasses: 'lg:ml-auto delay-[500ms]',
  },
]

interface AdminNavLinkComponentProp {
  href: string
  navLink: AdminNavLinkEnum
  supplentaryClasses: string
  img?: string
}
const AdminNavLinkComponent: FC<AdminNavLinkComponentProp> = ({ href, supplentaryClasses, navLink, img }) => {
  const { navIsClosed, setNavIsClosed, activeNavLink } = useAdminNavSettingsContext()

  return (
    <Link
      href={href}
      className={
        "z-0 text-[20px] before:content-['⚙'] w-full font-semibold no-underline transition-all lg:translate-x-0 lg:text-[20px] lg:font-normal" +
        ` ${supplentaryClasses} ${navIsClosed && !img ? 'translate-x-[100vw] ' : 'translate-x-0'} ${
          img ? '  lg:text-[32px] text-[32px] font-bold' : ''
        } 
                    ${activeNavLink === navLink && 'link-active'}`
      }
      //   ${activeNavLink === AdminNavLinkEnum.Contact && 'link-special'}
      //   ${activeNavLink === AdminNavLinkEnum.Works && 'link-special'}
      onClick={() => setNavIsClosed(true)}
    >
      {img ? <p className="w-full">{img}</p> : navLink}
    </Link>
  )
}
