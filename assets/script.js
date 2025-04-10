const btn = document.getElementById("searchBtn");

btn.addEventListener("click", () => {
  const type = document.getElementById("type").value;
  const id = document.getElementById("id").value;

  document.getElementById("loading").style.display = "block";
  document.getElementById("result").style.display = "none";
  document.getElementById("error").style.display = "none";

  fetch(`https://swapi.py4e.com/api/${type}/${id}/`)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(
          `Ошибка ${response.status}: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("result").style.display = "block";
      let resultHTML = "<ul>";
      if (data.name) {
        resultHTML += `<li>${data.name}</li>`;
      }
      resultHTML += "</ul>";
      document.getElementById("result").innerHTML = resultHTML;
    })
    .catch((error) => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("error").style.display = "block";
      document.getElementById("error").innerHTML =
        error === 404
          ? "Такой записи нет. Проверь ID."
          : "Произошла ошибка или сервер недоступен.";
    })
    .finally(() => {
      console.log("Запрос завершён");
    });
});
