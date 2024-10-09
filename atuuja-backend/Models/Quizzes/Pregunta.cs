public class Pregunta
{
    public required int Orden { get; set; }
    public required string Pista { get; set; }
    public FormatoContenido TipoPregunta { get; set; } 
    public string EnunciadoPregunta { get; set; }  = string.Empty;
    public string ArchivoPregunta { get; set; } = string.Empty;
    public FormatoContenido TipoRespuesta { get; set; }
    public string EnunciadoRespuesta { get; set; }  = string.Empty;
    public required List<Respuesta> Respuestas { get; set; }
    public int Puntos { get; set; }
}