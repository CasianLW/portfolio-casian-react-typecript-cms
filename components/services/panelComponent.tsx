import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import ServicesComponent from './servicesComponent'

interface PanelProps {
  index: number
  activeIndex: number
  tabCategory: string
  serviceList: any[]
  // serviceList: never[] | []
}

const PanelComponent: FC<PanelProps> = ({ index, activeIndex, tabCategory, serviceList }) => {
  // const [categoryFiltred, setCategoryFiltred] = useState([])
  const [categoryFiltred, setCategoryFiltred] = useState<any[]>([])

  useEffect(() => {
    const filtred = serviceList.filter((service: any) => service.category == tabCategory)
    setCategoryFiltred(filtred)
  }, [serviceList, tabCategory])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: '100%', y: '100%', scale: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="tabpanel"
      id={`panel-${index + 1}`}
      className={`${index === activeIndex ? 'block' : 'hidden'} opacity-100 tab-panel transition duration-300`}
    >
      <motion.div
        layout
        initial={{ opacity: 0, x: '100%', y: '100%', scale: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1 }}
        className="flex gap-3 md:gap-y-20 flex-wrap justify-between"
      >
        {Array.isArray(categoryFiltred) &&
          categoryFiltred.map((service: any, i) => {
            return (
              <ServicesComponent
                key={i}
                title={service.title}
                description={service.description}
                coverImage={service.coverImage}
                activePrice={service.showPrice}
                price={service.priceDetails}
                pointList={service.points}
              />
            )
          })}
      </motion.div>
    </motion.div>
  )
}

export default PanelComponent
