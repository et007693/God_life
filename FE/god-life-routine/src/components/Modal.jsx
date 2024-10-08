import React, { useEffect } from "react";

const Modal = ({
  children,
  onClickCloseBtn,
  showModal,
  width,
  height,
  buttonText,
  buttonColor,
  onClickButton,
  mutateBettingVote
}) => {
  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  const onClickClose = () => {
    console.log("클릭되고있음");
    onClickCloseBtn();
  };

  const handleButtonClick = () => {
    if (mutateBettingVote) {
      mutateBettingVote(); 
    }
    if (onClickButton) {
      onClickButton(); 
    } 
  };


  return (
    <div
      className={`${
        showModal ? "" : "hidden"
      } fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center -z-1`}
      onClick={onClickClose}
    >
      <div
        className="bg-white p-6 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          height,
        }}
      >
        <button
          onClick={onClickButton} 
          className="absolute top-2 right-3 text-lg text-gray-500 hover:text-black"
        >
          &times; {/* X 표시 */}
        </button>

        <div className="pt-1">{children}</div>
        <button
          // onClick={onClickButton || onClickClose}
          onClick={handleButtonClick}

          className="mt-10 px-5 py-2 text-white rounded"
          style={{
            backgroundColor: buttonColor, 
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
