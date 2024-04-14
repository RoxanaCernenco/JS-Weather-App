
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
  
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=&{yourApiKey}&units=metric#`
        )
          .then((response) => response.json())
          .then((data) => {
            getWeatherData(data.name);
            getForecastData(data.name);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      () => {
        const latitude = 43.817222; 
        const longitude =  28.582778; 
  
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=&{yourApiKey}&units=metric#`
        )
          .then((response) => response.json())
          .then((data) => {
            getWeatherData(data.name);
            getForecastData(data.name);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }
  
  const searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", () => {
    const searchInput = document.querySelector("#search-input");
    const location = searchInput.value;
    getWeatherData(location);
    getForecastData(location);
  });
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${day}/${month}/${year}`;
  function getWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=&{yourApiKey}&units=metric`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weather = document.querySelector(".weather");
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
  
        weather.innerHTML = `
          <p>${formattedDate}</p>
          <p> ${data.name}</p>
          <img src=${"https://openweathermap.org/img/wn/" + icon + "@2x.png"}>
          <p>Temperature: ${temp}°C</p>
          <div class='details'>
          <div class='col'> <img src="images/humidity.png" >
          <p class='humidity'>${data.main.humidity}% <br>Humidity</p></div>
          <div class="col">
                    <img src="images/wind.png" >
          <p class='wind'> ${data.wind.speed} km/h <br>Wind Speed</p></div>
          </div>
        `;
      })
      .catch((error) => console.error(error));
  }
  
  function getForecastData(location) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=&{yourApiKey}&units=metric`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const forecast = document.querySelector(".forecast");
        forecast.innerHTML = "";
  
        for (let i = 0; i < data.list.length; i += 8) {
                   const day = new Date(data.list[i].dt_txt).toLocaleDateString("en-US", {
             weekday: "long",
           });
           const temp = Math.round(data.list[i].main.temp);
           const maxtemp = Math.round(data.list[i].main.temp_max);
           const mintemp = Math.round(data.list[i].main.temp_min);
           const icon = data.list[i].weather[0].icon;
  
          forecast.innerHTML += `
            <div class='card'>
            <h3>${day}</h3> 
            
                       <p>${temp}°C</p>
                    <img src=${"https://openweathermap.org/img/wn/" + icon + "@2x.png"}>
                       <p >Max Temp: ${maxtemp}°C</p>
                       <p >Min Temp: ${mintemp}°C</p>
            </div>
          `;
        }
        
      })
      .catch((error) => console.error(error));
  }
  
  