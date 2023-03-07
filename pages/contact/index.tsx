import { githubLogo, linkedinLogo, profilePicture } from '@/assets/shared'
import { Seo } from '@/cas-types'
import ContectComponent from '@/components/contact-components/formComponent'
import NavComponent, { NavLinkEnum } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const { setActiveNavLink } = useNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(NavLinkEnum.Contact)
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 640)
    }
    handleResize()
    // Add event listener to resize
    window.addEventListener('resize', handleResize)
  }, [setActiveNavLink, isLargeScreen])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space grid sm:grid-cols-2">
        <section>
          <h1 className="main-title">CONTACT</h1>
          <p className="sm:w-2/3 my-5">
            Hésitez pas a nous contacter pour toute question, notre formulaire est la pour ca !
          </p>

          <div>
            {isLargeScreen && (
              <div className="grid grid-cols-2 sm:grid-cols-1">
                <div className="grid">
                  <a className="py-3" href="tel:+">
                    <u>Tel.+33 (0)7 83 41 57 55</u>
                  </a>
                  <a className="py-3" href="mailto:">
                    <u>contact@casian.fr</u>
                  </a>
                </div>
                <div className="flex my-auto gap-8 justify-center sm:justify-start">
                  <Link className="w-fit" target="_blank" href={'https://www.linkedin.com/in/casianc/'}>
                    <Image
                      src={linkedinLogo}
                      className=" m-auto"
                      alt="Logo linkedIn"
                      width={44}
                      height={44}
                      // blurDataURL="data:..." automatically provided
                    />
                    <p className="text-sm">LinkedIn</p>
                  </Link>
                  <Link className="w-fit" target="_blank" href={'https://github.com/CasianLW'}>
                    <div className="w-11 h-11 rounded-xl bg-cas-white-100 flex justify-center">
                      <Image
                        src={githubLogo}
                        className="m-auto "
                        alt="Logo linkedIn"
                        width={36}
                        height={36}
                        // blurDataURL="data:..." automatically provided
                      />
                    </div>
                    <p className="text-sm">GitHub</p>
                  </Link>
                </div>
              </div>
            )}

            <Image
              src={profilePicture}
              className="max-w-[50%] m-auto mt-10"
              alt="Casian Ciorba Image UX UI Designer et Fullstack Mobile Developer"
              width={500}
              height={500}
              // blurDataURL="data:..." automatically provided
              placeholder="blur" // Optional blur-up while loading
            />
          </div>
        </section>
        <section className="mb-10 sm:mb-0 mx-[-5vw] sm:mx-0 -mt-20 sm:mt-12 bg-cas-white-100 text-cas-black-600 p-10 rounded-[32px]">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold mb-5">
              Vous avez des idées, un projet? J&apos;ai les compétences, travaillons ensemble.
            </h2>

            <ContectComponent />
          </div>
        </section>
        {!isLargeScreen && (
          <div className="grid grid-cols-2 sm:grid-cols-1">
            <div className="grid">
              <a className="py-3" href="tel:+">
                <u>Tel.+33 (0)7 83 41 57 55</u>
              </a>
              <a className="py-3" href="mailto:">
                <u>contact@casian.fr</u>
              </a>
            </div>
            <div className="flex my-auto gap-8 justify-center sm:justify-start">
              <Link className="w-fit" target="_blank" href={'https://www.linkedin.com/in/casianc/'}>
                <Image
                  src={linkedinLogo}
                  className=" m-auto"
                  alt="Logo linkedIn"
                  width={44}
                  height={44}
                  // blurDataURL="data:..." automatically provided
                />
                <p className="text-sm">LinkedIn</p>
              </Link>
              <Link className="w-fit" target="_blank" href={'https://github.com/CasianLW'}>
                <div className="w-11 h-11 rounded-xl bg-cas-white-100 flex justify-center">
                  <Image
                    src={githubLogo}
                    className="m-auto "
                    alt="Logo linkedIn"
                    width={36}
                    height={36}
                    // blurDataURL="data:..." automatically provided
                  />
                </div>
                <p className="text-sm">GitHub</p>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Contact
