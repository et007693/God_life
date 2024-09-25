import React from 'react'

const TodoItem = ({isDone,title, onclick}) => {
  return (
    <li className="">
    <a
      href="#"
      className="flex items-center p-5 text-left font-bold text-gray-900 rounded-sm bg-white shadow-md hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
      onClick={onclick}
    >
      <input
        type="checkbox"
        className="w-5 h-5 accent-orange-600 rounded-lg"
        checked={isDone}
        readOnly
      />
      <span className={`flex-1 ms-5 whitespace-nowrap ${isDone ? "line-through text-gray-400"  : ""}`}>
        {title}
      </span>
    </a>
  </li>
  )
}

export default TodoItem