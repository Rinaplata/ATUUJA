import React, { useState } from 'react';
import {
  PencilIcon,
  ChartBarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Modal from '../../Modal/Modal';
import { API_URL } from '../../../config/config';
import Alert from '../../Alert/Alertas';
import { Story } from '../../../types/story';
import StoryEdit from './StoryEdit';

interface IStoryTable {
  story: Story[];
}

const TableThree: React.FC<IStoryTable> = ({ story }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isDeleteAction, setDeleteAction] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<
    'success' | 'error' | 'info' | undefined
  >(undefined);

  const handleEditClick = (story: Story) => {
    setSelectedStory(story);
    setEditModalOpen(true); // Abre el modal de edición
  };

  const handleOpenModal = (
    title: string,
    story: Story,
    deleteAction = false,
  ) => {
    setModalTitle(title);
    setSelectedStory(story);
    setDeleteAction(deleteAction);
    setModalOpen(true); // Abre el modal de eliminación
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStory(null);
    setDeleteAction(false);
  };

  const handleUpdateSuccess = () => {
    setAlertMessage('Relato actualizado correctamente.');
    setAlertType('success');
    setEditModalOpen(false);
    window.location.reload(); // Opcional, si quieres recargar la página o refrescar la lista de relatos
  };

  const handleDeleteStory = async () => {
    if (!selectedStory) return;
    const RelatoId = selectedStory.RelatoId;

    try {
      const response = await fetch(`${API_URL}/Stories/delete/${RelatoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el relato');
      }

      // Muestra alerta de éxito
      setAlertMessage(
        `Relato ${selectedStory.RelatoId} eliminado correctamente.`,
      );
      setAlertType('success');
      window.location.reload();

      // Cerrar el modal después de eliminar
      handleCloseModal();
    } catch (error) {
      console.error('Error al eliminar el relato:', error);
      setAlertMessage('Error al eliminar el relato. Inténtalo nuevamente.');
      setAlertType('error');
    }
  };

  return (
    <div className="rounded-sm bg-transparent px-5 pt-6 pb-2.5">
      {/* Renderizar alerta */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage('')}
        />
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primaryAtuuja text-left dark:bg-white">
              <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                Título del Relato
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Contenido
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Palabras Resaltadas
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Audios
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Imagen
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {story.map((storyItem, key) => (
              <tr key={key} className="bg-white">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {storyItem.Titulo}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {storyItem.Contenido}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {storyItem.PalabrasResaltadas.map((palabra, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 px-2 py-1 rounded-md mr-2"
                      >
                        {palabra}
                      </span>
                    ))}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {storyItem.AudioUrl}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white"></p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primaryAtuuja">
                      <PencilIcon
                        className="h-5 w-5"
                        onClick={() => handleEditClick(storyItem)}
                      />
                    </button>
                    <button
                      className="hover:text-primaryAtuuja"
                      onClick={() =>
                        handleOpenModal(
                          `Eliminar Relato: ${storyItem.Titulo}`,
                          storyItem,
                          true,
                        )
                      }
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para eliminación de relato */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
        {isDeleteAction ? (
          <div>
            <p>¿Estás seguro que deseas eliminar este relato?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
                onClick={handleDeleteStory}
              >
                Sí, estoy seguro
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Acción para el relato: {selectedStory?.Titulo}</p>
          </div>
        )}
      </Modal>

      {/* Modal para editar usuario */}
      <StoryEdit
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        storyData={{
          relatoId: selectedStory?.RelatoId ?? '', // Asegúrate de incluir relatoId
          titulo: selectedStory?.Titulo ?? '',
          contenido: selectedStory?.Contenido ?? '',
          palabrasResaltadas: selectedStory?.PalabrasResaltadas ?? [],
          audioUrl: selectedStory?.AudioUrl ?? '', //
        }}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default TableThree;
