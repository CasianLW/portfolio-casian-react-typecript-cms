import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { FC, useEffect, useState } from 'react'

import { ParsedUrlQuery } from 'querystring'

import { useNavSettingsContext } from '@/context/nav-settings-context'

import { getPathFromNavLink, NavLinkEnum } from '@/components/nav'
import ListePartenaires from '@/components/shared/liste-partenaires'
import InfosFormation, { InfosType } from '@/components/shared/tags-cours'
import { getFormationsSlugs, getFormationByFileName } from '@/utils/content-api'
import { Formation } from '@/cwr-types'
import { getCloudinaryImageUrl } from '@/utils/cloudinary-utils'
import ContactFormComponent from '@/components/contact/contact-form'
import WorkModel from '@/utils/mongodb/work.model'
import { IWork } from '@/@types/work'
import AdminLayoutComponent from '@/layout/admin'
import SeoComponent from '@/components/shared/seo-component'
import handler from '@/pages/api/works'

interface Props {
  work: IWork
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params
  const getWorkInfoBySlug = async (slug: string) => {
    console.log('test du transfer')
    try {
      const response = await fetch(`/api/works/${slug}`, {
        method: 'GET',
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        // Handle success
        // console.log(Array.isArray(worksList) + 'ies it is')
      }
    } catch (error: any) {
      // Handle error
      // console.log(data.message)
    }
  }

  //   const formation = getFormationByFileName(`${slug}.json`)
  const work = getWorkInfoBySlug(slug)

  //   work.slug = slug

  return {
    props: {
      work,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  //only get the slug from works
  //   getWorkInfoBySlug(slug)
  //   const workSlug = getWorkInfoBySlug(slug)

  // map through to return work paths
  //   const paths = workSlug.map((slug) => ({
  //     params: {
  //       slug,
  //     },
  //   }))

  //   return {
  //     paths,
  //     fallback: false,
  //   }
  return {
    params: {
      slug: 'dzadzadzaazdaz',
    },
    fallback: false,
  }
}
const WorkInfoPage: NextPage<Props> = ({ work }) => {
  const [loading, setLoading] = useState(true)

  function alertComponent() {
    throw new Error('Function not implemented.')
  }

  console.log(work)

  return (
    <>
      <AdminLayoutComponent>
        <>
          <SeoComponent seo={{ title: 'Works CMS', description: 'Works: Ajouter, modifier et supprimer' }} />
          <header>
            <h1 className="main-title">WorksCMS</h1>
          </header>
          {alertComponent()}
          <main className="admin-content">
            {loading ? ( // Conditional rendering based on the loading state
              <div>Loading work page ...</div>
            ) : (
              <section className="grid gap-4 grid-cols-1 md:grid-cols-1">
                <div className="col-span-1">modify form</div>
              </section>
            )}
          </main>
        </>
      </AdminLayoutComponent>
    </>
  )
}

export default WorkInfoPage

interface ModifyWorkFormInterface {
  title: string
  children: string
  picto: string
  alt: string
  textSpecial?: string
}
const ModifyWorkForm: FC<ModifyWorkFormInterface> = ({ title, children, textSpecial, picto, alt }) => (
  <article className="card grid h-full content-start gap-6 bg-cwr-blue-800 ">
    <Image className="h-[40px] md:h-[50px]" src={picto} alt={alt} />
    <div className="block">
      <h1 className=" mb-2 w-[60%] font-semibold md:mb-6 md:text-xl lg:w-[70%]">{title}</h1>
      <p className="w-11/12 md:text-xl ">
        {children} <br />
        <span className="text-cwr-turquoise-300">{textSpecial}</span>
      </p>
    </div>
  </article>
)
function getWorkInfoBySlug(slug: any) {
  throw new Error('Function not implemented.')
}
