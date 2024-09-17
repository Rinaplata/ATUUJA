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

    [HttpDelete("delete/{relatoId}")]
    public async Task<IActionResult> DeleteStory(string relatoId)

    {
    var storiesCollection = _firestoreDb.Collection("relatos");
    var storySnapshot = await storiesCollection.Document(relatoId).GetSnapshotAsync();

    if (!storySnapshot.Exists)
    {
        return NotFound("El relato no existe.");
    }

    await storiesCollection.Document(relatoId).DeleteAsync();
    
    return Ok(new { message = "Relato eliminado exitosamente." });
}


   [HttpGet("list")]
    public async Task<IActionResult> ListStories()
    {
    var storiesCollection = _firestoreDb.Collection("relatos");
    var storySnapshot = await storiesCollection.GetSnapshotAsync();

    var storiesList = new List<Dictionary<string, object>>();

    foreach (var document in storySnapshot.Documents)
    {
        var story = document.ToDictionary();
        story["RelatoId"] = document.Id; // Añadir el ID del documento al diccionario
        storiesList.Add(story);
    }

    return Ok(storiesList);
}

[HttpPut("update/{relatoId}")]
public async Task<IActionResult> UpdateStory(string relatoId, [FromBody] StoryCreate model)
{
    var storiesCollection = _firestoreDb.Collection("relatos");
    var storySnapshot = await storiesCollection.Document(relatoId).GetSnapshotAsync();

    if (!storySnapshot.Exists)
    {
        return NotFound("El relato no existe.");
    }

    var updatedStory = new Dictionary<string, object>
    {
        { "Titulo", model.Titulo },
        { "Contenido", model.Contenido },
        { "PalabrasResaltadas", model.PalabrasResaltadas },
        { "AudioUrl", model.AudioUrl }
    };

    await storiesCollection.Document(relatoId).UpdateAsync(updatedStory);

    return Ok(new { message = "Relato actualizado exitosamente." });
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

