function formatHours(timestamp) {
  let responseReference = new Date(timestamp);
  let hours = responseReference.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = responseReference.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;

    return `${hours}:${minutes}`;
  }
}

function displayDate(timestamp) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let now = new Date(timestamp);
  let updateDate = document.querySelector("#date");
  updateDate.innerHTML = `${months[now.getMonth()]} ${now.getDate()}`;

  let updateHours = document.querySelector("#hours");
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  updateHours.innerHTML = `${hours}:${minutes}`;
}

function handleCityInput(event) {
  event.preventDefault();
  window.scroll(0, 80);
  let apiVariable = `q=${document.querySelector("#city-search").value}`;
  search(apiVariable);
}

function search(apiVariable) {
  let apiKey = "461572920dce0becb1819d70275340e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${apiVariable}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showNewTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?${apiVariable}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showForecast);
}

function showNewTemperature(response) {
  displayDate(response.data.dt * 1000);

  let newCityTemperature = Math.round(response.data.main.temp);
  let newDescription = response.data.weather[0].description;
  let newWind = Math.round(response.data.wind.speed * 3.6);
  let newHumidity = response.data.main.humidity;

  let newMainTemperature = document.querySelector("#main-temp");
  let newLocation = document.querySelector("#current-location");

  newMainTemperature.innerHTML = `${newCityTemperature}ºC`;
  newLocation.innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML = newDescription;
  document.querySelector("#wind-value").innerHTML = newWind;
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
  if (
    iconSelector === "Haze" ||
    iconSelector === "Mist" ||
    iconSelector === "Fog"
  )
    document
      .querySelector("#main-icon")
      .setAttribute("class", "fas fa-smog mt-4 ml-3");
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast-section");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML += `
  <div class="card border-0 bg-transparent" style="min-width: 6rem;">
              <div class="card-header bg-transparent text-center border-0">
                ${formatHours(forecast.dt * 1000)}
              </div>

              <div
                class="card-footer bg-transparent text-center border-0"
                id="temp-forecast-01"
              >
                ${Math.round(forecast.main.temp_max)}º|${Math.round(
      forecast.main.temp_min
    )}º
              </div>
            </div>`;
  }
}

function backToPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(displayGeoTemperature);
  window.scroll(0, 80);
}

function displayGeoTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiVariable = `lat=${latitude}&lon=${longitude}`;
  search(apiVariable);
}

let changeCityForm = document.querySelector("#city-search-form");
changeCityForm.addEventListener("submit", handleCityInput);

search("q=Lisbon");

let linkToCurrent = document.querySelector("#back-link");
linkToCurrent.addEventListener("click", backToPosition);
