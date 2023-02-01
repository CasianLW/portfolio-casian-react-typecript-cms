import { useEffect, useState } from 'react'

interface WindowSize {
  windowWidth: number | undefined
  windowHeight: number | undefined
}
interface Breakpoints {
  start?: boolean
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
  xxl?: boolean
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: undefined,
    windowHeight: undefined,
  })
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    start: true,
  })

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      setWindowSize({
        windowWidth,
        windowHeight,
      })

      if (windowWidth < 640) setBreakpoints({ start: true })
      if (windowWidth >= 640 && windowWidth < 768) setBreakpoints({ start: true, sm: true })
      if (windowWidth >= 768 && windowWidth < 1024) setBreakpoints({ start: true, sm: true, md: true })
      if (windowWidth >= 1024 && windowWidth < 1280) setBreakpoints({ start: true, sm: true, md: true, lg: true })
      if (windowWidth >= 1280 && windowWidth < 1536)
        setBreakpoints({ start: true, sm: true, md: true, lg: true, xl: true })
      if (windowWidth >= 1536) setBreakpoints({ start: true, sm: true, md: true, lg: true, xl: true, xxl: true })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { windowSize, breakpoints }
}

// https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
// https://newbedev.com/how-to-get-a-react-component-s-size-height-width-before-render
// https://dev.to/anxinyang/easy-lazy-loading-with-react-intersection-observer-api-1dll
