import { Seo } from '@/cas-types'
import ContectComponent from '@/components/contact-components/formComponent'
import SeoComponent from '@/components/shared/seo-component'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('contact')
  return {
    props: { seo },
  }
}
const Contact: NextPage<Props> = ({ seo }) => (
  <>
    <SeoComponent seo={seo} />

    <h1>Contactez-moi</h1>
    <ContectComponent />
  </>
)

export default Contact
