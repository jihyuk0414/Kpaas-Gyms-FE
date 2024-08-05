import React, { useEffect, useRef } from 'react';

const KakaoMap = ({gym}) => {

    console.log("Gym",gym.시설명)
  const mapContainer = useRef(null); 
  //맵의 전달을 위해서 만들었슴니다
  const mapRef = useRef(null); 
  //맵 자체를 저장합니다.
  const infowindowRef = useRef(null); 
  //마커 + 특정 위치 정보 저장을 위해 만들었습니다.

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4d6d8c3cc12679e673ba2b73431b4555&libraries=services&autoload=false`;
    //키는 받으시고 env로 빼주세요!
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
        mapRef.current = map; // 객체 세팅

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        infowindowRef.current = infowindow; // 마커찍을 객체 생성

        // 장소 검색용
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(gym.시설명, placesSearchCB);
      });
    };

    // 컴포넌트가 사라지면, script도 풀어버리게! 
    return () => {
      document.head.removeChild(script);
    };
  }, [gym]);



  // 지도에 마커를 표시하는 함수
  const displayMarker = (place) => {
    const { kakao } = window;
    if (!kakao || !mapRef.current) return;

    // 마커찎고, 표시.
    const marker = new kakao.maps.Marker({
      map: mapRef.current,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커클릭 가능하게! 
    kakao.maps.event.addListener(marker, 'click', () => {
      infowindowRef.current.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
      );
      infowindowRef.current.open(mapRef.current, marker);
    });
  };

  // 검색 한 후, 나머지 기능들을 모두 묶어주기. 
  const placesSearchCB = (data, status) => {
    const { kakao } = window;
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 그 장소로 맵의 중심을 변경.
      mapRef.current.setBounds(bounds);
    }
  };

  return (
    <div>
      <div
        id="map"
        ref={mapContainer}
        style={{
          width: '400px',
          height: '350px',
          margin: '0 auto',
          display: 'block',
        }}
      ></div>
    </div>
  );
};

export default KakaoMap;
