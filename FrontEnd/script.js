//Declaration de la variable qui contiendra tous les travaux
let works;
//Recuperation de tous les travaux
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

//Generation automatique de la galerie
export function generationGallery(works) {
  for (let work of works) {
    //Recuperation de l'element du DOM qui accueil les articles
    const divGallery = document.querySelector(".gallery");
    //Creation d'une balise dediee aux articles
    const figureElement = document.createElement("figure");
    figureElement.dataset.id = work.id;
    //Creation des balises img et figcaption et ajout de leurs contenu
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.crossOrigin = "";
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;
    //Rattachement des balises au DOM
    divGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
  }
}
generationGallery(works);

//Boutton "Tous"
//Ajout de l'ecoute de l'evenement "click"
document.getElementById("btn-tous").addEventListener("click", () => {
  //Vidage de la "Gallerie"
  document.querySelector(".gallery").innerHTML = "";
  //Genreation de la "Gallerie"
  generationGallery(works);
});

//Boutton "Objets"
//Ajout de l'ecoute de l'evenement "click"
document.getElementById("btn-objets").addEventListener("click", () => {
  //Filtres les "Objets"
  const objetsFiltres = works.filter((work) => {
    return work.category.name === "Objets";
  });
  //Vidage de la "Gallerie"
  document.querySelector(".gallery").innerHTML = "";
  //Genreation de la "Gallerie" avec les "Objets"
  generationGallery(objetsFiltres);
});

//Boutton "Appartements"
//Ajout de l'ecoute de l'evenement "click"
document.getElementById("btn-appartements").addEventListener("click", () => {
  //Filtres les "Appartements"
  const appartementsFiltres = works.filter((work) => {
    return work.category.name === "Appartements";
  });
  //Vidage de la "Gallerie" avec les "Appartements"
  document.querySelector(".gallery").innerHTML = "";
  //Genreation de la "Gallerie"
  generationGallery(appartementsFiltres);
});

//Boutton "Hotels & restaurants"
//Ajout de l'ecoute de l'evenement "click"
document.getElementById("btn-hot-resto").addEventListener("click", () => {
  //Filtres les "Hotels & restaurants"
  const hotRestoFiltres = works.filter((work) => {
    return work.category.name === "Hotels & restaurants";
  });
  //Vidage de la "Gallerie" avec les "Hotels & restaurants"
  document.querySelector(".gallery").innerHTML = "";
  //Genreation de la "Gallerie"
  generationGallery(hotRestoFiltres);
});
