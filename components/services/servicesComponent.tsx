import { logoCasianBlanc, showMoreArrows } from '@/assets/shared'
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'

interface ServicesProps {
  title: string
  description: string
  activePrice: boolean
  coverImage: string
  price: string
  pointList: Array<string>
}
const ServicesComponent: FC<ServicesProps> = ({ title, description, pointList, price, activePrice, coverImage }) => {
  const [activeIndex, setActiveIndex] = useState(false)
  const wordList = title.split(' ')
  const designWork = wordList[0]
  {
    /* const words = titleString.split(" ") */
  }

  const handleClick = () => {
    setActiveIndex(!activeIndex)
    console.log(activeIndex)
  }
  return (
    <div className="bg-cas-white-100 text-cas-black-600 p-2 rounded-[32px] h-fit w-full md:w-[30%] ">
      <div className="grid rounded-3xl overflow-clip h-40">
        <Image width={300} height={40} className="stack-item w-full" src={coverImage} alt={title}></Image>
        <div className="stack-item pt-20 pl-3 font-semibold leading-8 text-[44px] capitalize text-white">
          # <br />
          {designWork}
        </div>
      </div>
      <h2 className="text-center py-4 text-xl font-semibold">{title}</h2>
      <p className="py-4 px-6 ">{description}</p>

      <div className="border-t border-cas-black-600 py-4 mx-6">
        {pointList.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </div>
      {activePrice ? (
        <h3 className="text-center font-semibold text-3xl  ">
          <span className="text-xl font-medium">Dés </span>
          {price}
        </h3>
      ) : (
        ''
      )}
      <motion.button
        data-activeIndex={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1 }}
        className="w-full bg-cas-black-600 bg-opacity-20 hover:bg-opacity-100 text-cas-black-600 hover:text-cas-white-100 p-3 mt-4 rounded-3xl"
      >
        Contact me
      </motion.button>
    </div>
  )
}
export default ServicesComponent
