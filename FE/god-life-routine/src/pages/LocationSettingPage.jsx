import CustomMap from "../components/CustomMap";
import SearchAddress from "../components/SearchAddress";
import useSearchStore from "../store/useSearchStore";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import {  useNavigate } from "react-router-dom";
import { settingMyHomeLocation } from "../api/locationApi";
import { useQueryClient } from "@tanstack/react-query";
import { getMainPageData } from "../api/mainPageApi";


const LocationSettingPage = () => {
  // 카카오맵 API를 이용한 지도 구현
  // 전역변수를 사용해 다른 컴포넌트에서도 사용할 수 있도록함.
  const { isSearchMode,selectedAddress,center, updatePositionWithGeolocation,selectedPosition,setSelectedPosition} = useSearchStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onClickRegistButton = async () => {
    // TODO: 장소 등록 로직 추가 -api 연결
    const requestLocation = {
      "locationName": selectedAddress,
      lat: selectedPosition.lat,
      lng: selectedPosition.lng,
    }
    await queryClient.invalidateQueries({queryKey:["mainPageData"]});
    await settingMyHomeLocation(requestLocation).then(async (data)=>{
      const response = await getMainPageData();
      console.log("response",response);
      if(response && response.locationSet){
        navigate("/");
      }
    });
  }
  // 2024-09-04 작업시작
  return (
    <>
      <div className="w-full h-real-screen flex flex-col">
        <Header title="주소 등록" />
        <p className="text-center text-gray-500 mt-12">미션 수행을 위해 장소를 등록해주세요</p>
        {/* 주소찾기 버튼을 누르면 주소찾기 모드로 변경 */}
        {isSearchMode ? (
          <div className="flex-grow overflow-hidden">
            <SearchAddress />
          </div>
        ) : (

          <div className="flex-grow flex flex-col">
            <SearchBar value={selectedAddress} onChange={()=>{}} />
            <div className="flex-grow overflow-hidden">
              <CustomMap />
            </div>
            <button
              className="fixed z-10 bottom-0 left-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={onClickRegistButton}
            >
              장소 등록
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default LocationSettingPage;
