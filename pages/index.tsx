import Head from 'next/head'
import Image from 'next/image'
import SeoComponent from '@/components/shared/seo-component'
import { Seo } from '@/cas-types'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('home')
  return {
    props: { seo },
  }
}
const Home: NextPage<Props> = ({ seo }) => (
  <>
    <SeoComponent seo={seo} />

    <h1>Portfolio</h1>
  </>
)

export default Home
