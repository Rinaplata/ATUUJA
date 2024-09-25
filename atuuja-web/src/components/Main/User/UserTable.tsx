import React, { useState } from 'react';
import {
  PencilIcon,
  ChartBarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { User } from '../../../types/user';
import Modal from '../../Tables/Modal';

interface IUserTable {
  users: User[];
}

const TableThree: React.FC<IUserTable> = ({ users }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDeleteAction, setDeleteAction] = useState(false);
  
    const handleOpenModal = (title: string, user: User, deleteAction = false) => {
      setModalTitle(title);
      setSelectedUser(user);
      setDeleteAction(deleteAction);
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedUser(null);
      setDeleteAction(false);
    };
  
    const handleDeleteUser = () => {
      // Aquí va la lógica para eliminar al usuario
      console.log(`Eliminando al usuario: ${selectedUser?.Username}`);
      handleCloseModal(); // Cerrar el modal después de eliminar
    };

  return (
    <div className="rounded-sm bg-transparent px-5 pt-6 pb-2.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primaryAtuuja text-left dark:bg-while">
              <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                Nombre
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Correo
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Usuario
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
                  <p className="text-black dark:text-white">{user.Username}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primaryAtuuja">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="hover:text-primaryAtuuja">
                      <ChartBarIcon className="h-5 w-5" />
                    </button>
                    <button className="hover:text-primaryAtuuja" onClick={() =>handleOpenModal(`Eliminar Usuario: ${user.Username}`, user, true)}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     {/* Modal */}
     <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
        {isDeleteAction ? (
          <div>
            <p>¿Estás seguro que deseas eliminar este usuario?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={handleCloseModal} className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
                Cancelar
              </button>
              <button onClick={handleDeleteUser} className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700">
                Sí, estoy seguro
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Acción para el usuario: {selectedUser?.Username}</p>
            {/* Aquí puedes agregar más contenido para editar o ver detalles */}
          </div>
        )}
      </Modal>
 </div>
  );
};

export default TableThree;
