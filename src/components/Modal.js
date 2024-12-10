import React from 'react';
import '../styles/css/site/modal/modal.css';

const Modal = ({ children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                {children}
            </div>
        </div>
    );
};

export default Modal;
