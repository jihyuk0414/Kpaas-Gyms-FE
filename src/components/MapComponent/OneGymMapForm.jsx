import React from 'react';
import KakaoMap from './KakaoMap';

const OneGymMapForm = ({ gym , onClose}) => {
  return (
    <div>
      <h3>{gym.시설명}</h3>

      <KakaoMap gym ={gym}/>


      <button onClick={() => onClose(false)}> 이걸 클릭하면 돌아가요! </button>
    </div>
  );
}

export default OneGymMapForm;