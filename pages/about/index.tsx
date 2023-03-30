// import ContectComponent from '@/components/contact-components/formComponent'
import { Seo } from '@/cas-types'
import NavComponent, { NavLinkEnum } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/page-seo-api'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'

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

  useEffect(() => {
    setActiveNavLink(NavLinkEnum.About)
  }, [setActiveNavLink])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space">
        <h1 className="main-title">About</h1>
      </header>
    </>
  )
}

export default About
