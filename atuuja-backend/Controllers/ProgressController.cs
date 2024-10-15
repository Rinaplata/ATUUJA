using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;


[Route("api/[controller]")]
[ApiController]
public class ProgressController : ControllerBase
{
    private readonly FirestoreDb _firestoreDb;
    const string progressKeyDescripcion = "progress";
    const string progressDescripcion = "Progreso";

    public ProgressController(IConfiguration config)
    {
        _firestoreDb = FirestoreDb.Create("bd-atuuja");
    }

    [HttpPost("saveProgress")]
    public async Task<ActionResult> SaveProgress([FromBody] Progress model)
    {
        var progressCollection = _firestoreDb.Collection(progressKeyDescripcion);
        var progressId = Guid.NewGuid().ToString();

        var newProgress = new Dictionary<string, object>
    {
        { nameof(model.Id), progressId },
        { nameof(model.UsuarioId), model.UsuarioId },
        { nameof(model.ExamenId), model.ExamenId },
        { nameof(model.RelatoId), model.RelatoId },
        { nameof(model.OrdenPreguntaActual), model.OrdenPreguntaActual },
        { nameof(model.PuntosAcumulados), model.PuntosAcumulados }
    };

        await progressCollection.Document(progressId).SetAsync(newProgress);

        return Ok(MessageTemplates.Format(MessageTemplates.RegisterInserted, progressDescripcion));
    }

    [HttpGet("listProgress")]
    public async Task<IActionResult> ListProgress()
    {
        var progressSnapshot = await _firestoreDb.Collection(progressKeyDescripcion).GetSnapshotAsync();

        if (!progressSnapshot.Documents.Any())
            return Ok(new List<Dictionary<string, object>>());

        var progressList = progressSnapshot.Documents
            .Select(document =>
            {
                var progress = document.ToDictionary();
                progress["Id"] = document.Id;
                return progress;
            })
            .ToList();

        return Ok(progressList);
    }

    [HttpPut("updateProgress/{progressId}")]
    public async Task<IActionResult> UpdateProgress(string progressId, [FromBody] Progress model)
    {
        var progressDocument = _firestoreDb.Collection(progressKeyDescripcion).Document(progressId);

        var snapshot = await progressDocument.GetSnapshotAsync();
        if (!snapshot.Exists)
        {
            return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, progressDescripcion));
        }
        var updatedProgress = new Dictionary<string, object>
        { 
            { nameof(model.ExamenId), model.ExamenId },
            { nameof(model.RelatoId), model.RelatoId },
            { nameof(model.OrdenPreguntaActual), model.OrdenPreguntaActual },
            { nameof(model.PuntosAcumulados), model.PuntosAcumulados }
        };

        await progressDocument.UpdateAsync(updatedProgress);

        return Ok(MessageTemplates.Format(MessageTemplates.RegisterUpdated, progressDescripcion));
    }


}
