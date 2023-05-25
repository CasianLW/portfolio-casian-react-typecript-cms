import SeoComponent from '@/components/shared/seo-component'
import { Seo } from '@/cas-types'
import { GetStaticProps, NextPage } from 'next'
import { NavLinkEnum } from '@/components/nav'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { useEffect, useState } from 'react'
import SliderComponent from '@/components/homepage/sliderComponent'
import TypingTextComponent from '@/components/homepage/typetextComponent'
import BlobComponent from '@/components/homepage/blobComponent'
import TextSpinnerComponent from '@/components/homepage/spinnerLinkComponent'
import ScrollAnimationComponent from '@/components/homepage/scrollAnimationComponent'
import { getPageSeoBySlug } from '@/utils/page-seo-api'
import { IWorkInfo } from './admin/works/[id]'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const slug = 'Homepage'
  const seo = await getPageSeoBySlug(slug)
  return {
    props: { seo },
  }
}
const Home: NextPage<Props> = ({ seo }) => {
  const { setActiveNavLink } = useNavSettingsContext()

  // const [actualWorksList, setActualWorksList] = useState<string[]>([])
  const [actualWorksList, setActualWorksList] = useState<IWorkInfo[]>([])
  // const [worksList, setWorksList] = useState<IWorkInfo[]>([])
  // const [sortedWorks, setSortedWorks] = useState<IWorkInfo[]>([])

  const getWorksList = async () => {
    try {
      const responseHp = await fetch('/api/homepage/', {
        method: 'GET',
      })
      const dataHp = await responseHp.json()
      if (responseHp.ok) {
        setActualWorksList(dataHp.homepage[0]?.selectedWorks || [])
      }
    } catch (error: any) {}
  }

  useEffect(() => {
    const fetchAndSortWorks = async () => {
      await getWorksList()
      setActiveNavLink(NavLinkEnum.Home)
    }
    fetchAndSortWorks()
  }, [setActiveNavLink])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space mobile-scroll-fix ">
        <div className="w-full h-[100vh] absolute top-0 left-0 mobile-scroll-fix -z-50"></div>
        <h1 className="main-title">Freelancer</h1>
        <TypingTextComponent />
        <BlobComponent />
        <SliderComponent projectsList={actualWorksList} />
        <TextSpinnerComponent />
        <ScrollAnimationComponent />
      </header>
    </>
  )
}

export default Home
