import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Quiz } from '../../../types/quiz';

interface IQuizTable {
  quizzes: Quiz[];
}

const QuizTable: React.FC<IQuizTable> = ({ quizzes }) => {
  return (
    <div className="rounded-sm bg-transparent px-5 pt-6 pb-2.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primaryAtuuja text-left dark:bg-white">
              <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                Quiz ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white">
                Relato
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Número de Preguntas
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Respuesta correcta
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Estado
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={index} className="bg-white">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white"></h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white"></p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white"></p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white"></p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white"></p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primaryAtuuja">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="hover:text-primaryAtuuja">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizTable;