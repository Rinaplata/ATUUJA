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