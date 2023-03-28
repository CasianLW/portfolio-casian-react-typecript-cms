import { FC } from 'react'
import Link from 'next/link'

// import Image, { StaticImageData } from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'

interface ProjectProps {
  classCatagory: string
  //   displayCatagory: string
  linkRef: NavLinkEnum
  title: string
  titleSecondary: string
  imageRef: string
  slug: string
}
const ProjectComponent: FC<ProjectProps> = ({
  classCatagory,
  linkRef,
  imageRef,
  title,
  titleSecondary,
  slug,
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
      {/* <Link className="w-fit" href={getPathFromNavLink(linkRef)}> */}
      <Link className="w-fit" href={`${NavLinkEnum.Works}/${slug}`}>
        {/* <a className="md:order-1">About</a> */}
        <div className="absolute ml-[12%] text-left -top-8 sm:-top-1">
          <h2 className="text-4xl font-semibold line-clamp-1">{title}</h2>
          <h3 className="text-xs md:text-lg line-clamp-1">{titleSecondary}</h3>
        </div>
        {imageRef && (
          <CldImage
            priority={true}
            className="stack-item w-full"
            width="600"
            height="600"
            src={imageRef}
            alt={title}
            sizes="(min-width: 1280px) 480px, (min-width: 1024px) 382px, (min-width: 768px) 285px, calc(100vw - 48px - 60px)"
          />
        )}
        {/* <Image
          priority={true}
          width={500}
          height={500}
          className="w-[80vw]"
          src={imageRef}
          alt={`${title} art work`}
          // loading="lazy"
          sizes="(max-width: 640px) 340px,(min-width: 640px) 340px, (min-width: 1024px) 64px, (min-width: 1289px) 746px, (min-width: 1744px) 896px"
        ></Image> */}
      </Link>
    </motion.div>
  )
}

export default ProjectComponent
