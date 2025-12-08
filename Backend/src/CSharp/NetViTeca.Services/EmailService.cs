using NetViTeca.Core.IServices;
using Microsoft.Extensions.Logging;

namespace NetViTeca.Services;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;

    public EmailService(ILogger<EmailService> logger)
    {
        _logger = logger;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        // SIMULACIÓN: En un entorno real aquí iría la lógica SMTP (MailKit / SendGrid)
        _logger.LogInformation($"[EMAIL SIMULADO] Enviando a: {to} | Asunto: {subject} | Cuerpo: {body}");
        await Task.CompletedTask;
    }

    public async Task SendEmailToAllAsync(List<string> recipients, string subject, string body)
    {
        _logger.LogInformation($"[EMAIL MASIVO SIMULADO] Enviando a {recipients.Count} usuarios | Asunto: {subject}");
        foreach (var email in recipients)
        {
             // En realidad esto se haría en batch o cola de mensajes
             await SendEmailAsync(email, subject, body);
        }
    }
}
