export interface Seo {
  title: string
  description: string
}

export interface Project {
  title: string
  seo: { title: string; description: string }
  slug: string
  methods: string[]
  primaryImage: string
  secondaryImage: string
  description: string
  liens: string[]
  order: number
}
export interface Service {
  title: string
  slug: string
  categorie: string | any
  primaryImage: string
  description: string
  order: number
}
