// const reponse = await fetch("http://localhost:5678/api/works");
// const works = await reponse.json();
// //Generation de la galerie
// export function generationGallery(works) {
//   for (let work of works) {
//     //Recuperation de l'element du DOM qui accueil les articles
//     const divGallery = document.querySelector(".gallery");
//     //Creation d'une balise dediee aux articles
//     const figureElement = document.createElement("figure");
//     figureElement.dataset.id = work.id;
//     //Creation des balises img et figcaption et ajout de leurs contenu
//     const imageElement = document.createElement("img");
//     imageElement.src = work.imageUrl;
//     imageElement.crossOrigin = "";
//     const figcaptionElement = document.createElement("figcaption");
//     figcaptionElement.innerText = work.title;
//     //Rattachement des balises au DOM
//     divGallery.appendChild(figureElement);
//     figureElement.appendChild(imageElement);
//     figureElement.appendChild(figcaptionElement);
//   }
// }

// //Boutton "Tous"
// //Ajout de l'ecoute de l'evenement "click"
// document.getElementById("btn-tous").addEventListener("click", () => {
//   //Vidage de la "Gallerie"
//   document.querySelector(".gallery").innerHTML = "";
//   //Genreation de la "Gallerie"
//   generationGallery(works);
// });

// //Boutton "Objets"
// //Ajout de l'ecoute de l'evenement "click"
// document.getElementById("btn-objets").addEventListener("click", function () {
//   //Filtres les "Objets"
//   const objetsFiltres = works.filter((work) => {
//     return work.category.name === "Objets";
//   });
//   //Vidage de la "Gallerie"
//   document.querySelector(".gallery").innerHTML = "";
//   //Genreation de la "Gallerie" avec les "Objets"
//   generationGallery(objetsFiltres);
// });

// //Boutton "Appartements"
// //Ajout de l'ecoute de l'evenement "click"
// document.getElementById("btn-appartements").addEventListener("click", () => {
//   //Filtres les "Appartements"
//   const appartementsFiltres = works.filter((work) => {
//     return work.category.name === "Appartements";
//   });
//   //Vidage de la "Gallerie" avec les "Appartements"
//   document.querySelector(".gallery").innerHTML = "";
//   //Genreation de la "Gallerie"
//   generationGallery(appartementsFiltres);
// });

// //Boutton "Hotels & restaurants"
// //Ajout de l'ecoute de l'evenement "click"
// document.getElementById("btn-hot-resto").addEventListener("click", () => {
//   //Filtres les "Hotels & restaurants"
//   const hotRestoFiltres = works.filter((work) => {
//     return work.category.name === "Hotels & restaurants";
//   });
//   //Vidage de la "Gallerie" avec les "Hotels & restaurants"
//   document.querySelector(".gallery").innerHTML = "";
//   //Genreation de la "Gallerie"
//   generationGallery(hotRestoFiltres);
// });
// // if (work.category.name === id) {
// //   divGallery.appendChild(figureElement);
// //   figureElement.appendChild(imageElement);
// //   figureElement.appendChild(figcaptionElement);
// // } else if (id === "all") {
// //   divGallery.appendChild(figureElement);
// //   figureElement.appendChild(imageElement);
// //   figureElement.appendChild(figcaptionElement);
// // }

// //Creation des evenements des bouttons
// //Boutton "Tous"
// // export function btnTous(works, id) {
// //   //Recuperation de l'element du DOM
// //   const btnTous = document.getElementById("btn-tous");
// //   //Ajout de l'ecoute de l'evenement "click"
// //   btnTous.addEventListener("click", (e) => {
// //     //Vide la galerie
// //     document.querySelector(".gallery").innerHTML = "";
// //     //Bloque le rechargement de la page
// //     e.preventDefault();
// //     id = "all";
// //     //Genere la nouvelle galerie
// //     generationGallery(works, id);
// //   });
// // }
// //Boutton "Objets"
// // export function btnObjets(works) {
// //   document.getElementById("btn-objets").addEventListener("click", (e) => {
// //     document.querySelector(".gallery").innerHTML = "";
// //     e.preventDefault();
// //     id = "Objets";
// //     generationGallery(works, id);
// //   });
// // }

// //Boutton "Appartements"
// // export function btnAppartements(works) {
// //   document.getElementById("btn-appartements").addEventListener("click", (e) => {
// //     document.querySelector(".gallery").innerHTML = "";
// //     e.preventDefault();
// //     id = "Appartements";
// //     generationGallery(works, id);
// //   });
// // }

// //Boutton "Hôtels & restaurants"
// // export function btnHotResto(works) {
// //   document.getElementById("btn-hot-resto").addEventListener("click", (e) => {
// //     document.querySelector(".gallery").innerHTML = "";
// //     e.preventDefault();
// //     id = "Hotels & restaurants";
// //     generationGallery(works, id);
// //   });
// // }

// //Boutton "Se connecter"
// // export function btnSeConnecter() {
// //   document.getElementById("btn-connexion").addEventListener("click", (e) => {
// //     e.preventDefault();
// //   });
// // }

// // function trie(works) {
// //   if (work.category.name == "Objets") {
// //     divGallery.appendChild(figureElement);
// //     figureElement.appendChild(imageElement);
// //     figureElement.appendChild(figcaptionElement);
// //   } else if (work.category.name == "Appartements") {
// //     divGallery.appendChild(figureElement);
// //     figureElement.appendChild(imageElement);
// //     figureElement.appendChild(figcaptionElement);
// //   } else if (work.category.name == "Hotels & restaurants") {
// //     divGallery.appendChild(figureElement);
// //     figureElement.appendChild(imageElement);
// //     figureElement.appendChild(figcaptionElement);
// //   } else {
// //     divGallery.appendChild(figureElement);
// //     figureElement.appendChild(imageElement);
// //     figureElement.appendChild(figcaptionElement);
// //   }
// // }

// //Les inputs
// //Email
// // const inputEmail = document.getElementById("email");
