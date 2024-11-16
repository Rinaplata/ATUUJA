public class StoryCreate
{
    public string RelatoId { get; set; } = string.Empty;
    public string Titulo { get; set; }
    public string Contenido { get; set; }
    public List<PalabrasResaltadas> PalabrasResaltadas { get; set; } 
    public string AudioUrl { get; set; }
    public string ImageUrl { get; set; }
    public string Subtitle { get; set; }
    public required string Traduccion { get; set; }
}

 public class PalabrasResaltadas
{
    public string Palabra { get; set; } = string.Empty;
    public string Traduccion { get; set; } = string.Empty;
    public string AudioUrl { get; set; } = string.Empty;
}

