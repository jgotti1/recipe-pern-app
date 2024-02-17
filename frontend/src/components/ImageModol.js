import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const ImageModal = ({photoUrl}) => {
  return (
    <Modal show={false} onHide={false} dialogClassName="image-modal">
      <Modal.Header closeButton>
        <Modal.Title>Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={photoUrl} fluid />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
