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
    traduccion: string;
  }) => void;
}

const RegisterStory: React.FC<RegisterStoryProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [palabrasResaltadas, setPalabrasResaltadas] = useState<any[]>([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [traduccion, setTraduccion] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(undefined);

  const [newPalabra, setNewPalabra] = useState('');
  const [newTraduccion, setNewTraduccion] = useState('');
  const [newAudioUrl, setNewAudioUrl] = useState('');


  const addPalabraResaltada = () => {
    // Verificar que todos los campos no estén vacíos
    if (newPalabra.trim() && newTraduccion.trim() && newAudioUrl.trim()) {
      // Agregar la nueva palabra resaltada al estado
      setPalabrasResaltadas((prevState) => [
        ...prevState,
        { palabra: newPalabra, traduccion: newTraduccion, audioUrl: newAudioUrl },
      ]);
  
      // Limpiar los campos después de agregar la palabra
      setNewPalabra('');
      setNewTraduccion('');
      setNewAudioUrl('');
    } else {
      // Si faltan campos, mostrar un mensaje de alerta
      alert('Por favor, complete todos los campos para agregar una palabra resaltada.');
    }
  };
  

  const removePalabraResaltada = (index: number) => {
    setPalabrasResaltadas((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleRegisterStory = async () => {
    try {
      const storyData = {
        titulo,
        contenido,
        palabrasResaltadas,
        audioUrl,
        imageUrl,
        subtitle,
        traduccion
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
          {/* Campos existentes */}
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
            <label className="mb-2 block font-bold">Traducción:</label>
            <textarea
              value={traduccion}
              onChange={(e) => setTraduccion(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Ingrese la traducción del relato"
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

          {/* Campos de palabras resaltadas */}
          <div className="col-span-2">
            <label className="mb-2 block font-bold">Palabra Resaltada:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPalabra}
                onChange={(e) => setNewPalabra(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Palabra"
              />
              <input
                type="text"
                value={newTraduccion}
                onChange={(e) => setNewTraduccion(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Traducción"
              />
              <input
                type="text"
                value={newAudioUrl}
                onChange={(e) => setNewAudioUrl(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="URL del Audio"
              />
              <button
                onClick={addPalabraResaltada}
                className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
              >
                Agregar
              </button>
            </div>
            <ul className="mt-2">
              {palabrasResaltadas.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {item.Palabra} ({item.traduccion}) - <a href={item.AudioUrl}>Audio</a>
                  <button
                    onClick={() => removePalabraResaltada(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Otros campos */}
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
            <label className="mb-2 block font-bold">URL de la Imagen:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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
