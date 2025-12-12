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
  fetch(apiUrl + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

// export async function postLogin(email, password) {
//   try {
//     const response = await fetch(apiUrl + "/users/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const err = await response.json();
//       throw new Error(err.message || "Erreur de connexion");
//     }

//     return await response.json(); // Token ou user
//   } catch (error) {
//     console.error("postLogin error:", error.message);
//     throw error;
//   }
// }

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
