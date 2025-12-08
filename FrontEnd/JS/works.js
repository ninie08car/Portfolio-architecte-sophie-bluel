// Récupération des pièces depuis le fichier JSON

async function genererWorks() {
  const works = await getWorks();
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    const worksElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.title;
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;
    sectionGallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(nomElement);
  }
}
genererWorks();

async function initFilters() {
  const works = await getWorks();
  const buttons = document.querySelectorAll(".btn-filter");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const categoryId = button.dataset.category;

      if (categoryId === "all") {
        displayWorks(works);
        return;
      }

      const filteredWorks = works.filter(
        (work) => work.categoryId === Number(categoryId)
      );

      displayWorks(filteredWorks);
    });
  });
}

async function init() {
  const works = await getWorks();
  displayWorks(works);
  initFilters();
}

init();
