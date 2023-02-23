export interface IWork {
  _id: string

  title: string

  seo: { title: string; description: string }

  slug: string

  coverImage: string

  description: string

  published: boolean
}
