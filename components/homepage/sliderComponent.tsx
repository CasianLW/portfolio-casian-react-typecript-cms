import { FC } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { homepageMobileApps, yourWorkHere } from '@/assets/homepage'
import { GetTransformX } from '@/utils/scroll-touchmove'
import React from 'react'

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
          <SliderItemComponent />
          <SliderItemComponent />
          <SliderNextWorkComponent />
        </div>
      </div>
    </section>
  )
}

export default SliderComponent

const SliderItemComponent: FC = () => {
  // const translateX = GetTransformX(-200)
  const maxTranslateX = 0 // set your maximum value here
  const minTranslateX = -1670 // set your negative minimum value here
  const translateX = Math.min(Math.max(GetTransformX(-200), minTranslateX), maxTranslateX)
  return (
    <div
      style={{ transform: `translateX(${translateX}px)` }}
      className="slider-item flex-1 overflow-hidden w-[50px] min-w-[310px] h-fit  sm:px-2"
    >
      <div className="relative left-[1%] top-[2.5%] w-[98%] h-[95%] flex">
        <Link className="w-fit grid homepage-work-link" href={getPathFromNavLink(NavLinkEnum.Works)}>
          <div className="stack-item z-10 mb-2 self-end translate-y-10 voir-plus-work transition-transform">
            <p>Voir plus</p>
          </div>
          <Image
            priority={true}
            className="w-[80vw] rounded-[32px] stack-item"
            src={homepageMobileApps}
            alt="image applications mobiles casian.fr"
          ></Image>
        </Link>
      </div>
    </div>
  )
}

const SliderNextWorkComponent: FC = () => {
  // const translateX = GetTransformX(-200)
  const maxTranslateX = 0 // set your maximum value here
  const minTranslateX = -1670 // set your negative minimum value here
  const translateX = Math.min(Math.max(GetTransformX(-200), minTranslateX), maxTranslateX)
  return (
    <div
      style={{ transform: `translateX(${translateX}px)` }}
      className="slider-item flex-1 overflow-hidden w-[50px] min-w-[310px] h-fit "
    >
      <div className="relative left-[1%] top-[2.5%] w-[98%] flex flex-col h-full">
        <Link className="w-fit grid homepage-card-animation" href={getPathFromNavLink(NavLinkEnum.Contact)}>
          <div className="stack-item self-center">
            <h3 className=" ml-auto text-xl mr-2 text-right">Your work next?</h3>
          </div>
          <Image
            priority={true}
            className="w-[80vw] rounded-[32px] stack-item"
            src={yourWorkHere}
            alt={'image your next work here?'}
          ></Image>
        </Link>
      </div>
    </div>
  )
}
