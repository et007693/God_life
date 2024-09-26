import { useCallback, useEffect, useRef, useState } from "react";
import { useKakaoLoader } from "react-kakao-maps-sdk";

export const useKakaoMap = (options) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const { kakao } = window;
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const getAddress = useCallback(
    (lat, lng) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(lat, lng, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log("주소:", result[0].address.address);
          return result[0].address.address;
        } else {
          return null;
        }
      });
    },
    []
  );
  const searchByKeyword = useCallback(
   (keyword) => {
      const places = new kakao.maps.services.Places();
      const result = places.keywordSearch(keyword, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log("검색결과:", result);
          setSearchResult(result);
        } else {
          return null;
        }
      });
    },
    [kakao]
  );
  return {
    mapRef,
    searchResult,
    setSearchResult,
    userLocation,
    getUserLocation,
    getAddress,
    searchByKeyword,
  };
};
