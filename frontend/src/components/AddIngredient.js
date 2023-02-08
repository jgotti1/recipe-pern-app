import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddIngredient({ id }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [ingredient, setIngredient] = useState("");

  const handleSave = async (e) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}recipes/ingredient`, {
      ingredient: ingredient,
      recipe_id: id,
    });
    setShow(false);
    window.location.reload();
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <div className="addIngred mb-2 mt-3">
        <h5>Click here to add ingredients</h5>
        <div>
          <Button className="btn btn-sm btn-outline-primary text-white" onClick={handleShow}>
            Add
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" id="autoSizingInput" placeholder="Enter New Ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
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

export default AddIngredient;
