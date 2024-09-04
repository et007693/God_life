import React, { useEffect, useRef } from 'react'
import { useDaumCdn } from '../hooks/useDaumCdn';

const SearchAddress = ({setAddress,setIsSearchMode}) => {
    // 다음 cdn 로드하는 커스텀 훅
    const addressContainerRef = useRef();
    // 커스텀 훅을 사용해서 띄우긴 했는데 안쓸듯거같음
    const {address, setAddressFromCdn} = useDaumCdn(addressContainerRef);


    return (
    <div ref={addressContainerRef} onClick={()=>setIsSearchMode(false)}>SearchAddress</div>
  )
}

export default SearchAddress