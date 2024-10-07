import React, { useState } from 'react';
import {
  PencilIcon,
  ChartBarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { User } from '../../../types/user';
import Modal from '../../Tables/Modal';
import { API_URL } from '../../../config/config';
import Alert from '../../Tables/Alertas';
import UserEditModal from './UserEdit';

interface IUserTable {
  users: User[];
}

const TableThree: React.FC<IUserTable> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteAction, setDeleteAction] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<
    'success' | 'error' | 'info' | undefined
  >(undefined);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true); // Abre el modal de edición
  };

  const handleOpenModal = (title: string, user: User, deleteAction = false) => {
    setModalTitle(title);
    setSelectedUser(user);
    setDeleteAction(deleteAction);
    setModalOpen(true); // Abre el modal de eliminación
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setDeleteAction(false);
  };

  const handleUpdateSuccess = () => {
    setAlertMessage('Usuario actualizado correctamente.');
    setAlertType('success');
    setEditModalOpen(false);
    window.location.reload(); // Opcional, si quieres recargar la página o refrescar la lista de usuarios
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    const userId = selectedUser.Username;

    try {
      const response = await fetch(`${API_URL}/Auth/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      // Muestra alerta de éxito
      setAlertMessage(
        `Usuario ${selectedUser.Username} eliminado correctamente.`,
      );
      setAlertType('success');
      window.location.reload();

      // Cerrar el modal después de eliminar
      handleCloseModal();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setAlertMessage('Error al eliminar el usuario. Inténtalo nuevamente.');
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
                Usuario
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Correo
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Es Admin
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Progreso
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Puntos Acumulados
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={key} className="bg-white">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.Username}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.Email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  <p className="text-black dark:text-white">{user.IsAdmin ? "Si" : "No"}</p>
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{/* Progreso */}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {/* Puntos Acumulados */}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primaryAtuuja">
                      <PencilIcon
                        className="h-5 w-5"
                        onClick={() => handleEditClick(user)}
                      />
                    </button>
                    <button className="hover:text-primaryAtuuja">
                      <ChartBarIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="hover:text-primaryAtuuja"
                      onClick={() =>
                        handleOpenModal(
                          `Eliminar Usuario: ${user.Username}`,
                          user,
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

      {/* Modal para eliminación de usuario */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
        {isDeleteAction ? (
          <div>
            <p>¿Estás seguro que deseas eliminar este usuario?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
              >
                Sí, estoy seguro
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Acción para el usuario: {selectedUser?.Username}</p>
          </div>
        )}
      </Modal>

      {/* Modal para editar usuario */}
      <UserEditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        userData={{
          username: selectedUser?.Username ?? '',
          email: selectedUser?.Email ?? '',
          password:selectedUser?.Password ?? '',
          isAdmin: selectedUser?.IsAdmin ?? false,
        }}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default TableThree;
