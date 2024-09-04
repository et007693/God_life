import { useEffect, useState } from "react"
import { useKakaoLoader } from "react-kakao-maps-sdk"



export const useKakaoMap = () => {
    const [loading,error] = useKakaoLoader({
        appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    })
    const [address,setAddress] = useState('');
  const [position, setPosition] = useState();

    const {kakao} = window
    const getAddress = (lat,lng) =>{
        const geocoder = new kakao.maps.Geocoder()
        const coord = new kakao.maps.LatLng(lat, lng)
        geocoder.coord2Address(coord.getLat(), coord.getLng(), function(result, status) {
            
        })
    }

return { loading, error ,position,setPosition}
}