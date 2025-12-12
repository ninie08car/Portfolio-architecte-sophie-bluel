const form = document.querySelector(".login-form");

form.addEventListener("submit", submitForm);

async function submitForm(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = await postLogin(email, password);
  if (data) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } else {
    alert("error");
  }
}
