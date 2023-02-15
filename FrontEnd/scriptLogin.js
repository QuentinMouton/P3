//Ajout listener sur le boutton du formulaire
document.connexion.addEventListener("submit", async function (e) {
  //Bloque le rechargement auto de la page
  e.preventDefault();
  //Creation de l'objet qui recupere le mail et le mdp du formulaire
  const user = {
    email: this.email.value,
    password: this.password.value,
  };
  //Envoi de la requete pour connecter l'utilisateur
  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    //Test de la reponse de l'API
    .then((res) => {
      if (!res.ok)
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      return res.json();
    })
    //Si identifiants bon stock le token et redirige
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location = "index.html";
    })
    //Si identifiants pas bon affiche le message d'erreur
    .catch((err) => {
      this.firstElementChild.textContent = err.message;
    });
});
