import React from 'react';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info', onClose }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`rounded-lg p-4 mb-4 ${getBackgroundColor()} flex justify-between items-center`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-sm font-semibold">
        &times; {/* Icono de cerrar */}
      </button>
    </div>
  );
};

export default Alert;

