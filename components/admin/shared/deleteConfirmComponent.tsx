import { FC, MouseEventHandler } from 'react'

interface DeleteConfirmComponentInterface {
  deleteFunction: MouseEventHandler<HTMLButtonElement>
  cancelDelete: MouseEventHandler<HTMLButtonElement>
  itemName: string
  active: boolean
}
const DeleteConfirmComponent: FC<DeleteConfirmComponentInterface> = ({
  deleteFunction,
  itemName,
  cancelDelete,
  active,
}) => {
  return (
    <div className={`fixed top-0 grid  left-0 w-[100vw] h-[100vh]  ${active ? 'block' : 'hidden'}`}>
      <button
        onClick={cancelDelete}
        className="stack-item cursor-default w-full h-full bg-cas-black-600 bg-opacity-70  "
      ></button>
      <div className="stack-item block  p-10 text-cas-black-600 bg-cas-white-100 rounded-xl text-center m-auto w-60 md:w-1/3 mt-14">
        <div>
          Confirm delete <span className="font-bold">{itemName}</span> ?
        </div>
        <div>
          <button className="px-2" onClick={deleteFunction}>
            Yes
          </button>
          <button className="px-2" onClick={cancelDelete}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}
export default DeleteConfirmComponent
