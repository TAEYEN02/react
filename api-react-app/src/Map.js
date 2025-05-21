import { useState, useEffect } from 'react';
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
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            })
            setResult(
              `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`,
            )
          }}
        >
          {/* ?? : null 병합 연산자
          -> 좌변이 null 또는 undefined면 우변값을 사용해라 */}
          <MapMarker position={position ?? center} />

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
//react-kakao-maps-sdk 패키지를 사용하지 않고 오로지 문서에 나와있는 
const KakaoMap = () => {
  useEffect(() => {

    //지도 api를 사용하기 위한 스크립트를 동적으로 생성

    //<script></script>로 만들어달라
    let script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&libraries=services,clusterer,drawing`
    script.async = true; //비동기 로딩 여부
    //외부 스크립트는 언제 로드가 끝날지 보장이 되지 않는다
    //로딩 완료 이후 특정 로직을 실행해야 할 경우 반드시 필요함
    script.onload = () => { //스크립트가 성공적으로 로드된 뒤 실행할 함수
      window.kakao.maps.load(()=>{
        const container = document.getElementById('map');
        const options = {
          center : new window.kakao.maps.LatLng(33.450701,126.570667 ),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      })
    }
    //생성한 script를 <head>에 추가한다.
    document.head.appendChild(script);
  }, []);

  return (
    //지도를 보여줄 div
    <div
        id='map'
        style={{
          width: '500px',
          height: '400px',
        }}
    />
  )
}

export {MapContainer , KakaoMap};