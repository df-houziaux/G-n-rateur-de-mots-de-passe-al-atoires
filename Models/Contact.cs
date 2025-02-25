

namespace GénérateurDeMotsDePasse.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ContactViewModel
    {
        [Required(ErrorMessage = "Le champ Prénom est obligatoire.")]
        [Display(Name = "Prénom")]
        public string Prénom { get; set; }

        [Required(ErrorMessage = "Le champ Nom est obligatoire.")]
        [Display(Name = "Nom")]
        public string Nom { get; set; }

        [Required(ErrorMessage = "Le champ Email est obligatoire.")]
        [EmailAddress(ErrorMessage = "Veuillez entrer une adresse email valide.")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Le champ Sujet est obligatoire.")]
        [Display(Name = "Sujet")]
        public string Sujet { get; set; }

        [Required(ErrorMessage = "Le champ Message est obligatoire.")]
        [Display(Name = "Message")]
        public string Message { get; set; }
    }




}


