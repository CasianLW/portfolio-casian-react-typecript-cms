import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { useNavSettingsContext } from '@/context/nav-settings-context'

import { logoCasianBlanc } from '@/assets/shared'
import Image from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { homepageMobileApps } from '@/assets/homepage'

const SliderComponent: FC = () => (
  <section className="bg-cwr-blue-400 pt-8 text-center text-white">
    <div className="p-ctnr grid gap-16 !py-10 text-left">
      <Image
        className="m-auto w-2/6 md:w-1/6"
        src={homepageMobileApps}
        alt="image applications mobiles casian.fr"
      ></Image>
      <ul className="grid gap-4 text-sm md:grid-cols-4 md:text-xl lg:gap-x-8">
        <Link href={getPathFromNavLink(NavLinkEnum.About)}>
          <a className="md:order-1">About</a>
        </Link>
      </ul>
      <ul className="grid gap-4 border-t-[1px] border-white pt-10 text-xs md:grid-cols-4 md:text-sm">
        <p>©2022 CWR</p>
        <Link href={getPathFromNavLink(NavLinkEnum.DonneesPersonnelles)}>
          <a>Données personnelles</a>
        </Link>
        <Link href={getPathFromNavLink(NavLinkEnum.MentionsLegales)}>
          <a>Mentions légales</a>
        </Link>
      </ul>
    </div>
  </section>
)

export default SliderComponent

// const navLinks = [
//   {
//     navLink: NavLinkEnum.Home,
//     supplementaryClasses: 'lg:ml-auto delay-[100ms]',
//   },
//   {
//     navLink: NavLinkEnum.About,
//     supplementaryClasses: 'delay-[200ms]',
//   },
//   {
//     navLink: NavLinkEnum.Works,
//     supplementaryClasses: 'delay-[300ms]',
//   },
//   {
//     navLink: NavLinkEnum.Contact,
//     supplementaryClasses: 'lg:ml-auto delay-[400ms]',
//   },
// ]

// interface NavLinkComponentProp {
//   href: string
//   navLink: NavLinkEnum
//   supplentaryClasses: string
//   img?: string
// }
// const NavLinkComponent: FC<NavLinkComponentProp> = ({ href, supplentaryClasses, navLink, img }) => {
//   const { navIsClosed, setNavIsClosed, activeNavLink } = useNavSettingsContext()

//   return (
//     <Link
//       href={href}
//       className={
//         'z-0 text-[44px] font-semibold no-underline transition-all lg:translate-x-0 lg:text-[20px] lg:font-normal' +
//         ` ${supplentaryClasses} ${navIsClosed && !img ? 'translate-x-[100vw]' : 'translate-x-0'}
//                     ${activeNavLink === navLink && 'link-active'}`
//       }
//       //   ${activeNavLink === NavLinkEnum.Contact && 'link-special'}
//       //   ${activeNavLink === NavLinkEnum.Works && 'link-special'}
//       onClick={() => setNavIsClosed(true)}
//     >
//       {img ? <Image className="max-w-[200%] " src={img} alt="${img}" /> : navLink}
//     </Link>
//   )
// }
