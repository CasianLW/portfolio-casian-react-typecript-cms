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
      initial={{ opacity: 0, x: '100%', y: '100%', scale: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="tabpanel"
      id={`panel-${index + 1}`}
      className={`${index === activeIndex ? 'block' : 'hidden'} opacity-100 tab-panel transition duration-300`}
    >
      {tabCategory === 'packs' ? (
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
            title={tabCategory}
            description={'teafazfaf'}
            coverImage={
              'https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
            }
            activePrice={true}
            price={'350€/j'}
            pointList={['bulletOne', 'bullettwo', 'bulletthree']}
          />
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
          {/* <ServicesComponent title={tabCategory} description={'teafazfaf'} /> */}
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
