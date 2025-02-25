document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const inputs = Array.from(form.querySelectorAll("input, textarea"));
    const submitButton = form.querySelector("button[type='submit']");

    // Désactiver le bouton au départ
    submitButton.disabled = true;

    function showErrorMessage(input, message) {
        let errorMessage = input.nextElementSibling;

        // Vérifie si le span d'erreur existe et l'affiche
        if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.textContent = message;
            errorMessage.style.display = "block";
        } else {
            // Si l'élément n'existe pas, le créer
            errorMessage = document.createElement("span");
            errorMessage.classList.add("error-message", "text-danger");
            errorMessage.textContent = message;
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
        }

        input.classList.add("error");
    }

    function clearErrorMessage(input) {
        let errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.textContent = ""; // Supprime le texte d'erreur
            errorMessage.style.display = "none";
        }
        input.classList.remove("error");
    }

    function validateField(input) {
        const value = input.value.trim();
        let isValid = true;

        if (input.id === "prénom") {
            const namePattern = /^[A-Z][a-zÀ-ÿ\s-]+$/;
            if (!namePattern.test(value)) {
                showErrorMessage(input, "⚠️ Le prénom doit commencer par une majuscule et ne contenir que des lettres.");
                isValid = false;
            } else {
                clearErrorMessage(input);
            }
        } else if (input.id === "nom") {
            const namePattern = /^[A-Z][a-zÀ-ÿ\s-]+$/;
            if (!namePattern.test(value)) {
                showErrorMessage(input, "⚠️ Le nom doit commencer par une majuscule et ne contenir que des lettres.");
                isValid = false;
            } else {
                clearErrorMessage(input);
            }
        } else if (input.id === "email") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                showErrorMessage(input, "⚠️ Veuillez entrer une adresse email valide (ex: exemple@domaine.com).");
                console.log("❌ Erreur : Email invalide.");
                isValid = false;
            } else {
                console.log("✅ Email valide :", value);
                clearErrorMessage(input);
            }

        } else if (input.id === "sujet") {
            const minLength = 5;
            const subjectPattern = /^[a-zA-Z0-9\s-]+$/;

            if (value.length < minLength) {
                showErrorMessage(input, `⚠️ Le sujet doit contenir au moins ${minLength} caractères.`);
                isValid = false;
            } else if (!subjectPattern.test(value)) {
                showErrorMessage(input, "⚠️ Le sujet ne doit contenir que des lettres, des chiffres, des espaces et des tirets.");
                isValid = false;
            } else {
                clearErrorMessage(input);
            }

        } else if (input.id === "message") {
            const minLength = 10; // Longueur minimale du message
            const messagePattern = /^[A-Z][a-zA-Z0-9\s.,!?'-]*$/; // Commence par une majuscule et autorise d'autres caractères

            if (value.length < minLength) {
                showErrorMessage(input, `⚠️ Le message doit contenir au moins ${minLength} caractères.`);
                isValid = false;
            } else if (!messagePattern.test(value)) {
                showErrorMessage(input, "⚠️ Le message doit commencer par une majuscule et ne contenir que des lettres, des chiffres et certains caractères de ponctuation.");
                isValid = false;
            } else {
                clearErrorMessage(input);
            }
        }

        return isValid;
    }

    // Bloquer la progression tant que le champ courant est incorrect
    inputs.forEach((input, index) => {
        input.addEventListener("blur", function () {
            if (!validateField(input)) {
                input.focus(); // Empêcher de passer au champ suivant tant que l'erreur n'est pas corrigée
            } else if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            checkFormValidity();
        });
    });

    function checkFormValidity() {
        const allValid = inputs.every(validateField);
        submitButton.disabled = !allValid;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (inputs.every(validateField)) {
            alert("🎉 Formulaire soumis avec succès !");
            form.reset();
            submitButton.disabled = true;
        } else {
            alert("❌ Veuillez corriger les erreurs avant de soumettre le formulaire.");
        }
    });
});
