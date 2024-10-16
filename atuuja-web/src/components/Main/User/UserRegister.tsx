import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import { API_URL } from '../../../config/config';
import Alert from '../../Alert/Alertas';

interface RegisterOwnerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: {
    Username: string;
    email: string;
    password: string;
  }) => void;
}

const UserRegister: React.FC<RegisterOwnerProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [ownerUsername, setUsername] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [ownerIsAdmin, setOwnerIsAdmin] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(
    undefined,
  );

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: ownerUsername,
          Email: ownerEmail,
          password: ownerPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar Usuarios');
      }

      setAlertMessage('Usuarios registrado correctamente.');
      setAlertType('success');
      window.location.reload();

      // Llama a onSuccess para refrescar la lista de usuarios
      onSuccess({
        Username: ownerUsername,
        email: ownerEmail,
        password: ownerPassword,
      });

      // Cierra el modal después de registrar
      onClose();
    } catch (error) {
      console.error('Error al registrar Usuarios:', error);
      setAlertMessage('Error al registrar Usuarios. Inténtalo nuevamente.');
      setAlertType('error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Usuarios">
      {/* Renderizar alerta */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage('')}
        />
      )}
<div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="col-span-2">
      <label className="mb-2 block font-bold">Nombre:</label>
      <input
        type="text"
        value={ownerUsername}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
        placeholder="Ingrese el nombre del usuario"
      />
    </div>
    <div className="col-span-2">
      <label className="mb-2 block font-bold">Edad</label>
      <input
        type="number"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
        placeholder="Ingrese la edad del usuario"
      />
    </div>
    <div className="col-span-2">
      <label className="mb-2 block font-bold">Ciudad</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
        placeholder="Ingrese la ciudad del usuario"
      />
    </div>
    <div className="col-span-2">
      <label className="mb-2 block font-bold">Correo:</label>
      <input
        type="email"
        value={ownerEmail}
        onChange={(e) => setOwnerEmail(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
        placeholder="Ingrese el correo del usuario"
      />
    </div>
    <div className="col-span-2">
      <label className="mb-2 block font-bold">Contraseña:</label>
      <input
        type="password"
        value={ownerPassword}
        onChange={(e) => setOwnerPassword(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
        placeholder="Ingrese la contraseña"
      />
    </div>
    <div>
          <label className="mb-2 block">Es Admin:
            <div className="relative">
              <input
                type="checkbox"
                id="checkboxLabelThree"
                className="sr-only"
                onChange={() => {
                  setOwnerIsAdmin(!ownerIsAdmin);
                }}
              />
              <div
                className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                  ownerIsAdmin && 'border-primary bg-gray dark:bg-transparent'
                }`}
              >
                <span
                  className={`text-primary opacity-0 ${
                    ownerIsAdmin && '!opacity-100'
                  }`}
                >
                  <svg
                    className="h-3.5 w-3.5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </label>
        </div>
  </div>
  <div className="flex justify-end space-x-4 mt-4">
    <button
      onClick={onClose}
      className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
    >
      Cancelar
    </button>
    <button
      onClick={handleRegister}
      className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
    >
      Registrar
    </button>
  </div>
</div>
    </Modal>
  );
};

export default UserRegister;
