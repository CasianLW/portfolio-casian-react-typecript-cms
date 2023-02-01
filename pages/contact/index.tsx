import { profilePicture } from '@/assets/shared'
import { Seo } from '@/cas-types'
import ContectComponent from '@/components/contact-components/formComponent'
import NavComponent, { NavLinkEnum } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('contact')
  return {
    props: { seo },
  }
}
const Contact: NextPage<Props> = ({ seo }) => {
  const { setActiveNavLink } = useNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(NavLinkEnum.Contact)
  }, [setActiveNavLink])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space">
        <h1 className="main-title">CONTACT</h1>
        <p>Hésitez pas a nous contacter pour toute question, notre formulaire est la pour ca !</p>
        <section className=" grid md:grid-cols-2">
          <div>
            <div className="grid">
              <a href="tel:+">
                <u>Tel.+33 (0)7 83 41 57 55</u>
              </a>
              <a href="mailto:">
                <u>contact@casian.fr</u>
              </a>
            </div>
            <ContectComponent />
          </div>
          <div>
            <Image
              src={profilePicture}
              className="max-w-[50%] m-auto"
              alt="Casian Ciorba Image UX UI Designer et Fullstack Mobile Developer"
              width={500}
              height={500}
              // blurDataURL="data:..." automatically provided
              placeholder="blur" // Optional blur-up while loading
            />
          </div>
        </section>
      </header>
    </>
  )
}

export default Contact
