import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Region() {
  const { regionName } = useParams();
  const [continente, setContinente] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/region/${regionName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la región");
        }
        return response.json();
      })
      .then((data) => {
        setContinente(data);
      })
      .catch((error) => {
        throw new Error("Error: ", error);
      });
  }, [regionName]);

  return (
    <div>
      <h1>Lista de paises de {regionName}</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capital</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {continente.map((country) => (
            <tr key={country.cca3}>
              <td>{country.name.common}</td>
              <td>{country.capital}</td>
              <td>{country.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Region;
