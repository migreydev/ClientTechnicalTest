import { useState, useEffect } from "react";
import "./population.css";

function Population() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [populationFilter, setPopulationFilter] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handlePopulationFilter = () => {
    if (populationFilter === "" || isNaN(populationFilter)) {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(
        (country) =>
          country.population ===
          parseInt(populationFilter.replace(/\./g, ""), 10)
      );
      setFilteredCountries(filtered);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Lista de Países</h1>
      <div>
        <input
          type="text"
          placeholder="Filtrar por población exacta"
          value={populationFilter}
          onChange={(e) => setPopulationFilter(e.target.value)}
        />
        <button onClick={handlePopulationFilter}>Filtrar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capital</th>
            <th>Región</th>
            <th>Población</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => (
            <tr key={country.cca3}>
              <td>{country.name.common}</td>
              <td>{country.capital ? country.capital[0] : "N/A"}</td>
              <td>{country.region}</td>
              <td>{country.population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Population;
