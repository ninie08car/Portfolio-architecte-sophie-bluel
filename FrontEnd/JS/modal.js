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
    workDiv.dataset.id = article.id;

    workDiv.classList.add("photo");
    deleteButton.classList.add("delete-btn");
    iconElement.classList.add("fa-solid", "fa-trash-can");

    deleteButton.appendChild(iconElement);

    workDiv.appendChild(imageElement);
    workDiv.appendChild(deleteButton);
    fragment.appendChild(workDiv);

    deleteButton.addEventListener("click", async () => {
      await deleteWorks(article.id);
    });
  }
  sectionGallery.appendChild(fragment);
}
genererPhotos();

const openFormBtn = document.querySelector(".js-open-form");
const modalGallery = document.getElementById("modal1");
const modalForm = document.getElementById("modal-form");

openFormBtn.addEventListener("click", () => {
  modalGallery.classList.add("hidden");
  modalForm.classList.remove("hidden");
});

const returnBtn = document.querySelector(".js-modal-return");

returnBtn.addEventListener("click", () => {
  modalForm.classList.add("hidden");
  modalGallery.classList.remove("hidden");
});

function removeWorkFromDom(id) {
  document
    .querySelectorAll(`[data-id="` + id + `"]`)
    .forEach((element) => element.remove());
}
