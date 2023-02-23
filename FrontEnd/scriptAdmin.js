import { generationGallery } from "./script.js";
//Recuperation de tous les travaux
let works;
await fetch("http://localhost:5678/api/works")
  // Test si erreur lors de la recuperation
  .then((res) => {
    if (!res.ok) throw new Error("Erreur lors de la récupérration de travaux");
    return res.json();
  })
  //Stock la reponse dans la variable "works"
  .then((data) => {
    works = data;
  })
  //Affiche le message d'erreur
  .catch((err) => {
    console.error(err.message);
  });

console.log(works);
//Verifie que le token soit bien la
if (localStorage.getItem("token") != null) {
  const token = localStorage.getItem("token");
  //Suppression lien "login"
  const login = document.getElementById("lien-login");
  login.style.display = "none";
  //Suppression des bouttons de filtre
  const boutton = document.getElementById("btn");
  boutton.style.display = "none";
  //Affiche les bouttons "Modifier"
  document.getElementById("btn-modif-profil").style.display = "initial";
  document.getElementById("btn-modif-projet").style.display = "initial";
  //Modal
  let modal = null;
  //Ouverture de la modal
  const ouvreModal = (e) => {
    //Bloque le rechargement auto de la page
    e.preventDefault();
    //Fait apparaitre la modal
    const btnModifier = document.getElementById("modal2");
    btnModifier.style.display = null;
    btnModifier.removeAttribute("aria-hidden");
    btnModifier.setAttribute("aria-modal", "true");
    //Gestion de la suppression des medias lors du click sur la corbeille
    let ids = [];
    const poubelles = document.getElementsByClassName("div-poubelle");
    for (let poubelle of poubelles) {
      poubelle.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);
        //Recuperration de l'id du media à supprimer
        ids.push(e.target.offsetParent.attributes[0].nodeValue);
        console.log(ids);
        //Suppression de la modal
        document.getElementById("modal2").innerHTML = "";
        //Creation modal "confirmation"
        const ouvreModalConfirmation =
          document.getElementById("btn-modif-projet");
        //Creation de la boite
        const confirmeDiv = document.createElement("div");
        confirmeDiv.setAttribute("class", "modal-wrapper modal-stop");
        //Creation de la modal
        const confirmeAside = document.createElement("aside");
        confirmeAside.setAttribute("class", "modal");
        confirmeAside.setAttribute("aria-modal", "true");
        // confirmeAside.setAttribute("aria-hideen", "true");
        confirmeAside.setAttribute("role", "dialog");
        confirmeAside.setAttribute("aria-labelby", "titlemodal");
        //Creation bouton pour fermer
        const confirmeBoutonFerme = document.createElement("button");
        const confirmeImgFerme = document.createElement("img");
        confirmeImgFerme.setAttribute("class", "ferme");
        confirmeImgFerme.src = "./assets/icons/croix.png";
        //Creation du titre
        const confirmeTitle = document.createElement("h3");
        confirmeTitle.setAttribute("id", "titlemodal");
        confirmeTitle.innerText = "Es-tu sur de vouloir supprimer ?";
        //Creation de la div qui accueille l'image
        const confirmeDivMedia = document.createElement("div");
        confirmeDivMedia.setAttribute("id", "confirme-img");
        const confirmeImg = document.createElement("img");
        confirmeImg.src = e.target.parentElement.firstChild.currentSrc;
        confirmeImg.crossOrigin = "";
        //Creation div bouton
        const confirmeDivBouton = document.createElement("div");
        confirmeDivBouton.setAttribute("id", "btn-confirme");
        //Creation bouton "oui"
        const confirmeBoutonOui = document.createElement("button");
        confirmeBoutonOui.setAttribute("id", "valide-suppr");
        confirmeBoutonOui.innerText = "oui";
        //Creation bouton "non"
        const confirmeBoutonNon = document.createElement("button");
        confirmeBoutonNon.setAttribute("id", "annule-suppr");
        confirmeBoutonNon.innerText = "non";

        // ouvreModalConfirmation.appendChild(confirmeA);
        ouvreModalConfirmation.appendChild(confirmeAside);
        confirmeAside.appendChild(confirmeDiv);
        confirmeDiv.appendChild(confirmeBoutonFerme);
        confirmeBoutonFerme.appendChild(confirmeImgFerme);
        confirmeDiv.appendChild(confirmeTitle);
        confirmeDiv.appendChild(confirmeDivMedia);
        confirmeDivMedia.appendChild(confirmeImg);
        confirmeDiv.appendChild(confirmeDivBouton);
        confirmeDivBouton.appendChild(confirmeBoutonOui);
        confirmeDivBouton.appendChild(confirmeBoutonNon);
      });
    }

    //Supprime le medias au click sur "publier changement"
    const publierChangement = document.getElementById("publier-change");
    publierChangement.addEventListener("click", () => {
      for (let i in ids) {
        console.log("Je supprime " + ids[i]);
        // fetch(`http://localhost:5678/api/works/${id}`, {
        //   method: "DELETE",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
      }
    });
    modal = btnModifier;
    //Ajout du listener
    modal.addEventListener("click", fermeModal);
    modal.querySelector(".ferme").addEventListener("click", fermeModal);
    modal
      .querySelector(".modal-stop")
      .addEventListener("click", stopPropagation);
  };
  //Fonction pour la fermeture de la modal
  const fermeModal = (e) => {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal = null;
  };
  //Fonction pour bloquer la propagation
  const stopPropagation = function (e) {
    e.stopPropagation();
  };
  //Ajout d'un listener pour fermeture modal via la touche "Echap"
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      fermeModal(e);
    }
  });
  document.querySelectorAll("#modif-projet").forEach((a) => {
    a.addEventListener("click", ouvreModal);
  });
} else {
  //Sinon enleve le lien "logout"
  document.getElementById("lien-logout").style.display = "none";
  //Enleve le bandeau du mod edition
  document.getElementById("edition").style.display = "none";
}

//Fonction deconnexion
document.getElementById("lien-logout").addEventListener("click", () => {
  localStorage.removeItem("token");
});

export function generationMedia(works) {
  for (let work of works) {
    //Recuperation de l'element du DOM qui accueil les articles
    const divGallery = document.getElementById("media");
    //Creation d'une balise dediee aux articles
    const figureElement = document.createElement("figure");
    figureElement.dataset.id = work.id;
    figureElement.setAttribute("class", "fig");
    //Creation des balises img et ajout du contenu
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.crossOrigin = "";
    //Creation d'un div pour ajouter l'icone de corbeille
    const divPoubelle = document.createElement("div");
    divPoubelle.setAttribute("class", "div-poubelle");
    //Creation des balises figcaption et ajout du contenu
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = "éditer";
    //Rattachement des balises au DOM
    divGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(divPoubelle);
    figureElement.appendChild(figcaptionElement);
  }
}
