export interface IWork {
  _id: string

  title: string

  seo: { title: string; description: string }

  slug: string

  coverImage: string

  secondaryImage: string

  description: string

  category: { dev: Boolean; uxui: Boolean; graphic: Boolean; all: Boolean }

  published: boolean
}
