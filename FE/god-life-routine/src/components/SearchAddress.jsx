import React, { useEffect, useRef, useState } from 'react'
import { useDaumCdn } from '../hooks/useDaumCdn';
import { useKakaoMap } from '../hooks/useKakaoMap';
import SearchAddressResultItem from './SearchAddressResultItem';
import SearchBar from './SearchBar';
const SearchAddress = ({setAddress,setIsSearchMode}) => {
    const {searchResult,setSearchResult,searchByKeyword} = useKakaoMap();
    const [keyword,setKeyword] = useState('');
    const handleOnChange = (e) => {
        setKeyword(e.target.value)
    }
    const handleSearch = async() => {
        console.log(keyword);
        const result = await searchByKeyword(keyword)
        setSearchResult(()=>result);
    }

    useEffect(() => {
        if (searchResult) {
            // 검색 결과가 변경되면 자동으로 UI 업데이트
            console.log("검색 결과가 업데이트되었습니다:", searchResult);
        }
    }, [searchResult]);
    return (
        <>
            <SearchBar value={keyword} onChange={handleOnChange} onSearchButtonClick={handleSearch} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
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