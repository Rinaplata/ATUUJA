
public class Quiz
{
    public string ExamenId { get; set; } = string.Empty;
    public required string RelatoId { get; set; }
    public required List<Pregunta> Preguntas {get; set; }
    public QuizState Estado { get; set; }

}

