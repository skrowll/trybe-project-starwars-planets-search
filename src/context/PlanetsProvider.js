import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/planetsAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: columnOptions[0],
        comparison: 'maior que',
        value: '0',
      },
    ],
  });
  const [appliedFilters, setAppliedFilters] = useState([]);

  const getPlanets = async () => {
    const { results } = await fetchPlanets();
    setData(results);
  };

  const [planets, setPlanets] = useState([]);

  const contextValue = {
    data,
    getPlanets,
    filters,
    setFilters,
    filteredData,
    setFilteredData,
    appliedFilters,
    setAppliedFilters,
    columnOptions,
    setColumnOptions,
    planets,
    setPlanets,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default PlanetsProvider;
