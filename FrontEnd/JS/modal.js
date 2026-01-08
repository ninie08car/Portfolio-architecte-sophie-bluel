const modal1 = document.getElementById("modal1");
const modalForm = document.getElementById("modal-form");
const btnOpenForm = document.querySelector(".js-open-form");
const btnReturn = document.querySelector(".js-modal-return");
const photoForm = document.getElementById("photo-form");

function closeModal(modal) {
  if (!modal) return;
  modal.classList.add("hidden");
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.remove("hidden");
}

document.querySelectorAll(".js-modal-close").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = btn.closest(".modal");
    if (modal) closeModal(modal);
  });
});

btnOpenForm.addEventListener("click", function () {
  closeModal(modal1);
  openModal(modalForm);
});

btnReturn.addEventListener("click", function () {
  closeModal(modalForm);
  openModal(modal1);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (!modal.classList.contains("hidden")) closeModal(modal);
    });
  }
});
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
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
      const confirmed = confirm(
        "Êtes-vous sûr de vouloir supprimer ce projet ?"
      );
      if (!confirmed) {
        e.preventDefault();
      }
      await deleteWorks(article.id);
      closeModal(modal1);
      genererWorks();
    });
  }
  sectionGallery.appendChild(fragment);
}
genererPhotos();

function removeWorkFromDom(id) {
  document
    .querySelectorAll(`[data-id="` + id + `"]`)
    .forEach((element) => element.remove());
}

//Ajout photo
const btnUpload = document.getElementById("btn-upload");
const imageInput = document.getElementById("image");
const uploadDiv = btnUpload.parentElement;
const elementsToHide = uploadDiv.querySelectorAll(
  ".fa-image, .text, #btn-upload"
);
btnUpload.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  const validTypes = ["image/jpeg", "image/png"];
  const maxSize = 4 * 1024 * 1024; // 4 Mo

  if (!validTypes.includes(file.type)) {
    alert("Format invalide (jpg ou png uniquement)");
    imageInput.value = "";
    return;
  }

  if (file.size > maxSize) {
    alert("L'image dépasse 4Mo");
    imageInput.value = "";
    return;
  }

  elementsToHide.forEach((el) => (el.style.display = "none"));

  let preview = uploadDiv.querySelector("img");
  if (!preview) {
    preview = document.createElement("img");
    uploadDiv.appendChild(preview);
  }
  preview.src = URL.createObjectURL(file);
  preview.style.width = "100%";
  preview.style.borderRadius = "5px";
});

//Ajout projet
const form = document.getElementById("photo-form");

if (form) {
  const submitBtn = document.getElementById("btn-submit");
  submitBtn.disabled = true;

  function checkFormValidity() {
    const image = document.getElementById("image").files.length > 0;
    const title = document.getElementById("title").value.trim() !== "";
    const category = document.getElementById("category").value !== "";
    submitBtn.disabled = !(image && title && category);
  }
  form.addEventListener("change", checkFormValidity);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const confirmed = confirm("Confirmer l'ajout de ce projet ?");
    if (!confirmed) return;

    const imageInput = document.getElementById("image");
    const image = imageInput.files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;

    if (!image || !title || !category) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", Number(category));

    const newWork = await createWork(formData);
    if (!newWork) {
      alert("Erreur lors de l'ajout du projet");
      return;
    }

    addWorkToGallery(newWork);
    genererPhotos();
    form.reset();
    submitBtn.disabled = true;
    resetImageInput();
    closeModal(modalForm);
  });
}

function resetImageInput() {
  const imageInput = document.getElementById("image");
  const uploadDiv = document.getElementById("btn-upload").parentElement;
  imageInput.value = "";
  const preview = uploadDiv.querySelector("img");
  if (preview) {
    preview.remove();
  }
  const elementsToShow = uploadDiv.querySelectorAll(
    ".fa-image, .text, #btn-upload"
  );
  elementsToShow.forEach((el) => {
    el.style.display = "";
  });
}
