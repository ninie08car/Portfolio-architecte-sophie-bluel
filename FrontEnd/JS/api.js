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

async function postWorks(image, title, category) {
  fetch(apiUrl + "/works", {
    /* Objet de configuration */
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: image,
      title: title,
      category: category,
    }),
  });
}

async function deleteWorks(id) {
  fetch(apiUrl + "/works/{id}", {
    /* Objet de configuration */
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  });
}
