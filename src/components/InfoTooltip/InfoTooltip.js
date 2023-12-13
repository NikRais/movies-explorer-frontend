import React from 'react';
import successIcon from '../../images/Success-icon.svg';
import failIcon from '../../images/Fail-icon.svg';

import "./InfoTooltip.css";

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <img
          src={isSuccess ? successIcon : failIcon}
          alt={
            isSuccess ? 'Успешно' : 'Ошибка'
          }
          className="popup__signup-icon"
        />
        <p>{JSON.stringify(message)}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
