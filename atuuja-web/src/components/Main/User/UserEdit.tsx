import React, { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal'; 
import Alert from '../../Alert/Alertas';
import { API_URL } from '../../../config/config';

interface EditUserProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
  };
  onSuccess: () => void;
}

const UserEdit: React.FC<EditUserProps> = ({ isOpen, onClose, userData, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(undefined);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
      setPassword(userData.password);
      setIsAdmin(userData.isAdmin);
    }
  }, [userData]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/Auth/update/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          isAdmin,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      setAlertMessage('Usuario actualizado correctamente.');
      setAlertType('success');

      // Refresca la lista de usuarios
      onSuccess();

      // Cierra el modal después de actualizar
      onClose();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setAlertMessage('Error al actualizar el usuario. Inténtalo nuevamente.');
      setAlertType('error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Usuario">
      {/* Renderizar alerta */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage('')}
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block">Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese el nombre de usuario"
            disabled // Desactivado, ya que el nombre de usuario no debería cambiar
          />
        </div>
        <div>
          <label className="mb-2 block">Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese el correo"
          />
        </div>
        <div>
          <label className="mb-2 block">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese la nueva contraseña"
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
                  setIsAdmin(!isAdmin);
                }}
              />
              <div
                className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                  isAdmin && 'border-primary bg-gray dark:bg-transparent'
                }`}
              >
                <span
                  className={`text-primary opacity-0 ${
                    isAdmin && '!opacity-100'
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
          onClick={handleUpdate}
          className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
        >
          Actualizar
        </button>
      </div>
    </Modal>
  );
};

export default UserEdit;
