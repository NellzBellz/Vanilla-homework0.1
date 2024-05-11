function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  const humidityElement = document.querySelector("#humidity");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  cityElement.textContent = response.data.city;
  temperatureElement.textContent = Math.round(temperature);
  descriptionElement.textContent = response.data.condition.description;
  windElement.textContent = `${response.data.wind.speed} km/h`;
  humidityElement.textContent = `${response.data.main.humidity}%`;

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  let weatherIcons = {
    "clear sky": "☀️",
    "few clouds": "⛅",
    "scattered clouds": "🌥️",
    "broken clouds": "☁️",
    "overcast clouds": "☁️",
    "light rain": "🌧️",
    "moderate rain": "🌧️",
    "heavy intensity rain": "🌧️",
  };

  let weatherIcon =
    weatherIcons[response.data.condition.description.toLowerCase()];
  if (weatherIcon) {
    iconElement.textContent = weatherIcon;
  } else {
    iconElement.textContent = "❓";
  }
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "bo0103979tbfff1d36624a83f5fa5094";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function formatDate(date) {
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];

  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.textContent = formatDate(currentDate);
