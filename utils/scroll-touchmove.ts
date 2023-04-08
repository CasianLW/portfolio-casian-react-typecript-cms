import { useEffect, useState } from 'react'

export const GetTransformX = (start: number) => {
  const [translateX, setTranslateX] = useState(start)
  const [previousTouchY, setpreviousTouchY] = useState(0)
  const [previousTouchX, setpreviousTouchX] = useState(0)

  useEffect(() => {
    // touch up or down
    const degChoisiWeb = 10
    const degChoisiMobile = 15
    const sensibilityMobile = 10
    const sliderPourcentx = 2
    var mouvementStepCounter = -405

    const handleScroll = (event: WheelEvent | TouchEvent) => {
      if (event.type === 'wheel') {
        const deltaY = (event as WheelEvent).deltaY
        if (deltaY && deltaY > 0) {
          // console.log('Scrolling down...')
          setTranslateX(translateX - degChoisiWeb)
        } else {
          // console.log('Scrolling up...')
          setTranslateX(translateX + degChoisiWeb)
        }
      } else if (event.type === 'touchmove') {
        const touchEvent = event as TouchEvent
        const currentTouchY = touchEvent.touches[0]?.clientY - sensibilityMobile
        const currentTouchX = touchEvent.touches[0]?.clientX - sensibilityMobile
        if (previousTouchY < currentTouchY || previousTouchX < currentTouchX) {
          // console.log('Touching down...')
          setTranslateX(translateX + degChoisiMobile)
        } else {
          // console.log('Touching up...')
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

  return translateX
}
