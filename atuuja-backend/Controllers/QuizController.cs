using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class QuizController : ControllerBase{
     
    private readonly FirestoreDb _firestoreDb;
    const string quizKeyDescripcion = "examenes";
    const string quizDescripcion = "Examen";

    public QuizController(IConfiguration config)
    {
        _firestoreDb = FirestoreDb.Create("bd-atuuja");
    }

    [HttpPost("create")]
    public async Task<ActionResult> CreateQuiz([FromBody] Quiz model){
        var quizCollection = _firestoreDb.Collection(quizKeyDescripcion);
        var quizId = Guid.NewGuid().ToString();

        var newQuiz = new Dictionary<string, object>
        {
            { nameof(model.ExamenId), model.ExamenId },
            { nameof(model.RelatoId), model.RelatoId },
            { nameof(model.Preguntas), model.Preguntas }, 
            { nameof(model.Estado), model.Estado }
        };

        await quizCollection.Document(quizId).SetAsync(newQuiz);

        return Ok(new { message = MessageTemplates.Format(MessageTemplates.RegisterInserted, quizDescripcion), QuizId = quizId });
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListQuizzes(){
        var quizSnapshot = await _firestoreDb.Collection(quizKeyDescripcion).GetSnapshotAsync();

        if (!quizSnapshot.Documents.Any())
             return Ok(new List<Dictionary<string, object>>());
        
        var quizList = quizSnapshot.Documents
        .Select(document =>
            {
                var quiz = document.ToDictionary();
                quiz["ExamenId"] = document.Id;
                return quiz;
            }
        ).ToList();

        return Ok(quizList);
    }


    [HttpDelete("delete/{quizId}")]
    public async Task<IActionResult> DeleteQuiz(string quizId)
    {
        try
        {
            var quizCollection = _firestoreDb.Collection(quizKeyDescripcion).Document(quizId);
            var quizSnapshot = await quizCollection.GetSnapshotAsync();

            if (!quizSnapshot.Exists)
                return NotFound( MessageTemplates.Format(MessageTemplates.RegisterNotFound, quizDescripcion));

            await quizCollection.DeleteAsync();
            return Ok(new { message = MessageTemplates.Format(MessageTemplates.RegisterDeleted, quizDescripcion) });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{MessageTemplates.Format(MessageTemplates.ErrorDeletingRegister, quizDescripcion)}: {ex.Message}");
        }
    }

     [HttpPut("update/{quizId}")]
    public async Task<IActionResult> UpdateQuiz(string quizId, [FromBody] Quiz model)
    {
        try
        {
            var quizCollection = _firestoreDb.Collection(quizKeyDescripcion).Document(quizId);
            var quizSnapshot = await quizCollection.GetSnapshotAsync();

            if (!quizSnapshot.Exists)
                return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, quizDescripcion));

            var updatedQuiz = new Dictionary<string, object>
            {
                { nameof(model.RelatoId), model.RelatoId },
                { nameof(model.Preguntas), model.Preguntas }, 
                { nameof(model.Estado), model.Estado }
            };

            await quizCollection.UpdateAsync(updatedQuiz);

            return Ok(new { message = MessageTemplates.Format(MessageTemplates.RegisterUpdated, quizDescripcion)});
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{MessageTemplates.Format(MessageTemplates.ErrorUpdatingRegister, quizDescripcion)}: {ex.Message}");
        }
    }


}