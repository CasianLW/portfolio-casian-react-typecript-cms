import { Seo } from '@/cas-types'
import { NavLinkEnum } from '@/components/nav'
import PanelComponent from '@/components/services/panelComponent'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/content-api'
import { motion } from 'framer-motion'
import { GetStaticProps, NextPage } from 'next'
import { FC, useEffect, useState } from 'react'

interface Props {
  seo: Seo
}

export const getStaticProps: GetStaticProps = async () => {
  const seo = getPageSeoBySlug('services')
  return {
    props: { seo },
  }
}

const Services: NextPage<Props> = ({ seo }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [servicesList, setServicesList] = useState([])

  const handleClick = (index: number) => {
    setActiveIndex(index)
  }

  const { setActiveNavLink } = useNavSettingsContext()

  useEffect(() => {
    setActiveNavLink(NavLinkEnum.Services)
    getServicesList()
  }, [setActiveNavLink])

  const getServicesList = async () => {
    try {
      const response = await fetch('/api/services/', {
        method: 'GET',
      })
      const data = await response.json()
      // console.log(data)
      if (response.ok) {
        // Handle success
        setServicesList(data.services)
        console.log(data.services)
        // setServicesList(data.works.reverse())
      }
    } catch (error: any) {
      // Handle error
      console.log(error)
    }
  }

  return (
    <>
      <SeoComponent seo={seo} />
      <header className="top-header lateral-space">
        <h1 className="main-title">Services</h1>
      </header>

      <div className="mx-auto px-8 sm:px-0">
        <div className="mt-10">
          <div
            role="tablist"
            aria-label="tabs"
            className="relative max-w-3xl  w-full mx-auto h-14 grid grid-cols-3 items-center  rounded-full bg-cas-black-400 overflow-hidden shadow-2xl shadow-900/20 transition"
          >
            <motion.div
              layout
              className={`absolute w-1/3 md:w-1/3 m-2  top-0 bottom-0 rounded-full bg-white shadow-md ${
                activeIndex === 0
                  ? 'left-0 w-[29%]'
                  : activeIndex === 1
                  ? 'left-[31%] md:left-[32.5%]'
                  : activeIndex === 2
                  ? 'right-0 w-[28%]'
                  : ''
              }`}
            ></motion.div>
            <Tab index={0} activeIndex={activeIndex} handleClick={handleClick}>
              Complets
            </Tab>
            <Tab index={1} activeIndex={activeIndex} handleClick={handleClick}>
              Spécifiques
            </Tab>
            <Tab index={2} activeIndex={activeIndex} handleClick={handleClick}>
              Autres
            </Tab>
          </div>
          <motion.div layout className="tab-content mt-12 w-11/12 md:w-10/12 m-auto">
            <PanelComponent index={0} activeIndex={activeIndex} tabCategory={'complets'} serviceList={servicesList} />

            <PanelComponent index={1} activeIndex={activeIndex} tabCategory={'specifics'} serviceList={servicesList} />

            <PanelComponent index={2} activeIndex={activeIndex} tabCategory={'autre'} serviceList={servicesList} />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Services
//
//

interface TabProps {
  index: number
  activeIndex: number
  handleClick: (index: number) => void
  children: string
}

export const Tab: FC<TabProps> = ({ index, activeIndex, handleClick, children }) => {
  return (
    <motion.button
      layout
      role="tab"
      aria-selected={index === activeIndex}
      aria-controls={`panel-${index + 1}`}
      id={`tab-${index + 1}`}
      tabIndex={index === activeIndex ? 0 : -1}
      className="relative block h-10 w-full text-center tab rounded-full"
      onClick={() => handleClick(index)}
    >
      <span className={`text-cas-white-100  ${index === activeIndex ? 'text-cas-black-400' : ''}`}>{children}</span>
    </motion.button>
  )
}
