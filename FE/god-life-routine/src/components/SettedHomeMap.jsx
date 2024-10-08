import React from "react";
import { IoMdSettings } from "react-icons/io";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const SettedHomeMap = ({ data, onclickSettingBtn, onclickMap }) => {
  return (
    <div
      className="flex flex-col -z-1 items-center pb-5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between items-center mb-4 w-full">
        <h3 className="text-md text-gray-600 font-semibold">설정된 집 위치</h3>
        <button
          className="flex items-center justify-center text-xl"
          onClick={onclickSettingBtn}
        >
          <IoMdSettings />
        </button>
      </div>
      <Map
        level={3}
        className="w-60 h-60 -z-1"
        center={{
          lat: data.data.lat,
          lng: data.data.lng,
        }}
        onClick={onclickMap}
        draggable={false}
      >
        <MapMarker position={{lat: data.data.lat, lng: data.data.lng}} />
      </Map>
    </div>
  );
};

export default SettedHomeMap;
