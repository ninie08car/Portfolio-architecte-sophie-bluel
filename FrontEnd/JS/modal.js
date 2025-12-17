let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = "flex";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
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
