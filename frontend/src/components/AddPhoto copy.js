import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddPhoto({ id }) {
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null); // State to store the selected photo
  const [photo2, setPhoto2] = useState(null); // State to store the selected photo


  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    window.location.reload();

  }

  const handlePhotoChange = (e) => {
    // Capture the selected photo
    setPhoto(e.target.files[0]);
  };

   const handlePhoto2Change = (e) => {
    // Capture the selected photo
    setPhoto2(e.target.files[0]);
  };


  const handleSave = async (e) => {
  e.preventDefault();
  
  // Create FormData objects to send the photos
  const formData = new FormData();
  if (photo) {
    formData.append("photo", photo);
  } else {
    formData.append("photo", null);
  }

  const formData2 = new FormData();
  if (photo2) {
    formData2.append("photo2", photo2);
  } else {
    formData2.append("photo2", null);
  }
  
  try {
    // Upload the photo
    const photoResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}recipes/photo/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const photoResponse2 = await axios.put(`${process.env.REACT_APP_SERVER_URL}recipes/photo2/${id}`, formData2, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Extract the photo name from the response
    const { data: { photoName } } = photoResponse;
    const { data: { photoName2 } } = photoResponse2;



    // Close the modal after successful upload and update
    setShow(false);
    setPhoto(null);
    setPhoto2(null);
  } catch (error) {
    console.error("Error uploading photo:", error);
  }
    window.location.reload();
};


  return (
    <div>
      <div className="addIngred mb-2 mt-0">
        <h5 className="textShadow">Click here to add a recipe photo</h5>
        <div>
          <Button className="btn btn-sm btn-outline-primary text-white shadowBox" onClick={handleShow}>
            Add
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select Photo:</Form.Label>
            <Form.Control type="file" onChange={handlePhotoChange} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>If Needed-Select Photo 2:</Form.Label>
            <Form.Control type="file" onChange={handlePhoto2Change} />
          </Form.Group>
          <Form.Text className=""></Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddPhoto;
