export type Quiz = {
    RelatoId: string;
    ExamenId: string;
    Preguntas: Pregunta[];
    Estado: Estado;
  };
  
  export type Pregunta = {
    Respuestas: Respuesta[];
    ArchivoPregunta: string;
    TipoRespuesta: TipoRespuesta;
    EnunciadoRespuesta: string;
    Orden: number;
    Puntos: number;
    EnunciadoPregunta: string;
    TipoPregunta: TipoPregunta;
    Pista: string;
  };
  
  export type Respuesta = {
    Valor: string;
    EsCorrecta: boolean;
  };
  
  export enum TipoRespuesta {
    Texto = 0,
    Audio = 1,
    Imagen = 2
  }
  
  export enum TipoPregunta {
    Texto = 0,
    Audio = 1,
    Imagen = 2
  }
  
  export enum Estado {
    Activo = 0,
    Inactivo = 1,
  }
  