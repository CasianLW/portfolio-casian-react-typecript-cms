// import ContectComponent from '@/components/contact-components/formComponent'
import { Seo } from '@/cas-types'
import { NavLinkEnum } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('services')
  return {
    props: { seo },
  }
}
const Services: NextPage<Props> = ({ seo }) => {
  const { setActiveNavLink } = useNavSettingsContext()

  useEffect(() => {
    setActiveNavLink(NavLinkEnum.Services)
  }, [setActiveNavLink])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space">
        <h1 className="main-title">Services</h1>
      </header>
    </>
  )
}

export default Services
