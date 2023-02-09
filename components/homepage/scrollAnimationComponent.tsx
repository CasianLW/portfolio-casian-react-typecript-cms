import { FC } from 'react'

const ScrollAnimationComponent: FC = () => {
  return (
    <div className=" w-[30px] h-[80px] flex fixed bottom-8 left-[5%] items-center flex-col transition-opacity ease-out duration-500">
      <div className=" ">
        <div className=" w-[0.12rem] h-10 bg-cas-black-400 rounded-full flex">
          <span></span>
        </div>
      </div>

      <div className=" bg-cas-white-100 w-[7.5px] h-[7.5px] rounded-full translate-y-[-550%]  animate-move-point">
        <span></span>
      </div>
    </div>
  )
}

export default ScrollAnimationComponent
