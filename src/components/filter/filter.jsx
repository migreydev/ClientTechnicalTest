import { useState, useEffect } from "react";

function Filter() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [populationFilter, setPopulationFilter] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,population")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los países");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (populationFilter === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(
        (country) => country.population >= parseInt(populationFilter, 10)
      );
      setFilteredCountries(filtered);
    }
  }, [populationFilter, countries]);

  return (
    <div>
      <h1>Filtrar por población</h1>
      <input
        type="number"
        placeholder="Ingresar población mínima"
        value={populationFilter}
        onChange={(e) => setPopulationFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capital</th>
            <th>Población</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => (
            <tr key={country.name.common}>
              <td>{country.name.common}</td>
              <td>{country.capital ? country.capital[0] : "N/A"}</td>
              <td>{country.population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Filter;
