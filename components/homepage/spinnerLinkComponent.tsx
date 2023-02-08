import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { homepageMobileApps } from '@/assets/homepage'

const TextSpinnerComponent: FC = () => (
  <section className="bg-cwr-blue-400 pt-8 text-center text-white">
    <div className="fixed left-[70%] top-[70%]">
      <div>
        <LinkSpinnerComponent
          degValue={0}
          linkRef={NavLinkEnum.About}
          title={'About'}
          titleSecondary={'Behind casian.fr'}
        />
        <LinkSpinnerComponent
          degValue={90}
          linkRef={NavLinkEnum.Works}
          title={'Works'}
          titleSecondary={'Quelques projets '}
        />
        <LinkSpinnerComponent
          degValue={180}
          linkRef={NavLinkEnum.Services}
          title={'Services'}
          titleSecondary={'Comment puis-je vous aider?'}
        />
        <LinkSpinnerComponent
          degValue={270}
          linkRef={NavLinkEnum.Contact}
          title={'Contact'}
          titleSecondary={'Travaillons ensemble !'}
        />
      </div>
    </div>
  </section>
)

export default TextSpinnerComponent

interface LinkProps {
  degValue: number
  linkRef: NavLinkEnum
  title: string
  titleSecondary: string
}
const LinkSpinnerComponent: FC<LinkProps> = ({ degValue, linkRef, title, titleSecondary }) => {
  return (
    <div className={`link-translate-z translate-x-${degValue}`}>
      <Link className="w-fit" href={getPathFromNavLink(linkRef)}>
        ${title}
      </Link>
      <Link className="w-fit" href={getPathFromNavLink(linkRef)}>
        ${titleSecondary}
      </Link>
    </div>
  )
}
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
