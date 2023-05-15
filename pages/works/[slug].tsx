import { Seo } from '@/cas-types'
import SeoComponent from '@/components/shared/seo-component'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { IWork } from '@/@types/work'
import { ParsedUrlQuery } from 'querystring'
import { IWorkInfo } from '../admin/works/[id]'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { NavLinkEnum, getPathFromNavLink } from '@/components/nav'
import { useRouter } from 'next/router'
interface Props {
  seo: Seo
  work: IWorkInfo | null
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.URL}/api/works`, {
    method: 'GET',
  })
  const { works } = await res.json()

  const paths = works
    .filter((work: IWork) => work.published) // Only include published works
    .map((work: IWork) => ({
      params: {
        slug: work.slug,
      },
    }))

  return {
    paths,
    fallback: false,
  }
}

const getWorkDetails = async (workSlug: string): Promise<{ props: { seo: Seo; work: IWorkInfo | null } }> => {
  try {
    const response = await fetch(`${process.env.URL}/api/works/${workSlug}`, {
      method: 'GET',
    })
    const data = await response.json()

    if (response.ok) {
      const work = data.data
      return {
        props: {
          seo: {
            title: work?.seo?.title || '',
            description: work?.seo?.description || '',
          },
          work,
        },
      }
    }
    throw console.error()
  } catch (error: any) {
    console.log('pagesworks[slug].tsx: ', error)
    return {
      props: {
        seo: {
          title: 'Projets Fullstack developer & UX / UI DESIGNER',
          description: 'Bienvenue sur mon site',
        },
        work: null,
      },
    }
  }
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params
  return await getWorkDetails(slug)
}
const SingleWorkPage: NextPage<Props> = ({ seo, work }) => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }
  if (work) {
    return (
      <>
        <SeoComponent seo={seo} />
        <header className="top-header lateral-space">
          <h1 className="main-title">{work.title}</h1>
          <div className="grid my-5 md:grid-cols-2">
            <Link className="absolute top-[20%] right-[5%] underline" href="#" onClick={goBack}>
              &lt;-retour
            </Link>
            {work.coverImage && (
              <CldImage
                className="w-full h-auto md:pr-16"
                width="599"
                height="431"
                priority
                src={work.coverImage}
                alt={`${work.title} work image`}
              />
            )}
            <div>
              <h2 className="pt-3 sm:pt-0 mb-3 text-2xl font-semibold">{work.secondaryTitle}</h2>
              <p className="sm:w-4/5">{work.description}</p>
              <div className="mt-8">
                <h2> Tech & methods</h2>
                <ul className="grid grid-cols-2">
                  {work.skillPoints &&
                    work.skillPoints.map((point, index) => (
                      <li className="text-sm md:text-base" key={index}>
                        {point}
                      </li>
                    ))}
                </ul>
              </div>
              <div
                className={
                  'grid  mt-8' +
                  `${
                    work.links.otherResource.published && work.links.website.published
                      ? ' grid-cols-2 gap-5 md:gap-8'
                      : ' grid-cols-1'
                  }`
                }
              >
                {work.links.website && work.links.website.published ? (
                  <Link className="work-link-btn  " target="_blank" href={work.links.website.link}>
                    Website link
                  </Link>
                ) : (
                  ''
                )}
                {work.links.otherResource && work.links.otherResource.published ? (
                  <Link className="work-link-btn ml-auto " target="_blank" href={work.links.otherResource.link}>
                    {work.links.otherResource.title}
                  </Link>
                ) : (
                  ''
                )}
              </div>

              <div className="flex">
                <Link className="contact-btn  mt-6 mb-14" href={getPathFromNavLink(NavLinkEnum.Contact)}>
                  Contact me
                </Link>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
  return (
    <>
      <SeoComponent seo={{ title: 'Work Not Found', description: 'Work Not Found' }} />
      <header className="top-header lateral-space">
        <h1 className="main-title">{seo.title}</h1>
      </header>
    </>
  )
}

export default SingleWorkPage
