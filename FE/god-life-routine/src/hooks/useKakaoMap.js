import { useEffect, useState } from "react"
import { useKakaoLoader } from "react-kakao-maps-sdk"



export const useKakaoMap = () => {
    const [loading,error] = useKakaoLoader({
        appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
        libraries: ['services']
    })
    const [address,setAddress] = useState('');
    const [keyword,setKeyword] = useState('');
    const [position, setPosition] = useState();
    const [searchResult,setSearchResult] = useState(null)
    const {kakao} = window
    const getAddressByLatLng = (lat,lng) =>{
        const geocoder = new kakao.maps.Geocoder()
        const coord = new kakao.maps.LatLng(lat, lng)
        geocoder.coord2Address(coord.getLat(), coord.getLng(), function(result, status) {
            
        })
    }
    // 키워드로 주소를 검색해서 정확한 도로명 주소를 얻는다.
    const searchByKeyword = () =>{
        const ps = new kakao.maps.services.Places()
        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
        ps.keywordSearch(keyword, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // 키워드 검색 후, placesSearchCB 함수를 콜백으로 호출하여 결과 저장
                ps.keywordSearch(keyword,placesSearchCB);
            }
        });
    }
    const placesSearchCB = (data,status,pagination) =>{
        if(status === kakao.maps.services.Status.OK){
            setSearchResult(data)
        }
    }

return { loading, error ,position,searchResult, keyword,setPosition, searchByKeyword,setKeyword}
}