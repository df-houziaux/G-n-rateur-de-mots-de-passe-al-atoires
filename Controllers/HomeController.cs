using GénérateurDeMotsDePasse.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using System.Diagnostics;

namespace GénérateurDeMotsDePasse.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // Action pour la page d'accueil
        public IActionResult Index()
        {
            return View();
        }

        // Action pour la page de contact
        public IActionResult Contact()
        {
            return View();
        }

        // Action pour envoyer le formulaire de contact
        [HttpPost]
        public IActionResult SendContactForm(ContactViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Configuration du client SMTP
                    using (SmtpClient smtpClient = new SmtpClient("smtp.example.com"))
                    {
                        smtpClient.Port = 587;
                        smtpClient.Credentials = new NetworkCredential("your-email@example.com", "your-email-password");
                        smtpClient.EnableSsl = true;

                        // Création de l'email
                        using (MailMessage mailMessage = new MailMessage())
                        {
                            mailMessage.From = new MailAddress("your-email@example.com");
                            mailMessage.To.Add("recipient-email@example.com");
                            mailMessage.Subject = model.Sujet;
                            mailMessage.Body = $"Nom: {model.Nom}\nPrénom: {model.Prénom}\nEmail: {model.Email}\nMessage: {model.Message}";
                            mailMessage.IsBodyHtml = false;

                            // Envoi de l'email
                            smtpClient.Send(mailMessage);
                        }
                    }

                    TempData["Success"] = "Votre message a été envoyé avec succès !";
                    return RedirectToAction("Contact");
                }

                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erreur lors de l'envoi de l'email.");
                    TempData["Error"] = "Une erreur est survenue lors de l'envoi de votre message.";
                }
            }

            // Si le modèle n'est pas valide, retourner à la vue Contact avec le modèle
            return View("Contact", model);
        }

        // Action pour gérer les erreurs
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
