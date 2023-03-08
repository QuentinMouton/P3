import { generationGallery } from "./script.js";
//Recuperation de tous les travaux
let works;
const token = localStorage.getItem("token");
let modalConfirm = null;
let modal = null;

let ids = [];
let id = null;

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
//Verifie que le token soit bien la
if (token != null) {
  //Suppression lien "login"
  const login = document.getElementById("lien-login");
  login.style.display = "none";
  //Suppression des bouttons de filtre
  const boutton = document.getElementById("btn");
  boutton.style.display = "none";
  //Affiche les bouttons "Modifier"
  document.getElementById("btn-modif-profil").style.display = "initial";
  document.getElementById("btn-modif-projet").style.display = "initial";

  //Ouverture de la modal
  const ouvreModal = (e) => {
    //Bloque le rechargement auto de la page
    e.preventDefault();
    //Fait apparaitre la modal
    ouvreModalModif(e);
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
  };
  //Creation du listener sur le bouton "Modifier" (Mes Projets)
  document.querySelectorAll("#modif-projet").forEach((a) => {
    a.addEventListener("click", ouvreModal);
  });
} else {
  //Sinon enleve le lien "logout"
  document.getElementById("lien-logout").style.display = "none";
  //Enleve le bandeau du mod edition
  document.getElementById("edition").style.display = "none";
}

//Supprime le token lors de la deconnexion
document.getElementById("lien-logout").addEventListener("click", () => {
  localStorage.removeItem("token");
});

