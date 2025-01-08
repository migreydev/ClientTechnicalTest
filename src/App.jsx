import Population from "./components/population/population";
import Region from "./components/region/region";
import Filter from "./components/filter/filter";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Datos Poblacionales</h1>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/region/Africa">Africa</Link>
            </li>
            <li>
              <Link to="/region/Americas">Americas</Link>
            </li>
            <li>
              <Link to="/region/Antarctic">Antarctic</Link>
            </li>
            <li>
              <Link to="/region/Asia">Asia</Link>
            </li>
            <li>
              <Link to="/region/Europe">Europe</Link>
            </li>
            <li>
              <Link to="/region/Oceania">Oceania</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Population />} />
          <Route path="/region/:regionName" element={<Region />} />
          <Route path="/filter" element={<Filter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
