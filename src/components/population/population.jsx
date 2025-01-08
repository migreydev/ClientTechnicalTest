import { useState, useEffect } from "react";
import "./population.css";

function Population() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Lista de Países</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.cca3}>
              <td>{country.name.common}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td>{country.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Population;
