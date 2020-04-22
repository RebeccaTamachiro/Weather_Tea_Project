function displayGeoTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "461572920dce0becb1819d70275340e2";
  let mainApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${mainApi}&appid=${apiKey}`).then(showNewTemperature);
}

function displayDate() {
  let now = new Date();

  let currentWeekday = document.querySelector("#weekday");
  currentWeekday.innerHTML = `${days[now.getDay()]}`;
  let currentHours = document.querySelector("#hours");
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentHours.innerHTML = `${hours}:${minutes}`;
}

function changeCity(event) {
  event.preventDefault();
  window.scroll(0, 80);
  let newCity = document.querySelector("#city-search").value;
  let apiKey = "461572920dce0becb1819d70275340e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showNewTemperature);
}

function showNewTemperature(response) {
  let newCityTemperature = Math.round(response.data.main.temp);
  let newMainTemperature = document.querySelector("#main-temp");
  newMainTemperature.innerHTML = `${newCityTemperature}ºC`;
  let newLocation = document.querySelector("#current-location");
  newLocation.innerHTML = response.data.name;
  let newDescription = response.data.weather[0].description;
  document.querySelector("#weather-description").innerHTML = newDescription;
  let newWind = Math.round(response.data.wind.speed * 3.6);
  document.querySelector("#wind-value").innerHTML = newWind;
  let newHumidity = response.data.main.humidity;
  document.querySelector("#humidity-value").innerHTML = newHumidity;
  let iconSelector = response.data.weather[0].main;
  if (iconSelector === "Clouds") {
    document
      .querySelector("#main-icon")
      .setAttribute("class", "fas fa-cloud mt-4 ml-3");
  }
  if (iconSelector === "Clear") {
    document
      .querySelector("#main-icon")
      .setAttribute("class", "fas fa-sun mt-4 ml-3");
  }
  if (iconSelector === "Rain") {
    document
      .querySelector("#main-icon")
      .setAttribute("class", "fas fa-cloud-showers-heavy mt-4 ml-3");
  }
  if (iconSelector === "Snow") {
    document
      .querySelector("#main-icon")
      .setAttribute("class", "fas fa-snowflake mt-4 ml-3");
  }
  if (iconSelector === "Haze" || iconSelector === "Mist")
    document
      .querySelector("#main-icon")
      .setAttribute("class", "fas fa-smog mt-4 ml-3");
}

function showDefaultTemperature(city) {
  let apiKey = "461572920dce0becb1819d70275340e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showNewTemperature);
}
function backToPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(displayGeoTemperature);
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let search = document.querySelector("#city-search-form");
search.addEventListener("submit", changeCity);

let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", changeCity);

displayDate();
showDefaultTemperature("Lisbon");

let linkToCurrent = document.querySelector("#back-link");
linkToCurrent.addEventListener("click", backToPosition);
