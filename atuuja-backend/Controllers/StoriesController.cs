using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class StoriesController : ControllerBase
{
    private readonly FirestoreDb _firestoreDb;

    public StoriesController(IConfiguration config)
    {
         _firestoreDb = FirestoreDb.Create("bd-atuuja");
    }

    // POST: api/stories/create
    [HttpPost("create")]
    public async Task<IActionResult> CreateStory([FromBody] StoryCreate model)
    {
        var storiesCollection = _firestoreDb.Collection("relatos");
        
        // Verificar si ya existe un relato con el mismo título
        var storySnapshot = await storiesCollection.Document(model.RelatoId).GetSnapshotAsync();

        if (storySnapshot.Exists)
        {
            return Conflict("Ya existe un relato con el mismo título.");
        }

        // Generar un ID único para el relato
        var relatoId = storiesCollection.Document().Id;

        // Crear un nuevo relato con los datos proporcionados
        var newStory = new Dictionary<string, object>
        {
            { "RelatoId", new Guid().ToString() }, 
            { "Titulo", model.Titulo },
            { "Contenido", model.Contenido },
            { "PalabrasResaltadas", model.PalabrasResaltadas },
            { "AudioUrl", model.AudioUrl },
        };

        // Guardar el relato en Firestore
        await storiesCollection.Document(relatoId).SetAsync(newStory);

        return Ok(new { message = "Relato creado exitosamente.", RelatoId = relatoId });
    }
}

public class StoryCreate
{
    public string RelatoId { get; set; }  
    public string Titulo { get; set; }    
    public string Contenido { get; set; } 
    public List<string> PalabrasResaltadas { get; set; } 
    public string AudioUrl { get; set; } 
}

