import React, { useContext, useEffect, useState } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filteredData } = useContext(PlanetsContext);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    // console.log('data', data);
    // console.log('planets', planets);
    // setPlanets(data);
    if (filteredData.length === 0) {
      setPlanets(data);
    } else {
      setPlanets(filteredData);
    }
  }, [data, planets, filteredData]);

  return (
    <div>
      {
        planets.length > 0
        && (
          <table>
            <thead>
              <tr>
                {
                  Object.keys(planets[0]).map((key, index) => (
                    key !== 'residents'
                    && (
                      <th key={ index }>
                        { key }
                      </th>
                    )
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                planets.map((planet, index) => (
                  <tr key={ index }>
                    <td>{planet.name}</td>
                    <td>{planet.rotation_period}</td>
                    <td>{planet.orbital_period}</td>
                    <td>{planet.diameter}</td>
                    <td>{planet.climate}</td>
                    <td>{planet.gravity}</td>
                    <td>{planet.terrain}</td>
                    <td>{planet.surface_water}</td>
                    <td>{planet.population}</td>
                    <td>{planet.films}</td>
                    <td>{planet.created}</td>
                    <td>{planet.edited}</td>
                    <td>{planet.url}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default Table;
