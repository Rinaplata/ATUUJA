using Google.Cloud.Firestore;

[FirestoreData]
public class Pregunta
{
    [FirestoreProperty]
    public required int Orden { get; set; }
    [FirestoreProperty]
    public required string Pista { get; set; }
    [FirestoreProperty]
    public FormatoContenido TipoPregunta { get; set; } 
    [FirestoreProperty]
    public string EnunciadoPregunta { get; set; }  = string.Empty;
    [FirestoreProperty]
    public string ArchivoPregunta { get; set; } = string.Empty;
    [FirestoreProperty]
    public FormatoContenido TipoRespuesta { get; set; }
    [FirestoreProperty]
    public string EnunciadoRespuesta { get; set; }  = string.Empty;
    [FirestoreProperty]
    public required List<Respuesta> Respuestas { get; set; }
    [FirestoreProperty]
    public int Puntos { get; set; }
}