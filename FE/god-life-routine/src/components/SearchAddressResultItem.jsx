import React from 'react'
import { useKakaoMap } from '../hooks/useKakaoMap';
import useSearchStore from '../store/useSearchStore';

const SearchAddressResultItem = ({item}) => {

    const {setIsSearchMode,setSelectedAddress,setSelectedPosition,setCenter} = useSearchStore();
    const handleClick = () => {
        setSelectedPosition({
            lat: item.y,
            lng: item.x
        })
        setCenter({
            lat: item.y,
            lng: item.x
        })
        setIsSearchMode(false);
        setSelectedAddress(item.address_name);
    }
  return (
    <div className="w-full border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={handleClick}>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-left">{item.place_name}</h3>
        <p className="text-sm text-gray-600 text-left mt-1">{item.address_name}</p>
      </div>
    </div>
  )
}

export default SearchAddressResultItem