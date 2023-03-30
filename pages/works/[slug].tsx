import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
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

const getWorkInfo = async (slug: string): Promise<Project | null> => {
  try {
    const response = await fetch(`${process.env.URL}/api/works/${slug}`, {
      method: 'GET',
    })
    const data = await response.json()

    if (response.ok) {
      const project = data.project as Project
      return project
    }
    throw new Error('Failed to get project')
  } catch (error: any) {
    console.log(error)
    return null
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params
  const project = await getWorkInfo(slug)

  return {
    props: {
      project,
      slug,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const projectsSlugs = getProjectsSlugs()

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
  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Page projet</h1>
      <h2>{project.title ?? ''}</h2>
    </>
  )
}

export default ProjectPage