//Fonction generer les medias dans la modal modif
function generationMedia(works) {
  // if ((id =! null)) {
  //   works.splice(id, 1);
  // }
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

//Fonction de la modal modif
function ouvreModalModif(e) {
  e.preventDefault();
  const ouvreModalModif = document.getElementById("btn-modif-projet");
  //Creation de la boite
  const modifAside = document.createElement("aside");
  modifAside.setAttribute("id", "modal-modif");
  modifAside.setAttribute("class", "modal");
  modifAside.setAttribute("aria-modal", "true");
  modifAside.setAttribute("role", "dialog");
  modifAside.setAttribute("aria-labelby", "titremodal");
  modifAside.addEventListener("click", fermeModal);
  const modifDiv = document.createElement("div");
  modifDiv.setAttribute("class", "modal-wrapper modal-stop");
  // const stop = document.querySelector(".modal-stop");
  modifDiv.addEventListener("click", stopPropagation);
  const modifBouttonFerme = document.createElement("button");
  modifBouttonFerme.setAttribute("class", "ferme-modal");
  const modifImg = document.createElement("img");
  modifImg.setAttribute("class", "ferme");
  modifImg.src = "./assets/icons/croix.png";
  modifImg.addEventListener("click", fermeModal);
  const modifTitre = document.createElement("h3");
  modifTitre.setAttribute("id", "titreModal");
  modifTitre.innerText = "Galerie photo";
  const modifDivMedia = document.createElement("div");
  modifDivMedia.setAttribute("id", "media");
  const modifBouttonAjout = document.createElement("button");
  modifBouttonAjout.setAttribute("id", "ajout-photo");
  modifBouttonAjout.innerText = "Ajouter une photo";
  modifBouttonAjout.addEventListener("click", () => {
    fermeModal();
    ouvreModalAjout(e);
  });
  const modifBouttonSuppr = document.createElement("button");
  modifBouttonSuppr.setAttribute("id", "suppr-galerie");
  modifBouttonSuppr.innerText = "Supprimer la galerie";
  ouvreModalModif.appendChild(modifAside);
  modifAside.appendChild(modifDiv);
  modifDiv.appendChild(modifBouttonFerme);
  modifBouttonFerme.appendChild(modifImg);
  modifDiv.appendChild(modifTitre);
  modifDiv.appendChild(modifDivMedia);
  modifDiv.appendChild(modifBouttonAjout);
  modifDiv.appendChild(modifBouttonSuppr);
  generationMedia(works);
  supprMedia();
}

//Fonction de la modal d'ajout
let ajoutImgVierge;
function ouvreModalAjout(e) {
  e.preventDefault();
  const ouvreModalAjout = document.getElementById("btn-modif-projet");
  //Creation de la modal
  const ajoutAside = document.createElement("aside");
  ajoutAside.setAttribute("class", "modal");
  ajoutAside.setAttribute("id", "modal-ajout");
  ajoutAside.setAttribute("aria-modal", "true");
  ajoutAside.setAttribute("role", "dialog");
  ajoutAside.setAttribute("aria-labelby", "titre-modal");
  //Creation de la boite
  const ajoutDiv = document.createElement("div");
  ajoutDiv.setAttribute("class", "modal-wrapper modal-stop");
  //Creation div retour/ferme
  const ajoutDivRetourFermer = document.createElement("div");
  ajoutDivRetourFermer.setAttribute("id", "retour-fermer");
  //Creation bouton retour
  const ajoutBoutonRetour = document.createElement("button");
  ajoutBoutonRetour.setAttribute("id", "retour-modal");
  const ajoutImgRetour = document.createElement("img");
  ajoutImgRetour.setAttribute("id", "retour");
  ajoutImgRetour.src = "./assets/icons/retour.png";
  ajoutImgRetour.addEventListener("click", () => {
    ajoutAside.remove();
    ouvreModalModif(e);
  });
  //Creation bouton pour fermer
  const ajoutBoutonFerme = document.createElement("button");
  ajoutBoutonFerme.setAttribute("class", "ferme-modal");
  const ajoutImgFerme = document.createElement("img");
  ajoutImgFerme.setAttribute("class", "ferme");
  ajoutImgFerme.src = "./assets/icons/croix.png";
  ajoutImgFerme.addEventListener("click", () => {
    ajoutAside.remove();
    // ouvreModalModif(e);
  });
  //Creation du titre
  const ajoutTitre = document.createElement("h3");
  ajoutTitre.setAttribute("id", "titre-modal");
  ajoutTitre.innerText = "Ajout photo";
  //Creation de la div qui accueille la nouvelle img
  const ajoutDivNouvelleImg = document.createElement("div");
  ajoutDivNouvelleImg.setAttribute("id", "nouvelle-img");
  //Creation du fond de la div
  ajoutImgVierge = document.createElement("img");
  ajoutImgVierge.setAttribute("id", "vierge");
  ajoutImgVierge.src = "./assets/icons/picture.png";
  //Creation div pour le bouton et le paragraphe
  const ajoutDivBtnTxt = document.createElement("div");
  ajoutDivBtnTxt.setAttribute("id", "btn-txt");
  //Creation du bouton du fond
  const ajoutInputAjout = document.createElement("input");
  ajoutInputAjout.setAttribute("type", "file");
  ajoutInputAjout.setAttribute("id", "ajouter-photo-input");
  ajoutInputAjout.setAttribute("accept", "image/jpeg, image/jpg, image/png");
  ajoutInputAjout.setAttribute("hidden", "");
  const ajoutLabelInput = document.createElement("label");
  ajoutLabelInput.setAttribute("for", "ajouter-photo-input");
  ajoutLabelInput.setAttribute("id", "ajouter-photo");
  ajoutLabelInput.innerText = "+ Ajouter photo";
  ajoutInputAjout.addEventListener("change", previsualisationImg);

  //Creation du paragraphe du fond
  const ajoutTexte = document.createElement("p");
  ajoutTexte.innerText = "jpg, png : 4mo max";
  //Creation du formulaire
  const ajoutFormulaire = document.createElement("form");
  ajoutFormulaire.setAttribute("id", "form-ajout");
  ajoutFormulaire.setAttribute("name", "info-ajout");
  ajoutFormulaire.setAttribute("action", "");
  ajoutFormulaire.setAttribute("method", "POST");
  //Creation nom du champ pour le titre
  const ajoutNomTitre = document.createElement("label");
  ajoutNomTitre.setAttribute("for", "titre");
  ajoutNomTitre.innerText = "Titre";
  //Creation du champ pour le titre
  const ajoutChampTitre = document.createElement("input");
  ajoutChampTitre.setAttribute("type", "textearea");
  ajoutChampTitre.setAttribute("id", "champ-titre");
  ajoutChampTitre.setAttribute("name", "titre");
  ajoutChampTitre.setAttribute("required", "");
  //Creation nom du champ pour la categorie
  const ajoutNomCategorie = document.createElement("label");
  ajoutNomCategorie.setAttribute("for", "categorie");
  ajoutNomCategorie.innerText = "Catégorie";
  //Creation du champ pour la categorie
  const ajoutChampCategorie = document.createElement("select");
  ajoutChampCategorie.setAttribute("name", "categorie");
  ajoutChampCategorie.setAttribute("id", "champ-categorie");
  ajoutChampCategorie.setAttribute("required", "");
  //Creation des choix pour la categorie
  const ajoutChoix0 = document.createElement("option");
  ajoutChoix0.setAttribute("value", "");
  const ajoutChoix1 = document.createElement("option");
  ajoutChoix1.setAttribute("value", "Objets");
  ajoutChoix1.innerText = "Objets";
  const ajoutChoix2 = document.createElement("option");
  ajoutChoix2.setAttribute("value", "Appartements");
  ajoutChoix2.innerText = "Appartements";
  const ajoutChoix3 = document.createElement("option");
  ajoutChoix3.setAttribute("value", "Hotels & restaurants");
  ajoutChoix3.innerText = "Hotels & restaurants";
  //Creation du bouton Valider
  const ajoutBoutonValider = document.createElement("button");
  ajoutBoutonValider.setAttribute("id", "ajout-valider");
  ajoutBoutonValider.innerText = "Valider";
  ajoutBoutonValider.addEventListener("click", () => {
    console.log("click click");
  });

  ouvreModalAjout.appendChild(ajoutAside);
  ajoutAside.appendChild(ajoutDiv);
  ajoutDiv.appendChild(ajoutDivRetourFermer);
  ajoutDivRetourFermer.appendChild(ajoutBoutonRetour);
  ajoutBoutonRetour.appendChild(ajoutImgRetour);
  ajoutDivRetourFermer.appendChild(ajoutBoutonFerme);
  ajoutBoutonFerme.appendChild(ajoutImgFerme);
  ajoutDiv.appendChild(ajoutTitre);
  ajoutDiv.appendChild(ajoutDivNouvelleImg);
  ajoutDivNouvelleImg.appendChild(ajoutImgVierge);
  ajoutDivNouvelleImg.appendChild(ajoutDivBtnTxt);
  ajoutDivBtnTxt.appendChild(ajoutInputAjout);
  ajoutDivBtnTxt.appendChild(ajoutLabelInput);
  ajoutDivBtnTxt.appendChild(ajoutTexte);
  ajoutDiv.appendChild(ajoutFormulaire);
  ajoutFormulaire.appendChild(ajoutNomTitre);
  ajoutFormulaire.appendChild(ajoutChampTitre);
  ajoutFormulaire.appendChild(ajoutNomCategorie);
  ajoutFormulaire.appendChild(ajoutChampCategorie);
  ajoutChampCategorie.appendChild(ajoutChoix0);
  ajoutChampCategorie.appendChild(ajoutChoix1);
  ajoutChampCategorie.appendChild(ajoutChoix2);
  ajoutChampCategorie.appendChild(ajoutChoix3);
  ajoutDiv.appendChild(ajoutBoutonValider);
}

//Fonction de la modal de confirmation
function ouvreModalConfirmation(e) {
  const ouvreModalConfirmation = document.getElementById("btn-modif-projet");
  //Creation de la modal
  const confirmeAside = document.createElement("aside");
  confirmeAside.setAttribute("class", "modal");
  confirmeAside.setAttribute("id", "modal-confirmation");
  confirmeAside.setAttribute("aria-modal", "true");
  confirmeAside.setAttribute("role", "dialog");
  confirmeAside.setAttribute("aria-labelby", "titlemodal");
  modalConfirm = confirmeAside;
  //Creation de la boite
  const confirmeDiv = document.createElement("div");
  confirmeDiv.setAttribute("class", "modal-wrapper modal-stop");
  //Creation bouton pour fermer
  const confirmeBoutonFerme = document.createElement("button");
  confirmeBoutonFerme.setAttribute("class", "ferme-modal");
  //Creation du titre
  const confirmeTitre = document.createElement("h3");
  confirmeTitre.setAttribute("id", "titlemodal");
  confirmeTitre.innerText = "Es-tu sur de vouloir supprimer ?";
  //Creation de la div qui accueille l'image
  const confirmeDivMedia = document.createElement("div");
  confirmeDivMedia.setAttribute("id", "confirme-img");
  //Creation de l'image
  const confirmeImg = document.createElement("img");
  confirmeImg.src = e.target.parentElement.firstChild.currentSrc;
  confirmeImg.crossOrigin = "";
  //Creation div bouton
  const confirmeDivBouton = document.createElement("div");
  confirmeDivBouton.setAttribute("id", "btn-confirme");
  //Creation bouton "oui"
  const confirmeBoutonOui = document.createElement("button");
  confirmeBoutonOui.setAttribute("id", "valide-suppr");
  confirmeBoutonOui.innerText = "Supprimer";
  confirmeBoutonOui.addEventListener("click", () => {
    ids.push(id);
    console.log(ids);
    fermeModalConfirmation();
    ouvreModalModif(e);
  });
  //Creation bouton "non"
  const confirmeBoutonNon = document.createElement("button");
  confirmeBoutonNon.setAttribute("id", "annule-suppr");
  confirmeBoutonNon.innerText = "Annuler";
  confirmeBoutonNon.addEventListener("click", () => {
    fermeModalConfirmation();
    ouvreModalModif(e);
  });
  ouvreModalConfirmation.appendChild(confirmeAside);
  confirmeAside.appendChild(confirmeDiv);
  confirmeDiv.appendChild(confirmeTitre);
  confirmeDiv.appendChild(confirmeDivMedia);
  confirmeDivMedia.appendChild(confirmeImg);
  confirmeDiv.appendChild(confirmeDivBouton);
  confirmeDivBouton.appendChild(confirmeBoutonOui);
  confirmeDivBouton.appendChild(confirmeBoutonNon);
}

//Fonction fermer la modal de modif projet
function fermeModal() {
  const modalModif = document.getElementById("modal-modif");
  modalModif.remove();
}

//Fonction fermer la modal de confirmation
function fermeModalConfirmation() {
  const modalConfirmation = document.getElementById("modal-confirmation");
  modalConfirmation.remove();
}

//Ajout d'un listener pour fermeture modal via la touche "Echap"
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    fermeModal();
  }
});

//Gestion de la suppression des medias lors du click sur la corbeille
function supprMedia() {
  const poubelles = document.getElementsByClassName("div-poubelle");
  for (let poubelle of poubelles) {
    poubelle.addEventListener("click", (e) => {
      e.preventDefault();
      //Recuperration de l'id a supprimer
      console.log(id);
      console.log(e);
      id = e.target.parentElement.dataset.id;
      fermeModal();
      ouvreModalConfirmation(e);
    });
  }
}

//Fonction pour bloquer la propagation
const stopPropagation = function (e) {
  e.stopPropagation();
};

//Fonction de previsualistion de la nouvelle img lors de l'ajout
function previsualisationImg() {
  const regleRegex = /\.(jpe?g|png)$/i;
  // console.log(e);
  const nouveauFichier = this.files[0];
  if (this.files.length === 0 || !regleRegex.test(nouveauFichier.name)) {
    alert(
      `Ce fichier n'est pas au bon format \nVeuillez inserer un fichier au format jpg ou png`
    );
    return;
  } else {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      console.log(e);
      ajoutImgVierge.src = e.target.result;
    };
    fileReader.readAsDataURL(nouveauFichier);
  }
}
