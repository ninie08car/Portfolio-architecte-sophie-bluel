// const form = document.querySelector(".login-form");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");

// form.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const user = {
//     email: emailInput.value,
//     password: passwordInput.value,
//   };

//   const response = await fetch("http://localhost:5678/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   });

//   const data = await response.json();

//   if (response.ok) {
//     localStorage.setItem("token", data.token);
//     window.location.href = "index.html";
//   } else {
//     alert("Email ou mot de passe incorrect");
//   }
// });
