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

interface Props {
  formation: IWork
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params

  const formation = getFormationByFileName(`${slug}.json`)

  formation.slug = slug

  return {
    props: {
      formation,
    },
  }
}

// export const getStaticPaths: GetStaticPaths = () => {
//   //only get the slug from works
//   const formationsSlugs = getFormationsSlugs()

//   // map through to return work paths
//   const paths = formationsSlugs.map((slug) => ({
//     params: {
//       slug,
//     },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

const FormationPage: NextPage<Props> = ({ formation }) => {
  const [loading, setLoading] = useState(true)

  function alertComponent() {
    throw new Error('Function not implemented.')
  }

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

export default FormationPage

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
