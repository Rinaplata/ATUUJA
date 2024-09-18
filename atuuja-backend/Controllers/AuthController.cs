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

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly FirestoreDb _firestoreDb;

    public AuthController(IConfiguration config)
    {
        _firestoreDb = FirestoreDb.Create("bd-atuuja");
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegister model)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var userSnapshot = await usersCollection.Document(model.Username).GetSnapshotAsync();

        if (userSnapshot.Exists)
        {
            return Conflict("El usuario ya existe!.");
        }
        var newUser = new Dictionary<string, object>
        {
            { "Email", model.Email },
            { "Username", model.Username },
            { "Password", model.Password }
        };

        await usersCollection.Document(model.Username).SetAsync(newUser);

        return Ok("Registro exitoso.");
    }

    [HttpGet("get/{username}")]
    public async Task<IActionResult> GetUser(string username)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var userSnapshot = await usersCollection.Document(username).GetSnapshotAsync();

        if (!userSnapshot.Exists)
        {
            return NotFound("El usuario no existe.");
        }

        var userData = userSnapshot.ToDictionary();
        return Ok(userData);
    }

    [HttpPut("update/{username}")]
    public async Task<IActionResult> UpdateUser(string username, [FromBody] UserRegister model)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var userSnapshot = await usersCollection.Document(username).GetSnapshotAsync();

        if (!userSnapshot.Exists)
        {
            return NotFound("El usuario no existe.");
        }

        var updatedUser = new Dictionary<string, object>
    {
        { "Email", model.Email },
        { "Password", model.Password }
    };

        await usersCollection.Document(username).UpdateAsync(updatedUser);

        return Ok("Usuario actualizado exitosamente.");
    }

    [HttpDelete("delete/{username}")]

    public async Task<IActionResult> DeleteUser(string username)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var userSnapshot = await usersCollection.Document(username).GetSnapshotAsync();

        if (!userSnapshot.Exists)
        {
            return NotFound("El usuario no existe.");
        }

        await usersCollection.Document(username).DeleteAsync();

        return Ok("Usuario eliminado exitosamente.");
    }


    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLogin model)
    {
        if (model.Username == "test" && model.Password == "password")  // Hardcoded, replace with real logic
        {
            var token = GenerateJwtToken(model.Username);
            return Ok(new { Token = token });
        }
        return Unauthorized();
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListUsers()
    {
        var usersCollection = _firestoreDb.Collection("users");
        var usersSnapshot = await usersCollection.GetSnapshotAsync();

        var usersList = new List<Dictionary<string, object>>();

        foreach (var document in usersSnapshot.Documents)
        {
            var user = document.ToDictionary();
            user["Username"] = document.Id; // Incluye el Username como parte de los datos
            usersList.Add(user);
        }

        return Ok(usersList);
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
    {
        var usersCollection = _firestoreDb.Collection("users");
        var query = usersCollection.WhereEqualTo("Email", model.Email);
        var querySnapshot = await query.GetSnapshotAsync();

        if (querySnapshot.Count == 0)
        {
            return NotFound("No se encontró un usuario con ese correo electrónico.");
        }

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
            return BadRequest("Token inválido o expirado.");
        }

        var userDoc = querySnapshot.Documents[0];
        var userData = userDoc.ToDictionary();

        // Verificar si el token ha expirado
        if (userData.ContainsKey("TokenExpiration") && DateTime.UtcNow > (DateTime)userData["TokenExpiration"])
        {
            return BadRequest("El token de restablecimiento ha expirado.");
        }

        // Actualizar la contraseña
        await userDoc.Reference.UpdateAsync(new Dictionary<string, object>
    {
        { "Password", model.NewPassword },
        { "ResetToken", null }, // Limpiar el token de restablecimiento
        { "TokenExpiration", null }
    });

        return Ok("Contraseña restablecida exitosamente.");
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

public class UserRegister
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class UserLogin
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class ForgotPasswordRequest
{
    public string Email { get; set; }
}

public class ResetPasswordRequest
{
    public string Token { get; set; }
    public string NewPassword { get; set; }
}

