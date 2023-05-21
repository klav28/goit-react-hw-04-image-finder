import { useEffect } from 'react';

import StyledModal from './Modal.component';
import PropTypes from 'prop-types';

export const ModalWindow = ({ largeImage, modalClose }) => {
  useEffect(() => {
    const handleEscape = ev => {
      if (ev.code === 'Escape') modalClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalClose]);

  return (
    <StyledModal.Backdrop onClick={modalClose}>
      <StyledModal>
        <img src={largeImage.largeImageURL} alt={largeImage.tags} />
      </StyledModal>
    </StyledModal.Backdrop>
  );
};

ModalWindow.propTypes = {
  largeImage: PropTypes.object.isRequired,
};
