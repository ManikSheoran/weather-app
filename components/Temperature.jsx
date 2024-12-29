import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import SunriseSunset from "./SunriseSunset";

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
  const pressure = data.main.pressure;
  const humidity = data.main.humidity;
  const icon = data.weather[0].icon;

  const toggleUnit = () =>
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");

  return (
    <div className="temperature">
      <h1 className="city">
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
        <span>{unit === "celsius" ? "°C " : "°F "}</span>
        <span
          style={{ cursor: "pointer", marginLeft: "8px" }}
          onClick={toggleUnit}
        >
          <FontAwesomeIcon
            icon={unit === "celsius" ? faToggleOff : faToggleOn}
            className="toggle-unit-icon"
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
      <SunriseSunset sunrise={sunrise} sunset={sunset} />
      <h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fab12f"
          className="bi bi-sunrise"
          viewBox="0 0 16 16"
        >
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
        </svg>{" "}
        {sunrise} -{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fa4032"
          className="bi bi-sunset"
          viewBox="0 0 16 16"
        >
          <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
        </svg>{" "}
        {sunset}
      </h3>
      <h3>
        Pressure: {pressure} hPa | Humidity: {humidity}%
      </h3>
    </div>
  );
}
