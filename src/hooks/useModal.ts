import {useState} from 'react';

export interface ModalProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): ModalProps => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {isModalOpen, openModal, closeModal};
};

export default useModal;
