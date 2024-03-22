import React, { useState } from 'react';
import Modal from '../components/Modal';

export const ModalPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default ModalPage;
