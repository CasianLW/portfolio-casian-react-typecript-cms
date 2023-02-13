import { logoCasianBlanc, showMoreArrows } from '@/assets/shared'
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'

interface ServicesProps {
  title: string
  description: string
}
const ServicesComponent: FC<ServicesProps> = ({ title, description }) => {
  const [activeIndex, setActiveIndex] = useState(false)

  const handleClick = () => {
    setActiveIndex(!activeIndex)
    console.log(activeIndex)
  }
  return (
    <motion.div layout data-activeIndex={activeIndex} className="custom-gradient-primary p-1 rounded-3xl">
      <motion.div
        layout
        data-activeIndex={activeIndex}
        className="text-center mt-2 font-bold text-cas-white-100 text-lg"
      >
        {title}
      </motion.div>
      <motion.div
        layout
        data-activeIndex={activeIndex}
        className="p-5 m-5 bg-cas-white-100 text-cas-black-600 rounded-3xl"
      >
        <motion.p layout data-activeIndex={activeIndex}>
          {description}
        </motion.p>

        <motion.ol className={`${activeIndex === true ? 'block' : 'hidden'}`}>
          <motion.li data-activeIndex={activeIndex}>Point</motion.li>
          <motion.li data-activeIndex={activeIndex}>Point</motion.li>
          <motion.li data-activeIndex={activeIndex}>Point</motion.li>
          <motion.li data-activeIndex={activeIndex}>Point</motion.li>
          <motion.li data-activeIndex={activeIndex}>Point</motion.li>
        </motion.ol>
        <motion.button layout data-activeIndex={activeIndex} onClick={() => handleClick()} className="w-full ">
          {activeIndex === true ? 'Voir Moins' : 'Voir Plus'}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: activeIndex ? 180 : 0 }}
            data-activeIndex={activeIndex}
            // className={`${activeIndex === true ? 'rotate-90' : ''} `}
          >
            <Image
              src={showMoreArrows}
              className={`max-w-[50%] m-auto animate-view-more-bellow py-2`}
              alt="Casian Ciorba Image UX UI Designer et Fullstack Mobile Developer"
              width={24}
              height={24}
            />
          </motion.div>
          {/* {showMoreArrows} */}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
export default ServicesComponent
