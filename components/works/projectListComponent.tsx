import { FC } from 'react'
import Link from 'next/link'

import Image, { StaticImageData } from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { motion } from 'framer-motion'

interface ProjectProps {
  classCatagory: string
  //   displayCatagory: string
  linkRef: NavLinkEnum
  title: string
  titleSecondary: string
  imageRef: string | StaticImageData
}
const ProjectComponent: FC<ProjectProps> = ({
  classCatagory,
  linkRef,
  imageRef,
  title,
  titleSecondary,
  //   displayCatagory,
}) => {
  return (
    <motion.div
      //   transition={{ duration: 0.4 }}
      layout
      id={classCatagory}
      className={`${classCatagory} relative w-4/5 mt-8 m-auto sm:w-1/2 sm:p-10 lg:w-1/3  `}
      // style={{ display: displayCatagory }}
    >
      <Link className="w-fit" href={getPathFromNavLink(linkRef)}>
        {/* <a className="md:order-1">About</a> */}
        <div className="absolute ml-[12%] text-left -top-8 sm:-top-1">
          <h2 className="text-4xl font-semibold line-clamp-1">{title}</h2>
          <h3 className="text-xs md:text-lg line-clamp-1">{titleSecondary}</h3>
        </div>
        <Image width={500} height={500} className="w-[80vw]" src={imageRef} alt={title}></Image>
      </Link>
    </motion.div>
  )
}

export default ProjectComponent
