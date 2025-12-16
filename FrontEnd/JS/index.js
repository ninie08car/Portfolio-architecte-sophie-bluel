// Récupération des pièces depuis le fichier JSON

async function genererWorks(listeWorks = null) {
  const works = listeWorks || (await getWorks());
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

function filtrerWorksParCategorie(works, categoryId) {
  const worksFiltres = [];
  for (let i = 0; i < works.length; i++) {
    if (works[i].categoryId === categoryId) {
      worksFiltres.push(works[i]);
    }
  }
  genererWorks(worksFiltres);
}

async function genererFiltres() {
  const categories = await getCategories();
  const sectionCategory = document.querySelector(".filter-categorie");
  sectionCategory.innerHTML = "";
  const works = await getWorks();

  const boutonTous = document.createElement("button");
  boutonTous.textContent = "Tous";
  boutonTous.classList.add("btn-filter");
  boutonTous.addEventListener("click", () => {
    genererWorks(works);
  });
  sectionCategory.appendChild(boutonTous);
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const catElement = document.createElement("button");
    catElement.textContent = cat.name;
    catElement.classList.add("btn-filter");
    catElement.addEventListener("click", () => {
      filtrerWorksParCategorie(works, cat.id);
    });
    sectionCategory.appendChild(catElement);
  }
}
genererFiltres();

const token = localStorage.getItem("token");
if (token) {
  editMode();
}

function editMode() {
  const topBanner = document.querySelector(".top-banner");
  const loginLink = document.querySelector(".login");
  const logoutLi = document.querySelector(".logout");
  const filtres = document.querySelector(".filter-categorie");
  const editProjet = document.querySelector(".modif");

  topBanner.classList.remove("hidden");
  loginLink.classList.add("hidden");
  logoutLi.classList.remove("hidden");
  filtres.classList.add("hidden");
  editProjet.classList.remove("hidden");
}

const logoutLi = document.querySelector(".logout");

logoutLi.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});
