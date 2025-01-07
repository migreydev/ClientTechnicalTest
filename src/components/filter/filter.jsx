import { useState, useEffect } from "react";

function Filter() {
  const [population, setPopulation] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=population")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los paises");
        }
        return response.json();
      })
      .then((data) => {
        setPopulation(data);
      })
      .catch((error) => {
        throw new Error("Error: ", error);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capital</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {population.map((country) => (
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

export default Filter;
