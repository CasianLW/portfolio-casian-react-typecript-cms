import { FC } from 'react'
import Link from 'next/link'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { GetTransformX } from '@/utils/scroll-touchmove'

const TextSpinnerComponent: FC = () => {
  const transformRate = GetTransformX(0)
  return (
    <section>
      <div className="fixed left-[20%] top-[70%] z-10 ">
        <div style={{ transform: `rotateX(${transformRate}deg)` }} className="link-box w-[200px] h-[100px]">
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
}

export default TextSpinnerComponent

interface LinkProps {
  degValue: number
  linkRef: NavLinkEnum
  title: string
  titleSecondary: string
}
const LinkSpinnerComponent: FC<LinkProps> = ({ degValue, linkRef, title, titleSecondary }) => {
  return (
    <div
      style={{ transform: `rotateX(${degValue}deg) translateZ(40px)` }}
      className={`link-translate-z flex items-center justify-center flex-col z-10 text-left fixed`}
    >
      <Link className="mr-auto text-3xl" href={getPathFromNavLink(linkRef)}>
        {title}
      </Link>
      <Link className="mr-auto" href={getPathFromNavLink(linkRef)}>
        {titleSecondary}
      </Link>
    </div>
  )
}
