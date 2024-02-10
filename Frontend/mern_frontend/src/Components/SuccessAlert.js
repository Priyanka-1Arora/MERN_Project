import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";

export default function SuccessAlert(props) {
  const { openModal, hideModal,message } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (openModal) {
      handleShow();
    } else if (hideModal) {
      handleClose();
    }
  }, [openModal, hideModal]);

  return (
    <>
      <Modal
        style={{ zIndex: "9999",marginTop:"17px"}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body   style={{backgroundColor:"green"}}>
          {message}
        </Modal.Body>
      </Modal>
    </>
  );
}
