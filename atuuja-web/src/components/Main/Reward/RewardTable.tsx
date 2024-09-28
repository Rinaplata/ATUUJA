import React, { useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Modal from '../../Tables/Modal';
import { API_URL } from '../../../config/config';
import Alert from '../../Tables/Alertas';
import { Reward } from '../../../types/Reward';
import RewardEdit from './RewardEdit';

interface IRewardTable {
  Reward: Reward[];
}

const TableThree: React.FC<IRewardTable> = ({ Reward }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isDeleteAction, setDeleteAction] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<
    'success' | 'error' | 'info' | undefined
  >(undefined);

  const handleEditClick = (Reward: Reward) => {
    setSelectedReward(Reward);
    setEditModalOpen(true); // Abre el modal de edición
  };

  const handleOpenModal = (
    title: string,
    Reward: Reward,
    deleteAction = false,
  ) => {
    setModalTitle(title);
    setSelectedReward(Reward);
    setDeleteAction(deleteAction);
    setModalOpen(true); // Abre el modal de eliminación
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReward(null);
    setDeleteAction(false);
  };

  const handleUpdateSuccess = () => {
    setAlertMessage('Reward actualizado correctamente.');
    setAlertType('success');
    setEditModalOpen(false);
    window.location.reload(); // Opcional, si quieres recargar la página o refrescar la lista de Rewards
  };

  const handleDeleteReward = async () => {
    if (!selectedReward) return;
    const RewardId = selectedReward.PremioId;

    try {
      const response = await fetch(`${API_URL}/reward/delete/${RewardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el premio');
      }

      // Muestra alerta de éxito
      setAlertMessage(
        `premio ${selectedReward.PremioId} eliminado correctamente.`,
      );
      setAlertType('success');
      window.location.reload();

      // Cerrar el modal después de eliminar
      handleCloseModal();
    } catch (error) {
      console.error('Error al eliminar el premio:', error);
      setAlertMessage('Error al eliminar el premio. Inténtalo nuevamente.');
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
                Nombre del Premio
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Descripcion
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Puntos
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
            {Reward.map((RewardItem, key) => (
              <tr key={key} className="bg-white">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {RewardItem.Nombre}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {RewardItem.Descripcion}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {RewardItem.Puntos}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <img src={RewardItem.ImagenUrl} height={40} width={40}></img>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primaryAtuuja">
                      <PencilIcon
                        className="h-5 w-5"
                        onClick={() => handleEditClick(RewardItem)}
                      />
                    </button>
                    <button
                      className="hover:text-primaryAtuuja"
                      onClick={() =>
                        handleOpenModal(
                          `Eliminar Reward: ${RewardItem.Nombre}`,
                          RewardItem,
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

      {/* Modal para eliminación de Reward */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
        {isDeleteAction ? (
          <div>
            <p>¿Estás seguro que deseas eliminar este premio?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
                onClick={handleDeleteReward}
              >
                Sí, estoy seguro
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Acción para el premio: {selectedReward?.Nombre}</p>
          </div>
        )}
      </Modal>

      {/* Modal para editar usuario */}
      <RewardEdit
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        RewardData={selectedReward}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default TableThree;
