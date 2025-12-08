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

async function postWorks() {
  fetch(apiUrl + "/works", {
    /* Objet de configuration */
    method: "POST",
    body: '{"commentaire":"Top produit !"}',
    headers: { "Content-Type": "application/json" },
  });
}
