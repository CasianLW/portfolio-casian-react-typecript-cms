import { Seo } from '@/cas-types'
import fs from 'fs'
import { join } from 'path'

const contentPagesDirectory = join(process.cwd(), '_content/pages')

export const getPageSeoBySlug: (slug: string) => Seo = (slug) => {
  const realSlug = slug.replace(/\.json$/, '')

  const fullPath = join(contentPagesDirectory, `${realSlug}.json`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const pageData = JSON.parse(fileContents)

  const seo = pageData.seo

  return seo
}
