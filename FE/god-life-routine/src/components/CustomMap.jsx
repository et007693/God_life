import React, { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '../hooks/useKakaoMap';
import useSearchStore from '../store/useSearchStore';



// TODO: 본인 GPS 좌표를 가져오는 걸로 수정 필요 

const CustomMap = () => {

    const {loading,mapRef,map,getUserLocation,getAddress} = useKakaoMap(
    {center: {
        lat: 37.566826,
        lng: 126.9786567,
      },
      level: 3,}
    );
    // useEffect(()=>{
    //   if(loading) return;
    //   if(!map) return;
    //   getUserLocation();
    //     },[loading,map]);
    // useEffect(()=>{
    //   if(map){
    //     map.setCenter(getUserLocation());
    //   }
    // },[map]);
  return (
    
    <div>
      <div ref={mapRef} className='w-full h-real-screen'>


      </div>
    </div>
  )
}

export default CustomMap