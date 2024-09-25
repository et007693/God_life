import React from 'react'

const MyPageMenuListItem = ({menu}) => {
  return (
    <li className='flex justify-between gap-x-6 py-5 px-3' onClick={menu.onClick}>
          <div className='min-w-0 gap-x-4'>
            <div className='min-w-0 flex-auto'>
            <p className="text-lg font-semibold leading-6 text-gray-900">{menu.name}</p>
            </div>
          </div>
        </li>
  )
}

export default MyPageMenuListItem