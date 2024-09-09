import React, { useEffect, useRef, useState } from 'react'
import { useDaumCdn } from '../hooks/useDaumCdn';
import { useKakaoMap } from '../hooks/useKakaoMap';
import SearchAddressResultItem from './SearchAddressResultItem';
import SearchBar from './SearchBar';
const SearchAddress = ({setAddress,setIsSearchMode}) => {
    const { searchResult,loading,error,searchByKeyword} = useKakaoMap();
    const [keyword,setKeyword] = useState('');
    const handleOnChange = (e) => {
        setKeyword(e.target.value)
    }
    const handleSearch = () => {
        console.log(keyword);
        searchByKeyword(keyword);
    }
    return (
        <>
            <SearchBar value={keyword} onChange={handleOnChange} onSearchButtonClick={handleSearch} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
            {
                loading && <div>로딩중...</div>
            }
            {
                error && <div>에러가 발생했습니다.</div>
            }
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