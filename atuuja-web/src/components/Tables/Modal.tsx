import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl mx-4 md:mx-auto">
        {/* Encabezado que abarca toda la parte superior y laterales */}
        <div className="w-full bg-primaryAtuuja text-white text-xl font-bold py-4 text-center rounded-t-lg">
          {title}
        </div>
        {/* Contenedor del contenido con padding */}
        <div className="bg-AtuujaFondo p-5 rounded-b-lg">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

