import React, { useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
const MapContainer = () => {
  const [result, setResult] = useState();
  const [position, setPosition] = useState(null);

  const center = {
    // 지도의 중심좌표
    lat: 33.450701,
    lng: 126.570667,
  }
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
  return (
    <div>
      <h2>카카오지도 API</h2>
      <div style={style}>
        <Map
          center={center} //지도 중심 좌표 lat : 위도, lng : 경도
          style={{ width: '600px', height: '600px' }} //지도의 너비와 높이
          level={3}
          onClick={(event, mouseEvent) => {
            const latlng = mouseEvent.latLng;
            setPosition({
              lat:latlng.getLat(),
              lng:latlng.getLng(),
            })
            setResult(
              `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`,
            )
          }}
        >
          {/* ?? : null 병합 연산자
          -> 좌변이 null 또는 undefined면 우변값을 사용해라 */}
          <MapMarker position={position ?? center}/>
         
        </Map>

      </div>
      <div>
        <p>
          {result === "" ? "지도를 클릭해주세요" : result}
        </p>
      </div>
    </div>

  );
};

export default MapContainer;