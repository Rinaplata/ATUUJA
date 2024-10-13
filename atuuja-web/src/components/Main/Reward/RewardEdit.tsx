import React, { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal'; 
import Alert from '../../Alert/Alertas';
import { API_URL } from '../../../config/config';
import { Reward } from '../../../types/reward';

interface RegisterRewardProps {
  isOpen: boolean;
  onClose: () => void;
  RewardData: Reward | null;
  onSuccess: () => void;
}

const RegisterReward: React.FC<RegisterRewardProps> = ({ isOpen, onClose, RewardData, onSuccess }) => {
  const [PremioId, setPremioId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [imagenUrl, setImagenUrl] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(undefined);

  useEffect(() => {
    if (RewardData) {
      setPremioId(RewardData.PremioId);
      setNombre(RewardData.Nombre);
      setDescripcion(RewardData.Descripcion);
      setPuntos(RewardData.Puntos);
      setImagenUrl(RewardData.ImagenUrl);
    }
  }, [RewardData]);

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/reward/update/${PremioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PremioId,
          nombre,
          descripcion,
          puntos,
          imagenUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el Premio');
      }

      setAlertMessage('Premio registrado correctamente.');
      setAlertType('success');

      // Refresca la lista de Premios
      onSuccess();

      // Cierra el modal después de registrar
      onClose();
    } catch (error) {
      console.error('Error al registrar el Premio:', error);
      setAlertMessage('Error al registrar el Premio. Inténtalo nuevamente.');
      setAlertType('error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Premio">
      {/* Renderizar alerta */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage('')}
        />
      )}
      <form onSubmit={handleRegister}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block">Nombre:</label>
          <input
            required
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese el nombre"
          />
        </div>
        <div>
          <label className="mb-2 block">Descripción:</label>
          <textarea
            required
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese descripción"
          />
        </div>
        <div>
          <label className="mb-2 block">Puntos:</label>
          <input
            required
            type="number"
            value={puntos}
            onChange={(e) => setPuntos(Number.parseInt(e.target.value))}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese los puntos"
          />
        </div>
        <div>
          <label className="mb-2 block">URL Imagen:</label>
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
          type='submit'
          className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
        >
          Actualizar
        </button>
      </div>
      </form>
    </Modal>
  );
};

export default RegisterReward;

