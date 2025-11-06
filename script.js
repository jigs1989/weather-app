const apiKey = "b1a2f0796a9d77325d9b8b62d9c3fc3b"; // Replace with your OpenWeatherMap key
const searchBtn = document.getElementById("search");
const cityInput = document.getElementById("city");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const icon = document.getElementById("icon");
const error = document.getElementById("error");
const weatherInfo = document.querySelector(".weather-info");

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (response.status === 404) {
    error.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  } else {
    const data = await response.json();
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    error.classList.add("hidden");
    weatherInfo.classList.remove("hidden");
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});
