public static class MessageTemplates
{
    public const string RegisterNotFound = "El {0} no existe.";
    public const string RegisterInserted = "{0} creado exitosamente.";
    public const string RegisterUpdated = "El {0} ha sido actualizado exitosamente.";
    public const string RegisterDeleted = "El {0} ha sido eliminado exitosamente.";
    public const string ErrorUpdatingRegister = "Error al actualizar el {0}.";
    public const string ErrorDeletingRegister = "Error al eliminar el {0}.";
    public const string ErrorGettingRegister = "Error al intentar obtener el {0}.";
    public const string ErrorGettingRegisterWith = "Error al intentar obtener el {0} con el campo {1}.";
    public const string InstructionsSends = "Instrucciones para restablecer la contraseña enviadas al correo electrónico del {0}";
    public const string d = "oken inválido o expirado.";


    public static string Format(string template, string description)
    {
        return string.Format(template, description);
    }

     public static string Format(string template, string description, string field)
    {
        return string.Format(template, description, field);
    }
}
