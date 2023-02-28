import { FC } from 'react'

const ScrollAnimationComponent: FC = () => {
  return (
    <div className=" w-[30px] h-[80px] flex fixed bottom-8 left-[5%] items-center flex-col transition-opacity ease-out duration-500">
      <div className=" ">
        <div className=" w-[0.12rem] h-10 bg-cas-black-400 rounded-full flex">
          <span></span>
        </div>
      </div>

      {/* <div className=" bg-cas-white-100 w-[7.5px] h-[7.5px] rounded-full translate-y-[-550%]  animate-move-point">
        <span></span>
      </div> */}
      <svg
        className="  w-[20px] h-[20px] translate-y-[-56px]  animate-move-point"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.17184 16.818L7.75684 18.232L11.9998 22.475L16.2428 18.232L14.8278 16.818L11.9998 19.647L9.17184 16.818ZM14.8278 7.18202L16.2428 5.76802L11.9998 1.52502L7.75684 5.76802L9.17184 7.18202L11.9998 4.35402L14.8278 7.18202Z"
          fill="white"
        />
        <path
          d="M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export default ScrollAnimationComponent
