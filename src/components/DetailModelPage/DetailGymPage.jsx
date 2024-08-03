import { useState, useEffect } from 'react';
import axios from 'axios';

function DetailGymPage({ location, onClose }) {
  const [gymswithlocation, setGymswithLocation] = useState(null);

  useEffect(() => {
    const fetchGymswithLocation = async () => {
        try {
            let response ;
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

  return (
    <div className="modal">
      <h2>{location} 지역의 센터 목록입니다.</h2>
      {gymswithlocation ? (
        <div>
           <div>
          <table>
            <thead>
              <tr>
                <th>시설명</th>
                <th>구 단위 지역</th>
                <th>시 단위 지역</th>
                <th>전화번호</th>
                <th>홈페이지</th>
              </tr>
            </thead>
            <tbody>
              {gymswithlocation.data.map(gym => (
                <tr key={gym.번호}>
                  <td>{gym.시설명}</td>
                  <td>{gym.소재지}</td>
                  <td>{gym.시_도}</td>
                  <td>{gym.전화번호}</td>
                  <td>
                    <a href={`http://${gym.홈페이지}`} target="_blank" rel="noopener noreferrer">
                      {gym.홈페이지}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      ) : (
        <p>로딩 중입니다.. 잠시만 기다려주세요!</p>
      )}
      <button onClick={onClose}> 이걸 클릭하면 돌아가요! </button>
    </div>
  );
}

export default DetailGymPage;