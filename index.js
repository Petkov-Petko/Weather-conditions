const key = "2c446d6021375b8c6df0cdb66882f9c6";
let url =
  "https://api.openweathermap.org/data/2.5/weather?q=varna&appid=2c446d6021375b8c6df0cdb66882f9c6&units=metric";

async function getData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c446d6021375b8c6df0cdb66882f9c6&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function fetchData(city) {
  try {
    const data = await getData(city);
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
const input = document.querySelector("#input");
const submit = document.querySelector("#submit");
const container = document.querySelector(".container");


submit.addEventListener("click", async (event) => {
    event.preventDefault();
    const city = input.value;
  
    if (!city) {
      container.innerHTML = "<h1>Please enter a city name</h1>";
      return; 
    }
  
    const data = await fetchData(city);
    const year = new Date()
    let img = ""
  
    if (data) {
      container.innerHTML = `
      <div class="weather">
        <h3><i class="fa-solid fa-location-dot fa-xl"></i>${data.name}, ${data.sys.country}</h3>
        <p><i class="fa-solid fa-calendar-days fa-xl"></i>${year.toLocaleDateString()}</p>
        <p id="temp"><span><i class="fa-solid fa-temperature-low fa-xl"></i></span>${data.main.temp}°C</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" >
        <p>Humidity ${data.main.humidity}%</p>
        <p>Feels like ${data.main.feels_like}°C</p>
        <p>Max-temp:${data.main.temp_max}°C <br>Min-temp: ${data.main.temp_min}°C</p>
      </div>
      `;
    } else {
      container.innerHTML = "<p>Weather information not available</p>";
    }
  });