import { useEffect, useState } from 'react'

export const GetTransformX = (start: number) => {
  const [translateX, setTranslateX] = useState(start)
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
        const currentTouchY = event.touches[0].clientY - 30
        const currentTouchX = event.touches[0].clientX - 30
        // console.log(currentTouchY)
        // console.log(currentTouchX)
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

  return translateX
}
