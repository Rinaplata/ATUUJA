import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Estado, Quiz, TipoPregunta } from "../../types/quiz";
import { getListQuiz } from "../../service/Quiz/quiz";

const QuizTable: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    switch(tipoPregunta) {
      case 0:
        return "Texto";
        break; 
        case 1:
          return "Audio";
        break; 
        case 2:
          return "Imagen";
        break; 
    }

    return "";
    
  }

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
                  <p className="text-black dark:text-white">{quiz.Estado === Estado.Activo ? "Activo" : "Inactivo"}</p>
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
