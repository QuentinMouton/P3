//Declaration de la variable qui contiendra tous les travaux
let works;
//Test de la requête
try {
  //Requête pour récupérer tous les travaux
  let reponse = await fetch("http://localhost:5678/api/works");
  //Si le status renvoyé est 200 execute le reste du code
  if (reponse.status === 200) {
    let data = await reponse.json();
    works = data;
  }
  //Si le status est autre créer les messages d'erreurs lies au status
  else if (reponse.status === 500) {
    throw new Error("Erreur inattendue");
  } else {
    throw new Error("Erreur inconnue");
  }
} catch (error) {
  //Message d'erreur si exception levee par try
  alert(error.message);
}

//Generation de la galerie
export function generationGallery(works) {
  for (let work of works) {
    //Recuperation de l'element du DOM qui accueil les articles
    const divGallery = document.querySelector(".gallery");
    //Creation d'une balise dédiée aux articles
    const figureElement = document.createElement("figure");
    figureElement.dataset.id = work.id;
    //Creation des balises img
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.crossOrigin = "anonymous";
    //Creation de la légende des images
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;
    //Rattachement des balises au DOM
    divGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
  }
}
generationGallery(works);

//Bouton "Tous"
//Ajout de l’écoute de l’événement "click"
document.getElementById("btn-tous").addEventListener("click", () => {
  //Vidage de la "Galerie"
  document.querySelector(".gallery").innerHTML = "";
  //Génération de la "Galerie"
  generationGallery(works);
});

//Bouton "Objets"
//Ajout de l’écoute de l’événement "click"
document.getElementById("btn-objets").addEventListener("click", () => {
  //Filtres les "Objets"
  const objetsFiltres = works.filter((work) => {
    //Retourne les medias de la catégorie objets
    return work.category.name === "Objets";
  });
  //Vidage de la "Galerie"
  document.querySelector(".gallery").innerHTML = "";
  //Generation de la "Galerie" avec les "Objets"
  generationGallery(objetsFiltres);
});

//Bouton "Appartements"
//Ajout de l’écoute de l’événement "click"
document.getElementById("btn-appartements").addEventListener("click", () => {
  //Filtres les "Appartements"
  const appartementsFiltres = works.filter((work) => {
    //Retourne les medias de la catégorie appartements
    return work.category.name === "Appartements";
  });
  //Vidage de la "Galerie" avec les "Appartements"
  document.querySelector(".gallery").innerHTML = "";
  //Génération de la "Galerie"
  generationGallery(appartementsFiltres);
});

//Bouton "Hotels & restaurants"
//Ajout de l’écoute de l’événement "click"
document.getElementById("btn-hot-resto").addEventListener("click", () => {
  //Filtres les "Hotels & restaurants"
  const hotRestoFiltres = works.filter((work) => {
    //Retourne les medias de la catégorie hotels & restaurants
    return work.category.name === "Hotels & restaurants";
  });
  //Vidage de la "Galerie" avec les "Hotels & restaurants"
  document.querySelector(".gallery").innerHTML = "";
  //Génération de la "Galerie"
  generationGallery(hotRestoFiltres);
});
