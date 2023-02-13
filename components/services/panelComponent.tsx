import { FC } from 'react'
import ServicesComponent from './servicesComponent'

interface PanelProps {
  index: number
  activeIndex: number
  tabCategory: string
}

const PanelComponent: FC<PanelProps> = ({ index, activeIndex, tabCategory }) => {
  return (
    <div
      role="tabpanel"
      id={`panel-${index + 1}`}
      className={`${index === activeIndex ? 'block' : 'hidden'} opacity-100 tab-panel p-6 transition duration-300`}
    >
      <ServicesComponent title={tabCategory} description={'teafazfaf'} />
    </div>
  )
}

export default PanelComponent
