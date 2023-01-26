import { Seo } from '@/cas-types'
import SeoComponent from '@/components/shared/seo-component'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('projet')
  return {
    props: { seo },
  }
}
const Projet: NextPage<Props> = ({ seo }) => (
  <>
    <SeoComponent seo={seo} />

    <h1>Projet</h1>
  </>
)

export default Projet
