import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Estado, Quiz, TipoPregunta } from "../../types/quiz";
import { getListQuiz, deleteQuiz } from "../../service/Quiz/quiz";
import Modal from "../Modal/Modal";

const QuizTable: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getListQuiz();
        setQuizzes(data);
      } catch {
        setError("Error fetching quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const GetTipoPreguntaText = (tipoPregunta: TipoPregunta) => {
    switch (tipoPregunta) {
      case 0:
        return "Texto";
      case 1:
        return "Audio";
      case 2:
        return "Imagen";
      default:
        return "";
    }
  };

  const openDeleteModal = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  const handleDeleteQuiz = async () => {
    if (selectedQuiz) {
      try {
        await deleteQuiz(selectedQuiz.ExamenId);
        setQuizzes(quizzes.filter((quiz) => quiz.ExamenId !== selectedQuiz.ExamenId));
        handleCloseModal();
      } catch (error) {
        setError("Error eliminando el quiz");
      }
    }
  };

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
                Tipo Pregunta
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
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{quiz.ExamenId}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{quiz.RelatoId}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {quiz.Preguntas.map((pregunta, index) => (
                    <p key={index} className="text-black dark:text-white">
                      {GetTipoPreguntaText(pregunta.TipoPregunta)}
                    </p>
                  ))}
                </td>
                <td>
                  {quiz.Preguntas.map((pregunta) =>
                    pregunta.Respuestas.map(
                      (respuesta) =>
                        respuesta.EsCorrecta && (
                          <p
                            key={respuesta.Valor}
                            className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                          >
                            <span className="text-black dark:text-white">
                              {respuesta.Valor}
                            </span>
                          </p>
                        )
                    )
                  )}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {quiz.Estado === Estado.Activo ? "Activo" : "Inactivo"}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primaryAtuuja"
                      onClick={() => openDeleteModal(quiz)}
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
      {/* Modal para eliminar */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Confirmar eliminación">
        <div>
          <p>¿Estás seguro que deseas eliminar el quiz seleccionado?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={handleCloseModal}
              className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              className="bg-primaryAtuuja text-white px-4 py-2 rounded-lg hover:bg-primaryAtuuja-700"
              onClick={handleDeleteQuiz}
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuizTable;
