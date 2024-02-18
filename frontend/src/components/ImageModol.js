
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const ImageModal = ({ photoUrl, photoUrl2, showModal, setShowModal}) => {
  
 



  const handleClose = () => {
      setShowModal(false); // Set showModal to false when closing the modal
    };

  return (
    
    <Modal show={showModal} onHide={handleClose} dialogClassName="image-modal">
      <Modal.Header closeButton>
        <Modal.Title>Recipe Image(s)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={photoUrl} fluid />
      </Modal.Body>
      <Modal.Body>
        {photoUrl2 !== null && <Image src={photoUrl2} fluid />}
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
