import React, { useContext, useEffect, useState } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    data,
    filters,
    setFilters,
    setFilteredData,
    appliedFilters,
    setAppliedFilters,
    setColumnOptions,
    columnOptions,
    // setPlanets,
    planets,
  } = useContext(PlanetsContext);

  const [numericFilter, setNumericFilter] = useState({
    column: columnOptions[0],
    comparison: 'maior que',
    value: '0',
  });

  const applyFilters = (filter) => {
    if (filters.filterByName.name !== '') {
      setFilteredData(data.filter((planet) => (
        (planet.name.toUpperCase()).includes((filters.filterByName.name).toUpperCase())
      )));
    } else {
      setFilteredData(data);
    }
    if (filter) {
      console.log('filtra');
      const column = filter[0];
      const comparison = filter[1];
      const value = filter[2];
      if (comparison === 'igual a') {
        setFilteredData(planets.filter((planet) => Number(planet[column])
          === Number(value)));
      }
      if (comparison === 'maior que') {
        setFilteredData(planets.filter((planet) => Number(planet[column])
          > Number(value)));
      }
      if (comparison === 'menor que') {
        setFilteredData(planets.filter((planet) => Number(planet[column])
          < Number(value)));
      }
    }
  };

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

  const applyNumericFilters = () => {
    if (appliedFilters.length > 0) {
      console.log('applyNumericFilters');
      appliedFilters.map((filter) => (
        applyFilters(filter)
      ));
    }
  };

  const handleClickFilter = ({ comparison, column, value }) => {
    columnOptions.splice(columnOptions.indexOf(column), 1);
    setAppliedFilters((prevState) => [
      ...prevState,
      [column, comparison, value],
    ]);
    setNumericFilter(() => ({
      column: columnOptions[0],
      comparison: 'maior que',
      value: '0',
    }));
  };

  const handleClickRemove = () => {
    console.log('remove');
    setColumnOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
    setFilteredData(data);
    setAppliedFilters([]);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.filterByName]);

  useEffect(() => {
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        numericFilter,
      ],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericFilter]);

  useEffect(() => {
    applyNumericFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

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
            {
              columnOptions.map((option) => (
                <option key={ option } value={ option }>{ option }</option>
              ))
            }
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
        <button
          name="remove-filters"
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => handleClickRemove() }
        >
          Remover filtros
        </button>
      </form>
    </div>
  );
}

export default Filters;
