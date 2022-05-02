import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/planetsAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]); // [state, setter]
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      },
    ],
  });

  const getPlanets = async () => {
    const { results } = await fetchPlanets();
    setData(results);
  };

  const contextValue = {
    data,
    getPlanets,
    filters,
    setFilters,
    filteredData,
    setFilteredData,
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
