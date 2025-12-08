namespace NetViTeca.Core.IServices;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
    Task SendEmailToAllAsync(List<string> recipients, string subject, string body);
}
