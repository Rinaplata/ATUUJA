using FireSharp.Config;
using FireSharp.Interfaces;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth.OAuth2;
using Newtonsoft.Json;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly FirestoreDb _firestoreDb;
    private readonly IEmailService _emailService;
    const string usersyKeyDescripcion = "users";
    const string userDescripcion = "Usuario";
    const string progressKeyDescripcion = "progress";
    const string quizKeyDescripcion = "examenes";

    public AuthController(IConfiguration config, IEmailService emailService)
    {
        _firestoreDb = FirestoreDb.Create("bd-atuuja");
        _emailService = emailService;
        _config = config;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegister model)
    {
        var usersCollection = _firestoreDb.Collection(usersyKeyDescripcion);
        var userId = Guid.NewGuid().ToString();

        var newUser = new Dictionary<string, object>
        {
            { nameof(model.Id), userId },
            { nameof(model.Email), model.Email },
            { nameof(model.Username), model.Username },
            { nameof(model.Password), model.Password },
            { nameof(model.IsAdmin),  false },
            { nameof(model.Edad),  model.Edad },
            { nameof(model.Cuidad),  model.Cuidad },
            { nameof(model.TipoDocumento),  model.TipoDocumento },
            { nameof(model.NumeroDocumento),  model.NumeroDocumento },
        };

        await usersCollection.Document(userId).SetAsync(newUser);

        return Ok(MessageTemplates.Format(MessageTemplates.RegisterInserted, userDescripcion));
    }

    [HttpGet("get/{userId}")]
    public async Task<IActionResult> GetUser(string userId)
    {
        try
        {
            var usersCollection = _firestoreDb.Collection(usersyKeyDescripcion);

            var query = usersCollection.WhereEqualTo("Id", userId);
            var querySnapshot = await query.GetSnapshotAsync();

            if (querySnapshot.Count == 0)
                return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, userDescripcion));

            var userData = querySnapshot.Documents.First().ToDictionary();
            return Ok(userData);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{MessageTemplates.Format(MessageTemplates.ErrorGettingRegister, userDescripcion)}: {ex.Message}");
        }
    }

    [HttpGet("getUserProgress/{userId}")]
    public async Task<IActionResult> GetUserProgress(string userId)
    {
        try
        {
            // 1. Obtener los datos del usuario
            var usersCollection = _firestoreDb.Collection(usersyKeyDescripcion);
            var query = usersCollection.WhereEqualTo("Id", userId);
            var querySnapshot = await query.GetSnapshotAsync();

            if (querySnapshot.Count == 0)
                return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, userDescripcion));

            var userData = querySnapshot.Documents.First().ToDictionary();

            // 2. Obtener los datos de progreso del usuario
            var progressCollection = _firestoreDb.Collection(progressKeyDescripcion);
            var progressQuery = progressCollection.WhereEqualTo("UsuarioId", userId);
            var progressSnapshot = await progressQuery.GetSnapshotAsync();

            List<Dictionary<string, object>> userProgressData = new List<Dictionary<string, object>>();

            if (progressSnapshot.Documents.Any())
            {
                userProgressData = progressSnapshot.Documents
                    .Select(document =>
                    {
                        var progress = document.ToDictionary();
                        progress["Id"] = document.Id;  // Agregar ID del documento de progreso
                        return progress;
                    })
                    .ToList();
            }

            // 3. Combinar los datos del usuario con los de progreso
            var userWithProgress = new
            {
                User = userData,
                Progress = userProgressData
            };

            return Ok(userWithProgress);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{MessageTemplates.Format(MessageTemplates.ErrorGettingRegister, userDescripcion)}: {ex.Message}");
        }
    }


    [HttpPut("update/{userId}")]
    public async Task<IActionResult> UpdateUser(string userId, [FromBody] UserRegister model)
    {
        try
        {
            var usersCollection = _firestoreDb.Collection(usersyKeyDescripcion);

            var query = usersCollection.WhereEqualTo("Id", userId);
            var querySnapshot = await query.GetSnapshotAsync();

            if (querySnapshot.Count == 0)
                return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, userDescripcion));

            var userDocument = querySnapshot.Documents.First();
            var updatedUser = new Dictionary<string, object>
        {
            { nameof(model.Email), model.Email },
            { nameof(model.Username), model.Username },
            { nameof(model.Password), model.Password },
            { nameof(model.IsAdmin), model.IsAdmin },
            { nameof(model.Edad),  model.Edad },
            { nameof(model.Cuidad),  model.Cuidad },
            { nameof(model.TipoDocumento),  model.TipoDocumento },
            { nameof(model.NumeroDocumento),  model.NumeroDocumento },
        };

            await userDocument.Reference.UpdateAsync(updatedUser);

            return Ok(MessageTemplates.Format(MessageTemplates.RegisterUpdated, userDescripcion));
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{MessageTemplates.Format(MessageTemplates.ErrorUpdatingRegister, userDescripcion)}: {ex.Message}");
        }
    }


    [HttpDelete("delete/{userId}")]
    public async Task<IActionResult> DeleteUser(string userId)
    {
        try
        {
            var usersCollection = _firestoreDb.Collection(usersyKeyDescripcion);

            var query = usersCollection.WhereEqualTo("Id", userId);
            var querySnapshot = await query.GetSnapshotAsync();

            if (querySnapshot.Count == 0)
                return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, userDescripcion));

            var userDocument = querySnapshot.Documents.First();
            await userDocument.Reference.DeleteAsync();

            return Ok(MessageTemplates.Format(MessageTemplates.RegisterDeleted, userDescripcion));
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{MessageTemplates.Format(MessageTemplates.ErrorDeletingRegister, userDescripcion)}: {ex.Message}");
        }
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLogin model)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var query = usersCollection.WhereEqualTo("Email", model.Email);
        var querySnapshot = await query.GetSnapshotAsync();

        if (querySnapshot.Count == 0) return Unauthorized();

        var userDoc = querySnapshot.Documents[0];
        var userData = userDoc.ToDictionary();

        if (userData["Password"].ToString() == model.Password)
        {
            var token = GenerateJwtToken(model.Email, userData["Id"].ToString());
            return Ok(new { Token = token });
        }
        return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("loginAdmin")]
    public async Task<IActionResult> LoginAdmin([FromBody] UserLogin model)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var query = usersCollection.WhereEqualTo("Email", model.Email);
        var querySnapshot = await query.GetSnapshotAsync();

        if (querySnapshot.Count == 0) return Unauthorized();

        var userDoc = querySnapshot.Documents[0];
        var userData = userDoc.ToDictionary();

        if (userData["Password"].ToString() == model.Password
        && bool.Parse(userData["IsAdmin"].ToString()) == true)
        {
            var token = GenerateJwtToken(model.Email, userData["Id"].ToString());
            var userId = userDoc.Id;
            return Ok(new { Token = token, UserId = userId });
        }
        return Unauthorized();
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListUsersWithPoints()
    { 
        var usersSnapshot = await _firestoreDb.Collection(usersyKeyDescripcion).GetSnapshotAsync();

        if (!usersSnapshot.Documents.Any())
            return Ok(new List<Dictionary<string, object>>());
 
        var progressSnapshot = await _firestoreDb.Collection(progressKeyDescripcion).GetSnapshotAsync();
        var progressDictionary = progressSnapshot.Documents
            .GroupBy(doc => doc.GetValue<string>("UsuarioId"))
            .ToDictionary(
                g => g.Key,
                g => new
                {
                    PuntosAcumulados = g.First().GetValue<int>("PuntosAcumulados"),
                    RelatoId = g.First().GetValue<string>("RelatoId"),
                    OrdenPreguntaActual = g.First().ContainsField("OrdenPreguntaActual")
                        ? g.First().GetValue<int>("OrdenPreguntaActual")
                        : 0  
                }
            );

        // Obtener la colección de exámenes y contar las preguntas por cada RelatoId
        var examSnapshot = await _firestoreDb.Collection("examenes").GetSnapshotAsync();
        var preguntaCountByRelato = examSnapshot.Documents
            .GroupBy(doc => doc.GetValue<string>("RelatoId"))
            .ToDictionary(
                g => g.Key,
                g => g.Sum(doc => doc.GetValue<List<Dictionary<string, object>>>("Preguntas").Count) // Contar preguntas por RelatoId
            );

         var usersList = usersSnapshot.Documents
            .Select(document =>
            {
                var user = document.ToDictionary();
                user["Id"] = document.Id;

                var userId = document.Id;
                var progressData = progressDictionary.ContainsKey(userId) ? progressDictionary[userId] : null;

                if (progressData != null)
                {
                    user["PuntosAcumulados"] = progressData.PuntosAcumulados;
                    // Agregar la cantidad de preguntas para el RelatoId del usuario
                    var relatoId = progressData.RelatoId;
                    var totalPreguntas = !string.IsNullOrEmpty(relatoId) && preguntaCountByRelato.ContainsKey(relatoId)
                        ? preguntaCountByRelato[relatoId]
                        : 0;
                
                    // Calcular y asignar el campo Progreso como un porcentaje
                    user["Progreso"] = totalPreguntas > 0
                        ? (progressData.OrdenPreguntaActual / (double)totalPreguntas) * 100
                        : 0;
                }
                else
                {  
                    user["PuntosAcumulados"] = 0; 
                    user["Progreso"] = 0;
                }

                return user;
            })
            .ToList();

        return Ok(usersList);
    }



    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var userEmail = request.Email;
        var usersCollection = _firestoreDb.Collection("users");
        var query = usersCollection.WhereEqualTo("Email", userEmail);
        var querySnapshot = await query.GetSnapshotAsync();

        if (querySnapshot.Count == 0)
            return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, userEmail));

        var userDoc = querySnapshot.Documents[0];
        var resetToken = Guid.NewGuid().ToString();

        var tokenData = new Dictionary<string, object>
    {
        { "ResetToken", resetToken },
        { "TokenExpiration", DateTime.UtcNow.AddHours(1) }
    };
        await userDoc.Reference.UpdateAsync(tokenData);

        string baseUrl = _config["AppSettings:FrontendUrl"];
        if (_config["ASPNETCORE_ENVIRONMENT"] == "Development")
        {
            baseUrl = _config["AppSettings:LocalFrontendUrl"];
        }

        var resetLink = $"{baseUrl}/auth/userresetpassword?token={resetToken}";
        var emailSubject = "Restablecimiento de Contraseña";
        var emailBody = $"Hola, \n\nRecibimos una solicitud para restablecer tu contraseña. Haz clic en el enlace de abajo para continuar: \n\n{resetLink} \n\nEste enlace expirará en 1 hora.";

        try
        {
            await _emailService.SendEmailAsync(userEmail, emailSubject, emailBody);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Ocurrió un error al intentar enviar el correo." + ex.Message);
        }

        return Ok(new { message = "Instrucciones para restablecer la contraseña enviadas al correo electrónico." });
    }


    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest model)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var query = usersCollection.WhereEqualTo("ResetToken", model.Token);
        var querySnapshot = await query.GetSnapshotAsync();

        if (querySnapshot.Count == 0)
        {
            return BadRequest(MessageTemplates.Format(MessageTemplates.InvalidateToken));
        }

        var userDoc = querySnapshot.Documents[0];
        var userData = userDoc.ToDictionary();

        // Verificar si el token ha expirado
        if (userData.ContainsKey("TokenExpiration") && userData["TokenExpiration"] is Google.Cloud.Firestore.Timestamp tokenExpirationTimestamp && DateTime.UtcNow > tokenExpirationTimestamp.ToDateTime())
        {
            return BadRequest(MessageTemplates.Format(MessageTemplates.ExpiredToken));
        }

        // Actualizar la contraseña
        await userDoc.Reference.UpdateAsync(new Dictionary<string, object>
        {
            { "Password", model.NewPassword },
            { "ResetToken", null },
            { "TokenExpiration", null }
        });

        return Ok(MessageTemplates.Format(MessageTemplates.Expiredpassword));
    }

    private string GenerateJwtToken(string username, string userId)
    {
        var jwtSettings = _config.GetSection("JwtSettings");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Sid, userId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}


