import * as React from "react"; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Temperature from "./Temperature";

const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

export default function CityForm({ onSearch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [weatherData, setWeatherData] = React.useState(null);

  const onSubmit = async (data) => {
    const city = data.city;
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${import.meta.env.VITE_WEATHER_API}`
      );

      if (!response.ok) {
        throw new Error("City not found or API error");
      }

      const weatherData = await response.json();

      setWeatherData(weatherData);

      onSearch(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData({ error: error.message }); 
      onSearch({ error: error.message });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
        <div className="input-group mb-3">
          <div className="form-floating flex-grow-1">
            <input
              type="text"
              id="city"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              placeholder="Enter city"
              {...register("city", { required: "City is required" })}
            />
            <label htmlFor="city">Enter City</label>
          </div>
          <button type="submit" className="btn btn-transparent">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#FEF3E2", fontSize: "20px" }}
            />
          </button>
        </div>
        {errors.city && (
          <div className="invalid-feedback d-block">{errors.city.message}</div>
        )}
      </form>
      {weatherData && <Temperature response={weatherData} />}{" "}
    </>
  );
}
