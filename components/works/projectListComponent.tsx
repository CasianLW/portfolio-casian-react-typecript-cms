import { FC, useEffect, WheelEvent, TouchEvent, useRef, useState, useContext } from 'react'
import Link from 'next/link'

import Image, { StaticImageData } from 'next/image'
import { getPathFromNavLink, NavLinkEnum } from '../nav'
import { workCWRimg } from '@/assets/works'
import ProjectFilterComponent from './projectFilterComponent'

const ProjectListComponent: FC = () => {
  //   const filterData = GetFilterData()

  return (
    <section className="bg-cwr-blue-400 pt-8 text-center w-4/5 m-auto text-white sm:flex sm:flex-wrap ">
      <ProjectComponent
        classCatagory={'dev all'}
        linkRef={NavLinkEnum.Works}
        title={'CWR'}
        titleSecondary={'Dev & Design website cwr'}
        imageRef={workCWRimg}
        // displayCatagory={}
      />
      <ProjectComponent
        classCatagory={'dev all'}
        linkRef={NavLinkEnum.Works}
        title={'CWR'}
        titleSecondary={'Dev & Design website cwr'}
        imageRef={workCWRimg}
        // displayCatagory={}
      />
      <ProjectComponent
        classCatagory={'dev all'}
        linkRef={NavLinkEnum.Works}
        title={'CWR'}
        titleSecondary={'Dev & Design website cwr'}
        imageRef={workCWRimg}
        // displayCatagory={}
      />
      <ProjectComponent
        classCatagory={'dev all'}
        linkRef={NavLinkEnum.Works}
        title={'CWR'}
        titleSecondary={'Dev & Design website cwr'}
        imageRef={workCWRimg}
        // displayCatagory={}
      />
    </section>
  )
}

export default ProjectListComponent

interface ProjectProps {
  classCatagory: string
  //   displayCatagory: string
  linkRef: NavLinkEnum
  title: string
  titleSecondary: string
  imageRef: StaticImageData
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
    <div
      id={classCatagory}
      className={`${classCatagory} relative w-4/5 mt-8 m-auto sm:w-1/2 sm:p-10 lg:w-1/3  `}
      // style={{ display: displayCatagory }}
    >
      <Link className="w-fit" href={getPathFromNavLink(linkRef)}>
        {/* <a className="md:order-1">About</a> */}
        <div className="absolute ml-[12%] text-left -top-8">
          <h2 className="text-4xl font-semibold">{title}</h2>
          <h3 className="text-xs">{titleSecondary}</h3>
        </div>
        <Image className="w-[80vw]" src={imageRef} alt={title}></Image>
      </Link>
    </div>
  )
}
