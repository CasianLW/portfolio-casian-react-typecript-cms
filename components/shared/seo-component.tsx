import { FC } from 'react'
import Head from 'next/head'

import { Seo } from '@/cas-types'

interface Props {
  seo: Seo
}

const SeoComponent: FC<Props> = ({ seo }) => (
  <Head>
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
  </Head>
)

export default SeoComponent
