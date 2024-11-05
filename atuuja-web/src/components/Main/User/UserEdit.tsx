import React, { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal'; 
import Alert from '../../Alert/Alertas';
import { API_URL } from '../../../config/config';
import { TipoDocumento } from '../../../types/user';

interface EditUserProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    userid: string,
    username: string;
    email: string;
    password: string;
    edad: number,
    cuidad: string,
    tipoDocumento: TipoDocumento,
    numDocumento: string,
    isAdmin: boolean;
  };
  onSuccess: () => void;
}

const UserEdit: React.FC<EditUserProps> = ({ isOpen, onClose, userData, onSuccess }) => {
  const [userId,setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [edad, setEdad] = useState(0);
  const [cuidad, setCuidad] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState(TipoDocumento.Cedula);
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(undefined);

  useEffect(() => {
    if (userData) {
      setUserId(userData.userid);
      setUsername(userData.username);
      setEmail(userData.email);
      setPassword(userData.password);
      setIsAdmin(userData.isAdmin);
      setEdad(userData.edad);
      setCuidad(userData.cuidad);
      setTipoDocumento(userData.tipoDocumento);
      setNumeroDocumento(userData.numDocumento);
    }
  }, [userData]);

  const handleUpdate = async () => {
    try { 
      const response = await fetch(`${API_URL}/Auth/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          username,
          email,
          password,
          isAdmin,
          edad,
          cuidad,
          tipoDocumento,
          numeroDocumento,
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
          <label className="mb-2 block">Edad:</label>
          <input
            type="edad"
            value={edad}
            onChange={(e) => setEdad(parseInt(e.target.value))}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese la edad"
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
          <label className="mb-2 block">Tipo documento:</label>
          <select 
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(parseInt(e.target.value) as TipoDocumento)}
            className="border p-2 mb-4 rounded w-full"
          >
            <option value="" disabled>
              Selecciona el tipo de documento
            </option>
            <option value="0">Cédula</option>
            <option value="1">Pasaporte</option>
          </select>
        </div> 
        <div>
          <label className="mb-2 block">Numero documento:</label>
          <input
            type="number"
            value={numeroDocumento }
            onChange={(e) => setNumeroDocumento(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese el número de documento"
          /> 
        </div>
        <div>
          <label className="mb-2 block">Cuidad:</label>
          <input
            type="cuidad"
            value={cuidad}
            onChange={(e) => setCuidad(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese la cuidad"
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
