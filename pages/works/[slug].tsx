import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
// import Image from 'next/future/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'

import { ParsedUrlQuery } from 'querystring'
import { Project } from '@/cas-types'
import { getProjectByFileName, getProjectsSlugs } from '@/utils/content-api'
import SeoComponent from '@/components/shared/seo-component'

interface Props {
  project: Project
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params

  const project = getProjectByFileName(`${slug}.json`)

  project.slug = slug

  return {
    props: {
      project,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  //only get the slug from works
  const projectsSlugs = getProjectsSlugs()

  // map through to return work paths
  const paths = projectsSlugs.map((slug) => ({
    params: {
      slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

const ProjectPage: NextPage<Props> = ({ project }) => {
  //   const { setActiveNavLink } = useNavSettingsContext()

  //   useEffect(() => {
  //     setActiveNavLink(NavLinkEnum.Projects)
  //   }, [setActiveNavLink])

  return (
    <>
      <SeoComponent seo={project.seo} />

      <h1>Page projet</h1>
    </>
  )
}

export default ProjectPage
