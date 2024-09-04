import React, { useEffect, useRef } from 'react'
import { useDaumCdn } from '../hooks/useDaumCdn';
import { useKakaoMap } from '../hooks/useKakaoMap';
import SearchAddressResultItem from './SearchAddressResultItem';
import styles from './SearchAddress.module.css';
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
            <div style={{ position: 'relative', width: '100%' }}>
              <div className={styles.searchAddressInputContainer}>
                <input
                placeholder='주소를 입력하세요'
                className={styles.searchAddressInput}
                type="text"
                value={keyword}
                onChange={handleOnChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              </div>
              <button
                onClick={handleSearch}
                className={styles.searchAddressButton}
                
              >
                검색
              </button>
            </div>
            {searchResult ? 
            <div className={styles.searchAddressResult}>
                {searchResult.map((item) => {
                    return <SearchAddressResultItem key={item.id} item={item} />
                })}
            </div>
             : <div>검색 결과가 없습니다.</div>}
        </>
  )
}

export default SearchAddress