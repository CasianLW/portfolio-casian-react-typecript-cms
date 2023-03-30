import Link from 'next/link'
import { FC } from 'react'

interface ListItemProps {
  id: number
  title: string
  isChecked: boolean
  isPriceChecked?: boolean
  onDelete: () => void
  onCheckboxChange: (id: number, isPrice?: boolean) => void
}

const ListItem: FC<ListItemProps> = ({ id, title, isChecked, isPriceChecked, onDelete, onCheckboxChange }) => {
  return (
    <div className="flex w-full max-w-md justify-between pr-3 cms-list-item">
      <div className="grid">
        <label className="items-center flex self-start" htmlFor={`published-${id}`}>
          <input
            className="accent-cas-gradient-purple"
            id={`published-${id}`}
            type="checkbox"
            checked={isChecked}
            onChange={() => onCheckboxChange(id)}
          />
          <span>{isChecked ? 'Public' : 'Private'}</span>
        </label>
        {isPriceChecked !== undefined && (
          <label className="items-center flex self-start" htmlFor={`price-${id}`}>
            <input
              className="accent-cas-gradient-purple"
              id={`price-${id}`}
              type="checkbox"
              checked={isPriceChecked}
              onChange={() => onCheckboxChange(id, true)}
            />
            <span>Price {isPriceChecked ? 'ON' : 'OFF'}</span>
          </label>
        )}
      </div>
      <p className="px-1">
        {title} <br /> <span className="text-cas-white-300 text-xs">id:{id}</span>
      </p>
      <div className="grid">
        <Link href={`services/${id}`} className={'text-green-300 py-1'}>
          Edit
        </Link>
        <a className="text-red-400 py-1" onClick={onDelete}>
          Delete
        </a>
      </div>
    </div>
  )
}
