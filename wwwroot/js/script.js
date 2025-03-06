// Fonction pour vérifier l'état des checkboxes et activer/désactiver le bouton
function toggleGenererButton() {
    const checkboxes = document.querySelectorAll(".checkbox-group input[type='checkbox']");
    const genererBtn = document.getElementById("genererBtn");
    const isChecked = Array.from(checkboxes).some(cb => cb.checked);

    // Active le bouton si au moins une checkbox est cochée
    genererBtn.disabled = !isChecked;
}

// Écouteur d'événements pour les checkboxes
const checkboxes = document.querySelectorAll(".checkbox-group input[type='checkbox']");
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        toggleGenererButton();

        // Si toutes les checkboxes sont décochées, cochez la première
        if (Array.from(checkboxes).every(cb => !cb.checked)) {
            checkboxes[0].checked = true;
        }
    });
});

// Initialiser l'état du bouton au chargement de la page
toggleGenererButton();

// Écouteur d'événements pour le bouton "Générer"
document.getElementById("genererBtn").addEventListener("click", function () {
    const longueur = document.getElementById("longueur").value;
    const utiliserMajuscules = document.getElementById("majuscule").checked;
    const utiliserMinuscules = document.getElementById("minuscule").checked;
    const utiliserChiffres = document.getElementById("chiffres").checked;
    const utiliserSpeciaux = document.getElementById("speciaux").checked;

    // Vérification si au moins une case est cochée
    if (!utiliserMajuscules && !utiliserMinuscules && !utiliserChiffres && !utiliserSpeciaux) {
        alert("Veuillez sélectionner au moins un type de caractère !");
        return;
    }

    let caracteres = "";
    if (utiliserMajuscules) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (utiliserMinuscules) caracteres += "abcdefghijklmnopqrstuvwxyz";
    if (utiliserChiffres) caracteres += "0123456789";
    if (utiliserSpeciaux) caracteres += "!@#$%^&*()_+[]{}|;:',.<>?";

    let motDePasse = "";
    for (let i = 0; i < longueur; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        motDePasse += caracteres[index];
    }

    document.getElementById("resultat").textContent = motDePasse;
});

// Écouteur d'événements pour le bouton "Copier"
document.getElementById("copierBtn").addEventListener("click", function () {
    const motDePasse = document.getElementById("resultat").textContent;
    navigator.clipboard.writeText(motDePasse)
        .then(() => {
            alert("Mot de passe copié dans le presse-papiers !");
        })
        .catch(err => {
            console.error("Erreur lors de la copie : ", err);
        });
});
