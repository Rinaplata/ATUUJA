public class UserRegister
{
    public string Id { get; set; } =string.Empty;
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required bool IsAdmin { get; set; }
    public required int Edad { get; set; }
    public required string Cuidad { get; set; }
    public required IdentificationType TipoDocumento { get; set; }
    public required string NumeroDocumento { get; set; }
}