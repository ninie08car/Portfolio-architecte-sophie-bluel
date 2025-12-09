const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMessage.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const data = await postLogin(email, password);

    // ✅ connexion confirmée
    localStorage.setItem("token", data.token);

    // ✅ redirection vers la page d’accueil
    window.location.href = "/";
  } catch (error) {
    // ❌ affichage du message d’erreur
    errorMessage.textContent = error.message;
  }
});
