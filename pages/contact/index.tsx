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
      <header className="top-header lateral-space grid sm:grid-cols-2">
        <section>
          <h1 className="main-title">CONTACT</h1>
          <p className="w-2/3">Hésitez pas a nous contacter pour toute question, notre formulaire est la pour ca !</p>

          <div>
            <div className="grid">
              <a href="tel:+">
                <u>Tel.+33 (0)7 83 41 57 55</u>
              </a>
              <a href="mailto:">
                <u>contact@casian.fr</u>
              </a>
            </div>
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
        <section className=" -mt-20 sm:mt-12 bg-cas-white-100 text-cas-black-600 p-10 rounded-[32px]">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold mb-5">
              Vous avez des idées, un projet? J&apos;ai les compétences, travaillons ensemble.
            </h2>

            <ContectComponent />
          </div>
        </section>
      </header>
    </>
  )
}

export default Contact
