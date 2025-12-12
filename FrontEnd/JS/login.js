// import { postLogin } from "./api.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector(".login-form");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.querySelector("#email").value;
//     const password = document.querySelector("#password").value;

//     try {
//       const data = await postLogin(email, password);

//       // Exemple : récupérer un token
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       // Redirection après connexion réussie
//       window.location.href = "homepage_edit.html";
//     } catch (error) {
//       alert("Erreur : " + error.message);
//     }
//   });
// });
