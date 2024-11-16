import React, { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal';
import Alert from '../../Alert/Alertas';
import { API_URL } from '../../../config/config';

interface RegisterStoryProps {
  isOpen: boolean;
  onClose: () => void;
  storyData?: {
    relatoId: string;
    titulo: string;
    contenido: string;
    palabrasResaltadas: { palabra: string; traduccion: string; audioUrl: string }[];
    audioUrl: string;
    imageUrl: string;
    subtitle: string;
    traduccion: string;
  };
  onSuccess: () => void;
}

const RegisterStory: React.FC<RegisterStoryProps> = ({ isOpen, onClose, storyData, onSuccess }) => {
  const [relatoId, setRelatoId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [palabrasResaltadas, setPalabrasResaltadas] = useState<{ palabra: string; traduccion: string; audioUrl: string }[]>([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [traduccion, setTraduccion] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | undefined>(undefined);

  const [newPalabra, setNewPalabra] = useState('');
  const [newTraduccion, setNewTraduccion] = useState('');
  const [newAudioUrl, setNewAudioUrl] = useState('');

  const [initialLength, setInitialLength] = useState(0);

  useEffect(() => {
    if (storyData) {
      setRelatoId(storyData.relatoId);
      setTitulo(storyData.titulo);
      setContenido(storyData.contenido);
      setPalabrasResaltadas(storyData.palabrasResaltadas);
      setAudioUrl(storyData.audioUrl);
      setImageUrl(storyData.imageUrl);
      setSubtitle(storyData.subtitle);
      setTraduccion(storyData.traduccion);
      setInitialLength(storyData.palabrasResaltadas.length);
    }
  }, [storyData]);

  const addPalabraResaltada = () => { 
    if (newPalabra.trim() && newTraduccion.trim() && newAudioUrl.trim()) { 
      setPalabrasResaltadas((prevState) => [
        ...prevState,
        { palabra: newPalabra, traduccion: newTraduccion, audioUrl: newAudioUrl },
      ]);
 
      setNewPalabra('');
      setNewTraduccion('');
      setNewAudioUrl('');
    } else { 
      alert('Por favor, complete todos los campos para agregar una palabra resaltada.');
    }
  };

  const removePalabraResaltada = (index: number) => {
    setPalabrasResaltadas((prevState) => prevState.filter((_, i) => i !== index));
  };

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
          palabrasResaltadas,  
          audioUrl,
          imageUrl,
          subtitle,
          traduccion,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el relato');
      }

      setAlertMessage('Relato actualizado correctamente.');
      setAlertType('success');

      // Refresca la lista de relatos
      onSuccess();

      // Cierra el modal después de registrar
      onClose();
    } catch (error) {
      console.error('Error al actualizar el relato:', error);
      setAlertMessage('Error al actualizar el relato. Inténtalo nuevamente.');
      setAlertType('error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Actualizar Relato">
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
          <label className="mb-2 block">Traducción:</label>
          <textarea
            value={traduccion}
            onChange={(e) => setTraduccion(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese el contenido de la traducción"
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
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese la URL de la imagen"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 block">Subtítulo:</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border p-2 mb-4 rounded w-full"
            placeholder="Ingrese Subtítulo"
          />
        </div>

        {/* Campos para palabras resaltadas */}
        <div className="col-span-2">
          <label className="mb-1 block">Palabra(s) Resaltada(s):</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPalabra}
              onChange={(e) => setNewPalabra(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Palabra"
            />
            <input
              type="text"
              value={newTraduccion}
              onChange={(e) => setNewTraduccion(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="Traducción"
            />
            <input
              type="text"
              value={newAudioUrl}
              onChange={(e) => setNewAudioUrl(e.target.value)}
              className="border p-2 mb-4 rounded w-full"
              placeholder="URL del Audio"
            />
            <button
              onClick={addPalabraResaltada}
              className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700 h-full"
            >
              Agregar
            </button>
          </div>

          <ul className="mt-2">
            {palabrasResaltadas.slice(initialLength).map((item, index) => (
              <li key={index + initialLength} className="text-sm text-gray-700">
                {item.Palabra} ({item.traduccion}) - <a href={item.AudioUrl}>Audio</a>

              </li>
            ))}
          </ul>

          <div className="mt-4 overflow-x-auto">
            {palabrasResaltadas.length > 0 ? (
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-[rgb(154_44_43_/var(--tw-bg-opacity))]">Palabra</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-[rgb(154_44_43_/var(--tw-bg-opacity))]">Traducción</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-[rgb(154_44_43_/var(--tw-bg-opacity))]">Audio</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-[rgb(154_44_43_/var(--tw-bg-opacity))]">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {palabrasResaltadas.filter(item => item.Palabra).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-700">{item.Palabra}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{item.Traduccion}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {/* Reproducir audio directamente en la página */}
                        <audio controls>
                          <source src={item.audioUrl} type="audio/mp3" />
                          Tu navegador no soporta el elemento de audio.
                        </audio>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        <button
                          onClick={() => removePalabraResaltada(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            ) : (
              <p>No hay palabras resaltadas.</p>
            )}
          </div> 
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
          Actualizar
        </button>
      </div>
    </Modal>
  );
};

export default RegisterStory;

