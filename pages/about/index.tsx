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
      <header className="top-header lateral-space grid md:grid-cols-3">
        <section className="col-span-1 md:col-span-3">
          <h1 className="main-title">About</h1>
          <div className="grid sm:grid-cols-3 flex-col-reverse ">
            <div className="sm:order-3">
              <IllustrationComponent />
            </div>
            <div className="sm:col-span-2 ">
              <p className="sm:w-2/3 my-5 md:w-1/2">
                Hello, je suis un développeur fullstack mobile et UX/UI designer freelance. Mon champ d&apos;expertise
                s&apos;étend sur plusieurs domaines, que je ne cesse de renforcer et d&apos;élargir.
              </p>
              <p className="sm:w-2/3 my-5 md:w-1/2">
                En tant que freelance ambitieux, j&apos;ai le privilège de collaborer avec divers clients et
                entreprises, quels que soient leur taille et leur domaine d&apos;activité. <br />
                <br />
                Pour mes projets de design, j&apos;utilise l&apos;ensemble des outils Adobe, tout en privilégiant{' '}
                <span className="link-active">Figma</span>. <br />
                En ce qui concerne le développement, je m&apos;adapte à tout langage, mais ma stack de prédilection est
                la <span className="link-active"> MERN</span>, comprenant
                <span className="link-active"> MongoDB, Express.js, React.js et Next.js</span>, avec une solide maîtrise
                du <span className="link-active">Typescript</span>. <br />
                <br />
                Cette combinaison de compétences me permet d&apos;offrir des solutions créatives et performantes, tout
                en répondant aux besoins spécifiques de chaque projet. Passionné par l&apos;innovation, je
                m&apos;efforce d&apos;apporter une valeur ajoutée à chaque collaboration.
              </p>
              <div>
                {/* {isLargeScreen && ( */}
                <div className="grid grid-cols-1">
                  <div>
                    <h2>Compétences confirmées</h2>
                    <div className="flex  justify-around md:justify-start">
                      <CompetenceComponent texte={'BAC+2'} image={AboutRNCP} nomCompetence={'Infographie'} />
                      <CompetenceComponent texte={'BAC+2'} image={AboutRNCP} nomCompetence={'Webdesign'} />
                      <CompetenceComponent
                        texte={'Bachelor (BAC+3) '}
                        image={AboutRNCP}
                        nomCompetence={'UX | UI Design'}
                      />
                      <CompetenceComponent
                        texte={'Bachelor'}
                        image={AboutRNCP}
                        nomCompetence={'Fullstack & mobile developer'}
                      />
                    </div>
                  </div>
                  <div className="grid">
                    <h2>Contact</h2>
                    <div className="grid">
                      <a className="pb-3 w-fit hover:link-active" href="tel:+">
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
                    <Link className="contact-btn md:w-1/3 mt-6 mb-14" href={getPathFromNavLink(NavLinkEnum.Contact)}>
                      Contact
                    </Link>
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
      <div className="stack-item z-10">
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
      <div id="blob-container" className="stack-item mb-auto ml-8 mt-8 z-10">
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
    <div className="flex flex-col items-center w-full md:w-fit max-w-[60px] md:mr-10">
      <Image
        className="max-w-[56px]"
        src={image}
        alt={`Certification: ${nomCompetence + ' ' + texte}`}
        width={100}
        height={100}
      />
      <h4 className="text-xs text-center md:text-sm">{nomCompetence}</h4>
      <p className="text-center text-xs link-active">{texte}</p>
    </div>
  )
}

export default About
