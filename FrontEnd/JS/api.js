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

async function createWork(formData) {
  const token = localStorage.getItem("token");
  const response = await fetch(apiUrl + "/works/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
