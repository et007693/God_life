import React, { useEffect, useRef } from 'react'
import { useDaumCdn } from '../hooks/useDaumCdn';
import { useKakaoMap } from '../hooks/useKakaoMap';
import SearchAddressResultItem from './SearchAddressResultItem';
import SearchBar from './SearchBar';
const SearchAddress = ({setAddress,setIsSearchMode}) => {
    const {keyword,setKeyword,searchByKeyword, searchResult} = useKakaoMap();
    const handleOnChange = (e) => {
        setKeyword(e.target.value)
    }
    const handleSearch = () => {
        searchByKeyword()
    }
    return (
        <>
            <SearchBar value={keyword} onChange={handleOnChange} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
            {searchResult ? 
            <div className="w-full">
                {searchResult.map((item) => {
                    return <SearchAddressResultItem key={item.id} item={item} />
                })}
            </div>
             : <div>검색 결과가 없습니다.</div>}
        </>
  )
}

export default SearchAddress