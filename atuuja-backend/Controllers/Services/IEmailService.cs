using System.Net.Mail;

public interface IEmailService
{
    Task SendEmailAsync(string toEmail, string subject, string message);
}

public class EmailService : IEmailService
{
    private readonly SmtpClient _smtpClient;

    public EmailService(SmtpClient smtpClient)
    {
        _smtpClient = smtpClient;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        var mailMessage = new MailMessage(configuration["EmailSettings:SenderEmail"], toEmail, subject, message);
        mailMessage.IsBodyHtml = false;
        
        await _smtpClient.SendMailAsync(mailMessage);
    }
}
