import React, { useEffect } from 'react'

const Modal = ({children,onClickCloseBtn,showModal}) => {
    useEffect(()=>{
        console.log(showModal);
        
    },[showModal])
const onClickClose = ()=>{
    console.log("클릭되고있음");
    onClickCloseBtn();
}

  return (
    
<div className={`${showModal ? "": "hidden"} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center -z-1`}
  onClick={onClickClose}
>
      <div className="bg-white p-6 rounded-lg" onClick={(e)=>e.stopPropagation()}>
        <div>{children}</div>
        <button
          onClick={onClickClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>  )
}

export default Modal