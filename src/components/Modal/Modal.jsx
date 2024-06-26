import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Loader from '../Loader';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ src, alt, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyClose);
    return () => {
      window.removeEventListener('keydown', handleKeyClose);
    };
  }, [onClose]);

  const onImgLoad = () => {
    setIsLoading(false);
  };

  const isImgClick = e => {
    e.target === e.currentTarget && onClose();
  };

  return createPortal(
    <div className="Overlay" onClick={isImgClick}>
      <div className="Modal">
        <img src={src} alt={alt} onLoad={onImgLoad} />

        {isLoading && <Loader isLoading={isLoading} />}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
