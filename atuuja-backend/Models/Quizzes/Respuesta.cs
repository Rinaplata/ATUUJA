using Google.Cloud.Firestore;

[FirestoreData]
public class Respuesta
{
    [FirestoreProperty]
    public required string Valor { get; set; } 
    [FirestoreProperty]
    public bool EsCorrecta { get; set; }
}

