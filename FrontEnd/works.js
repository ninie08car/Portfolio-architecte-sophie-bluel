// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("works.json");
const works = await reponse.json();

function genererWorks(works) {
  // Récupération de l'élément du DOM qui accueillera les gallery
  const sectionGallery = document.querySelector(".gallery");
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    // Création d’une balise dédiée à une pièce automobile
    const worksElement = document.createElement("figure");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.title;
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;

    // On rattache la balise article a la section Gallery
    sectionGallery.appendChild(worksElement);

    // On rattache l’image à pieceElement (la balise article)
    worksElement.appendChild(imageElement);
    worksElement.appendChild(nomElement);
  }
}

genererWorks(works);
