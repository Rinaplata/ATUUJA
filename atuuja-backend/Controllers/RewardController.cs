using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class RewardController : ControllerBase
{
    private readonly FirestoreDb _firestoreDb;

    public RewardController()
    {
         _firestoreDb = FirestoreDb.Create("bd-atuuja");
    }

    // POST: api/Reward/create
    [HttpPost("create")]
    public async Task<IActionResult> CreateReward([FromBody] Reward model)
    {
        var RewardCollection = _firestoreDb.Collection("premios");
        
        // Verificar si ya existe un relato con el mismo título
        if(model.PremioId != string.Empty)
        {
            var RewardSnapshot = await RewardCollection.Document(model.PremioId).GetSnapshotAsync();

            if (RewardSnapshot.Exists)
            {
                return Conflict("Ya existe un premio con el mismo título.");
            }
        } 

        // Generar un ID único para el relato
        var relatoId = RewardCollection.Document().Id;

        // Crear un nuevo relato con los datos proporcionados
        var newReward = new Dictionary<string, object>
        {
            { "PremioId", Guid.NewGuid().ToString() }, 
            { "Nombre", model.Nombre },
            { "Descripcion", model.Descripcion },
            { "Puntos", model.Puntos },
            { "ImagenUrl", model.ImagenUrl }
        };

        // Guardar el relato en Firestore
        await RewardCollection.Document(relatoId).SetAsync(newReward);

        return Ok(new { message = "Premio creado exitosamente.", RelatoId = relatoId });
    }

    [HttpDelete("delete/{relatoId}")]
    public async Task<IActionResult> DeleteReward(string relatoId)

    {
    var RewardCollection = _firestoreDb.Collection("premios");
    var RewardSnapshot = await RewardCollection.Document(relatoId).GetSnapshotAsync();

    if (!RewardSnapshot.Exists)
    {
        return NotFound("El premio no existe.");
    }

    await RewardCollection.Document(relatoId).DeleteAsync();
    
    return Ok(new { message = "Premio eliminado exitosamente." });
}


   [HttpGet("list")]
    public async Task<IActionResult> ListReward()
    {
    var RewardCollection = _firestoreDb.Collection("premios");
    var RewardSnapshot = await RewardCollection.GetSnapshotAsync();

    var RewardList = new List<Dictionary<string, object>>();

    foreach (var document in RewardSnapshot.Documents)
    {
        var Reward = document.ToDictionary();
        Reward["PremioId"] = document.Id; // Añadir el ID del documento al diccionario
        RewardList.Add(Reward);
    }

    return Ok(RewardList);
}

[HttpPut("update/{premioId}")]
public async Task<IActionResult> UpdateReward(string premioId, [FromBody] Reward model)
{
    var RewardCollection = _firestoreDb.Collection("premios");
    var RewardSnapshot = await RewardCollection.Document(premioId).GetSnapshotAsync();

    if (!RewardSnapshot.Exists)
    {
        return NotFound("El premio no existe.");
    }

    var updatedReward = new Dictionary<string, object>
    {
        { "Nombre", model.Nombre },
        { "Descripcion", model.Descripcion },
        { "Puntos", model.Puntos },
        { "ImagenUrl", model.ImagenUrl }
    };

    await RewardCollection.Document(premioId).UpdateAsync(updatedReward);

    return Ok(new { message = "Premio actualizado exitosamente." });
}

}

public class Reward
{
    public string PremioId { get; set; }  
    public string Nombre { get; set; }    
    public string Descripcion { get; set; } 
    public int Puntos { get; set; } 
    public string ImagenUrl { get; set; } 
}

