import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddPhoto({ id }) {
  const [show, setShow] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [photo, setPhoto] = useState(null); // State to store the selected photo
  const [photoName, setPhotoName] = useState(""); // State to store the name of the uploaded photo

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handlePhotoChange = (e) => {
    // Capture the selected photo
    setPhoto(e.target.files[0]);
  };


  const handleSave = async (e) => {
  e.preventDefault();
  
  // Create FormData object to send the photo
  const formData = new FormData();
  formData.append("photo", photo);
  
  try {
    // Upload the photo
    const photoResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}recipes/photo/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Extract the photo name from the response
    const { data: { photoName } } = photoResponse;



    // Close the modal after successful upload and update
    setShow(false);
    setPhoto(null);
  } catch (error) {
    console.error("Error uploading photo:", error);
  }
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
