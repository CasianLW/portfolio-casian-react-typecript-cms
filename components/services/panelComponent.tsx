import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import ServicesComponent from './servicesComponent'

interface PanelProps {
  index: number
  activeIndex: number
  tabCategory: string
}

const PanelComponent: FC<PanelProps> = ({ index, activeIndex, tabCategory }) => {
  return (
    <motion.div
      layout
      data-activeIndex={activeIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="tabpanel"
      id={`panel-${index + 1}`}
      className={`${index === activeIndex ? 'block' : 'hidden'} opacity-100 tab-panel transition duration-300`}
    >
      <AnimatePresence>
        {tabCategory === 'packs' ? (
          <motion.div
            layout
            data-activeIndex={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 flex-wrap"
          >
            <AnimatePresence>
              <ServicesComponent title={tabCategory} description={'teafazfaf'} />
              <ServicesComponent title={tabCategory} description={'teafazfaf'} />
              <ServicesComponent title={tabCategory} description={'teafazfaf'} />
              <ServicesComponent title={tabCategory} description={'teafazfaf'} />
            </AnimatePresence>
          </motion.div>
        ) : tabCategory === 'specific' ? (
          <motion.div
            layout
            data-activeIndex={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 flex-wrap"
          >
            <ServicesComponent title={tabCategory} description={'teafazfaf'} />
          </motion.div>
        ) : tabCategory === 'autres' ? (
          <motion.div
            layout
            data-activeIndex={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 flex-wrap"
          >
            <ServicesComponent title={tabCategory} description={'teafazfaf'} />
            <ServicesComponent title={tabCategory} description={'teafazfaf'} />
          </motion.div>
        ) : (
          ''
        )}
      </AnimatePresence>
      {/* <ServicesComponent title={tabCategory} description={'teafazfaf'} /> */}
    </motion.div>
  )
}

export default PanelComponent
