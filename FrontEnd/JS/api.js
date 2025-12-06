const apiUrl = "http://localhost:5678/api";

async function getWorks() {
  const response = await fetch(apiUrl + "/works");
  if (response.ok) {
    const works = await response.json();
    return works;
  }
  return null;
}
