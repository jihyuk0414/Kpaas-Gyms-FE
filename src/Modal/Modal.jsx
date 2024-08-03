import React from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
    //모달 창 띄우는 부분입니다.
    // 아직 지식이 없어서... 검색을 썻습니다.

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;