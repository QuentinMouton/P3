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
    const poubelles = document.getElementsByClassName("div-poubelle");
    for (let poubelle of poubelles) {
      poubelle.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target.offsetParent.attributes[0].nodeValue);
        console.log(e);
        let id = e.target.offsetParent.attributes[0].nodeValue;
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // let img =
        //   e.target.offsetParent.attributes[0].ownerElement.firstChild
        //     .currentSrc;
        // console.log(e);
        // console.log("Je supprime !");
        // const nouvelleGallerie = works.filter((work) => {
        //   document.querySelector(".gallery").innerHTML = "";
        //   document.querySelector(".media").innerHTML = "";
        //   return work.id != id;
        // });
        // generationMedia(nouvelleGallerie);
        // generationGallery(nouvelleGallerie);

        // const fenetreModal = document.querySelector(".modal-stop");
        // fenetreModal.innerHTML = "";
        // const imgConfirmation = document.createElement("img");
        // imgConfirmation.src = img;
        // imgConfirmation.crossOrigin = "";
        // imgConfirmation.setAttribute("class", "img-confirmation");
        // fenetreModal.appendChild(imgConfirmation);
        // const boutonConfirmation = document.createElement("button");
        // boutonConfirmation.setAttribute("class", "btn-confirmation");
        // boutonConfirmation.innerText = "Confirmation";
        // const boutonAnnule = document.createElement("button");
        // boutonAnnule.setAttribute("class", "btn-annule");
        // boutonAnnule.innerText = "Annuler";
        // fenetreModal.appendChild(boutonConfirmation);
        // fenetreModal.appendChild(boutonAnnule);
        // document
        //   .querySelector(".btn-confirmation")
        //   .addEventListener("click", (e) => {
        //     console.log(e);
        //     console.log("Je supprime !");
        //     const nouvelleGallerie = works.filter((work) => {
        //       return work != id;
        //     });
        //     fermeModal;
        //     generationGallery(nouvelleGallerie);
        //   });

        // document.getElementById("btn-objets").addEventListener("click", () => {
        //   //Filtres les "Objets"
        //   const objetsFiltres = works.filter((work) => {
        //     return work.category.name === "Objets";
        //   });
        //   //Vidage de la "Gallerie"
        //   document.querySelector(".gallery").innerHTML = "";
        //   //Genreation de la "Gallerie" avec les "Objets"
        //   generationGallery(objetsFiltres);
        // });

        // document.querySelector(".btn-annule").addEventListener("click", (e) => {
        //   console.log(e);
        //   console.log("J'annule");
        // });

        // fenetreModal.innerHTML = "";
        // fenetreModal.
      });
    }
    modal = btnModifier;
    //Ajout du listener
    modal.addEventListener("click", fermeModal);
    modal.querySelector("#ferme").addEventListener("click", fermeModal);
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
    imageElement.setAttribute("class", "media");
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
