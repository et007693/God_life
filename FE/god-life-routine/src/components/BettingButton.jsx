import React, {useState} from 'react'

const BettingButton = ({ label, isSelected, onClick }) => {

  const [isClicked, setIsClicked] = useState(false)
  const buttonClick = () => {
    setIsClicked((prevState) => !prevState);
    onClick();
  }
  return (
    <div>
      <button className={`p-6 rounded-full font-bold ${
        isSelected  ? "bg-yellow-300 shadow-md" : "bg-gray-200"
      }`}
      onClick={buttonClick}>
        {label}
      </button>

    </div>
  )
}

export default BettingButton