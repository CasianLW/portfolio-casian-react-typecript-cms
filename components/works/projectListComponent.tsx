import { FC, useEffect, WheelEvent, TouchEvent, useRef, useState } from 'react'
import Link from 'next/link'

import { useNavSettingsContext } from '@/context/nav-settings-context'

import { logoCasianBlanc } from '@/assets/shared'
import Image from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { homepageMobileApps } from '@/assets/homepage'
import { GetTransformX } from '@/utils/scroll-touchmove'
import { workCWRimg } from '@/assets/works'

const ProjectListComponent: FC = () => {
  return (
    <section className="bg-cwr-blue-400 pt-8 text-center text-white">
      <ProjectComponent
        classCatagory={'crea all uxui'}
        linkRef={NavLinkEnum.Works}
        title={''}
        titleSecondary={''}
        imageRef={''}
      />
    </section>
  )
}

export default ProjectListComponent

interface ProjectProps {
  classCatagory: string
  linkRef: NavLinkEnum
  title: string
  titleSecondary: string
  imageRef: string
}
const ProjectComponent: FC<ProjectProps> = ({ classCatagory, linkRef, imageRef, title, titleSecondary }) => {
  return (
    <div id="cut" className={`${classCatagory} row  `}>
      <Link className="banner w-fit" href={getPathFromNavLink(linkRef)}>
        {/* <a className="md:order-1">About</a> */}
        <Image className="w-[80vw]" src={imageRef} alt={title}></Image>
        <div className="heading">
          <h2>{title}</h2>
          <h3>{titleSecondary}</h3>
        </div>
      </Link>
    </div>
  )
}
