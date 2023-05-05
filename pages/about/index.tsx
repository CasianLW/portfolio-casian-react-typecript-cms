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

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const slug = 'About'
  const seo = await getPageSeoBySlug(slug)
  return {
    props: { seo },
  }
}
const About: NextPage<Props> = ({ seo }) => {
  const { setActiveNavLink } = useNavSettingsContext()
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    setActiveNavLink(NavLinkEnum.About)
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 640)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [setActiveNavLink, isLargeScreen])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space grid sm:grid-cols-3">
        <section className="col-span-1 md:col-span-3">
          <h1 className="main-title">About</h1>
          <div className="grid sm:grid-cols-3 flex-col-reverse ">
            <div className="sm:order-3">
              <IllustrationComponent />
            </div>
            <div className="sm:col-span-2 ">
              <p className="sm:w-2/3 my-5">
                Hello, je suis un développeur fullstack mobile et UX/UI designer freelance. Mon champ d&apos;expertise
                s&apos;étend sur plusieurs domaines, que je ne cesse de renforcer et d&apos;élargir.
              </p>
              <div>
                {/* {isLargeScreen && ( */}
                <div className="grid grid-cols-1">
                  <div>
                    <h2>Compétences confirmées</h2>
                    <div className="flex justify-around">
                      <CompetenceComponent texte={'BAC+2'} image={AboutRNCP} nomCompetence={'Infographie'} />
                      <CompetenceComponent texte={'BAC+2'} image={AboutRNCP} nomCompetence={'Webdesign'} />
                      <CompetenceComponent
                        texte={'Bachelor (BAC+3) '}
                        image={AboutRNCP}
                        nomCompetence={'UX | UI Design'}
                      />
                      <CompetenceComponent
                        texte={'Bachelor (BAC+3)'}
                        image={AboutRNCP}
                        nomCompetence={'Fullstack & mobile developer'}
                      />
                    </div>
                  </div>
                  <div>
                    <h2>Contact</h2>
                    <div className="grid">
                      <a className="py-3" href="tel:+">
                        <u>Tel.+33 (0)7 83 41 57 55</u>
                      </a>
                      {/* <a className="py-3" href="mailto:">
                          <u>contact@casian.fr</u>
                        </a> */}
                    </div>
                    <div className="flex my-auto gap-8 justify-start">
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
                    <Link href={getPathFromNavLink(NavLinkEnum.Contact)}>Contact</Link>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </section>

        {/* <IllustrationComponent /> */}
      </header>
    </>
  )
}

const IllustrationComponent: FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <section className="grid mb-10 h-fit sm:mb-0 mx-[-5vw] p-[10%] md:p-0 sm:mx-0 sm:mt-12  text-cas-white-100 col-span-1 ">
      <div className="stack-item">
        <h3 className="text-1xl md:text-4xl mt-[5%] float-right">Casian C.</h3>
      </div>
      <div className="ml-auto w-4/5 md:w-full stack-item p-10 rounded-[32px]  bg-cas-black-400 h-4/5 mt-auto"></div>
      <Image
        src={casianPicture}
        priority
        className="m-auto stack-item pl-24 w-5/6"
        alt="Casian Ciorba Image UX UI Designer Fullstack Developper Paris France Romania"
        width={200}
        height={200}
        // blurDataURL="data:..." automatically provided
      />
      <div id="blob-container" className="stack-item mb-auto ml-8 mt-8">
        <div
          id="blob1"
          className={`blob bg-cas-gradient-blue ${isHovered && 'paused'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
        <div
          id="blob2"
          className={`blob bg-cas-gradient-orangeLight ${isHovered && 'paused'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
        <div
          id="blob3"
          className={`blob bg-cas-gradient-rose ${isHovered && 'paused'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
      </div>
    </section>
  )
}

interface CompetenceProps {
  nomCompetence: string
  texte: string
  image: StaticImageData
}

const CompetenceComponent: FC<CompetenceProps> = ({ texte, image, nomCompetence }) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        className="max-w-[56px]"
        src={image}
        alt={`Certification: ${nomCompetence + ' ' + texte}`}
        width={100}
        height={100}
      />
      <h4>{nomCompetence}</h4>
      <p className="text-center">{texte}</p>
    </div>
  )
}

export default About
