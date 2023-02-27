import { AnimatePresence, motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import ServicesComponent from './servicesComponent'

interface PanelProps {
  index: number
  activeIndex: number
  tabCategory: string
  serviceList: never[] | []
}

const PanelComponent: FC<PanelProps> = ({ index, activeIndex, tabCategory, serviceList }) => {
  const [categoryFiltred, setCategoryFiltred] = useState([])

  // setCategoryFiltred(serviceList.filter((service: any) => (service.category = tabCategory)))
  // console.log(categoryFiltred)

  useEffect(() => {
    // if (serviceList) {
    //   setFiltred(projects)
    //   return
    // }
    // const filtred = serviceList.filter((service: any) => service.category.includes('autre'))
    const filtred = serviceList.filter((service: any) => (service.category = tabCategory))
    setCategoryFiltred(filtred)
    // console.log(categoryFiltred)
  }, [serviceList, tabCategory])

  return (
    <motion.div
      layout
      data-activeIndex={activeIndex}
      initial={{ opacity: 0, x: '100%', y: '100%', scale: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="tabpanel"
      id={`panel-${index + 1}`}
      className={`${index === activeIndex ? 'block' : 'hidden'} opacity-100 tab-panel transition duration-300`}
    >
      {/* <div>{serviceList}</div> */}
      <div className="mt-10">
        {Array.isArray(categoryFiltred) &&
          categoryFiltred.map((service: any, i) => {
            // const { navLink, supplementaryClasses } = link
            // const href = getPathFromNavLink(navLink)
            return (
              <div
                key={i}
                // getWorksList={getWorksList}
              >
                {service.published} <br />
                {service.title} <br />
                {service._id} <br />
                {service.description} <br />
                {service.category} <br />
              </div>
            )
          })}
      </div>

      {tabCategory === 'complets' ? (
        <motion.div
          layout
          data-activeIndex={activeIndex}
          initial={{ opacity: 0, x: '100%', y: '100%', scale: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
          className="flex gap-3 flex-wrap"
        >
          <ServicesComponent
            title={'Service freelance'}
            description={'teafazfaf'}
            coverImage={
              'https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
            }
            activePrice={true}
            price={'350€/j'}
            pointList={['bulletOne', 'bullettwo', 'bulletthree']}
          />
        </motion.div>
      ) : tabCategory === 'specifics' ? (
        <motion.div
          layout
          data-activeIndex={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex gap-3 flex-wrap"
        >
          {/* <ServicesComponent title={tabCategory} description={'teafazfaf'} /> */}
        </motion.div>
      ) : tabCategory === 'autre' ? (
        <motion.div
          layout
          data-activeIndex={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex gap-3 flex-wrap"
        >
          {/* <ServicesComponent title={tabCategory} description={'teafazfaf'} /> */}
        </motion.div>
      ) : (
        ''
      )}
      {/* <ServicesComponent title={tabCategory} description={'teafazfaf'} /> */}
    </motion.div>
  )
}

export default PanelComponent
