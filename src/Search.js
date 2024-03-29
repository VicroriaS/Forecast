import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Type a city"
        autoFocus={true}
        onChange={updateCity}
      />
      <button type="Submit">Search</button>
    </form>
  );
  if (loaded) {
    return (
      <div className="container">
        <div className="row">
        <div className="col-8">
          <div>
            {form}
            <ul>
              <li>Temperature:{Math.round(weather.temperature)}°C</li>
              <li>Description:{weather.description}</li>
              <li>Humidity:{weather.humidity}%</li>
              <li>Wind:{weather.wind}km/h</li>
              <li>
                <img src={weather.icon} alt={weather.description} />
              </li>
            </ul>
            </div>
           </div>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
