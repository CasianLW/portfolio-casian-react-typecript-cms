import { Seo } from '@/cas-types'
import PageModel from '@/utils/mongodb/page.model'

interface PageData {
  seo: {
    title: string
    description: string
    searchImage: string
  }
  title: string
}
export const getPageSeoBySlug = async (slug: string): Promise<Seo> => {
  try {
    const response = await fetch(`${process.env.URL}/api/pages/`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch SEO data')
    }

    const data = await response.json()

    const seo = data.pages.find((page: PageData) => page.title === slug)?.seo

    if (seo) {
      return seo
    } else {
      // Return default values if no SEO data is found for the given slug
      return {
        title: 'Casian Fullstack developer & UX / UI DESIGNER',
        description: 'Bienvenue sur mon site',
      }
    }
  } catch (error) {
    console.error(error)
    // Return default values in case of an error
    return {
      title: 'Casian Fullstack developer & UX / UI DESIGNER',
      description: 'Bienvenue sur mon site',
    }
  }
}
