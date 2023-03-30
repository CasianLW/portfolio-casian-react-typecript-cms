import { workCWRimg } from '@/assets/works'
import { Seo } from '@/cas-types'
import NavComponent, { NavLinkEnum } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import FilterComponent from '@/components/works/filterCompoenent'
import ProjectComponent from '@/components/works/projectListComponent'
import ProjectListComponent from '@/components/works/projectListComponent'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/page-seo-api'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { IWorkInfo } from '../admin/works/[id]'

interface Props {
  seo: Seo
  works: any[]
}

const getWorksList = async (): Promise<{ props: { seo: Seo; works: any[] } }> => {
  try {
    const slug = 'Works'
    const seo = await getPageSeoBySlug(slug)

    const response = await fetch(`${process.env.URL}/api/works/`, {
      method: 'GET',
    })
    const data = await response.json()

    if (response.ok) {
      const works = data.works
      return {
        props: { seo, works },
      }
    }
    throw console.error()
  } catch (error: any) {
    console.log(error)
    return {
      props: {
        seo: {
          title: 'Projets Fullstack developer & UX / UI DESIGNER',
          description: 'Bienvenue sur mon site',
        },
        works: [],
      },
    }
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return await getWorksList()
}

// export const getStaticProps: GetStaticProps = async () => {
//   const seo = getPageSeoBySlug('works')
//   return {
//     props: { seo },
//   }
// }
const Works: NextPage<Props> = ({ seo, works }) => {
  const { setActiveNavLink } = useNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(NavLinkEnum.Works)
  }, [setActiveNavLink])

  // filter
  function filterPublishedWorks(works: Array<IWorkInfo>): Array<IWorkInfo> {
    return works.filter((work) => work.published)
  }

  const [projects, setProjects] = useState(filterPublishedWorks(works))
  const [filtred, setFiltred] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    // fetchPopular()
  }, [])

  // artworks test
  // const data = await fetch(`https://api.artic.edu/api/v1/artworks`)
  // const fetchPopular = async () => {
  //   const data = await fetch(`https://api.artic.edu/api/v1/artworks`)
  //   const projects = await data.json()
  //   setProjects(projects.data)
  //   setFiltred(projects.data)
  //   // console.log(projects.data)
  // }

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space">
        <h1 className="main-title">Works</h1>
      </header>
      {/* <ProjectFilterComponent /> */}
      <FilterComponent
        projects={projects}
        setFiltred={setFiltred}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* <ProjectListComponent /> */}
      <motion.section layout className="bg-cwr-blue-400 pt-8 text-center w-4/5 m-auto text-white sm:flex sm:flex-wrap ">
        <AnimatePresence>
          {filtred.map((project: never | any) => {
            return (
              <ProjectComponent
                key={project._id}
                classCatagory={` ${project.category.dev ? 'dev' : ''} ${project.category.all ? 'all' : ''} ${
                  project.category.uxui ? 'uxui' : ''
                } ${project.category.graphic ? 'graphic' : ''}`}
                linkRef={NavLinkEnum.Works}
                title={project.title}
                titleSecondary={project.secondaryTitle}
                slug={project.slug}
                imageRef={project.coverImage}
                // imageRef={`https://www.artic.edu/iiif/2/${project.image_id}/full/843,/0/default.jpg`}
              />
            )
          })}
        </AnimatePresence>
      </motion.section>
    </>
  )
}

export default Works
