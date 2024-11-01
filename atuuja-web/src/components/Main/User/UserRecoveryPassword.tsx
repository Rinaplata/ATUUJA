
import React, { useState } from 'react';
import Banner from '../../../images/banner/wayuuADMIN.jpg';
import Logo from '../../../images/logo/logo.png';
import { API_URL } from '../../../config/config';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


interface AlertState {
    message: string;
    type: 'success' | 'error' | '';  
  }

const UserRecoveryPassword: React.FC = () => {
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState<AlertState>({ message: '', type: '' }); 
    
    const handleRecoveryPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/Auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: userEmail,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar correo de recuperación de contraseña');
            }

            handleRecoveryProcess();

        } catch (error) {
            console.error('Error al recuperar contraseña', error);
            setAlertMessage({message: 'Error al recuperar contraseña. Inténtalo nuevamente.',  type: 'error'});
            setAlertMessage({
                message: 'Error al intentar recuperar contraseña.',
                type: 'error'
            });

        }
    };

    const handleRecoveryProcess = () => {
        setAlertMessage({
            message: 'Fueron enviadas a su correo las instrucciones para recuperar contraseña.',
            type: 'success'
        });

        setTimeout(() => {
            localStorage.clear(); 
            sessionStorage.clear();
            navigate('/Auth/login');
        }, 1000);
      };

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap w-full">
                    <div className="hidden w-full xl:flex xl:w-1/2">
                        <div className="w-full h-screen">
                            <img src={Banner} alt="Imagen de login" className="h-full w-full object-cover" />
                        </div>
                    </div>

                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5 relative flex flex-col items-center bg-bodyAtuuja h-screen">
                            <div className="p-4">
                                <img src={Logo} alt="Logo" className="logo-custom-atuuja" />
                            </div>
                            <h2 className="mb-9 title-subtiele-xsm text-black dark:text-white secondaryAtuuja">
                                Recupera tu contraseña
                            </h2>

                            {alertMessage.message && (
                                <div className={`alert ${alertMessage.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                                    {alertMessage.message}
                                </div>
                            )}

                            <form onSubmit={handleRecoveryPassword}>
                                <div className="mb-6">
                                    <div className="relative">
                                    <span className="absolute left-0 top-0 h-full w-12 flex items-center justify-center bg-thirdAtuuja text-primaryAtuuja rounded-l-lg">
                                        <svg
                                            className="fill-current"
                                            width="22"
                                            height="22"
                                            viewBox="0 0 22 22"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.5">
                                            <path
                                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                                fill=""
                                            />
                                            </g>
                                        </svg>
                                        </span>
                                        <input
                                            type="email"
                                            placeholder="Correo electrónico"
                                            className="w-full pl-14 rounded-lg custom-placeholder border border-white bg-while py-2 pr-10 text-black outline-none focus:border-while dark:border-form-strokedark dark:bg-form-input dark:text-subTitleAtuuja-xs"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 text-right">
                                    <p>
                                        <NavLink to="/auth/login" className="text-sm secondaryAtuuja">
                                            Volver al login
                                        </NavLink>
                                    </p>
                                </div>

                                <div className="mb-5 pt-20">
                                    <input
                                        type="submit"
                                        value="Enviar"
                                        className="w-full cursor-pointer font-bold border-radius-atuuja border-primaryAtuuja bg-primaryAtuuja p-3 text-white transition hover:bg-opacity-90"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserRecoveryPassword;