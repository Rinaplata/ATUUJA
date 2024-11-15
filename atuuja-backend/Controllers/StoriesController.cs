using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class StoriesController : ControllerBase
{
    private readonly FirestoreDb _firestoreDb;
    const string storyKeyDescripcion = "relatos";
    const string storyDescripcion = "Relato";

    public StoriesController(IConfiguration config)
    {
        _firestoreDb = FirestoreDb.Create("bd-atuuja");
    }

    // POST: api/stories/create
    [HttpPost("create")]
    public async Task<IActionResult> CreateStory([FromBody] StoryCreate model)
    {
        var storiesCollection = _firestoreDb.Collection(storyKeyDescripcion);
        var storiesId = Guid.NewGuid().ToString();

        // Crear un nuevo relato con los datos proporcionados
        var newStory = new Dictionary<string, object>
        {
            { nameof(model.RelatoId), storiesId },
            { nameof(model.Titulo), model.Titulo },
            { nameof(model.Contenido), model.Contenido },
            { nameof(model.PalabrasResaltadas), model.PalabrasResaltadas.Select(p => new
                {
                    p.Palabra,
                    p.Traduccion,
                    p.AudioUrl
                }).ToList() },
            { nameof(model.AudioUrl), model.AudioUrl },
            { nameof(model.ImageUrl), model.ImageUrl },
            { nameof(model.Subtitle), model.Subtitle },
            { nameof(model.Traduccion), model.Traduccion }
        };

        // Guardar el relato en Firestore
        await storiesCollection.Document(storiesId).SetAsync(newStory);

        return Ok(new
        {
            message = MessageTemplates.Format(MessageTemplates.RegisterInserted, storyDescripcion),
            RelatoId = storiesId
        });
    }

    [HttpDelete("delete/{relatoId}")]
    public async Task<IActionResult> DeleteStory(string relatoId)
    {
        try
        {
            var storiesCollection = _firestoreDb.Collection(storyKeyDescripcion).Document(relatoId);
            var storySnapshot = await storiesCollection.GetSnapshotAsync();

            if (!storySnapshot.Exists)
                return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, storyDescripcion));

            await storiesCollection.DeleteAsync();
            return Ok(new { message = MessageTemplates.Format(MessageTemplates.RegisterDeleted, storyDescripcion) });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{MessageTemplates.Format(MessageTemplates.ErrorDeletingRegister, storyDescripcion)}: {ex.Message}");
        }
    }


    [HttpGet("list")]
    public async Task<IActionResult> ListStories()
    {
        var storySnapshot = await _firestoreDb.Collection(storyKeyDescripcion).GetSnapshotAsync();

        if (!storySnapshot.Documents.Any())
            return Ok(new List<Dictionary<string, object>>());

        var storyList = storySnapshot.Documents
                  .Select(document =>
                  {
                      var reward = document.ToDictionary();
                      reward["RelatoId"] = document.Id;
                      return reward;
                  }).ToList();

        return Ok(storyList);
    }


    [HttpPut("update/{relatoId}")]
    public async Task<IActionResult> UpdateStory(string relatoId, [FromBody] StoryCreate model)
    {
        try
        {
            var storiesCollection = _firestoreDb.Collection(storyKeyDescripcion).Document(relatoId);
            var storySnapshot = await storiesCollection.GetSnapshotAsync();

            if (!storySnapshot.Exists)
                return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, storyDescripcion));

            var updatedStory = new Dictionary<string, object>
        {
            { nameof(model.Titulo), model.Titulo },
            { nameof(model.Contenido), model.Contenido },
            { nameof(model.PalabrasResaltadas), model.PalabrasResaltadas.Select(p => new
                {
                    p.Palabra,
                    p.Traduccion,
                    p.AudioUrl
                }).ToList() },
            { nameof(model.AudioUrl), model.AudioUrl },
            { nameof(model.ImageUrl), model.ImageUrl },
            { nameof(model.Subtitle), model.Subtitle },
            { nameof(model.Traduccion), model.Traduccion }
        };

            await storiesCollection.UpdateAsync(updatedStory);

            return Ok(new { message = MessageTemplates.Format(MessageTemplates.RegisterUpdated, storyDescripcion) });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{MessageTemplates.Format(MessageTemplates.ErrorUpdatingRegister, storyDescripcion)}: {ex.Message}");
        }
    }
}

