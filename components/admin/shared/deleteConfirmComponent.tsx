import { FC, MouseEventHandler } from 'react'

interface DeleteConfirmComponentInterface {
  deleteFunction: MouseEventHandler<HTMLButtonElement>
  cancelDelete: MouseEventHandler<HTMLButtonElement>
  itemName: string
}
const DeleteConfirmComponent: FC<DeleteConfirmComponentInterface> = ({ deleteFunction, itemName, cancelDelete }) => {
  return (
    <div className="fixed bg-cas-white-100 rounded-xl flex top-0 left-[50%]">
      <div>Confirm delete {itemName} ?</div>
      <div>
        <button onClick={deleteFunction}>Yes</button>
        <button onClick={cancelDelete}>No</button>
      </div>
    </div>
  )
}
export default DeleteConfirmComponent
