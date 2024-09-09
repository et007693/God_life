import { useCallback, useEffect, useRef, useState } from "react";
import { useKakaoLoader } from "react-kakao-maps-sdk";

export const useKakaoMap = (options) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ["services"],
  });
  const [userLocation, setUserLocation] = useState(null);
  const { kakao } = window;
  // 맵 인스턴스를 설정하는 useEffect
  useEffect(() => {
    if (!kakao) return;
    if (loading && mapRef.current && !map) {
      const kakaoMap = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(options.center.lat, options.center.lng),
        level: options.level,
      });

      const mapInstance = {
        setCenter: (lat, lng) => {
          kakaoMap.setCenter(new window.kakao.maps.LatLng(lat, lng));
        },
        setLevel: (level) => {
          kakaoMap.setLevel(level);
        },
        addMarker: (lat, lng) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
          });
          marker.setMap(kakaoMap);
          return marker;
        },
      };
      setMap(mapInstance);
    }
  }, [loading, options, kakao]);
  const setCenter = useCallback(
    (lat, lng) => {
      map?.setCenter(lat, lng);
    },
    [map]
  );
  const setLevel = useCallback(
    (level) => {
      map?.setLevel(level);
    },
    [map]
  );
  const addMarker = useCallback(
    (lat, lng) => {
      map?.addMarker(lat, lng);
    },
    [map]
  );

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setCenter(latitude, longitude);
          addMarker(latitude, longitude);
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
      if (!map) return;
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
    [map]
  );
  const searchByKeyword = useCallback(
    (keyword) => {
      if (!map) return;
      if(loading) return;
      const places = new kakao.maps.services.Places();
      places.keywordSearch(keyword, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log("검색결과:", result);
          return result;
        } else {
          return null;
        }
      });
    },
    [kakao,loading]
  );
  return {
    mapRef,
    map,
    loading,
    error,
    setCenter,
    setLevel,
    addMarker,
    userLocation,
    getUserLocation,
    getAddress,
    searchByKeyword,
  };
};
