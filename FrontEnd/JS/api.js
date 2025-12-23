const apiUrl = "http://localhost:5678/api";

async function getWorks() {
  const response = await fetch(apiUrl + "/works");
  if (response.ok) {
    const works = await response.json();
    return works;
  }
  return null;
}

async function getCategories() {
  const response = await fetch(apiUrl + "/categories");
  if (response.ok) {
    const categories = await response.json();
    return categories;
  }
  return null;
}

async function postLogin(email, password) {
  const response = await fetch(apiUrl + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
}

async function deleteWorks(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(apiUrl + "/works/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  if (response.ok) {
    removeWorkFromDom(id);
  } else {
    console.error("Erreur lors de la suppression du projet");
  }
}

async function postWorks(image, title, category) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  const response = await fetch(apiUrl + "/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de l'image");
  }

  return await response.json();
}
