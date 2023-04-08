import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { CldImage } from 'next-cloudinary'

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

  return (
    <div className="bg-cas-white-100 text-cas-black-600 p-2 rounded-[32px] h-fit w-full md:w-[30%] ">
      <div className="grid rounded-3xl overflow-clip h-40">
        {/* <Image
          priority={true}
          width={300}
          height={225}
          className="stack-item w-full"
          src={coverImage}
          alt={title}
        ></Image> */}
        {coverImage && (
          <CldImage
            priority={true}
            className="stack-item w-full"
            width="600"
            height="600"
            src={coverImage}
            alt={title}
            sizes="(min-width: 1280px) 480px, (min-width: 1024px) 382px, (min-width: 768px) 285px, calc(100vw - 48px - 60px)"
          />
        )}
        <div className="stack-item pt-20 pl-3 font-semibold leading-8 text-[44px] capitalize text-white">
          # <br />
          {designWork}
        </div>
      </div>
      <h2 className="text-center py-4 text-xl font-semibold">{title}</h2>
      <p className="py-4 px-6 ">{description}</p>

      <ul className="border-t border-cas-black-600 py-4 mx-6">
        {pointList.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
      {activePrice ? (
        <h3 className="text-center font-semibold text-3xl  ">
          <span className="text-xl font-medium">Dés </span>
          {price}
        </h3>
      ) : (
        ''
      )}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1 }}
        className="w-full bg-cas-black-600 bg-opacity-20 hover:bg-opacity-100 text-cas-black-600 hover:text-cas-white-100 p-3 mt-4 rounded-3xl"
      >
        <Link className="mr-auto" href={getPathFromNavLink(NavLinkEnum.Contact)}>
          Contact me
        </Link>
      </motion.button>
    </div>
  )
}
export default ServicesComponent
