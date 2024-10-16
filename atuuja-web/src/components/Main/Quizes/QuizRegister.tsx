import React, { useEffect, useState } from "react";
import {
  Quiz,
  Pregunta,
  TipoRespuesta,
  TipoPregunta,
  Estado,
} from "../../../types/quiz";
import { getStorieslist } from "../../../service/Story/story";
import { postCreateQuiz } from "../../../service/Quiz/quiz";

interface QuizRegisterProps {
  closeModal: () => void;
}

const QuizRegister: React.FC<QuizRegisterProps> = ({closeModal }) => {
  const [examenId, setExamenId] = useState<string>("");
  const [relatoId, setRelatoId] = useState<string>("");
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [estado, setEstado] = useState<Estado | null>(null);
  const [relatos, setRelatos] = useState<
    { RelatoId: string; Contenido: string }[]
  >([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("-1");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getStorieslist(); // Obtiene la lista de relatos
        setRelatos(response); // Almacena los relatos en el estado
      } catch (error) {
        console.error("Error al obtener relatos:", error);
      }
    };

    fetchStories();
  }, []);

  const handleAddPregunta = () => {
    const newPregunta: Pregunta = {
      Orden: preguntas.length,
      Pista: "",
      TipoPregunta: 0,
      EnunciadoPregunta: "",
      ArchivoPregunta: "",
      TipoRespuesta: TipoRespuesta.Texto,
      EnunciadoRespuesta: "",
      Respuestas: [{ Valor: "", EsCorrecta: false }],
      Puntos: 0,
    };
    setPreguntas([...preguntas, newPregunta]);
  };

  const handleEsCorrectaChange = (
    preguntaIndex: number,
    respuestaIndex: number
  ) => {
    const newPreguntas = [...preguntas];
    newPreguntas[preguntaIndex].Respuestas = newPreguntas[
      preguntaIndex
    ].Respuestas.map((respuesta, index) => ({
      ...respuesta,
      EsCorrecta: index === respuestaIndex,
    }));
    setPreguntas(newPreguntas);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quizData: Quiz = {
      RelatoId: relatoId,
      ExamenId: examenId,
      Preguntas: preguntas,
      Estado: estado,
    };

    try {
      await postCreateQuiz(quizData);
      setRelatoId("");
      setEstado(null);
      setPreguntas([]);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error al registrar el cuestionario:", error);
    }
  };

  const tipoPreguntaNombres = Object.keys(TipoPregunta).filter((key) =>
    isNaN(Number(key))
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md"
    >
      <h1 className="text-2xl font-bold mb-4">Registrar Cuestionario</h1>
      {/* seleccion de relato  */}
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
              {relato.Contenido}
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
            .filter(([key, value]) => isNaN(Number(key)))
            .map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
        </select>
      </div>

      {preguntas.map((pregunta, index) => (
        <div key={index} className="mt-6 border p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Pregunta {index + 1}</h3>
          {/* seleccion tipo de pregunta */}
          <div className="mb-2">
            <label
              htmlFor="tipo-pregunta-select"
              className="block mt-4 mb-2 text-sm font-medium text-gray-700"
            >
              Selección Tipo pregunta
            </label>
            <select
              id="tipo-pregunta-select"
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="-1"></option>
              {Object.entries(tipoPreguntaNombres).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            {/* Selección del orden */}
            <input
              type="number"
              placeholder="Agregar orden"
              value={pregunta.Orden || ""} // Mostrar una cadena vacía si el valor es cero o indefinido
              onChange={(e) => {
                const newPreguntas = [...preguntas];
                newPreguntas[index].Orden = parseInt(e.target.value, 10); // Actualizar el campo Orden
                setPreguntas(newPreguntas);
              }}
              className="block w-full p-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          {/* selección de enunciado pregunta */}
          <input
            type="text"
            placeholder="Enunciado de la pregunta"
            value={pregunta.EnunciadoPregunta}
            onChange={(e) => {
              const newPreguntas = [...preguntas];
              newPreguntas[index].EnunciadoPregunta = e.target.value;
              setPreguntas(newPreguntas);
            }}
            className="block w-full p-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {/* selección de archivoPregunta */}
          <p className="text-sm text-gray-500 mb-2">
            Debes agregar el link de imagen o audio...
          </p>
          <input
            type="text"
            placeholder="Link..."
            value={pregunta.ArchivoPregunta}
            onChange={(e) => {
              const newPreguntas = [...preguntas];
              newPreguntas[index].ArchivoPregunta = e.target.value;
              setPreguntas(newPreguntas);
            }}
            className="block w-full p-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Pista"
            value={pregunta.Pista}
            onChange={(e) => {
              const newPreguntas = [...preguntas];
              newPreguntas[index].Pista = e.target.value;
              setPreguntas(newPreguntas);
            }}
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <div>
            {/* Campo para puntos por respuesta correcta */}
            <input
              type="number"
              placeholder="Puntos por respuesta correcta"
              value={pregunta.Puntos || ""}
              onChange={(e) => {
                const newPreguntas = [...preguntas];
                newPreguntas[index].Puntos = parseInt(e.target.value, 10) || 0;
                setPreguntas(newPreguntas);
              }}
              className="block w-full p-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          {/*Agregar preguntas */}
          <p className="text-sm text-gray-500 mb-2">
            Debe seleccionar la respuesta correcta utilizando el radio button.
          </p>

          {/* Agregar preguntas */}
          {[...Array(4)].map((_, respuestaIndex) => (
            <div key={respuestaIndex} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Respuesta ${respuestaIndex + 1}`}
                value={pregunta.Respuestas[respuestaIndex]?.Valor || ""}
                onChange={(e) => {
                  const newPreguntas = [...preguntas];
                  // Inicializa la respuesta si no existe
                  if (!newPreguntas[index].Respuestas[respuestaIndex]) {
                    newPreguntas[index].Respuestas[respuestaIndex] = {
                      Valor: "",
                      EsCorrecta: false,
                    };
                  }
                  newPreguntas[index].Respuestas[respuestaIndex].Valor =
                    e.target.value;
                  setPreguntas(newPreguntas);
                }}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <input
                type="radio"
                name={`respuesta-correcta-${index}`}
                checked={
                  pregunta.Respuestas[respuestaIndex]?.EsCorrecta || false
                }
                onChange={() => handleEsCorrectaChange(index, respuestaIndex)}
                className="ml-2"
              />
            </div>
          ))}
        </div>
      ))}
      <div className="flex space-x-6">
        <button
          type="button"
          onClick={handleAddPregunta}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Agregar Pregunta
        </button>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Registrar Cuestionario
        </button>
      </div>
    </form>
  );
};

export default QuizRegister;
