import React, { useEffect, useState } from 'react';
import UserTable from '../../Tables/UserTable'
import { API_URL } from '../../../config/config'
import UserRegister from './UserRegister'

export default function User() {
  const [users, setUsers] = useState([]);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  useEffect(() => { 

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/Auth/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
      setUsers(await response.json());
      } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

    fetchData();

  }, []);

  const handleRegister = (data: { Username: string; email: string; password: string }) => {
    console.log('Registrar usuario:', data);
    // Aquí puedes manejar la lógica para almacenar los datos o actualizar la lista de usuarios
    setRegisterOpen(false); // Cerrar el modal después de registrar
  };

  return (
    <div>
            {/* Buscador */}
            <div className="w-screen">
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div className="relative">
            <button className="absolute pl-15 left-0 top-1/2 -translate-y-1/2">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Nombre..."
              className="w-full bg-white py-3 pl-25 pr-4 text-black focus:outline-none dark:text-white rounded-md"
            />
          </div>
        </form>
      </div>
        <div className="p-20 pr-[20rem]">
        {/* Botón Nuevo */}
        <div className="mb-3">
          <button className="bg-primaryAtuuja text-white py-2 px-8 rounded ml-4" 
           onClick={() => setRegisterOpen(true)} >
            Nuevo
          </button>
        </div>
       <UserTable users={users} />
       </div>
        {/* Modal de Registro */}
      <UserRegister 
        isOpen={isRegisterOpen} 
        onClose={() => setRegisterOpen(false)} 
        onSuccess={handleRegister}
      />
    </div>
  );
}