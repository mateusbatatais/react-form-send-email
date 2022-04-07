import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "../../../services/api";

interface Props {
  id: number;
  onDelete: () => void;
}

function ModalDeleteConfirm({ id, onDelete }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteItem = () => {
    api.delete(`/Contact/${id}`).then((response) => {
      handleClose();
      onDelete();
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirma exclusão?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Cuidado, essa ação não tem volta! Podemos excluir?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="danger" onClick={deleteItem}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        variant="danger"
        className="me-1 mb-1"
        size="sm"
        name="deletar"
        onClick={handleShow}
      >
        Excluir
      </Button>
    </>
  );
}

export default ModalDeleteConfirm;
