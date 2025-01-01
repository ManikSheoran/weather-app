import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import CityForm from "../components/CityForm";

function App() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="text-center main-div"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <FontAwesomeIcon
            icon={faSun}
            spin
            style={{ color: "#fab12f", fontSize: "50px" }}
          />
          <h1 className="title my-4">Weather App</h1>
          <CityForm />
        </div>
        {/* HAPPY NEW YEAR 2025 */}
      </div>
    </>
  );
}

export default App;
