using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class RewardController : ControllerBase
{
    private readonly FirestoreDb _firestoreDb;
    const string rewardDescription = "premios";

    public RewardController()
    {
        _firestoreDb = FirestoreDb.Create("bd-atuuja");
    }

    // POST: api/Reward/create
    [HttpPost("create")]
    public async Task<IActionResult> CreateReward([FromBody] Reward model)
    {
        var rewardCollection = _firestoreDb.Collection(rewardDescription);
        var rewardId = Guid.NewGuid().ToString();

        var newReward = new Dictionary<string, object>
        {
            { nameof(model.PremioId), rewardId },
            { nameof(model.Nombre), model.Nombre },
            { nameof(model.Descripcion), model.Descripcion },
            { nameof(model.Puntos), model.Puntos },
            { nameof(model.ImagenUrl), model.ImagenUrl }
        };

        // Guardar el nuevo premio en Firestore
        await rewardCollection.Document(rewardId).SetAsync(newReward);

        return Ok(new { message = "Premio creado exitosamente.", PremioId = rewardId });
    }

    [HttpDelete("delete/{premioId}")]
    public async Task<IActionResult> DeleteReward(string premioId)
    {
        try
        {
            var rewardDocument = _firestoreDb.Collection(rewardDescription).Document(premioId);
            var rewardSnapshot = await rewardDocument.GetSnapshotAsync();

            if (!rewardSnapshot.Exists)
                return NotFound("El premio no existe.");

            await rewardDocument.DeleteAsync();
            return Ok(new { message = "Premio eliminado exitosamente." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al eliminar el premio: {ex.Message}");
        }
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListReward()
    {
        var rewardSnapshot = await _firestoreDb.Collection(rewardDescription).GetSnapshotAsync();

        if (!rewardSnapshot.Documents.Any())
            return Ok(new List<Dictionary<string, object>>());

        var rewardList = rewardSnapshot.Documents
            .Select(document =>
            {
                var reward = document.ToDictionary();
                reward["PremioId"] = document.Id;
                return reward;
            }).ToList();

        return Ok(rewardList);
    }


    [HttpPut("update/{premioId}")]
    public async Task<IActionResult> UpdateReward(string premioId, [FromBody] Reward model)
    {
        try
        {
            var documentRef = _firestoreDb.Collection(rewardDescription).Document(premioId);
            var rewardSnapshot = await documentRef.GetSnapshotAsync();

            if (!rewardSnapshot.Exists)
                return NotFound("El premio no existe.");

            var updatedReward = new Dictionary<string, object>
            {
                { nameof(model.Nombre), model.Nombre },
                { nameof(model.Descripcion), model.Descripcion },
                { nameof(model.Puntos), model.Puntos },
                { nameof(model.ImagenUrl), model.ImagenUrl }
            };

            await documentRef.UpdateAsync(updatedReward);

            return Ok(new { message = "Premio actualizado exitosamente." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al actualizar el premio: {ex.Message}");
        }
    }

}