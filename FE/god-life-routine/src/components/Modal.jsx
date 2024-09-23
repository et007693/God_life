import React, { useEffect } from 'react'

const Modal = ({children,onClose,showModal}) => {
    useEffect(()=>{
        
    },[showModal])
if(!showModal) return null;
const onClickClose = ()=>{
    console.log("클릭되고있음");
    onClose(false);
}
  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        {children}
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