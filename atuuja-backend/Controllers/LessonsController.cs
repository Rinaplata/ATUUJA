using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class LessonsController : ControllerBase
{
    private readonly FirestoreDb _firestoreDb;
    private const string CollectionName = "lessons";

    public LessonsController(IConfiguration config)
    {
        _firestoreDb = FirestoreDb.Create("bd-atuuja");
    }

    // POST: api/lesson/create
    [HttpPost("create")]
    public async Task<ActionResult<Lessons>> PostEjercicio(Lessons lesson)
    {
        // Validar el tipo de ejercicio
        if (lesson.Tipo != "escritura" && lesson.Tipo != "audio")
        {
            return BadRequest("El tipo de ejercicio debe ser 'escritura' o 'audio'.");
        }

        // Validar que haya preguntas
        if (lesson.Preguntas == null || lesson.Preguntas.Count == 0)
        {
            return BadRequest("El ejercicio debe contener al menos una pregunta.");
        }

        // Crear un nuevo documento en la colección "lessons"
        CollectionReference lessonsRef = _firestoreDb.Collection(CollectionName);
        DocumentReference docRef = await lessonsRef.AddAsync(lesson);

        // Retornar el ID generado del documento
        lesson.EjercicioId = docRef.Id;
        return CreatedAtAction(nameof(GetEjercicio), new { id = docRef.Id }, lesson);
    }

    // GET: api/lessons/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Lessons>> GetEjercicio(string id)
    {
        DocumentReference docRef = _firestoreDb.Collection(CollectionName).Document(id);
        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

        if (!snapshot.Exists)
        {
            return NotFound();
        }

        Lessons lesson = snapshot.ConvertTo<Lessons>();
        return lesson;
    }

    // DELETE: api/lessons/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLesson(string id)
    {
        DocumentReference docRef = _firestoreDb.Collection(CollectionName).Document(id);
        DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

        // Verificar si el documento existe
        if (!snapshot.Exists)
        {
            return NotFound("La lección no existe.");
        }

        // Eliminar el documento de Firestore
        await docRef.DeleteAsync();
        
        return Ok("Lección eliminada correctamente.");
    }
}

public class Lessons
{
    public string EjercicioId { get; set; } // Cambiado de int a string
    public int RelatoId { get; set; } // Foreign key
    public string Tipo { get; set; } // Tipo de ejercicio: escritura o audio
    public List<Pregunta> Preguntas { get; set; } // Lista de preguntas
    public object RespuestaCorrecta { get; set; } // Respuesta correcta
}

public class Pregunta 
{
    public string Descripcion { get; set;}

}