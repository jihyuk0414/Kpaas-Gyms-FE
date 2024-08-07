import { useState, useEffect } from 'react';
import axios from 'axios';
import DetailGymPage from '../DetailModelPage/DetailGymPage';
import { LocationList } from '../../constant/LocationList.js';
import Modal from '../../Modal/Modal.jsx';
import OneGymMapForm from '../MapComponent/OneGymMapForm.jsx';

function Mainsmallpage() {
  const [gymsData, setGymsData] = useState(null);
  const [location, setLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState();
  const [openOneMap,setOpenOneMap] = useState(false);

  //조그만한 메인창 부분입니다. 
  useEffect(() => {
    const fetchGymsData = async () => {
      try {
        const response = await axios.get('http://default-api-gateway-05ed6-25524816-d29a0f7fe317.kr.lb.naverncp.com:8761/post/gyms/main');
        console.log(response.data);
        setGymsData(response.data);
      } catch (error) {
        console.error('받던 도중 에러 발생 부분!', error);
      }
    };

    fetchGymsData();
  }, []);

  const handleGymSelect = (gym) => {
    setOpenOneMap(true);
    setSelectedGym(gym);
  };

  //카테고리만 선택하면 모달이 나오게 했습니다.
  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    if (selectedLocation) {
      openModal(); 
    } else {
      setIsModalOpen(false); 
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* 카테고리 선택 부분 임니다*/}
      <p>상세 검색을 해보세요</p>
  
      <select value={location} onChange={handleLocationChange}>
        <option value="">카테고리 선택</option>
        {LocationList.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DetailGymPage location={location} onClose={closeModal} />
        </Modal>
      )}
      
      {gymsData && (
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
              {gymsData.data.map(gym => (
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
                  <td>
                    <button onClick={() => handleGymSelect(gym)}>지도 보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {
        openOneMap  && (
          <Modal onClose={() => setOpenOneMap(false)}>
            <OneGymMapForm gym={selectedGym} onClose={setOpenOneMap}/>
          </Modal>
        )
      }
    </div>
  );
}

export default Mainsmallpage;
