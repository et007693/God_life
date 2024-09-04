import React from 'react'
import styles from './SearchAddressResultItem.module.css';
import { useKakaoMap } from '../hooks/useKakaoMap';
import useSearchStore from '../store/useSearchStore';

const SearchAddressResultItem = ({item}) => {
    const {setPosition} = useKakaoMap();
    const {setIsSearchMode} = useSearchStore();
    const handleClick = () => {
        console.log(item);
        setPosition({
            lat: item.y,
            lng: item.x
        })
        setIsSearchMode(false);
    }
  return (
    <div className={styles.searchAddressResultItem} onClick={handleClick}>
        <div className={styles.placeName}>{item.place_name}</div>
        <div className={styles.addressName}>{item.address_name}</div>
    </div>
  )
}

export default SearchAddressResultItem