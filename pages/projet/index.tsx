import { Seo } from '@/cas-types'
import NavComponent, { NavLinkEnum } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('projet')
  return {
    props: { seo },
  }
}
const Projet: NextPage<Props> = ({ seo }) => {
  const { setActiveNavLink } = useNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(NavLinkEnum.Works)
  }, [setActiveNavLink])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space">
        <h1 className="main-title">Projet X</h1>
      </header>
    </>
  )
}

export default Projet
