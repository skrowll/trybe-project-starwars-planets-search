import React, { useContext, useEffect, useState } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    data,
    filters,
    setFilters,
    filteredData,
    setFilteredData,
  } = useContext(PlanetsContext);

  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const handleChangeNameFilter = ({ target: { value } }) => {
    setFilters((prevState) => ({
      ...prevState,
      filterByName: {
        name: value,
      },
    }));
  };

  const handleChangeNumericFilter = ({ target: { value, name } }) => {
    setNumericFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    if (filters.filterByName.name !== '') {
      setFilteredData(data.filter((planet) => (
        (planet.name.toUpperCase()).includes((filters.filterByName.name).toUpperCase())
      )));
    } else {
      setFilteredData([]);
    }
  };

  const handleClickFilter = ({ comparison, column, value }) => {
    console.log(column, comparison, value);
    if (comparison === 'igual a') {
      setFilteredData(data.filter((planet) => Number(planet[column]) === Number(value)));
    }
    if (comparison === 'maior que') {
      setFilteredData(data.filter((planet) => Number(planet[column]) > Number(value)));
    }
    if (comparison === 'menor que') {
      setFilteredData(data.filter((planet) => Number(planet[column]) < Number(value)));
    }
  };

  useEffect(() => {
    console.log(filters);
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  useEffect(() => {
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        numericFilter,
      ],
    }));
    console.log(numericFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericFilter]);

  return (
    <div>
      <form>
        <div>
          <h1>Projeto Star Wars - Trybe</h1>
          <input
            name="name"
            type="text"
            data-testid="name-filter"
            onChange={ (event) => handleChangeNameFilter(event) }
          />
        </div>
        <label htmlFor="column-filter">
          Coluna
          <select
            name="column"
            id="column-filter"
            data-testid="column-filter"
            onChange={ (event) => handleChangeNumericFilter(event) }
            value={ filters.filterByNumericValues[0].column }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            name="comparison"
            id="comparison-filter"
            data-testid="comparison-filter"
            onChange={ (event) => handleChangeNumericFilter(event) }
            value={ filters.filterByNumericValues[0].comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ (event) => handleChangeNumericFilter(event) }
          value={ filters.filterByNumericValues[0].value }
        />
        <button
          name="filter"
          type="button"
          data-testid="button-filter"
          onClick={ () => handleClickFilter(numericFilter) }
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default Filters;
