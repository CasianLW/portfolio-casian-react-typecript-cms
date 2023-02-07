import { FC, useEffect, WheelEvent, TouchEvent, useRef, useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { homepageMobileApps } from '@/assets/homepage'

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
  const [translateX, setTranslateX] = useState(-200)
  const [previousTouchY, setpreviousTouchY] = useState(0)
  const [previousTouchX, setpreviousTouchX] = useState(0)
  useEffect(() => {
    // touch up or down
    const degChoisiWeb = 10
    const degChoisiMobile = 5
    const sliderPourcentx = 2
    var mouvementStepCounter = -405

    // let previousTouchY = 0
    setpreviousTouchY(previousTouchY)
    const handleScroll = (event: WheelEvent | TouchEvent) => {
      if (event.type === 'wheel') {
        if (event.deltaY > 0) {
          console.log('Scrolling down...')
          setTranslateX(translateX - degChoisiWeb)
        } else {
          console.log('Scrolling up...')
          setTranslateX(translateX + degChoisiWeb)
        }
      } else if (event.type === 'touchmove') {
        const currentTouchY = event.touches[0].clientY - 20
        const currentTouchX = event.touches[0].clientX - 20
        console.log(currentTouchY)
        console.log(currentTouchX)
        if (previousTouchY < currentTouchY || previousTouchX < currentTouchX) {
          console.log('Touching down...')
          setTranslateX(translateX + degChoisiMobile)
        } else {
          console.log('Touching up...')
          setTranslateX(translateX - degChoisiMobile)
        }
        setpreviousTouchY(currentTouchY)
        setpreviousTouchX(currentTouchX)
      }
    }
    window.addEventListener('wheel', handleScroll)
    window.addEventListener('touchmove', handleScroll)
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [translateX, previousTouchY, previousTouchX])
  return (
    <div style={{ transform: `translateX(${translateX}px)` }} className="slider-item flex-1 overflow-hidden w-[50px] ">
      <div className="relative left-[1%] top-[2.5%] w-[98%] h-[95%] flex">
        <Link className="w-fit" href={getPathFromNavLink(NavLinkEnum.Works)}>
          {/* <a className="md:order-1">About</a> */}
          <Image className="w-[80vw]" src={homepageMobileApps} alt="image applications mobiles casian.fr"></Image>
        </Link>
      </div>
    </div>
  )
}
