import { workCWRimg } from '@/assets/works'
import { Seo } from '@/cas-types'
import NavComponent, { NavLinkEnum } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import FilterComponent from '@/components/works/filterCompoenent'
import ProjectComponent from '@/components/works/projectListComponent'
import ProjectListComponent from '@/components/works/projectListComponent'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/content-api'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'

const YOUR_ACCESS_KEY = process.env.YOUR_ACCESS_KEY

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('works')
  return {
    props: { seo },
  }
}
const Works: NextPage<Props> = ({ seo }) => {
  const { setActiveNavLink } = useNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(NavLinkEnum.Works)
  }, [setActiveNavLink])

  // filter
  const [projects, setProjects] = useState([])
  const [filtred, setFiltred] = useState([])
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    fetchPopular()
  }, [])
  const fetchPopular = async () => {
    const data = await fetch(`https://api.artic.edu/api/v1/artworks`)
    const projects = await data.json()
    setProjects(projects.data)
    setFiltred(projects.data)
    // console.log(projects.data)
  }

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
                key={project.id}
                classCatagory={'dev all'}
                linkRef={NavLinkEnum.Works}
                title={project.artist_title}
                titleSecondary={project.title}
                imageRef={`https://www.artic.edu/iiif/2/${project.image_id}/full/843,/0/default.jpg`}
              />
            )
          })}
        </AnimatePresence>
      </motion.section>
    </>
  )
}

export default Works
