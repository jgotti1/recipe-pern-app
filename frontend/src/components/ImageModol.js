import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const ImageModal = ({ photoUrl, showModal, setShowModal }) => {
  
    const handleClose = () => {
    setShowModal(false); // Set showModal to false when closing the modal
    };
  
  return (
    <Modal show={showModal} onHide={handleClose} dialogClassName="image-modal">
      <Modal.Header closeButton>
        <Modal.Title>Recipe Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={photoUrl} fluid />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
