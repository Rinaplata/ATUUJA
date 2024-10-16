import React, { useEffect, useState } from "react";
import {
  Quiz,
  Pregunta,
  TipoRespuesta,
  TipoPregunta,
  Estado,
} from "../../../types/quiz";
import { getStorieslist } from "../../../service/Story/story";
import { updateQuiz } from "../../../service/Quiz/quiz";

interface EditQuizProps {
  quiz: Quiz;
  closeModal: () => void;
}

const EditQuiz: React.FC<EditQuizProps> = ({ quiz, closeModal }) => {
  const [relatoId, setRelatoId] = useState<string>("");
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [estado, setEstado] = useState<Estado | null>(null);
  const [relatos, setRelatos] = useState<
    { RelatoId: string; Titulo: string }[]
  >([]);

  useEffect(() => {

    const fetchRelatos = async () => {
      try {
        const fetchedRelatos = await getStorieslist();
        setRelatos(fetchedRelatos);
      } catch (error) {
        console.error("Error al cargar relatos:", error);
      }
    };
    fetchRelatos();

    const { Preguntas, RelatoId, Estado} = quiz;
    setPreguntas(Preguntas);
    setRelatoId(RelatoId);
    setEstado(Estado)

  }, []);

  const handlePreguntaChange = (index: number, field: string, value: any) => {
    const updatedPreguntas = [...preguntas];
    (updatedPreguntas[index] as any)[field] = value;
    setPreguntas(updatedPreguntas);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const examenId = quiz.ExamenId;
    const updatedQuiz = { examenId, relatoId, preguntas, estado };
    try {
      await updateQuiz(examenId, updatedQuiz);
      closeModal();
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md"
    >
      <h1 className="text-4ml font-bold mb-4">
        Editar Cuestionario (ID: {quiz.ExamenId})
      </h1>

      {/* Selección de relato */}
      <div>
        <label
          htmlFor="relato-select"
          className="block mt-4 mb-2 text-sm font-medium text-gray-700"
        >
          Selección de relato
        </label>
        <select
          id="relato-select"
          value={relatoId}
          onChange={(e) => setRelatoId(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        >
          <option value="-1"></option>
          {relatos.map((relato) => (
            <option key={relato.RelatoId} value={relato.RelatoId}>
              {relato.Titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de estado */}
      <div>
        <label
          htmlFor="estado-select"
          className="block mt-4 mb-2 text-sm font-medium text-gray-700"
        >
          Selección de estado
        </label>
        <select
          id="estado-select"
          value={estado ?? ""}
          onChange={(e) => setEstado(Number(e.target.value) as Estado)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        >
          <option value=""></option>
          {Object.entries(Estado)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
        </select>
      </div>

      {/* Renderizar preguntas */}
      {preguntas.map((pregunta, index) => (
        <div key={index} className="mt-6 border p-4 rounded-md shadow-sm">
          <h3 className="font-semibold">Pregunta {index + 1}</h3>

          <div>
            <label className="block mt-2 text-sm font-medium text-gray-700">
              Enunciado
            </label>
            <input
              type="text"
              value={pregunta.EnunciadoPregunta || ""}
              onChange={(e) =>
                handlePreguntaChange(index, "EnunciadoPregunta", e.target.value)
              }
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mt-2 text-sm font-medium text-gray-700">
              Tipo de pregunta
            </label>
            <select
              value={pregunta.TipoPregunta}
              onChange={(e) =>
                handlePreguntaChange(
                  index,
                  "tipoPregunta",
                  Number(e.target.value)
                )
              }
              className="block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {Object.entries(TipoPregunta).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mt-2 text-sm font-medium text-gray-700">
              Puntos
            </label>
            <input
              type="number"
              value={pregunta.Puntos || ""}
              onChange={(e) =>
                handlePreguntaChange(index, "Puntos", Number(e.target.value))
              }
              className="block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Sección de respuestas */}
          <div>
            <h4 className="font-semibold mt-4">Respuestas</h4>
            {pregunta.Respuestas.map((respuesta, respuestaIndex) => (
              <div key={respuestaIndex} className="mt-2 border p-2 rounded-md">
                <label className="block text-sm font-medium text-gray-700">
                  Respuesta {respuestaIndex + 1}
                </label>
                <input
                  type="text"
                  value={respuesta.Valor}
                  onChange={(e) => {
                    const updatedRespuestas = [...pregunta.Respuestas];
                    updatedRespuestas[respuestaIndex].Valor = e.target.value;
                    handlePreguntaChange(
                      index,
                      "Respuestas",
                      updatedRespuestas
                    );
                  }}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={respuesta.EsCorrecta}
                      onChange={() => {
                        const updatedRespuestas = pregunta.Respuestas.map(
                          (resp, i) => ({
                            ...resp,
                            EsCorrecta: i === respuestaIndex, // Solo la respuesta actual se marcará como correcta
                          })
                        );
                        handlePreguntaChange(
                          index,
                          "Respuestas",
                          updatedRespuestas
                        );
                      }}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Es Correcta</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex space-x-6">
        <div className="ml-auto">
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditQuiz;
