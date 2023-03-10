import SeoComponent from '@/components/shared/seo-component'
import { Seo } from '@/cas-types'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'
import { NavLinkEnum } from '@/components/nav'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { useEffect } from 'react'
import SliderComponent from '@/components/homepage/sliderComponent'
import TypingTextComponent from '@/components/homepage/typetextComponent'
import BlobComponent from '@/components/homepage/blobComponent'
import TextSpinnerComponent from '@/components/homepage/spinnerLinkComponent'
import ScrollAnimationComponent from '@/components/homepage/scrollAnimationComponent'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('home')
  return {
    props: { seo },
  }
}
const Home: NextPage<Props> = ({ seo }) => {
  const { setActiveNavLink } = useNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(NavLinkEnum.Home)
  }, [setActiveNavLink])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space">
        <h1 className="main-title">Freelancer</h1>
        <TypingTextComponent />
        <BlobComponent />
        <SliderComponent />
        <TextSpinnerComponent />
        <ScrollAnimationComponent />
      </header>
    </>
  )
}

export default Home
