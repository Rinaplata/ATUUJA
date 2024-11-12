import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import { API_URL } from '../../../config/config';
import Alert from '../../Alert/Alertas';

interface RegisterStoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { 
    titulo: string;
    contenido: string;
    palabrasResaltadas: string[];
    audioUrl: string;
    imageUrl: string;
    subtitle: string;
  }) => void;
}

const RegisterStory: React.FC<RegisterStoryProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => { 
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [palabrasResaltadas, setPalabrasResaltadas] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(undefined);

  const handleRegisterStory = async () => {
    try {
      const storyData = { 
        titulo,
        contenido,
        palabrasResaltadas: palabrasResaltadas.split(',').map((word) => word.trim()),
        audioUrl,
        imageUrl,
        subtitle
      };

      const response = await fetch(`${API_URL}/Stories/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el relato');
      }

      setAlertMessage('Relato registrado correctamente.');
      setAlertType('success');
      window.location.reload();
      
      // Llama a onSuccess para actualizar la lista de relatos o cualquier otra acción
      onSuccess(storyData);

      // Cierra el modal después del registro
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
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-2 gap-4"> 
          <div className="col-span-2">
            <label className="mb-2 block font-bold">Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Ingrese el título del relato"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-2 block font-bold">Contenido:</label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Ingrese el contenido del relato"
            />
          </div> 
          <div className="col-span-2">
            <label className="mb-2 block font-bold">Subtítulo:</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Ingrese Subtitulo"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-2 block font-bold">Palabras Resaltadas:</label>
            <input
              type="text"
              value={palabrasResaltadas}
              onChange={(e) => setPalabrasResaltadas(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Ingrese palabras resaltadas separadas por comas"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-2 block font-bold">URL del Audio:</label>
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Ingrese la URL del audio"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-2 block font-bold">URL de la imagen:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Ingrese la URL del audio"
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
            onClick={handleRegisterStory}
            className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
          >
            Registrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterStory;
