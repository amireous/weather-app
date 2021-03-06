"use strict";

const selectOptions = document.getElementById("options");
const weatherSvg = document.getElementById("svg-img");
const loader = document.querySelector(".loading");

let isLoading = false;

selectOptions.addEventListener("change", function () {
  getCityData(document.querySelector(`option[value="${this.value}"]`).id);
});

const renderHTML = function (data) {
  const weatherDetail = document.getElementById("weather-detail");
  const cityName = document.getElementById("city-name");
  const weatherTemp = document.getElementById("temp-number");

  cityName.textContent = data.name;
  weatherDetail.textContent = data.weather[0].main;
  weatherTemp.textContent = (data.main.temp - 273).toFixed(0);
  weatherSvg.style.opacity = 1;

  document.querySelector(".fa-map-marker-alt").style.display = "block";
  swichWeather(data.weather[0].main.toLowerCase());
};

const getCityData = function (city) {
  isLoading = true;
  if (isLoading) loader.style.opacity = 1;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3778a864a1c7314c3191fc8a6ef44a31`
  )
    .then((request) => request.json())
    .then((data) => {
      renderHTML(data);

      isLoading = false;
      if (isLoading === false) loader.style.opacity = 0;
    })
    .catch((err) => alert(`Something went wrong ${err.message} ❗`));
};

const swichWeather = function (weatherStatus) {
  switch (weatherStatus) {
    case "clear":
      weatherSvg.src = "images/svg/clear.svg";
      break;

    case "clouds":
      weatherSvg.src = "images/svg/clouds.svg";
      break;

    case "sunny":
      weatherSvg.src = "images/svg/sunny.svg";
      break;
    case "rain":
      weatherSvg.src = "images/svg/rainy.svg";
      break;

    case "snow":
      weatherSvg.src = "images/svg/snowy.svg";
      break;

    default:
      weatherSvg.src = "#";
  }
};
