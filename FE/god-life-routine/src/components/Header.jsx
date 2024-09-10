import React from "react";
import { useNavigate } from "react-router-dom";


const Header = ({title, color, backgroudcolor}) => {
  const navigate = useNavigate();
const colorClass = {
  orange: 'text-orange-500',
  white: 'text-white',
}
const backgroundColorClass = {
  orange: 'bg-orange-500',
  white: 'bg-white',
}
const onClickBack = () => {
  if (navigate.length > 2) {
    navigate(-1);
  } else {
    navigate('/');
  }
}
  return (
    <div className="flex justify-center items-center p-4">
      <button className="absolute left-4 top-4 text-black" onClick={onClickBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <h1 className={`${colorClass[color]} text-2xl font-bold`}>{title}</h1>
    </div>

  );
};

export default Header;
