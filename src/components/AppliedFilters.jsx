import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function AppliedFilters() {
  const {
    data,
    appliedFilters,
    setAppliedFilters,
    columnOptions,
    setPlanets,
    setFilteredData,
  } = useContext(PlanetsContext);

  const handleClick = ({ target: { value } }) => {
    setPlanets(data);
    setAppliedFilters(appliedFilters.filter((filter) => filter[0] !== value));
    columnOptions.push(value);
    setFilteredData(data);
  };

  return (
    <div>
      {
        appliedFilters.map((filter) => (
          <div
            key={ filter[0] }
            data-testid="filter"
          >
            <p>{`${filter[0]} ${filter[1]} ${filter[2]}`}</p>
            <button
              type="button"
              value={ filter[0] }
              onClick={ (event) => handleClick(event) }
            >
              x
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default AppliedFilters;
