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
      <div className="flex justify-around items-center pb-5 w-full">
        {" "}
        <h3 className="text-xl font-bold">설정된 집 위치</h3>
        <button
          className="flex items-center justify-center text-2xl"
          onClick={onclickSettingBtn}
        >
          <IoMdSettings />
        </button>
      </div>
      <Map
        level={3}
        className="w-60 h-60 -z-1"
        center={{
          lat: data.rule.ruleLocation.lat,
          lng: data.rule.ruleLocation.lng,
        }}
        onClick={onclickMap}
      >
        <MapMarker position={data.rule.ruleLocation} />
      </Map>
    </div>
  );
};

export default SettedHomeMap;
