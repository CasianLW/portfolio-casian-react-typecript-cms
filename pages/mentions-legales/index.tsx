// import ContectComponent from '@/components/contact-components/formComponent'
import { AboutRNCP } from '@/assets/about'
import { casianPicture, githubLogo, linkedinLogo, profilePicture } from '@/assets/shared'
import { Seo } from '@/cas-types'
import NavComponent, { NavLinkEnum, getPathFromNavLink } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/page-seo-api'
import { GetStaticProps, NextPage } from 'next'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

const MentionsLegales: NextPage = () => {
  return (
    <>
      <SeoComponent
        seo={{
          title: 'Mentions Legales casian.fr ',
          description: 'Les differentes mentions legales du site internet casian.fr & autres informations.',
        }}
      />

      <header className="top-header lateral-space grid md:grid-cols-3">
        <section className="col-span-1 md:col-span-3">
          <h1 className="main-title">Mentions Legales</h1>
          <div className="grid sm:grid-cols-3 flex-col-reverse ">
            <p>Mentions dzadza</p>
          </div>
        </section>
      </header>
    </>
  )
}

export default MentionsLegales
