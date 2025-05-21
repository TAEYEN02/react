import React, { useEffect, useState } from 'react';  // React, useEffect, useState 훅을 불러옴
import { Map, MapMarker } from "react-kakao-maps-sdk";  // 카카오 맵과 마커를 위한 컴포넌트 불러옴

const MapSearch = () => {
  const [info, setInfo] = useState(null);  // 사용자가 클릭한 마커의 정보를 저장할 상태
  const [markers, setMarkers] = useState([]);  // 지도에 표시될 마커들의 리스트 상태
  const [map, setMap] = useState(null);  // 생성된 카카오 맵 객체를 저장할 상태
  const [keyword, setKeyword] = useState('이태원 맛집');  // 검색어를 저장할 상태, 기본값은 '이태원 맛집'

  // 카카오 장소 검색 API를 호출하는 함수
  const searchPlaces = (searchKeyword) => {
    // map 객체와 카카오 지도 API가 로드되지 않았으면 함수 종료
    if (!map || !window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      return;
    }

    const ps = new window.kakao.maps.services.Places();  // 카카오 장소 검색 객체 생성

    // 키워드로 장소 검색 실행
    ps.keywordSearch(searchKeyword, (data, status) => {
      // 검색이 성공적으로 완료되었을 때
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();  // 지도 범위를 설정하기 위한 객체 생성
        // 검색된 장소 리스트를 마커로 변환
        const newMarkers = data.map((place) => ({
          position: {
            lat: place.y,  // 장소의 위도
            lng: place.x,  // 장소의 경도
          },
          content: place.place_name,  // 마커에 표시할 장소명
        }));

        // 모든 마커의 위치를 기준으로 지도의 범위를 조정
        newMarkers.forEach(marker => bounds.extend(new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng)));
        
        setMarkers(newMarkers);  // 마커 리스트를 상태로 업데이트
        map.setBounds(bounds);  // 지도를 새로 계산한 범위로 설정
      } else {
        alert('검색 결과가 없습니다.');  // 검색 결과가 없을 때 알림 메시지 표시
      }
    });
  };

  // 맵이 처음 생성될 때 기본 검색어로 장소를 검색하는 useEffect 훅
  useEffect(() => {
    if (map) searchPlaces(keyword);  // 맵이 생성되면 기본 키워드로 장소 검색 실행
  }, [map]);  // map 객체가 생성될 때마다 실행

  // 검색 버튼 클릭 시 검색어로 장소 검색을 실행하는 함수
  const handleSearch = () => {
    // 검색어가 비어있을 때 경고 메시지
    if (keyword.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    searchPlaces(keyword);  // 입력된 검색어로 장소 검색 실행
  };

  return (
    <div>
      {/* 검색창과 버튼 */}
      <div style={{ marginBottom: "10px" }}>  {/* 검색창과 버튼 사이에 약간의 간격을 줌 */}
        <input
          type="text"
          value={keyword}  // 검색어 상태를 입력창의 값으로 설정
          onChange={(e) => setKeyword(e.target.value)}  // 입력할 때마다 검색어 상태를 업데이트
          placeholder="검색어를 입력하세요"  // 입력창에 표시할 힌트 텍스트
          style={{ padding: "5px", marginRight: "5px" }}  // 입력창의 패딩과 간격을 설정
        />
        <button onClick={handleSearch}>검색</button>  {/* 클릭 시 handleSearch 함수 호출 */}
      </div>

      {/* 지도 표시 */}
      <Map
        center={{  // 지도 초기 설정 시의 중심 좌표 (서울 시청 기준)
          lat: 37.566826,  // 서울 중심의 위도
          lng: 126.9786567,  // 서울 중심의 경도
        }}
        style={{  // 지도의 크기 설정
          width: "100%",  // 전체 너비 100%
          height: "350px",  // 높이 350px
        }}
        level={3}  // 확대 레벨 설정 (숫자가 작을수록 더 확대됨)
        onCreate={setMap}  // 맵이 처음 생성될 때 setMap 함수를 호출해 map 상태를 설정
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`marker-${index}`}  // 마커에 고유한 key를 설정 (리스트 렌더링을 위해 필요)
            position={marker.position}  // 마커의 위치 설정
            onMouseOver={() => setInfo(marker)}  // 마커 클릭 시 해당 마커 정보를 info 상태에 저장
            onMouseOut={()=>setInfo(null)}
          >
            {/* 선택된 마커에 정보 표시 */}
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div> 
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
};

export default MapSearch; 
