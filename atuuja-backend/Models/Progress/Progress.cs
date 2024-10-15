public class Progress
{
    public string Id { get; set; } = string.Empty;
    public required string UsuarioId { get; set; }
    public required string ExamenId { get; set; }
    public required string RelatoId { get; set; }
    public required int OrdenPreguntaActual { get; set; } 
    public int PuntosAcumulados { get; set; }
}
