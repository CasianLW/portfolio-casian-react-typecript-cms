import { FC } from 'react'

interface Props {
  transform: string | null
}

const BurgerBarComponent: FC<Props> = ({ transform }) => (
  <div className={`h-[2px] rounded-full bg-white transition-all ${transform}`}></div>
)

export default BurgerBarComponent
