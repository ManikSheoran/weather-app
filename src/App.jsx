import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import CityForm from "../components/CityForm";

function App() {
  return (
    <>
      <div className="center">
        <FontAwesomeIcon
          icon={faSun}
          spin
          style={{ color: "#fab12f", fontSize: "50px" }}
        />
        <h1 className="title">Weather App</h1>
        <CityForm />
      </div>
    </>
  );
}

export default App;
