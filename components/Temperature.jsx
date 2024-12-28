import { useState } from "react";

export default function Temperature({ response }) {
  console.log(response);
  const temp = response.main.temp;
  const condition = response.weather[0].main;
  const [unit, setUnit] = useState("celsius");

  const celsius = temp;
  const fahrenheit = (temp * 9) / 5 + 32;

  return (
    <div className="temperature">
      <h2>{condition}</h2>
      <h1>
        {unit === "celsius" ? celsius : fahrenheit}
        <span
          onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
        >
          {unit === "celsius" ? "°C" : "°F"}
        </span>
      </h1>
    </div>
  );
}
