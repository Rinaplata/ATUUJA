import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import { API_URL } from '../../../config/config';
import Alert from '../../Alert/Alertas';
import { Reward } from '../../../types/Reward';

interface RegisterStoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: Reward) => void;
}

const RegisterStory: React.FC<RegisterStoryProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [imagenUrl, setImagenUrl] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(undefined);

  const handleRegisterStory = async () => {
    try {
      const storyData : Reward = {
        PremioId : '',
        Nombre : nombre,
        Descripcion : descripcion,
        Puntos : puntos,
        ImagenUrl : imagenUrl,
      };

      const response = await fetch(`${API_URL}/reward/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el Premio');
      }

      setAlertMessage('Premio registrado correctamente.');
      setAlertType('success');
      window.location.reload();
      
      // Llama a onSuccess para actualizar la lista de premios o cualquier otra acción
      onSuccess(storyData);

      // Cierra el modal después del registro
      onClose();
    } catch (error) {
      console.error('Error al registrar el premio:', error);
      setAlertMessage('Error al registrar el premio. Inténtalo nuevamente.');
      setAlertType('error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar premio">
      {/* Renderizar alerta */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage('')}
        />
      )}
      <form onSubmit={handleRegisterStory}>
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-2 block font-bold">Nombre:</label>
              <input
                required
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 mb-4 rounded w-full"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 block font-bold">Descripción:</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="border p-2 mb-4 rounded w-full"
                placeholder="Ingrese la descripción del premio"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 block font-bold">Puntos:</label>
              <input
                required
                type="number"
                min={1}
                value={puntos}
                onChange={(e) => setPuntos(Number.parseInt(e.target.value))}
                className="border p-2 mb-4 rounded w-full"
                placeholder="Ingrese los puntos"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 block font-bold">URL de la imagen:</label>
              <input
                required
                type="text"
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
                className="border p-2 mb-4 rounded w-full"
                placeholder="Ingrese la URL de la imagen"
              />
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
              className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterStory;
