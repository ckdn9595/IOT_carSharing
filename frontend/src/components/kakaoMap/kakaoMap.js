import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import useCurrentLocation from "../kakaoMap/loc/initLoc"
import CoordsInfo from "../kakaoMap/loc/coordsInfo"
import GetCarInfo from "../kakaoMap/loc/GetCarInfo"
import { useCommonState, useCommonDispatch } from 'src/context/CommonContext';

const Map = () => {
  const dispatch = useCommonDispatch();
  const commonDatas = useCommonState();
  const { location, error } = useCurrentLocation();
  
  let map = null;
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API}&libraries=services,clusterer&autoload=false`;
    document.head.appendChild(mapScript);
    if(location){
      const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
            level: 3
          };
          map = new window.kakao.maps.Map(container, options);
          CoordsInfo(map, dispatch);
          const option = commonDatas.searchOption;
          GetCarInfo(map, option);
          dispatch({ type: 'SET_MAP', data: map });
        });
      };
      mapScript.addEventListener("load", onLoadKakaoMap);
      return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }
  }, [location, commonDatas.searchOption]);
  return (
    <MapContainer id="map"/>
  );
}

const MapContainer = styled.div`
  width:100%;
  height:100%;
`;

export default Map;
