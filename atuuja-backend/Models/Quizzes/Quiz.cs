public class Quiz
{
    public required string ExamenId { get; set; }
    public required string RelatoId { get; set; }
    public QuizState Estado { get; set; }
    public required List<Pregunta> Preguntas {get; set; }
}