document.getElementById("genererBtn").addEventListener("click", function () {
    const longueur = document.getElementById("longueur").value;
    const utiliserMajuscules = document.getElementById("majuscule").checked;
    const utiliserMinuscules = document.getElementById("minuscule").checked;
    const utiliserChiffres = document.getElementById("chiffres").checked;
    const utiliserSpeciaux = document.getElementById("speciaux").checked;

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
