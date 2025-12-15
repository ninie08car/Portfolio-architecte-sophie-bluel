const form = document.querySelector(".login-form");

// let form = document.querySelector("form");
let baliseEmail = document.getElementById("email");
let balisePassword = document.getElementById("password");

function verifierChamp(balise) {
  if (balise.value === "") {
    balise.classList.add("error");
  } else {
    balise.classList.remove("error");
  }
}

function verifierEmail(balise) {
  let emailRegExp = new RegExp("[a-z._-]+@[a-z._-]+\\.[a-z._-]+");
  if (emailRegExp.test(balise.value)) {
    balise.classList.remove("error");
  } else {
    balise.classList.add("error");
  }
}

function verifierPassword(password) {
  if (password.lenght >= 5) {
    password.classList.remove("error");
  } else {
    password.classList.add("error");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  verifierChamp(baliseEmail);
  verifierChamp(balisePassword);
});

baliseEmail.addEventListener("change", () => {
  verifierEmail(baliseEmail);
  verifierPassword(balisePassword);
});

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
