// import ContectComponent from '@/components/contact-components/formComponent'
import { Seo } from '@/cas-types'
import SeoComponent from '@/components/shared/seo-component'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('about')
  return {
    props: { seo },
  }
}
const About: NextPage<Props> = ({ seo }) => (
  <>
    <SeoComponent seo={seo} />
    <h1>About</h1>
  </>
)

export default About
