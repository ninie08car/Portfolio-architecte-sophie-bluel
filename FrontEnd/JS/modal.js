const closeModal = function (e) {
  const modals = document.querySelectorAll(".modal");
  for (let i = 0; i < modals.length; i++) {
    const modal = modals[i];
    modal.classList.add("hidden");
  }
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

async function genererPhotos(listeWorks = null) {
  const works = listeWorks || (await getWorks());
  const sectionGallery = document.querySelector(".gallery-grid");
  sectionGallery.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    const workDiv = document.createElement("div");
    const imageElement = document.createElement("img");
    const deleteButton = document.createElement("button");
    const iconElement = document.createElement("i");

    imageElement.src = article.imageUrl;
    imageElement.alt = article.title;
    imageElement.id = article.id;

    workDiv.classList.add("photo");
    deleteButton.classList.add("delete-btn");
    iconElement.classList.add("fa-solid", "fa-trash-can");

    deleteButton.appendChild(iconElement);
    workDiv.appendChild(imageElement);
    workDiv.appendChild(deleteButton);
    fragment.appendChild(workDiv);
  }
  sectionGallery.appendChild(fragment);
}
genererPhotos();
