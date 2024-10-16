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
    const string usersyKeyDescripcion = "users";
    const string userDescripcion = "Usuario";


    public AuthController(IConfiguration config)
    {
        _firestoreDb = FirestoreDb.Create("bd-atuuja");
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
            { nameof(model.IsAdmin),  model.IsAdmin },
            { nameof(model.Edad),  model.Edad },
            { nameof(model.Cuidad),  model.Cuidad },
            { nameof(model.TipoDocumento),  model.TipoDocumento },
            { nameof(model.NumeroDocumento),  model.NumeroDocumento },
        };

        await usersCollection.Document(model.Username).SetAsync(newUser);

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
            var token = GenerateJwtToken(model.Email);
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
            var token = GenerateJwtToken(model.Email);
            return Ok(new { Token = token });
        }
        return Unauthorized();
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListUsers()
    {
        var usersSnapshot = await _firestoreDb.Collection(usersyKeyDescripcion).GetSnapshotAsync();

        if (!usersSnapshot.Documents.Any())
            return Ok(new List<Dictionary<string, object>>());

        var usersList = usersSnapshot.Documents
        .Select(document =>
            {
                var user = document.ToDictionary();
                user["Username"] = document.Id;
                return user;
            }
        ).ToList();

        return Ok(usersList);
    }


    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var query = usersCollection.WhereEqualTo("Email", model.Email);
        var querySnapshot = await query.GetSnapshotAsync();

        if (querySnapshot.Count == 0)
          return NotFound(MessageTemplates.Format(MessageTemplates.RegisterNotFound, userDescripcion)); 

        // Asumimos que el email es único, por lo que tomamos el primer resultado
        var userDoc = querySnapshot.Documents[0];
        var resetToken = Guid.NewGuid().ToString();

        // Guardar el token de restablecimiento en Firestore (con un tiempo de expiración opcional)
        var tokenData = new Dictionary<string, object>
        {
            { "ResetToken", resetToken },
            { "TokenExpiration", DateTime.UtcNow.AddHours(1) } // Expira en 1 hora
        };
        await userDoc.Reference.UpdateAsync(tokenData);

        // Aquí puedes enviar el email con el token al usuario (no implementado en este ejemplo)
        return Ok(new { message = MessageTemplates.Format(MessageTemplates.InstructionsSends) });
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
        if (userData.ContainsKey("TokenExpiration") && DateTime.UtcNow > (DateTime)userData["TokenExpiration"])
        {
            return BadRequest(MessageTemplates.Format(MessageTemplates.ExpiredToken));
        }

        // Actualizar la contraseña
        await userDoc.Reference.UpdateAsync(new Dictionary<string, object>
    {
        { nameof(model.NewPassword), model.NewPassword },
        { "ResetToken", null }, // Limpiar el token de restablecimiento
        { "TokenExpiration", null }
    });

        return Ok(MessageTemplates.Format(MessageTemplates.Expiredpassword));
    }

    private string GenerateJwtToken(string username)
    {
        var jwtSettings = _config.GetSection("JwtSettings");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}


