import React, { useState, useEffect } from 'react';
import Modal from '../../Tables/Modal'; 
import Alert from '../../Tables/Alertas';
import { API_URL } from '../../../config/config';

interface RegisterStoryProps {
  isOpen: boolean;
  onClose: () => void;
  storyData?: {
    relatoId: string;
    titulo: string;
    contenido: string;
    palabrasResaltadas: string[];
    audioUrl: string;
  };
  onSuccess: () => void;
}

const RegisterStory: React.FC<RegisterStoryProps> = ({ isOpen, onClose, storyData, onSuccess }) => {
  const [relatoId, setRelatoId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [palabrasResaltadas, setPalabrasResaltadas] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(undefined);

  useEffect(() => {
    if (storyData) {
      setRelatoId(storyData.relatoId);
      setTitulo(storyData.titulo);
      setContenido(storyData.contenido);
      setPalabrasResaltadas(storyData.palabrasResaltadas.join(', '));
      setAudioUrl(storyData.audioUrl);
    }
  }, [storyData]);

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/Stories/update/${relatoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          relatoId,
          titulo,
          contenido,
          palabrasResaltadas: palabrasResaltadas.split(',').map(p => p.trim()),
          audioUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el relato');
      }

      setAlertMessage('Relato registrado correctamente.');
      setAlertType('success');

      // Refresca la lista de relatos
      onSuccess();

      // Cierra el modal después de registrar
      onClose();
    } catch (error) {
      console.error('Error al registrar el relato:', error);
      setAlertMessage('Error al registrar el relato. Inténtalo nuevamente.');
      setAlertType('error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Relato">
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
          <label className="mb-2 block">Relato ID:</label>
          <input
            type="text"
            value={relatoId}
            onChange={(e) => setRelatoId(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese el ID del relato"
            disabled
          />
        </div>
        <div>
          <label className="mb-2 block">Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese el título del relato"
          />
        </div>
        <div>
          <label className="mb-2 block">Contenido:</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese el contenido del relato"
          />
        </div>
        <div>
          <label className="mb-2 block">Palabras Resaltadas:</label>
          <input
            type="text"
            value={palabrasResaltadas}
            onChange={(e) => setPalabrasResaltadas(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese palabras resaltadas separadas por comas"
          />
        </div>
        <div>
          <label className="mb-2 block">URL del Audio:</label>
          <input
            type="text"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese la URL del audio"
          />
        </div>
        <div>
          <label className="mb-2 block">URL Imagen:</label>
          <input
            type="text"
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
          onClick={handleRegister}
          className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
        >
          Registrar
        </button>
      </div>
    </Modal>
  );
};

export default RegisterStory;

