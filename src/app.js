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
  document.querySelector("#city-search").value = null;
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

  newLocation.innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML = newDescription;
  document.querySelector("#wind-value").innerHTML = newWind;
  document.querySelector("#humidity-value").innerHTML = newHumidity;

  if (defaultUnit.classList.contains("active-unit-wrapper")) {
    newMainTemperature.innerHTML = `<span id="temperature-value">${newCityTemperature}</span>ºC`;
  } else {
    newMainTemperature.innerHTML = `<span id="temperature-value">${Math.round(
      newCityTemperature * 1.8 + 32
    )}</span>ºF`;
  }

  let iconSelector = response.data.weather[0].main;
  document.querySelector(
    "#main-icon-wrapper"
  ).innerHTML = `<i class="${updateIcon(
    iconSelector
  )} mt-4 ml-3" id="main-icon"> </i>`;

  updateTeaTip(newCityTemperature);
}

function updateIcon(iconSelector) {
  if (iconSelector === "Clouds") {
    return "fas fa-cloud";
  }
  if (iconSelector === "Clear") {
    return "fas fa-sun";
  }
  if (iconSelector === "Rain" || iconSelector === "Drizzle") {
    return "fas fa-cloud-showers-heavy";
  }
  if (iconSelector === "Snow") {
    return "fas fa-snowflake";
  }
  if (
    iconSelector === "Haze" ||
    iconSelector === "Mist" ||
    iconSelector === "Fog"
  )
    return "fas fa-smog";
}

function updateTeaTip(newCityTemperature) {
  let teaTip = document.querySelector("#tea-tip");

  let coldWeatherTeas = [
    `<p class="card-text"> 
    👉 Why not warm yourself up with some 
    <span id="tea-flavour"> spiced apple tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Get yourself a blanket and some 
    <span id="tea-flavour"> lemon ginger tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Enjoy colder days with a nice cup of hot 
    <span id="tea-flavour"> chai latte </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Why not warm things up with a hot 
    <span id="tea-flavour"> raspberry tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Get yourself a blanket and some 
    <span id="tea-flavour"> ginger tumeric tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Enjoy colder days with some 
    <span id="tea-flavour"> spiced orange tea </span> OR...</p>`,
  ];

  let hotWeatherTeas = [
    `<p class="card-text"> 
    👉 Great weather to enjoy some 
    <span id="tea-flavour"> iced matcha latte </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Why not try some refreshing 
    <span id="tea-flavour"> honeydew bubble tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Nice weather to have a glass of classic 
    <span id="tea-flavour"> lemon iced tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Good weather to try and taste some
    <span id="tea-flavour"> iced chai latte </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Refresh yourself and go healthy with some nice 
    <span id="tea-flavour"> green tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Great weather for some good old 
    <span id="tea-flavour"> peach iced tea </span> OR...</p>`,
  ];

  let neutralWeatherTeas = [
    `<p class="card-text"> 
    👉 Great weather for some nice
    <span id="tea-flavour"> lemon-verbena tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Great weather to have some warm
    <span id="tea-flavour"> chamomile tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Why not try some calming warm
    <span id="tea-flavour"> lemongrass tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 It's always a good weather for some
    <span id="tea-flavour"> peppermint tea </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Great weather for either iced or regular
    <span id="tea-flavour"> golden milk latte </span> OR...</p>`,
    `<p class="card-text"> 
    👉 Why not vary a little with some
    <span id="tea-flavour"> rose milk tea </span> OR...</p>`,
  ];

  if (newCityTemperature < 10) {
    teaTip.innerHTML =
      coldWeatherTeas[Math.floor(Math.random() * coldWeatherTeas.length)];
  }
  if (newCityTemperature > 20) {
    teaTip.innerHTML =
      hotWeatherTeas[Math.floor(Math.random() * hotWeatherTeas.length)];
  }
  if (newCityTemperature >= 10 && newCityTemperature <= 20) {
    teaTip.innerHTML =
      neutralWeatherTeas[Math.floor(Math.random() * neutralWeatherTeas.length)];
  }
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast-section");
  forecastElement.innerHTML = null;
  let forecast = null;
  let iconSelector = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    iconSelector = response.data.list[index].weather[0].main;
    if (defaultUnit.classList.contains("active-unit-wrapper")) {
      forecastElement.innerHTML += `
  <div class="card border-0 bg-transparent" style="min-width: 6rem;">
              <div class="card-header bg-transparent text-center border-0">
                ${formatHours(forecast.dt * 1000)}
              </div>
              <div class="text-center border-0 p-0">
              <p class="card-text" id="forecast-icon">
              <i class="${updateIcon(iconSelector)}"></i>
              </p>
              </div>
              <div
                class="card-footer bg-transparent text-center border-0"
                id="temp-forecast-01"
              >
                ${Math.round(forecast.main.temp)}ºC
              </div>
            </div>`;
    } else {
      forecastElement.innerHTML += `
  <div class="card border-0 bg-transparent" style="min-width: 6rem;">
              <div class="card-header bg-transparent text-center border-0">
                ${formatHours(forecast.dt * 1000)}
              </div>
              <div class="text-center border-0 p-0">
              <p class="card-text" id="forecast-icon">
              <i class="${updateIcon(iconSelector)}"></i>
              </p>
              </div>
              <div
                class="card-footer bg-transparent text-center border-0"
                id="temp-forecast-01"
              >
                ${Math.round(forecast.main.temp * 1.8 + 32)}ºF
              </div>
            </div>`;
    }
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

function backToCelsius() {
  document
    .querySelector("#celsius-wrapper")
    .setAttribute("class", "btn btn-secondary border-1 active-unit-wrapper");
  document
    .querySelector("#fahrenheit-wrapper")
    .setAttribute(
      "class",
      "btn btn-secondary border-1 alternative-unit-wrapper"
    );
  let celsiusButton = document.querySelector("#active-unit");
  celsiusButton.removeEventListener("click", backToCelsius);
  fahrenheitButton.addEventListener("click", chooseFahrenheit);

  let currentLocation = document.querySelector("#current-location");
  search(`q=${currentLocation.innerHTML}`);
}

function chooseFahrenheit() {
  document
    .querySelector("#fahrenheit-wrapper")
    .setAttribute("class", "btn btn-secondary border-1 active-unit-wrapper");
  document
    .querySelector("#celsius-wrapper")
    .setAttribute(
      "class",
      "btn btn-secondary border-1 alternative-unit-wrapper"
    );
  fahrenheitButton.removeEventListener("click", chooseFahrenheit);
  let celsiusButton = document.querySelector("#active-unit");
  celsiusButton.addEventListener("click", backToCelsius);

  let currentLocation = document.querySelector("#current-location");
  search(`q=${currentLocation.innerHTML}`);
}

let defaultUnit = document.querySelector("#celsius-wrapper");

let changeCityForm = document.querySelector("#city-search-form");
changeCityForm.addEventListener("submit", handleCityInput);

let linkToCurrent = document.querySelector("#back-link");
linkToCurrent.addEventListener("click", backToPosition);

let fahrenheitButton = document.querySelector("#alternative-unit");
fahrenheitButton.addEventListener("click", chooseFahrenheit);

search("q=Lisbon");
