import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

export default function Temperature({ data }) {
  if (data.error) {
    return <div className="error-message">{data.error}</div>;
  }

  const [unit, setUnit] = useState("celsius");

  const tempCelsius = data.main.temp;
  const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
  const feelsLikeCelsius = data.main.feels_like;
  const feelsLikeFahrenheit = (feelsLikeCelsius * 9) / 5 + 32;
  const condition = data.weather[0].description;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  const icon = data.weather[0].icon;

  return (
    <div className="temperature">
      <h1>
        {data.name} - {data.sys.country}
      </h1>
      <h2>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={condition}
        />
        {condition.charAt(0).toUpperCase() + condition.slice(1)}
      </h2>
      <h1>
        {unit === "celsius"
          ? tempCelsius.toFixed(1)
          : tempFahrenheit.toFixed(1)}
        <span>{unit === "celsius" ? "°C" : "°F"}</span>
        <span
          style={{ cursor: "pointer", marginLeft: "8px" }}
          onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
        >
          <FontAwesomeIcon
            icon={unit === "celsius" ? faToggleOn : faToggleOff}
            style={{ marginLeft: "8px", color: "#fa4032" }}
          />
        </span>
      </h1>
      <h2>
        Feels like:{" "}
        {unit === "celsius"
          ? feelsLikeCelsius.toFixed(1)
          : feelsLikeFahrenheit.toFixed(1)}
        <span>{unit === "celsius" ? "°C" : "°F"}</span>
      </h2>
      <h3>
        Sunrise: {sunrise} - Sunset: {sunset}
      </h3>
    </div>
  );
}
