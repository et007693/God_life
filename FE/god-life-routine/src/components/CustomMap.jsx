import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '../hooks/useKakaoMap';
import useSearchStore from '../store/useSearchStore';



// TODO: 본인 GPS 좌표를 가져오는 걸로 수정 필요 

const CustomMap = () => {
    const {position, setPosition} = useKakaoMap();
    const {center} = useSearchStore();
    const onMapClick = (_,mouseEvent) => {
        const latlng = mouseEvent.latLng
        setPosition({
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        })
      }
  return (
    
    <Map
      id="map"
        center={center}
        className='w-full h-full'
        level={3}
        onClick={onMapClick}
      >
        <MapMarker position={position ?? center }>
          {position &&
          <p>
            선택한 위치는 {position.lat} {position.lng} 입니다
          </p>
          }
        </MapMarker>
      </Map>
  )
}

export default CustomMap