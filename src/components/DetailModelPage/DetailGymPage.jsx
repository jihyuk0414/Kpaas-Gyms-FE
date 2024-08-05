import React, { useState, useEffect } from 'react'; // React를 import합니다.
import axios from 'axios';
import KakaoMap from '../MapComponent/KakaoMap';

function DetailGymPage({ location, onClose }) {
  const [gymswithLocation, setGymswithLocation] = useState(null);
  const [openMapForGym, setOpenMapForGym] = useState(null); // 클릭된 gym ID를 관리

  useEffect(() => {
    const fetchGymswithLocation = async () => {
      try {
        let response;
        if (location === "전체") {
          response = await axios.get('/post/gyms/all');
        } else {
          response = await axios.get('/post/gyms/all', {
            params: { location: location }
          });
        }
        console.log(response.data);
        setGymswithLocation(response.data);
      } catch (error) {
        console.error('상세부 가져오기 실패', error);
      }
    };

    if (location) {
      fetchGymswithLocation();
    }
  }, [location]);

  const handleMapToggle = (gymId) => {
    setOpenMapForGym(openMapForGym === gymId ? null : gymId); // 토글 기능
  };

  return (
    <div className="modal">
      <h2>{location} 지역의 센터 목록입니다.</h2>
      {gymswithLocation ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>시설명</th>
                <th>구 단위 지역</th>
                <th>시 단위 지역</th>
                <th>전화번호</th>
                <th>홈페이지</th>
                <th>지도 보기</th>
              </tr>
            </thead>
            <tbody>
              {gymswithLocation.data.map(gym => (
                <React.Fragment key={gym.번호}>
                  <tr>
                    <td>{gym.시설명}</td>
                    <td>{gym.소재지}</td>
                    <td>{gym.시_도}</td>
                    <td>{gym.전화번호}</td>
                    <td>
                      <a href={`http://${gym.홈페이지}`} target="_blank" rel="noopener noreferrer">
                        {gym.홈페이지}
                      </a>
                    </td>
                    <td>
                      <button onClick={() => handleMapToggle(gym.번호)}>지도 보기</button>
                    </td>
                  </tr>
                  {openMapForGym === gym.번호 && (
                    <tr>
                      <td colSpan="6">
                        <KakaoMap gym={gym} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>로딩 중입니다.. 잠시만 기다려주세요!</p>
      )}
      <button onClick={onClose}>이걸 클릭하면 돌아가요!</button>
    </div>
  );
}

export default DetailGymPage;
