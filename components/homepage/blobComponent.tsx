import React, { FC, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const BlobComponent: FC = () => {
  const [randomNum, setRandomNum] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomNum(Math.floor(Math.random() * 66 + 5))
    }, 2000)
    console.log(intervalId)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <motion.div
      style={{ backgroundImage: 'linear-gradient(45deg, #a8c5de 0%, #c79dde 100%)' }}
      className="h-[24px] md:h-[52px] w-[24px] md:w-[52px] bg-white absolute z-10 top-[28%] left-[15%]"
      initial={{
        borderTopLeftRadius: `${randomNum}%`,
        borderTopRightRadius: `${randomNum + 15}%`,
        borderBottomLeftRadius: `${randomNum + 10}%`,
        borderBottomRightRadius: `${randomNum + 17}%`,
      }}
      animate={{
        // scale: [1, 2, 2, 1, 1],
        // rotate: [0, randomNum, randomNum, 0],
        borderTopLeftRadius: `${randomNum + 15}%`,
        borderTopRightRadius: `${randomNum + 30}%`,
        borderBottomLeftRadius: `${randomNum + 20}%`,
        borderBottomRightRadius: `${randomNum + 35}%`,
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  )
}
export default BlobComponent

// <svg xmlns="http://www.w3.org/2000/svg" width="736.564" height="691.702" viewBox="79.505 127.375 736.564 691.702"><defs><clipPath id="a"><path fill="currentColor" d="M758.5 635.5Q656 771 476.5 811.5T154 676Q11 500 142.5 304t345-174.5Q701 151 781 325.5t-22.5 310Z"/></clipPath></defs><g clip-path="url(#a)"><path fill="#444cf7" d="M758.5 635.5Q656 771 476.5 811.5T154 676Q11 500 142.5 304t345-174.5Q701 151 781 325.5t-22.5 310Z"/></g></svg>
