let modal = null;
//Fonction ouvre la modal
const ouvreModalProfil = (e) => {
  //Bloque le rechargement auto de la page
  e.preventDefault();

  //Fait apparaitre la modal
  const btnModifier = document.getElementById("modal-profil");
  btnModifier.style.display = null;
  btnModifier.removeAttribute("aria-hidden");
  btnModifier.setAttribute("aria-modal", "true");
  //Gestion de la suppression des medias lors du click sur la corbeille
  const poubelles2 = document.getElementsByClassName("div-poubelle2");
  console.log(poubelles2);
  for (let poubelle of poubelles2) {
    poubelle.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.offsetParent.attributes[0].nodeValue);
      let id = e.target.offsetParent.attributes[0].nodeValue;
      fetch(`./assets/images/img.json`),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        };
    });
  }
  modal = btnModifier;
  modal.addEventListener("click", fermeModal);
  modal.querySelector(".ferme").addEventListener("click", fermeModal);
  modal.querySelector(".modal-stop").addEventListener("click", stopPropagation);
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

document.querySelectorAll("#modif-profil").forEach((a) => {
  a.addEventListener("click", ouvreModalProfil);
});

//Fonction img de profil
export async function imgProfil() {
  const recupListeImg = await fetch("./assets/images/img.json");
  const listeImg = await recupListeImg.json();
  function generationProfil(listeImg) {
    for (let img of listeImg) {
      const divImgProfil = document.getElementById("img-profil");
      const figureElement = document.createElement("figure");
      figureElement.dataset.id = img.id;
      figureElement.setAttribute("class", "fig");
      const imageElement = document.createElement("img");
      imageElement.src = img.src;
      const divPoubelle = document.createElement("div");
      divPoubelle.setAttribute("class", "div-poubelle2");
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = img.nom;
      divImgProfil.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(divPoubelle);
      figureElement.appendChild(figcaptionElement);
    }
  }
  generationProfil(listeImg);
}
