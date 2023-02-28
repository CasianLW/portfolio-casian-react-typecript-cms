import { FC, useEffect, WheelEvent, TouchEvent, useRef, useState } from 'react'
import Link from 'next/link'

import { useNavSettingsContext } from '@/context/nav-settings-context'

import { logoCasianBlanc } from '@/assets/shared'
import Image from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { homepageMobileApps } from '@/assets/homepage'
import { GetTransformX } from '@/utils/scroll-touchmove'

const SliderComponent: FC = () => {
  return (
    <section className="bg-cwr-blue-400 pt-8 text-center text-white">
      <div className="fixed top-[30%] left-[10%] w-[80%] h-[300px] overflow-hidden z-0">
        <div className="absolute top-0 left-0 h-full w-[2000px] flex will-change-transform">
          <SliderItemComponent />
          <SliderItemComponent />
          <SliderItemComponent />
          <SliderItemComponent />
          <SliderItemComponent />
          <SliderItemComponent />
        </div>
      </div>
    </section>
  )
}

export default SliderComponent

const SliderItemComponent: FC = () => {
  const translateX = GetTransformX(-200)
  return (
    <div style={{ transform: `translateX(${translateX}px)` }} className="slider-item flex-1 overflow-hidden w-[50px] ">
      <div className="relative left-[1%] top-[2.5%] w-[98%] h-[95%] flex">
        <Link className="w-fit" href={getPathFromNavLink(NavLinkEnum.Works)}>
          {/* <a className="md:order-1">About</a> */}
          <Image
            priority={true}
            className="w-[80vw]"
            src={homepageMobileApps}
            alt="image applications mobiles casian.fr"
          ></Image>
        </Link>
      </div>
    </div>
  )
}
