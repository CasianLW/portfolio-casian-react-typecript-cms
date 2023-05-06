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

  const [actualWorksList, setActualWorksList] = useState<string[]>([])
  const [worksList, setWorksList] = useState<IWorkInfo[]>([])
  const [sortedWorks, setSortedWorks] = useState<IWorkInfo[]>([])

  const getWorksList = async () => {
    // console.log('test du transfer')
    try {
      const response = await fetch('/api/works/', {
        method: 'GET',
      })
      const responseHp = await fetch('/api/homepage/', {
        method: 'GET',
      })
      const dataHp = await responseHp.json()
      const data = await response.json()
      // console.log(data)
      if (response.ok && responseHp.ok) {
        // Handle success
        setWorksList(data.works.reverse())
        setActualWorksList(dataHp.homepage[0]?.selectedWorks || [])
        // console.log(dataHp.homepage)
        // console.log(Array.isArray(worksList) + 'ies it is')
      }
    } catch (error: any) {
      // Handle error
      // console.log(data.message)
    }
  }
  // getWorksList()

  const sortWorks = (worksList: IWorkInfo[], actualWorksList: string[]): IWorkInfo[] => {
    return worksList.sort((b, a) => {
      const aIndex = actualWorksList.indexOf(a.slug)
      const bIndex = actualWorksList.indexOf(b.slug)

      if (aIndex === -1) return 1
      if (bIndex === -1) return -1

      return aIndex - bIndex
    })
  }

  useEffect(() => {
    const fetchAndSortWorks = async () => {
      setActiveNavLink(NavLinkEnum.Home)
      await getWorksList()
    }

    fetchAndSortWorks()
  }, [setActiveNavLink])

  useEffect(() => {
    const sorted = sortWorks(worksList, actualWorksList)
    setSortedWorks(sorted)
  }, [worksList, actualWorksList])

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space mobile-scroll-fix ">
        <div className="w-full h-[100vh] absolute top-0 left-0 mobile-scroll-fix -z-50"></div>
        <h1 className="main-title">Freelancer</h1>
        <TypingTextComponent />
        <BlobComponent />
        <SliderComponent projectsList={sortedWorks} />
        <TextSpinnerComponent />
        <ScrollAnimationComponent />
      </header>
    </>
  )
}

export default Home
