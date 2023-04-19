//Declaration de la variable qui contiendra tous les travaux
let works;
//Test de la requete
try {
  //Requete pour recuperer tous les travaux
  let reponse = await fetch("http://localhost:5678/api/works");
  //Si le status renvoye est 200 execute le reste du code
  if (reponse.status === 200) {
    let data = await reponse.json();
    works = data;
  }
  //Si le status est autre creer les messages d'erreurs lies au status
  else if (reponse.status === 500) {
    throw new Error("Erreur inatendue");
  } else {
    throw new Error("Erreur inconnue");
  }
} catch (error) {
  //Message d'erreur si exeption levee par try
  alert(error.message);
}

//Generation de la galerie
export function generationGallery(works) {
  for (let work of works) {
    //Recuperation de l'element du DOM qui accueil les articles
    const divGallery = document.querySelector(".gallery");
    //Creation d'une balise dediee aux articles
    const figureElement = document.createElement("figure");
    figureElement.dataset.id = work.id;
    //Creation des balises img
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.crossOrigin = "anonymous";
    //Creation de la legende des images
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
    //Retourne les medias de la categorie objets
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
    //Retourne les medias de la categorie appartements
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
    //Retourne les medias de la categorie hotels & restaurants
    return work.category.name === "Hotels & restaurants";
  });
  //Vidage de la "Gallerie" avec les "Hotels & restaurants"
  document.querySelector(".gallery").innerHTML = "";
  //Genreation de la "Gallerie"
  generationGallery(hotRestoFiltres);
});
