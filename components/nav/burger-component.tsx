import { FC } from 'react'
import BurgerBarComponent from './burger-bar-component'

import { useNavSettingsContext } from '@/context/nav-settings-context'

const BurgerComponent: FC = () => {
  const { setNavIsClosed, navIsClosed, closing, setClosing } = useNavSettingsContext()

  const handleClick = () => {
    console.log(closing)
    if (closing) return
    setNavIsClosed(!navIsClosed)
    if (navIsClosed) {
      setClosing(true)
      window.setTimeout(() => {
        setClosing(false)
      }, 800)
    }
  }

  return (
    <div
      className="absolute top-5 right-[5vw] grid grid-cols-[auto_22px] items-center gap-2 text-[17px] lg:hidden"
      onClick={handleClick}
    >
      <span>{navIsClosed ? 'Menu' : 'Fermer'}</span>
      <div className="grid gap-[4px]">
        <BurgerBarComponent transform={navIsClosed ? null : 'translate-y-[3.5px] rotate-45'} />
        <BurgerBarComponent transform={navIsClosed ? 'w-3/4' : '-translate-y-[3.5px] -rotate-45'} />
      </div>
    </div>
  )
}

export default BurgerComponent
